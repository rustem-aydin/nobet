'use client'

import { useOptimistic, useCallback, useTransition } from 'react'
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
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { DutyType } from '@/payload-types'
import { AddScheduleButton } from './add-schedule-button'
import { CronSchedule } from '@/components/cron-schedule'
import { LucideGripVertical } from 'lucide-react' // veya herhangi bir drag handle simgesi
import { updateDutyTypeOrder } from '@/collections/DutyTypes/actions/updateDutyTypeOrder'
import { toast } from 'sonner'

// ------------------------------------------------------------
// Sürüklenebilir Accordion Öğesi
// ------------------------------------------------------------
function SortableAccordionItem({ type, index }: { type: DutyType; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: type.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <AccordionItem value={`${type.id}+${type.cronSchedules}`} className="last:border-b">
        <AccordionTrigger className="text-left pl-14 overflow-hidden text-foreground/20 duration-200 hover:no-underline cursor-pointer">
          <div className="flex flex-1 items-start gap-4">
            {/* Sıra numarası */}
            <p className="text-xs">{index + 1}</p>
            {/* Drag handle */}
            <div
              role="button"
              {...listeners}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition-colors"
              aria-label="Sürükle"
            >
              <LucideGripVertical className="h-5 w-5 text-muted-foreground" />
            </div>

            <h1 className="relative text-center text-3xl md:text-5xl">{type.name}</h1>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground pb-6 pl-6 md:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AddScheduleButton typeID={Number(type.id)} />

            {type.cronSchedules?.map((schedule) => (
              <CronSchedule
                dutyTypeId={String(type.id)}
                color={type.color}
                key={`${type.id}+${schedule.cron}`}
                showNextRuns={3}
                expression={schedule.cron}
                title={schedule.description}
              />
            ))}

            {(!type.cronSchedules || type.cronSchedules.length === 0) && (
              <p className="col-span-full text-muted-foreground text-sm text-center">
                Planlanmış nöbet bulunmuyor.
              </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  )
}

// ------------------------------------------------------------
// Ana İçerik Bileşeni
// ------------------------------------------------------------
const Content = ({ dutyTypes }: { dutyTypes: DutyType[] }) => {
  const [optimisticTypes, setOptimisticTypes] = useOptimistic(
    dutyTypes,
    (state, newOrder: DutyType[]) => newOrder,
  )
  const [isPending, startTransition] = useTransition()

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

      const oldOrder = [...optimisticTypes]
      const oldIndex = oldOrder.findIndex((t) => t.id === active.id)
      const newIndex = oldOrder.findIndex((t) => t.id === over.id)

      if (oldIndex === -1 || newIndex === -1) return

      const newOrder = arrayMove(oldOrder, oldIndex, newIndex)

      startTransition(() => {
        setOptimisticTypes(newOrder)
      })

      const updates = newOrder.map((type, index) => ({
        id: type.id,
        rank: index + 1,
      }))

      try {
        const data = toast.promise(updateDutyTypeOrder(updates), {
          loading: 'Nöbet Türü sıralaması değiştiriliyor.',
          success: () => {
            toast.warning(
              'Dikkat!! nöbet çetelesi önceliklendirme işlemi yaptınız.Bu değişiklik ile nöbet yazma işlemi önceliği yeni düzene göre yapacaktır.',
            )
            return 'Nöbet Türü sıralaması değiştirildi. '
          },
          error: (err) => String(err),
        })
      } catch (error) {
        console.error('Sıralama güncellenemedi:', error)
        // Hata durumunda eski sıralamaya dönmek için optimistic state'i sıfırlayabilirsiniz.
        // Bu örnekte sadelik için hata yönetimi atlanmıştır.
      }
    },
    [optimisticTypes, setOptimisticTypes, startTransition],
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={optimisticTypes.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <Accordion type="single" collapsible className="w-full">
          {optimisticTypes.map((type, index) => (
            <SortableAccordionItem key={type.id} type={type} index={index} />
          ))}
        </Accordion>
      </SortableContext>
    </DndContext>
  )
}

export default Content
