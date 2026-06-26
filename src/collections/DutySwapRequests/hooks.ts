import { CollectionBeforeChangeHook, CollectionAfterChangeHook } from 'payload'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

// ─── YARDIMCI FONKSİYONLAR ──────────────────────────────────────────────
const toLocalDateString = (date: Date) => format(date, 'yyyy-MM-dd')

const isCooldownDaysBeetween = async ({
  date,
  personnel,
  req,
}: {
  date: Date
  personnel: any
  req: any
}) => {
  const personnelId = personnel.id
  const dutyDateStr = toLocalDateString(date)
  const formatDate = (d: Date) => format(d, 'd MMMM yyyy', { locale: tr })

  // Personelin grubundan cooldownDays bilgisini al
  const group = await req.payload.findByID({
    collection: 'groups',
    id: personnel.group,
    depth: 1,
  })
  if (!group) throw new Error('Personelin grubu bulunamadı.')
  const cooldownDays = (group as any).cooldownDays || 0

  if (cooldownDays > 0) {
    const cooldownStart = new Date(date)
    cooldownStart.setDate(cooldownStart.getDate() - cooldownDays)
    const cooldownEnd = new Date(date)
    cooldownEnd.setDate(cooldownEnd.getDate() + cooldownDays)

    const { docs: dutiesInWindow } = await req.payload.find({
      collection: 'duty_schedule',
      where: {
        and: [
          { 'personnel.id': { equals: personnelId } },
          { dutyDate: { greater_than_equal: toLocalDateString(cooldownStart) } },
          { dutyDate: { less_than_equal: toLocalDateString(cooldownEnd) } },
          { dutyDate: { not_equals: dutyDateStr } },
        ],
      },
      depth: 1,
      limit: 100,
    })

    if (dutiesInWindow.length > 0) {
      const pastDuties = dutiesInWindow.filter((d: any) => d.dutyDate < dutyDateStr)
      const futureDuties = dutiesInWindow.filter((d: any) => d.dutyDate > dutyDateStr)

      if (pastDuties.length > 0) {
        const lastDutyDateStr = pastDuties
          .map((d: any) => d.dutyDate)
          .sort()
          .pop()
        const lastDutyDate = new Date(lastDutyDateStr)
        const earliestDate = new Date(lastDutyDate)
        earliestDate.setDate(lastDutyDate.getDate() + cooldownDays + 1)

        throw new Error(
          `Cooldown ihlali: ${personnel.fullName}, ${cooldownDays} gün içinde zaten nöbet tutmuş. ` +
            `En erken ${formatDate(earliestDate)} tarihinde nöbet tutabilir.`,
        )
      }

      if (futureDuties.length > 0) {
        const nextDutyDateStr = futureDuties.map((d: any) => d.dutyDate).sort()[0]
        const nextDutyDate = new Date(nextDutyDateStr)
        const latestDate = new Date(nextDutyDate)
        latestDate.setDate(nextDutyDate.getDate() - cooldownDays - 1)

        throw new Error(
          `Cooldown ihlali: ${personnel.fullName}, ${cooldownDays} gün içinde nöbet atanmış. ` +
            `En geç ${formatDate(latestDate)} tarihine kadar nöbet atanabilir.`,
        )
      }
    }
  }
}

const isExceptionsBeetween = async ({
  date,
  personnel,
  req,
}: {
  date: Date
  personnel: any
  req: any
}) => {
  const personnelId = personnel.id
  const dutyDateStr = toLocalDateString(date)
  const formatDate = (d: Date) => format(d, 'd MMMM yyyy', { locale: tr })

  const { docs: exceptions } = await req.payload.find({
    collection: 'duty_exceptions', // sizin mevcut collection adınız
    where: {
      and: [
        { 'personnel.id': { equals: personnelId } },
        { status: { equals: 'approved' } },
        { startDate: { less_than_equal: date.toISOString() } },
        { endDate: { greater_than_equal: date.toISOString() } },
      ],
    },
    depth: 2,
  })

  if (exceptions.length > 0) {
    const ex = exceptions[0] as any
    const start = new Date(ex.startDate)
    const end = new Date(ex.endDate)
    throw new Error(
      `Mazeret ihlali: ${personnel.fullName}, ${formatDate(new Date(dutyDateStr))} tarihinde mazereti var ` +
        `(${formatDate(start)} - ${formatDate(end)}). Nöbet atanamaz.`,
    )
  }
}

// ─── BEFORE CHANGE HOOK ──────────────────────────────────────────────────
export const swapBeforeChange: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
  originalDoc,
}) => {
  const user = req.user
  if (!user) throw new Error('Oturum açmış kullanıcı gerekli.')

  const isCreate = operation === 'create'
  const isUpdate = operation === 'update'

  // 1. createdBy alanını doldur (create ise)
  if (isCreate) {
    data.createdBy = user.id
    // Eğer oluşturan admin/chief ise status'u approved yap (otomatik onay)
    if (user.role === 'admin' || user.role === 'chief') {
      data.status = 'approved'
    } else {
      data.status = 'pending'
    }
  }

  // 2. Eğer status "approved" ise veya "approved" oluyorsa, cooldown & mazeret kontrolü yap
  const newStatus = data.status
  const oldStatus = originalDoc?.status
  const shouldValidate = newStatus === 'approved' && (isCreate || oldStatus !== 'approved')

  if (shouldValidate) {
    const requesterId = data.requesterPersonnel
    const targetId = data.targetPersonnel
    const requesterDuty = await req.payload.findByID({
      collection: 'duty_schedule',
      id: data.requesterDuty,
    })
    const targetDuty = await req.payload.findByID({
      collection: 'duty_schedule',
      id: data.targetDuty,
    })

    if (!requesterDuty || !targetDuty) throw new Error('Nöbet bilgileri bulunamadı.')

    const requesterPersonnel = await req.payload.findByID({
      collection: 'personnel',
      id: requesterId,
    })
    const targetPersonnel = await req.payload.findByID({ collection: 'personnel', id: targetId })
    if (!requesterPersonnel || !targetPersonnel) throw new Error('Personel bilgileri bulunamadı.')

    // Cooldown kontrolleri
    await isCooldownDaysBeetween({
      date: new Date(requesterDuty.dutyDate),
      personnel: requesterPersonnel,
      req,
    })
    await isCooldownDaysBeetween({
      date: new Date(targetDuty.dutyDate),
      personnel: targetPersonnel,
      req,
    })

    // Mazeret kontrolleri
    await isExceptionsBeetween({
      date: new Date(requesterDuty.dutyDate),
      personnel: requesterPersonnel,
      req,
    })
    await isExceptionsBeetween({
      date: new Date(targetDuty.dutyDate),
      personnel: targetPersonnel,
      req,
    })

    // Onay bilgilerini doldur
    data.approvedBy = user.id
    data.approvedAt = new Date().toISOString()
  }

  // 3. Normal kullanıcı güncelleme yapıyorsa sadece status'u cancelled yapabilir (iptal)
  if (isUpdate && user.role !== 'admin' && user.role !== 'chief') {
    if (originalDoc.status !== 'pending') {
      throw new Error('Bu talep artık iptal edilemez.')
    }
    if (data.status !== 'cancelled') {
      throw new Error('Sadece talebi iptal edebilirsiniz.')
    }
    if (originalDoc.createdBy !== user.id) {
      throw new Error('Bu talebi iptal etme yetkiniz yok.')
    }
  }

  return data
}

// ─── AFTER CHANGE HOOK – DUTY SCHEDULE GÜNCELLEMESİ ────────────────────
export const swapAfterChange: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  // Sadece status "approved" ise ve create veya update işlemiyle onaylandıysa
  if (doc.status === 'approved' && (operation === 'create' || operation === 'update')) {
    const { requesterDuty, targetDuty, requesterPersonnel, targetPersonnel, type } = doc

    if (type === 'mutual') {
      // Karşılıklı: her iki nöbetin personelini değiştir
      await req.payload.update({
        collection: 'duty_schedule',
        id: requesterDuty,
        data: { personnel: targetPersonnel },
        user: req.user,
      })
      await req.payload.update({
        collection: 'duty_schedule',
        id: targetDuty,
        data: { personnel: requesterPersonnel },
        user: req.user,
      })
    } else if (type === 'unilateral') {
      // Karşılıksız: sadece requesterDuty'yi hedef personel ile değiştir
      await req.payload.update({
        collection: 'duty_schedule',
        id: requesterDuty,
        data: { personnel: targetPersonnel },
        user: req.user,
      })
      // targetDuty'de değişiklik yapılmaz (karşılıksız)
    }

    // İsteğe bağlı: log veya bildirim ekleyebilirsiniz
  }
}
