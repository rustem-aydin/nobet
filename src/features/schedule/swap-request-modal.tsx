'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { DutySchedule, Personnel } from '@/payload-types'
import { useSchedule } from './contexts/schedule-context'
import { personnelIsAdminOrIsChief } from '@/collections/Personnel/helpers'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: Date
  dutyRecord: DutySchedule
  assignedPerson: Personnel
  swapType: 'mutual' | 'unilateral'
  auth: Personnel
}

export function SwapRequestModal({
  open,
  onOpenChange,
  date,
  dutyRecord,
  assignedPerson,
  swapType,
  auth,
}: Props) {
  const { personnels, handleSwap } = useSchedule()
  const [targetPerson, setTargetPerson] = useState<number>(auth.id)
  const [requesterDuty, setRequesterDuty] = useState<number>(dutyRecord.id)
  const [loading, setLoading] = useState(false)

  const isChief = personnelIsAdminOrIsChief({ personnel: auth })
  const otherPersonnels = personnels.filter((p) => p.id !== assignedPerson?.id)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await handleSwap({
        requesterPersonnel: targetPerson,
        requesterDuty: requesterDuty,
        status: 'pending',
        type: swapType,
        targetPersonnel: assignedPerson.id,
        targetDuty: dutyRecord.id,
      })
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {swapType === 'mutual' ? 'Karşılıklı Değişim' : 'Karşılıksız Değişim'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label className="text-muted-foreground">Tarih</Label>
            <p className="font-medium">{format(date, 'dd MMMM yyyy', { locale: tr })}</p>
          </div>

          {assignedPerson && (
            <div>
              <Label className="text-muted-foreground">Mevcut Nöbetli</Label>
              <p className="font-medium">{assignedPerson.fullName}</p>
            </div>
          )}
          {!isChief && (
            <div>
              <Label className="text-muted-foreground">Talep Eden</Label>
              <p className="font-medium">{auth.fullName}</p>
            </div>
          )}
          {isChief && (
            <div>
              <Label>Hedef Personel</Label>
              <Select value={String(targetPerson)} onValueChange={(e: any) => setTargetPerson(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Personel seçin" />
                </SelectTrigger>
                <SelectContent>
                  {otherPersonnels.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.fullName} (Rank: {p.rank})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button className="w-full" onClick={handleSubmit} disabled={loading || !targetPerson}>
            {loading ? 'Gönderiliyor...' : 'Talep Gönder'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
