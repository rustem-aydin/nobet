'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { Group, Personnel } from '@/payload-types'
import { revalidatePath } from 'next/cache'

const payload = await getPayload({ config })

export const updateGroup = async (personnel: Personnel): Promise<Group> => {
  const auth = await getAuth()
  const groupId = (auth.group as Group).id

  const personel = await payload.update({
    collection: 'groups',
    id: groupId,
    user: auth,
    overrideAccess: false,
    data: {
      chief: personnel,
    },
  })

  revalidatePath('/schedule')
  return personel
}
