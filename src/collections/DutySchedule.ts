import type { CollectionConfig } from 'payload'
import { canRead, isAdminOrChief } from './access'

export const DutySchedule: CollectionConfig = {
  slug: 'duty_schedule',
  admin: {
    useAsTitle: 'dutyDate',
    defaultColumns: ['personnel', 'dutyType', 'dutyDate', 'status'],
  },
  indexes: [
    { fields: ['dutyDate', 'dutyType', 'group'], unique: true },
    { fields: ['personnel', 'dutyDate'] },
    { fields: ['group', 'dutyDate'] },
  ],
  labels: { plural: 'Nöbet Şeması', singular: 'Nöbet Girdi' },
  access: {
    create: isAdminOrChief,
    update: isAdminOrChief,
    delete: isAdminOrChief,
    read: canRead,
  },
  fields: [
    {
      name: 'personnel',
      type: 'relationship',
      relationTo: 'personnel',
      required: true,
      label: 'Nöbetçi Personel',
    },
    {
      name: 'dutyType',
      type: 'relationship',
      relationTo: 'duty_types',
      required: true,
      label: 'Nöbet Türü',
    },
    {
      name: 'dutyDate',
      type: 'date',
      required: true,
      label: 'Nöbet Tarihi',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'scheduled',
      options: [
        { label: 'Planlandı', value: 'scheduled' },
        { label: 'Tamamlandı', value: 'completed' },
        { label: 'İptal Edildi', value: 'cancelled' },
        { label: 'Değiştirildi', value: 'swapped' },
        { label: 'Mazeretli', value: 'exception' },
      ],
      label: 'Durum',
    },
    {
      name: 'exceptionType',
      type: 'select',
      options: [
        { label: 'Resmi Mazeret (Gri)', value: 'official' },
        { label: 'Resmi Olmayan Mazeret (Sarı)', value: 'unofficial' },
      ],
      label: 'Mazeret Türü',
      admin: {
        condition: (data) => data.status === 'exception',
      },
    },
    {
      name: 'isPriority',
      type: 'checkbox',
      defaultValue: false,
      label: 'Öncelikli',
      admin: {
        description: 'Sarı mazeret sonrası bir sonraki ay öncelikli',
      },
    },
    {
      name: 'originalPersonnel',
      type: 'relationship',
      relationTo: 'personnel',
      label: 'Asıl Nöbetçi',
      admin: {
        description: 'Değişim varsa asıl nöbetçi',
        condition: (data) => data.status === 'swapped' || data.status === 'exception',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notlar',
    },
    {
      name: 'group',
      type: 'relationship',
      relationTo: 'groups',
      required: true,
      label: 'Nöbet Grubu',
    },
  ],
}
