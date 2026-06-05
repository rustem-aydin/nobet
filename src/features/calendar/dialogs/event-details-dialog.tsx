'use client'

import { format, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, Clock, Text, Type, User, CheckCircle, XCircle } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCalendar } from '@/features/calendar/contexts/calendar-context'
import { AddEditEventDialog } from '@/features/calendar/dialogs/add-edit-event-dialog'
import { DutyException, DutyExceptionsType, Personnel } from '@/payload-types'
import { Badge } from '@/components/ui/badge'
import { DutyStatus } from '../views/month-view/duty_status'
import { useDisclosure } from '../hooks'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface IProps {
  event: DutyException
  children: ReactNode
}

export function EventDetailsDialog({ event, children }: IProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isApproveOpen, setIsApproveOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)

  const startDate = parseISO(event.startDate)
  const endDate = parseISO(event.endDate)
  const { removeEvent, auth, updateEvent } = useCalendar()

  const isAdmin = auth.role === 'admin' // veya auth.isAdmin
  const isOwner = (event.personnel as Personnel).email === auth.email
  const isApproved = event.status === 'approved'

  const canReject = isAdmin && !isOwner

  const canApprove = true

  const canEdit = !isApproved && isOwner

  const canDelete = isOwner

  const deleteEvent = async (eventId: number) => {
    try {
      await removeEvent(eventId)
      toast.success('Mazeret başarıyla silindi.')
    } catch {
      toast.error('Mazeret silinirken bir hata oluştu.')
    }
  }

  const handleApprove = async () => {
    try {
      await updateEvent(event.id, { status: 'approved' })
      toast.success('Mazeret onaylandı.')
      setIsApproveOpen(false)
    } catch {
      toast.error('Onaylama işlemi başarısız.')
    }
  }

  const handleReject = async () => {
    try {
      await updateEvent(event.id, { status: 'rejected' })
      toast.success('Mazeret reddedildi.')
      setIsRejectOpen(false)
    } catch {
      toast.error('Reddetme işlemi başarısız.')
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mazeret Talebi</DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[80vh]">
            <div className="space-y-4 p-4">
              <div className="flex items-start gap-2">
                <User className="mt-1 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Personel</p>
                  <p className="text-sm text-muted-foreground">
                    {(event.personnel as Personnel).fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Type className="mt-1 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Mazeret Türü</p>
                  <Badge
                    style={{
                      borderColor: `${(event.exceptions_type as DutyExceptionsType).color}50`,
                      backgroundColor: `${(event.exceptions_type as DutyExceptionsType).color}20`,
                      color: (event.exceptions_type as DutyExceptionsType).color,
                    }}
                    className="text-sm rounded-sm text-muted-foreground"
                  >
                    {(event.exceptions_type as DutyExceptionsType).name}
                  </Badge>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="mt-1 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Durum</p>
                  <DutyStatus status={event.status} />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="mt-1 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Başlangıç Tarihi</p>
                  <p className="text-sm text-muted-foreground">
                    {format(startDate, 'EEEE dd MMMM', { locale: tr })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-1 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Bitiş Tarihi</p>
                  <p className="text-sm text-muted-foreground">
                    {format(endDate, 'EEEE dd MMMM', { locale: tr })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Text className="mt-1 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Açıklama</p>
                  <p className="text-sm text-muted-foreground">{event.reason}</p>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="flex flex-wrap justify-end gap-2">
            {/* Onayla - Herkes için */}
            {canApprove && !isApproved && (
              <AlertDialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="default" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="mr-1 size-4" />
                    Onayla
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Onaylama</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bu mazeret talebini onaylamak istediğinize emin misiniz?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleApprove}>Onayla</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {/* Reddet - Sadece admin ve kendi oluşturmadığı */}
            {canReject && !isApproved && (
              <AlertDialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <XCircle className="mr-1 size-4" />
                    Reddet
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reddetme</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bu mazeret talebini reddetmek istediğinize emin misiniz?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReject} className="bg-destructive">
                      Reddet
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {/* Düzenle - Approved değilse ve owner ise */}
            {canEdit && (
              <AddEditEventDialog event={event}>
                <Button variant="outline">Düzenle</Button>
              </AddEditEventDialog>
            )}

            {/* Sil - Owner ise */}
            {canDelete && (
              <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Sil</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bu mazeret talebi kalıcı olarak silinecektir.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteEvent(event.id)}
                      className="bg-destructive"
                    >
                      Sil
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
