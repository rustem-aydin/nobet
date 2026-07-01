'use client'

import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '@/features/calendar/hooks'
import type { TCalendarView } from '@/features/calendar/types'
import { DutyException, DutyExceptionsType, DutyType, Group, Personnel } from '@/payload-types'

import { AddDutyExceptionsFormValues } from 'types'
import { toast } from 'sonner'
import {
  AddDutyExceptions,
  getAllDutyExceptions,
  removeDutyException,
  updateDutyException,
} from '@/collections/DutyExceptions/actions/duty_exceptions'

interface ICalendarContext {
  selectedDate: Date
  exceptions_types: DutyExceptionsType[]
  view: TCalendarView
  duty_types: DutyType[]
  setView: (view: TCalendarView) => void
  agendaModeGroupBy: 'date' | 'color'
  setAgendaModeGroupBy: (groupBy: 'date' | 'color') => void
  use24HourFormat: boolean
  toggleTimeFormat: () => void
  startOfDayHour: number
  setStartOfDayHour: (newVal: number) => void
  setSelectedDate: (date: Date | undefined) => void
  selectedUserId: Personnel['id'] | 'all'
  setSelectedUserId: (userId: Personnel['id'] | 'all') => void
  badgeVariant: 'dot' | 'colored'
  setBadgeVariant: (variant: 'dot' | 'colored') => void
  selectedTypes: DutyExceptionsType['id'][]
  filterEventsBySelectedTypes: (typeId: DutyExceptionsType['id']) => void
  filterEventsBySelectedUser: (userId: Personnel['id'] | 'all') => void
  users: Personnel[]
  auth: Personnel
  events: DutyException[]
  addEvent: (event: AddDutyExceptionsFormValues) => Promise<DutyException>
  updateEvent: (id: number, values: Partial<AddDutyExceptionsFormValues>) => Promise<DutyException>
  removeEvent: (eventId: number) => Promise<void>
  clearFilter: () => void
}

interface CalendarSettings {
  badgeVariant: 'dot' | 'colored'
  view: TCalendarView
  use24HourFormat: boolean
  startOfDayHour: number
  agendaModeGroupBy: 'date' | 'color'
}

export const MIN_SCROLL_HOUR = 0
export const MAX_SCROLL_HOUR = 16

const DEFAULT_SETTINGS: CalendarSettings = {
  badgeVariant: 'colored',
  view: 'day',
  use24HourFormat: true,
  startOfDayHour: 8,
  agendaModeGroupBy: 'date',
}

const CalendarContext = createContext({} as ICalendarContext)

export function CalendarProvider({
  children,
  users,
  duty_types,
  exceptions_types,
  auth,
  badge = 'colored',
  view = 'day',
}: {
  children: React.ReactNode
  exceptions_types: DutyExceptionsType[]
  auth: Personnel
  duty_types: DutyType[]
  users: Personnel[]
  view?: TCalendarView
  badge?: 'dot' | 'colored'
}) {
  const [rawSettings, setSettings] = useLocalStorage<Partial<CalendarSettings>>(
    'calendar-settings',
    {},
  )

  const settings: CalendarSettings = {
    ...DEFAULT_SETTINGS,
    badgeVariant: badge,
    view: view,
    ...rawSettings,
  }

  const [badgeVariant, setBadgeVariantState] = useState<'dot' | 'colored'>(settings.badgeVariant)
  const [currentView, setCurrentViewState] = useState<TCalendarView>(settings.view)
  const [use24HourFormat, setUse24HourFormatState] = useState<boolean>(settings.use24HourFormat)
  const [startOfDayHour, setStartOfDayHourState] = useState<number>(settings.startOfDayHour)
  const [agendaModeGroupBy, setAgendaModeGroupByState] = useState<'date' | 'color'>(
    settings.agendaModeGroupBy,
  )

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedUserId, setSelectedUserId] = useState<Personnel['id'] | 'all'>('all')
  const [selectedTypes, setSelectedTypes] = useState<DutyExceptionsType['id'][]>([])

  const updateSettings = (newPartialSettings: Partial<CalendarSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newPartialSettings,
    }))
  }

  const [allEvents, setAllEvents] = useState<DutyException[]>([])
  const [filteredEvents, setFilteredEvents] = useState<DutyException[]>([])
  useEffect(() => {
    const fetchEventsByDate = async () => {
      try {
        // selectedDate'a göre startDate ve endDate belirle
        const startDate = new Date(selectedDate)
        startDate.setHours(0, 0, 0, 0)

        const endDate = new Date(selectedDate)
        endDate.setHours(23, 59, 59, 999)

        // getAllDutyExceptions fonksiyonunu çağır
        const exceptions = await getAllDutyExceptions(2, selectedDate)
        setAllEvents(exceptions)
        setFilteredEvents(exceptions)
      } catch (error) {
        toast.error(String(error))
        // İsteğe bağlı: kullanıcıya gösterilecek bir hata state'i de tutabilirsiniz
        // setError(error)
      }
    }

    fetchEventsByDate()
  }, [selectedDate]) // auth.group.id de bağımlılık olarak // auth.group.id de bağımlılık olarak

  const setBadgeVariant = (variant: 'dot' | 'colored') => {
    setBadgeVariantState(variant)
    updateSettings({ badgeVariant: variant })
  }

  const setView = (newView: TCalendarView) => {
    setCurrentViewState(newView)
    updateSettings({ view: newView })
  }

  const toggleTimeFormat = () => {
    const newValue = !use24HourFormat
    setUse24HourFormatState(newValue)
    updateSettings({ use24HourFormat: newValue })
  }

  const setStartOfDayHour = (newVal: number) => {
    if (!isNaN(newVal) && newVal >= MIN_SCROLL_HOUR && newVal <= MAX_SCROLL_HOUR) {
      setStartOfDayHourState(newVal)
      updateSettings({ startOfDayHour: newVal })
    }
  }

  const setAgendaModeGroupBy = (groupBy: 'date' | 'color') => {
    setAgendaModeGroupByState(groupBy)
    updateSettings({ agendaModeGroupBy: groupBy })
  }

  const filterEventsBySelectedTypes = (typeId: DutyExceptionsType['id']) => {
    const isTypeSelected = selectedTypes.includes(typeId)
    const newTypes = isTypeSelected
      ? selectedTypes.filter((id) => id !== typeId)
      : [...selectedTypes, typeId]

    if (newTypes.length > 0) {
      const filtered = allEvents.filter((event) => {
        const eventTypeId = (event.exceptions_type as DutyExceptionsType).id
        return newTypes.includes(eventTypeId)
      })
      setFilteredEvents(filtered)
    } else {
      setFilteredEvents(allEvents)
    }

    setSelectedTypes(newTypes)
  }

  const filterEventsBySelectedUser = (userId: Personnel['id'] | 'all') => {
    setSelectedUserId(userId)
    if (userId === 'all') {
      setFilteredEvents(allEvents)
    } else {
      const filtered = allEvents.filter((event) => (event.personnel as Personnel).id === userId)
      setFilteredEvents(filtered)
    }
  }

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return
    setSelectedDate(date)
  }

  const addEvent = async (event: AddDutyExceptionsFormValues) => {
    try {
      const duty_exceptions = await AddDutyExceptions(event)
      setAllEvents((prev) => [...prev, duty_exceptions])
      setFilteredEvents((prev) => [...prev, duty_exceptions])
      return duty_exceptions
    } catch (error) {
      throw error
    }
  }

  const updateEvent = async (id: number, values: Partial<AddDutyExceptionsFormValues>) => {
    try {
      const updated = await updateDutyException({ id, values })
      setAllEvents((prev) => prev.map((e) => (e.id === id ? updated : e)))
      setFilteredEvents((prev) => prev.map((e) => (e.id === id ? updated : e)))
      return updated
    } catch (error) {
      throw error
    }
  }

  const removeEvent = async (eventId: number): Promise<void> => {
    const previousAll = allEvents
    const previousFiltered = filteredEvents

    setAllEvents((prev) => prev.filter((e) => e.id !== eventId))
    setFilteredEvents((prev) => prev.filter((e) => e.id !== eventId))

    try {
      toast.promise(removeDutyException({ id: eventId }), {
        success: 'Mazeret Silindi',
        loading: 'Mazeret Siliniyor',
        error: 'Mazeret Silinemedi',
      })

      return
    } catch (error) {
      setAllEvents(previousAll)
      setFilteredEvents(previousFiltered)
      throw error
    }
  }

  const clearFilter = () => {
    setFilteredEvents(allEvents)
    setSelectedTypes([])
    setSelectedUserId('all')
  }

  const value = {
    selectedDate,
    auth,
    setSelectedDate: handleSelectDate,
    selectedUserId,
    setSelectedUserId,
    badgeVariant,
    setBadgeVariant,
    users,
    selectedTypes,
    filterEventsBySelectedTypes,
    filterEventsBySelectedUser,
    events: filteredEvents,
    view: currentView,
    use24HourFormat,
    toggleTimeFormat,
    exceptions_types,
    startOfDayHour,
    setStartOfDayHour,
    setView,
    agendaModeGroupBy,
    duty_types,
    setAgendaModeGroupBy,
    addEvent,
    updateEvent,
    removeEvent,
    clearFilter,
  }

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext)
  if (!context) throw new Error('useCalendar must be used within a CalendarProvider.')
  return context
}
