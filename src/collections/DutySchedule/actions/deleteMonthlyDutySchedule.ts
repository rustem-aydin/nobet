'use server'
import { sql, eq, inArray, and } from 'drizzle-orm'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function deleteMonthlyDutySchedule(year: number, month: number) {
  const auth = await getAuth()
  const group = auth.group as any
  const groupId = group.id
  const payload = await getPayload({ config })
  const drizzle = payload.db.drizzle
  const tables = payload.db.tables

  const startDate = new Date(year, month, 1)
  const endDate = new Date(year, month + 1, 0, 23, 59, 59)

  // 1) Silinecek tüm kayıtları çek
  const allDocs: any[] = []
  let page = 1
  while (true) {
    const { docs, hasNextPage } = await payload.find({
      collection: 'duty_schedule',
      where: {
        and: [
          { group: { equals: groupId } },
          { dutyDate: { greater_than_equal: startDate.toISOString() } },
          { dutyDate: { less_than_equal: endDate.toISOString() } },
        ],
      },
      limit: 999,
      page,
    })
    allDocs.push(...docs)
    if (!hasNextPage) break
    page++
  }

  if (allDocs.length === 0) {
    return { deleted: 0, affectedPersonnel: 0 }
  }

  // ========== YENİ KONTROL (hook ile aynı mantık) ==========
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const isAfter9 = currentHour > 9 || (currentHour === 9 && currentMinute >= 0)

  const blockedDocs: { id: string; reason: string }[] = []

  for (const doc of allDocs) {
    // 1) completed ise engelle
    if (doc.status === 'completed') {
      blockedDocs.push({ id: doc.id, reason: 'Tamamlanmış (completed)' })
      continue
    }

    // 2) scheduled ise ve bugün saat 9 geçmişse engelle
    if (doc.status === 'scheduled') {
      const dutyDate = new Date(doc.dutyDate)
      const dutyDay = new Date(dutyDate.getFullYear(), dutyDate.getMonth(), dutyDate.getDate())
      if (dutyDay.getTime() === today.getTime() && isAfter9) {
        blockedDocs.push({ id: doc.id, reason: 'Bugün saat 09:00 geçmiş (scheduled)' })
      }
    }

    // 3) draft ise hiçbir şey yapma (serbest)
  }

  if (blockedDocs.length > 0) {
    const reasons = blockedDocs.map((d) => `${d.id} (${d.reason})`).join('; ')
    throw new Error(
      `Aşağıdaki kayıtlar silinemez: ${reasons}. Lütfen bu kayıtları manuel olarak kontrol edin.`,
    )
  }
  // ========================================================

  // 2) Etkilenen personel ID'leri
  const affectedPersonIds = [
    ...new Set(
      allDocs.map((d) => (typeof d.personnel === 'object' ? d.personnel.id : d.personnel)),
    ),
  ]

  // 3) Nöbet türüne göre silinecek sayıları hesapla
  const deleteCountMap = new Map<string, number>()
  for (const doc of allDocs) {
    const pid = typeof doc.personnel === 'object' ? doc.personnel.id : doc.personnel
    const dtid = typeof doc.dutyType === 'object' ? doc.dutyType.id : doc.dutyType
    const key = `${pid}_${dtid}`
    deleteCountMap.set(key, (deleteCountMap.get(key) ?? 0) + 1)
  }

  const idsToDelete = allDocs.map((d) => d.id)

  // 4) Drizzle transaction
  try {
    await drizzle.transaction(async (tx) => {
      if (idsToDelete.length > 0) {
        await tx.delete(tables.duty_schedule).where(inArray(tables.duty_schedule.id, idsToDelete))
      }

      if (deleteCountMap.size > 0) {
        for (const [key, decCount] of deleteCountMap) {
          const [pid, dtid] = key.split('_')
          const existing = await tx
            .select({
              id: tables.personnel_duty_counts.id,
              count: tables.personnel_duty_counts.count,
            })
            .from(tables.personnel_duty_counts)
            .where(
              and(
                eq(tables.personnel_duty_counts.personnel, Number(pid)),
                eq(tables.personnel_duty_counts.dutyType, Number(dtid)),
              ),
            )
            .then((rows) => rows[0])

          if (existing) {
            const newCount = Math.max(0, (existing.count || 0) - decCount)
            await tx
              .update(tables.personnel_duty_counts)
              .set({ count: newCount })
              .where(eq(tables.personnel_duty_counts.id, existing.id))
          }
        }
      }
    })
  } catch (error) {
    throw new Error(`Silme işlemi sırasında hata: ${error}`)
  }

  // 5) Personel lastDutyDate güncelle
  const { docs: remainingDuties } = await payload.find({
    collection: 'duty_schedule',
    where: {
      and: [{ personnel: { in: affectedPersonIds } }, { group: { equals: groupId } }],
    },
    sort: '-dutyDate',
    limit: 999,
  })

  const lastDateByPersonnel = new Map<number, string | null>()
  for (const d of remainingDuties) {
    const pid = typeof d.personnel === 'object' ? d.personnel.id : d.personnel
    if (!lastDateByPersonnel.has(pid)) {
      lastDateByPersonnel.set(pid, d.dutyDate)
    }
  }

  revalidatePath('/calender')
  return {
    deleted: allDocs.length,
    affectedPersonnel: affectedPersonIds.length,
  }
}
