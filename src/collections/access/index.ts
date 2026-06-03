import type { Access, FieldAccess } from 'payload'

// ==================== COLLECTION-LEVEL ACCESS ====================

// Admin kontrolü
export const isAdmin: Access = ({ req }) => {
  return req.user?.role === 'admin'
}

// Nöbet Kıdemlisi kontrolü
export const isChief: Access = ({ req }) => {
  return req.user?.role === 'chief'
}

// Admin veya Kıdemli kontrolü
export const isAdminOrChief: Access = ({ req }) => {
  return req.user?.role === 'admin' || req.user?.role === 'chief'
}

// Herkes okuyabilir
export const canRead: Access = () => {
  return true
}

// Herkes kendi kaydını oluşturabilir (giriş yapmış olması yeterli)
export const canCreate: Access = ({ req }) => {
  return !!req.user
}

// Herkes kendi kaydını güncelleyebilir, admin/chief her kaydı
export const canUpdate: Access = async ({ req, id }) => {
  if (!req.user) return false
  if (req.user.role === 'admin' || req.user.role === 'chief') return true

  if (id) {
    const doc = await req.payload.findByID({
      collection: 'duty_exceptions',
      id: id as number,
      depth: 0,
    })
    const personnelId =
      typeof doc?.personnel === 'string' ? doc.personnel : (doc?.personnel as any)?.id

    if (personnelId === req.user.id) return true
  }

  return false
}

// Herkes kendi kaydını silebilir, admin/chief her kaydı
export const canDelete: Access = async ({ req, id }) => {
  if (!req.user) return false
  if (req.user.role === 'admin' || req.user.role === 'chief') return true

  if (id) {
    const doc = await req.payload.findByID({
      collection: 'duty_exceptions',
      id: id as number,
      depth: 0,
    })
    const personnelId =
      typeof doc?.personnel === 'string' ? doc.personnel : (doc?.personnel as any)?.id

    if (personnelId === req.user.id) return true
  }

  return false
}

// ==================== FIELD-LEVEL ACCESS ====================

// Sadece admin/chief field'ı değiştirebilir (FieldAccess tipi kullan!)
export const isAdminOrChiefField: FieldAccess = ({ req }) => {
  return req.user?.role === 'admin' || req.user?.role === 'chief'
}

// Sadece admin/chief field'ı oluştururken değiştirebilir
export const isAdminOrChiefFieldCreate: FieldAccess = ({ req }) => {
  return req.user?.role === 'admin' || req.user?.role === 'chief'
}
