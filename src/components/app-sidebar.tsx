'use client'

import * as React from 'react'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  TerminalSquareIcon,
  FrameIcon,
  Table,
  Calendar1,
  CalendarCheck,
  CalendarSearch,
} from 'lucide-react'
import { Group, Personnel } from '@/payload-types'
import { NavMenu } from './nav-main'

const data = {
  navMain: [
    {
      name: 'Anasayfa',
      url: '/',
      icon: <TerminalSquareIcon />,
    },
  ],
  duty: [
    {
      name: 'Çetele',
      url: '/schedule',
      icon: <Table />,
    },
    {
      name: 'Takvim',
      url: '/calendar',
      icon: <Calendar1 />,
    },
    {
      name: 'Mazeretler',
      url: '/exceptions',
      icon: <CalendarCheck />,
    },
    {
      name: 'Nöbet Tarihleri',
      url: '/dates',
      icon: <CalendarSearch />,
    },
  ],
  others: [
    {
      name: 'Diğer Listeler',
      url: '/others',
      icon: <FrameIcon />,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  personnel: Personnel | any
}

export function AppSidebar({ personnel, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={personnel?.group as Group} />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu label="Genel" items={data.navMain} />
        <NavMenu label="Nöbet" items={data.duty} />
        <NavMenu label="Diğer" items={data.others} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser personnel={personnel} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
