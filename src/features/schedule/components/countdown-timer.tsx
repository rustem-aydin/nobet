'use client'

import { useEffect, useState } from 'react'

function formatCountdown(seconds: number): string {
  if (seconds <= 0) return '00:00:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}

interface Props {
  target: Date
  className?: string
}

export function CountdownTimer({ target, className }: Props) {
  // SSR hydration için initial değer sabit
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const tick = () => {
      const diff = Math.floor((target.getTime() - Date.now()) / 1000)
      setTime(formatCountdown(diff))
    }
    tick() // mount'ta hemen doğru değeri göster
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return <span className={`font-mono tabular-nums ${className ?? ''}`}>{time}</span>
}
