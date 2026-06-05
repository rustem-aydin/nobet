'use client'

import { useState, useEffect } from 'react'
import { ScheduleHeader } from './schedule-header'
import { ScheduleMonthView } from './schedule-month-view'
import { ScheduleProvider } from '../contexts/schedule-context'
import { DutyType, Personnel } from '@/payload-types'
import { getScheduleForMonth } from 'actions/duty_schedule'

interface Props {
  duty_types: DutyType[]
  auth: Personnel
  personnels: Personnel[]
}

export function ScheduleCalendar({ duty_types, auth, personnels }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDutyType, setSelectedDutyType] = useState<DutyType | null>(null) // null = tümü
  const [schedules, setSchedules] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const year = selectedDate.getFullYear()
  const month = selectedDate.getMonth()

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true)
      try {
        if (selectedDutyType) {
          const data = await getScheduleForMonth(String(selectedDutyType.id), year, month)
          setSchedules(data)
        } else {
          const allData: any[] = []
          for (const dt of duty_types) {
            const data = await getScheduleForMonth(String(dt.id), year, month)
            allData.push(...data)
          }
          setSchedules(allData)
        }
      } catch (err) {
        console.error('Veri çekme hatası:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSchedules()
  }, [year, month, selectedDutyType, duty_types])
  console.log(schedules)
  return (
    <ScheduleProvider
      duty_types={duty_types}
      auth={auth}
      personnels={personnels}
      selectedDate={selectedDate}
      selectedDutyType={selectedDutyType}
      setSelectedDate={setSelectedDate}
      setSelectedDutyType={setSelectedDutyType}
    >
      <div className="w-full border rounded-xl">
        <ScheduleHeader />
        <ScheduleMonthView
          year={year}
          month={month}
          dutyTypeId={selectedDutyType?.id}
          schedules={schedules}
          loading={loading}
        />
      </div>
    </ScheduleProvider>
  )
}
