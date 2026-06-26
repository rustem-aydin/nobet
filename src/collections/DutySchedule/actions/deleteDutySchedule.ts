'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Personnel } from '@/payload-types'
import { toLocalDateString } from '@/helpers/dutyScheduler'
import { revalidatePath } from 'next/cache'
import { getAuth } from '@/collections/Personnel/actions/auth'
const payload = await getPayload({ config })

export async function deleteDutySchedule({
  personnel,
  date,
}: {
  personnel: Personnel
  date: Date
}) {
  const personnelId = personnel?.id
  if (!personnelId) {
    throw new Error('Personnel ID is required')
  }
  const auth = await getAuth()
  const dutyDateStr = toLocalDateString(date)

  const newDuty = await payload.delete({
    collection: 'duty_schedule',
    user: auth,
    overrideAccess: false,
    where: {
      and: [
        {
          dutyDate: { equals: dutyDateStr }, // ✅ nesne değil, doğrudan string
          'personnel.id': { equals: personnelId }, // ✅ nesne değil, doğrudan id
        },
      ],
    },
  })
  revalidatePath('/calendar')

  return {
    success: true,
    duty: newDuty,
  }
}
