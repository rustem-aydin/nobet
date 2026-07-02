'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { UpdatePersonnelFormValues } from 'types/schemas'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { Group, Personnel } from '@/payload-types'
import { revalidatePath } from 'next/cache'

const payload = await getPayload({ config })

export const updatePersonnel = async (
  values: UpdatePersonnelFormValues,
  id: number,
  shouldBeChief?: boolean, // undefined = değişiklik yok, true/false = uygula
): Promise<Personnel> => {
  const auth = await getAuth()
  const groupId = (auth.group as Group).id

  const personnel = await payload.update({
    collection: 'personnel',
    id,
    user: auth,
    overrideAccess: false,
    data: {
      group: groupId,
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    },
  })

  // Sadece kıdemli checkbox'ı gerçekten değiştiyse grubu güncelle
  if (shouldBeChief !== undefined) {
    await payload.update({
      collection: 'groups',
      id: groupId,
      user: auth,
      overrideAccess: false,
      data: {
        chief: shouldBeChief ? id : null,
      },
    })
  }

  revalidatePath('/schedule')
  return personnel
}
