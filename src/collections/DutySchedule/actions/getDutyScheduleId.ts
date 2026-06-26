'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DutySchedule } from '@/payload-types'
const payload = await getPayload({ config })

export async function getScheduleById(id: number): Promise<DutySchedule> {
  const schedules = await payload.findByID({
    collection: 'duty_schedule',
    id,
  })

  return schedules
}
