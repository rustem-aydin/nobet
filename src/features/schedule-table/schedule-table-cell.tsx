// src/features/schedule/components/schedule-table-cell.tsx
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface Item {
  date: Date
  status: string
  exceptionType?: string
}

interface Props {
  items: Item[]
  dutyTypeColor?: string
}

const MONTH_ABBR = [
  'Oca',
  'Şub',
  'Mar',
  'Nis',
  'May',
  'Haz',
  'Tem',
  'Ağu',
  'Eyl',
  'Eki',
  'Kas',
  'Ara',
]

export function ScheduleTableCell({ items, dutyTypeColor }: Props) {
  if (items.length === 0) {
    return <div className="h-full min-h-[40px]" />
  }

  return (
    <div className="flex flex-col gap-0.5">
      {items.map((item, idx) => {
        const day = item.date.getUTCDate()
        const month = MONTH_ABBR[item.date.getUTCMonth()]

        // Renk kuralı (kırmızı yazı yoksay, sadece mazeret):
        const isException = item.status === 'exception'
        const isOfficial = isException && item.exceptionType === 'official'
        const isUnofficial = isException && item.exceptionType === 'unofficial'

        return (
          <div
            key={idx}
            className={cn(
              'px-1.5 py-0.5 text-[11px] font-medium text-center rounded-sm border',
              isOfficial && 'bg-yellow-200 border-yellow-400 text-yellow-900',
              isUnofficial && 'bg-gray-300 border-gray-500 text-gray-900',
              !isException && 'border-transparent',
            )}
            style={!isException ? { backgroundColor: `${dutyTypeColor}15` } : undefined}
            title={item.date.toISOString()}
          >
            {String(day).padStart(2, '0')}.{month}
          </div>
        )
      })}
    </div>
  )
}
