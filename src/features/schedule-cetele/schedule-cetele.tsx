'use client'

import { useState, useTransition } from 'react'
import { DutyType, Personnel } from '@/payload-types'
import { getSchedulesByDutyType } from 'actions/duty_schedule'
import { ScheduleCeteleTable } from './schedule-cetele-table'
import { ScheduleCeteleHeader } from './schedule-cetele-header'

type ScheduleMap = Map<number, Array<{ date: Date; status: string; exceptionType?: string }>>

interface Props {
  dutyTypes: DutyType[]
  personnels: Personnel[]
  initialDutyTypeId: number | undefined
  initialScheduleMap: ScheduleMap
  auth: Personnel
}

export function ScheduleCetele({
  dutyTypes,
  auth,
  personnels,
  initialDutyTypeId,
  initialScheduleMap,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(
    dutyTypes.findIndex((d) => d.id === initialDutyTypeId),
  )
  const [scheduleMap, setScheduleMap] = useState<ScheduleMap>(initialScheduleMap)
  const [isPending, startTransition] = useTransition()

  const currentDutyType = currentIndex >= 0 ? dutyTypes[currentIndex] : null

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!currentDutyType) return
    const newIndex =
      direction === 'prev'
        ? (currentIndex - 1 + dutyTypes.length) % dutyTypes.length
        : (currentIndex + 1) % dutyTypes.length

    const newDutyType = dutyTypes[newIndex]
    setCurrentIndex(newIndex)

    startTransition(async () => {
      const newMap = await getSchedulesByDutyType(newDutyType.id)
      setScheduleMap(newMap)
    })
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
        isLoading={isPending}
      />
      <div className={isPending ? 'opacity-50 pointer-events-none' : ''}>
        <ScheduleCeteleTable
          dutyType={currentDutyType}
          personnels={personnels}
          scheduleMap={scheduleMap}
          auth={auth}
        />
      </div>
    </div>
  )
}
