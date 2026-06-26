import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ReactNode } from 'react'

interface ConfirmDialogProps {
  /** Dialog başlığı (varsayılan: "Emin misiniz?") */
  title?: string
  /** Dialog açıklaması (varsayılan: "Bu işlem geri alınamaz.") */
  description?: string
  /** Onay butonu metni (varsayılan: "Devam Et") */
  confirmText?: string
  /** İptal butonu metni (varsayılan: "İptal") */
  cancelText?: string
  /** Onaylandığında çalışacak fonksiyon */
  onConfirm: () => void
  /** Dialog'u tetikleyecek React elemanı (genellikle bir buton) */
  children: ReactNode
}

export default function ConfirmDialog({
  title = 'Emin misiniz?',
  description = 'Bu işlem geri alınamaz.',
  confirmText = 'Devam Et',
  cancelText = 'İptal',
  onConfirm,
  children,
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
