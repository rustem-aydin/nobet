'use client'

import { ReactNode, useState } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { ArrowLeftRight, FileWarning, Info, User } from 'lucide-react'
import { DutyType, Personnel } from '@/payload-types'
import { NobetDetayModal } from './nöbet-detay-modal'

interface Props {
  children: ReactNode
  date: Date
  status: string
  exceptionType?: string
  dutyType: DutyType
  personnel: Personnel
  auth: Personnel
}

export function ScheduleCeteleDateContextMenu({
  children,
  date,
  status,
  exceptionType,
  dutyType,
  personnel,
  auth,
}: Props) {
  const [swapOpen, setSwapOpen] = useState(false)
  const [swapType, setSwapType] = useState<'mutual' | 'unilateral'>('mutual')
  const [exceptionOpen, setExceptionOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)

  const isChief = auth?.role === 'admin' || auth?.role === 'chief'
  const isOwnDuty = personnel?.id === auth?.id
  const canSwap = isOwnDuty || isChief

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          {canSwap && (
            <>
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <ArrowLeftRight className="mr-2 h-4 w-4" />
                  Değişim Talebi
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem
                    onClick={() => {
                      setSwapType('mutual')
                      setSwapOpen(true)
                    }}
                  >
                    Karşılıklı
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => {
                      setSwapType('unilateral')
                      setSwapOpen(true)
                    }}
                  >
                    Karşılıksız
                  </ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
            </>
          )}

          <ContextMenuItem onClick={() => setExceptionOpen(true)}>
            <FileWarning className="mr-2 h-4 w-4" />
            Mazeret Bildir
          </ContextMenuItem>

          <ContextMenuSeparator />

          <ContextMenuItem onClick={() => setDetailOpen(true)}>
            <Info className="mr-2 h-4 w-4" />
            Detaylar
          </ContextMenuItem>

          {isChief && (
            <>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={() => setSwapOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                Nöbeti Değiştir (Chief)
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>
      {/* 
      <SwapRequestModal
        open={swapOpen}
        onOpenChange={setSwapOpen}
        date={date}
        dutyRecord={{ dutyType, personnel, status }}
        assignedPerson={personnel}
        swapType={swapType}
        auth={auth}
      /> */}

      <NobetDetayModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        date={date}
        personnel={personnel}
        dutyType={dutyType}
        status={status}
        exceptionType={exceptionType}
      />
    </>
  )
}
