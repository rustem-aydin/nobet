import type { CollectionConfig } from 'payload'
import { personnelBeforeChange } from './hooks/Personnel'
import { canRead, isAdmin } from './access'

export const Personnel: CollectionConfig = {
  slug: 'personnel',
  auth: {
    // Token süresi: 2 saat (7200 saniye)
    tokenExpiration: 7200,

    // Session kullanımı (default: true)
    useSessions: true,

    // Cookie ayarları
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },

    // Güvenlik
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 dakika
  },
  admin: {
    useAsTitle: 'fullName',
  },
  labels: {
    singular: 'Personel',
    plural: 'Personeller',
  },
  access: {
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    read: canRead,
  },
  hooks: { beforeChange: [personnelBeforeChange] },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Ad Soyad',
    },
    {
      name: 'rank',
      type: 'number',
      required: true,
      unique: true,
      label: 'Kıdem Sırası',

      admin: {
        readOnly: true,
        condition: (_, siblingData) => Boolean(siblingData?.id),

        description: 'Otomatik atanır, 1 = En kıdemli',
      },
    },
    {
      name: 'group',
      type: 'relationship',
      relationTo: 'groups',
      required: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.id),
      },
      label: 'Nöbet Grubu',
    },

    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'member',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.id),
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Nöbet Kıdemlisi', value: 'chief' },
        { label: 'Üye', value: 'member' },
      ],
      label: 'Rol',
    },
  ],
}
