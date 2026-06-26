import type { CollectionAfterChangeHook } from 'payload'

export const createDefaultDutyTypes: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === 'create') {
    const groupId = doc.id
    const payload = req.payload // veya global payload instance

    const templates = [
      {
        name: 'Pazartesi Nöbeti',
        group: groupId,
        color: '#3C93FA',
        columnOrder: 1,
        priority: 10,
        sortOrder: 'normal',
        yearConfigs: [
          {
            year: 2026,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2027,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2028,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2029,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2030,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2031,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2032,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2033,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2034,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2035,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2036,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2037,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2038,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2039,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2040,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2041,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2042,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2043,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2044,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2045,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2046,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2047,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2048,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2049,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
          {
            year: 2050,
            cronSchedules: [{ cron: '0 0 * * 1', description: 'Her Pazartesi' }],
          },
        ],
      },
      {
        name: 'Salı Nöbeti',
        group: groupId,
        color: '#9151B8',
        columnOrder: 2,
        priority: 8,
        sortOrder: 'normal',
        yearConfigs: [
          {
            year: 2026,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2027,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2028,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2029,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2030,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2031,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2032,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2033,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2034,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2035,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2036,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2037,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2038,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2039,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2040,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2041,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2042,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2043,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2044,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2045,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2046,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2047,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2048,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2049,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
          {
            year: 2050,
            cronSchedules: [{ cron: '0 0 * * 2', description: 'Her Salı' }],
          },
        ],
      },
      {
        name: 'Çarşamba Nöbeti',
        group: groupId,
        color: '#FF57B0',
        columnOrder: 3,
        priority: 7,
        sortOrder: 'normal',
        yearConfigs: [
          {
            year: 2026,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2027,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2028,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2029,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2030,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2031,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2032,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2033,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2034,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2035,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2036,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2037,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2038,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2039,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2040,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2041,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2042,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2043,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2044,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2045,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2046,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2047,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2048,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2049,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
          {
            year: 2050,
            cronSchedules: [{ cron: '0 0 * * 3', description: 'Her Çarşamba' }],
          },
        ],
      },
      {
        name: 'Perşembe Nöbeti',
        group: groupId,
        color: '#FF8F5C',
        columnOrder: 4,
        priority: 6,
        sortOrder: 'normal',
        yearConfigs: [
          {
            year: 2026,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2027,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2028,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2029,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2030,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2031,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2032,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2033,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2034,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2035,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2036,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2037,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2038,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2039,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2040,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2041,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2042,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2043,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2044,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2045,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2046,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2047,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2048,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2049,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
          {
            year: 2050,
            cronSchedules: [{ cron: '0 0 * * 4', description: 'Her Perşembe' }],
          },
        ],
      },
      {
        name: 'Cuma Nöbeti',
        group: groupId,
        color: '#1DBD8E',
        columnOrder: 5,
        priority: 3,
        sortOrder: 'reverse',
        yearConfigs: [
          {
            year: 2026,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2027,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2028,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2029,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2030,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2031,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2032,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2033,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2034,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2035,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2036,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2037,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2038,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2039,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2040,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2041,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2042,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2043,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2044,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2045,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2046,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2047,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2048,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2049,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
          {
            year: 2050,
            cronSchedules: [{ cron: '0 0 * * 5', description: 'Her Cuma' }],
          },
        ],
      },
      {
        name: 'Cumartesi Nöbeti',
        group: groupId,
        color: '#F24F4F',
        columnOrder: 6,
        priority: 4,
        sortOrder: 'normal',
        yearConfigs: [
          {
            year: 2026,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2027,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2028,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2029,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2030,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2031,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2032,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2033,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2034,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2035,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2036,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2037,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2038,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2039,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2040,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2041,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2042,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2043,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2044,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2045,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2046,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2047,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2048,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2049,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
          {
            year: 2050,
            cronSchedules: [{ cron: '0 0 * * 6', description: 'Her Cumartesi' }],
          },
        ],
      },
      {
        name: 'Pazar Nöbeti',
        group: groupId,
        color: '#3C93FA',
        columnOrder: 7,
        priority: 5,
        sortOrder: 'reverse',
        yearConfigs: [
          {
            year: 2026,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2027,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2028,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2029,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2030,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2031,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2032,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2033,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2034,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2035,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2036,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2037,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2038,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2039,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2040,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2041,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2042,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2043,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2044,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2045,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2046,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2047,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2048,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2049,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
          {
            year: 2050,
            cronSchedules: [{ cron: '0 0 * * 0', description: 'Her Pazar' }],
          },
        ],
      },
      {
        name: 'Millî Bayram Nöbeti',
        group: groupId,
        color: '#004C94',
        columnOrder: 8,
        priority: 2,
        sortOrder: 'reverse',
        yearConfigs: [
          {
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
            year: 2027,
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
            year: 2028,
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
            year: 2029,
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
            year: 2030,
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
            year: 2031,
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
            year: 2032,
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
            year: 2033,
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
            year: 2034,
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
            year: 2035,
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
            year: 2036,
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
            year: 2037,
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
            year: 2038,
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
            year: 2039,
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
            year: 2040,
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
            year: 2041,
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
            year: 2042,
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
            year: 2043,
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
            year: 2044,
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
            year: 2045,
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
            year: 2046,
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
            year: 2047,
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
            year: 2048,
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
            year: 2049,
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
            year: 2050,
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
        ],
      },
      {
        name: 'Dini Bayram Nöbeti',
        group: groupId,
        color: '#0FA69D',
        columnOrder: 9,
        priority: 1,
        sortOrder: 'normal',
        yearConfigs: [
          {
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
            year: 2028,
            cronSchedules: [
              { cron: '0 0 23 2 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 24 2 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 25 2 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 1 5 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 2 5 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 3 5 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 4 5 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2029,
            cronSchedules: [
              { cron: '0 0 12 2 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 13 2 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 14 2 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 20 4 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 21 4 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 22 4 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 23 4 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2030,
            cronSchedules: [
              { cron: '0 0 1 2 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 2 2 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 3 2 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 9 4 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 10 4 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 11 4 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 12 4 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2031,
            cronSchedules: [
              { cron: '0 0 21 1 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 22 1 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 23 1 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 29 3 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 30 3 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 31 3 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 1 4 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2032,
            cronSchedules: [
              { cron: '0 0 9 1 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 10 1 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 11 1 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 17 3 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 18 3 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 19 3 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 20 3 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2033,
            cronSchedules: [
              { cron: '0 0 29 12 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 30 12 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 31 12 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 6 3 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 7 3 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 8 3 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 9 3 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2034,
            cronSchedules: [
              { cron: '0 0 18 12 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 19 12 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 20 12 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 25 2 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 26 2 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 27 2 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 28 2 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2035,
            cronSchedules: [
              { cron: '0 0 7 12 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 8 12 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 9 12 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 14 2 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 15 2 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 16 2 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 17 2 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2036,
            cronSchedules: [
              { cron: '0 0 26 11 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 27 11 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 28 11 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 3 2 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 4 2 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 5 2 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 6 2 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2037,
            cronSchedules: [
              { cron: '0 0 15 11 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 16 11 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 17 11 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 23 1 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 24 1 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 25 1 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 26 1 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2038,
            cronSchedules: [
              { cron: '0 0 4 11 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 5 11 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 6 11 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 12 1 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 13 1 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 14 1 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 15 1 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2039,
            cronSchedules: [
              { cron: '0 0 24 10 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 25 10 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 26 10 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 1 1 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 2 1 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 3 1 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 4 1 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2040,
            cronSchedules: [
              { cron: '0 0 12 10 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 13 10 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 14 10 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 20 12 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 21 12 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 22 12 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 23 12 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2041,
            cronSchedules: [
              { cron: '0 0 1 10 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 2 10 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 3 10 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 9 12 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 10 12 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 11 12 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 12 12 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2042,
            cronSchedules: [
              { cron: '0 0 20 9 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 21 9 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 22 9 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 28 11 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 29 11 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 30 11 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 1 12 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2043,
            cronSchedules: [
              { cron: '0 0 9 9 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 10 9 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 11 9 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 17 11 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 18 11 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 19 11 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 20 11 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2044,
            cronSchedules: [
              { cron: '0 0 28 8 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 29 8 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 30 8 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 5 11 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 6 11 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 7 11 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 8 11 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2045,
            cronSchedules: [
              { cron: '0 0 17 8 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 18 8 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 19 8 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 25 10 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 26 10 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 27 10 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 28 10 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2046,
            cronSchedules: [
              { cron: '0 0 6 8 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 7 8 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 8 8 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 14 10 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 15 10 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 16 10 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 17 10 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2047,
            cronSchedules: [
              { cron: '0 0 26 7 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 27 7 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 28 7 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 3 10 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 4 10 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 5 10 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 6 10 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2048,
            cronSchedules: [
              { cron: '0 0 14 7 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 15 7 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 16 7 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 21 9 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 22 9 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 23 9 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 24 9 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2049,
            cronSchedules: [
              { cron: '0 0 3 7 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 4 7 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 5 7 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 10 9 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 11 9 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 12 9 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 13 9 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
          {
            year: 2050,
            cronSchedules: [
              { cron: '0 0 22 6 *', description: 'Ramazan Bayramı 1. Gün' },
              { cron: '0 0 23 6 *', description: 'Ramazan Bayramı 2. Gün' },
              { cron: '0 0 24 6 *', description: 'Ramazan Bayramı 3. Gün' },
              { cron: '0 0 30 8 *', description: 'Kurban Bayramı 1. Gün' },
              { cron: '0 0 31 8 *', description: 'Kurban Bayramı 2. Gün' },
              { cron: '0 0 1 9 *', description: 'Kurban Bayramı 3. Gün' },
              { cron: '0 0 2 9 *', description: 'Kurban Bayramı 4. Gün' },
            ],
          },
        ],
      },
    ]

    for (const template of templates) {
      await payload.create({
        collection: 'duty_types',
        draft: false,
        req,
        data: {
          name: template.name,
          color: template.color,
          columnOrder: template.columnOrder,
          priority: template.priority,
          sortOrder: template.sortOrder as 'normal' | 'reverse',
          isActive: true,
          group: groupId,
          yearConfigs: template.yearConfigs,
        },
      })
    }
  }
}
