'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { addMinutes, format, set } from 'date-fns'
import { type ReactNode, useEffect, useMemo, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCalendar } from '@/features/calendar/contexts/calendar-context'
import { useDisclosure } from '@/features/calendar/hooks'
import { DutyException, DutyExceptionsType } from '@/payload-types'
import FormDateRange from '@/components/form-date'
import { Dialog } from '@/components/ui/dialog'
import { eventSchema, TEventFormData } from 'types/schemas'

interface IProps {
  children: ReactNode
  startDate?: Date
  startTime?: { hour: number; minute: number }
  event?: DutyException
}

export function AddEditEventDialog({ children, startDate, startTime, event }: IProps) {
  const { isOpen, onClose, onToggle } = useDisclosure()
  const { addEvent, updateEvent, exceptions_types } = useCalendar()
  const isEditing = !!event

  const eventReason = event?.reason
  const eventExceptionsTypeId = useMemo(() => {
    if (!event?.exceptions_type) return undefined
    if (typeof event.exceptions_type === 'object' && 'id' in event.exceptions_type) {
      return event.exceptions_type.id
    }
    return Number(event.exceptions_type)
  }, [event?.exceptions_type])

  const initialDates = useMemo(() => {
    if (!isEditing) {
      if (!startDate) {
        const now = new Date()
        return { startDate: now, endDate: addMinutes(now, 30) }
      }
      const start = startTime
        ? set(new Date(startDate), {
            hours: startTime.hour,
            minutes: startTime.minute,
            seconds: 0,
          })
        : new Date(startDate)
      const end = addMinutes(start, 30)
      return { startDate: start, endDate: end }
    }
    return {
      startDate: new Date(event!.startDate),
      endDate: new Date(event!.endDate),
    }
  }, [startDate, startTime, isEditing, event?.startDate, event?.endDate])

  const form = useForm<TEventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      reason: '',
      exceptions_type: undefined,
      dateRange: {
        from: new Date(),
        to: addMinutes(new Date(), 30),
      },
    },
  })

  // Dialog açıldığında veya edit moduna geçtiğinde form'u resetle
  useEffect(() => {
    if (!isOpen) return

    const exceptionsTypeId = isEditing ? eventExceptionsTypeId : exceptions_types[0]?.id

    form.reset({
      reason: eventReason ?? '',
      exceptions_type: exceptionsTypeId,
      dateRange: {
        from: initialDates.startDate,
        to: initialDates.endDate,
      },
    })
  }, [
    isOpen,
    isEditing,
    eventReason,
    eventExceptionsTypeId,
    initialDates.startDate,
    initialDates.endDate,
    exceptions_types,
    form,
  ])

  const onSubmit = useCallback(
    async (values: TEventFormData) => {
      try {
        if (isEditing && event) {
          await updateEvent(event.id, {
            reason: values.reason,
            exceptions_type: Number(values.exceptions_type),
            startDate: format(values.dateRange!.from, "yyyy-MM-dd'T'HH:mm:ss"),
            endDate: format(values.dateRange!.to, "yyyy-MM-dd'T'HH:mm:ss"),
          })
        } else {
          await addEvent({
            reason: values.reason,
            exceptions_type: Number(values.exceptions_type),
            startDate: format(values.dateRange!.from, "yyyy-MM-dd'T'HH:mm:ss"),
            endDate: format(values.dateRange!.to, "yyyy-MM-dd'T'HH:mm:ss"),
            status: 'pending',
          })
        }

        onClose()
        form.reset()
      } catch (error) {
        console.error(`Mazeret  ${isEditing ? 'güncellenirken' : 'eklenirken'} hata:`, error)
      }
    },
    [isEditing, event, updateEvent, addEvent, onClose, form],
  )

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onToggle()
        if (!open) {
          form.reset()
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="backdrop-blur-3xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Mazereti Düzenle' : 'Yeni Mazeret Bildir'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Mevcut mazeretinizi düzenleyin.' : 'Yeni bir mazeret bildirin.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="event-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormDateRange
              name="dateRange"
              label="Tarih Aralığı Seç"
              placeholder="Tarih aralığı seçin"
              form={form}
            />

            <FormField
              control={form.control}
              name="exceptions_type"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="required">Tür</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value?.toString() ?? ''}
                      onValueChange={(val) => field.onChange(Number(val))}
                      disabled={exceptions_types.length === 0}
                    >
                      <SelectTrigger
                        className={`w-full ${fieldState.invalid ? 'border-red-500' : ''}`}
                      >
                        <SelectValue placeholder={'Bir tür seçin'} />
                      </SelectTrigger>
                      <SelectContent>
                        {exceptions_types.map((type) => (
                          <SelectItem value={String(type.id)} key={type.id}>
                            <div className="flex items-center gap-2">
                              <div
                                className="size-3.5 rounded-full"
                                style={{ backgroundColor: type.color }}
                              />
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="required">Açıklama</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Bir açıklama girin"
                      className={fieldState.invalid ? 'border-red-500' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="flex justify-end bg-card gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              İptal
            </Button>
          </DialogClose>
          <Button form="event-form" type="submit">
            {isEditing ? 'Değişiklikleri Kaydet' : 'Mazeret Oluştur'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
