import { Group, Personnel } from '@/payload-types'
import type { Access, FieldAccess, Where } from 'payload'
import { personnelIsAdmin, personnelIsChief, personnelIsMember } from '../Personnel/helpers'

const getUserGroupId = (user: any): string | undefined => {
  return (user.group as Group)?.id || user.group
}

const getUserPersonnelId = (user: any): string | undefined => {
  return (user.personnel as Personnel)?.id || user.personnel || user.id
}

export const canRead: Access = async ({ req }) => {
  if (!req.user) return false
  if (personnelIsAdmin({ personnel: req.user })) return true

  // ✅ DOĞRU KULLANIM (Aynı dosyadaki helper fonksiyonu kullan)
  const userGroupId = getUserGroupId(req.user)
  if (!userGroupId) return false // Eğer grup yoksa hiçbir şey gösterme

  return {
    'personnel.group.id': {
      equals: userGroupId,
    },
  }
}
// ============================================
// CREATE - Herkes sadece kendi adına
// ============================================
export const canCreate: Access = ({ req, data }) => {
  if (!req.user) return false
  if (personnelIsAdmin({ personnel: req.user })) return true

  const userPersonnelId = getUserPersonnelId(req.user)

  if (!userPersonnelId) return false

  if (data?.personnel && data.personnel !== userPersonnelId) {
    return false
  }

  return true
}
// ============================================
// UPDATE - Member sadece kendi, Chief sadece status
// ============================================
export const canUpdate: Access = async ({ req, data, id }) => {
  if (!req.user) return false
  if (personnelIsAdmin({ personnel: req.user })) return true

  const userPersonnelId = getUserPersonnelId(req.user)
  if (!userPersonnelId) return false

  // Chief: Sadece status alanını güncelleyebilir
  if (personnelIsChief({ personnel: req.user })) {
    // data'da sadece status varsa ve başka alan yoksa izin ver
    if (data) {
      const allowedFields = ['status', 'id', 'updatedAt', 'createdAt']
      const dataKeys = Object.keys(data)
      const hasDisallowedFields = dataKeys.some((key) => !allowedFields.includes(key))

      if (hasDisallowedFields) {
        return false
      }
    }

    // Chief kendi grubundakilerin status'unu güncelleyebilir
    const userGroupId = getUserGroupId(req.user)
    if (!userGroupId) return false

    const where: Where = {
      'personnel.group.id': { equals: userGroupId },
    }
    return where
  }
  if (personnelIsMember({ personnel: req.user })) {
    if (data) {
      const allowedFields = ['status']
      const dataKeys = Object.keys(data)
      const hasDisallowedFields = dataKeys.some((key) => allowedFields.includes(key))

      if (hasDisallowedFields) {
        return false
      }
    }
  }
  // Member: Sadece kendi kayıtlarını güncelle
  const where: Where = {
    'personnel.id': { equals: userPersonnelId },
  }
  return where
}

// ============================================
// DELETE - Herkes sadece kendi
// ============================================
export const canDelete: Access = async ({ req, id }) => {
  if (!req.user) return false
  if (personnelIsAdmin({ personnel: req.user })) return true

  const userPersonnelId = getUserPersonnelId(req.user)
  if (!userPersonnelId) return false

  // Chief ve Member: Sadece kendi kayıtlarını sil
  const where: Where = {
    'personnel.id': { equals: userPersonnelId },
  }
  return where
}
// ============================================
// PERSONNEL FIELD ACCESS
// ============================================

// ============================================
// STATUS FIELD ACCESS
// ============================================

export const statusCreateAccess: FieldAccess = ({ req, data, siblingData }) => {
  if (!req.user) return false
  if (personnelIsAdmin({ personnel: req.user })) return true
  // Herkes create'te set edebilir (default pending)
  return true
}

export const statusReadAccess: FieldAccess = ({ req, id, doc, siblingData }) => {
  if (!req.user) return false
  // Herkes okuyabilir
  return true
}

export const statusUpdateAccess: FieldAccess = ({ req }) => {
  if (!req.user) return false
  if (personnelIsAdmin({ personnel: req.user })) return true
  if (personnelIsChief({ personnel: req.user })) return true
  if (personnelIsMember({ personnel: req.user })) return false
  return false
}
