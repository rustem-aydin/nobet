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
    description: string
  }>
}

export function expandDutyTypesToDates(dutyTypes: DutyType[], year: number): DutyTypeWithDates[] {
  return dutyTypes
    .filter((dt) => dt.isActive) // Sadece aktif olanları al
    .filter((dt) => dt.year === year) // İstenen yıla göre filtrele
    .map((dt) => {
      const dateEntries: Array<{ date: Date; description: string }> = []
      const isHoliday = dt.name.toLowerCase().includes('bayram')

      dt.cronSchedules?.forEach(({ cron, description }) => {
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
              description,
            })
          })
        } catch (err) {
          console.error('Cron parse hatası:', cron, err)
        }
      })

      return {
        id: dt.id,
        name: dt.name,
        color: dt.color,
        priority: dt.priority,
        isHoliday,
        dates: dateEntries,
      }
    })
}

export function getDutyTypeForDate(
  date: Date,
  dutyTypesWithDates: DutyTypeWithDates[],
): { id: number; name: string; color: string; description: string; isHoliday: boolean } | null {
  const target = startOfDay(date)
  const sorted = [...dutyTypesWithDates].sort((a, b) => a.priority - b.priority)

  for (const dt of sorted) {
    const found = dt.dates.find((d) => isSameDay(d.date, target))
    if (found) {
      return {
        id: dt.id,
        name: dt.name,
        color: dt.color,
        description: found.description,
        isHoliday: dt.isHoliday,
      }
    }
  }

  return null
}

export function getDutyDatesForMonth(
  cronSchedules: { cron: string; description: string }[],
  year: number,
  month: number,
): Array<{ date: Date; description: string }> {
  const results: Array<{ date: Date; description: string }> = []

  const start = new Date(Date.UTC(year, month, 1))
  const end = new Date(Date.UTC(year, month + 1, 1))
  const currentDate = new Date(Date.UTC(year, month, 0))

  for (const { cron, description } of cronSchedules) {
    try {
      const interval = CronExpressionParser.parse(cron, {
        currentDate: currentDate.toISOString(),
        endDate: end.toISOString(),
        tz: 'UTC',
      })

      const daysInMonth = new Date(year, month + 1, 0).getDate()
      const dates = interval.take(daysInMonth + 5)

      for (const d of dates) {
        const rawDate = d.toDate()
        const cleanDate = new Date(
          Date.UTC(rawDate.getUTCFullYear(), rawDate.getUTCMonth(), rawDate.getUTCDate()),
        )

        if (cleanDate.getUTCMonth() === month && cleanDate.getUTCFullYear() === year) {
          results.push({
            date: cleanDate,
            description,
          })
        }
      }
    } catch (err) {
      console.error('Cron hatası:', cron, err)
    }
  }

  return results
}
