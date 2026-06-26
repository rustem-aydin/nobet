import { Group } from '@/payload-types'
import { Access } from 'payload'

export const canRead: Access = async ({ req }) => {
  if (!req.user) return false
  if (req.user.role === 'admin') return true

  // 1. Kullanıcının grup ID'sini al (string veya number fark etmez)
  const userGroupId = (req.user.group as Group)?.id || req.user.group
  if (!userGroupId) return false

  // 3. Sadece bu personellere ait duty_exceptions kayıtlarını göster
  return {
    'personnel.group.id': {
      equals: userGroupId,
    },
  }
}

export const GroupChief: Access = ({ req }) => {
  if (!req.user) return false
  else if (req.user.role === 'admin') return true
  else if (req.user.role === 'member') return false
  const userGroupId = (req.user.group as Group)?.id || req.user.group
  if (!userGroupId) return false
  return {
    'personnel.group.id': {
      equals: userGroupId,
    },
  }
}
