'use client'

import { useState, useMemo } from 'react'
import { DutyType, Personnel } from '@/payload-types'
import { ScheduleCeteleTable } from './schedule-cetele-table'
import { ScheduleCeteleHeader } from './schedule-cetele-header'

type ScheduleItem = { date: Date; status: string; exceptionType?: string }
type ScheduleMap = Map<number, ScheduleItem[]>

interface Props {
  dutyTypes: DutyType[]
  personnels: Personnel[]
  initialDutyTypeId: number | undefined
  auth: Personnel
}

export function ScheduleCetele({ dutyTypes, auth, personnels, initialDutyTypeId }: Props) {
  const [currentIndex, setCurrentIndex] = useState(
    dutyTypes.findIndex((d) => d.id === initialDutyTypeId),
  )

  const currentDutyType = currentIndex >= 0 ? dutyTypes[currentIndex] : null

  const scheduleMap = useMemo<ScheduleMap>(() => {
    const grouped = new Map<number, ScheduleItem[]>()

    if (!currentDutyType) return grouped

    for (const personnel of personnels) {
      const schedules = personnel.schedule?.docs
      if (!Array.isArray(schedules)) continue

      const filtered = schedules
        .filter((s: any) => {
          const dtId = typeof s.dutyType === 'object' ? s.dutyType.id : s.dutyType
          return dtId === currentDutyType.id
        })
        .map((s: any) => ({
          date: new Date(s.dutyDate),
          status: s.status,
          exceptionType: s.isOffical ? 'official' : undefined,
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime())

      if (filtered.length > 0) {
        grouped.set(personnel.id, filtered)
      }
    }

    return grouped
  }, [personnels, currentDutyType])

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!currentDutyType) return
    const newIndex =
      direction === 'prev'
        ? (currentIndex - 1 + dutyTypes.length) % dutyTypes.length
        : (currentIndex + 1) % dutyTypes.length

    setCurrentIndex(newIndex)
  }

  if (!currentDutyType) {
    return <div className="text-center text-muted-foreground">Aktif nöbet türü bulunamadı.</div>
  }
  return (
    <div className="space-y-4">
      <ScheduleCeteleHeader
        dutyType={currentDutyType}
        onPrev={() => handleNavigate('prev')}
        onNext={() => handleNavigate('next')}
        isLoading={false}
      />
      <div>
        <ScheduleCeteleTable
          dutyType={currentDutyType}
          dutyTypes={dutyTypes}
          personnels={personnels}
          scheduleMap={scheduleMap}
          auth={auth}
        />
      </div>
    </div>
  )
}
