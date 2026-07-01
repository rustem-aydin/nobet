// views/month-view/day-cell.tsx
'use client'

import { cva } from 'class-variance-authority'
import { isToday, startOfDay, isSunday, isSameMonth, format } from 'date-fns' // format eklendi
import { motion } from 'framer-motion'
import { useMemo, useCallback } from 'react'

import { cn } from '@/lib/utils'
import { transition } from '@/features/calendar/animations'
import { EventListDialog } from '@/features/calendar/dialogs/events-list-dialog'
import { DroppableArea } from '@/features/calendar/dnd/droppable-area'
import { getMonthCellEvents } from '@/features/calendar/helpers'
import { useMediaQuery } from '@/features/calendar/hooks'
import type { ICalendarCell } from '@/features/calendar/interfaces'
import { EventBullet } from '@/features/calendar/views/month-view/event-bullet'
import { MonthEventBadge } from '@/features/calendar/views/month-view/month-event-badge'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { AddEditEventDialog } from '@/features/calendar/dialogs/add-edit-event-dialog'
import { DutyException, DutyExceptionsType } from '@/payload-types'

// İsimlendirme birinci bileşenle (CellDutyType) uyumlu hale getirildi
interface CellDutyType {
  id: number | string
  name: string
  color: string
  description: string
  isHoliday: boolean
}

interface IProps {
  cell: ICalendarCell
  events: DutyException[]
  eventPositions: Record<string, number>
  dutyTypeId?: string | number
  dutyType?: CellDutyType | null
  index?: number
}

export const dayCellVariants = cva('text-white', {
  variants: {
    color: {
      blue: 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 ',
      green: 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400',
      red: 'bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-400',
      yellow: 'bg-yellow-600 dark:bg-yellow-500 hover:bg-yellow-700 dark:hover:bg-yellow-400',
      purple: 'bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-400',
      orange: 'bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-400',
      gray: 'bg-gray-600 dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-400',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
})

const MAX_VISIBLE_EVENTS = 3

export function DayCell({ cell, events, eventPositions, dutyTypeId, dutyType }: IProps) {
  const { day, currentMonth, date } = cell
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { cellEvents, currentCellMonth } = useMemo(() => {
    const cellEvents = getMonthCellEvents(date, events, eventPositions)
    const currentCellMonth = startOfDay(new Date(date.getFullYear(), date.getMonth(), 1))
    return { cellEvents, currentCellMonth }
  }, [date, events, eventPositions])

  // Birinci bileşendeki isCurrentMonth hesaplaması uygulandı
  const isCurrentMonth = isSameMonth(date, new Date(date.getFullYear(), date.getMonth(), 1))
    ? currentMonth
    : false

  // Birinci bileşendeki cellBgColor mantığı uygulandı
  const cellBgColor = useMemo(() => {
    if (dutyType?.color) return dutyType.color
    return undefined
  }, [dutyType])

  // Birinci bileşendeki hasSchedule mantığı (hasEvent olarak) uygulandı
  const hasEvent = isCurrentMonth && cellEvents.length > 0

  const renderDutyTypeBadge = useMemo(() => {
    if (!dutyType || !isCurrentMonth) return null

    return (
      <motion.div
        className="absolute top-1 right-1 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, ...transition }}
      >
        <span className="inline-block rounded px-1.5 py-0.5 text-[9px] font-bold  text-gray-500 uppercase">
          {dutyType.description}
        </span>
      </motion.div>
    )
  }, [dutyType, isCurrentMonth])

  const renderEventAtPosition = useCallback(
    (position: number) => {
      const event = cellEvents.find((e) => e.position === position)
      if (!event) {
        return (
          <motion.div
            key={`empty-${position}`}
            className="lg:flex-1"
            initial={false}
            animate={false}
          />
        )
      }
      const showBullet = isSameMonth(new Date(event.startDate), currentCellMonth)

      return (
        <motion.div
          key={`event-${event.id}-${position}`}
          className="lg:flex-1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: position * 0.1, ...transition }}
        >
          {showBullet && (
            <EventBullet
              className="lg:hidden"
              color={String((event.exceptions_type as DutyExceptionsType).color)}
            />
          )}
          <MonthEventBadge className="hidden lg:flex" event={event} cellDate={startOfDay(date)} />
        </motion.div>
      )
    },
    [cellEvents, currentCellMonth, date],
  )

  const showMoreCount = cellEvents.length - MAX_VISIBLE_EVENTS
  const showMobileMore = isMobile && isCurrentMonth && showMoreCount > 0
  const showDesktopMore = isCurrentMonth && showMoreCount > 0

  const cellContent = useMemo(
    () => (
      <motion.div
        className={cn(
          'relative flex min-h-36 flex-col gap-1 border-l border-t',
          cell.dayOfWeek === 0 && 'border-l-0',
          !isCurrentMonth && 'opacity-40 bg-muted/30',
          isToday(date) && 'ring-1 ring-primary ring-inset',
        )}
        style={{ backgroundColor: cellBgColor ? `${cellBgColor}10` : undefined }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        {renderDutyTypeBadge}

        <DroppableArea date={date} className="w-full h-full py-2">
          <motion.span
            className={cn(
              'h-6 px-1 text-xs font-semibold lg:px-2',
              !isCurrentMonth && 'opacity-20',
              isToday(date) &&
                'flex w-6 translate-x-1 items-center justify-center rounded-full bg-primary px-0 font-bold text-primary-foreground',
            )}
          >
            {/* Gün sayısı ve Haftanın gün ismi (Pzt, Sal, Çar vb.) eklendi */}
            {day}
          </motion.span>

          <motion.div
            className={cn(
              'flex h-fit gap-1 px-2 mt-1 lg:h-[94px] lg:flex-col lg:gap-2 lg:px-0',
              !isCurrentMonth && 'opacity-50',
            )}
          >
            {!hasEvent && !isMobile ? (
              <div className="w-full h-full flex justify-center items-center group">
                <AddEditEventDialog startDate={date}>
                  <Button
                    variant="ghost"
                    className="border opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="max-sm:hidden">Mazeret Bildir</span>
                  </Button>
                </AddEditEventDialog>
              </div>
            ) : (
              [0, 1, 2].map(renderEventAtPosition)
            )}
          </motion.div>

          {showMobileMore && (
            <div className="flex justify-end items-end mx-2">
              <span className="text-[0.6rem] font-semibold text-accent-foreground">
                +{showMoreCount}
              </span>
            </div>
          )}

          {showDesktopMore && (
            <motion.div
              className={cn(
                'h-4.5 px-1.5 my-2 text-end text-xs font-semibold text-muted-foreground',
                !isCurrentMonth && 'opacity-50',
              )}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...transition }}
            >
              <EventListDialog date={date} events={cellEvents} />
            </motion.div>
          )}
        </DroppableArea>
      </motion.div>
    ),
    [
      date,
      day,
      isCurrentMonth,
      cellEvents,
      hasEvent,
      showMobileMore,
      showDesktopMore,
      showMoreCount,
      renderEventAtPosition,
      isMobile,
      cellBgColor,
      renderDutyTypeBadge,
    ],
  )

  if (isMobile && isCurrentMonth) {
    return (
      <EventListDialog date={date} events={cellEvents}>
        {cellContent}
      </EventListDialog>
    )
  }

  return cellContent
}
