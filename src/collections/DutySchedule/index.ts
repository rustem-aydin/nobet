import type { CollectionConfig } from 'payload'
import { canRead, GroupChief } from './access'
import {
  autoCompleteStatus,
  preventDeleteCompleted,
  validateNextMonthOnly,
  validateSingleUnofficialDuty,
} from './hooks'

export const DutySchedule: CollectionConfig = {
  slug: 'duty_schedule',
  admin: {
    useAsTitle: 'dutyDate',
    defaultColumns: ['personnel', 'dutyType', 'dutyDate', 'status'],
  },
  indexes: [
    { fields: ['dutyDate', 'dutyType', 'group', 'isOffical', 'personnel'], unique: true },
    { fields: ['personnel', 'dutyDate'] },
    { fields: ['group', 'dutyDate'] },
  ],
  labels: { plural: 'Nöbet Şeması', singular: 'Nöbet Girdi' },
  access: {
    create: GroupChief,
    update: GroupChief,
    delete: GroupChief,
    read: canRead,
  },
  hooks: {
    beforeValidate: [validateSingleUnofficialDuty],
    beforeChange: [autoCompleteStatus],
    // beforeDelete: [preventDeleteCompleted], // ← buraya ekle
  },
  fields: [
    {
      name: 'swapRequest',
      type: 'relationship',
      relationTo: 'duty_swap_requests',
      label: 'Değişim Talebi',
    },

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
      hooks: {
        beforeValidate: [validateNextMonthOnly],
      },
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
        { label: 'Taslak', value: 'draft' },
        { label: 'Planlandı', value: 'scheduled' },
        { label: 'Tamamlandı', value: 'completed' },
      ],
      label: 'Durum',
    },
    {
      name: 'isOffical',
      type: 'checkbox',
      label: 'Resmi Mazeret mi',
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
