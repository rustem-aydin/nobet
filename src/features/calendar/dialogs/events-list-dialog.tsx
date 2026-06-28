import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import type { ReactNode } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/ui/responsive-modal'
import { cn } from '@/lib/utils'
import { useCalendar } from '@/features/calendar/contexts/calendar-context'
import { formatTime } from '@/features/calendar/helpers'
import { EventBullet } from '@/features/calendar/views/month-view/event-bullet'
import { EventDetailsDialog } from '@/features/calendar/dialogs/event-details-dialog'
import { DutyException, DutyExceptionsType } from '@/payload-types'

interface EventListDialogProps {
  date: Date
  events: DutyException[]
  maxVisibleEvents?: number
  children?: ReactNode
}

export function EventListDialog({
  date,
  events,
  maxVisibleEvents = 3,
  children,
}: EventListDialogProps) {
  const cellEvents = events
  const hiddenEventsCount = Math.max(cellEvents.length - maxVisibleEvents, 0)
  const { badgeVariant, use24HourFormat } = useCalendar()

  const defaultTrigger = (
    <span className="cursor-pointer">
      <span className="sm:hidden">+{hiddenEventsCount}</span>
      <span className="hidden sm:inline py-0.5 px-2 my-1 rounded-xl border">
        {hiddenEventsCount}
        <span className="mx-1">daha fazla...</span>
      </span>
    </span>
  )

  return (
    <Modal>
      <ModalTrigger asChild>{children || defaultTrigger}</ModalTrigger>
      <ModalContent className="sm:max-w-[425px]">
        <ModalHeader>
          <ModalTitle className="my-2">
            <div className="flex items-center gap-2">
              <EventBullet
                color={(cellEvents[0]?.exceptions_type as DutyExceptionsType).color}
                className=""
              />
              <p className="text-sm font-medium">
                {format(date, 'EEEE, d MMMM yyyy', { locale: tr })} tarihindeki mazeretler
              </p>
            </div>
          </ModalTitle>
        </ModalHeader>
        <div className="max-h-[60vh] overflow-y-auto space-y-2">
          {cellEvents.length > 0 ? (
            cellEvents.map((event) => {
              const color = String((event.exceptions_type as DutyExceptionsType).color)

              return (
                <EventDetailsDialog event={event} key={event.id}>
                  <div
                    className={cn(
                      'flex items-center gap-2 p-2 border rounded-md hover:bg-muted cursor-pointer',
                      badgeVariant === 'colored' && 'text-white',
                    )}
                    style={badgeVariant === 'colored' ? { backgroundColor: color } : undefined}
                  >
                    <EventBullet color={color} />
                    <div className="flex justify-between items-center w-full">
                      <p className="text-sm font-medium">
                        {(event.exceptions_type as DutyExceptionsType).name}
                      </p>
                      <p className="text-xs">{formatTime(event.startDate, use24HourFormat)}</p>
                    </div>
                  </div>
                </EventDetailsDialog>
              )
            })
          ) : (
            <p className="text-sm text-muted-foreground">Bu tarih için mazeret bulunmamaktadır.</p>
          )}
        </div>
      </ModalContent>
    </Modal>
  )
}
