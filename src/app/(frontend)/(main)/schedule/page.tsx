import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { ScheduleCetele } from '@/features/schedule-cetele/schedule-cetele'
import { getAllPersonnels } from '@/collections/Personnel/actions/getAllPersonnels'
import { getAllDutyTypes } from '@/collections/DutyTypes/actions/getAllDutyTypes'
export default async function SchedulePage() {
  const auth = await getAuth()
  const personnels = await getAllPersonnels(3)
  const dutyTypes = await getAllDutyTypes()
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
          initialDutyTypeId={dutyTypes[6]?.id}
          auth={auth}
        />
      </div>
    </main>
  )
}
