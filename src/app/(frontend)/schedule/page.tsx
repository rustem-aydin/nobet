import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { getAllPersonnels } from 'actions/personnel'
import { getAuth } from 'actions/auth'
import { getActiveDutyTypes, getSchedulesByDutyType } from 'actions/duty_schedule'
import { Group } from '@/payload-types'
import { ScheduleCetele } from '@/features/schedule-cetele/schedule-cetele'
export default async function SchedulePage() {
  const auth = await getAuth()

  const [personnels, dutyTypes, initialScheduleMap] = await Promise.all([
    getAllPersonnels(0),
    getActiveDutyTypes(),
    getActiveDutyTypes().then(async (dts) => {
      if (dts.length === 0) return new Map()
      return getSchedulesByDutyType(dts[0].id)
    }),
  ])

  return (
    <main className="flex h-screen flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-5" />
          <span className="text-xl">Nöbet Çetelesi</span>
        </div>
      </header>
      <div className="flex-1 overflow-auto px-6 py-4">
        <ScheduleCetele
          dutyTypes={dutyTypes}
          personnels={personnels}
          initialDutyTypeId={dutyTypes[0]?.id}
          initialScheduleMap={initialScheduleMap}
          auth={auth}
        />
      </div>
    </main>
  )
}
