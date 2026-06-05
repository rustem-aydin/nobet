import { Suspense } from 'react'
import { ScheduleCalendar } from '@/features/schedule/components/schedule-calendar'
import { ScheduleSkeleton } from '@/features/schedule/components/schedule-skeleton'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { getAllPersonnels } from 'actions/personnel'
import { getAuth } from 'actions/auth'
import { getAllDutyTypes } from 'actions/duty_types'

export default async function SchedulePage() {
  const users = await getAllPersonnels(0)
  const auth = await getAuth()
  const duty_types = await getAllDutyTypes(0)

  return (
    <main className="flex max-h-screen flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 mt-1 data-[orientation=vertical]:h-5" />
          <span className="text-xl">Nöbet Çizelgesi</span>
        </div>
      </header>
      <div className="px-8">
        <Suspense fallback={<ScheduleSkeleton />}>
          <ScheduleCalendar duty_types={duty_types} auth={auth} personnels={users} />
        </Suspense>
      </div>
    </main>
  )
}
