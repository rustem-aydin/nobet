import { DutyException } from '@/payload-types'

export type AddDutyExceptionsFormValues = Pick<
  DutyException,
  'reason' | 'endDate' | 'exceptions_type' | 'startDate' | 'status'
>

export type ID = number

export interface SlugProps {
  params: Promise<{ group: string }>
  children?: React.ReactNode
}
