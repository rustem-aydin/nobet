import type { CollectionBeforeChangeHook, Where } from 'payload'

// Timezone kayması olmaması için günü sabitleyen fonksiyon
const normalizeDateToDayOnly = (dateStr: string): string => {
  const date = new Date(dateStr)

  // Kullanıcının yerel saatindeki (Örn: Türkiye saati) Gün, Ay, Yıl bilgilerini alıyoruz
  // getFullYear, getMonth, getDate fonksiyonları yerel zamana göre çalışır.
  const year = date.getFullYear()
  const month = date.getMonth() // 0-indexed (Ocak = 0)
  const day = date.getDate()

  // Bu yerel tarih bilgisini kullanarak, UTC zaman diliminde tam gece yarısı (00:00:00) olan yeni bir tarih oluşturuyoruz.
  // Bu sayede 10 Haziran seçilirse, veritabanına kesinlikle 10 Haziran 00:00:00Z olarak kaydedilir.
  const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0))

  return utcDate.toISOString()
}

export const checkDuplicateDutyException: CollectionBeforeChangeHook = async ({
  operation,
  data,
  req,
  originalDoc,
}) => {
  const personnelId = data.personnel
  const currentId = operation === 'update' ? originalDoc?.id : null

  if (!personnelId || !data.startDate || !data.endDate) {
    return data
  }

  // Gelen tarihleri artık doğru bir şekilde gün bazlı normalize ediyoruz
  const newStartDate = normalizeDateToDayOnly(data.startDate)
  const newEndDate = normalizeDateToDayOnly(data.endDate)

  // Veritabanına da sadece gün olarak kaydediyoruz
  data.startDate = newStartDate
  data.endDate = newEndDate

  const andConditions: Where[] = [
    { personnel: { equals: personnelId } },
    { startDate: { less_than_equal: newEndDate } },
    { endDate: { greater_than_equal: newStartDate } },
  ]

  if (currentId) {
    andConditions.push({ id: { not_equals: currentId } })
  }

  const existingExceptions = await req.payload.find({
    collection: 'duty_exceptions',
    where: { and: andConditions },
    limit: 1,
    depth: 0,
  })

  if (existingExceptions.totalDocs > 0) {
    const start = new Date(newStartDate).toLocaleDateString('tr-TR')
    const end = new Date(newEndDate).toLocaleDateString('tr-TR')

    throw new Error(`Bu tarih aralığında (${start} - ${end}) zaten bir mazeret kaydınız mevcut.`)
  }

  return data
}
