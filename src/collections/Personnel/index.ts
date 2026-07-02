import type { CollectionConfig } from 'payload'
import { beforeDelete, personnelBeforeChange } from './hooks'
import { canRead, GroupChief } from './access'

export const Personnel: CollectionConfig = {
  slug: 'personnel',
  auth: {
    maxLoginAttempts: 100,
  },
  admin: {
    group: 'Personeller',

    useAsTitle: 'fullName',
    defaultColumns: ['id', 'fullName', 'rank', 'lastDutyDate', 'dutyCounts'],
  },
  labels: {
    singular: 'Personel',
    plural: 'Personeller',
  },
  access: {
    admin: ({ req: { user } }: any) => user?.is_admin === true,

    create: GroupChief,
    update: GroupChief,
    delete: GroupChief,
    read: canRead,
  },
  hooks: { beforeChange: [personnelBeforeChange], beforeDelete: [beforeDelete] },
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
      maxDepth: 2,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.id), // ← sadece düzenleme ekranında göster
      },
      label: 'Nöbet Grubu',
    },
    {
      name: 'aktif',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.id),
      },
      label: 'Aktif Personel mi?',
    },
    {
      name: 'counts',
      label: 'Personel Nöbet Türü Sayısı',
      maxDepth: 1,
      admin: {
        description: 'Bu personeli nöbet saysıları.',
      },
      type: 'join',
      collection: 'personnel_duty_counts',
      on: 'personnel',
    },
    {
      name: 'exceptions',
      label: 'Personel Mazeretleri',
      maxDepth: 2,
      admin: {
        description: 'Bu personeli ait mazeretler.',
      },
      type: 'join',
      collection: 'duty_exceptions',
      on: 'personnel',
    },
    {
      name: 'schedule',
      label: 'Personel Nöbet Çizelgesi',
      maxDepth: 2,
      admin: {
        description: 'Bu personeli nöbet saysıları.',
      },
      defaultLimit: 10000,

      type: 'join',
      collection: 'duty_schedule',
      on: 'personnel',
    },
    {
      name: 'is_admin',
      type: 'checkbox',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.id),
      },
      label: 'Admin Mi',
    },
  ],
}
