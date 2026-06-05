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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { ArrowLeftRight, FileWarning, Info, User } from 'lucide-react'
import { SwapRequestModal } from './swap-request-modal'

interface Props {
  children: ReactNode
  date: Date
  dutyRecord: any
  assignedPerson: any
  auth: any
}

export function ScheduleContextMenu({ children, date, dutyRecord, assignedPerson, auth }: Props) {
  const [swapOpen, setSwapOpen] = useState(false)
  const [exceptionOpen, setExceptionOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [swapType, setSwapType] = useState<'mutual' | 'unilateral'>('mutual')

  const isChief = auth?.role === 'admin' || auth?.role === 'chief'
  const isOwnDuty = assignedPerson?.id === auth?.id
  const canSwap = isOwnDuty || isChief

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          {canSwap && dutyRecord && (
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
                    Karşılıklı Değişim
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => {
                      setSwapType('unilateral')
                      setSwapOpen(true)
                    }}
                  >
                    Karşılıksız Değişim
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

          {isChief && dutyRecord && (
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

      <SwapRequestModal
        open={swapOpen}
        onOpenChange={setSwapOpen}
        date={date}
        dutyRecord={dutyRecord}
        assignedPerson={assignedPerson}
        swapType={swapType}
        auth={auth}
      />

      <Dialog open={exceptionOpen} onOpenChange={setExceptionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mazeret Bildir</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Tarih</Label>
              <Input value={format(date, 'dd MMMM yyyy', { locale: tr })} disabled />
            </div>
            <div>
              <Label>Sebep</Label>
              <Input placeholder="Mazeret sebebini yazın..." />
            </div>
            <Button className="w-full">Gönder</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nöbet Detayları</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4 text-sm">
            <p>
              <strong>Tarih:</strong> {format(date, 'dd MMMM yyyy', { locale: tr })}
            </p>
            <p>
              <strong>Durum:</strong> {dutyRecord ? 'Atanmış' : 'Boş'}
            </p>
            {assignedPerson && (
              <p>
                <strong>Personel:</strong> {assignedPerson.fullName}
              </p>
            )}
            {dutyRecord?.notes && (
              <p>
                <strong>Açıklama:</strong> {dutyRecord.notes}
              </p>
            )}
            {dutyRecord?.status && (
              <p>
                <strong>Statü:</strong> {dutyRecord.status}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
