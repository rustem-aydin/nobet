'use server'

import { sql } from 'drizzle-orm'
import config from '@payload-config'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { getPayload } from 'payload'
import type { DutyDay } from 'types'
import {
  calendarDaysBetween,
  getDutyDatesForMonth,
  toLocalDateString,
} from '@/helpers/dutyScheduler'
import { revalidatePath } from 'next/cache'
import { getSortedPersonnel } from '../helper'

export interface Log {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error'
  service: string
  message: string
  duration: string
  status: string
  tags: string[]
}

export const generate = async (year: number, month: number) => {
  const errors: string[] = []
  const logs: Log[] = []

  const addLog = (
    level: Log['level'],
    message: string,
    status: string = '200',
    tags: string[] = [],
    duration: string = '0ms',
  ) => {
    const log: Log = {
      id: crypto.randomUUID?.() ?? Math.random().toString(36).substring(2, 15),
      timestamp: new Date().toISOString(),
      level,
      service: 'Nöbet Oluşturma',
      message,
      duration,
      status,
      tags,
    }
    logs.push(log)
    console.log(`[${level.toUpperCase()}] ${message}`)
  }

  console.log('\n========================================')
  console.log('=== NÖBET OLUŞTURMA BAŞLADI ===')
  console.log('========================================')

  const auth = await getAuth()
  const group = auth.group as any
  const groupId = group.id
  const cooldownDays = group.cooldownDays || 0
  const payload = await getPayload({ config })

  const drizzle = payload.db.drizzle
  const tables = payload.db.tables

  console.log(`Grup: ${group.name} (id: ${groupId}), Cooldown: ${cooldownDays}`)

  const startOfMonth = new Date(year, month, 1).toISOString()
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59).toISOString()

  const { totalDocs: existingCount } = await payload.find({
    collection: 'duty_schedule',
    where: {
      and: [
        { group: { equals: groupId } },
        { dutyDate: { greater_than_equal: startOfMonth } },
        { dutyDate: { less_than_equal: endOfMonth } },
      ],
    },
    limit: 1,
  })

  if (existingCount > 0) {
    throw new Error(
      `Bu ay (${month + 1}/${year}) için zaten nöbet kaydı var. Lütfen önce mevcut kayıtları silin.`,
    )
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  console.log(`\n📅 ${month + 1}. ay ${daysInMonth} gün çekiyor`)

  // 1) PERSONEL ÇEK
  const { docs: personnelRaw } = await payload.find({
    collection: 'personnel',
    where: {
      and: [{ 'group.id': { equals: groupId } }, { aktif: { equals: true } }],
    },
    depth: 2,
    limit: 1000,
  })

  const personnel = personnelRaw as any[]
  console.log(`\n👥 Aktif personel sayısı: ${personnel.length}`)
  if (!personnel.length) throw new Error('Aktif personel yok')

  console.log('Personeller:')
  personnel.forEach((p) => {
    const scheduleDates =
      p.schedule?.docs?.map((s: any) => toLocalDateString(new Date(s.dutyDate))) || []
    console.log(
      `  - ${p.fullName} (id:${p.id}, rank:${p.rank}, mevcut nöbetler: ${scheduleDates.join(', ') || 'yok'})`,
    )
  })

  // 2) NÖBET TÜRLERİ ÇEK
  console.log('\n📋 NÖBET TÜRLERİ ÇEKİLİYOR...')
  const { docs: dutyTypes } = await payload.find({
    collection: 'duty_types',
    where: { isActive: { equals: true } },
    sort: 'priority',
  })
  console.log(`Aktif nöbet türü sayısı: ${dutyTypes.length}`)

  // 3) NÖBET GÜNLERİNİ OLUŞTUR
  const dutyDayMap = new Map<string, DutyDay>()
  const allDatesBeforeConflict = new Map<string, Array<{ type: string; priority: number }>>()

  console.log('\n🔍 Nöbet türlerine göre günler oluşturuluyor...')
  for (const dt of dutyTypes) {
    const dtAny = dt as any
    console.log(
      `\n--- ${dtAny.name} (priority: ${dtAny.priority}, sortOrder: ${dtAny.sortOrder || 'normal'}) ---`,
    )

    const yc = dtAny.yearConfigs?.find((y: any) => y.year === String(year) && y.isActive)
    if (!yc) {
      console.log(`  ⚠️ ${year} yılı için aktif config yok, atlanıyor`)
      continue
    }

    console.log(`  Cron ifadeleri:`, yc.cronSchedules)
    const dates = getDutyDatesForMonth(yc.cronSchedules, year, month)
    console.log(`  Bulunan gün sayısı: ${dates.length}`)

    if (dates.length > 0) {
      console.log('  Günler:')
      dates.forEach((d) => {
        const dateStr = toLocalDateString(d.date)
        console.log(`    - ${dateStr} (${d.date.toLocaleDateString('tr-TR', { weekday: 'long' })})`)
      })
    }

    for (const { date } of dates) {
      const key = toLocalDateString(date)

      if (!allDatesBeforeConflict.has(key)) {
        allDatesBeforeConflict.set(key, [])
      }
      allDatesBeforeConflict.get(key)!.push({ type: dtAny.name, priority: dtAny.priority })

      const existing = dutyDayMap.get(key)
      if (!existing || dtAny.priority < existing.priority) {
        dutyDayMap.set(key, {
          date,
          dutyTypeId: dt.id,
          priority: dtAny.priority,
          sortOrder: dtAny.sortOrder || 'normal',
          cooldownDays,
        })
      }
    }
  }

  // Çakışma detayları
  console.log('\n⚠️ ÇAKIŞMA ANALİZİ:')
  let conflictCount = 0
  allDatesBeforeConflict.forEach((types, dateStr) => {
    if (types.length > 1) {
      conflictCount++
      const winner = dutyDayMap.get(dateStr)
      console.log(`  ${dateStr}: ${types.map((t) => `${t.type}(p:${t.priority})`).join(' vs ')}`)
      console.log(`    🏆 Kazanan: priority ${winner?.priority}`)
    }
  })
  console.log(`Toplam çakışma: ${conflictCount}`)

  const sortedDutyDays = Array.from(dutyDayMap.values()).sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority
    return a.date.getTime() - b.date.getTime()
  })

  console.log(`\n📊 Çakışma sonrası nöbet günü sayısı: ${sortedDutyDays.length}`)

  // Eksik gün kontrolü
  console.log('\n🔎 EKSİK GÜN KONTROLÜ:')
  const assignedDatesSet = new Set(sortedDutyDays.map((d) => toLocalDateString(d.date)))
  const missingDates: string[] = []
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dateStr = toLocalDateString(date)
    const weekday = date.toLocaleDateString('tr-TR', { weekday: 'long' })
    if (!assignedDatesSet.has(dateStr)) {
      missingDates.push(`${dateStr} (${weekday})`)
    }
  }

  if (missingDates.length > 0) {
    console.log(`❌ ${missingDates.length} gün eksik:`)
    missingDates.forEach((d) => console.log(`  - ${d}`))
    errors.push(...missingDates.map((d) => `${d} tarihi için nöbet tanımlanmamış`))
  } else {
    console.log('✅ Tüm günler için nöbet tanımlanmış')
  }

  console.log('\n📈 NÖBET TÜRÜ DAĞILIMI:')
  const distribution = new Map<number, { name: string; count: number; dates: string[] }>()
  for (const dd of sortedDutyDays) {
    const dt = dutyTypes.find((t) => t.id === dd.dutyTypeId) as any
    const name = dt?.name || `Bilinmeyen(${dd.dutyTypeId})`
    if (!distribution.has(dd.dutyTypeId as number)) {
      distribution.set(dd.dutyTypeId as number, { name, count: 0, dates: [] })
    }
    const dist = distribution.get(dd.dutyTypeId as number)!
    dist.count++
    dist.dates.push(toLocalDateString(dd.date))
  }
  distribution.forEach((value, key) => {
    console.log(`  ${value.name} (id:${key}): ${value.count} nöbet`)
    console.log(`    Tarihler: ${value.dates.join(', ')}`)
  })

  // 4) MAZERETLER
  console.log('\n🚫 MAZERETLER:')
  const exceptionMap = new Map<
    number,
    Array<{ start: Date; end: Date; type: string; durationDays: number }>
  >()
  for (const p of personnel) {
    const excs = p.exceptions?.docs || []
    if (excs.length > 0) {
      console.log(`  ${p.fullName}:`)
      for (const ex of excs) {
        const exData = ex as any
        let type = 'unofficial'
        const excType = exData.exceptions_type
        if (excType && typeof excType === 'object' && 'type' in excType) type = excType.type
        const start = new Date(exData.startDate)
        const end = new Date(exData.endDate)
        const dur = Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1
        console.log(
          `    - ${type}, ${toLocalDateString(start)} - ${toLocalDateString(end)} (${dur} gün)`,
        )
        const list = exceptionMap.get(p.id) || []
        list.push({ start, end, type, durationDays: dur })
        exceptionMap.set(p.id, list)
      }
    }
  }
  if (exceptionMap.size === 0) console.log('  Hiç mazeret yok')

  // 5) SAYAÇ MAP
  const dutyCountMap = new Map<string, number>()
  for (const p of personnel) {
    for (const c of p.counts?.docs || []) {
      const dtId = typeof c.dutyType === 'object' ? c.dutyType.id : c.dutyType
      dutyCountMap.set(`${p.id}_${dtId}`, c.count || 0)
    }
  }

  // 6) ATAMA (LOG'LU)
  console.log('\n🎯 ATAMA İŞLEMİ BAŞLIYOR...')
  const createdAssignments: any[] = []
  const personAssignedDates = new Map<number, Set<string>>()
  personnel.forEach((p) => {
    const dates = new Set<string>()
    p.schedule?.docs?.forEach((s: any) => dates.add(toLocalDateString(new Date(s.dutyDate))))
    personAssignedDates.set(p.id, dates)
  })

  for (let i = 0; i < sortedDutyDays.length; i++) {
    const duty = sortedDutyDays[i]
    const dt = dutyTypes.find((t) => t.id === duty.dutyTypeId) as any
    const dutyDateStr = toLocalDateString(duty.date)
    const weekday = duty.date.toLocaleDateString('tr-TR', { weekday: 'long' })

    // ⚡️ GRUP ANAHTARI EKLENDİ
    const groupKey = `group-${dutyDateStr}`

    let assignedPerson: string | null = null
    let assignmentFailed = false

    const sorted = getSortedPersonnel(personnel, duty.dutyTypeId, duty.sortOrder, dutyCountMap)
    const siralamaStr = sorted
      .map((p, idx) => `${idx + 1}. ${p.fullName} (mevcut:${p._count}, rütbe:${p.rank})`)
      .join('; ')

    // Sıralama logu
    addLog('info', `📋 Sıralama: ${siralamaStr}`, '200', ['islem', dutyDateStr, groupKey])

    let normalAssigned = false
    let officialAssignedTo: number | null = null

    for (const person of sorted) {
      if (!normalAssigned) {
        const excs = exceptionMap.get(person.id) || []
        const activeExc = excs.find((e) => {
          const s = toLocalDateString(e.start),
            eStr = toLocalDateString(e.end)
          return dutyDateStr >= s && dutyDateStr <= eStr
        })

        // Resmî uzun mazeret → resmî ata
        if (activeExc && activeExc.type === 'official' && activeExc.durationDays >= 30) {
          createdAssignments.push({
            personnel: person.id,
            personnelName: person.fullName,
            dutyType: duty.dutyTypeId,
            dutyDate: dutyDateStr,
            group: groupId,
            status: 'scheduled',
            isOffical: true,
          })
          const key = `${person.id}_${duty.dutyTypeId}`
          dutyCountMap.set(key, (dutyCountMap.get(key) || 0) + 1)
          officialAssignedTo = person.id
          addLog(
            'info',
            `🔵 ${person.fullName} resmî mazeretli (uzun süreli), resmî atandı.`,
            '201',
            ['islem', dutyDateStr, groupKey],
          )
          assignedPerson = person.fullName
          normalAssigned = true
          break
        }

        // Mazeretli → atla
        if (activeExc) {
          const tip = activeExc.type === 'official' ? 'resmî' : 'resmî olmayan'
          addLog('warning', `⏭️ ${person.fullName} ${tip} mazeretli, atlandı.`, '429', [
            'islem',
            dutyDateStr,
            groupKey,
          ])
          continue
        }

        // Cooldown kontrolü
        const assignedDates = personAssignedDates.get(person.id) || new Set()
        let tooClose = false
        const checkStart = new Date(duty.date)
        checkStart.setDate(checkStart.getDate() - duty.cooldownDays)
        const checkEnd = new Date(duty.date)
        checkEnd.setDate(checkEnd.getDate() + duty.cooldownDays)

        for (const ds of assignedDates) {
          const [y, m, d] = ds.split('-').map(Number)
          const ad = new Date(y, m - 1, d)
          if (ad >= checkStart && ad <= checkEnd) {
            const diff = calendarDaysBetween(ad, duty.date)
            if (diff <= duty.cooldownDays) {
              addLog(
                'warning',
                `⏭️ ${person.fullName} cooldown (${diff}/${duty.cooldownDays}) -> ${ds}, atlandı.`,
                '429',
                ['islem', dutyDateStr, groupKey],
              )
              tooClose = true
              break
            }
          }
        }
        if (tooClose) continue

        // Normal atama
        createdAssignments.push({
          personnel: person.id,
          personnelName: person.fullName,
          dutyType: duty.dutyTypeId,
          dutyDate: dutyDateStr,
          group: groupId,
          status: 'scheduled',
          isOffical: false,
        })
        const key = `${person.id}_${duty.dutyTypeId}`
        dutyCountMap.set(key, (dutyCountMap.get(key) || 0) + 1)
        personAssignedDates.get(person.id)!.add(dutyDateStr)
        normalAssigned = true
        assignedPerson = person.fullName
        addLog('info', `✅ ${person.fullName} atandı.`, '200', ['islem', dutyDateStr, groupKey])
        break
      }
    }

    // Fallback
    if (!normalAssigned) {
      addLog('warning', `⚠️ Cooldown nedeniyle uygun aday yok, fallback deneniyor...`, '429', [
        'islem',
        dutyDateStr,
        groupKey,
      ])
      for (const person of sorted) {
        if (person.id === officialAssignedTo) continue
        const excs = exceptionMap.get(person.id) || []
        const activeExc = excs.find((e) => {
          const s = toLocalDateString(e.start),
            eStr = toLocalDateString(e.end)
          return dutyDateStr >= s && dutyDateStr <= eStr
        })
        if (activeExc && activeExc.type !== 'official') continue

        createdAssignments.push({
          personnel: person.id,
          personnelName: person.fullName,
          dutyType: duty.dutyTypeId,
          dutyDate: dutyDateStr,
          group: groupId,
          status: 'scheduled',
          isOffical: false,
        })
        const key = `${person.id}_${duty.dutyTypeId}`
        dutyCountMap.set(key, (dutyCountMap.get(key) || 0) + 1)
        personAssignedDates.get(person.id)!.add(dutyDateStr)
        normalAssigned = true
        assignedPerson = person.fullName
        addLog('warning', `⚠️ ${person.fullName} fallback ile atandı.`, '200', [
          'islem',
          dutyDateStr,
          groupKey,
        ])
        break
      }
    }

    if (!normalAssigned) {
      assignmentFailed = true
      addLog('error', `❌ ${dutyDateStr} tarihi için hiçbir personel atanamadı!`, '500', [
        'islem',
        dutyDateStr,
        groupKey,
      ])
      errors.push(`Nöbet atanamadı: ${dutyDateStr}`)
    }

    // Gün sonu başlık logu
    const baslikMesaji = assignmentFailed
      ? `❌ ${dutyDateStr} (${weekday}) - Atama başarısız`
      : `✅ ${dutyDateStr} (${weekday}) - ${assignedPerson} atandı`
    addLog('info', baslikMesaji, assignmentFailed ? '500' : '200', [
      'baslik',
      dutyDateStr,
      groupKey,
    ])
  }

  // 7) TOPLU DB İŞLEMLERİ
  if (createdAssignments.length === 0) {
    errors.push('Hiçbir atama yapılamadı.')
    if (errors.length) throw new Error(errors.join('\n'))
    return { success: true, assignments: [], logs }
  }

  type DutyScheduleStatus = 'draft' | 'scheduled' | 'completed'

  const scheduleRows = createdAssignments.map((a) => ({
    personnel: a.personnel,
    dutyType: a.dutyType,
    dutyDate: a.dutyDate,
    status: 'draft' as DutyScheduleStatus,
    group: groupId,
    isOffical: a.isOffical ?? null,
  }))

  const countAgg = new Map<string, { personnelId: number; dutyTypeId: number; increment: number }>()
  for (const a of createdAssignments) {
    const key = `${a.personnel}_${a.dutyType}`
    const cur = countAgg.get(key) || {
      personnelId: a.personnel,
      dutyTypeId: a.dutyType,
      increment: 0,
    }
    cur.increment++
    countAgg.set(key, cur)
  }

  const countRows = Array.from(countAgg.values()).map((u) => ({
    personnel: u.personnelId,
    dutyType: u.dutyTypeId,
    count: u.increment,
  }))

  try {
    await drizzle.transaction(async (tx) => {
      if (scheduleRows.length > 0) {
        console.log(`  Toplu duty_schedule ekleniyor (${scheduleRows.length} kayıt)`)
        await tx.insert(tables.duty_schedule).values(scheduleRows)
        console.log('  ✅ duty_schedule eklendi')
      }
      revalidatePath('/calender')

      if (countRows.length > 0) {
        console.log(`  Toplu personnel_duty_counts upsert (${countRows.length} kayıt)`)
        await tx
          .insert(tables.personnel_duty_counts)
          .values(countRows)
          .onConflictDoUpdate({
            target: [tables.personnel_duty_counts.personnel, tables.personnel_duty_counts.dutyType],
            set: {
              count: sql`${tables.personnel_duty_counts.count} + EXCLUDED.count`,
            },
          })
        console.log('  ✅ personnel_duty_counts upsert yapıldı')
      }
    })
    console.log('✅ Tüm DB işlemleri başarılı (transaction)')
  } catch (error: any) {
    console.error('❌ DB transaction hatası:', error)
    errors.push(`Toplu DB hatası: ${error.message}`)
  }

  try {
    revalidatePath('/calender')
    console.log('  Cache revalidate edildi')
  } catch (e) {
    errors.push(`Cache revalidation hatası: ${e}`)
  }

  console.log('\n========================================')
  console.log(
    `✅ İŞLEM TAMAMLANDI – ${createdAssignments.length} atama (${createdAssignments.filter((a) => a.isOffical).length} resmî)`,
  )
  console.log(`   ${errors.length} hata`)
  console.log('========================================\n')

  if (errors.length) {
    console.log('❌ HATALAR:')
    errors.forEach((e) => console.log(`   - ${e}`))
    throw new Error(`Nöbet oluşturma tamamlandı ama hatalar var:\n${errors.join('\n')}`)
  }

  return { success: true, assignments: createdAssignments, logs }
}
