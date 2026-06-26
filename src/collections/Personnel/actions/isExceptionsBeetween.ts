'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Personnel } from '@/payload-types'
import { toLocalDateString } from '@/helpers/dutyScheduler'

import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
const payload = await getPayload({ config })

export const isExceptionsBeetween = async ({
  date,
  personnel,
}: {
  date: Date
  personnel: Personnel
}) => {
  const personnelId = personnel.id
  const dutyDateStr = toLocalDateString(date)
  const formatDate = (date: Date) => format(date, 'd MMMM yyyy', { locale: tr })

  const { docs: exceptions } = await payload.find({
    collection: 'duty_exceptions',
    where: {
      and: [
        { 'personnel.id': { equals: personnelId } },
        { status: { equals: 'approved' } },
        { startDate: { less_than_equal: date.toISOString() } },
        { endDate: { greater_than_equal: date.toISOString() } },
      ],
    },
    depth: 2,
  })

  if (exceptions.length > 0) {
    for (const ex of exceptions) {
      const exData = ex as any
      const start = new Date(exData.startDate)
      const end = new Date(exData.endDate)
      const durationDays = Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1

      let excTypeName = 'Bilinmeyen'
      const excType = exData.exceptions_type
      if (excType && typeof excType === 'object' && 'label' in excType) {
        excTypeName = excType.label || excType.type || excTypeName
      } else if (excType && typeof excType === 'object' && 'type' in excType) {
        excTypeName = excType.type
      }

      throw new Error(
        `Mazeret ihlali: ${(personnel as any).fullName}, ${formatDate(new Date(dutyDateStr))} tarihinde mazereti var ` +
          `(${formatDate(start)} - ${formatDate(end)}). Nöbet atanamaz.`,
      )
    }
  }
}
