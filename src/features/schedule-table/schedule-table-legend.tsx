// src/features/schedule/components/schedule-table-legend.tsx
export function ScheduleTableLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 border-t px-4 py-2 text-xs text-muted-foreground">
      <span className="font-medium text-foreground">Renk Açıklaması:</span>
      <div className="flex items-center gap-1.5">
        <span className="inline-block w-3 h-3 rounded-sm bg-yellow-200 border border-yellow-400" />
        <span>Resmi Mazeret (tutmuş sayılır)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="inline-block w-3 h-3 rounded-sm bg-gray-300 border border-gray-500" />
        <span>Resmi Olmayan Mazeret (öncelikli, gelecek ay)</span>
      </div>
      <div className="ml-auto text-[10px]">↓ Kıdemliden Kıdemsize · ↑ Kıdemsizden Kıdemliye</div>
    </div>
  )
}
