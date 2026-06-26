'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Group, Personnel } from '@/payload-types'
import { toLocalDateString } from '@/helpers/dutyScheduler'

import { revalidatePath } from 'next/cache'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { isCooldownDaysBeetween } from '@/collections/Personnel/actions/isCooldownDaysBeetween'
import { incrementDutyCount } from '@/collections/Personnel/actions/incrementDutyCount'

export async function setDutySchedule({
  personnel,
  date,
  dutyTypeId,
}: {
  personnel: Personnel
  date: Date
  dutyTypeId: number
}) {
  const payload = await getPayload({ config })
  const personnelId = personnel.id

  if (!personnel) {
    throw new Error(`Personel bulunamadı (id: ${personnelId})`)
  }

  if (!(personnel as any).aktif) {
    throw new Error(`${(personnel as any).fullName} aktif değil, nöbet atanamaz`)
  }

  const auth = await getAuth()
  const groupId =
    typeof (auth.group as Group) === 'object' ? (auth.group as Group).id : (auth.group as Group)
  const dutyDateStr = toLocalDateString(date)

  // ─── 1) COOLDOWN KONTROLÜ ───
  await isCooldownDaysBeetween({ date, personnel })

  // ─── 2) MAZERET KONTROLÜ (doğrudan personnel üzerinden) ───
  const exceptions = (personnel as any).exceptions
  let exceptionList: any[] = []

  if (Array.isArray(exceptions)) {
    exceptionList = exceptions
  } else if (exceptions && typeof exceptions === 'object' && 'docs' in exceptions) {
    exceptionList = exceptions.docs || []
  }

  const hasException = exceptionList.some((ex: any) => {
    const start = toLocalDateString(new Date(ex.startDate))
    const end = toLocalDateString(new Date(ex.endDate))
    return dutyDateStr >= start && dutyDateStr <= end
  })

  if (hasException) {
    throw new Error(`${(personnel as any).fullName} bu tarihte mazeretli, nöbet atanamaz`)
  }

  // ─── 3) NÖBETİ OLUŞTUR ───
  const newDuty = await payload.create({
    collection: 'duty_schedule',
    user: auth,
    overrideAccess: false,
    data: {
      personnel: personnelId,
      dutyType: dutyTypeId,
      dutyDate: dutyDateStr,
      status: 'draft',
      group: groupId,
      isOffical: false, // ← EKLE
    },
  })

  await incrementDutyCount(personnelId, dutyTypeId)

  // İsteğe bağlı e‑posta bildirimi (şimdilik yorum satırında)
  // const data = await sendTemplatedEmail('nobet-atama', 'rustema@hvkk.tsk.tr', {
  //   personnelName: `${personnel.fullName} `,
  //   dutyDate: String(date),
  //   dutyType: (newDuty?.dutyType as DutyType).name || 'Standart',
  //   groupName: (personnel.group as Group)?.name || '-',
  //   senderName: 'Rüstem AYDIN',
  // })

  revalidatePath('/calendar')

  return {
    success: true,
    duty: newDuty,
  }
}
