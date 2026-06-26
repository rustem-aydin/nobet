import { Access } from 'payload'

export const isAdminOrChief: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'chief'
}

export const canCreateSwap: Access = ({ req: { user } }) => {
  return !!user // her giriş yapmış kullanıcı talep oluşturabilir
}

export const canReadSwap: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin' || user.role === 'chief') return true

  // Sadece kendi taleplerini görebilir
  return {
    or: [
      { requesterPersonnel: { equals: user.id } },
      { targetPersonnel: { equals: user.id } },
      { createdBy: { equals: user.id } },
    ],
  } as any // Geçici cast, Payload tip sorununu aşmak için
}

export const canUpdateSwap: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin' || user.role === 'chief') return true

  // Normal kullanıcı sadece kendi pending talebini iptal edebilir
  return {
    and: [{ createdBy: { equals: user.id } }, { status: { equals: 'pending' } }],
  } as any
}
