'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DutyType } from '@/payload-types'

interface Props {
  dutyType: DutyType
  onPrev: () => void
  onNext: () => void
  isLoading: boolean
}

export function ScheduleCeteleHeader({ dutyType, onPrev, onNext, isLoading }: Props) {
  return (
    <div className="flex items-center justify-center gap-4 border rounded-lg py-3 bg-muted/30">
      <Button variant="ghost" size="icon" onClick={onPrev} disabled={isLoading}>
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <div className="flex flex-col items-center min-w-[200px]">
        <span className="text-lg font-semibold" style={{ color: dutyType.color || undefined }}>
          {dutyType.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {dutyType.sortOrder === 'normal' ? '↓ Kıdemliden Kıdemsize' : '↑ Kıdemsizden Kıdemliye'}
        </span>
      </div>
      <Button variant="ghost" size="icon" onClick={onNext} disabled={isLoading}>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
