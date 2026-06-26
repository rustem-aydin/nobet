'use client'

import { useOptimistic, useCallback, useTransition, useMemo } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { ScheduleCeteleRow } from './schedule-cetele-row'
import { DutyExceptionsType, DutyType, Personnel } from '@/payload-types'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { updateRank } from '@/collections/Personnel/actions/updateRank'
import { AddPersonel } from './add-personel'
import { toast } from 'sonner'
import { startOfDay, isBefore, isSameDay, isAfter } from 'date-fns'

type ScheduleMap = Map<number, Array<{ date: Date; status: string; exceptionType?: string }>>

interface Props {
  dutyType: DutyType
  dutyTypes: DutyType[]
  personnels: Personnel[]
  scheduleMap: ScheduleMap
  auth: Personnel
}

export function ScheduleCeteleTable({ dutyType, personnels, scheduleMap, dutyTypes, auth }: Props) {
  const [optimisticPersonnels, setOptimisticPersonnels] = useOptimistic(
    personnels,
    (state, newPersonnels: Personnel[]) => newPersonnels,
  )
  const [isPending, startTransition] = useTransition()
  const isAdmin = auth.role === 'admin' || auth.role === 'chief'
  const today = startOfDay(new Date())
  const counts = useMemo(() => {
    let completed = 0
    let onDuty = 0
    let planned = 0
    let official = 0

    optimisticPersonnels.forEach((p: Personnel) => {
      const items = scheduleMap.get(p.id) || []
      items.forEach((item) => {
        const itemDate = startOfDay(item.date)
        const isPast = isBefore(itemDate, today)
        const isToday = isSameDay(itemDate, today)
        const isFuture = isAfter(itemDate, today)

        // 🔥 Exception kontrolü: exceptionType varsa exception'dır
        if (item.exceptionType) {
          official++ // tüm exception'lar resmi mazeret sayılır
        } else {
          // Exception değilse tarih durumuna bak
          if (isPast) completed++
          else if (isToday) onDuty++
          else if (isFuture) planned++
        }
      })
    })

    return { completed, onDuty, planned, official }
  }, [optimisticPersonnels, scheduleMap])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const oldOrder = [...optimisticPersonnels]
      const oldIndex = oldOrder.findIndex((p) => p.id === active.id)
      const newIndex = oldOrder.findIndex((p) => p.id === over.id)

      if (oldIndex === -1 || newIndex === -1) return

      const newOrder = arrayMove(oldOrder, oldIndex, newIndex)

      startTransition(() => {
        setOptimisticPersonnels(newOrder)
      })

      const updates = newOrder
        .map((person, index) => ({
          id: person.id,
          rank: index + 1,
        }))
        .filter((update) => {
          const oldPerson = oldOrder.find((p) => p.id === update.id)
          return oldPerson?.rank !== update.rank
        })

      if (updates.length > 0) {
        try {
          toast.promise(async () => await updateRank({ updates }), {
            loading: 'Sıralama Değiştiriliyor',
            success: 'Sıralama Değiştirildi',
            error: (err) => String(err),
          })
        } catch (error) {
          console.error('Rank güncelleme hatası:', error)
        }
      }
    },
    [optimisticPersonnels, setOptimisticPersonnels, startTransition],
  )
  return (
    <DndContext
      autoScroll={false}
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        disabled={isPending || !isAdmin}
        items={optimisticPersonnels.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="border rounded-lg overflow-auto max-h-[calc(100vh-220px)] shadow-sm"
          style={{ borderColor: dutyType.color || 'hsl(var(--border))' }}
        >
          <table className="w-full text-sm border-collapse">
            <thead
              className="sticky top-0 z-10"
              style={{
                borderBottom: `1px solid ${dutyType.color}`,
              }}
            >
              <tr>
                <th className="border-r px-3 py-2 text-left font-medium w-12.5">S.N.</th>
                <th className="border-r px-3 py-2 text-left font-medium w-45">ADI SOYADI</th>
                <th className="flex items-center px-3 py-2 text-left justify-between font-medium">
                  <span
                    className="w-24 truncate text-left shrink-0"
                    style={{ color: dutyType.color || undefined }}
                    title={dutyType.name}
                  >
                    {dutyType.name}
                  </span>
                  <div className="flex gap-1 items-center">
                    <p className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-medium rounded border cursor-pointer transition-colors bg-green-200 border-green-500 text-green-900">
                      Tamamlandı
                      <span className="bg-green-700 text-white text-[10px] px-1 rounded-full min-w-4 text-center leading-4">
                        {counts.completed}
                      </span>
                    </p>
                    <p className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-medium rounded border cursor-pointer transition-colors bg-purple-200 border-purple-purple-500 text-purple-900">
                      Nöbette
                      <span className="bg-purple-700 text-white text-[10px] px-1 rounded-full min-w-4 text-center leading-4">
                        {counts.onDuty}
                      </span>
                    </p>
                    <p className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-medium rounded border cursor-pointer transition-colors bg-blue-200 border-blue-500 text-blue-900">
                      Planlanıyor
                      <span className="bg-blue-700 text-white text-[10px] px-1 rounded-full min-w-4 text-center leading-4">
                        {counts.planned}
                      </span>
                    </p>
                    <p className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-medium rounded border cursor-pointer transition-colors bg-gray-400 border-gray-600 text-black">
                      Resmi Mazeret
                      <span className="bg-gray-700 text-white text-[10px] px-1 rounded-full min-w-4 text-center leading-4">
                        {counts.official}
                      </span>
                    </p>
                  </div>
                  {isAdmin && <AddPersonel dutyTypes={dutyTypes} />}
                </th>
              </tr>
            </thead>
            <tbody>
              {optimisticPersonnels.map((p, index) => (
                <ScheduleCeteleRow
                  dutyTypes={dutyTypes}
                  key={p.id}
                  id={p.id}
                  personnel={p}
                  rank={index + 1}
                  items={scheduleMap.get(p.id) || []}
                  dutyType={dutyType}
                  auth={auth}
                  isDraggable={isAdmin}
                />
              ))}
            </tbody>
          </table>
        </div>
      </SortableContext>
    </DndContext>
  )
}
