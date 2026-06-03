import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { endOfDay, isSameDay, parseISO, startOfDay } from 'date-fns'
import { cn } from '@/lib/utils'
import { useCalendar } from '@/features/calendar/contexts/calendar-context'
import { EventDetailsDialog } from '@/features/calendar/dialogs/event-details-dialog'
import { DraggableEvent } from '@/features/calendar/dnd/draggable-event'
import { formatTime } from '@/features/calendar/helpers'
import { EventBullet } from '@/features/calendar/views/month-view/event-bullet'
import { DutyException, DutyExceptionsType, Personnel } from '@/payload-types'
import DutyIconStatus from './duty_status'

const eventBadgeVariants = cva(
  'flex w-full h-6.5 select-none items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 text-xs cursor-grab',
  {
    variants: {
      multiDayPosition: {
        first: 'relative z-10 mr-0 rounded-r-none border-r-0 [&>span]:mr-2.5',
        middle: 'relative z-10 mx-0 w-[calc(100%_+_1px)] rounded-none border-x-0',
        last: 'ml-0 rounded-l-none border-l-0',
        none: '',
      },
    },
    defaultVariants: {
      multiDayPosition: 'none',
    },
  },
)

// Hex mi kontrolü
const isHexColor = (color: string): boolean => /^#([0-9A-F]{3}){1,2}$/i.test(color)

interface IProps extends Omit<VariantProps<typeof eventBadgeVariants>, 'multiDayPosition'> {
  event: DutyException
  cellDate: Date
  eventCurrentDay?: number
  eventTotalDays?: number
  className?: string
  position?: 'first' | 'middle' | 'last' | 'none'
}

export function MonthEventBadge({
  event,
  cellDate,
  eventCurrentDay,
  eventTotalDays,
  className,
  position: propPosition,
}: IProps) {
  const { badgeVariant, use24HourFormat } = useCalendar()

  const itemStart = startOfDay(parseISO(event.startDate))
  const itemEnd = endOfDay(parseISO(event.endDate))

  if (cellDate < itemStart || cellDate > itemEnd) return null

  let position: 'first' | 'middle' | 'last' | 'none' | undefined

  if (propPosition) {
    position = propPosition
  } else if (eventCurrentDay && eventTotalDays) {
    position = 'none'
  } else if (isSameDay(itemStart, itemEnd)) {
    position = 'none'
  } else if (isSameDay(cellDate, itemStart)) {
    position = 'first'
  } else if (isSameDay(cellDate, itemEnd)) {
    position = 'last'
  } else {
    position = 'middle'
  }

  const renderBadgeText = ['first', 'none'].includes(position)
  const renderBadgeTime = ['last', 'none'].includes(position)

  const rawColor = String((event.exceptions_type as DutyExceptionsType).color)
  const isHex = isHexColor(rawColor)
  const isDot = badgeVariant === 'dot'

  const hexStyles = isHex
    ? isDot
      ? {
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          borderColor: 'var(--border)',
        }
      : {
          backgroundColor: rawColor + '14', // %8 opaklık (50 hex ≈ 8%)
          color: rawColor,
          borderColor: rawColor + '33', // %20 opaklık (33 hex ≈ 20%)
        }
    : undefined

  const bulletColor = isHex && isDot ? rawColor : rawColor

  const eventBadgeClasses = cn(
    eventBadgeVariants({ multiDayPosition: position }),
    !isHex &&
      !isDot &&
      `border-${rawColor}-200 bg-${rawColor}-50 text-${rawColor}-700 dark:border-${rawColor}-800 dark:bg-${rawColor}-950 dark:text-${rawColor}-300`,
    !isHex && isDot && `bg-bg-secondary text-t-primary [&_svg]:fill-${rawColor}-600`,
    className,
  )

  const marginClass = {
    first: 'ml-1 mr-0',
    middle: 'mx-0',
    last: 'ml-0 mr-1',
    none: 'mx-1',
  }[position || 'none']

  return (
    <DraggableEvent event={event} className={marginClass}>
      <EventDetailsDialog event={event}>
        <button type="button" className={eventBadgeClasses} style={hexStyles}>
          <div className="flex items-center gap-1.5 truncate">
            {!['middle', 'last'].includes(position) && badgeVariant === 'dot' && (
              <EventBullet color={bulletColor} />
            )}

            {renderBadgeText && (
              <div className="flex-1  truncate font-semibold">
                {eventCurrentDay && (
                  <span className="text-xs">
                    Gün {eventCurrentDay} of {eventTotalDays} •{' '}
                  </span>
                )}
                <div className="flex gap-1 items-center">
                  <DutyIconStatus status={event.status} />
                  {(event.personnel as Personnel).fullName} -{' '}
                  {(event.exceptions_type as DutyExceptionsType).name}
                </div>
              </div>
            )}
          </div>
        </button>
      </EventDetailsDialog>
    </DraggableEvent>
  )
}
