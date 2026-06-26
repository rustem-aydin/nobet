'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { DutyType, Group } from '@/payload-types'
import { getAuth } from '@/collections/Personnel/actions/auth'
import { sql } from 'drizzle-orm'

export const getAllDutyTypes = async (
  depth: number = 0,
  year: number = new Date().getFullYear(),
): Promise<DutyType[]> => {
  console.time('getAuth')
  const auth = await getAuth()
  const groupId = (auth.group as Group).id
  console.timeEnd('getAuth')

  console.time('getPayload')
  const payload = await getPayload({ config })
  console.timeEnd('getPayload')

  const db = (payload.db as any).drizzle
  if (!db) {
    throw new Error(
      'Drizzle instance not available. Make sure you are using @payloadcms/db-postgres',
    )
  }

  console.time('dbQuery')

  // LATERAL JOIN yerine CTE ile cron schedule'ları önceden aggregate et
  // Sadece ilgili yılın aktif yearConfig'lerinin cron schedule'larını al
  const result = await db.execute(sql`
    WITH cron_agg AS (
      SELECT
        cs._parent_id AS yc_id,
        json_agg(
          json_build_object(
            'id', cs.id,
            'cron', cs.cron,
            'description', cs.description
          ) ORDER BY cs._order
        ) AS schedules
      FROM duty_types_year_configs_cron_schedules cs
      INNER JOIN duty_types_year_configs yc
        ON yc.id = cs._parent_id
      WHERE yc.year = ${year}
        AND yc.is_active = true
      GROUP BY cs._parent_id
    )
    SELECT
      dt.id,
      dt.name,
      dt.group_id AS "group",
      dt.priority,
      dt.column_order AS "columnOrder",
      dt.sort_order AS "sortOrder",
      dt.color,
      dt.is_active AS "isActive",
      dt.updated_at AS "updatedAt",
      dt.created_at AS "createdAt",
      json_build_object(
        'id', yc.id,
        'year', yc.year,
        'cronSchedules', COALESCE(ca.schedules, '[]'::json),
        'isActive', yc.is_active
      ) AS "yearConfig"
    FROM duty_types dt
    INNER JOIN duty_types_year_configs yc
      ON yc._parent_id = dt.id
      AND yc.year = ${year}
      AND yc.is_active = true
    LEFT JOIN cron_agg ca
      ON ca.yc_id = yc.id
    WHERE dt.group_id = ${groupId}
      AND dt.is_active = true
    ORDER BY dt.column_order ASC
  `)
  console.timeEnd('dbQuery')

  const dutyTypes: DutyType[] = result.rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    group: typeof row.group === 'string' ? { id: row.group, relationTo: 'groups' } : row.group,
    // Her duty_type için 1 yıl konfigürasyonu olur (year benzersiz),
    // bu yüzden json_agg yerine tek obje dönüp array'e sarıyoruz
    yearConfigs: row.yearConfig ? [row.yearConfig] : [],
    priority: row.priority,
    columnOrder: row.columnOrder,
    sortOrder: row.sortOrder,
    color: row.color,
    isActive: row.isActive,
    updatedAt: row.updatedAt,
    createdAt: row.createdAt,
  }))

  console.log(`Filtrelenen yıl: ${year}, Bulunan kayıt: ${dutyTypes.length}`)
  return dutyTypes
}
