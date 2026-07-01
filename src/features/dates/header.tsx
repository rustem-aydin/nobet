'use client'

import { startTransition, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buttonHover, transition } from '@/features/calendar/animations'
import { expandDutyTypesToDates } from '@/helpers/dutyTypeMatcher'
import { DutyType } from '@/payload-types'

const MotionButton = motion.create(Button)
interface YearNavigatorProps {
  year?: number
  dutyTypes: DutyType[]
}
export function YearNavigator({ year, dutyTypes }: YearNavigatorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedYear = useMemo(() => {
    const yearParam = searchParams.get('year')
    if (yearParam) {
      const parsed = parseInt(yearParam, 10)
      if (!isNaN(parsed)) return parsed
    }
    return new Date().getFullYear()
  }, [searchParams])

  const updateYear = (year: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('year', String(year))

    const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname
    sessionStorage.setItem('last-calendar-url', currentUrl)

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  const handlePrevious = () => updateYear(selectedYear - 1)

  const handleNext = () => {
    updateYear(selectedYear + 1)
  }
  const dutyTypeCounts = expandDutyTypesToDates(dutyTypes, selectedYear).map((duty) => ({
    id: duty.id,
    name: duty.name,
    color: duty.color,
    count: duty.dates.length,
  }))
  return (
    <div className="flex h-24 border justify-between px-4 rounded-xl mb-4 items-center gap-2">
      <MotionButton
        variant="outline"
        size="icon"
        className="h-12 w-12"
        onClick={handlePrevious}
        variants={buttonHover}
        whileHover="hover"
        whileTap="tap"
      >
        <ChevronLeft className="h-8 w-8" />
      </MotionButton>

      <div className="flex flex-col items-center">
        <motion.span
          key={selectedYear}
          className="min-w-20 text-center text-2xl font-semibold tabular-nums"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={transition}
        >
          {selectedYear}
        </motion.span>
        <div className="flex flex-wrap gap-2 text-[10px]">
          {dutyTypeCounts.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1 rounded-xs border px-1 py-0.5 font-semibold"
              style={{ borderColor: item.color, color: item.color }}
            >
              {item.name}: {item.count}
            </span>
          ))}
        </div>
      </div>

      <MotionButton
        variant="outline"
        size="icon"
        className="h-12 w-12"
        onClick={handleNext}
        variants={buttonHover}
        whileHover="hover"
        whileTap="tap"
      >
        <ChevronRight className="h-8 w-8" />
      </MotionButton>
    </div>
  )
}
