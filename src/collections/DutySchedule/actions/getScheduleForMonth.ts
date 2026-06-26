'use server'
import { startOfMonth, endOfMonth, parseISO, isValid } from 'date-fns'

import { getPayload, Where } from 'payload'
import config from '@payload-config'
import { Group } from '@/payload-types'
import { CommonFilterParams } from 'types'
import { getAuth } from '@/collections/Personnel/actions/auth'
const payload = await getPayload({ config })

export async function getScheduleForMonth({ date }: Pick<CommonFilterParams, 'date'>) {
  // date geçerli bir string ise onu parse et, yoksa/boşsa bugünü (new Date()) kullan
  const targetDate = date && isValid(parseISO(date)) ? parseISO(date) : new Date()

  // Hedef tarihin (ister gelen date, ister bugün) ay başı ve ay sonu
  const monthStart = startOfMonth(targetDate)
  const monthEnd = endOfMonth(targetDate)

  const and: Where[] = []

  const auth = await getAuth()

  // Tarih filtresini ekle (date yoksa zaten mevcut ay filtrelenmiş olur)
  and.push({
    dutyDate: {
      greater_than_equal: monthStart,
      less_than_equal: monthEnd,
    },
    isOffical: { equals: false },
  })

  if (auth?.group) {
    and.push({
      'personnel.group.id': {
        equals: (auth.group as Group).id,
      },
    })
  }

  const schedules = await payload.find({
    collection: 'duty_schedule',
    limit: 1000,
    where: {
      and: and,
    },
  })

  return schedules.docs
}
