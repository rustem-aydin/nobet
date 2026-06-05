// actions/test-schedule.ts
'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { generateSchedule } from './duty_schedule'

const payload = await getPayload({ config })

export async function testGenerate() {
  try {
    const result = await generateSchedule(2026, 8) // Haziran 2026
    return { success: true, result }
  } catch (err) {
    console.error('Generate hatası:', err)
    return { success: false, error: String(err) }
  }
}
