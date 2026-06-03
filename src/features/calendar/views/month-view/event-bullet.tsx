import { cva } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { transition } from '@/features/calendar/animations'

const eventBulletVariants = cva('size-2 rounded-full', {
  variants: {
    color: {
      blue: 'bg-blue-600 dark:bg-blue-500',
      green: 'bg-green-600 dark:bg-green-500',
      red: 'bg-red-600 dark:bg-red-500',
      yellow: 'bg-yellow-600 dark:bg-yellow-500',
      purple: 'bg-purple-600 dark:bg-purple-500',
      orange: 'bg-orange-600 dark:bg-orange-500',
      gray: 'bg-gray-600 dark:bg-gray-500',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
})

// Hex mi yoksa renk anahtarı mı kontrolü
const isHexColor = (color: string): boolean => /^#([0-9A-F]{3}){1,2}$/i.test(color)

export function EventBullet({ color, className }: { color: string; className?: string }) {
  const isHex = isHexColor(color)

  return (
    <motion.div
      className={cn(
        !isHex && eventBulletVariants({ color: color as any }),
        isHex && 'bg-current',
        className,
      )}
      style={isHex ? { backgroundColor: color } : undefined}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.2 }}
      transition={transition}
    />
  )
}
