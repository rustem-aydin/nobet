// features/schedule/components/swap-request-modal.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface Props {
  personnelId: number
  personnelName: string
  dutyTypeId: string
  date: string
  onClose: () => void
}

export function SwapRequestModal({ personnelId, personnelName, dutyTypeId, date, onClose }: Props) {
  const [swapType, setSwapType] = useState<'mutual' | 'unilateral'>('mutual')
  const [targetPersonnel, setTargetPersonnel] = useState('')
  const [excuseType, setExcuseType] = useState<'official' | 'unofficial'>('unofficial')

  const handleSubmit = async () => {
    // API çağrısı
    console.log({
      requesterPersonnel: personnelId,
      requesterDuty: date,
      type: swapType,
      targetPersonnel: swapType === 'mutual' ? targetPersonnel : null,
      excuseType: swapType === 'unilateral' ? excuseType : null,
    })
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Değişim Talebi</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="text-sm text-muted-foreground">
            <strong>{personnelName}</strong> - {new Date(date).toLocaleDateString('tr-TR')}
          </div>

          <RadioGroup
            value={swapType}
            onValueChange={(v: any) => setSwapType(v as 'mutual' | 'unilateral')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mutual" id="mutual" />
              <Label htmlFor="mutual">Karşılıklı Değişim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unilateral" id="unilateral" />
              <Label htmlFor="unilateral">Karşılıksız Değişim</Label>
            </div>
          </RadioGroup>

          {swapType === 'mutual' && (
            <div className="grid gap-2">
              <Label>Karşı Taraf Personel</Label>
              <Select value={targetPersonnel} onValueChange={setTargetPersonnel}>
                <SelectTrigger>
                  <SelectValue placeholder="Personel seçin" />
                </SelectTrigger>
                <SelectContent>
                  {/* Personel listesi */}
                  <SelectItem value="1">Mehmet</SelectItem>
                  <SelectItem value="2">Ayşe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {swapType === 'unilateral' && (
            <div className="grid gap-2">
              <Label>Mazeret Türü</Label>
              <RadioGroup
                value={excuseType}
                onValueChange={(v: any) => setExcuseType(v as 'official' | 'unofficial')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="official" id="official" />
                  <Label htmlFor="official">Resmi (Gri)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unofficial" id="unofficial" />
                  <Label htmlFor="unofficial">Resmi Olmayan (Sarı)</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            İptal
          </Button>
          <Button onClick={handleSubmit}>Talep Gönder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
