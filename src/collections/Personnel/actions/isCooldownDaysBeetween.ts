'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Group, Personnel } from '@/payload-types'
import { toLocalDateString } from '@/helpers/dutyScheduler'

import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { getAuth } from '@/collections/Personnel/actions/auth'
const payload = await getPayload({ config })

export const isCooldownDaysBeetween = async ({
  date,
  personnel,
}: {
  date: Date
  personnel: Personnel
}) => {
  const auth = await getAuth()
  const personnelId = personnel.id
  const dutyDateStr = toLocalDateString(date)
  const formatDate = (date: Date) => format(date, 'd MMMM yyyy', { locale: tr })

  const cooldownDays = (auth.group as Group)?.cooldownDays

  if (cooldownDays > 0) {
    const cooldownStart = new Date(date)
    cooldownStart.setDate(cooldownStart.getDate() - cooldownDays)
    const cooldownStartStr = toLocalDateString(cooldownStart)

    const cooldownEnd = new Date(date)
    cooldownEnd.setDate(cooldownEnd.getDate() + cooldownDays)
    const cooldownEndStr = toLocalDateString(cooldownEnd)

    // Tek fetch: tüm cooldown penceresi
    const { docs: allDutiesInWindow } = await payload.find({
      collection: 'duty_schedule',
      where: {
        and: [
          { 'personnel.id': { equals: personnelId } },
          { dutyDate: { greater_than_equal: cooldownStartStr } },
          { dutyDate: { less_than_equal: cooldownEndStr } },
          { dutyDate: { not_equals: dutyDateStr } }, // Atanacak gün hariç
        ],
      },
      depth: 1,
      limit: 100,
    })

    if (allDutiesInWindow.length > 0) {
      const conflictDates = allDutiesInWindow.map((d: any) => d.dutyDate).sort()

      // Geçmişte mi yoksa gelecekte mi kontrol et
      const pastDuties = allDutiesInWindow.filter((d: any) => d.dutyDate < dutyDateStr)
      const futureDuties = allDutiesInWindow.filter((d: any) => d.dutyDate > dutyDateStr)

      // Önce geçmiş kontrolü
      if (pastDuties.length > 0) {
        const pastDates = pastDuties.map((d: any) => d.dutyDate).join(', ')
        const lastDutyDateStr = pastDuties
          .map((d: any) => d.dutyDate)
          .sort()
          .pop()
        const lastDutyDate = new Date(lastDutyDateStr)
        const earliestDate = new Date(lastDutyDate)
        earliestDate.setDate(lastDutyDate.getDate() + cooldownDays + 1)

        throw new Error(
          `Cooldown ihlali: ${(personnel as any).fullName}, ${cooldownDays} gün içinde zaten nöbet tutmuş ` +
            `(${formatDate(new Date(pastDates))}). En erken ${formatDate(new Date(earliestDate))} tarihinde nöbet tutabilir.`,
        )
      }

      // Sonra gelecek kontrolü
      if (futureDuties.length > 0) {
        const futureDates = futureDuties.map((d: any) => d.dutyDate).join(', ')
        const nextDutyDateStr = futureDuties.map((d: any) => d.dutyDate).sort()[0]
        const nextDutyDate = new Date(nextDutyDateStr)
        const latestDate = new Date(nextDutyDate)
        latestDate.setDate(nextDutyDate.getDate() - cooldownDays - 1)

        throw new Error(
          `Cooldown ihlali: ${(personnel as any).fullName}, ${cooldownDays} gün içinde nöbet atanmış ` +
            `(${formatDate(new Date(futureDates))}). En geç ${formatDate(new Date(latestDate))} tarihine kadar nöbet atanabilir.`,
        )
      }
    }
  }
}
