'use client'

import { createContext, useContext, ReactNode } from 'react'
import { DutyType, Personnel } from '@/payload-types'

interface ScheduleContextType {
  duty_types: DutyType[]
  auth: Personnel
  personnels: Personnel[]
  selectedDate: Date
  selectedDutyType: DutyType | null
  setSelectedDate: (date: Date) => void
  setSelectedDutyType: (dt: DutyType | null) => void
}

const ScheduleContext = createContext<ScheduleContextType | null>(null)

export function ScheduleProvider({
  children,
  duty_types,
  auth,
  personnels,
  selectedDate,
  selectedDutyType,
  setSelectedDate,
  setSelectedDutyType,
}: {
  children: ReactNode
} & ScheduleContextType) {
  return (
    <ScheduleContext.Provider
      value={{
        duty_types,
        auth,
        personnels,
        selectedDate,
        selectedDutyType,
        setSelectedDate,
        setSelectedDutyType,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}

export function useSchedule() {
  const ctx = useContext(ScheduleContext)
  if (!ctx) throw new Error('useSchedule must be used within ScheduleProvider')
  return ctx
}
