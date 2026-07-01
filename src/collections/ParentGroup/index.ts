// collections/Groups.ts
import type { CollectionConfig } from 'payload'
import { isAdmin } from './access'

export const ParentGroup: CollectionConfig = {
  slug: 'parent_group',
  admin: {
    useAsTitle: 'name',
    hidden: true, // ← Admin panelinden bu collection'u gizler
  },
  labels: {
    plural: 'Üst Gruplar',
    singular: 'Üst Grup',
  },
  access: {
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    read: () => true,
    admin: () => false,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Grup Adı',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama',
    },
  ],
}
