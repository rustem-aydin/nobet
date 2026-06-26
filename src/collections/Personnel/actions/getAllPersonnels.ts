'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Group, Personnel } from '@/payload-types'
import { getAuth } from '@/collections/Personnel/actions/auth'

export const getAllPersonnels = async (depth: number = 0): Promise<Personnel[]> => {
  const payload = await getPayload({ config })
  const auth = await getAuth()

  const personnels = await payload.find({
    collection: 'personnel',
    depth: depth,
    sort: 'rank',
    limit: 1000,
    pagination: false,
    where: {
      'group.id': { equals: (auth?.group as Group).id },
    },
  })

  return personnels.docs
}
