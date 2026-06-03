import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCalendar } from '@/features/calendar/contexts/calendar-context'
import { Personnel } from '@/payload-types'

export function UserSelect() {
  const { users, selectedUserId, filterEventsBySelectedUser } = useCalendar()

  const handleValueChange = (value: string) => {
    const userId: Personnel['id'] | 'all' = value === 'all' ? 'all' : Number(value)
    filterEventsBySelectedUser(userId)
  }

  return (
    <Select value={String(selectedUserId)} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="all">Hepsi</SelectItem>

        {users.map((user) => (
          <SelectItem key={user.id} value={String(user.id)} className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2">
              <p className="truncate">{user.fullName}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
