import type { ReactNode } from 'react'
import { Annotation } from '@/components/Annotation'
import { cn } from '@/lib/cn'

/**
 * Compact dashboard panel: a thin bordered card with a tight header row
 * (small uppercase label + optional right-aligned meta). Enterprise-analytics density.
 */
export function OpsSection({
  title,
  meta,
  annotationId,
  className,
  children,
}: {
  title: string
  meta?: ReactNode
  annotationId?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section className={cn('rounded-xl border border-masala-200 bg-white', className)}>
      <div className="flex items-center gap-2 border-b border-masala-100 px-4 py-2.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{title}</h2>
        {annotationId && <Annotation id={annotationId} />}
        {meta && <div className="ml-auto text-[11px] font-medium text-ink-faint">{meta}</div>}
      </div>
      <div className="p-4">{children}</div>
    </section>
  )
}
