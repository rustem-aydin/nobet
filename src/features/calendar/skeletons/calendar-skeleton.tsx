import { CalendarHeaderSkeleton } from '@/features/calendar/skeletons/calendar-header-skeleton'
import { MonthViewSkeleton } from '@/features/calendar/skeletons/month-view-skeleton'

export function CalendarSkeleton() {
  return (
    <div className="container border rounded-xl">
      <div className="flex h-screen flex-col">
        <CalendarHeaderSkeleton />
        <div className="flex-1">
          <MonthViewSkeleton />
        </div>
      </div>
    </div>
  )
}
