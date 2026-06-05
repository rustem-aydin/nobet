// features/schedule/components/schedule-table.tsx
'use client'

import { useEffect, useState } from 'react'
import { DutyType } from '@/payload-types'
import { getScheduleByDutyType } from 'actions/duty_schedule'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { ScheduleRow } from './schedule-row'

interface Props {
  dutyType: DutyType
  year: number
  month: number
}

interface ScheduleData {
  personnel: {
    id: number
    fullName: string
    rank: number
  }
  dates: string[]
}

export function ScheduleTable({ dutyType, year, month }: Props) {
  const [data, setData] = useState<ScheduleData[]>([])
  const [loading, setLoading] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    async function load() {
      setLoading(true)
      const schedules = await getScheduleByDutyType(dutyType.id?.toString() || '', year, month)

      // Grupla: personnel -> dates[]
      const grouped = new Map<number, ScheduleData>()

      for (const s of schedules) {
        const personnelId = (s.personnel as any).id
        if (!grouped.has(personnelId)) {
          grouped.set(personnelId, {
            personnel: s.personnel as any,
            dates: [],
          })
        }
        grouped.get(personnelId)!.dates.push(s.dutyDate)
      }

      // Rank sırala
      const sorted = Array.from(grouped.values()).sort(
        (a, b) => a.personnel.rank - b.personnel.rank,
      )

      setData(sorted)
      setLoading(false)
    }

    load()
  }, [dutyType, year, month])

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex((i) => i.personnel.id === active.id)
        const newIndex = items.findIndex((i) => i.personnel.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  if (loading) return <div>Yükleniyor...</div>

  // Maksimum tarih sayısını bul (tablo genişliği için)
  const maxDates = Math.max(...data.map((d) => d.dates.length), 0)

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="border rounded-lg overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b">
              <th className="px-4 py-2 text-left font-medium w-[200px]">Personel</th>
              {Array.from({ length: maxDates }, (_, i) => (
                <th key={i} className="px-4 py-2 text-center font-medium w-[120px]">
                  Nöbet {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <SortableContext
              items={data.map((d) => d.personnel.id)}
              strategy={verticalListSortingStrategy}
            >
              {data.map((row) => (
                <ScheduleRow
                  key={row.personnel.id}
                  personnel={row.personnel}
                  dates={row.dates}
                  maxDates={maxDates}
                  dutyTypeId={dutyType.id?.toString() || ''}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </div>
    </DndContext>
  )
}
