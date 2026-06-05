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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { useSchedule } from '../contexts/schedule-context'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: Date
  dutyRecord: any
  assignedPerson: any
  swapType: 'mutual' | 'unilateral'
  auth: any
}

export function SwapRequestModal({
  open,
  onOpenChange,
  date,
  dutyRecord,
  assignedPerson,
  swapType: initialSwapType,
  auth,
}: Props) {
  const { personnels } = useSchedule()
  const [swapType, setSwapType] = useState<'mutual' | 'unilateral'>(initialSwapType)
  const [targetPerson, setTargetPerson] = useState('')
  const [excuseType, setExcuseType] = useState<'official' | 'unofficial'>('official')
  const [loading, setLoading] = useState(false)

  const isChief = auth?.role === 'admin' || auth?.role === 'chief'
  const otherPersonnels = personnels.filter((p) => p.id !== assignedPerson?.id)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      console.log('Swap talebi:', {
        type: swapType,
        date,
        requester: assignedPerson?.id,
        target: targetPerson,
        excuseType: swapType === 'unilateral' ? excuseType : undefined,
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
              <Label>Değişim Tipi</Label>
              <RadioGroup
                value={swapType}
                onValueChange={(v) => setSwapType(v as 'mutual' | 'unilateral')}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mutual" id="mutual" />
                  <Label htmlFor="mutual">Karşılıklı</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unilateral" id="unilateral" />
                  <Label htmlFor="unilateral">Karşılıksız</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {swapType === 'unilateral' && (
            <div>
              <Label>Mazeret Tipi</Label>
              <RadioGroup
                value={excuseType}
                onValueChange={(v) => setExcuseType(v as 'official' | 'unofficial')}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="official" id="official" />
                  <Label htmlFor="official" className="text-gray-500">
                    Gri (Resmi)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unofficial" id="unofficial" />
                  <Label htmlFor="unofficial" className="text-yellow-600">
                    Sarı (Resmi Olmayan)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div>
            <Label>Hedef Personel</Label>
            <Select value={targetPerson} onValueChange={setTargetPerson}>
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

          <Button className="w-full" onClick={handleSubmit} disabled={loading || !targetPerson}>
            {loading ? 'Gönderiliyor...' : 'Talep Gönder'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
