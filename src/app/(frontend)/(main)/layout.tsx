import React from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers: await headers() })
  return (
    <SidebarProvider>
      <AppSidebar personnel={user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
