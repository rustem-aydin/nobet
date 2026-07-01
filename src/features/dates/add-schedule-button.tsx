'use client'

import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, ChevronDownIcon, Clock } from 'lucide-react'
import { useDisclosure } from '../calendar/hooks'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { datesSchema, TDatesFormData } from 'types/schemas'
import { CronExpressionParser } from 'cron-parser'
import { addCronSchedule } from '@/collections/DutyTypes/actions/addDutyTypesCron'

const PRESETS = [
  { label: 'Her Çarşamba', cron: '0 0 * * 3' },
  { label: "Her ayın 15'i", cron: '0 0 15 * *' },
  { label: 'Her gün', cron: '0 0 * * *' },
  { label: 'Her Pazartesi', cron: '0 0 * * 1' },
]

const CRON_REGEX =
  /^(\*|([0-5]?\d)|(\*\/\d+)|(\d+-\d+)) (\*|(1?\d|2[0-3])|(\*\/\d+)|(\d+-\d+)) (\*|([1-9]|[12]\d|3[01])|(\*\/\d+)|(\d+-\d+)) (\*|([1-9]|1[0-2])|(\*\/\d+)|(\d+-\d+)) (\*|[0-6]|(\*\/\d+)|(\d+-\d+))$/

export function AddScheduleButton({ typeID }: { typeID: number }) {
  const { isOpen, onToggle } = useDisclosure()
  const [activeTab, setActiveTab] = useState('preset')
  const [openCalendar, setOpenCalendar] = useState(false)

  const form = useForm<TDatesFormData>({
    resolver: zodResolver(datesSchema),
    defaultValues: {
      description: '',
      date: '',
    },
  })

  const currentDateValue = form.watch('date')

  const nextRun = useMemo(() => {
    if (!currentDateValue) return null

    // ISO tarih kontrolü (artık kullanılmıyor ama bulunabilir)
    const date = new Date(currentDateValue)
    if (!isNaN(date.getTime()) && currentDateValue.includes('T')) {
      return null
    }

    if (!CRON_REGEX.test(currentDateValue)) return null

    try {
      const interval = CronExpressionParser.parse(currentDateValue)
      return interval.next().toDate()
    } catch {
      return null
    }
  }, [currentDateValue])

  const onSubmit = async (values: TDatesFormData) => {
    if (!CRON_REGEX.test(values.date)) {
      toast.error('Geçersiz cron ifadesi')
      return
    }
    try {
      await addCronSchedule(typeID, values.description, values.date)
      toast.success('Nöbet zamanı eklendi')
      onToggle()
      form.reset()
      setActiveTab('preset')
    } catch (error) {
      toast.error(String(error))
    }
  }

  // ISO tarih kontrolü (kullanılmıyor ama yedek)
  const isISODate = (value: string) => {
    const d = new Date(value)
    return !isNaN(d.getTime()) && value.includes('T')
  }

  // Takvim için Date dönüşümü (cron ifadeleri için çalışmaz)
  const getDateValue = (value: string): Date | undefined => {
    if (!value) return undefined
    // Cron ise gün/ay çıkarmaya çalış
    const simpleCron = /^0 0 (\d{1,2}) (\d{1,2}) \*$/
    const match = value.match(simpleCron)
    if (match) {
      const day = parseInt(match[1], 10)
      const month = parseInt(match[2], 10) - 1
      return new Date(new Date().getFullYear(), month, day)
    }
    return undefined
  }

  // Butonda gösterilecek metin
  const formatDisplay = (value: string) => {
    if (!value) return 'Seçim yapılmadı'

    if (isISODate(value)) {
      return new Date(value).toLocaleDateString('tr', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }

    // Basit cron (0 0 D M *)
    const simpleCron = /^0 0 (\d{1,2}) (\d{1,2}) \*$/
    const match = value.match(simpleCron)
    if (match) {
      const day = parseInt(match[1], 10)
      const month = parseInt(match[2], 10)
      if (day > 0 && month > 0 && month <= 12) {
        const date = new Date(2020, month - 1, day)
        return date.toLocaleDateString('tr', { day: '2-digit', month: 'long' })
      }
    }

    const preset = PRESETS.find((p) => p.cron === value)
    return preset ? preset.label : value
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onToggle()
        if (!open) {
          form.reset()
          setActiveTab('preset')
        }
      }}
    >
      <DialogTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          className="col-span-full flex items-center justify-center gap-2 border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 min-h-8 hover:bg-muted/40 transition-colors cursor-pointer"
        >
          <Plus className="h-8 w-8 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Yeni Zamanlayıcı Ekle</span>
        </div>
      </DialogTrigger>

      <DialogContent className="backdrop-blur-3xl">
        <DialogHeader>
          <DialogTitle>Yeni Mazeret Bildir</DialogTitle>
          <DialogDescription>Yeni bir mazeret bildirin.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="event-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="required">Zamanlama</FormLabel>
                  <FormControl>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="w-full">
                        <TabsTrigger value="preset">Hazır İfadeler</TabsTrigger>
                        <TabsTrigger value="date">Tarih Seç</TabsTrigger>
                        <TabsTrigger value="cron">Cron</TabsTrigger>
                      </TabsList>

                      <TabsContent value="preset" className="mt-2">
                        <div className="grid grid-cols-2 gap-2">
                          {PRESETS.map((p) => (
                            <Button
                              key={p.cron}
                              type="button"
                              variant={field.value === p.cron ? 'default' : 'outline'}
                              onClick={() => field.onChange(p.cron)}
                            >
                              {p.label}
                            </Button>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="date" className="mt-2">
                        <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between font-normal"
                              type="button"
                            >
                              {formatDisplay(field.value)}
                              <ChevronDownIcon className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={getDateValue(field.value)}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                if (date) {
                                  const day = date.getDate()
                                  const month = date.getMonth() + 1
                                  const cron = `0 0 ${day} ${month} *`
                                  field.onChange(cron)
                                } else {
                                  field.onChange('')
                                }
                                setOpenCalendar(false)
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </TabsContent>

                      <TabsContent value="cron" className="mt-2 space-y-2">
                        <Input
                          placeholder="Örn: 0 0 * * 3"
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                        {field.value && !CRON_REGEX.test(field.value) && (
                          <p className="text-xs text-destructive">
                            Geçerli bir cron ifadesi girin (5 alan)
                          </p>
                        )}
                        {field.value && CRON_REGEX.test(field.value) && nextRun && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              Sonraki çalışma:{' '}
                              {nextRun.toLocaleString('tr', {
                                dateStyle: 'long',
                                timeStyle: 'short',
                              })}
                            </span>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </FormControl>
                  {nextRun && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      Sonraki:{' '}
                      {nextRun.toLocaleString('tr', { dateStyle: 'short', timeStyle: 'short' })}
                    </p>
                  )}
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="required">Açıklama</FormLabel>
                  <FormControl>
                    <Input
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
            Nöbet Zamanı Oluştur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
