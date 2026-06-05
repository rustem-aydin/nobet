import { Personnel, DutyType } from '@/payload-types'
import { ScheduleCeteleCell } from './schedule-cetele-cell'

interface Item {
  date: Date
  status: string
  exceptionType?: string
}

interface Props {
  personnel: Personnel
  items: Item[]
  dutyType: DutyType
  auth: Personnel
}

export function ScheduleCeteleRow({ personnel, items, dutyType, auth }: Props) {
  return (
    <tr className="border-b hover:bg-muted/30">
      <td className="border-r px-3 py-2 text-center text-muted-foreground">{personnel.rank}</td>
      <td className="border-r px-3 py-2">
        <span className="font-medium text-sm">{personnel.fullName}</span>
      </td>
      <td className="px-3 py-2 align-top">
        <ScheduleCeteleCell items={items} personnel={personnel} dutyType={dutyType} auth={auth} />
      </td>
    </tr>
  )
}
