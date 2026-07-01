'use client'

import { isSameDay, parseISO } from 'date-fns'
import { motion } from 'framer-motion'
import { fadeIn, transition } from '@/features/calendar/animations'
import { useCalendar } from '@/features/calendar/contexts/calendar-context'
import { CalendarMonthView } from '@/features/calendar/views/month-view/calendar-month-view'
import { CalendarYearView } from '@/features/calendar/views/year-view/calendar-year-view'

export function CalendarBody() {
  const { view, events } = useCalendar()

  const singleDayEvents = events.filter((event) => {
    const startDate = parseISO(event.startDate)
    const endDate = parseISO(event.endDate)
    return isSameDay(startDate, endDate)
  })

  const multiDayEvents = events.filter((event) => {
    const startDate = parseISO(event.startDate)
    const endDate = parseISO(event.endDate)
    return !isSameDay(startDate, endDate)
  })
  return (
    <div className="w-full h-full border-x border-b relative">
      <motion.div
        key={view}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
        transition={transition}
      >
        {view === 'month' && (
          <CalendarMonthView singleDayEvents={singleDayEvents} multiDayEvents={multiDayEvents} />
        )}

        {view === 'year' && (
          <CalendarYearView singleDayEvents={singleDayEvents} multiDayEvents={multiDayEvents} />
        )}
      </motion.div>
    </div>
  )
}
