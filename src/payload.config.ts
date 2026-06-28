import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { tr } from '@payloadcms/translations/languages/tr'
import { Personnel } from './collections/Personnel'
import { Groups } from './collections/Group'
import { DutySchedule } from './collections/DutySchedule'
import { DutyExceptions } from './collections/DutyExceptions'
import { PersonnelDutyCounts } from './collections/PersonnelDutyCounts'
import { DutyExceptionsTypes } from './collections/DutyExceptionsTypes'
import { DutyTypes } from './collections/DutyTypes'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { DutySwapRequests } from './collections/DutySwapRequests'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { Group } from './payload-types'
import { revalidatePath } from 'next/cache'
import { migrations } from './migrations'
import { seedData } from '@/seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    timezones: {
      defaultTimezone: 'Europe/Istanbul',
    },
    user: Personnel.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },

    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'rustema@hvkk.tsk.tr',
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
    Groups,
    DutyTypes,
    DutySchedule,
    DutyExceptions,
    DutyExceptionsTypes,
    DutySwapRequests,
    PersonnelDutyCounts,
    // EmailTemplates,
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
    prodMigrations: migrations,
  }),
  email: nodemailerAdapter({
    defaultFromAddress: 'rustema@hvkk.tsk.tr',
    defaultFromName: 'Rüstem',
    skipVerify: true,

    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 25,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  sharp,
  jobs: {
    tasks: [
      {
        slug: 'completeDailyDuties',
        schedule: [
          {
            cron: '0 2 * * *', // Her dakika kuyruğa ekle
            queue: 'default',
          },
        ],
        handler: async ({ req }) => {
          const now = new Date()

          // Cron gece 00:00'da çalıştığı için bir önceki günü (dünü) baz alıyoruz.
          // Eğer işin "bugün" başlayanları kapatmasını istiyorsanız `now.getDate() - 1` kısmını `now.getDate()` yapın.
          const startOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 1,
            0,
            0,
            0,
            0,
          )
          const endOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 1,
            23,
            59,
            59,
            999,
          )
          const auth = await getAuth()
          const group = auth.group as Group
          const groupId = group.id

          try {
            // 1. Personeli güncelle
            const result = await req.payload.update({
              collection: 'duty_schedule',
              where: {
                and: [
                  { dutyDate: { greater_than_equal: startOfDay.toISOString() } },
                  { dutyDate: { less_than_equal: endOfDay.toISOString() } },
                ],
              },
              data: {
                status: 'completed',
              },
              overrideAccess: true, // Arka planda çalıştığı için yetki kontrolünü geçiyoruz
            })

            req.payload.logger.info(
              `[Cron Job] ${result.docs.length} adet nöbet 'completed' olarak güncellendi.`,
            )
            revalidatePath('/schedule')

            return {
              output: {
                updatedCount: result.docs.length,
              },
            }
          } catch (error: any) {
            req.payload.logger.error('[Cron Job] Günlük nöbet tamamlama hatası:', error.message)
            throw error
          }
        },
      },
    ],
    // 2. Otomatik Çalıştırma Ayarı (Cron)
    autoRun: [
      {
        cron: '* * * * *', // Her gün gece 00:00'da çalışır
        queue: 'default',
      },
    ],
  },
  plugins: [],
})
