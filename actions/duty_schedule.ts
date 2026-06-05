// actions/duty_schedule.ts
'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { isInCooldown, isPersonnelExcused } from '@/features/schedule/schedule-helpers'
import { getDutyDatesForMonth } from '@/helpers/dutyTypeMatcher'
import { getAuth } from './auth'
import { DutyType, Group } from '@/payload-types'

const payload = await getPayload({ config })

// Tarihi YYYY-MM-DD string'ine çevir (karşılaştırma için)
function toDateKey(dateInput: string | Date): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : new Date(dateInput)
  const year = d.getUTCFullYear()
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export async function getScheduleByDutyType(dutyTypeId: string, year: number, month: number) {
  const startDate = new Date(Date.UTC(year, month, 1)).toISOString()
  const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59)).toISOString()

  const schedules = await payload.find({
    collection: 'duty_schedule',
    where: {
      dutyType: { equals: dutyTypeId },
      dutyDate: {
        greater_than_equal: startDate,
        less_than_equal: endDate,
      },
    },
    sort: 'dutyDate',
    depth: 2,
  })

  return schedules.docs
}

export async function generateSchedule(year: number, month: number) {
  console.log('=== GENERATE BAŞLADI ===', { year, month })

  // 1. Auth ve Grup
  const auth = await getAuth()
  if (!auth?.group) throw new Error('Kullanıcının grubu bulunamadı')
  const groupId = typeof auth.group === 'number' ? auth.group : (auth.group as Group).id
  const cldownTime = typeof auth.group === 'number' ? 1 : (auth.group as Group).cooldownDays || 1

  // 2. Personel (rank sıralı)
  const personnelResult = await payload.find({
    collection: 'personnel',
    where: { group: { equals: groupId } },
    sort: 'rank',
    limit: 100,
  })
  const personnel = personnelResult.docs
  if (personnel.length === 0) throw new Error('Grupta personel bulunamadı')

  // 3. Duty Types (priority sıralı)
  const dutyTypesResult = await payload.find({
    collection: 'duty_types',
    where: { isActive: { equals: true } },
    sort: 'priority',
  })
  const dutyTypes = dutyTypesResult.docs

  // 4. Onaylı mazeretler
  const monthStart = new Date(Date.UTC(year, month, 1))
  const monthEnd = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59))

  const exceptionsResult = await payload.find({
    collection: 'duty_exceptions',
    where: {
      status: { equals: 'approved' },
      startDate: { less_than_equal: monthEnd.toISOString() },
      endDate: { greater_than_equal: monthStart.toISOString() },
    },
    limit: 1000,
  })
  const exceptions = exceptionsResult.docs.map((e: any) => ({
    personnelId: (e.personnel as any)?.id,
    startDate: e.startDate,
    endDate: e.endDate,
  }))

  // 5. Önceki nöbetler (cooldown penceresi)
  const cooldownWindowStart = new Date(Date.UTC(year, month, 1 - (cldownTime + 2)))
  const previousDutiesResult = await payload.find({
    collection: 'duty_schedule',
    where: {
      group: { equals: groupId },
      dutyDate: {
        greater_than_equal: cooldownWindowStart.toISOString(),
        less_than_equal: monthEnd.toISOString(),
      },
    },
    limit: 10000,
  })
  const previousDuties = previousDutiesResult.docs.map((d: any) => ({
    personnelId: (d.personnel as any)?.id,
    dutyDate: d.dutyDate,
    dutyTypeId: (d.dutyType as any)?.id,
  }))

  // ====== YENİ: AY İÇİ TÜM (tarih, dutyType) ÇİFTLERİ ======
  const allPairs: Array<{ date: Date; dutyType: any }> = []
  for (const dt of dutyTypes as any[]) {
    const yearConfig = dt.yearConfigs?.find((yc: any) => yc.year === year.toString() && yc.isActive)
    if (!yearConfig) continue
    const dates = getDutyDatesForMonth(yearConfig.cronSchedules, year, month)
    for (const { date } of dates) {
      allPairs.push({ date, dutyType: dt })
    }
  }

  // Tarihe göre grupla
  const dateGroups = new Map<string, Array<{ date: Date; dutyType: any }>>()
  for (const pair of allPairs) {
    const key = toDateKey(pair.date)
    if (!dateGroups.has(key)) dateGroups.set(key, [])
    dateGroups.get(key)!.push(pair)
  }
  // Her grubu priority'ye göre sırala
  for (const [, pairs] of dateGroups) {
    pairs.sort((a, b) => a.dutyType.priority - b.dutyType.priority)
  }

  // ====== ROTATION INDEX: her dutyType için önceki aydan devam ======
  const rotationIndex = new Map<number, number>()
  for (const dt of dutyTypes as any[]) {
    const lastDutyResult = await payload.find({
      collection: 'duty_schedule',
      where: {
        dutyType: { equals: dt.id },
        group: { equals: groupId },
        dutyDate: { less_than: monthStart.toISOString() },
      },
      sort: '-dutyDate',
      limit: 1,
    })
    if (lastDutyResult.docs.length > 0) {
      const lastPersonnelId = (lastDutyResult.docs[0].personnel as any)?.id
      const sortedPersonnel = dt.sortOrder === 'normal' ? [...personnel] : [...personnel].reverse()
      const lastIndex = sortedPersonnel.findIndex((p: any) => p.id === lastPersonnelId)
      rotationIndex.set(dt.id, lastIndex !== -1 ? lastIndex : -1)
    } else {
      rotationIndex.set(dt.id, -1)
    }
  }

  // ====== YENİ: TARİH SIRASI İLE ATA, HER GÜN 1 NÖBET ======
  const scheduleToCreate: any[] = []
  const newDutiesForCooldown: Array<{ personnelId: number; dutyDate: string }> = []
  const sortedDateKeys = Array.from(dateGroups.keys()).sort()

  for (const dateKey of sortedDateKeys) {
    const pairs = dateGroups.get(dateKey)!
    const date = pairs[0].date

    let assigned = false

    for (const { dutyType: dt } of pairs) {
      // priority sıralı
      const sortedPersonnel = dt.sortOrder === 'normal' ? [...personnel] : [...personnel].reverse()
      const currentIndex = rotationIndex.get(dt.id) ?? -1

      for (let attempt = 0; attempt < sortedPersonnel.length; attempt++) {
        const personIndex = (currentIndex + 1 + attempt) % sortedPersonnel.length
        const person = sortedPersonnel[personIndex]

        const dateKeyNormalized = toDateKey(date)
        const excused = isPersonnelExcused(person.id, dateKeyNormalized, exceptions)
        const allDutiesForCooldown = [...previousDuties, ...newDutiesForCooldown]
        const cooldown = isInCooldown(
          person.id,
          dateKeyNormalized,
          allDutiesForCooldown,
          cldownTime,
        )

        if (!excused && !cooldown) {
          const record = {
            personnel: person.id,
            dutyType: dt.id,
            dutyDate: date.toISOString(),
            status: 'scheduled',
            group: groupId,
            notes: dt.name,
          }
          scheduleToCreate.push(record)
          newDutiesForCooldown.push({
            personnelId: person.id,
            dutyDate: date.toISOString(),
          })
          rotationIndex.set(dt.id, personIndex)
          assigned = true
          break // bu dutyType için atandı
        }
      }

      if (assigned) break // 1 NÖBET PER DAY
    }

    if (!assigned) {
      console.log(`⚠️ ${dateKey} için uygun kişi bulunamadı`)
    }
  }

  // ====== ESKİ KAYITLARI SİL, YENİLERİNİ OLUŞTUR ======
  const existing = await payload.find({
    collection: 'duty_schedule',
    where: {
      group: { equals: groupId },
      dutyDate: {
        greater_than_equal: monthStart.toISOString(),
        less_than_equal: monthEnd.toISOString(),
      },
    },
    limit: 10000,
  })

  for (const doc of existing.docs) {
    await payload.delete({ collection: 'duty_schedule', id: doc.id })
  }

  for (let i = 0; i < scheduleToCreate.length; i++) {
    const record = scheduleToCreate[i]
    try {
      await payload.create({ collection: 'duty_schedule', data: record })
    } catch (err: any) {
      console.log(`❌ Hata:`, err.message)
      throw err
    }
  }

  console.log('=== GENERATE BİTTİ ===')

  const byType = dutyTypes.map((dt: any) => ({
    type: dt.name,
    id: dt.id,
    count: scheduleToCreate.filter((s: any) => s.dutyType === dt.id).length,
  }))

  return {
    success: true,
    count: scheduleToCreate.length,
    byType,
  }
}

export async function getScheduleForMonth(
  dutyTypeId: string | null,
  year: number,
  month: number,
  groupId?: number,
) {
  // Yerel saat kullan (UTC çevirme yok)
  const monthStart = new Date(year, month, 1)
  const monthEnd = new Date(year, month + 1, 0, 23, 59, 59)

  const whereClause: any = {
    dutyDate: {
      greater_than_equal: monthStart.toISOString(),
      less_than_equal: monthEnd.toISOString(),
    },
  }

  if (dutyTypeId) whereClause.dutyType = { equals: dutyTypeId }
  if (groupId) whereClause.group = { equals: groupId }

  const schedules = await payload.find({
    collection: 'duty_schedule',
    where: whereClause,
    sort: 'dutyDate',
    depth: 2,
  })

  return schedules.docs
}

export async function createSwapRequest(data: {
  requesterPersonnel: number
  requesterDuty: number
  type: 'mutual' | 'unilateral'
  targetPersonnel?: number
  targetDuty?: number
  excuseType?: 'official' | 'unofficial'
  notes?: string
}) {
  return await payload.create({
    collection: 'duty_swap_requests',
    data: { ...data, status: 'pending' },
  })
}

// 1) Yıllık schedule'ları getir, pivotlanmış Map döndür
export async function getYearlySchedules(
  groupId: number,
  year: number,
): Promise<Map<string, Array<{ date: Date; status: string; exceptionType?: string }>>> {
  const yearStart = new Date(year, 0, 1).toISOString()
  const yearEnd = new Date(year, 11, 31, 23, 59, 59).toISOString()

  const result = await payload.find({
    collection: 'duty_schedule',
    where: {
      group: { equals: groupId },
      dutyDate: { greater_than_equal: yearStart, less_than_equal: yearEnd },
    },
    sort: 'dutyDate',
    depth: 1,
  })

  // Key: `${personId}__${dutyTypeId}` → Date[]
  const map = new Map<string, Array<{ date: Date; status: string; exceptionType?: string }>>()
  for (const s of result.docs as any[]) {
    const personId = typeof s.personnel === 'object' ? s.personnel.id : s.personnel
    const dutyTypeId = typeof s.dutyType === 'object' ? s.dutyType.id : s.dutyType
    const key = `${personId}__${dutyTypeId}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push({
      date: new Date(s.dutyDate),
      status: s.status,
      exceptionType: s.exceptionType,
    })
  }
  return map
}

// 2) Aktif duty type'ları columnOrder'a göre
export async function getActiveDutyTypesOrdered(): Promise<DutyType[]> {
  const result = await payload.find({
    collection: 'duty_types',
    where: { isActive: { equals: true } },
    sort: 'columnOrder',
  })
  return result.docs
}

// Mevcut dosyanın sonuna ekle:

export async function getSchedulesByDutyType(
  dutyTypeId: number,
): Promise<Map<number, Array<{ date: Date; status: string; exceptionType?: string }>>> {
  const result = await payload.find({
    collection: 'duty_schedule',
    where: { dutyType: { equals: dutyTypeId } },
    sort: 'dutyDate',
    depth: 1,
    limit: 10000,
  })

  const grouped = new Map<number, Array<{ date: Date; status: string; exceptionType?: string }>>()
  for (const s of result.docs as any[]) {
    const personId = typeof s.personnel === 'object' ? s.personnel.id : s.personnel
    if (!grouped.has(personId)) grouped.set(personId, [])
    grouped.get(personId)!.push({
      date: new Date(s.dutyDate),
      status: s.status,
      exceptionType: s.exceptionType,
    })
  }
  return grouped
}

export async function getActiveDutyTypes(): Promise<DutyType[]> {
  const result = await payload.find({
    collection: 'duty_types',
    where: { isActive: { equals: true } },
    sort: 'columnOrder',
  })
  return result.docs
}
