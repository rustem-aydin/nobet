// collections/DutyTypes.ts
import type { CollectionConfig } from 'payload'
import { colorPickerField } from '../custom/ColorPicker'
import { isAdmin } from './access'

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
      label: 'Nöbet Türü Adı',
    },
    {
      name: 'group',
      type: 'relationship',
      relationTo: 'groups',
      label: 'Nöbet Grubu',
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
          type: 'number',
          required: true,
          label: 'Yıl',
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
