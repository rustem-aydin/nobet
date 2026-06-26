'use client'

import { useMemo } from 'react'
import { isToday, isSameMonth } from 'date-fns'
import { cn } from '@/lib/utils'
import { useSchedule } from '../contexts/schedule-context'
import { ScheduleContextMenu } from './schedule-context-menu'
import type { ICalendarCell } from '@/features/calendar/interfaces'
import { DutySchedule, DutyType, Personnel } from '@/payload-types'
import { Check, CheckCheck, Clock, Info, Pickaxe } from 'lucide-react'
import { ScheduleNullContextMenu } from './schedule-null-context.menu'
import { Badge } from '@/components/ui/badge'
import { getPersonnelIcon } from './personnel-lists'

interface CellDutyType {
  id: number
  name: string
  color: string
  description: string
  isHoliday: boolean
}

interface Props {
  cell: ICalendarCell
  schedules: Map<string, any[]>
  dutyTypeId?: string | number
  dutyType?: CellDutyType | null
}

export function ScheduleDayCell({ cell, schedules, dutyTypeId, dutyType }: Props) {
  const { day, currentMonth, date } = cell
  const { personnels, auth, duty_types } = useSchedule()
  const dateKey = useMemo(() => {
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
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
    if (dutyType?.color) return dutyType.color
    if (filteredSchedules.length > 0) {
      const firstSchedule = filteredSchedules[0]
      const dt = duty_types.find(
        (d) => d.id === (firstSchedule.dutyType?.id ?? firstSchedule.dutyType),
      )
      return dt?.color || undefined
    }
    return undefined
  }, [dutyType, filteredSchedules, duty_types])

  const hasSchedule = isCurrentMonth && filteredSchedules.length > 0

  const renderDutyTypeBadge = useMemo(() => {
    if (!dutyType || !currentMonth) return null
    return (
      <span className="absolute top-1 right-1 z-10 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold text-gray-500 uppercase">
        {dutyType.description}
      </span>
    )
  }, [dutyType, currentMonth])

  const cellContent = (
    <div
      className={cn(
        'relative flex h-24 lg:h-32 flex-col border-l border-t',
        !isCurrentMonth && 'opacity-40 bg-muted/30',
        isToday(date) && 'ring-1 ring-primary ring-inset',
      )}
      style={{ backgroundColor: cellBgColor ? `${cellBgColor}15` : undefined }}
    >
      {renderDutyTypeBadge}

      <span
        className={cn(
          'text-xs p-1 w-fit',
          isToday(date) && 'bg-primary text-white rounded-full px-1.5',
        )}
      >
        {day}
      </span>

      <div className="flex-1 flex flex-col gap-0.5 px-1 overflow-hidden">
        {hasSchedule ? (
          filteredSchedules.map((schedule: DutySchedule, idx) => {
            const assignedPerson = personnels.find(
              (p) => p.id === schedule.personnel || p.id === (schedule.personnel as Personnel)?.id,
            )
            const scheduleDutyType = duty_types.find(
              (dt) => dt.id === ((schedule.dutyType as DutyType)?.id ?? schedule.dutyType),
            )

            // ✅ İkonu al
            const PersonnelIcon = assignedPerson ? getPersonnelIcon(assignedPerson.fullName) : null

            return (
              <div
                key={schedule.id || `schedule-${idx}`}
                className="flex flex-col h-full rounded text-[10px] font-medium truncate"
                title={`${scheduleDutyType?.name || 'Nöbet'} - ${assignedPerson?.fullName || 'Boş'}`}
              >
                <span className="flex flex-col text-center items-center text-xs font-bold justify-center h-full">
                  {isToday(date) ? (
                    <Badge className="flex items-center gap-1 bg-purple-600 text-white text-sm border-0">
                      <Check />
                      Nöbette
                    </Badge>
                  ) : (
                    <>
                      {schedule.status === 'draft' && (
                        <Badge className="flex items-center gap-1 bg-amber-300 text-gray-500 text-sm border">
                          <Pickaxe className="text-gray-500 text-sm" />
                          Taslak
                        </Badge>
                      )}
                      {schedule.status === 'scheduled' && (
                        <Badge className="flex items-center gap-1 bg-blue-300 text-gray-500 text-sm border">
                          <Clock className="text-gray-500 text-sm" />
                          Planlandı
                        </Badge>
                      )}
                      {schedule.status === 'completed' && (
                        <Badge className="flex items-center gap-1 bg-green-300 text-gray-500 text-sm border">
                          <CheckCheck className="text-gray-500 text-sm" />
                          Tamamlandı
                        </Badge>
                      )}
                    </>
                  )}
                  <span className="text-gray-500 text-sm">{scheduleDutyType?.name}</span>

                  {/* ✅ Personel adı + ikon */}
                  <span className="flex items-center gap-1 text-gray-500 text-sm">
                    {PersonnelIcon && <PersonnelIcon className="h-4 w-4" />}
                    {dutyTypeId
                      ? assignedPerson?.fullName || 'Boş'
                      : ` ${assignedPerson?.fullName || 'Boş'}`}
                  </span>
                </span>
              </div>
            )
          })
        ) : (
          <span className="flex flex-col text-center items-center text-xs font-bold justify-center h-full text-gray-500 text-sm">
            <Info className="text-gray-500 text-sm" />
            Nöbet Bilgisi Bulunamadı
          </span>
        )}
      </div>
    </div>
  )

  if (!isCurrentMonth) return cellContent

  if (hasSchedule) {
    const assignedPerson = personnels?.find(
      (p: Personnel) => p.id === (filteredSchedules[0].personnel as Personnel)?.id,
    )

    if (!assignedPerson) {
      return (
        <ScheduleNullContextMenu dutyTypeId={dutyType?.id} date={date}>
          {cellContent}
        </ScheduleNullContextMenu>
      )
    }

    return (
      <ScheduleContextMenu
        date={date}
        dutyRecord={filteredSchedules[0]}
        assignedPerson={assignedPerson}
        auth={auth}
      >
        {cellContent}
      </ScheduleContextMenu>
    )
  }

  return (
    <ScheduleNullContextMenu dutyTypeId={dutyType?.id} date={date}>
      {cellContent}
    </ScheduleNullContextMenu>
  )
}
