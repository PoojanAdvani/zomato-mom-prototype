import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Siren } from 'lucide-react'
import { Slider } from '@/components/ui/Slider'
import { AUDIT_THRESHOLD_PCT, formatNum } from '@/data/metrics'
import { cn } from '@/lib/cn'

export function VerificationSimulator() {
  const [zomatoMeals, setZomatoMeals] = useState(3200)
  const [blinkitMeals, setBlinkitMeals] = useState(2900)

  const mismatch = zomatoMeals > 0 ? ((zomatoMeals - blinkitMeals) / zomatoMeals) * 100 : 0
  const absMismatch = Math.abs(mismatch)
  const audit = absMismatch > AUDIT_THRESHOLD_PCT
  const needlePct = Math.min(100, (absMismatch / 60) * 100)

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* Controls + bars */}
      <div className="space-y-4">
        <Slider
          label="Zomato meal orders"
          value={zomatoMeals}
          min={500}
          max={6000}
          step={100}
          onChange={setZomatoMeals}
          format={formatNum}
        />
        <Slider
          label="Blinkit ingredients (meals’ worth)"
          value={blinkitMeals}
          min={0}
          max={6000}
          step={100}
          onChange={setBlinkitMeals}
          format={formatNum}
        />
        <div className="space-y-2.5 pt-1">
          <CompareBar label="Implied by Zomato orders" value={zomatoMeals} max={6000} color="bg-zomato" />
          <CompareBar label="Bought on Blinkit" value={blinkitMeals} max={6000} color="bg-blinkit-green" />
        </div>
      </div>

      {/* Result */}
      <div className="flex flex-col gap-3 rounded-xl bg-masala-50 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
            Mismatch
          </span>
          <span className="text-[11px] text-ink-faint">
            {mismatch >= 0 ? 'under-sourced' : 'over-sourced'}
          </span>
        </div>
        <span
          className={cn(
            'text-4xl font-bold leading-none tabular-nums',
            audit ? 'text-zomato' : 'text-emerald-600',
          )}
        >
          {absMismatch.toFixed(0)}%
        </span>

        {/* Threshold meter */}
        <div className="relative mt-1 h-2.5 w-full rounded-full bg-gradient-to-r from-emerald-400 via-ghee to-zomato">
          <div
            className="absolute -top-1 bottom-0 w-0.5 bg-ink"
            style={{ left: `${(AUDIT_THRESHOLD_PCT / 60) * 100}%` }}
          />
          <motion.div
            className="absolute -top-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-[3px] border-white bg-ink shadow-float"
            animate={{ left: `${needlePct}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-ink-faint">
          <span>0%</span>
          <span className="font-semibold text-ink">{AUDIT_THRESHOLD_PCT}% audit line</span>
          <span>60%</span>
        </div>

        {/* Status */}
        <motion.div
          key={audit ? 'audit' : 'ok'}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            'mt-auto flex items-center gap-2.5 rounded-lg p-3',
            audit ? 'bg-zomato text-white' : 'bg-emerald-600 text-white',
          )}
        >
          {audit ? (
            <Siren className="h-5 w-5 shrink-0 animate-pulse" />
          ) : (
            <ShieldCheck className="h-5 w-5 shrink-0" />
          )}
          <p className="text-xs font-semibold leading-snug">
            {audit ? 'Physical audit triggered' : 'Verified — tag holds'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function CompareBar({
  label,
  value,
  max,
  color,
}: {
  label: string
  value: number
  max: number
  color: string
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px]">
        <span className="text-ink-soft">{label}</span>
        <span className="font-semibold tabular-nums text-ink">{formatNum(value)}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-masala-200">
        <motion.div
          className={cn('h-full rounded-full', color)}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        />
      </div>
    </div>
  )
}
