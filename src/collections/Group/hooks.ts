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
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2026,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },

      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2026,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2026,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 30 12 *', description: 'Cuma' },
          { cron: '0 0 22 4 *', description: 'Cuma' },
          { cron: '0 0 30 4 *', description: 'Cuma' },
          {
            cron: '0 0 18 5 *',
            description: 'Cuma ',
          },
          { cron: '0 0 14 7 *', description: 'Cuma' },
          { cron: '0 0 29 8 *', description: 'Cuma' },
          { cron: '0 0 28 10 *', description: 'Cuma' },
          { cron: '0 0 16 3 *', description: 'Cuma' },
          { cron: '0 0 23 5 *', description: 'Cuma' },
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2026,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2026,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2026,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },

          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          {
            cron: '0 0 19 5 *',
            description: '19 Mayıs',
          },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
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
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2027,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2027,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2027,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 5 3 *', description: 'Cuma' }, // Ramazan Bayramı arifesi
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 12 5 *', description: 'Cuma' }, // Kurban Bayramı arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık (yılbaşı) arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2027,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2027,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2027,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2027,
        cronSchedules: [
          { cron: '0 0 6 3 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 7 3 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 8 3 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 13 5 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 14 5 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 15 5 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 16 5 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2028,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2028,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2028,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 23 2 *', description: 'Cuma' }, // Ramazan Bayramı arifesi
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 1 5 *', description: 'Cuma' }, // Kurban Bayramı arifesi (1 Mayıs ile çakışsa da dahil)
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2028,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2028,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2028,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2028,
        cronSchedules: [
          { cron: '0 0 24 2 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 25 2 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 26 2 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 2 5 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 3 5 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 4 5 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 5 5 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2029,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2029,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2029,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 12 2 *', description: 'Cuma' }, // Ramazan Bayramı arifesi
          { cron: '0 0 20 4 *', description: 'Cuma' }, // Kurban Bayramı arifesi
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2029,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2029,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2029,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2029,
        cronSchedules: [
          { cron: '0 0 13 2 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 14 2 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 15 2 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 21 4 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 22 4 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 23 4 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 24 4 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2030,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2030,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2030,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 3 2 *', description: 'Cuma' }, // Ramazan Bayramı arifesi
          { cron: '0 0 13 4 *', description: 'Cuma' }, // Kurban Bayramı arifesi
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2030,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2030,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2030,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2030,
        cronSchedules: [
          { cron: '0 0 4 2 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 5 2 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 6 2 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 14 4 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 15 4 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 16 4 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 17 4 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2031,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2031,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2031,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 23 1 *', description: 'Cuma' }, // Ramazan Bayramı arifesi
          { cron: '0 0 2 4 *', description: 'Cuma' }, // Kurban Bayramı arifesi
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2031,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2031,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2031,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2031,
        cronSchedules: [
          { cron: '0 0 24 1 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 25 1 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 26 1 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 3 4 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 4 4 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 5 4 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 6 4 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2032,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2032,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2032,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 12 1 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (12 Ocak)
          { cron: '0 0 22 3 *', description: 'Cuma' }, // Kurban Bayramı arifesi (22 Mart) – düzeltildi
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2032,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2032,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2032,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2032,
        cronSchedules: [
          { cron: '0 0 13 1 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 14 1 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 15 1 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 23 3 *', description: 'Kurban Bayramı 1. Gün' }, // düzeltildi: 23 Mart
          { cron: '0 0 24 3 *', description: 'Kurban Bayramı 2. Gün' }, // 24 Mart
          { cron: '0 0 25 3 *', description: 'Kurban Bayramı 3. Gün' }, // 25 Mart
          { cron: '0 0 26 3 *', description: 'Kurban Bayramı 4. Gün' }, // 26 Mart
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2033,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2033,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2033,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 1 1 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (1 Ocak)
          { cron: '0 0 10 3 *', description: 'Cuma' }, // Kurban Bayramı arifesi (10 Mart)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2033,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2033,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2033,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2033,
        cronSchedules: [
          { cron: '0 0 2 1 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 3 1 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 4 1 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 11 3 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 12 3 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 13 3 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 14 3 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2034,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2034,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2034,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 28 2 *', description: 'Cuma' }, // Kurban Bayramı arifesi (28 Şubat)
          { cron: '0 0 1 3 *', description: 'Cuma' }, // Kurban Bayramı arifesi (1 Mart) — 4 günlük bayramın 1. günü öncesi
          { cron: '0 0 31 12 *', description: 'Cuma' }, // 1 Ocak arifesi (31 Aralık 2033)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 11 12 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (11 Aralık)
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2034,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2034,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2034,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2034,
        cronSchedules: [
          { cron: '0 0 1 3 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 2 3 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 3 3 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 4 3 *', description: 'Kurban Bayramı 4. Gün' },
          { cron: '0 0 12 12 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 13 12 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 14 12 *', description: 'Ramazan Bayramı 3. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2035,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2035,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2035,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 14 2 *', description: 'Cuma' }, // Kurban Bayramı arifesi (14 Şubat)
          { cron: '0 0 31 12 *', description: 'Cuma' }, // 1 Ocak arifesi (31 Aralık 2034)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 30 11 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (30 Kasım)
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2035,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2035,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2035,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2035,
        cronSchedules: [
          { cron: '0 0 15 2 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 16 2 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 17 2 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 18 2 *', description: 'Kurban Bayramı 4. Gün' },
          { cron: '0 0 1 12 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 2 12 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 3 12 *', description: 'Ramazan Bayramı 3. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2036,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2036,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2036,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 6 2 *', description: 'Cuma' }, // Kurban Bayramı arifesi
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 18 11 *', description: 'Cuma' }, // Ramazan Bayramı arifesi
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2036,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2036,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2036,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2036,
        cronSchedules: [
          { cron: '0 0 19 11 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 20 11 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 21 11 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 7 2 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 8 2 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 9 2 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 10 2 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2037,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2037,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2037,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 26 1 *', description: 'Cuma' }, // Kurban Bayramı arifesi (26 Ocak)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 7 11 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (7 Kasım)
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2037,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2037,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2037,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2037,
        cronSchedules: [
          { cron: '0 0 27 1 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 28 1 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 29 1 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 30 1 *', description: 'Kurban Bayramı 4. Gün' },
          { cron: '0 0 8 11 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 9 11 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 10 11 *', description: 'Ramazan Bayramı 3. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2038,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2038,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2038,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 15 1 *', description: 'Cuma' }, // Kurban Bayramı arifesi (15 Ocak)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim + Ramazan Bayramı arifesi (aynı gün)
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2038,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2038,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2038,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2038,
        cronSchedules: [
          { cron: '0 0 16 1 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 17 1 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 18 1 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 19 1 *', description: 'Kurban Bayramı 4. Gün' },
          { cron: '0 0 29 10 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 30 10 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 31 10 *', description: 'Ramazan Bayramı 3. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2039,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2039,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2039,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 5 1 *', description: 'Cuma' }, // Kurban Bayramı arifesi (İlk, 5 Ocak)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 18 10 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (18 Ekim)
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 25 12 *', description: 'Cuma' }, // Kurban Bayramı arifesi (İkinci, 25 Aralık)
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2039,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2039,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2039,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2039,
        cronSchedules: [
          { cron: '0 0 6 1 *', description: 'Kurban Bayramı 1. Gün (İlk)' },
          { cron: '0 0 7 1 *', description: 'Kurban Bayramı 2. Gün (İlk)' },
          { cron: '0 0 8 1 *', description: 'Kurban Bayramı 3. Gün (İlk)' },
          { cron: '0 0 9 1 *', description: 'Kurban Bayramı 4. Gün (İlk)' },
          { cron: '0 0 19 10 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 20 10 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 21 10 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 26 12 *', description: 'Kurban Bayramı 1. Gün (İkinci)' },
          { cron: '0 0 27 12 *', description: 'Kurban Bayramı 2. Gün (İkinci)' },
          { cron: '0 0 28 12 *', description: 'Kurban Bayramı 3. Gün (İkinci)' },
          { cron: '0 0 29 12 *', description: 'Kurban Bayramı 4. Gün (İkinci)' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2040,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2040,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2040,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 7 10 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (7 Ekim)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 14 12 *', description: 'Cuma' }, // Kurban Bayramı arifesi (14 Aralık)
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2040,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2040,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2040,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2040,
        cronSchedules: [
          { cron: '0 0 8 10 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 9 10 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 10 10 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 15 12 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 16 12 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 17 12 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 18 12 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2041,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2041,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2041,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 26 9 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (26 Eylül)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 3 12 *', description: 'Cuma' }, // Kurban Bayramı arifesi (3 Aralık)
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2041,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2041,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2041,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2041,
        cronSchedules: [
          { cron: '0 0 27 9 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 28 9 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 29 9 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 4 12 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 5 12 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 6 12 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 7 12 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2042,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2042,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2042,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 17 9 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (17 Eylül)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 22 11 *', description: 'Cuma' }, // Kurban Bayramı arifesi (22 Kasım)
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2042,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2042,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2042,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2042,
        cronSchedules: [
          { cron: '0 0 18 9 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 19 9 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 20 9 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 23 11 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 24 11 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 25 11 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 26 11 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2043,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2043,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2043,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 5 9 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (5 Eylül)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 11 10 *', description: 'Cuma' }, // Kurban Bayramı arifesi (11 Ekim)
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2043,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2043,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2043,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2043,
        cronSchedules: [
          { cron: '0 0 6 9 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 7 9 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 8 9 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 12 10 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 13 10 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 14 10 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 15 10 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2044,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2044,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2044,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 24 8 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (24 Ağustos)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 31 10 *', description: 'Cuma' }, // Kurban Bayramı arifesi (31 Ekim)
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2044,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2044,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2044,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2044,
        cronSchedules: [
          { cron: '0 0 25 8 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 26 8 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 27 8 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 1 11 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 2 11 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 3 11 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 4 11 *', description: 'Kurban Bayramı 4. Gün' },
        ],
      },
      {
        name: 'Günlük Nöbet',
        group: groupId,
        color: '#3C93FA',
        priority: 10,
        sortOrder: 'normal' as const,
        year: 2045,
        cronSchedules: [
          { cron: '0 0 * * 1', description: 'Pazartesi' },
          { cron: '0 0 * * 2', description: 'Salı' },
          { cron: '0 0 * * 3', description: 'Çarşamba' },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        priority: 6,
        sortOrder: 'normal' as const,
        year: 2045,
        cronSchedules: [{ cron: '0 0 * * 4', description: 'Perşembe' }],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        priority: 3,
        sortOrder: 'reverse' as const,
        year: 2045,
        cronSchedules: [
          { cron: '0 0 * * 5', description: 'Cuma' },
          { cron: '0 0 14 8 *', description: 'Cuma' }, // Ramazan Bayramı arifesi (14 Ağustos)
          { cron: '0 0 22 4 *', description: 'Cuma' }, // 23 Nisan arifesi
          { cron: '0 0 30 4 *', description: 'Cuma' }, // 1 Mayıs arifesi
          { cron: '0 0 18 5 *', description: 'Cuma' }, // 19 Mayıs arifesi
          { cron: '0 0 14 7 *', description: 'Cuma' }, // 15 Temmuz arifesi
          { cron: '0 0 29 8 *', description: 'Cuma' }, // 30 Ağustos arifesi
          { cron: '0 0 19 10 *', description: 'Cuma' }, // Kurban Bayramı arifesi (19 Ekim)
          { cron: '0 0 28 10 *', description: 'Cuma' }, // 29 Ekim arifesi
          { cron: '0 0 30 12 *', description: 'Cuma' }, // 31 Aralık arifesi
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        priority: 4,
        sortOrder: 'normal' as const,
        year: 2045,
        cronSchedules: [{ cron: '0 0 * * 6', description: 'Cumartesi' }],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        priority: 5,
        sortOrder: 'reverse' as const,
        year: 2045,
        cronSchedules: [{ cron: '0 0 * * 0', description: 'Pazar' }],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        priority: 2,
        sortOrder: 'reverse' as const,
        year: 2045,
        cronSchedules: [
          { cron: '0 0 1 1 *', description: 'Yılbaşı (1 Ocak)' },
          { cron: '0 0 31 12 *', description: 'Yılbaşı (31 Aralık)' },
          { cron: '0 0 23 4 *', description: '23 Nisan' },
          { cron: '0 0 1 5 *', description: '1 Mayıs' },
          { cron: '0 0 19 5 *', description: '19 Mayıs' },
          { cron: '0 0 15 7 *', description: '15 Temmuz' },
          { cron: '0 0 30 8 *', description: '30 Ağustos' },
          { cron: '0 0 29 10 *', description: '29 Ekim' },
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        priority: 1,
        sortOrder: 'normal' as const,
        year: 2045,
        cronSchedules: [
          { cron: '0 0 15 8 *', description: 'Ramazan Bayramı 1. Gün' },
          { cron: '0 0 16 8 *', description: 'Ramazan Bayramı 2. Gün' },
          { cron: '0 0 17 8 *', description: 'Ramazan Bayramı 3. Gün' },
          { cron: '0 0 20 10 *', description: 'Kurban Bayramı 1. Gün' },
          { cron: '0 0 21 10 *', description: 'Kurban Bayramı 2. Gün' },
          { cron: '0 0 22 10 *', description: 'Kurban Bayramı 3. Gün' },
          { cron: '0 0 23 10 *', description: 'Kurban Bayramı 4. Gün' },
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
