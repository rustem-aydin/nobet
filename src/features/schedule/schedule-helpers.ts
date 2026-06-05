// features/schedule/schedule-helpers.ts

// Tarihi YYYY-MM-DD string'ine çevir (karşılaştırma için)
function toDateKey(dateInput: string | Date): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : new Date(dateInput)
  const year = d.getUTCFullYear()
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isPersonnelExcused(
  personnelId: number,
  dateKey: string,
  exceptions: Array<{ personnelId: number; startDate: string; endDate: string }>,
): boolean {
  return exceptions.some((exc) => {
    if (exc.personnelId !== personnelId) return false

    const startKey = toDateKey(exc.startDate)
    const endKey = toDateKey(exc.endDate)

    return dateKey >= startKey && dateKey <= endKey
  })
}

export function isInCooldown(
  personnelId: number,
  dateKey: string,
  previousDuties: Array<{ personnelId: number; dutyDate: string; dutyTypeId?: number }>,
  cooldownDays: number,
): boolean {
  return previousDuties.some((duty) => {
    if (duty.personnelId !== personnelId) return false

    const dutyKey = toDateKey(duty.dutyDate)
    const dateDate = new Date(dateKey + 'T00:00:00Z')
    const dutyDate = new Date(dutyKey + 'T00:00:00Z')
    const diffMs = dateDate.getTime() - dutyDate.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    return diffDays > 0 && diffDays <= cooldownDays
  })
}
