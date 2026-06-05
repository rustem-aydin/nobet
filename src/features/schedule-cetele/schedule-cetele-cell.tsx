import { Personnel, DutyType } from '@/payload-types'
import { getMonth, getDate } from 'date-fns'
import { cn } from '@/lib/utils'
import { ScheduleCeteleDateContextMenu } from './schedule-cetele-date-context-menu'

interface Item {
  date: Date
  status: string
  exceptionType?: string
}

interface Props {
  items: Item[]
  personnel: Personnel
  dutyType: DutyType
  auth: Personnel
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

export function ScheduleCeteleCell({ items, personnel, dutyType, auth }: Props) {
  if (items.length === 0) {
    return <span className="text-muted-foreground/40 text-xs">—</span>
  }

  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item, idx) => {
        const day = String(getDate(item.date)).padStart(2, '0')
        const month = MONTH_ABBR[getMonth(item.date)]
        const isException = item.status === 'exception'
        const isOfficial = isException && item.exceptionType === 'official'
        const isUnofficial = isException && item.exceptionType === 'unofficial'

        return (
          <ScheduleCeteleDateContextMenu
            key={idx}
            date={item.date}
            status={item.status}
            exceptionType={item.exceptionType}
            dutyType={dutyType}
            personnel={personnel}
            auth={auth}
          >
            <span
              className={cn(
                'inline-block px-1.5 py-0.5 text-[11px] font-medium rounded border cursor-pointer transition-colors',
                isOfficial && 'bg-yellow-200 border-yellow-400 text-yellow-900',
                isUnofficial && 'bg-gray-300 border-gray-500 text-gray-900',
                !isException && 'border-transparent hover:bg-muted',
              )}
              title={item.date.toISOString()}
            >
              {day}.{month}
            </span>
          </ScheduleCeteleDateContextMenu>
        )
      })}
    </div>
  )
}
