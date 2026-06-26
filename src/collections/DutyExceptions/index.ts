import type { CollectionConfig } from 'payload'
import {
  canCreate,
  canDelete,
  canRead,
  canUpdate,
  statusCreateAccess,
  statusReadAccess,
  statusUpdateAccess,
} from './access'

export const DutyExceptions: CollectionConfig = {
  slug: 'duty_exceptions',
  admin: {
    useAsTitle: 'startDate',
    group: 'Nöbet Mazeretleri',
    defaultColumns: ['personnel', 'exceptions_type', 'startDate', 'endDate', 'type', 'status'],
  },
  labels: { plural: 'Nöbet Mazeretleri', singular: 'Nöbet Mazereti' },
  access: {
    read: canRead,
    create: canCreate,
    update: canUpdate,
    delete: canDelete,
  },
  indexes: [{ fields: ['personnel', 'startDate'] }],
  fields: [
    {
      name: 'personnel',
      type: 'relationship',
      relationTo: 'personnel',
      required: true,
      maxDepth: 3,
      label: 'Personel',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Başlangıç Tarihi',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      label: 'Bitiş Tarihi',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'reason',
      type: 'textarea',
      required: true,
      label: 'Mazeret Sebebi',
    },
    {
      name: 'exceptions_type',
      type: 'relationship',
      maxDepth: 3,
      relationTo: 'duty_exceptions_types',
      required: true,
      label: 'Nöbet Mazeret Tipi',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Onaylandı', value: 'approved' },
        { label: 'Beklemede', value: 'pending' },
        { label: 'Reddedildi', value: 'rejected' },
      ],
      label: 'Durum',
      access: {
        create: statusCreateAccess,
        read: statusReadAccess,
        update: statusUpdateAccess,
      },
    },
  ],
}
