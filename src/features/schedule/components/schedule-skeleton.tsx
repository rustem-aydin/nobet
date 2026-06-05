export function ScheduleSkeleton() {
  return (
    <div className="w-full border rounded-xl animate-pulse">
      <div className="h-14 border-b bg-muted" />
      <div className="grid grid-cols-7">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 border-b bg-muted" />
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: 42 }).map((_, i) => (
          <div key={i} className="h-24 lg:h-32 border-l border-t bg-muted/50" />
        ))}
      </div>
    </div>
  )
}
