'use client'

import { useMemo } from 'react'
import { getCalendarCells } from '@/features/calendar/helpers'
import { ScheduleDayCell } from './schedule-day-cell'

const WEEK_DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

interface Props {
  year: number
  month: number
  dutyTypeId?: string | number
  schedules: any[]
  loading: boolean
}

export function ScheduleMonthView({ year, month, dutyTypeId, schedules, loading }: Props) {
  const selectedDate = useMemo(() => new Date(year, month, 1), [year, month])
  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate])

  const scheduleMap = useMemo(() => {
    const map = new Map<string, any[]>()
    schedules.forEach((s) => {
      const d = new Date(s.dutyDate)

      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`

      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(s)
    })
    return map
  }, [schedules])

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
          />
        ))}
      </div>
    </div>
  )
}
