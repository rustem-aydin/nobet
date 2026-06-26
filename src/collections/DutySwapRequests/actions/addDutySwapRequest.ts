'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { DutySwapsFormValues } from 'types'
import { isCooldownDaysBeetween } from '@/collections/Personnel/actions/isCooldownDaysBeetween'
import { getScheduleById } from '@/collections/DutySchedule/actions/getDutyScheduleId'
import { getUserById } from '@/collections/Personnel/actions/getUserById'

export async function addDutySwapRequest(values: DutySwapsFormValues) {
  const payload = await getPayload({ config })
  const auth = await getAuth()
  try {
    if (values.type === 'mutual') {
    } else if (values.type === 'unilateral') {
      const schedule = await getScheduleById(Number(values.targetDuty))
      const personnel = await getUserById(String(values.requesterPersonnel))

      const isCooldownDays = await isCooldownDaysBeetween({
        date: new Date(schedule?.dutyDate),
        personnel: personnel,
      })
    }
    // const swaps = await payload.create({
    //   collection: 'duty_swap_requests',
    //   data: {
    //     requesterDuty: values.requesterDuty,
    //     requesterPersonnel: values.requesterPersonnel,
    //     targetDuty: values.targetDuty,
    //     targetPersonnel: values.targetPersonnel,
    //     type: values.type,
    //     status: values.status,
    //   },
    //   user: auth,
    //   overrideAccess: false,
    // })
    return auth
  } catch (error) {}

  revalidatePath('/calendar')
}
