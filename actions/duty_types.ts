'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DutyType } from '@/payload-types'

export const getAllDutyTypes = async (depth: number = 0): Promise<DutyType[]> => {
  const payload = await getPayload({ config })
  const exceptions = await payload.find({
    collection: 'duty_types',
    depth,
  })
  return exceptions.docs
}
