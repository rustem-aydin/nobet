// features/schedule/components/schedule-view.tsx
'use client'

import { useState } from 'react'
import { DutyType } from '@/payload-types'
import { DutyTypeSelector } from './duty-type-selector'
import { ScheduleTable } from './schedule-table'

interface Props {
  initialDutyTypes: DutyType[]
}

export function ScheduleView({ initialDutyTypes }: Props) {
  const [selectedDutyType, setSelectedDutyType] = useState<DutyType | null>(null)
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-4">
        <DutyTypeSelector
          dutyTypes={initialDutyTypes}
          selected={selectedDutyType}
          onSelect={setSelectedDutyType}
        />

        <div className="flex items-center gap-2">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: 10 }, (_, i) => 2026 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: 12 }, (_, i) => i).map((m) => (
              <option key={m} value={m}>
                {new Date(2026, m).toLocaleString('tr-TR', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedDutyType && <ScheduleTable dutyType={selectedDutyType} year={year} month={month} />}
    </div>
  )
}
