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
  const yearStr = year.toString()

  return dutyTypes.map((dt) => {
    const dateEntries: Array<{ date: Date; description: string }> = []
    const isHoliday = dt.name.toLowerCase().includes('bayram')

    // YILA GÖRE FİLTRELE - yearConfigs içinden istenen yılı bul
    const yearConfig = dt.yearConfigs?.find((yc) => yc.year === yearStr && yc.isActive)

    if (!yearConfig) {
      return {
        id: dt.id,
        name: dt.name,
        color: dt.color,
        priority: dt.priority,
        isHoliday,
        dates: [],
      }
    }

    yearConfig.cronSchedules.forEach(({ cron, description }) => {
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
  const end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59))

  for (const { cron, description } of cronSchedules) {
    try {
      const interval = CronExpressionParser.parse(cron, {
        currentDate: start.toISOString(),
        endDate: end.toISOString(),
        tz: 'UTC',
      })

      const dates = interval.take(31)

      for (const d of dates) {
        const rawDate = d.toDate()
        // Yıl, ay, gün'ü al, saati sıfırla (timezone sorununu önler)
        const cleanDate = new Date(
          Date.UTC(rawDate.getUTCFullYear(), rawDate.getUTCMonth(), rawDate.getUTCDate()),
        )
        results.push({
          date: cleanDate, // UTC midnight olarak sakla, local'e çevirme
          description,
        })
      }
    } catch (err) {
      console.error('Cron hatası:', cron, err)
    }
  }

  return results
}
