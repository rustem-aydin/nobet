import type { CollectionAfterChangeHook } from 'payload'

export const createDefaultDutyTypes: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === 'create') {
    const groupId = doc.id
    const payload = req.payload

    const templates = [
      {
        name: 'Pazartesi Nöbeti',
        group: groupId,
        color: '#3C93FA',
        columnOrder: 1,
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2026,
        cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
      },
      {
        name: 'Salı Nöbeti',
        group: groupId,
        color: '#9151B8',
        columnOrder: 2,
        priority: 8,
        sortOrder: 'normal' as const,
        year: 2026,
        cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
      },
      {
        name: 'Çarşamba Nöbeti',
        group: groupId,
        color: '#FF57B0',
        columnOrder: 3,
        priority: 7,
        sortOrder: 'normal' as const,
        year: 2026,
        cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        columnOrder: 4,
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2026,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        columnOrder: 5,
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2026,
        cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        columnOrder: 6,
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2026,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        columnOrder: 7,
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2026,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        columnOrder: 8,
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2026,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 23 4 *', description: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı' },
          { cron: '0 0 1 5 *', description: '1 Mayıs Emek ve Dayanışma Günü' },
          {
            cron: '0 0 19 5 *',
            description: "19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı",
          },
          { cron: '0 0 15 7 *', description: '15 Temmuz Demokrasi ve Millî Birlik Günü' },
          { cron: '0 0 30 8 *', description: '30 Ağustos Zafer Bayramı' },
          { cron: '0 0 29 10 *', description: '29 Ekim Cumhuriyet Bayramı' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        columnOrder: 9,
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2026,
        cronSchedules: [
          { cron: '0 0 17 3 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 18 3 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 19 3 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 24 5 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 25 5 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 26 5 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 27 5 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
    ]

    for (const template of templates) {
      await payload.create({
        collection: 'duty_types',
        draft: false,
        req,
        data: template,
      })
    }
  }
}
