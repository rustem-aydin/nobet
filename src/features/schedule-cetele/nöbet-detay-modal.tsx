'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { DutyType, Personnel } from '@/payload-types'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: Date
  personnel: Personnel
  dutyType: DutyType
  status: string
  exceptionType?: string
}

const STATUS_LABELS: Record<string, string> = {
  scheduled: 'Planlandı',
  completed: 'Tamamlandı',
  cancelled: 'İptal Edildi',
  swapped: 'Değiştirildi',
  exception: 'Mazeretli',
}

const EXCEPTION_LABELS: Record<string, string> = {
  official: 'Resmi Mazeret (Gri)',
  unofficial: 'Resmi Olmayan Mazeret (Sarı)',
}

export function NobetDetayModal({
  open,
  onOpenChange,
  date,
  personnel,
  dutyType,
  status,
  exceptionType,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nöbet Detayı</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tarih:</span>
            <span className="font-medium">{format(date, 'dd MMMM yyyy EEEE', { locale: tr })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Personel:</span>
            <span className="font-medium">{personnel.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Nöbet Türü:</span>
            <span className="font-medium" style={{ color: dutyType.color || undefined }}>
              {dutyType.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Durum:</span>
            <span className="font-medium">{STATUS_LABELS[status] || status}</span>
          </div>
          {exceptionType && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mazeret Türü:</span>
              <span className="font-medium">
                {EXCEPTION_LABELS[exceptionType] || exceptionType}
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Kapat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
