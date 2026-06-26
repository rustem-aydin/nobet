'use client'

import { ReactNode, useState, useEffect, useRef } from 'react'
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

interface Props {
  children: ReactNode
  date: Date
  dutyRecord: DutySchedule
  assignedPerson: Personnel
  auth: any
}

// ---------- Yardımcı fonksiyonlar (değişmedi) ----------
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

function formatCountdown(seconds: number): string {
  if (seconds <= 0) return '00:00:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}
// -------------------------------------------

export function ScheduleContextMenu({ children, date, dutyRecord, assignedPerson, auth }: Props) {
  const { handleDeleteDuty, schedules } = useSchedule()
  const [swapOpen, setSwapOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [nobetdasOpen, setNobetdasOpen] = useState(false) // Yeni state
  const [swapType, setSwapType] = useState<'mutual' | 'unilateral'>('mutual')

  // Dialog geri sayım state ve interval ref
  const [countdownDialog, setCountdownDialog] = useState('')
  const intervalDialogRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Hücre geri sayım state ve interval ref
  const [countdownCell, setCountdownCell] = useState('')
  const intervalCellRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const isChief = auth?.role === 'admin' || auth?.role === 'chief'
  const isOwnDuty = assignedPerson?.id === auth?.id
  const { color, text } = getStatus(dutyRecord.status)
  const isCompleted = dutyRecord.status === 'completed'

  const activeDuty = isCurrentlyOnDuty(date)

  // ---------- Dialog geri sayımı ----------
  useEffect(() => {
    if (detailOpen) {
      const next9AM = getNext9AM()
      const tick = () => {
        const diff = Math.floor((next9AM.getTime() - Date.now()) / 1000)
        setCountdownDialog(formatCountdown(diff))
      }
      tick()
      intervalDialogRef.current = setInterval(tick, 1000)
    } else {
      if (intervalDialogRef.current) {
        clearInterval(intervalDialogRef.current)
        intervalDialogRef.current = null
      }
    }
    return () => {
      if (intervalDialogRef.current) clearInterval(intervalDialogRef.current)
    }
  }, [detailOpen])

  // ---------- Hücre geri sayımı + otomatik yenileme ----------
  useEffect(() => {
    if (activeDuty) {
      const next9AM = getNext9AM()
      const timeUntilRefresh = next9AM.getTime() - Date.now()

      const tick = () => {
        const diff = Math.floor((next9AM.getTime() - Date.now()) / 1000)
        setCountdownCell(formatCountdown(diff))
      }
      tick()
      intervalCellRef.current = setInterval(tick, 1000)

      let refreshTimer: ReturnType<typeof setTimeout> | null = null
      if (timeUntilRefresh > 0) {
        refreshTimer = setTimeout(() => {
          window.location.reload()
        }, timeUntilRefresh)
      }

      return () => {
        if (intervalCellRef.current) clearInterval(intervalCellRef.current)
        if (refreshTimer) clearTimeout(refreshTimer)
      }
    }
  }, [activeDuty])

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="relative">
            {children}
            {activeDuty && (
              <div className="absolute bottom-0 right-0 bg-background/80 px-1 text-[10px] font-mono tabular-nums rounded leading-tight">
                {countdownCell || '--:--:--'}
              </div>
            )}
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent className="w-56">
          {/* Değişim, silme vb. işlemler (aynı) */}
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
                <>
                  <ContextMenuItem
                    className="cursor-pointer hover:bg-background"
                    onClick={() => setSwapOpen(true)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Nöbeti Değiştir (Chief)
                  </ContextMenuItem>
                </>
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

          {/* Detaylar tetikleyici */}
          <ContextMenuItem
            className="cursor-pointer hover:bg-background"
            onClick={() => setDetailOpen(true)}
          >
            <Info className="mr-2 h-4 w-4" />
            Detaylar
          </ContextMenuItem>
          <ContextMenuSeparator />

          {/* Nobetdas tetikleyici – artık sadece menü öğesi */}
          <ContextMenuItem
            className="cursor-pointer hover:bg-background"
            onClick={() => setNobetdasOpen(true)}
          >
            <Users className="mr-2 h-4 w-4" />
            Nöbetdaş
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* SwapRequestModal (değişmedi) */}
      <SwapRequestModal
        open={swapOpen}
        onOpenChange={setSwapOpen}
        date={date}
        dutyRecord={dutyRecord}
        assignedPerson={assignedPerson}
        swapType={swapType}
        auth={auth}
      />

      {/* Detaylar Diyaloğu */}
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
                <p className="text-lg font-mono font-semibold tabular-nums">
                  {countdownDialog || '--:--:--'}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Nobetdas Diyaloğu – context menu dışında, bağımsız olarak render edilir */}
      <NobetdasDialog dutyRecord={dutyRecord} open={nobetdasOpen} onOpenChange={setNobetdasOpen} />
    </>
  )
}
