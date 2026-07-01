// actions/checkEmailUnique.ts (örnek)
'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export async function checkEmailUnique(email: string): Promise<boolean> {
  const existing = await payload.find({
    collection: 'personnel',
    where: {
      and: [{ email: { equals: email } }],
    },
    limit: 1,
  })
  return existing.totalDocs === 0
}
