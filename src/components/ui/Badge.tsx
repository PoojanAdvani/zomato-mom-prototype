import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'green' | 'red' | 'ghee' | 'neutral' | 'blue'

const tones: Record<Tone, string> = {
  green: 'bg-emerald-50 text-emerald-700',
  red: 'bg-zomato-50 text-zomato-700',
  ghee: 'bg-ghee-50 text-ghee-700',
  neutral: 'bg-masala-100 text-ink-soft',
  blue: 'bg-sky-50 text-sky-700',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return <span className={cn('chip', tones[tone], className)}>{children}</span>
}
