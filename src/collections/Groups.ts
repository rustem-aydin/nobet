import type { CollectionConfig } from 'payload'
import { isAdmin } from './access'

export const Groups: CollectionConfig = {
  slug: 'groups',
  admin: {
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
