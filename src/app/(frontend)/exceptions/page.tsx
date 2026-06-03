import { Suspense } from 'react'
import { Calendar } from '@/features/calendar/calendar'
import { CalendarSkeleton } from '@/features/calendar/skeletons/calendar-skeleton'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { getAllDutyExceptions } from 'actions/duty_exceptions'
import { getAllPersonnels } from 'actions/personnel'
import { getAuth } from 'actions/auth'
import { getAllDutyExceptionTypes } from 'actions/duty_exceptions_types'
import { getAllDutyTypes } from 'actions/duty_types'

async function getCalendarData() {
  return {
    events: await getAllDutyExceptions(3),
    exceptions_types: await getAllDutyExceptionTypes(0),
    users: await getAllPersonnels(),
    auth: await getAuth(),
    duty_types: await getAllDutyTypes(0),
  }
}
export default async function ExceptionsPage() {
  const { events, auth, users, exceptions_types, duty_types } = await getCalendarData()
  return (
    <main className="flex max-h-screen flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex  items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 mt-1 data-[orientation=vertical]:h-5" />
          <span className="text-xl">Mazeretler</span>
        </div>
      </header>
      <div className=" px-8 ">
        <Suspense fallback={<CalendarSkeleton />}>
          <Calendar
            duty_types={duty_types}
            exceptions_types={exceptions_types}
            auth={auth}
            events={events}
            personnels={users}
          />
        </Suspense>
      </div>
    </main>
  )
}
