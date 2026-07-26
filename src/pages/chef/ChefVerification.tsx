import { useNavigate } from 'react-router-dom'
import { ShieldCheck, ShieldAlert, ShoppingCart } from 'lucide-react'
import { PhoneScreen, PhoneHeader } from '@/components/PhoneScreen'
import { Annotation } from '@/components/Annotation'
import { useChefStore } from '@/store/useChefStore'
import { AUDIT_THRESHOLD_PCT } from '@/data/metrics'
import { cn } from '@/lib/cn'

export function ChefVerification() {
  const navigate = useNavigate()
  const { committedMeals, blinkitPurchasedMeals } = useChefStore()

  const deltaPct = committedMeals
    ? Math.round(((committedMeals - blinkitPurchasedMeals) / committedMeals) * 100)
    : 0
  const clamped = Math.max(0, deltaPct)
  const verified = clamped <= AUDIT_THRESHOLD_PCT
  // needle position across 0..50% scale
  const needlePct = Math.min(100, (clamped / 50) * 100)

  return (
    <PhoneScreen>
      <PhoneHeader title="Ingredient Verification" back />

      <div className="flex-1 space-y-4 px-4 py-4">
        {/* Status hero */}
        <div
          className={cn(
            'relative rounded-2xl p-5 text-center',
            verified ? 'bg-emerald-50' : 'bg-zomato-50',
          )}
        >
          <span className="absolute right-3 top-3">
            <Annotation id="ops-verification" />
          </span>
          <div
            className={cn(
              'mx-auto flex h-16 w-16 items-center justify-center rounded-full',
              verified ? 'bg-emerald-600' : 'bg-zomato',
            )}
          >
            {verified ? (
              <ShieldCheck className="h-8 w-8 text-white" />
            ) : (
              <ShieldAlert className="h-8 w-8 text-white" />
            )}
          </div>
          <p className="mt-3 text-lg font-bold text-ink">
            {verified ? 'Ingredients Verified' : 'Audit likely'}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {verified
              ? 'Your Blinkit purchases match your Zomato meal volume.'
              : `Mismatch exceeds ${AUDIT_THRESHOLD_PCT}% — a physical inspection may be scheduled.`}
          </p>
        </div>

        {/* Delta meter */}
        <div className="card p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-bold text-ink">Purchase vs Order delta</p>
            <p className={cn('text-2xl font-bold tabular-nums', verified ? 'text-emerald-600' : 'text-zomato')}>
              {clamped}%
            </p>
          </div>

          <div className="relative mt-4 h-3 w-full rounded-full bg-gradient-to-r from-emerald-400 via-ghee to-zomato">
            {/* threshold marker */}
            <div
              className="absolute -top-1 bottom-0 w-0.5 bg-ink"
              style={{ left: `${(AUDIT_THRESHOLD_PCT / 50) * 100}%` }}
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-ink">
                {AUDIT_THRESHOLD_PCT}% limit
              </span>
            </div>
            {/* needle */}
            <div
              className="absolute -top-1.5 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-white bg-ink shadow-float transition-all"
              style={{ left: `${needlePct}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-ink-faint">
            <span>0% · perfect match</span>
            <span>50%+</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="card divide-y divide-masala-100">
          <Line label="Meals committed on Zomato" value={`${committedMeals} meals`} />
          <Line label="Ingredients bought on Blinkit" value={`${blinkitPurchasedMeals} meals’ worth`} />
          <Line
            label="Uncovered by Blinkit"
            value={`${Math.max(0, committedMeals - blinkitPurchasedMeals)} meals`}
            tone={verified ? undefined : 'bad'}
          />
        </div>

        {/* How it works */}
        <div className="rounded-2xl bg-ink p-4 text-sm text-white/90">
          <p className="mb-1 font-semibold text-ghee-200">How verification works</p>
          <p className="text-[13px] leading-relaxed text-white/70">
            Blinkit order logs (items, quantity, date) are automatically cross-checked against your
            Zomato order volume. Sourcing groceries elsewhere widens the delta — cross{' '}
            {AUDIT_THRESHOLD_PCT}% and an audit is triggered.
          </p>
        </div>

        {!verified && (
          <button
            onClick={() => navigate('/chef/blinkit')}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blinkit-green py-3.5 text-sm font-bold text-white"
          >
            <ShoppingCart className="h-4 w-4" /> Buy ingredients to fix delta
          </button>
        )}
      </div>
    </PhoneScreen>
  )
}

function Line({ label, value, tone }: { label: string; value: string; tone?: 'bad' }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-sm text-ink-soft">{label}</span>
      <span className={cn('text-sm font-semibold', tone === 'bad' ? 'text-zomato' : 'text-ink')}>
        {value}
      </span>
    </div>
  )
}
