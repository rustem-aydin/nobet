'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })

export async function getScheduleByDutyType(dutyTypeId: string, year: number, month: number) {
  const startDate = new Date(Date.UTC(year, month, 1)).toISOString()
  const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59)).toISOString()

  const schedules = await payload.find({
    collection: 'duty_schedule',
    where: {
      dutyType: { equals: dutyTypeId },
      dutyDate: {
        greater_than_equal: startDate,
        less_than_equal: endDate,
      },
    },
    sort: 'dutyDate',
    depth: 2,
  })

  return schedules.docs
}
