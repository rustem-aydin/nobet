'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DutySchedule, Group } from '@/payload-types'
import { getAuth } from './auth'
export type DutyScheduleLite = Pick<DutySchedule, 'id' | 'personnel' | 'group'>

export const getNobetdasPersonnels = async ({
  date,
}: {
  date: string
}): Promise<DutyScheduleLite[]> => {
  const auth = await getAuth()
  const group = auth.group as Group

  const parent =
    typeof group.parent_group === 'object' && group.parent_group !== null
      ? group.parent_group.id
      : group.parent_group

  const payload = await getPayload({ config })
  const duty = await payload.find({
    collection: 'duty_schedule',
    depth: 2,
    sort: 'rank',
    limit: 1000,
    select: { personnel: true, group: true },
    populate: {
      groups: {
        name: true,
      },
      personnel: {
        fullName: true,
        group: true,
      },
    },
    where: {
      and: [
        {
          dutyDate: { equals: date },
        },
        {
          'personnel.group.parent_group': { equals: parent },
        },
      ],
    },
  })
  console.log(JSON.stringify(duty, null, 2))
  return duty.docs
}
