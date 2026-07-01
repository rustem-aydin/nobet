import { CalendarBody } from '@/features/calendar/calendar-body'
import { CalendarProvider } from '@/features/calendar/contexts/calendar-context'
import { DndProvider } from '@/features/calendar/contexts/dnd-context'
import { CalendarHeader } from '@/features/calendar/header/calendar-header'
import { DutyExceptionsType, DutyType, Personnel } from '@/payload-types'

export async function Calendar({
  auth,
  duty_types,
  personnels,
  exceptions_types,
}: {
  duty_types: DutyType[]
  auth: Personnel
  exceptions_types: DutyExceptionsType[]
  personnels: Personnel[]
}) {
  return (
    <CalendarProvider
      duty_types={duty_types}
      exceptions_types={exceptions_types}
      auth={auth}
      users={personnels}
      view="month"
    >
      <DndProvider>
        <div className="w-full mb-4  ">
          <CalendarHeader />
          <CalendarBody />
        </div>
      </DndProvider>
    </CalendarProvider>
  )
}
