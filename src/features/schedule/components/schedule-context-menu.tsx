'use client'

import { ReactNode, useState, useEffect, useMemo } from 'react'

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

import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

import { ArrowLeftRight, Info, Trash2, User, Users } from 'lucide-react'

import { useSchedule } from '../contexts/schedule-context'
import { DutySchedule, DutyType, Personnel } from '@/payload-types'
import { getStatus } from '@/helpers/dutyScheduler'
import { Badge } from '@/components/ui/badge'
import { SwapRequestModal } from '../swap-request-modal'
import { NobetdasDialog } from './nobetdas-dialog'
import { personnelIsAdminOrIsChief } from '@/collections/Personnel/helpers'
import { CountdownTimer } from './countdown-timer'

interface Props {
  children: ReactNode
  date: Date
  dutyRecord: DutySchedule
  assignedPerson: Personnel
  auth: any
}

// ---------- Yardımcılar ----------

function getNext9AM(): Date {
  const now = new Date()
  const next = new Date(now)
  next.setHours(9, 0, 0, 0)
  if (now >= next) next.setDate(next.getDate() + 1)
  return next
}

function isCurrentlyOnDuty(dutyDate: Date): boolean {
  const now = new Date()
  const start = new Date(dutyDate)
  start.setHours(9, 0, 0, 0)
  const end = new Date(start)
  end.setDate(end.getDate() + 1)
  return now >= start && now < end
}

// -------------------------------------------

export function ScheduleContextMenu({ children, date, dutyRecord, assignedPerson, auth }: Props) {
  const { handleDeleteDuty } = useSchedule()
  const [swapOpen, setSwapOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [nobetdasOpen, setNobetdasOpen] = useState(false)
  const [swapType, setSwapType] = useState<'mutual' | 'unilateral'>('mutual')

  const isChief = personnelIsAdminOrIsChief({ personnel: auth })
  const isOwnDuty = assignedPerson?.id === auth?.id
  const { color, text } = getStatus(dutyRecord.status)
  const isCompleted = dutyRecord.status === 'completed'

  const activeDuty = isCurrentlyOnDuty(date)

  // useMemo ile sabitle: CountdownTimer'ın effect'i gereksiz yere yeniden başlamasın
  const next9AM = useMemo(() => getNext9AM(), [activeDuty])

  // Sadece 9 AM'de sayfa yenileme (countdown ayrı component'te)
  useEffect(() => {
    if (!activeDuty) return
    const timeUntilRefresh = next9AM.getTime() - Date.now()
    if (timeUntilRefresh <= 0) return

    const refreshTimer = setTimeout(() => {
      window.location.reload()
    }, timeUntilRefresh)

    return () => clearTimeout(refreshTimer)
  }, [activeDuty, next9AM])

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="relative">
            {children}
            {activeDuty && (
              <div className="absolute bottom-0 right-0 bg-background/80 px-1 text-[10px] rounded leading-tight">
                <CountdownTimer target={next9AM} />
              </div>
            )}
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent className="w-56">
          {/* ... aynı menü öğeleri, dokunmadım ... */}
          {!isCompleted && !activeDuty && (
            <>
              {!isOwnDuty && dutyRecord && (
                <>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>
                      <ArrowLeftRight className="mr-2 h-4 w-4" />
                      Değişim Talebi
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                      <ContextMenuItem
                        className="cursor-pointer hover:bg-background"
                        onClick={() => {
                          setSwapType('mutual')
                          setSwapOpen(true)
                        }}
                      >
                        Karşılıklı Değişim
                      </ContextMenuItem>
                      <ContextMenuItem
                        className="cursor-pointer hover:bg-background"
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

              {isChief && dutyRecord && (
                <ContextMenuItem
                  className="cursor-pointer hover:bg-background"
                  onClick={() => setSwapOpen(true)}
                >
                  <User className="mr-2 h-4 w-4" />
                  Nöbeti Değiştir (Chief)
                </ContextMenuItem>
              )}

              {isChief && (
                <>
                  <ContextMenuSeparator />
                  <ContextMenuItem
                    className="cursor-pointer hover:bg-destructive/20"
                    variant="destructive"
                    onClick={() => handleDeleteDuty({ date, user: assignedPerson })}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Nöbeti Sil
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                </>
              )}
            </>
          )}

          <ContextMenuItem
            className="cursor-pointer hover:bg-background"
            onClick={() => setDetailOpen(true)}
          >
            <Info className="mr-2 h-4 w-4" />
            Detaylar
          </ContextMenuItem>
          <ContextMenuSeparator />

          <ContextMenuItem
            className="cursor-pointer hover:bg-background"
            onClick={() => setNobetdasOpen(true)}
          >
            <Users className="mr-2 h-4 w-4" />
            Nöbetdaş
          </ContextMenuItem>
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

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nöbet Detayları</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4 text-sm">
            <p>
              <strong>Tarih:</strong> {format(date, 'dd MMMM yyyy', { locale: tr })}
            </p>
            {assignedPerson && (
              <p>
                <strong>Personel:</strong> {assignedPerson.fullName}
              </p>
            )}
            {dutyRecord?.status && (
              <div>
                <strong>Statü:</strong>
                {activeDuty ? (
                  <Badge
                    style={{ backgroundColor: '#9810fa', marginLeft: 4 }}
                    className="text-white"
                  >
                    <span>Nöbette</span>
                  </Badge>
                ) : (
                  <Badge style={{ backgroundColor: color, marginLeft: 4 }}>
                    <span>{text}</span>
                  </Badge>
                )}
              </div>
            )}
            {dutyRecord?.dutyType && (
              <div>
                <strong>Nöbet Türü:</strong>
                <Badge
                  style={{
                    backgroundColor: `${(dutyRecord?.dutyType as DutyType).color}`,
                    marginLeft: 4,
                  }}
                >
                  <span>{(dutyRecord?.dutyType as DutyType).name}</span>
                </Badge>
              </div>
            )}
            {activeDuty && (
              <div className="mt-4 rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-xs text-muted-foreground">Sonraki nöbet değişimine kalan süre</p>
                <p className="text-lg font-semibold">
                  <CountdownTimer target={next9AM} />
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <NobetdasDialog dutyRecord={dutyRecord} open={nobetdasOpen} onOpenChange={setNobetdasOpen} />
    </>
  )
}
