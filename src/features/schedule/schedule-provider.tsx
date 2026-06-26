'use client'
import { DutySchedule, DutyType, Personnel } from '@/payload-types'
import { ScheduleCalendarContent } from './components/schedule-calendar'
import { ScheduleProvider } from './contexts/schedule-context'

interface Props {
  duty_types: DutyType[]
  auth: Personnel
  users: Personnel[]
  duty_schedules: DutySchedule[]
}
const ScheduleProviders = ({ auth, duty_types, duty_schedules, users }: Props) => {
  return (
    <ScheduleProvider
      duty_schedules={duty_schedules}
      duty_types={duty_types}
      auth={auth}
      personnels={users}
    >
      <ScheduleCalendarContent />
    </ScheduleProvider>
  )
}

export default ScheduleProviders
