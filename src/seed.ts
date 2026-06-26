import type { Payload } from 'payload'

export async function seedData(payload: Payload) {
  await payload.create({
    collection: 'personnel',
    draft: false,
    data: {
      email: 'rustema@hvkk.tsk.tr',
      password: 'admin',
      role: 'admin',
      fullName: 'Rüstem AYDIN',
    },
  })
}
