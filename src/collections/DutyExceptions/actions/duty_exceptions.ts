'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DutyException, DutyExceptionsType, Group, Personnel } from '@/payload-types'
import { AddDutyExceptionsFormValues, ID } from 'types'
import { revalidatePath } from 'next/cache'
import { getEmail } from '@/helpers/email'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { getAuth } from '@/collections/Personnel/actions/auth'

export const getAllDutyExceptions = async (
  depth: number = 0,
  selectedDate: Date,
): Promise<DutyException[]> => {
  const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth())
  const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0, 23, 59, 59)
  const payload = await getPayload({ config })
  const auth = await getAuth()
  const exceptions = await payload.find({
    collection: 'duty_exceptions',
    depth,
    user: auth,
    limit: 10000,
    overrideAccess: false,
    where: {
      and: [
        { startDate: { less_than_equal: monthEnd } }, // Başlangıç, ay bitiminden önce
        { endDate: { greater_than_equal: monthStart } }, // Bitiş, ay başlangıcından sonra
      ],
    },
  })

  return exceptions.docs
}

export async function AddDutyExceptions(values: AddDutyExceptionsFormValues) {
  const payload = await getPayload({ config })
  const auth = await getAuth()
  try {
    const exceptions = await payload.create({
      collection: 'duty_exceptions',
      data: {
        endDate: values.endDate,
        exceptions_type: values.exceptions_type as DutyExceptionsType | number,
        reason: values.reason,
        startDate: values.startDate,
        status: 'pending',
        personnel: auth.id,
      },
      user: auth,
      overrideAccess: false,
    })
    const formatDate = (date: Date) => format(date, 'd MMMM', { locale: tr })
    // if (formatDate(new Date(values.startDate)) === formatDate(new Date(values.endDate))) {
    //   const email = await payload.sendEmail({
    //     to: 'rustema@hvkk.tsk.tr',
    //     // to: ((auth.group as Group).chief as Personnel).email,
    //     subject: 'Nöbet Mazeretleri',
    //     html: getEmail({
    //       title: `Değerli ${String(((auth?.group as Group).chief as Personnel).fullName)}`,
    //       buttonTitle: 'Mazeretleri Gör',
    //       buttonURL: `${process.env.PUBLIC_URL}`,
    //       date: `${formatDate(new Date(values.startDate))}`,
    //       datetitle: 'Mazeret Tarihi',
    //       description: `${auth.fullName} ${formatDate(new Date(values.startDate))} tarihinde <b>${(exceptions.exceptions_type as DutyExceptionsType).name}</b> sebebiyle mazaret talebinde bulunmuştur. Açıklama;</br></br>
    //     ${values.reason}
    //     `,
    //     }),
    //   })
    // } else {
    //   const email = await payload.sendEmail({
    //     to: 'rustema@hvkk.tsk.tr',
    //     // to: ((auth.group as Group).chief as Personnel).email,
    //     subject: 'Nöbet Mazeretleri',
    //     html: getEmail({
    //       title: `Değerli ${String(((auth?.group as Group).chief as Personnel).fullName)}`,
    //       buttonTitle: 'Mazeretleri Gör',
    //       buttonURL: `${process.env.PUBLIC_URL}`,
    //       date: `${formatDate(new Date(values.startDate))}-${formatDate(new Date(values.endDate))}`,
    //       datetitle: 'Başlanğıç ve Bitiş Tarihi',
    //       description: `${auth.fullName} ${formatDate(new Date(values.startDate))}-${formatDate(new Date(values.endDate))} tarihleri arasında <b>${(exceptions.exceptions_type as DutyExceptionsType).name}</b> sebebiyle mazaret talebinde bulunmuştur. Açıklama;</br></br>
    //     ${values.reason}
    //     `,
    //     }),
    //   })
    // }
    revalidatePath('/exceptions')
    return exceptions
  } catch (error) {
    throw new Error(String(error))
  }
}

export async function updateDutyException({
  id,
  values,
}: {
  id: ID
  values: Partial<AddDutyExceptionsFormValues> & { status?: string }
}) {
  const payload = await getPayload({ config })
  const auth = await getAuth()
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
    overrideAccess: false,
    data: updateData,
    user: auth,
  })
  const formatDate = (date: Date) => format(date, 'd MMMM', { locale: tr })

  // if (values.status === 'approved' || values.status === 'rejected') {
  //   if (formatDate(new Date(data.startDate)) === formatDate(new Date(data.endDate))) {
  //     const email = await payload.sendEmail({
  //       to: 'rustema@hvkk.tsk.tr',
  //       // to: ((auth.group as Group).chief as Personnel).email,
  //       subject: 'Nöbet Mazeretleri',
  //       html: getEmail({
  //         title: `Değerli ${(data?.personnel as Personnel).fullName}`,
  //         buttonTitle: 'Mazeretleri Gör',
  //         buttonURL: `${process.env.PUBLIC_URL}`,
  //         date: `${formatDate(new Date(data.startDate))}`,
  //         datetitle: 'Mazeret Tarihi',
  //         description: `${formatDate(new Date(data.startDate))} tarihinde <b>${(data.exceptions_type as DutyExceptionsType).name}</b> sebebiyle mazaret talebinde bulunmuştunuz.Mazeretiniz ${values.status === 'approved' ? '<b style="color: green">onaylanmıştır.</b>' : '<b style="color: red">reddedilmiştir.</b> Nöbet kıdemliniz ile iletişime geçiniz.'}. Açıklama;</br></br>
  //       ${values.reason}
  //       `,
  //       }),
  //     })
  //   } else {
  //     const email = await payload.sendEmail({
  //       to: 'rustema@hvkk.tsk.tr',
  //       // to: ((auth.group as Group).chief as Personnel).email,
  //       subject: 'Nöbet Mazeretleri',
  //       html: getEmail({
  //         title: `Değerli ${(data?.personnel as Personnel).fullName}`,
  //         buttonTitle: 'Mazeretleri Gör',
  //         buttonURL: `${process.env.PUBLIC_URL}`,
  //         date: `${formatDate(new Date(data.startDate))}-${formatDate(new Date(data.endDate))}`,
  //         datetitle: 'Başlangıç ve Bitiş Tarihi',
  //         description: `${formatDate(new Date(data.startDate))}-${formatDate(new Date(data.endDate))} tarihleri arasında <b>${(data.exceptions_type as DutyExceptionsType).name}</b> sebebiyle mazaret talebinde bulunmuştunuz.Mazeretiniz ${values.status === 'approved' ? '<b style="color: green">onaylanmıştır.</b>' : '<b style="color: red">reddedilmiştir.</b> Nöbet kıdemliniz ile iletişime geçiniz.'}. Açıklama;</br></br>
  //       ${values.reason}
  //       `,
  //       }),
  //     })
  //   }
  // }
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

export const getAllExp = async () => {
  const payload = await getPayload({ config })

  const exceptions = await payload.find({
    collection: 'duty_exceptions',
  })

  return exceptions.docs
}
