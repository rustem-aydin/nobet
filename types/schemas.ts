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

export const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Geçersiz e-posta adresi' })
    .min(1, { message: 'Eposta alan boş geçilemez' }),
  password: z.string().min(1, { message: 'Password alan boş geçilemez' }),
})
export type LoginFormValues = z.infer<typeof formSchema>
