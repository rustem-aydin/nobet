// src/features/schedule/components/schedule-table.tsx
import { DutyType, Personnel } from '@/payload-types'
import { ScheduleTableHeader } from './schedule-table-header'
import { ScheduleTableRow } from './schedule-table-row'
import { ScheduleTableLegend } from './schedule-table-legend'

interface Props {
  dutyTypes: DutyType[]
  personnels: Personnel[]
  scheduleMap: Map<string, Array<{ date: Date; status: string; exceptionType?: string }>>
}

export function ScheduleTable({ dutyTypes, personnels, scheduleMap }: Props) {
  return (
    <div className="w-full overflow-auto border rounded-lg">
      <table className="w-full text-sm border-collapse">
        <ScheduleTableHeader dutyTypes={dutyTypes} />
        <tbody>
          {personnels.map((p) => (
            <ScheduleTableRow
              key={p.id}
              personnel={p}
              dutyTypes={dutyTypes}
              scheduleMap={scheduleMap}
            />
          ))}
        </tbody>
      </table>
      <ScheduleTableLegend />
    </div>
  )
}
