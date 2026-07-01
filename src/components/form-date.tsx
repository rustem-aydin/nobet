'use client'

import { format, parseISO, isValid } from 'date-fns'
import { tr } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FieldValues, UseFormReturn, Path } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FormDateRangeProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  placeholder?: string
  required?: boolean
}

export default function FormDateRange<T extends FieldValues>({
  form,
  name,
  label = 'Tarih Aralığı',
  placeholder = 'Tarih aralığı seçin',
  required = false,
}: FormDateRangeProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // field.value'dan DateRange oluştur
        const dateValue: DateRange | undefined = (() => {
          const value = field.value

          if (!value) return undefined

          const range: DateRange = {
            from: undefined,
            to: undefined,
          }

          if (value.from) {
            const fromDate = typeof value.from === 'string' ? parseISO(value.from) : value.from
            if (isValid(fromDate)) range.from = fromDate
          }

          if (value.to) {
            const toDate = typeof value.to === 'string' ? parseISO(value.to) : value.to
            if (isValid(toDate)) range.to = toDate
          }

          return range.from ? range : undefined
        })()

        const handleDateSelect = (selectedRange: DateRange | undefined) => {
          if (selectedRange?.from) {
            // ✅ Date nesnesi olarak gönder
            field.onChange({
              from: selectedRange.from,
              to: selectedRange.to ?? undefined,
            })
          } else {
            field.onChange(undefined)
          }
        }

        const handleClearDate = () => {
          field.onChange(undefined)
        }

        return (
          <FormItem className="flex flex-col">
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'w-full justify-start font-normal',
                      !dateValue && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon aria-hidden="true" className="mr-2 h-4 w-4" />
                    {dateValue?.from ? (
                      dateValue.to ? (
                        <>
                          {format(dateValue.from, 'dd/MM/yyyy')} -{' '}
                          {format(dateValue.to, 'dd/MM/yyyy')}
                        </>
                      ) : (
                        format(dateValue.from, 'dd/MM/yyyy')
                      )
                    ) : (
                      <span>{placeholder}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={'z-60'}>
                  <Calendar
                    locale={tr}
                    defaultMonth={dateValue?.from}
                    mode={'range'}
                    onSelect={handleDateSelect}
                    selected={dateValue}
                  />
                  {dateValue && (
                    <div className="p-2 border-t mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={handleClearDate}
                        className="w-full text-xs text-muted-foreground hover:text-destructive"
                      >
                        Tarihi Sıfırla
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
