'use client'

import { useMemo } from 'react'
import { isToday, isSameMonth } from 'date-fns'
import { cn } from '@/lib/utils'
import { useSchedule } from '../contexts/schedule-context'
import { ScheduleContextMenu } from './schedule-context-menu'
import type { ICalendarCell } from '@/features/calendar/interfaces'

interface Props {
  cell: ICalendarCell
  schedules: Map<string, any[]>
  dutyTypeId?: string | number
}

export function ScheduleDayCell({ cell, schedules, dutyTypeId }: Props) {
  const { day, currentMonth, date } = cell
  const { personnels, auth, duty_types } = useSchedule()

  const dateKey = useMemo(() => {
    const d = new Date(date)
    // date = local midnight (new Date(year, month, day)); local gün bileşenlerinden UTC date string üret
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10)
  }, [date])

  const daySchedules = schedules.get(dateKey) || []

  const filteredSchedules = useMemo(() => {
    if (!dutyTypeId) return daySchedules
    return daySchedules.filter((s) => {
      const sTypeId = s.dutyType?.id ?? s.dutyType
      return String(sTypeId) === String(dutyTypeId)
    })
  }, [daySchedules, dutyTypeId])

  const isCurrentMonth = isSameMonth(date, new Date(date.getFullYear(), date.getMonth(), 1))
    ? currentMonth
    : false
  const cellBgColor = useMemo(() => {
    if (!isCurrentMonth || filteredSchedules.length === 0) return undefined
    const firstSchedule = filteredSchedules[0]
    const dt = duty_types.find(
      (d) => d.id === (firstSchedule.dutyType?.id ?? firstSchedule.dutyType),
    )
    return dt?.color || undefined
  }, [filteredSchedules, duty_types, isCurrentMonth])
  return (
    <div
      className={cn(
        'relative flex h-24 lg:h-32 flex-col border-l border-t',
        !isCurrentMonth && 'opacity-40 bg-muted/30',
        isToday(date) && 'ring-2 ring-primary ring-inset',
      )}
    >
      <span
        className={cn(
          'px-2 py-1 text-xs font-semibold',
          isToday(date) &&
            'flex w-6 items-center justify-center rounded-full bg-primary text-primary-foreground',
        )}
      >
        {day}
      </span>

      <div className="flex-1 flex flex-col gap-0.5 px-1 overflow-hidden">
        {isCurrentMonth &&
          filteredSchedules.map((schedule) => {
            const assignedPerson = personnels.find(
              (p) => p.id === schedule.personnel || p.id === schedule.personnel?.id,
            )
            const dutyType = duty_types.find(
              (dt) => dt.id === (schedule.dutyType?.id ?? schedule.dutyType),
            )
            const cellColor = dutyType?.color || '#888'

            return (
              <ScheduleContextMenu
                key={schedule.id}
                date={date}
                dutyRecord={schedule}
                assignedPerson={assignedPerson}
                auth={auth}
              >
                <div
                  className="px-1.5 py-0.5 rounded text-[10px] font-medium text-white text-center truncate cursor-pointer hover:opacity-80 transition-opacity"
                  style={cellBgColor ? { backgroundColor: `${cellBgColor}20` } : undefined}
                  title={`${dutyType?.name || 'Nöbet'} - ${assignedPerson?.fullName || 'Boş'}`}
                >
                  {dutyTypeId
                    ? assignedPerson?.fullName || 'Boş'
                    : `${dutyType?.name?.substring(0, 3)}: ${assignedPerson?.fullName || 'Boş'}`}
                </div>
              </ScheduleContextMenu>
            )
          })}
      </div>
    </div>
  )
}
