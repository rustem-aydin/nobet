'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Group, Personnel } from '@/payload-types'
import { getAuth } from './auth'

export const getAllPersonnels = async (depth: number = 0): Promise<Personnel[]> => {
  const payload = await getPayload({ config })
  const auth = await getAuth()

  const personnels = await payload.find({
    collection: 'personnel',
    depth: depth,
    where: {
      'group.id': { equals: (auth?.group as Group).id },
    },
  })

  return personnels.docs
}

export const getUserById = async (id: string): Promise<Personnel> => {
  const payload = await getPayload({ config })

  const personnel = await payload.find({
    collection: 'personnel',
    where: { id: { equals: id } },
    limit: 1,
    depth: 3,
  })

  return personnel.docs[0]
}
