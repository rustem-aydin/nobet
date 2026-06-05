'use server'

import { logout } from '@payloadcms/next/auth'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import { Personnel } from '@/payload-types'
import { LoginFormValues } from 'types/schemas'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  try {
    await logout({ allSessions: true, config })
  } catch (error) {
    throw new Error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  revalidatePath('/', 'layout')
}

export async function getAuth(): Promise<Personnel> {
  const payload = await getPayload({ config })
  const user = await payload.auth({ headers: await headers() })
  return user.user as Personnel
}

export async function loginAction({ email, password }: LoginFormValues) {
  const payload = await getPayload({ config })

  const result = await payload.login({
    collection: 'personnel',
    data: {
      email: email,
      password: password,
    },
  })
  if (result.token) {
    redirect('/exceptions')
  }
  return result
}
