// features/schedule/components/duty-type-selector.tsx
'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DutyType } from '@/payload-types'

interface Props {
  dutyTypes: DutyType[]
  selected: DutyType | null
  onSelect: (dt: DutyType) => void
}

export function DutyTypeSelector({ dutyTypes, selected, onSelect }: Props) {
  return (
    <Select
      value={selected?.id?.toString()}
      onValueChange={(value) => {
        const dt = dutyTypes.find((d) => d.id?.toString() === value)
        if (dt) onSelect(dt)
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Nöbet Türü Seçin" />
      </SelectTrigger>
      <SelectContent>
        {dutyTypes.map((dt) => (
          <SelectItem key={dt.id} value={dt.id?.toString() || ''}>
            {dt.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
