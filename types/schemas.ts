import { DutyType } from '@/payload-types'
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

// Şema oluşturucu fonksiyon
// types/schemas.ts
export function createPersonnelSchema(dutyTypes: { id: number | string }[]) {
  const dutyTypeFields = dutyTypes.reduce(
    (acc, dt) => {
      // ❌ .default() KALDIR
      acc[`dutyType_${dt.id}`] = z.number().min(0).max(100)
      return acc
    },
    {} as Record<string, z.ZodNumber>,
  )

  return z.object({
    email: z.string().email(),
    fullName: z.string().min(1),
    password: z.string().min(6),
    ...dutyTypeFields,
  })
}

// types/schemas.ts

export const updatePersonnelSchema = z
  .object({
    email: z.string().email('Geçerli bir e-posta adresi girin'),
    fullName: z.string().min(1, 'Tam isim zorunludur'),
    // password: ya boş string, ya undefined, ya da en az 6 karakter
    password: z.string().min(6, 'Şifre en az 6 karakter olmalı').optional().or(z.literal('')),
    confirmPassword: z
      .string()
      .min(6, 'Şifre onayı en az 6 karakter olmalı')
      .optional()
      .or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    // Eğer password doldurulmuşsa (boş değil ve undefined değil)
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
  })

export type UpdatePersonnelFormValues = z.infer<typeof updatePersonnelSchema>

export const loginSchema = z.object({
  email: z.string().min(1, 'E-posta zorunlu').email('Lütfen e-postanıızı giriniz.'),
  password: z.string().min(1, 'Parola Zorunludur').min(4, 'En az karakter 6 karakter girmelisin'),
})

export type LoginFormData = z.infer<typeof loginSchema>
