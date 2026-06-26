'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Filter, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type LogLevel = 'info' | 'warning' | 'error'

export interface Log {
  id: string
  timestamp: string
  level: LogLevel
  service: string
  message: string
  duration: string
  status: string
  tags: string[]
}

type Filters = {
  level: string[]
  service: string[]
  status: string[]
}

const levelStyles: Record<LogLevel, string> = {
  info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  error: 'bg-red-500/10 text-red-600 dark:text-red-400',
}

const statusStyles: Record<string, string> = {
  '200': 'text-green-600 dark:text-green-400',
  '201': 'text-green-600 dark:text-green-400',
  '429': 'text-yellow-600 dark:text-yellow-400',
  '500': 'text-red-600 dark:text-red-400',
  '502': 'text-red-600 dark:text-red-400',
  '503': 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
}

interface LogGroup {
  id: string // group-YYYY-MM-DD gibi
  title: string
  logs: Log[] // ilk eleman başlık logu, sonrası alt loglar
}

// ====================== LogGroupRow (değişmedi) ======================
function LogGroupRow({
  group,
  expanded,
  onToggle,
}: {
  group: LogGroup
  expanded: boolean
  onToggle: () => void
}) {
  const firstLog = group.logs[0]
  const formattedTime = firstLog
    ? new Date(firstLog.timestamp).toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : ''

  const titleLevel = firstLog?.level || 'info'
  const titleStatus = firstLog?.status || '200'
  const titleMessage = group.title

  return (
    <div className="border-b border-border">
      <motion.button
        onClick={onToggle}
        className="w-full p-4 text-left transition-colors hover:bg-muted/50 active:bg-muted/70"
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </motion.div>

          <Badge
            variant="secondary"
            className={`flex-shrink-0 capitalize ${levelStyles[titleLevel]}`}
          >
            {titleLevel}
          </Badge>

          <time className="w-20 flex-shrink-0 font-mono text-xs text-muted-foreground">
            {formattedTime}
          </time>

          <span className="flex-shrink-0 min-w-max text-sm font-medium text-foreground">
            {firstLog?.service || 'Nöbet Oluşturma'}
          </span>

          <p className="flex-1 truncate text-sm font-semibold text-foreground">{titleMessage}</p>

          <span
            className={`flex-shrink-0 font-mono text-sm font-semibold ${
              statusStyles[titleStatus] ?? 'text-muted-foreground'
            }`}
          >
            {titleStatus}
          </span>

          <span className="w-16 flex-shrink-0 text-right font-mono text-xs text-muted-foreground">
            {group.logs.length > 1 ? `${group.logs.length - 1} işlem` : ''}
          </span>
        </div>
      </motion.button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-muted/30"
          >
            <div className="space-y-2 p-4">
              {/* İlk log başlık olduğu için onu atlıyoruz */}
              {group.logs.slice(1).map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-2 text-sm border-b border-border/50 pb-2 last:border-0"
                >
                  <Badge
                    variant="outline"
                    className={`mt-0.5 flex-shrink-0 capitalize text-xs ${levelStyles[log.level]}`}
                  >
                    {log.level}
                  </Badge>
                  <span className="flex-1 text-foreground whitespace-pre-wrap">{log.message}</span>
                  <span className="flex-shrink-0 font-mono text-xs text-muted-foreground">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ====================== FilterPanel (değişmedi) ======================
function FilterPanel({
  filters,
  onChange,
  logs,
}: {
  filters: Filters
  onChange: (filters: Filters) => void
  logs: Log[]
}) {
  const levels = Array.from(new Set(logs.map((log) => log.level)))
  const services = Array.from(new Set(logs.map((log) => log.service)))
  const statuses = Array.from(new Set(logs.map((log) => log.status)))

  const toggleFilter = (category: keyof Filters, value: string) => {
    const current = filters[category]
    const updated = current.includes(value)
      ? current.filter((entry) => entry !== value)
      : [...current, value]

    onChange({
      ...filters,
      [category]: updated,
    })
  }

  const clearAll = () => {
    onChange({
      level: [],
      service: [],
      status: [],
    })
  }

  const hasActiveFilters = Object.values(filters).some((group) => group.length > 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.05 }}
      className="flex h-full flex-col space-y-6 overflow-y-auto bg-card p-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="h-6 text-xs">
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Level</p>
        <div className="space-y-2">
          {levels.map((level) => {
            const selected = filters.level.includes(level)
            return (
              <motion.button
                key={level}
                type="button"
                whileHover={{ x: 2 }}
                onClick={() => toggleFilter('level', level)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-between gap-2 border rounded-md px-3 py-2 text-sm transition-colors ${
                  selected
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/40'
                }`}
              >
                <span className="capitalize">{level}</span>
                {selected && <Check className="h-3.5 w-3.5" />}
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Service
        </p>
        <div className="space-y-2">
          {services.map((service) => {
            const selected = filters.service.includes(service)
            return (
              <motion.button
                key={service}
                type="button"
                whileHover={{ x: 2 }}
                onClick={() => toggleFilter('service', service)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-between gap-2 border rounded-md px-3 py-2 text-sm transition-colors ${
                  selected
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/40'
                }`}
              >
                <span>{service}</span>
                {selected && <Check className="h-3.5 w-3.5" />}
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Status
        </p>
        <div className="space-y-2">
          {statuses.map((status) => {
            const selected = filters.status.includes(status)
            return (
              <motion.button
                key={status}
                type="button"
                whileHover={{ x: 2 }}
                onClick={() => toggleFilter('status', status)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-between gap-2 border rounded-md px-3 py-2 text-sm transition-colors ${
                  selected
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/40'
                }`}
              >
                <span>{status}</span>
                {selected && <Check className="h-3.5 w-3.5" />}
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

// ====================== Ana bileşen ======================
export function InteractiveLogsTable({ logs }: { logs: Log[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    level: [],
    service: [],
    status: [],
  })

  // ✅ YENİ GRUPLAMA: groupKey etiketine göre
  const groupedLogs = useMemo(() => {
    const groupMap = new Map<string, { logs: Log[]; titleLog?: Log }>()

    for (const log of logs) {
      // `group-` ile başlayan etiketi bul
      const groupKey = log.tags.find((tag) => tag.startsWith('group-'))
      if (!groupKey) continue // eski loglar veya hatalı loglar atlanır

      const group = groupMap.get(groupKey) || { logs: [] }
      group.logs.push(log)

      // başlık logunu işaretle
      if (log.tags.includes('baslik')) {
        group.titleLog = log
      }

      groupMap.set(groupKey, group)
    }

    // Map'i diziye çevirip tarihe göre sıralayalım (group-YYYY-MM-DD doğal sıralama)
    return Array.from(groupMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, group]) => {
        const titleLog = group.titleLog ?? group.logs[0]
        // Başlık logu dışındaki tüm loglar (diğer 'baslik' etiketli varsa onlar da çıkarılır)
        const subLogs = group.logs.filter((log) => log !== titleLog && !log.tags.includes('baslik'))

        return {
          id: key,
          title: titleLog.message,
          logs: [titleLog, ...subLogs], // ilk eleman başlık, devamı alt loglar
        } as LogGroup
      })
  }, [logs])

  const filteredGroups = useMemo(() => {
    return groupedLogs.filter((group) => {
      const lowerQuery = searchQuery.toLowerCase()
      const matchSearch =
        group.title.toLowerCase().includes(lowerQuery) ||
        group.logs.some((log) => log.message.toLowerCase().includes(lowerQuery))

      const matchLevel =
        filters.level.length === 0 || group.logs.some((log) => filters.level.includes(log.level))
      const matchService =
        filters.service.length === 0 ||
        group.logs.some((log) => filters.service.includes(log.service))
      const matchStatus =
        filters.status.length === 0 || group.logs.some((log) => filters.status.includes(log.status))

      return matchSearch && matchLevel && matchService && matchStatus
    })
  }, [groupedLogs, searchQuery, filters])

  const activeFilters = filters.level.length + filters.service.length + filters.status.length

  return (
    <main className="h-screen w-full bg-background">
      <div className="flex h-full flex-col">
        <div className="border-b border-border bg-card p-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Nöbet Atama Logları</h1>
              <p className="text-sm text-muted-foreground">
                {filteredGroups.length} of {groupedLogs.length} groups
              </p>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search logs by message or service..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-9 pl-9 text-sm"
                />
              </div>
              <Button
                variant={showFilters ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowFilters((current) => !current)}
                className="relative"
              >
                <Filter className="h-4 w-4" />
                {activeFilters > 0 && (
                  <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0 text-xs bg-destructive">
                    {activeFilters}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.div
                key="filters"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-r border-border"
              >
                <FilterPanel filters={filters} onChange={setFilters} logs={logs} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-border">
              <AnimatePresence mode="popLayout">
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((group, index) => {
                    const isExpanded = expandedId === group.id
                    return (
                      <motion.div
                        key={group.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.02 }}
                      >
                        <LogGroupRow
                          group={group}
                          expanded={isExpanded}
                          onToggle={() =>
                            setExpandedId((current) => (current === group.id ? null : group.id))
                          }
                        />
                      </motion.div>
                    )
                  })
                ) : (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 text-center"
                  >
                    <p className="text-muted-foreground">No logs match your filters.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
