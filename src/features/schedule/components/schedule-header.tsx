'use client'

import { motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { slideFromLeft, slideFromRight, transition } from '@/features/calendar/animations'
import { useSchedule } from '../contexts/schedule-context'
import { ScheduleDateNavigator } from './schedule-date-navigator'
import { TodayButton } from '@/features/calendar/header/today-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { generateSchedule } from 'actions/duty_schedule'
import { useState } from 'react'
import { ScheduleTodayButton } from './ScheduleTodayButton'

export function ScheduleHeader() {
  const { selectedDate, setSelectedDate, selectedDutyType, setSelectedDutyType, duty_types, auth } =
    useSchedule()
  const [generating, setGenerating] = useState(false)

  const isChief = auth?.role === 'admin' || auth?.role === 'chief'

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      await generateSchedule(selectedDate.getFullYear(), selectedDate.getMonth())
      window.location.reload()
    } catch (err) {
      console.error('Generate hatası:', err)
    } finally {
      setGenerating(false)
    }
  }

  const selectValue = selectedDutyType ? String(selectedDutyType.id) : 'all'

  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <motion.div
        className="flex items-center gap-3"
        variants={slideFromLeft}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        <ScheduleTodayButton />
        <ScheduleDateNavigator
          view="month"
          events={[]}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </motion.div>

      <motion.div
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-3"
        variants={slideFromRight}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        <Select
          value={selectValue}
          onValueChange={(val) => {
            if (val === 'all') {
              setSelectedDutyType(null)
            } else {
              const dt = duty_types.find((d) => String(d.id) === val)
              if (dt) setSelectedDutyType(dt)
            }
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tüm Nöbetler" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-400" />
                Tüm Nöbetler
              </div>
            </SelectItem>
            {duty_types.map((dt) => (
              <SelectItem key={dt.id} value={String(dt.id)}>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: dt.color || '#888' }}
                  />
                  {dt.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isChief && (
          <Button variant="outline" onClick={handleGenerate} disabled={generating}>
            <RefreshCw className={`h-4 w-4 mr-2 ${generating ? 'animate-spin' : ''}`} />
            {generating ? 'Oluşturuluyor...' : 'Çizelge Oluştur'}
          </Button>
        )}
      </motion.div>
    </div>
  )
}
