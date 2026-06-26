'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DutySchedule } from '@/payload-types'

export const getNobetdasPersonnels = async ({
  date,
}: {
  date: string
}): Promise<DutySchedule[]> => {
  const payload = await getPayload({ config })
  const duty = await payload.find({
    collection: 'duty_schedule',
    depth: 0,
    sort: 'rank',
    limit: 1000,
    where: {
      dutyDate: {
        equals: date,
      },
    },
  })
  console.log(duty)

  return duty.docs
}
