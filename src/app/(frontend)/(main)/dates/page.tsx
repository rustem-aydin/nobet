import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { YearNavigator } from '@/features/dates/header'
import { getAllDutyTypes } from '@/collections/DutyTypes/actions/getAllDutyTypes'
import { DatesFilterParams } from 'types'

import Content from '@/features/dates/dates-content'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { notFound } from 'next/navigation'

export default async function DatesPage({
  searchParams,
}: {
  searchParams: Promise<DatesFilterParams>
}) {
  const params = await searchParams
  const year = params?.year
  const dutyTypes = await getAllDutyTypes(0, year)
  const auth = await getAuth()
  if (auth.role !== 'admin' && auth.role !== 'chief') {
    return notFound()
  }
  return (
    <main className="flex max-h-screen flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 mt-1 data-[orientation=vertical]:h-5" />
          <span className="text-xl">Mazeretler</span>
        </div>
      </header>
      <div className="px-8">
        <YearNavigator dutyTypes={dutyTypes} />
        <Content dutyTypes={dutyTypes} />
      </div>
    </main>
  )
}
