import { useState } from 'react'

import { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { ChevronDownIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'
interface FormInputProps<T extends FieldValues = any> {
  form: UseFormReturn<T>
}

const FormDate = ({ form }: FormInputProps) => {
  const [openFrom, setOpenFrom] = useState(false)

  const formatDate = (value: any) => {
    if (!value) return 'Tarih Seç'
    const date = value instanceof Date ? value : new Date(value)
    if (isNaN(date.getTime())) return 'Tarih Seç'
    return date.toLocaleDateString('tr', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-3">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="px-1">Başlangıç Tarihi *</FormLabel>
              <Popover open={openFrom} onOpenChange={setOpenFrom}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="w-full justify-between font-normal"
                      type="button"
                    >
                      {formatDate(field.value)}
                      <ChevronDownIcon />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value instanceof Date ? field.value : new Date(field.value)}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      field.onChange(date)
                      setOpenFrom(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
export default FormDate
