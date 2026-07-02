import { Group } from '@/payload-types'
import { Access } from 'payload'
import { personnelIsAdmin, personnelIsChief, personnelIsMember } from '../Personnel/helpers'

export const canRead: Access = async ({ req }) => {
  return Boolean(req.user)
}

export const GroupChief: Access = ({ req }) => {
  if (!req.user) return false
  else if (personnelIsAdmin({ personnel: req.user })) return true
  else if (personnelIsChief({ personnel: req.user })) return true
  else if (personnelIsMember({ personnel: req.user })) return false
  const userGroupId = (req.user.group as Group)?.id || req.user.group
  if (!userGroupId) return false
  return {
    'personnel.group.id': {
      equals: userGroupId,
    },
  }
}
