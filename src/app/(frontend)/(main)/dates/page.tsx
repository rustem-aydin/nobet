import { CronSchedule } from '@/components/cron-schedule'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { YearNavigator } from '@/features/dates/header'
import { DutyType } from '@/payload-types'
import { getAllDutyTypes } from '@/collections/DutyTypes/actions/getAllDutyTypes'
import { DatesFilterParams } from 'types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default async function DatesPage({
  searchParams,
}: {
  searchParams: Promise<DatesFilterParams>
}) {
  const params = await searchParams
  const year = params?.year
  const dutyTypes = await getAllDutyTypes(0, year)

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
        <YearNavigator />
        <Accordion collapsible type="single" className="w-full border rounded-md px-2">
          {dutyTypes?.map((type: DutyType) => (
            <AccordionItem key={type.id} value={`duty-type-${type.id}`}>
              <AccordionTrigger className="text-lg font-semibold " style={{ color: type.color }}>
                {type.name}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 ">
                  {type.yearConfigs?.flatMap(
                    (yearConfig) =>
                      yearConfig.cronSchedules?.map((schedule) => (
                        <>
                          <CronSchedule
                            color={type.color}
                            key={`${type.id}-${yearConfig.id}-${schedule.id}`}
                            showNextRuns={3}
                            expression={schedule.cron}
                            title={schedule.description}
                          />
                        </>
                      )) ?? [],
                  ) ?? (
                    <p className="text-muted-foreground text-sm">Planlanmış nöbet bulunmuyor.</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  )
}
