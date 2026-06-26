'use server'

import { logout } from '@payloadcms/next/auth'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import { cookies, headers } from 'next/headers'
import { Personnel } from '@/payload-types'
import { redirect } from 'next/navigation'
import { LoginFormData } from 'types/schemas'

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

export async function loginAction({ email, password }: LoginFormData) {
  const payload = await getPayload({ config })

  try {
    const result = await payload.login({
      collection: 'personnel',
      data: {
        email: email,
        password: password,
      },
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      })

      // Başarılı login
      return { success: true, user: result.user }
    }
    // Token yoksa başarısız
    return { success: false, message: 'Invalid email or password' }
  } catch (error) {
    // Payload hata fırlatırsa (örn: yanlış şifre)
    const message = error instanceof Error ? error.message : 'Login failed'
    return { success: false, message }
  }
}
