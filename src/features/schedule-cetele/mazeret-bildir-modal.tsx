'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Personnel } from '@/payload-types'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: Date
  personnel: Personnel
  auth: Personnel
}

export function MazeretBildirModal({ open, onOpenChange, date, personnel, auth }: Props) {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // TODO: Server action entegrasyonu (plan A: placeholder)
      console.log('Mazeret bildirildi:', {
        personnelId: personnel.id,
        date: date.toISOString(),
        reason,
        authId: auth.id,
      })
      onOpenChange(false)
      setReason('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mazeret Bildir</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label className="text-muted-foreground">Personel</Label>
            <p className="font-medium">{personnel.fullName}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Tarih</Label>
            <p className="font-medium">{format(date, 'dd MMMM yyyy EEEE', { locale: tr })}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reason">Sebep</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Mazeret sebebini yazın..."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !reason.trim()}>
            {loading ? 'Gönderiliyor...' : 'Gönder'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
