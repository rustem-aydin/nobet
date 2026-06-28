import type { Payload } from 'payload'

export async function seedData(payload: Payload) {
  const data = await payload.create({
    collection: 'groups',
    draft: false,
    data: {
      cooldownDays: 2,
      name: 'som',
    },
  })
  await payload.create({
    collection: 'personnel',
    draft: false,
    data: {
      group: data?.id,
      email: 'rustema@hvkk.tsk.tr',
      password: 'admin',
      role: 'admin',
      fullName: 'Rüstem AYDIN',
    },
  })
}
