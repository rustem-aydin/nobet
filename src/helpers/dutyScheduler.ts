export function getDutyDatesForMonth(cronSchedules: any[], year: number, month: number) {
  const dates: Array<{ date: Date }> = []

  for (const schedule of cronSchedules) {
    const cronParts = schedule.cron.split(' ')

    const dayOfMonth = cronParts[2] === '*' ? null : parseInt(cronParts[2])
    const month_cron = cronParts[3] === '*' ? null : parseInt(cronParts[3])
    const dayOfWeek = cronParts[4] === '*' ? null : parseInt(cronParts[4])

    // Ay kontrolü
    if (month_cron !== null && month_cron !== month + 1) continue

    // Ayın günlerini tara
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)

      // Gün kontrolü
      if (dayOfMonth !== null && dayOfMonth !== day) continue

      // Hafta günü kontrolü
      if (dayOfWeek !== null && date.getDay() !== dayOfWeek) continue

      dates.push({ date })
    }
  }

  return dates
}

// ─── YARDIMCI FONKSİYONLAR ───
export function toLocalDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function calendarDaysBetween(date1: Date, date2: Date): number {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
  return Math.abs(Math.round((d2.getTime() - d1.getTime()) / 86400000))
}

export const getStatus = (status: 'draft' | 'completed' | 'scheduled') => {
  if (status === 'completed') {
    return {
      color: '#7bf1a8',
      text: 'Tamamlandı',
    }
  } else if (status === 'draft') {
    return {
      color: '#ffd230',
      text: 'Beklemede',
    }
  } else {
    return {
      color: '#8ec5ff',
      text: 'Planlandı',
    }
  }
}
