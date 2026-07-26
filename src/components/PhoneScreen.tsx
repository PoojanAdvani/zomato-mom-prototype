import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/cn'

/** Animated wrapper for a single phone screen. */
export function PhoneScreen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={cn('flex min-h-full flex-col', className)}
    >
      {children}
    </motion.div>
  )
}

/** Sticky in-app header for phone screens. */
export function PhoneHeader({
  title,
  subtitle,
  back,
  right,
  tint = 'light',
}: {
  title: ReactNode
  subtitle?: ReactNode
  back?: boolean
  right?: ReactNode
  tint?: 'light' | 'brand'
}) {
  const navigate = useNavigate()
  return (
    <div
      className={cn(
        'sticky top-0 z-20 flex items-center gap-2 px-4 py-3',
        tint === 'brand'
          ? 'bg-zomato text-white'
          : 'border-b border-masala-200 bg-masala-50/90 text-ink backdrop-blur',
      )}
    >
      {back && (
        <button
          onClick={() => navigate(-1)}
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
            tint === 'brand' ? 'bg-white/15 hover:bg-white/25' : 'bg-white shadow-card hover:bg-masala-100',
          )}
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-bold leading-tight">{title}</h1>
        {subtitle && (
          <p className={cn('truncate text-xs', tint === 'brand' ? 'text-white/80' : 'text-ink-faint')}>
            {subtitle}
          </p>
        )}
      </div>
      {right}
    </div>
  )
}
