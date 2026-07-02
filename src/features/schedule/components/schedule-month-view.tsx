'use client'

import { useMemo } from 'react'
import { getCalendarCells } from '@/features/calendar/helpers'
import { ScheduleDayCell } from './schedule-day-cell'
import { useSchedule } from '../contexts/schedule-context'
import { expandDutyTypesToDates, getDutyTypeForDate } from '@/helpers/dutyTypeMatcher'
import type { Personnel } from '@/payload-types'

const WEEK_DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

interface Props {
  year: number
  month: number
  dutyTypeId?: string | number
  schedules: any[]
  loading: boolean
}

export function ScheduleMonthView({ year, month, dutyTypeId, schedules, loading }: Props) {
  const { duty_types, selectedPersonnel } = useSchedule()
  const selectedDate = useMemo(() => new Date(year, month), [year, month])
  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate])

  const scheduleMap = useMemo(() => {
    const map = new Map<string, any[]>()
    const filtered = selectedPersonnel
      ? schedules.filter((s) => (s.personnel as Personnel)?.id === selectedPersonnel.id)
      : schedules

    filtered.forEach((s) => {
      const d = new Date(s.dutyDate)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(s)
    })
    return map
  }, [schedules, selectedPersonnel])

  const dutyTypesWithDates = useMemo(
    () => expandDutyTypesToDates(duty_types, year),
    [duty_types, year],
  )

  const cellDutyTypes = useMemo(() => {
    const map = new Map<string, ReturnType<typeof getDutyTypeForDate>>()
    cells.forEach((cell) => {
      map.set(cell.date.toISOString(), getDutyTypeForDate(cell.date, dutyTypesWithDates))
    })
    return map
  }, [cells, dutyTypesWithDates])

  if (loading) {
    return (
      <div className="grid grid-cols-7 animate-pulse">
        {Array.from({ length: 42 }).map((_, i) => (
          <div key={i} className="h-24 lg:h-32 border-l border-t bg-muted/50" />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-7 border-b">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center py-2 text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((cell) => (
          <ScheduleDayCell
            key={cell.date.toISOString()}
            cell={cell}
            schedules={scheduleMap}
            dutyTypeId={dutyTypeId}
            dutyType={cellDutyTypes.get(cell.date.toISOString())}
          />
        ))}
      </div>
    </div>
  )
}
