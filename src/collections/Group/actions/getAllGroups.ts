'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Group, Personnel } from '@/payload-types'

export const getAllGroups = async (depth: number = 0): Promise<Group[]> => {
  const payload = await getPayload({ config })

  const groups = await payload.find({
    collection: 'groups',
    depth: depth,
  })

  return groups.docs
}
