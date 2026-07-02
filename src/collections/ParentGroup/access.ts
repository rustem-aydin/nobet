import { Access } from 'payload'
import { personnelIsAdmin } from '../Personnel/helpers'

export const isAdmin: Access = ({ req }) => {
  if (!req.user) return false
  if (personnelIsAdmin({ personnel: req.user })) return true
  return false
}
