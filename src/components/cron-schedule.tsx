'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Edit, Trash } from 'lucide-react'
import ConfirmDialog from './confirm-dialog'
import { toast } from 'sonner'
import { deleteCronSchedule } from '@/collections/DutyTypes/actions/deleteDutyTypesCron'

const FIELD_NAMES = ['Dakika', 'Saat', 'Gün (Ay)', 'Ay', 'Gün (Hafta)'] as const
const FIELD_RANGES: [number, number][] = [
  [0, 59],
  [0, 23],
  [1, 31],
  [1, 12],
  [0, 6],
]

const MONTH_NAMES = [
  '',
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
]

const DAY_NAMES = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']

function parseField(field: string, min: number, max: number): number[] {
  const values = new Set<number>()

  for (const part of field.split(',')) {
    const stepMatch = part.match(/^(.+)\/(\d+)$/)
    const step = stepMatch ? parseInt(stepMatch[2], 10) : 1
    const range = stepMatch ? stepMatch[1] : part

    if (range === '*') {
      for (let i = min; i <= max; i += step) values.add(i)
    } else if (range.includes('-')) {
      const [start, end] = range.split('-').map(Number)
      for (let i = start; i <= end; i += step) values.add(i)
    } else {
      values.add(parseInt(range, 10))
    }
  }

  return Array.from(values).sort((a, b) => a - b)
}

function describeField(field: string, fieldIndex: number, _min: number, _max: number): string {
  if (field === '*') return 'her'

  const values = parseField(field, _min, _max)

  if (fieldIndex === 4) {
    return values.map((v) => DAY_NAMES[v] ?? String(v)).join(', ')
  }
  if (fieldIndex === 3) {
    return values.map((v) => MONTH_NAMES[v] ?? String(v)).join(', ')
  }

  if (field.startsWith('*/')) {
    return `Her ${field.slice(2)}`
  }

  if (values.length <= 5) return values.join(', ')
  return `${values.length} değer`
}

function humanReadable(fields: string[]): string {
  const [_, __, dom, month, dow] = fields
  const parts: string[] = []

  // Ay kısmı
  let monthBase = ''
  if (month !== '*') {
    const months = parseField(month, 1, 12).map((m) => MONTH_NAMES[m] ?? String(m))
    monthBase = joinList(months) + (months.length > 1 ? ' aylarının' : ' ayının')
  }

  // Ayın günü
  if (dom !== '*') {
    const days = parseField(dom, 1, 31)
    const dayStr = joinList(days.map(String)) + '. günü'
    if (monthBase) {
      parts.push(`${monthBase} ${dayStr}`)
      monthBase = '' // aynı ay bilgisi tekrar kullanılmasın
    } else {
      parts.push(`Her Ayın ${dayStr}`)
    }
  }

  // Haftanın günü
  if (dow !== '*') {
    const days = parseField(dow, 0, 6)
    const dayNames = days.map((d) => DAY_NAMES[d] ?? String(d))
    const dayList = joinList(dayNames)
    const dowStr = `Her ${dayList}`

    if (monthBase && dom === '*') {
      parts.push(`${monthBase} ${dowStr}`)
    } else if (!monthBase && dom === '*') {
      parts.push(dowStr)
    } else {
      parts.push(dowStr)
    }
  }

  if (monthBase && parts.length === 0) {
    parts.push(`${monthBase.replace(' Ayının', ' Ayında')} Her Gün`)
  }

  const result = parts.join(' ve ')
  return result || 'Her gün'
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  if (items.length === 2) return `${items[0]} ve ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, ve ${items[items.length - 1]}`
}

function getNextRuns(fields: string[], count: number, from: Date): Date[] {
  const runs: Date[] = []
  const maxIterations = 366 * 24 * 60
  const cursor = new Date(from)

  cursor.setSeconds(0, 0)
  cursor.setMinutes(cursor.getMinutes() + 1)

  const minuteValues = parseField(fields[0], 0, 59)
  const hourValues = parseField(fields[1], 0, 23)
  const domValues = parseField(fields[2], 1, 31)
  const monthValues = parseField(fields[3], 1, 12)
  const dowValues = parseField(fields[4], 0, 6)

  const minuteSet = new Set(minuteValues)
  const hourSet = new Set(hourValues)
  const domSet = fields[2] === '*' ? null : new Set(domValues)
  const monthSet = fields[3] === '*' ? null : new Set(monthValues)
  const dowSet = fields[4] === '*' ? null : new Set(dowValues)

  for (let i = 0; i < maxIterations && runs.length < count; i++) {
    const m = cursor.getMinutes()
    const h = cursor.getHours()
    const d = cursor.getDate()
    const mo = cursor.getMonth() + 1
    const w = cursor.getDay()

    const matchMinute = minuteSet.has(m)
    const matchHour = hourSet.has(h)
    const matchDom = domSet === null || domSet.has(d)
    const matchMonth = monthSet === null || monthSet.has(mo)
    const matchDow = dowSet === null || dowSet.has(w)

    if (matchMinute && matchHour && matchDom && matchMonth && matchDow) {
      runs.push(new Date(cursor))
      // Aynı günün diğer eşleşmelerini atlamak için bir sonraki güne geç
      cursor.setDate(cursor.getDate() + 1)
      cursor.setHours(0, 0, 0, 0)
      continue
    }

    cursor.setMinutes(cursor.getMinutes() + 1)
  }

  return runs
}

function formatNextRun(date: Date): string {
  const day = DAY_NAMES[date.getDay()]
  const month = MONTH_NAMES[date.getMonth() + 1]
  const d = date.getDate()
  return `${day}, ${d} ${month}`
}

interface CronScheduleProps extends Omit<React.ComponentProps<'div'>, 'children' | 'title'> {
  expression: string
  dutyTypeId: string
  title?: string
  showNextRuns?: number
  color: string
  referenceDate?: Date
}

function CronSchedule({
  expression,
  title,
  dutyTypeId,
  color,
  showNextRuns = 0,
  referenceDate,
  className,
  ...props
}: CronScheduleProps) {
  const fields = expression.trim().split(/\s+/)

  if (fields.length !== 5) {
    return (
      <div
        data-slot="cron-schedule"
        className={cn(
          'rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive',
          className,
        )}
        {...props}
      >
        Geçersiz cron ifadesi. 5 alan bekleniyor, {fields.length} alan girildi.
      </div>
    )
  }

  const summary = humanReadable(fields)
  const nextRuns =
    showNextRuns > 0 ? getNextRuns(fields, showNextRuns, referenceDate ?? new Date()) : []

  const visibleFieldIndices = [2, 3, 4] // Gün(Ay), Ay, Gün(Hafta)
  const handleDelete = async () => {
    toast.promise(deleteCronSchedule(Number(dutyTypeId), expression), {
      loading: 'Silme İşlemi yapılıyor,',
      success: 'Silme İşlemi tamamlandı,',
      error: 'Silme İşlemi tamamlanamadı,',
    })
  }
  return (
    <div
      data-slot="cron-schedule"
      className={cn(
        'overflow-hidden mb-4 rounded-xl border border-border/60 bg-card shadow-sm',
        className,
      )}
      {...props}
    >
      <div
        style={{ background: `${color}20` }}
        className={`flex items-start justify-between  gap-3 border-b border-border/40 px-4 py-3`}
      >
        <div className="flex flex-col gap-1">
          {title && <h3 className="text-sm font-semibold text-foreground">{title}</h3>}
          <p className="text-sm text-muted-foreground">{summary}</p>
        </div>
        <div className="flex flex-col gap-1 justify-end items-end">
          <div>
            <Button variant={'ghost'} size={'xs'}>
              <Edit />
            </Button>
            <ConfirmDialog
              title="Silmek istiyor musunuz?"
              description="Nöbet Türü Zamanlayıcı kalıcı olarak silinecektir. Emin misiniz?"
              onConfirm={handleDelete}
              cancelText="İptal"
              confirmText="Evet, Sil"
            >
              <Button variant={'destructive'} size={'xs'}>
                <Trash />
              </Button>
            </ConfirmDialog>
          </div>
          <code className="shrink-0 rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-foreground">
            {expression}
          </code>
        </div>
      </div>

      {/* Alan dökümü – yalnızca gün, ay ve haftanın günü */}
      <div className="grid grid-cols-3 divide-x divide-border/40">
        {visibleFieldIndices.map((i) => {
          const field = fields[i]
          const [min, max] = FIELD_RANGES[i]
          const description = describeField(field, i, min, max)

          return (
            <div key={FIELD_NAMES[i]} className="flex flex-col items-center gap-1.5 px-2 py-3">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {FIELD_NAMES[i]}
              </span>
              <span className="font-mono text-sm font-semibold text-foreground">{field}</span>
              <span className="text-center text-[11px] text-muted-foreground">{description}</span>
            </div>
          )
        })}
      </div>

      {/* Sonraki çalışma zamanları */}
      {nextRuns.length > 0 && (
        <div className="border-t border-border/40 px-4 py-3">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {nextRuns.length === 1
              ? 'Sonraki çalışma zamanı'
              : `Sonraki ${nextRuns.length} çalışma zamanı`}
          </p>
          <ol className="flex flex-col gap-1">
            {nextRuns.map((run, i) => (
              <li key={run.toISOString()} className="flex items-center gap-2 text-sm">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="font-mono text-xs text-foreground">{formatNextRun(run)}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export { CronSchedule, type CronScheduleProps }
