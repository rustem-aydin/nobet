import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { getAuth } from '@/collections/Personnel/actions/auth'
import ScheduleProviders from '@/features/schedule/schedule-provider'
import { CommonFilterParams } from 'types'
import { getAllPersonnels } from '@/collections/Personnel/actions/getAllPersonnels'
import { getScheduleForMonth } from '@/collections/DutySchedule/actions/getScheduleForMonth'
import { getAllDutyTypes } from '@/collections/DutyTypes/actions/getAllDutyTypes'

function validateDateParam(dateStr: string | undefined): { year: number; month: number } | null {
  if (!dateStr) return null

  const match = dateStr.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/)
  if (!match) return null

  const year = parseInt(match[1], 10)
  const month = parseInt(match[2], 10) // 1-indexed
  const day = match[3] ? parseInt(match[3], 10) : 1

  if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
    return null
  }

  return { year, month }
}

function isDateAllowed(year: number, month: number): boolean {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // 1-12

  const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1

  return (
    (year === currentYear && month === currentMonth) ||
    (year === nextYear && month === nextMonth) ||
    year < currentYear ||
    (year === currentYear && month < currentMonth)
  )
}

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<CommonFilterParams>
}) {
  // searchParams'tan date'i güvenli bir şekilde al
  const params = await searchParams
  const date = params?.date

  // Date parametresi varsa validate et
  if (date) {
    const parsedDate = validateDateParam(date) // { year: 2026, month: 6 } (1-indexed)

    if (!parsedDate || !isDateAllowed(parsedDate.year, parsedDate.month)) {
      notFound()
    }
  }

  const users = await getAllPersonnels(0)
  const auth = await getAuth()
  const duty_types = await getAllDutyTypes(0)
  const duty_schedules = await getScheduleForMonth({
    date: date || undefined,
  })
  console.log(duty_types)
  return (
    <main className="flex max-h-screen flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 mt-1 data-[orientation=vertical]:h-5" />
          <span className="text-xl">Nöbet Çizelgesi</span>
        </div>
      </header>
      <div className="px-8">
        <Suspense fallback={<p>Yükleniyor</p>}>
          <ScheduleProviders
            duty_schedules={duty_schedules}
            auth={auth}
            duty_types={duty_types}
            users={users}
          />
        </Suspense>
      </div>
    </main>
  )
}
