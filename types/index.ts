import { DutyException, DutySwapRequest } from '@/payload-types'

export type AddDutyExceptionsFormValues = Pick<
  DutyException,
  'reason' | 'endDate' | 'exceptions_type' | 'startDate' | 'status'
>
export type DutySwapsFormValues = Pick<
  DutySwapRequest,
  'requesterPersonnel' | 'requesterDuty' | 'type' | 'targetDuty' | 'targetPersonnel' | 'status'
>
export type ID = number

export interface SlugProps {
  params: Promise<{ group: string }>
  children?: React.ReactNode
}

export interface DutyDay {
  date: Date
  dutyTypeId: number
  priority: number
  sortOrder: string
  cooldownDays: number
}

// types/filters.ts
export interface CommonFilterParams {
  date?: string
}

export interface DatesFilterParams {
  year?: number
}
