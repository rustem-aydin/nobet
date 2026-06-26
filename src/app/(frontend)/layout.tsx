import React from 'react'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

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
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
