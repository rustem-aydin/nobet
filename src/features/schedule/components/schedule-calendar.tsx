'use client'

import { ScheduleHeader } from './schedule-header'
import { ScheduleMonthView } from './schedule-month-view'
import { useSchedule } from '../contexts/schedule-context'

export function ScheduleCalendarContent() {
  const { selectedDutyType, schedules, year, month } = useSchedule()
  return (
    <div className="w-full border rounded-xl">
      <ScheduleHeader />

      <ScheduleMonthView
        year={year}
        month={month}
        dutyTypeId={selectedDutyType?.id}
        schedules={schedules}
        loading={false}
      />
    </div>
  )
}
