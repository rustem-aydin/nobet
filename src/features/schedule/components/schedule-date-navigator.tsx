'use client'

import { startTransition, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { format, parseISO, isValid, addMonths, endOfMonth, isAfter } from 'date-fns'
import { tr } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buttonHover, transition } from '@/features/calendar/animations'
import { navigateDate, rangeText } from '@/features/calendar/helpers'
import { toast } from 'sonner'
import type { TCalendarView } from '@/features/calendar/types'

const MotionButton = motion.create(Button)

interface IProps {
  view: TCalendarView
}

export function ScheduleDateNavigator({ view }: IProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 1. URL'den tarihi al ve Date objesine çevir (Memoize ederek)
  const selectedDate = useMemo(() => {
    const dateParam = searchParams.get('date')
    if (dateParam) {
      const parsed = parseISO(dateParam)
      if (isValid(parsed)) return parsed
    }
    return new Date()
  }, [searchParams])

  // Mevcut aydan 1 ay sonrasının son günü (sınır tarihi)
  const maxDate = useMemo(() => endOfMonth(addMonths(new Date(), 1)), [])

  // 2. Tarih değiştiğinde URL'i güncelle
  const updateDate = (date: Date) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('date', format(date, 'yyyy-MM-dd'))

    const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname
    sessionStorage.setItem('last-calendar-url', currentUrl)

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  const month = format(selectedDate, 'MMMM', { locale: tr })
  const year = selectedDate.getFullYear()

  const handlePrevious = () => updateDate(navigateDate(selectedDate, view, 'previous'))

  const handleNext = () => {
    const nextDate = navigateDate(selectedDate, view, 'next')

    // Eğer sonraki tarih, izin verilen maksimum tarihi aşıyorsa hata fırlat
    if (isAfter(nextDate, maxDate)) {
      toast.error('En fazla mevcut aydan 1 ay sonrasına kadar navigate edebilirsiniz.')
      return
    }

    updateDate(nextDate)
  }

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <motion.span
          className="text-lg font-semibold capitalize"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={transition}
        >
          {month} {year}
        </motion.span>
      </div>

      <div className="flex items-center gap-2">
        <MotionButton
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={handlePrevious}
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
        >
          <ChevronLeft className="h-4 w-4" />
        </MotionButton>

        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        >
          {rangeText(view, selectedDate)}
        </motion.p>

        <MotionButton
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={handleNext}
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
        >
          <ChevronRight className="h-4 w-4" />
        </MotionButton>
      </div>
    </div>
  )
}
