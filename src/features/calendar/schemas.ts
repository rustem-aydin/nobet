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
