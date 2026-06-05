// views/month-view/CalendarMonthView.tsx
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { staggerContainer, transition } from '@/features/calendar/animations'
import { useCalendar } from '@/features/calendar/contexts/calendar-context'
import { calculateMonthEventPositions, getCalendarCells } from '@/features/calendar/helpers'
import { DayCell } from '@/features/calendar/views/month-view/day-cell'
import { expandDutyTypesToDates, getDutyTypeForDate } from '@/helpers/dutyTypeMatcher'
import type { DutyException } from '@/payload-types'

interface IProps {
  singleDayEvents: DutyException[]
  multiDayEvents: DutyException[]
}

const WEEK_DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

export function CalendarMonthView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate, duty_types } = useCalendar()
  const year = selectedDate.getFullYear()

  const allEvents = useMemo(
    () => [...multiDayEvents, ...singleDayEvents],
    [multiDayEvents, singleDayEvents],
  )

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate])

  const eventPositions = useMemo(
    () => calculateMonthEventPositions(multiDayEvents, singleDayEvents, selectedDate),
    [multiDayEvents, singleDayEvents, selectedDate],
  )

  // YILA GÖRE duty_types filtrele ve cache'le
  const dutyTypesWithDates = useMemo(() => {
    // Sadece aktif yılın config'i olanları al
    const filteredByYear = duty_types
      .map((dt) => ({
        ...dt,
        yearConfigs:
          dt.yearConfigs?.filter((yc) => yc.year === year.toString() && yc.isActive) || [],
      }))
      .filter((dt) => dt.yearConfigs.length > 0)

    return expandDutyTypesToDates(filteredByYear, year)
  }, [duty_types, year]) // duty_types değişince yeniden hesapla

  // Hücreleri nöbet türleriyle eşleştir
  const cellDutyTypes = useMemo(() => {
    const map = new Map<string, ReturnType<typeof getDutyTypeForDate>>()
    cells.forEach((cell) => {
      map.set(cell.date.toISOString(), getDutyTypeForDate(cell.date, dutyTypesWithDates))
    })
    return map
  }, [cells, dutyTypesWithDates])

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      <div className="grid grid-cols-7">
        {WEEK_DAYS.map((day, index) => (
          <motion.div
            key={day}
            className="flex items-center justify-center py-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, ...transition }}
          >
            <span className="text-xs font-medium text-t-quaternary">{day}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden">
        {cells.map((cell) => (
          <DayCell
            key={cell.date.toISOString()}
            cell={cell}
            events={allEvents}
            eventPositions={eventPositions}
            dutyType={cellDutyTypes.get(cell.date.toISOString())}
          />
        ))}
      </div>
    </motion.div>
  )
}
