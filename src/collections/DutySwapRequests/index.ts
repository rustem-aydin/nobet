import type { CollectionConfig } from 'payload'
import { isAdminOrChief } from './access'

export const DutySwapRequests: CollectionConfig = {
  slug: 'duty_swap_requests',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['requesterPersonnel', 'type', 'status', 'requestedAt'],
  },
  labels: {
    plural: 'Nöbet Değişim Talepleri',
    singular: 'Nöbet Değişim Talebi',
  },
  access: {
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'chief',
    update: isAdminOrChief,
    delete: isAdminOrChief,
    read: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'chief',
  },
  fields: [
    {
      name: 'requesterPersonnel',
      type: 'relationship',
      relationTo: 'personnel',
      required: true,
      label: 'Talep Eden Personel',
    },
    {
      name: 'requesterDuty',
      type: 'relationship',
      relationTo: 'duty_schedule',
      required: true,
      label: 'Talep Edenin Nöbeti',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Karşılıklı Değişim', value: 'mutual' },
        { label: 'Karşılıksız Değişim', value: 'unilateral' },
      ],
      label: 'Değişim Türü',
    },
    {
      name: 'targetPersonnel',
      type: 'relationship',
      relationTo: 'personnel',
      label: 'Karşı Taraf Personel',
      admin: {
        condition: (data) => data.type === 'mutual',
      },
    },
    {
      name: 'targetDuty',
      type: 'relationship',
      relationTo: 'duty_schedule',
      label: 'Karşı Tarafın Nöbeti',
      admin: {
        condition: (data) => data.type === 'mutual',
      },
    },

    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Beklemede', value: 'pending' },
        { label: 'Onaylandı', value: 'approved' },
        { label: 'Reddedildi', value: 'rejected' },
      ],
      label: 'Durum',
    },
    {
      name: 'approvedBy',
      type: 'relationship',
      relationTo: 'personnel',
      label: 'Onaylayan',
      admin: {
        condition: (data) => data.status === 'approved' || data.status === 'rejected',
      },
    },
    {
      name: 'approvedAt',
      type: 'date',
      label: 'Onay Tarihi',
      admin: {
        condition: (data) => data.status === 'approved' || data.status === 'rejected',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notlar',
    },
  ],
}
