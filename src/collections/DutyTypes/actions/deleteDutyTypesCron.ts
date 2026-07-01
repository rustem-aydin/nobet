// app/actions/duty-types.ts
'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { revalidatePath } from 'next/cache'

export const deleteCronSchedule = async (dutyTypeId: number, schedule: string) => {
  const payload = await getPayload({ config })
  const auth = await getAuth()

  // Mevcut dutyType'ı getir
  const dutyType = await payload.findByID({
    collection: 'duty_types',
    id: dutyTypeId,
  })

  const existingSchedules = (dutyType.cronSchedules as any[]) || []

  // Eşleşen ID'ye sahip öğeyi diziden çıkar
  const updatedSchedules = existingSchedules.filter((item) => item.cron !== schedule)

  // Güncelleme işlemini gerçekleştir
  const updated = await payload.update({
    collection: 'duty_types',
    id: dutyTypeId,
    user: auth,
    overrideAccess: false,
    data: {
      cronSchedules: updatedSchedules,
    },
  })

  revalidatePath('/dates')
  return updated
}
