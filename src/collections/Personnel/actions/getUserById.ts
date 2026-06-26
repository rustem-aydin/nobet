'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Personnel } from '@/payload-types'

export const getUserById = async (id: string): Promise<Personnel> => {
  const payload = await getPayload({ config })

  const personnel = await payload.findByID({
    collection: 'personnel',
    id,
    depth: 3,
  })

  return personnel
}
