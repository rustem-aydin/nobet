'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function decrementDutyCount(personnelId: number, dutyTypeId: number) {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'personnel_duty_counts',
    where: {
      and: [{ personnel: { equals: personnelId } }, { dutyType: { equals: dutyTypeId } }],
    },
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'personnel_duty_counts',
      id: existing.docs[0].id,
      data: {
        count: (existing.docs[0] as any).count - 1,
      },
    })
  } else {
    await payload.create({
      collection: 'personnel_duty_counts',
      data: {
        personnel: personnelId,
        dutyType: dutyTypeId,
        count: 1,
      },
    })
  }
}
