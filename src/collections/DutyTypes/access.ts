import { Access } from 'payload'

export const isAdmin: Access = ({ req }) => {
  return req.user?.role === 'admin'
}
