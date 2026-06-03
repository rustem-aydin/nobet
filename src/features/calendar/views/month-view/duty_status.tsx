import { Badge } from '@/components/ui/badge'
import { CheckCheck, Clock, X } from 'lucide-react'

const DutyIconStatus = ({ status }: { status: 'approved' | 'pending' | 'rejected' }) => {
  if (status === 'pending') {
    return <Clock size={16} />
  }
  if (status === 'approved') {
    return <CheckCheck size={16} />
  } else {
    return <X size={16} />
  }
}

export default DutyIconStatus

export const DutyStatus = ({ status }: { status: 'approved' | 'pending' | 'rejected' }) => {
  if (status === 'pending') {
    return (
      <Badge className="bg-amber-400 ">
        <DutyIconStatus status={status} />
        <span>Bekleniyor</span>
      </Badge>
    )
  }
  if (status === 'approved') {
    return (
      <Badge className="bg-green-400 ">
        <DutyIconStatus status={status} />
        <span>Onaylandı</span>
      </Badge>
    )
  } else {
    return (
      <Badge className="bg-red-400 ">
        <DutyIconStatus status={status} />
        <span>Reddedildi</span>
      </Badge>
    )
  }
}
