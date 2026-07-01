import { checkEmailUnique } from '@/collections/Personnel/actions/checkEmailUnique'
import { z } from 'zod/v4'

export const eventSchema = z.object({
  reason: z.string().min(1, 'Description is required'),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
  exceptions_type: z.number().min(1, 'Description is required'),
})

export type TEventFormData = z.infer<typeof eventSchema>

// Dinamik dutyType alanları için yardımcı tip
type DutyTypeFields = {
  [K in `dutyType_${number}`]: number
}

// Temel personel form tipi
type BasePersonnelFormValues = {
  email: string
  fullName: string
  password: string
}

// Birleştirilmiş tip
export type PersonnelFormValues = BasePersonnelFormValues & DutyTypeFields

export function createPersonnelSchema(dutyTypes: { id: number | string }[]) {
  const dutyTypeFields = dutyTypes.reduce(
    (acc, dt) => {
      acc[`dutyType_${dt.id}`] = z.number().min(0).max(100)
      return acc
    },
    {} as Record<string, z.ZodNumber>,
  )

  return z
    .object({
      email: z.string().email('Geçerli bir e-posta adresi girin'),
      fullName: z.string().min(1, 'Tam isim zorunludur'),
      password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
      ...dutyTypeFields,
    })
    .superRefine(async (data, ctx) => {
      // E‑posta benzersizlik kontrolü
      if (data.email) {
        const isUnique = await checkEmailUnique(data.email)
        if (!isUnique) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Bu e-posta adresi başka bir personel tarafından kullanılıyor',
            path: ['email'],
          })
        }
      }
    })
}

// types/schemas.ts (ya da mevcut dosyan)

export type CheckEmailUnique = (email: string) => Promise<boolean>

export const updatePersonnelSchema = (currentId: string, checkEmailUnique: CheckEmailUnique) =>
  z
    .object({
      email: z.string().email('Geçerli bir e-posta adresi girin'),
      fullName: z.string().min(1, 'Tam isim zorunludur'),
      password: z.string().min(6, 'Şifre en az 6 karakter olmalı').optional().or(z.literal('')),
      confirmPassword: z
        .string()
        .min(6, 'Şifre onayı en az 6 karakter olmalı')
        .optional()
        .or(z.literal('')),
    })
    .superRefine(async (data, ctx) => {
      // şifre kontrolleri...
      if (data.password && data.password.length > 0) {
        if (!data.confirmPassword || data.confirmPassword.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Şifre onayı zorunludur',
            path: ['confirmPassword'],
          })
        } else if (data.password !== data.confirmPassword) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Şifreler eşleşmiyor',
            path: ['confirmPassword'],
          })
        }
      }

      // e‑posta benzersizlik kontrolü (asenkron)
    })

export type UpdatePersonnelFormValues = z.infer<ReturnType<typeof updatePersonnelSchema>>

export const loginSchema = z.object({
  email: z.string().min(1, 'E-posta zorunlu').email('Lütfen e-postanıızı giriniz.'),
  password: z.string().min(1, 'Parola Zorunludur').min(4, 'En az karakter 6 karakter girmelisin'),
})

export type LoginFormData = z.infer<typeof loginSchema>

// types/schemas.ts
import { CronExpressionParser } from 'cron-parser'

const CRON_REGEX =
  /^(\*|([0-5]?\d)|(\*\/\d+)|(\d+-\d+)) (\*|(1?\d|2[0-3])|(\*\/\d+)|(\d+-\d+)) (\*|([1-9]|[12]\d|3[01])|(\*\/\d+)|(\d+-\d+)) (\*|([1-9]|1[0-2])|(\*\/\d+)|(\d+-\d+)) (\*|[0-6]|(\*\/\d+)|(\d+-\d+))$/

export const datesSchema = z.object({
  description: z.string().min(1, 'Açıklama zorunludur'),
  date: z
    .string()
    .min(1, 'Zamanlama seçmelisiniz')
    .refine(
      (val) => {
        // ISO tarih
        const isValidDate = !isNaN(Date.parse(val))
        if (isValidDate && val.includes('T')) return true

        // Cron kontrolü
        if (!CRON_REGEX.test(val)) return false
        try {
          CronExpressionParser.parse(val)
          return true
        } catch {
          return false
        }
      },
      { message: 'Geçerli bir tarih veya cron ifadesi girin' },
    ),
})

export type TDatesFormData = z.infer<typeof datesSchema>
