'use client'

import { ReactNode, useState } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Info, Plus } from 'lucide-react'
import { useSchedule } from '../contexts/schedule-context'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { personnelIsMember } from '@/collections/Personnel/helpers'
interface Props {
  children: ReactNode
  date: Date
  dutyTypeId?: string | number
}

export function ScheduleNullContextMenu({ children, date, dutyTypeId }: Props) {
  const { handleSetDuty, personnels, handleLoading, auth } = useSchedule()

  const [detailOpen, setDetailOpen] = useState(false)

  const [selectedPersonId, setSelectedPersonId] = useState<string>('')

  const handleAssignDuty = async () => {
    if (!selectedPersonId) return

    const user = personnels.find((p) => p.id.toString() === selectedPersonId)
    if (!user) return

    await handleSetDuty({ date, user, dutyTypeId: Number(dutyTypeId) })
    setDetailOpen(false)
  }

  if (personnelIsMember({ personnel: auth })) {
    return <>{children}</>
  }
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuItem onClick={() => setDetailOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nöbet Ata
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nöbet Detayları</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 ">
            <div>
              <Label className="mb-1">Hedef Personel</Label>
              <Select value={selectedPersonId} onValueChange={setSelectedPersonId}>
                <SelectTrigger>
                  <SelectValue placeholder="Personel seçin" />
                </SelectTrigger>
                <SelectContent>
                  {personnels.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.fullName} (Rank: {p.rank})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleAssignDuty}
              disabled={handleLoading || !selectedPersonId}
              className="w-full bg-primary text-primary-foreground rounded-md px-4 py-2 disabled:opacity-50"
            >
              {handleLoading ? 'Atanıyor...' : 'Nöbet Ata'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
