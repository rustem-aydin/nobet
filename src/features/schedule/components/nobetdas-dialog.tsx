'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DutySchedule, Personnel } from '@/payload-types'
import { getNobetdasPersonnels } from '@/collections/Personnel/actions/getNobetdasPersonnel'
import { useEffect, useState } from 'react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  dutyRecord: DutySchedule
}

export const NobetdasDialog = ({ open, onOpenChange, dutyRecord }: Props) => {
  const [nobetdas, setNobetdas] = useState<DutySchedule[]>()
  useEffect(() => {
    if (!open) return
    let cancelled = false
    const getNobetdas = async () => {
      const data = await getNobetdasPersonnels({ date: dutyRecord.dutyDate })
      if (!cancelled) setNobetdas(data)
    }
    getNobetdas()
    return () => {
      cancelled = true
    }
  }, [dutyRecord.dutyDate, open])
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nöbetdaş</DialogTitle>
        </DialogHeader>

        {nobetdas?.map((per: DutySchedule) => {
          return (
            <p key={per.id} className="text-sm text-muted-foreground">
              {(per.personnel as Personnel).fullName}
            </p>
          )
        })}
      </DialogContent>
    </Dialog>
  )
}
