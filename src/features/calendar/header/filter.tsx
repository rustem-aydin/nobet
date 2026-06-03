import { CheckIcon, Filter, RefreshCcw } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'
import { useCalendar } from '@/features/calendar/contexts/calendar-context'

export default function FilterEvents() {
  const { selectedTypes, filterEventsBySelectedTypes, clearFilter, exceptions_types } =
    useCalendar()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toggle variant="outline" className="cursor-pointer w-fit">
          <Filter className="h-4 w-4" />
        </Toggle>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {exceptions_types.map((exceptionType) => (
          <DropdownMenuItem
            key={exceptionType.id}
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              filterEventsBySelectedTypes(exceptionType.id)
            }}
          >
            <div
              style={{ backgroundColor: exceptionType?.color }}
              className={`size-3.5 rounded-full bg-${exceptionType.color}-600 dark:bg-${exceptionType.color}-700`}
            />
            <span className="capitalize flex justify-center items-center gap-2">
              {exceptionType.name}
              <span>
                {selectedTypes.includes(exceptionType.id) && (
                  <span className="text-blue-500">
                    <CheckIcon className="size-4" />
                  </span>
                )}
              </span>
            </span>
          </DropdownMenuItem>
        ))}
        <Separator className="my-2" />
        <DropdownMenuItem
          disabled={selectedTypes.length === 0}
          className="flex gap-2 cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            clearFilter()
          }}
        >
          <RefreshCcw className="size-3.5" />
          Filteyi Temizle
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
