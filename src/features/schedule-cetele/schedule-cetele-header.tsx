'use client'

import { ChevronLeft, ChevronRight, Loader2, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DutyType } from '@/payload-types'

interface Props {
  dutyType: DutyType
  onPrev: () => void
  onNext: () => void
  isLoading: boolean
}

export function ScheduleCeteleHeader({ dutyType, onPrev, onNext, isLoading }: Props) {
  const isNormal = dutyType.sortOrder === 'normal'

  return (
    <div
      className="relative flex items-center justify-between gap-3 p-3 rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border shadow-xl transition-all duration-300 hover:shadow-2xl"
      style={{ borderColor: dutyType.color || 'hsl(var(--border))' }}
    >
      {/* Sol ok butonu */}
      <Button
        variant="outline"
        size="icon"
        onClick={onPrev}
        disabled={isLoading}
        className="rounded-full h-12 w-12 border-2 hover:scale-105 transition-all duration-200 disabled:opacity-50 shrink-0"
        style={{ borderColor: dutyType.color || 'currentColor' }}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </Button>

      {/* Orta başlık */}
      <div className="flex flex-col items-center flex-1 min-w-0 relative">
        {/* Renkli çizgi */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full"
          style={{ backgroundColor: dutyType.color || 'hsl(var(--primary))' }}
        />

        <span
          className="text-2xl md:text-3xl font-extrabold tracking-tight truncate w-full text-center drop-shadow-sm"
          style={{ color: dutyType.color || undefined }}
        >
          {dutyType.name}
        </span>

        {/* Sıralama badge'i */}
        <div className="flex items-center gap-2 mt-1.5 px-3 py-1 rounded-full bg-muted/50 text-xs font-medium border">
          {isNormal ? (
            <ArrowDown className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <ArrowUp className="h-3.5 w-3.5 text-blue-500" />
          )}
          <span>{isNormal ? 'Kıdemliden → Kıdemsize' : 'Kıdemsizden → Kıdemliye'}</span>
        </div>
      </div>

      {/* Sağ ok butonu */}
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={isLoading}
        className="rounded-full h-12 w-12 border-2 hover:scale-105 transition-all duration-200 disabled:opacity-50 shrink-0"
        style={{ borderColor: dutyType.color || 'currentColor' }}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </Button>
    </div>
  )
}
