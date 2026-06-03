'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Personnel } from '@/payload-types'

export const getAllPersonnels = async (depth: number = 0): Promise<Personnel[]> => {
  const payload = await getPayload({ config })

  const personnels = await payload.find({
    collection: 'personnel',
    depth: depth,
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
