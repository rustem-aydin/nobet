// actions/Personnel/updateRank.ts
'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { revalidatePath } from 'next/cache'

// actions/Personnel/updateRank.ts
export async function deletePersonnel(id: number) {
  const payload = await getPayload({ config })
  const auth = await getAuth()

  // 1. Önce duty_schedule kayıtlarını sil
  await payload.delete({
    collection: 'duty_schedule',
    where: { 'personnel.id': { equals: id } }, // id'yi doğrudan ver
    user: auth,
    overrideAccess: false,
  })

  // 2. Sonra personnel_duty_counts kayıtlarını sil
  await payload.delete({
    collection: 'personnel_duty_counts',
    where: { 'personnel.id': { equals: id } }, // ← Burada da { id } yerine id
    user: auth,
    overrideAccess: false,
  })

  // 3. En son personeli sil
  const personnel = await payload.delete({
    collection: 'personnel',
    id,
    user: auth,
    overrideAccess: false,
  })

  revalidatePath('/schedule')
  return { success: true }
}
