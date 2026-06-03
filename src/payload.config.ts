import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { tr } from '@payloadcms/translations/languages/tr'

import { Personnel } from './collections/Personnel'
import { Media } from './collections/Media'
import { Groups } from './collections/Groups'
import { DutyTypes } from './collections/DutyTypes'
import { seedData } from 'actions/seed'
import { DutySchedule } from './collections/DutySchedule'
import { DutyExceptions } from './collections/DutyExceptions'
import { DutyExceptionsTypes } from './collections/DutyExceptionsTypes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Personnel.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'admin@admin.com',
            password: 'admin',
            prefillOnly: true,
          }
        : false,
  },
  onInit: async (payload) => {
    const users = await payload.find({
      collection: 'personnel',
      limit: 1,
    })

    if (users.docs.length === 0) {
      console.log('🌱 Seeding initial data...')
      await seedData(payload)
    }
  },

  collections: [
    Personnel,
    Media,
    Groups,
    DutyTypes,
    DutySchedule,
    DutyExceptions,
    DutyExceptionsTypes,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  i18n: {
    supportedLanguages: {
      tr,
    },
    fallbackLanguage: 'tr',
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
