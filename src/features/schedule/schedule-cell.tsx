// features/schedule/components/schedule-cell.tsx
'use client'

import { format, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { useState } from 'react'
import { SwapRequestModal } from './swap-request-modal'

interface Props {
  date: string | null
  personnelId: number
  personnelName: string
  dutyTypeId: string
  isEmpty: boolean
}

export function ScheduleCell({ date, personnelId, personnelName, dutyTypeId, isEmpty }: Props) {
  const [showSwapModal, setShowSwapModal] = useState(false)

  if (isEmpty) {
    return <div className="h-10 bg-white rounded border" />
  }

  const formattedDate = format(parseISO(date!), 'dd MMM', { locale: tr })

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="h-10 px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded cursor-pointer text-center text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center">
            {formattedDate}
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent className="w-48">
          <ContextMenuItem onClick={() => setShowSwapModal(true)}>Değişim Talebi</ContextMenuItem>

          <ContextMenuItem onClick={() => console.log('Mazeret', date)}>
            Mazeret Bildir
          </ContextMenuItem>

          <ContextMenuSeparator />

          <ContextMenuItem onClick={() => console.log('Detay', date)}>Detaylar</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {showSwapModal && (
        <SwapRequestModal
          personnelId={personnelId}
          personnelName={personnelName}
          dutyTypeId={dutyTypeId}
          date={date!}
          onClose={() => setShowSwapModal(false)}
        />
      )}
    </>
  )
}
