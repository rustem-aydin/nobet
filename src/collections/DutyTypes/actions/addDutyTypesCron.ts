// app/actions/duty-types.ts (örnek)
'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { revalidatePath } from 'next/cache'

export const addCronSchedule = async (dutyTypeId: number, description: string, cron: string) => {
  const payload = await getPayload({ config })
  const auth = await getAuth()

  // Mevcut dutyType'ı getir
  const dutyType = await payload.findByID({
    collection: 'duty_types',
    id: dutyTypeId,
  })

  const existingSchedules = (dutyType.cronSchedules as any[]) || []

  // Yeni zamanı ekle
  const updated = await payload.update({
    collection: 'duty_types',
    id: dutyTypeId,
    user: auth,
    overrideAccess: false,
    data: {
      cronSchedules: [
        ...existingSchedules,
        { description, cron }, // alan isimlerinizi duty_type şemasına göre ayarlayın
      ],
    },
  })

  revalidatePath('/dates')
  return updated
}
