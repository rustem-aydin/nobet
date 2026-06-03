'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DutyExceptionsType } from '@/payload-types'

export const getAllDutyExceptionTypes = async (
  depth: number = 0,
): Promise<DutyExceptionsType[]> => {
  const payload = await getPayload({ config })

  const types = await payload.find({
    collection: 'duty_exceptions_types',
    depth: depth,
  })

  return types.docs
}
