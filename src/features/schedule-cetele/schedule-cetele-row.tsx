'use client'

import { Personnel, DutyType, Group } from '@/payload-types'
import { ScheduleCeteleCell } from './schedule-cetele-cell'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { UpdatePersonel } from './update-personel'
import { personnelIsAdminOrIsChief } from '@/collections/Personnel/helpers'

interface Item {
  date: Date
  status: string
  exceptionType?: string
}

interface Props {
  id: number | string
  personnel: Personnel
  items: Item[]
  dutyType: DutyType
  dutyTypes: DutyType[] // 👈 KALSIN, UpdatePersonel kullanıyor
  auth: Personnel
  rank: number
  isDraggable: boolean
  expectedCount: number // 👈 YENİ
}

export function ScheduleCeteleRow({
  id,
  personnel,
  dutyTypes, // 👈 KALSIN
  items,
  dutyType,
  isDraggable,
  auth,
  rank,
  expectedCount, // 👈 YENİ
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !isDraggable,
  })
  const isAdmin = personnelIsAdminOrIsChief({ personnel: auth })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  const group = personnel.group as Group
  return (
    <tr ref={setNodeRef} style={style} className="border-b hover:bg-muted/30">
      <td className="sticky left-0 z-10 bg-background border-r px-3 py-2 text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-1">
          {isDraggable ? (
            <span
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-foreground"
            >
              <GripVertical className="h-4 w-4" />
            </span>
          ) : (
            <span className="w-4" />
          )}
          {rank}
        </div>
      </td>

      <td className="border-r px-0 py-0 w-55 min-w-55 max-w-55">
        <div className="flex justify-between items-center h-full px-3 py-2">
          <span
            className="block truncate whitespace-nowrap overflow-hidden text-ellipsis"
            title={personnel.fullName}
          >
            {personnel.fullName}
          </span>
          {isAdmin && <UpdatePersonel dutyTypes={dutyTypes} personnel={personnel} />}
        </div>
      </td>

      <td className="px-3 py-2 align-top">
        <ScheduleCeteleCell
          items={items}
          personnel={personnel}
          dutyType={dutyType}
          auth={auth}
          expectedCount={expectedCount}
        />
      </td>
    </tr>
  )
}
