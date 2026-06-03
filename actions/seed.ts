import type { Payload } from 'payload'

export async function seedData(payload: Payload) {
  await payload.create({
    collection: 'personnel',
    data: {
      email: 'admin@admin.com',
      password: 'admin',
      role: 'admin',
      fullName: 'Rüstem AYDIN',
    },
  })
}
