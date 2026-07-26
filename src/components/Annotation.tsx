import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lightbulb, X } from 'lucide-react'
import { annotations } from '@/data/annotations'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/lib/cn'

/**
 * A PM rationale pin. Renders only when annotations are toggled on.
 * Click to reveal the product reasoning + the research/metric it ties to.
 */
export function Annotation({ id, className }: { id: string; className?: string }) {
  const annotationsOn = useUIStore((s) => s.annotationsOn)
  const [open, setOpen] = useState(false)
  const data = annotations[id]

  if (!annotationsOn || !data) return null

  return (
    <div className={cn('relative z-30 inline-block', className)}>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setOpen((o) => !o)
        }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-ghee text-white shadow-float ring-2 ring-white"
        aria-label={`Product rationale: ${data.title}`}
      >
        <Lightbulb className="h-4 w-4" />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ghee opacity-40" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              className="absolute left-1/2 z-50 mt-2 w-72 -translate-x-1/2 rounded-2xl bg-ink p-4 text-white shadow-float"
            >
              <div className="mb-1.5 flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 text-ghee-200">
                  <Lightbulb className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">PM Rationale</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm font-semibold leading-snug">{data.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-white/80">{data.body}</p>
              <p className="mt-2 border-t border-white/10 pt-2 text-[11px] font-medium text-ghee-200">
                ↳ {data.source}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
