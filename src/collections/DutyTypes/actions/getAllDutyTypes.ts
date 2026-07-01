'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DutyType, Group } from '@/payload-types'
import { getAuth } from '@/collections/Personnel/actions/auth'

export const getAllDutyTypes = async (
  depth: number = 0,
  year: number = new Date(Date.now()).getFullYear(),
): Promise<DutyType[]> => {
  const auth = await getAuth()
  const payload = await getPayload({ config })
  const types = await payload.find({
    collection: 'duty_types',
    depth,
    limit: 100,
    sort: 'priority',
    where: {
      and: [
        {
          group: {
            equals: (auth.group as Group).id,
          },
        },
        {
          year: {
            equals: year,
          },
        },
      ],
    },
  })
  return types.docs
}
