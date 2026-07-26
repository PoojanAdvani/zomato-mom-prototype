import { useState } from 'react'
import { motion } from 'framer-motion'
import { Slider } from '@/components/ui/Slider'
import {
  computeUnitEconomics,
  unitEconomicsDefaults,
  unitEconomicsRanges,
  formatINR,
} from '@/data/metrics'
import { cn } from '@/lib/cn'

// Validated categorical palette (node scripts/validate_palette.js — ALL PASS).
const SEGMENTS = [
  { key: 'cost', label: 'Variable cost', color: '#E8A33D' },
  { key: 'delivery', label: 'Delivery fee', color: '#3B6FB0' },
  { key: 'commission', label: 'Commission', color: '#E23744' },
  { key: 'profit', label: 'Chef profit', color: '#0C831F' },
] as const

export function UnitEconomicsPlayground() {
  const [aov, setAov] = useState(unitEconomicsDefaults.aov)
  const [variableCost, setVariableCost] = useState(unitEconomicsDefaults.variableCost)
  const [commissionPct, setCommissionPct] = useState(unitEconomicsDefaults.commissionPct)
  const [mealsPerSlot, setMealsPerSlot] = useState(unitEconomicsDefaults.mealsPerSlot)

  const deliveryFee = unitEconomicsDefaults.deliveryFee
  const res = computeUnitEconomics({
    aov,
    variableCost,
    deliveryFee,
    commissionPct,
    mealsPerSlot,
    slotsPerDay: unitEconomicsDefaults.slotsPerDay,
  })

  const commission = (aov * commissionPct) / 100
  const values: Record<string, number> = {
    cost: variableCost,
    delivery: deliveryFee,
    commission,
    profit: res.chefNetPerDay3Meal,
  }
  const marginPct = aov ? Math.round((res.chefNetPerDay3Meal / aov) * 100) : 0
  const profitHealthy = res.chefNetPerDay3Meal >= 60

  return (
    <div className="space-y-4">
      {/* Sliders */}
      <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
        <Slider label="Customer AOV" value={aov} {...unitEconomicsRanges.aov} onChange={setAov} format={(v) => `₹${v}`} />
        <Slider
          label="Variable cost"
          value={variableCost}
          {...unitEconomicsRanges.variableCost}
          onChange={setVariableCost}
          format={(v) => `₹${v}`}
        />
        <Slider
          label="Commission"
          value={commissionPct}
          {...unitEconomicsRanges.commissionPct}
          onChange={setCommissionPct}
          format={(v) => `${v}%`}
        />
        <Slider
          label="Meals / slot"
          value={mealsPerSlot}
          {...unitEconomicsRanges.mealsPerSlot}
          onChange={setMealsPerSlot}
          format={(v) => `${v}`}
        />
      </div>

      {/* AOV breakdown */}
      <div>
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
            ₹{aov} AOV allocation
          </span>
          <span className={cn('text-[11px] font-semibold', profitHealthy ? 'text-emerald-600' : 'text-zomato-600')}>
            {marginPct}% chef margin
          </span>
        </div>
        <div className="flex h-9 w-full gap-0.5 overflow-hidden rounded-lg">
          {SEGMENTS.map((seg) => {
            const w = (values[seg.key] / aov) * 100
            if (w <= 0) return null
            return (
              <motion.div
                key={seg.key}
                className="flex items-center justify-center overflow-hidden first:rounded-l-lg last:rounded-r-lg"
                style={{ backgroundColor: seg.color }}
                animate={{ width: `${w}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 26 }}
              >
                {w > 14 && (
                  <span className="px-1 text-[11px] font-bold text-white tabular-nums">
                    ₹{Math.round(values[seg.key])}
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
          {SEGMENTS.map((seg) => (
            <div key={seg.key} className="flex items-center gap-1.5 text-[11px] text-ink-soft">
              <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: seg.color }} />
              {seg.label}
              <span className="ml-auto font-semibold tabular-nums text-ink">₹{Math.round(values[seg.key])}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Output tiles */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Tile label="Chef / 3 meals" value={`₹${res.chefNetPerDay3Meal}`} tone={profitHealthy ? 'good' : 'bad'} />
        <Tile label="Chef / day" value={formatINR(res.chefDailyEarnings)} sub={`${res.ordersPerDay} cust`} />
        <Tile label="Zomato / cust" value={`₹${Math.round(res.zomatoCommissionPerDay)}`} tone="bad" />
        <Tile label="Zomato / day" value={formatINR(res.zomatoDailyRevenue)} />
      </div>
    </div>
  )
}

function Tile({
  label,
  value,
  sub,
  tone,
}: {
  label: string
  value: string
  sub?: string
  tone?: 'good' | 'bad'
}) {
  return (
    <div className="rounded-lg bg-masala-50 p-2.5">
      <p className="text-[10px] font-medium uppercase tracking-wide text-ink-faint">{label}</p>
      <p
        className={cn(
          'mt-0.5 text-base font-bold tabular-nums',
          tone === 'good' ? 'text-emerald-600' : tone === 'bad' ? 'text-zomato-600' : 'text-ink',
        )}
      >
        {value}
      </p>
      {sub && <p className="text-[10px] text-ink-faint">{sub}</p>}
    </div>
  )
}
