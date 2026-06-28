'use client'

import { createContext, useContext, useState, useEffect, useTransition, ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { parseISO, isValid, startOfMonth } from 'date-fns'
import { DutySchedule, DutyType, Personnel } from '@/payload-types'
import { toast } from 'sonner'
import { DutySwapsFormValues } from 'types'
import { deleteDutySchedule } from '@/collections/DutySchedule/actions/deleteDutySchedule'
import { setDutySchedule } from '@/collections/DutySchedule/actions/setDutySchedule'
import { addDutySwapRequest } from '@/collections/DutySwapRequests/actions/addDutySwapRequest'
import { generate } from '@/collections/DutySchedule/actions/generate'
import { deleteMonthlyDutySchedule } from '@/collections/DutySchedule/actions/deleteMonthlyDutySchedule'
import { approvedDuty } from '@/collections/DutySchedule/actions/approvedSchedule'
import { Log } from '@/components/interactiveLogsTable'

interface ScheduleContextType {
  duty_types: DutyType[]
  year: any
  month: any
  logs: Log[]
  auth: Personnel
  personnels: Personnel[]
  selectedDate: Date
  selectedDutyType: DutyType | null
  schedules: DutySchedule[]
  generating: boolean
  handleLoading: boolean
  saving: boolean
  selectedPersonnel: Personnel | null
  setSelectedPersonnel: (p: Personnel | null) => void
  setSelectedDate: (date: Date) => void
  setSelectedDutyType: (dt: DutyType | null) => void
  handleGenerate: () => void
  handleDelete: () => void
  handleApproved: () => void
  handleSwap: (props: DutySwapsFormValues) => Promise<void>
  handleDeleteDuty: ({ date, user }: { date: Date; user: Personnel }) => Promise<void>
  handleSetDuty: ({
    date,
    user,
    dutyTypeId,
  }: {
    date: Date
    user: Personnel
    dutyTypeId: number | string
  }) => Promise<void>
}

const ScheduleContext = createContext<ScheduleContextType | null>(null)

export function ScheduleProvider({
  children,
  duty_types,
  auth,
  personnels,
  duty_schedules,
}: {
  children: ReactNode
  duty_types: DutyType[]
  auth: Personnel
  duty_schedules: DutySchedule[]
  personnels: Personnel[]
}) {
  const searchParams = useSearchParams()
  const [logs, setLogs] = useState<Log[]>([])
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const dateParam = searchParams.get('date')
    if (dateParam) {
      const parsed = parseISO(dateParam)
      if (isValid(parsed)) return startOfMonth(parsed)
    }
    return new Date()
  })

  useEffect(() => {
    const dateParam = searchParams.get('date')
    if (dateParam) {
      const parsed = parseISO(dateParam)
      if (isValid(parsed)) {
        setSelectedDate(startOfMonth(parsed))
      }
    }
  }, [searchParams])

  const [selectedDutyType, setSelectedDutyType] = useState<DutyType | null>(null)
  const [handleLoading] = useState<boolean>(false)
  const [saving] = useState<boolean>(false) // mevcut durumda kullanılmıyor, korundu

  const [isPending, startTransition] = useTransition() // generating yerine

  const year = selectedDate.getFullYear()
  const month = selectedDate.getMonth()

  const handleGenerate = () => {
    startTransition(async () => {
      const operation = generate(year, month)

      toast.promise(operation, {
        loading: `${month} ${year} için nöbet listesi oluşturuluyor`,
        success: (result) => {
          if (result.logs) {
            setLogs(result?.logs)
          }
          return 'Nöbet Çizelgesi Başarıyla Oluşturuldu'
        },
        error: (err: any) => String(err),
      })

      try {
        await operation
      } catch {
        // hata toast ile gösteriliyor
      }
    })
  }

  const handleDeleteDuty = async ({ date, user }: { date: Date; user: Personnel }) => {
    try {
      toast.promise(deleteDutySchedule({ date, personnel: user }), {
        loading: 'Nöbet siliniyor',
        success: (data: any) => {
          return (
            String(((data?.duty as DutySchedule).personnel as Personnel).fullName) +
            ` Nöbet Silindi`
          )
        },
        error: (err) => String(err),
      })
    } catch (error) {
      toast.error(String(error))
    }
  }

  const handleSwap = async (props: DutySwapsFormValues) => {
    await addDutySwapRequest(props)
  }
  const handleSetDuty = async ({
    date,
    user,
    dutyTypeId,
  }: {
    date: Date
    user: Personnel
    dutyTypeId: string | number
  }) => {
    try {
      toast.promise(
        setDutySchedule({ date: date, personnel: user, dutyTypeId: Number(dutyTypeId) }),
        {
          loading: 'Nöbet Oluşturuluyor',
          success: (data: any) => {
            return (
              String(((data?.duty as DutySchedule).personnel as Personnel).fullName) +
              ` Nöbet Atandı`
            )
          },

          error: (err) => String(err),
        },
      )
    } catch (error) {
    } finally {
    }
  }

  const handleDelete = () => {
    startTransition(async () => {
      const operation = deleteMonthlyDutySchedule(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
      )

      toast.promise(operation, {
        loading: 'Aylık Nöbet Takvimi Siliniyor',
        success: 'Silme Başarılı',
        error: (err) => String(err),
      })

      try {
        await operation
      } catch {
        // hata toast ile gösteriliyor
      }
    })
  }

  const handleApproved = () => {
    startTransition(async () => {
      const operation = approvedDuty(selectedDate.getFullYear(), selectedDate.getMonth())

      toast.promise(operation, {
        loading: 'Nöbet Çizelgesi Onaylanıyor',
        success: 'Onaylama Başarılı',
        error: (err) => String(err),
      })

      try {
        await operation
      } catch {
        // hata toast ile gösteriliyor
      }
    })
  }
  const value: ScheduleContextType = {
    duty_types,
    handleDelete,
    selectedPersonnel,
    setSelectedPersonnel,
    logs,
    handleApproved,
    handleSwap,
    auth,
    handleSetDuty,
    handleDeleteDuty,
    year,
    month,
    personnels,
    handleLoading,
    selectedDate,
    selectedDutyType,
    schedules: duty_schedules,
    generating: isPending, // useTransition'dan gelen pending
    saving,
    setSelectedDate,
    setSelectedDutyType,
    handleGenerate,
  }

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>
}

export function useSchedule(): ScheduleContextType {
  const ctx = useContext(ScheduleContext)
  if (!ctx) throw new Error('useSchedule must be used within ScheduleProvider')
  return ctx
}
