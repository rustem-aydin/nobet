'use client'

import { LogOut, Moon, Sun, User as UserInfo, Heart } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import Link from 'next/link'
import { Personnel } from '@/payload-types'
import { useThemeToggle } from './theme-toggle'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { logoutAction } from 'actions/auth'

interface NavUserProps {
  personnel: Personnel | null
}

export function NavUser({ personnel }: NavUserProps) {
  const router = useRouter()

  const { isDark, toggleTheme } = useThemeToggle({
    variant: 'rectangle',
    start: 'top-down',
    blur: true,
  })

  const handleLogout = async () => {
    await logoutAction()
    router.refresh()
  }

  const userName = personnel?.fullName || personnel?.email?.split('@')[0] || 'Kullanıcı'
  const userEmail = personnel?.email || ''
  const userAvatar = '/logo.png'
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const menuItems = [
    {
      icon: UserInfo,
      label: 'Profil',
      href: `/users/${personnel?.id}`,
      onClick: undefined,
    },
    {
      icon: Heart,
      label: 'Kaydedilen Filtreler',
      href: undefined,
      onClick: undefined,
      isSheet: true,
    },
    {
      icon: isDark ? Sun : Moon,
      label: 'Tema Değiştir',
      href: undefined,
      onClick: toggleTheme,
    },
    {
      icon: LogOut,
      label: 'Çıkış Yap',
      href: undefined,
      onClick: handleLogout,
      destructive: true,
    },
  ]

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="rounded-xl border bg-card p-3">
          {/* User Header */}
          <div className="flex items-center gap-3 pb-3">
            <Avatar className="h-10 w-10 rounded-lg ">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="rounded-lg bg-card text-sm font-medium text-sidebar-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-sidebar-foreground">{userName}</p>
              <p className="truncate text-xs text-sidebar-foreground/60">{userEmail}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-sidebar-border mb-2" />

          {/* Menu Items */}
          <nav className="flex flex-col gap-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isDestructive = item.destructive

              const baseClasses = cn(
                'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
              )

              const content = (
                <>
                  <Icon className={cn('h-4 w-4 shrink-0', isDestructive && 'text-destructive')} />
                  <span className={cn(isDestructive && 'text-destructive')}>{item.label}</span>
                </>
              )

              if (item.href) {
                return (
                  <Link key={item.label} href={item.href} className={baseClasses}>
                    {content}
                  </Link>
                )
              }

              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={cn(baseClasses, 'w-full text-left')}
                >
                  {content}
                </button>
              )
            })}
          </nav>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
