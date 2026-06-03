// helpers/dutyTypeMatcher.ts
import { DutyType } from '@/payload-types'
import { CronExpressionParser } from 'cron-parser'
import { isSameDay, startOfDay } from 'date-fns'

export interface DutyTypeWithDates {
  id: number
  name: string
  color: string
  priority: number
  isHoliday: boolean
  dates: Array<{
    date: Date
    description: string // YENI: O günün açıklaması
  }>
}

export function expandDutyTypesToDates(dutyTypes: DutyType[], year: number): DutyTypeWithDates[] {
  return dutyTypes.map((dt) => {
    const dateEntries: Array<{ date: Date; description: string }> = []
    const isHoliday = dt.name.toLowerCase().includes('bayram')

    dt.cronSchedules.forEach(({ cron, description }) => {
      try {
        const startIso = new Date(year, 0, 1).toISOString()
        const endIso = new Date(year, 11, 31, 23, 59, 59).toISOString()

        const interval = CronExpressionParser.parse(cron, {
          currentDate: startIso,
          endDate: endIso,
        })

        const allDates = interval.take(366)
        allDates.forEach((d) => {
          dateEntries.push({
            date: startOfDay(d.toDate()),
            description, // Cron schedule'daki açıklama
          })
        })
      } catch (err) {
        console.error('Cron parse hatası:', cron, err)
      }
    })

    return {
      id: Number(dt.id),
      name: dt.name,
      color: dt.color,
      priority: dt.priority,
      isHoliday,
      dates: dateEntries,
    }
  })
}

// helpers/dutyTypeMatcher.ts
export function getDutyTypeForDate(
  date: Date,
  dutyTypesWithDates: DutyTypeWithDates[],
): { name: string; color: string; description: string; isHoliday: boolean } | null {
  const target = startOfDay(date)
  const sorted = [...dutyTypesWithDates].sort((a, b) => a.priority - b.priority)

  for (const dt of sorted) {
    const found = dt.dates.find((d) => isSameDay(d.date, target))
    if (found) {
      return {
        name: dt.name,
        color: dt.color,
        description: found.description,
        isHoliday: dt.isHoliday, // ← EKLENDİ
      }
    }
  }

  return null
}
