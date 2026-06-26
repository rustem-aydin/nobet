import { Group } from '@/payload-types'
import { Access } from 'payload'

export const canRead: Access = async ({ req }) => {
  return Boolean(req.user)
}

export const GroupChief: Access = ({ req }) => {
  if (!req.user) return false
  else if (req.user.role === 'admin') return true
  else if (req.user.role === 'chief') return true
  else if (req.user.role === 'member') return false
  const userGroupId = (req.user.group as Group)?.id || req.user.group
  if (!userGroupId) return false
  return {
    'personnel.group.id': {
      equals: userGroupId,
    },
  }
}
