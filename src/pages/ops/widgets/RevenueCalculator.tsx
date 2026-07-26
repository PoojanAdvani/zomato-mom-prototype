import { useState } from 'react'
import { motion } from 'framer-motion'
import { Slider } from '@/components/ui/Slider'
import {
  computeMonthlyRevenue,
  revenueDefaults,
  revenueRanges,
  formatINR,
  formatNum,
} from '@/data/metrics'

export function RevenueCalculator() {
  const [subscribers, setSubscribers] = useState(revenueDefaults.subscribers)
  const [mealsPerDay, setMealsPerDay] = useState(revenueDefaults.mealsPerDay)
  const [pricePerMeal, setPricePerMeal] = useState(revenueDefaults.pricePerMeal)
  const [commissionPct, setCommissionPct] = useState(revenueDefaults.commissionPct)

  const monthly = computeMonthlyRevenue({ subscribers, mealsPerDay, pricePerMeal, commissionPct })
  const annual = monthly * 12
  const gov = subscribers * mealsPerDay * 30 * pricePerMeal

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
        <Slider
          label="Subscribers"
          value={subscribers}
          {...revenueRanges.subscribers}
          onChange={setSubscribers}
          format={formatNum}
        />
        <Slider
          label="Meals / day"
          value={mealsPerDay}
          {...revenueRanges.mealsPerDay}
          onChange={setMealsPerDay}
          format={(v) => `${v}`}
        />
        <Slider
          label="Price / meal"
          value={pricePerMeal}
          {...revenueRanges.pricePerMeal}
          onChange={setPricePerMeal}
          format={(v) => `₹${v}`}
        />
        <Slider
          label="Commission"
          value={commissionPct}
          {...revenueRanges.commissionPct}
          onChange={setCommissionPct}
          format={(v) => `${v}%`}
        />
      </div>

      <div className="rounded-xl bg-ink p-4 text-white">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-ghee-200">
              Monthly revenue
            </p>
            <motion.p
              key={Math.round(monthly)}
              initial={{ opacity: 0.6, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold leading-none tabular-nums"
            >
              {formatINR(monthly)}
            </motion.p>
          </div>
          <p className="text-xs text-white/60">{formatINR(annual)} / yr</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-3 text-sm">
          <Kv label="Monthly GOV" value={formatINR(gov)} />
          <Kv label="ARPU / mo" value={`₹${Math.round(monthly / subscribers)}`} />
        </div>
        <p className="mt-3 font-mono text-[10px] leading-relaxed text-white/40">
          rev = subs × meals × 30 × price × commission%
        </p>
      </div>
    </div>
  )
}

function Kv({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-white/60">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  )
}
