import { BadgeCheck, Clock } from 'lucide-react'
import { cn } from '@/lib/cn'

/** The signature "Zomato Verified Ingredients" tag. */
export function VerifiedBadge({
  verified,
  size = 'md',
  className,
}: {
  verified: boolean
  size?: 'sm' | 'md'
  className?: string
}) {
  if (!verified) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full bg-ghee-50 font-semibold text-ghee-700',
          size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
          className,
        )}
      >
        <Clock className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
        Verification in progress
      </span>
    )
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-emerald-50 font-semibold text-emerald-700 ring-1 ring-emerald-600/20',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        className,
      )}
    >
      <BadgeCheck className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      Verified Ingredients
    </span>
  )
}
