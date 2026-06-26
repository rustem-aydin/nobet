import type { CollectionConfig } from 'payload'
import { canRead, GroupChief } from './access'

export const PersonnelDutyCounts: CollectionConfig = {
  slug: 'personnel_duty_counts',
  admin: {
    group: 'Personeller',

    useAsTitle: 'personnel',
    hidden: false, // Admin panelinde görünsün
  },
  labels: {
    singular: 'Personel Nöbet Sayacı',
    plural: 'Personel Nöbet Sayaçları',
  },
  access: {
    create: GroupChief,
    read: canRead,
    update: GroupChief,
    delete: GroupChief,
  },
  fields: [
    {
      name: 'personnel',
      type: 'relationship',
      relationTo: 'personnel',
      required: true,
      label: 'Personel',
    },
    {
      name: 'dutyType',
      type: 'relationship',
      relationTo: 'duty_types',
      required: true,
      label: 'Nöbet Türü',
    },
    {
      name: 'count',
      type: 'number',
      defaultValue: 0,
      label: 'Nöbet Sayısı',
    },
  ],
  // Aynı personel ve dutyType için sadece 1 belge olmasını sağla
  indexes: [
    {
      fields: ['personnel', 'dutyType'],
      unique: true,
    },
  ],
}
