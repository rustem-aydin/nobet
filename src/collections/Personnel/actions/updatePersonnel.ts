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
): Promise<Personnel> => {
  const auth = await getAuth()

  // 1. Personel oluştur
  const personnel = await payload.update({
    collection: 'personnel',
    id,
    user: auth,
    overrideAccess: false,
    data: {
      group: (auth.group as Group).id,
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    },
  })

  revalidatePath('/schedule')
  return personnel
}
