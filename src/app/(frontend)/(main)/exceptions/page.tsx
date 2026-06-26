import { Suspense } from 'react'
import { Calendar } from '@/features/calendar/calendar'
import { CalendarSkeleton } from '@/features/calendar/skeletons/calendar-skeleton'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { getAllPersonnels } from '@/collections/Personnel/actions/getAllPersonnels'
import { getAllDutyTypes } from '@/collections/DutyTypes/actions/getAllDutyTypes'
import { getAllDutyExceptionTypes } from '@/collections/DutyExceptionsTypes/actions/getAllDutyExceptionTypes'

export default async function ExceptionsPage() {
  const exceptions_types = await getAllDutyExceptionTypes(0)
  const users = await getAllPersonnels(1)
  const auth = await getAuth()
  const duty_types = await getAllDutyTypes(0)
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
            personnels={users}
          />
        </Suspense>
      </div>
    </main>
  )
}
