'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { revalidatePath } from 'next/cache'

export async function updateDutyTypeOrder(updates: { id: number; rank: number }[]) {
  if (!updates || updates.length === 0) return { success: true }

  const payload = await getPayload({ config })
  const auth = await getAuth()

  for (const { id, rank } of updates) {
    try {
      const result = await payload.update({
        collection: 'duty_types',
        id,
        data: {
          priority: rank,
        },
        user: auth,
        overrideAccess: true, // ← admin olmayan kullanıcılar için erişim engelini kaldır
      })
    } catch (error) {
      console.error(`DutyType ${id} güncellenemedi:`, error)
      throw new Error(`DutyType ${id} güncellenemedi`)
    }
  }

  revalidatePath('/dates') // kendi sayfa path'in ile değiştir (ör: '/cetele')
  return { success: true }
}
