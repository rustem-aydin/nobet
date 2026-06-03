import React from 'react'
import './globals.css'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/theme-provider'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Toaster } from '@/components/ui/sonner'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers: await headers() })
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          themes={['light', 'dark', 'night', 'doga', 'stars']}
        >
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar personnel={user} />
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
          <Toaster position="top-right" richColors /> {/* ← BU EKLENMELİ */}
        </ThemeProvider>
      </body>
    </html>
  )
}
