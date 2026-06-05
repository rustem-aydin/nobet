// features/schedule/components/schedule-row.tsx
'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { ScheduleCell } from './schedule-cell'

interface Props {
  personnel: {
    id: number
    fullName: string
    rank: number
  }
  dates: string[]
  maxDates: number
  dutyTypeId: string
}

export function ScheduleRow({ personnel, dates, maxDates, dutyTypeId }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: personnel.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <tr ref={setNodeRef} style={style} className="border-b hover:bg-muted/50">
      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <div>
            <div className="font-medium">{personnel.fullName}</div>
            <div className="text-xs text-muted-foreground">Rank: {personnel.rank}</div>
          </div>
        </div>
      </td>

      {Array.from({ length: maxDates }, (_, i) => (
        <td key={i} className="px-2 py-1">
          <ScheduleCell
            date={dates[i] || null}
            personnelId={personnel.id}
            personnelName={personnel.fullName}
            dutyTypeId={dutyTypeId}
            isEmpty={!dates[i]}
          />
        </td>
      ))}
    </tr>
  )
}
