import type { CollectionConfig } from 'payload'
import { canRead, canCreate, canUpdate, canDelete, isAdminOrChiefField } from './access'

export const DutyExceptions: CollectionConfig = {
  slug: 'duty_exceptions',
  admin: {
    useAsTitle: 'startDate',
    group: 'Nöbet Mazeretleri',
    defaultColumns: ['personnel', 'dutyType', 'startDate', 'endDate', 'type', 'status'],
  },
  labels: { plural: 'Nöbet Mazeretleri', singular: 'Nöbet Mazereti' },
  access: {
    create: canCreate,
    read: canRead,
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
      label: 'Personel',
      defaultValue: ({ user }) => user?.id,
      // Field-level access: FieldAccess tipi kullan
      access: {
        update: isAdminOrChiefField,
      },
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
      // Field-level access: FieldAccess tipi kullan
      access: {
        create: isAdminOrChiefField,
        update: isAdminOrChiefField,
      },
    },
  ],
}
