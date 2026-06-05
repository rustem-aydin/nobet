'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DutyException, DutyExceptionsType, Group } from '@/payload-types'
import { headers } from 'next/headers'
import { AddDutyExceptionsFormValues, ID } from 'types'
import { revalidatePath } from 'next/cache'
import { getAuth } from './auth'

export const getAllDutyExceptions = async (depth: number = 0): Promise<DutyException[]> => {
  const payload = await getPayload({ config })
  const auth = await getAuth()
  const exceptions = await payload.find({
    collection: 'duty_exceptions',
    depth,
    where: {
      'personnel.group.id': { equals: (auth!.group as Group)!.id },
    },
  })
  return exceptions.docs
}

export async function AddDutyExceptions(values: AddDutyExceptionsFormValues) {
  const payload = await getPayload({ config })
  const user = await payload.auth({ headers: await headers() })

  if (!user?.user?.id) {
    throw new Error('Yetkilendirme hatası: Kullanıcı bulunamadı')
  }

  const exceptions = await payload.create({
    collection: 'duty_exceptions',
    data: {
      endDate: values.endDate,
      exceptions_type: values.exceptions_type as DutyExceptionsType | number,
      reason: values.reason,
      startDate: values.startDate,
      status: 'pending',
      personnel: user.user.id,
    },
  })

  revalidatePath('/exceptions')
  return exceptions
}

// YENİ: Update action
// actions/duty_exceptions.ts
export async function updateDutyException({
  id,
  values,
}: {
  id: ID
  values: Partial<AddDutyExceptionsFormValues> & { status?: string }
}) {
  const payload = await getPayload({ config })

  const updateData: any = {}

  if (values.endDate !== undefined) updateData.endDate = values.endDate
  if (values.exceptions_type !== undefined) updateData.exceptions_type = values.exceptions_type
  if (values.reason !== undefined) updateData.reason = values.reason
  if (values.startDate !== undefined) updateData.startDate = values.startDate
  // ← STATUS EKLENMEMİŞ!
  if (values.status !== undefined) updateData.status = values.status // ← BUNU EKLE

  const data = await payload.update({
    collection: 'duty_exceptions',
    id,
    data: updateData,
  })

  revalidatePath('/exceptions')
  return data
}

export async function removeDutyException({ id }: { id: ID }) {
  const payload = await getPayload({ config })
  const data = await payload.delete({
    collection: 'duty_exceptions',
    id,
  })
  revalidatePath('/exceptions')
  return data
}
