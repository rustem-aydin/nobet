import CronExpressionParser from 'cron-parser'
import { APIError, CollectionBeforeValidateHook } from 'payload'

export const beforeValid: CollectionBeforeValidateHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  if (data?.cronSchedules && Array.isArray(data.cronSchedules)) {
    const cronRegex =
      /^(\*|([0-5]?\d)|(\*\/\d+)|(\d+-\d+)) (\*|(1?\d|2[0-3])|(\*\/\d+)|(\d+-\d+)) (\*|([1-9]|[12]\d|3[01])|(\*\/\d+)|(\d+-\d+)) (\*|([1-9]|1[0-2])|(\*\/\d+)|(\d+-\d+)) (\*|[0-6]|(\*\/\d+)|(\d+-\d+))$/

    for (const [index, schedule] of data.cronSchedules.entries()) {
      if (!schedule.cron) {
        throw new Error(`Cron ifadesi zorunludur (${index + 1}. öğe)`)
      }
      if (!cronRegex.test(schedule.cron)) {
        throw new Error(`Geçersiz cron formatı: "${schedule.cron}" (${index + 1}. öğe)`)
      }
      try {
        CronExpressionParser.parse(schedule.cron)
      } catch {
        throw new Error(`Cron ayrıştırılamadı: "${schedule.cron}" (${index + 1}. öğe)`)
      }
    }
  }
}

// hooks/checkGlobalCronUniqueness.ts

export const checkGlobalCronUniqueness: CollectionBeforeValidateHook = async ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  const cronSchedules = data?.cronSchedules
  if (!cronSchedules || !Array.isArray(cronSchedules) || cronSchedules.length === 0) {
    return data
  }

  // Her bir cron-year çiftini oluştur (her ikisi de dolu olanlar)
  const cronYearPairs = cronSchedules
    .filter((item: any) => item.cron && item.year)
    .map((item: any) => ({ cron: item.cron, year: item.year }))

  if (cronYearPairs.length === 0) return data

  // Sadece cron ifadelerine göre sorgu koşulu oluştur
  const crons = [...new Set(cronYearPairs.map((p) => p.cron))]
  const where: any = {
    'cronSchedules.cron': { in: crons },
  }

  // Güncelleme ise kendi ID'sini hariç tut
  if (operation === 'update' && originalDoc?.id) {
    where.id = { not_equals: originalDoc.id }
  }

  // Eşleşen tüm belgeleri al
  const existing = await req.payload.find({
    collection: 'duty_types',
    where,
    limit: 0, // Tüm eşleşenleri getirmek için
  })

  // Her bir cron-year çifti için çakışma kontrolü yap
  const conflicts: string[] = []

  for (const pair of cronYearPairs) {
    for (const doc of existing.docs) {
      const hasConflict = doc.cronSchedules?.some(
        (s: any) => s.cron === pair.cron && Number(s.year) === Number(pair.year),
      )
      if (hasConflict) {
        conflicts.push(`${pair.cron} (${pair.year} yılı)`)
        break // Bu çift için çakışma bulundu, diğer belgelere bakmaya gerek yok
      }
    }
  }

  if (conflicts.length > 0) {
    const uniqueConflicts = [...new Set(conflicts)]
    throw new APIError(
      `Bu cron ifadeleri zaten başka bir Nöbet Türünde kullanılıyor: ${uniqueConflicts.join(', ')}`,
      400,
    )
  }

  return data
}
