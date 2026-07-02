import { Group } from '@/payload-types'
import { Access } from 'payload'
import { personnelIsAdmin, personnelIsAdminOrIsChief, personnelIsMember } from './helpers'

export const GroupChief: Access = ({ req }) => {
  if (!req.user) return false
  else if (personnelIsAdmin({ personnel: req.user })) return true
  else if (personnelIsMember({ personnel: req.user })) return false
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
  if (personnelIsAdminOrIsChief({ personnel: req.user })) return true

  return {
    aktif: {
      equals: true,
    },
  }
}
