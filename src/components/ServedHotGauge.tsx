import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * The "Served Hot" temperature promise, visualized.
 * Shows a live temperature with rising steam while the food is hot.
 */
export function ServedHotGauge({
  temperature,
  delivered,
}: {
  temperature: number
  delivered: boolean
}) {
  const hot = temperature >= 60
  // gauge fill 40°C..90°C mapped to 0..100%
  const pct = Math.max(0, Math.min(100, ((temperature - 40) / 50) * 100))

  return (
    <div className="flex items-center gap-4">
      {/* Bowl + steam */}
      <div className="relative flex h-16 w-16 items-center justify-center">
        {hot && (
          <div className="absolute -top-1 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-4 w-1 rounded-full bg-ink-faint/40"
                animate={{ opacity: [0, 0.6, 0], y: [0, -14], scaleX: [1, 1.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
        <span className="text-4xl">🍲</span>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-ink">
            {delivered ? 'Served hot ✓' : 'Temperature'}
          </p>
          <span
            className={cn(
              'flex items-center gap-1 text-sm font-bold tabular-nums',
              hot ? 'text-zomato' : 'text-sky-600',
            )}
          >
            <Flame className={cn('h-4 w-4', hot ? 'fill-zomato/20' : 'opacity-40')} />
            {Math.round(temperature)}°C
          </span>
        </div>

        {/* Gauge bar */}
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-masala-200">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-ghee via-zomato-400 to-zomato"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-ink-faint">
          {hot
            ? 'Insulated packaging keeps it above 60°C, end-to-end.'
            : 'Reheat suggested.'}
        </p>
      </div>
    </div>
  )
}
