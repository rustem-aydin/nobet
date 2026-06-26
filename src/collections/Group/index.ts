// collections/Groups.ts
import type { CollectionConfig } from 'payload'
import { isAdmin } from './access'
import { createDefaultDutyTypes } from './hooks'

export const Groups: CollectionConfig = {
  slug: 'groups',
  admin: {
    group: 'Personeller',
    useAsTitle: 'name',
  },
  labels: {
    plural: 'Gruplar',
    singular: 'Grup',
  },
  access: {
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    read: () => true,
  },
  hooks: {
    afterChange: [createDefaultDutyTypes],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Grup Adı',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama',
    },
    {
      name: 'chief',
      type: 'relationship',
      relationTo: 'personnel',
      label: 'Nöbet Kıdemlisi',
      admin: {
        description: 'Bu grubun nöbet kıdemlisi (sadece admin atayabilir)',
      },
    },
    {
      name: 'cooldownDays',
      type: 'number',
      required: true,
      defaultValue: 1,
      min: 0,
      label: 'İzinli Gün Sayısı',
      admin: {
        description: 'Nöbet sonrası izinli gün sayısı (grup bazlı)',
      },
    },
  ],
}
