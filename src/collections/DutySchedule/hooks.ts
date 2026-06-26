import { CollectionBeforeValidateHook, FieldHook } from 'payload'
import type { CollectionBeforeChangeHook, CollectionBeforeDeleteHook } from 'payload'

const getYearMonth = (date: Date): { year: number; month: number } => ({
  year: date.getFullYear(),
  month: date.getMonth(), // 0-11 (Ocak=0, Aralık=11)
})
export const validateNextMonthOnly: FieldHook = ({ value, operation }) => {
  if (operation !== 'create') {
    return value
  }

  if (!value) {
    throw new Error('Nöbet tarihi zorunludur.')
  }

  const now = new Date()
  const currentYearMonth = getYearMonth(now)

  // İzin verilen maksimum ayı hesapla (mevcut ay + 1)
  let maxMonth = currentYearMonth.month + 1
  let maxYear = currentYearMonth.year

  if (maxMonth > 11) {
    maxMonth = 0
    maxYear += 1
  }

  const dateStr = value as string
  const dates = dateStr.includes(' to ') ? dateStr.split(' to ') : dateStr.split(',')

  for (const datePart of dates) {
    const trimmedDate = datePart.trim()
    if (!trimmedDate) continue

    // TIMEZONE sorununu önlemek için string'den direkt parse et
    const dateOnly = trimmedDate.split('T')[0]
    const [yearStr, monthStr] = dateOnly.split('-')

    const dutyYear = parseInt(yearStr, 10)
    const dutyMonth = parseInt(monthStr, 10) - 1 // 0-indexed (0=Ocak)

    // Kontrol: seçilen ay mevcut aydan önceki veya izin verilen maksimum aydan sonraki olamaz
    // Yani: currentYearMonth ≤ dutyYearMonth ≤ maxYearMonth

    // Önce mevcut aydan önce mi kontrol et
    if (
      dutyYear < currentYearMonth.year ||
      (dutyYear === currentYearMonth.year && dutyMonth < currentYearMonth.month)
    ) {
      throw new Error(`Geçmiş aylara nöbet planlaması yapılamaz.`)
    }

    // Sonra maksimum aydan sonra mı kontrol et
    if (dutyYear > maxYear || (dutyYear === maxYear && dutyMonth > maxMonth)) {
      throw new Error(
        `Nöbet planlaması en fazla bir sonraki ay (${maxYear}-${String(maxMonth + 1).padStart(2, '0')}) için yapılabilir.`,
      )
    }
  }

  return value
}
export const validateSingleUnofficialDuty: CollectionBeforeValidateHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  // Sadece resmi olmayan kayıtlar için
  if (data?.isOffical === false && data?.dutyDate) {
    // Grup değerini al
    const groupValue = data?.group ?? originalDoc?.group

    // LOG 1: Hangi grup değeriyle çalışıyoruz?
    console.log('🔍 groupValue:', groupValue)
    console.log('🔍 groupValue type:', typeof groupValue)
    console.log('🔍 data.group:', data?.group)
    console.log('🔍 originalDoc.group:', originalDoc?.group)

    // Eğer grup yoksa atla (isteğe bağlı)
    if (!groupValue) {
      console.log('⚠️ Grup yok, kontrol atlanıyor.')
      return
    }

    // Grup ID'sini al (obje ise)
    const groupId = typeof groupValue === 'object' ? groupValue.id : groupValue
    console.log('🔍 groupId (sorguda kullanılacak):', groupId)

    // Sorguyu oluştur
    const whereCondition: any = {
      and: [
        { dutyDate: { equals: data.dutyDate } },
        { isOffical: { equals: false } },
        { group: { equals: groupId } }, // Grup ID'si ile eşleştir
      ],
    }

    if (operation === 'update' && originalDoc?.id) {
      whereCondition.and.push({ id: { not_equals: originalDoc.id } })
    }

    // LOG 2: Sorguyu göster
    console.log('🔍 Sorgu:', JSON.stringify(whereCondition, null, 2))

    // Sorguyu çalıştır
    const existing = await req.payload.find({
      collection: 'duty_schedule',
      where: whereCondition,
      limit: 1,
    })

    console.log('🔍 Bulunan kayıt sayısı:', existing.totalDocs)
    if (existing.docs.length > 0) {
      console.log('🔍 Bulunan kaydın ID:', existing.docs[0].id)
      console.log('🔍 Bulunan kaydın grubu:', existing.docs[0].group)
    }

    if (existing.totalDocs > 0) {
      throw new Error(
        'Bu tarih için aynı grupta resmi olmayan bir nöbet kaydı zaten mevcut. Aynı tarihte aynı grupta yalnızca bir tane "isOffical=false" kaydı olabilir.',
      )
    }
  }
}
// hooks/autoCompleteStatus.ts

export const autoCompleteStatus: CollectionBeforeChangeHook = ({ data }) => {
  // dutyDate yoksa veya zaten completed ise dokunma
  if (!data?.dutyDate || data?.status === 'completed') {
    return data
  }

  const dutyDate = new Date(data.dutyDate)
  const now = new Date()

  // Zaman karşılaştırmasını sadece gün bazında yapmak için saatleri sıfırla
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dutyDay = new Date(dutyDate.getFullYear(), dutyDate.getMonth(), dutyDate.getDate())

  if (dutyDay < today) {
    return {
      ...data,
      status: 'completed',
    }
  }

  return data
}

export const preventDeleteCompleted: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const doc = await req.payload.findByID({
    collection: 'duty_schedule',
    id,
  })
  if (!doc) return

  if (doc.status === 'completed') {
    throw new Error('Tamamlanmış (completed) nöbet kayıtları silinemez.')
  }

  // 2) Planlanmış (scheduled) ise ve bugün saat 09:00 geçmişse engelle
  if (doc.status === 'scheduled') {
    const now = new Date()
    const dutyDate = new Date(doc.dutyDate)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const dutyDay = new Date(dutyDate.getFullYear(), dutyDate.getMonth(), dutyDate.getDate())

    if (dutyDay.getTime() === today.getTime()) {
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      if (currentHour > 9 || (currentHour === 9 && currentMinute >= 0)) {
        throw new Error(
          "Bugün saat 09:00'u geçmiş planlanmış (scheduled) nöbet kayıtları silinemez.",
        )
      }
    }
  }

  // 3) Draft ise hiçbir engel yok, silinebilir.
}
