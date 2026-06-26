import { Personnel, DutyType, DutySchedule } from '@/payload-types'
import { getMonth, getDate, isSameDay, isBefore, startOfDay, isAfter } from 'date-fns'
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
  // personnel.schedule.docs içindeki isOffical=true olan tarihleri Set olarak tut
  const officialDates = new Set(
    (personnel.schedule?.docs as DutySchedule[])
      ?.filter((s) => s.isOffical === true)
      ?.map((s) => new Date(s.dutyDate).toDateString()) ?? [],
  )

  // Bugünün başlangıcı (saat 00:00:00)
  const today = startOfDay(new Date())

  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item, idx) => {
        const day = String(getDate(item.date)).padStart(2, '0')
        const month = MONTH_ABBR[getMonth(item.date)]
        const isException = item.status === 'exception'
        const isOfficial = isException && item.exceptionType === 'official'
        const isUnofficial = isException && item.exceptionType === 'unofficial'

        // personnel.schedule.docs içindeki isOffical kontrolü
        const scheduleIsOfficial = officialDates.has(item.date.toDateString())

        // Tarih durumu: geçmiş, bugün, gelecek
        const itemDate = startOfDay(item.date)
        const isPast = isBefore(itemDate, today)
        const isToday = isSameDay(itemDate, today)
        const isFuture = isAfter(itemDate, today)

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
                // Exception durumları (en yüksek öncelik)
                isOfficial && 'bg-yellow-200 border-yellow-400 text-yellow-900',
                isUnofficial && 'bg-gray-300 border-gray-500 text-gray-900',

                // isOffical === true ise: gri arka plan, siyah yazı
                scheduleIsOfficial && 'bg-gray-400 border-gray-600 text-black',

                // Normal schedule tarihleri (exception veya isOffical değilse)
                // Geçmiş tarih: yeşil
                !isException &&
                  !scheduleIsOfficial &&
                  isPast &&
                  'bg-green-200 border-green-500 text-green-900',
                // Bugün: sarı
                !isException &&
                  !scheduleIsOfficial &&
                  isToday &&
                  'bg-purple-200 border-purple-500 text-purple-900',
                // Gelecek tarih: mavi
                !isException &&
                  !scheduleIsOfficial &&
                  isFuture &&
                  'bg-blue-200 border-blue-500 text-blue-900',
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
