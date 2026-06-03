'use server'

import { logout } from '@payloadcms/next/auth'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import { Personnel } from '@/payload-types'

export async function logoutAction() {
  try {
    await logout({ allSessions: true, config })
  } catch (error) {
    throw new Error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  // 1. Önce tüm sayfa önbelleğini temizle (veya spesifik bir path: '/')
  revalidatePath('/', 'layout')
}

export async function getAuth(): Promise<Personnel> {
  const payload = await getPayload({ config })
  const user = await payload.auth({ headers: await headers() })
  return user.user as Personnel
}
