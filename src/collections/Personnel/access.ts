import { Group } from '@/payload-types'
import { Access } from 'payload'

export const GroupChief: Access = ({ req }) => {
  if (!req.user) return false
  else if (req.user.role === 'admin') return true
  else if (req.user.role === 'member') return false
  const userGroupId = (req.user.group as Group)?.id || req.user.group
  if (!userGroupId) return false
  return {
    'group.id': {
      equals: userGroupId,
    },
  }
}

export const canRead: Access = async ({ req }) => {
  if (!req.user) return false
  if (req.user.role === 'admin' || req.user.role === 'chief') return true

  return {
    aktif: {
      equals: true,
    },
  }
}
