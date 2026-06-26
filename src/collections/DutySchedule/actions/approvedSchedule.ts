'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { DutySchedule, Group } from '@/payload-types'
import { revalidatePath } from 'next/cache'

const payload = await getPayload({ config })

export const approvedDuty = async (year: number, month: number): Promise<DutySchedule[]> => {
  const auth = await getAuth()
  const startDate = new Date(year, month, 1)
  const endDate = new Date(year, month + 1, 0, 23, 59, 59)
  const group = auth.group as Group
  const groupId = group.id
  // 1. Personel oluştur
  const personnel = await payload.update({
    collection: 'duty_schedule',
    where: {
      and: [
        { group: { equals: groupId } },
        { dutyDate: { greater_than_equal: startDate.toISOString() } },
        { dutyDate: { less_than_equal: endDate.toISOString() } },
      ],
    },
    user: auth,
    overrideAccess: false,
    data: {
      status: 'scheduled',
    },
  })

  revalidatePath('/schedule')
  return personnel.docs
}
