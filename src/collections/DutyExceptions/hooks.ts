import { Personnel } from '@/payload-types'
import type { CollectionBeforeChangeHook } from 'payload'

export const checkDuplicateDutyException: CollectionBeforeChangeHook = async ({
  operation,
  data,
  req,
  originalDoc,
}) => {
  // Güncelleme işleminde kendi kaydını hariç tutmak için ID'yi al

  const personnelId = data.personnel
  const currentId = operation === 'update' ? originalDoc?.id : null

  if (!personnelId) {
    return data
  }

  const startDate = new Date(data.startDate)
  const endDate = new Date(data.endDate)
  const existingExceptions = await req.payload.find({
    collection: 'duty_exceptions',
    where: {
      and: [
        { personnel: { equals: personnelId } },
        {
          // Kendi kaydını hariç tut (güncelleme sırasında)
          ...(currentId ? { id: { not_equals: currentId } } : {}),
        },
        {
          or: [
            // Yeni başlangıç, mevcut aralık içinde
            {
              and: [
                { startDate: { less_than_equal: startDate.toISOString() } },
                { endDate: { greater_than_equal: startDate.toISOString() } },
              ],
            },
            // Yeni bitiş, mevcut aralık içinde
            {
              and: [
                { startDate: { less_than_equal: endDate.toISOString() } },
                { endDate: { greater_than_equal: endDate.toISOString() } },
              ],
            },
            // Yeni aralık, mevcut aralığı tamamen kapsıyor
            {
              and: [
                { startDate: { greater_than_equal: startDate.toISOString() } },
                { endDate: { less_than_equal: endDate.toISOString() } },
              ],
            },
          ],
        },
      ],
    },
    limit: 1,
    depth: 0,
  })

  if (existingExceptions.totalDocs > 0) {
    throw new Error(
      `Bu personel için seçilen tarih aralığında (${startDate.toLocaleDateString('tr-TR')} - ${endDate.toLocaleDateString('tr-TR')}) zaten bir mazeret kaydı mevcut. Aynı tarihler için ikinci bir mazeret oluşturulamaz.`,
    )
  }

  return data
}
