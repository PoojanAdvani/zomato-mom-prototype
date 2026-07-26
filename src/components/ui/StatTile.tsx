import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface StatTileProps {
  label: string
  value: ReactNode
  sub?: ReactNode
  icon?: ReactNode
  tone?: 'default' | 'good' | 'warn' | 'bad'
  className?: string
}

const toneStyles = {
  default: 'text-ink',
  good: 'text-emerald-600',
  warn: 'text-ghee-600',
  bad: 'text-zomato-600',
}

export function StatTile({ label, value, sub, icon, tone = 'default', className }: StatTileProps) {
  return (
    <div className={cn('card p-4', className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">{label}</p>
        {icon && <span className="text-ink-faint">{icon}</span>}
      </div>
      <p className={cn('mt-1 text-2xl font-bold tabular-nums', toneStyles[tone])}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-faint">{sub}</p>}
    </div>
  )
}
