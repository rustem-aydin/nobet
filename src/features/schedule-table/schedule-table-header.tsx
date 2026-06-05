// src/features/schedule/components/schedule-table-header.tsx
import { DutyType } from '@/payload-types'

interface Props {
  dutyTypes: DutyType[]
}

export function ScheduleTableHeader({ dutyTypes }: Props) {
  return (
    <thead className="sticky top-0 z-10 bg-muted">
      <tr>
        <th className="sticky left-0 z-20 bg-muted border-r px-3 py-2 text-left font-medium w-[180px]">
          ADI SOYADI
        </th>
        {dutyTypes.map((dt) => (
          <th
            key={dt.id}
            className="border-l px-2 py-2 text-center font-medium w-[120px]"
            style={{ color: dt.color || undefined }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-semibold">{dt.name}</span>
              <span className="text-[10px] text-muted-foreground">
                {dt.sortOrder === 'normal' ? '↓' : '↑'}
              </span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}
