import { Group, Personnel } from '@/payload-types'

export const personnelIsAdmin = ({ personnel }: { personnel: Personnel }) => {
  return personnel.is_admin
}

export const personnelIsAdminOrIsChief = ({ personnel }: { personnel: Personnel }) => {
  if (personnel.is_admin) return true

  const chief = (personnel.group as Group)?.chief
  if (!chief) return false

  const chiefId = typeof chief === 'object' ? chief.id : chief
  return personnel.id === chiefId
}

export const personnelIsChief = ({ personnel }: { personnel: Personnel }) => {
  const chief = (personnel.group as Group)?.chief
  if (!chief) return false

  const chiefId = typeof chief === 'object' ? chief.id : chief
  return personnel.id === chiefId
}

export const personnelIsMember = ({ personnel }: { personnel: Personnel }) => {
  const chief = ((personnel.group as Group)?.chief as Personnel).id === personnel.id

  if (personnel.is_admin && chief) return true
}
