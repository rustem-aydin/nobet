// collections/DutyTypes.ts
import type { CollectionConfig } from 'payload'
import { colorPickerField } from './custom/ColorPicker'

export const DutyTypes: CollectionConfig = {
  slug: 'duty_types',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    plural: 'Nöbet Türleri',
    singular: 'Nöbet Türü',
  },
  access: {
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nöbet Türü Adı',
    },
    {
      name: 'yearConfigs',
      type: 'array',
      required: true,
      label: 'Yıllık Konfigürasyonlar',
      admin: {
        description: 'Her yıl için ayrı cron tanımları',
      },
      fields: [
        {
          name: 'year',
          type: 'select',
          required: true,
          label: 'Yıl',
          options: Array.from({ length: 15 }, (_, i) => {
            const year = 2026 + i
            return { label: String(year), value: String(year) }
          }),
        },
        {
          name: 'cronSchedules',
          type: 'array',
          required: true,
          label: 'Cron Schedule Tanımları',
          fields: [
            {
              name: 'cron',
              type: 'text',
              required: true,
              label: 'Cron İfadesi',
            },
            {
              name: 'description',
              type: 'text',
              required: true,
              label: 'Açıklama',
            },
          ],
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
          label: 'Aktif',
        },
      ],
    },
    {
      name: 'priority',
      type: 'number',
      required: true,
      defaultValue: 10,
      label: 'Öncelik',
      admin: {
        description: 'Çakışma durumunda düşük sayı yüksek öncelik (1 = en yüksek)',
      },
    },
    {
      name: 'columnOrder',
      type: 'number',
      required: true,
      unique: true,
      label: 'Sütun Sırası',
    },
    {
      name: 'sortOrder',
      type: 'select',
      required: true,
      defaultValue: 'normal',
      options: [
        { label: 'Kıdemliden Kıdemsize (↓)', value: 'normal' },
        { label: 'Kıdemsizden Kıdemliye (↑)', value: 'reverse' },
      ],
      label: 'Sıralama Yönü',
    },
    colorPickerField({
      name: 'color',
      label: 'Renk Seç',
      required: true,
      admin: { description: 'Bi renk seç' },
    }),
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Aktif',
    },
  ],
}
