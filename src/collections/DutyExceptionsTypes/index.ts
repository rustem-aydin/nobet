import type { CollectionConfig } from 'payload'
import { colorPickerField } from '../custom/ColorPicker'
import { isAdmin } from './access'

export const DutyExceptionsTypes: CollectionConfig = {
  slug: 'duty_exceptions_types',
  admin: {
    useAsTitle: 'name',
    group: 'Nöbet Mazeretleri',
  },
  labels: {
    plural: 'Nöbet Mazeret Türleri',
    singular: 'Nöbet Mazeret Türü',
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
      label: 'Mazeret Adı',
    },

    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Resmi Mazeret (Gri)', value: 'official' },
        { label: 'Resmi Olmayan Mazeret (Sarı)', value: 'unofficial' },
      ],
      label: 'Mazeret Türü',
    },
    colorPickerField({
      name: 'color',
      label: 'Renk Seç',
      required: true,
      admin: {
        description: 'Bi renk seç',
      },
    }),
  ],
}
