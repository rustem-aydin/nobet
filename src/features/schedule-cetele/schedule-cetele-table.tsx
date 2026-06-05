import { DutyType, Personnel } from '@/payload-types'
import { ScheduleCeteleRow } from './schedule-cetele-row'

type ScheduleMap = Map<number, Array<{ date: Date; status: string; exceptionType?: string }>>

interface Props {
  dutyType: DutyType
  personnels: Personnel[]
  scheduleMap: ScheduleMap
  auth: Personnel
}

export function ScheduleCeteleTable({ dutyType, personnels, scheduleMap, auth }: Props) {
  return (
    <div className="border rounded-lg overflow-auto max-h-[calc(100vh-220px)]">
      <table className="w-full text-sm border-collapse">
        <thead className="sticky top-0 z-10 bg-muted">
          <tr>
            <th className="border-r px-3 py-2 text-left font-medium w-[50px]">S.N.</th>
            <th className="border-r px-3 py-2 text-left font-medium w-[180px]">ADI SOYADI</th>
            <th className="px-3 py-2 text-left font-medium">
              <span style={{ color: dutyType.color || undefined }}>{dutyType.name}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {personnels.map((p) => (
            <ScheduleCeteleRow
              key={p.id}
              personnel={p}
              items={scheduleMap.get(p.id) || []}
              dutyType={dutyType}
              auth={auth}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
