'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PersonnelFormValues } from 'types/schemas'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { Group, Personnel } from '@/payload-types'
import { revalidatePath } from 'next/cache'

const payload = await getPayload({ config })

export const addPersonnel = async (values: PersonnelFormValues): Promise<Personnel> => {
  const auth = await getAuth()

  const personnel = await payload.create({
    collection: 'personnel',
    user: auth,
    overrideAccess: false,
    data: {
      group: (auth.group as Group).id,
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    },
  })

  const dutyEntries = Object.entries(values).filter(([key]) => key.startsWith('dutyType_'))

  for (const [key, count] of dutyEntries) {
    const dutyTypeId = Number(key.replace('dutyType_', ''))

    await payload.create({
      collection: 'personnel_duty_counts',
      user: auth,
      overrideAccess: false,
      data: {
        personnel: personnel.id,
        dutyType: dutyTypeId,
        count: Number(count),
      },
    })
  }
  revalidatePath('/schedule')
  return personnel
}
