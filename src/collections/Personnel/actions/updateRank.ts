// actions/Personnel/updateRank.ts
'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { revalidatePath } from 'next/cache'

// actions/Personnel/updateRank.ts
export async function updateRank({ updates }: { updates: { id: number; rank: number }[] }) {
  if (updates.length === 0) return { success: true }

  const payload = await getPayload({ config })
  const auth = await getAuth()

  for (const { id, rank } of updates) {
    await payload.update({
      collection: 'personnel',
      id,
      data: { rank },
      user: auth,
      overrideAccess: false,
    })
  }

  revalidatePath('/cetele')
  return { success: true }
}
