// collections/EmailTemplates.ts
import {
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  AlignFeature,
  HeadingFeature,
  OrderedListFeature,
  UnorderedListFeature,
  EXPERIMENTAL_TableFeature,
  HorizontalRuleFeature,
  ParagraphFeature,
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

import type { CollectionConfig } from 'payload'

export const EmailTemplates: CollectionConfig = {
  slug: 'email-templates',
  labels: {
    singular: 'Email Şablonu',
    plural: 'Email Şablonları',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'subject', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      label: 'Şablon Adı',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'subject',
      label: 'Konu',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Açıklama',
      type: 'textarea',
    },
    {
      name: 'content',
      label: 'Email İçeriği',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'variables',
      label: 'Kullanılabilir Değişkenler',
      type: 'array',
      admin: {
        description: 'Şablonda kullanılabilecek değişkenler. Örn: {{personnelName}}, {{dutyDate}}',
      },
      fields: [
        {
          name: 'key',
          label: 'Değişken Adı',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Açıklama',
          type: 'text',
        },
      ],
    },
    {
      name: 'isActive',
      label: 'Aktif',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
