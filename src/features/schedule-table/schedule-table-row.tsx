// src/features/schedule/components/schedule-table-row.tsx
import { Personnel, DutyType } from '@/payload-types'
import { ScheduleTableCell } from './schedule-table-cell'

interface Props {
  personnel: Personnel
  dutyTypes: DutyType[]
  scheduleMap: Map<string, Array<{ date: Date; status: string; exceptionType?: string }>>
}

export function ScheduleTableRow({ personnel, dutyTypes, scheduleMap }: Props) {
  return (
    <tr className="border-b hover:bg-muted/30">
      <td className="sticky left-0 z-10 bg-background border-r px-3 py-2 w-[180px]">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Nöbetçi {personnel.rank}</span>
          <span className="font-medium text-sm">{personnel.fullName}</span>
        </div>
      </td>
      {dutyTypes.map((dt) => {
        const key = `${personnel.id}__${dt.id}`
        const items = scheduleMap.get(key) || []
        return (
          <td key={dt.id} className="border-l p-1 align-top w-[120px]">
            <ScheduleTableCell items={items} dutyTypeColor={dt.color} />
          </td>
        )
      })}
    </tr>
  )
}
