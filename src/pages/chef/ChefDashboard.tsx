import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, ShoppingCart, ShieldCheck, ShieldAlert, Check, ChevronRight, Utensils } from 'lucide-react'
import { PhoneScreen } from '@/components/PhoneScreen'
import { Annotation } from '@/components/Annotation'
import { useChefStore } from '@/store/useChefStore'
import { computeUnitEconomics, unitEconomicsDefaults, AUDIT_THRESHOLD_PCT, formatINR } from '@/data/metrics'
import { cn } from '@/lib/cn'

export function ChefDashboard() {
  const navigate = useNavigate()
  const { committedMeals, blinkitPurchasedMeals, orders, acceptOrder } = useChefStore()

  const econ = computeUnitEconomics({
    ...unitEconomicsDefaults,
    mealsPerSlot: Math.round(committedMeals / unitEconomicsDefaults.slotsPerDay),
  })

  const deltaPct = committedMeals
    ? Math.round(((committedMeals - blinkitPurchasedMeals) / committedMeals) * 100)
    : 0
  const verified = deltaPct <= AUDIT_THRESHOLD_PCT
  const pending = orders.filter((o) => !o.accepted)

  return (
    <PhoneScreen>
      {/* Header */}
      <div className="bg-gradient-to-b from-ink to-ink-soft px-4 pb-8 pt-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/60">Zomato Mom · Chef Partner</p>
            <h1 className="mt-0.5 text-lg font-bold">Madhu Verma 👩🏽‍🍳</h1>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            Indiranagar
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-4 px-4 pb-8">
        {/* Earnings card */}
        <div className="relative -mt-5">
          <span className="absolute -top-2 right-2 z-10">
            <Annotation id="chef-dashboard" />
          </span>
          <div className="card overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-masala-100">
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-ink-faint">
                  <Wallet className="h-3.5 w-3.5" /> Today’s earnings
                </div>
                <p className="mt-1 text-2xl font-bold text-ink">{formatINR(econ.chefDailyEarnings)}</p>
                <p className="text-[11px] text-emerald-600">Net, after all fees</p>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-ink-faint">
                  <Utensils className="h-3.5 w-3.5" /> Meals today
                </div>
                <p className="mt-1 text-2xl font-bold text-ink">{committedMeals}</p>
                <p className="text-[11px] text-ink-faint">{econ.ordersPerDay} customers</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-t border-masala-100 bg-masala-50 px-4 py-2 text-[11px] text-ink-soft">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              ₹{econ.chefNetPerDay3Meal} net profit per 3-meal customer · 20% Zomato commission
            </div>
          </div>
        </div>

        {/* Verification status */}
        <button
          onClick={() => navigate('/chef/verification')}
          className={cn(
            'flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left',
            verified ? 'border-emerald-200 bg-emerald-50' : 'border-zomato-200 bg-zomato-50',
          )}
        >
          <span
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
              verified ? 'bg-emerald-600 text-white' : 'bg-zomato text-white',
            )}
          >
            {verified ? <ShieldCheck className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-ink">
                {verified ? 'Ingredients Verified' : 'Verification at risk'}
              </p>
              <Annotation id="chef-blinkit" />
            </div>
            <p className="text-xs text-ink-soft">
              Blinkit vs Zomato meal delta: <b>{deltaPct}%</b>{' '}
              {verified ? `(under ${AUDIT_THRESHOLD_PCT}% limit)` : `(over ${AUDIT_THRESHOLD_PCT}% — audit likely)`}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-ink-faint" />
        </button>

        {/* Order groceries CTA */}
        <button
          onClick={() => navigate('/chef/blinkit')}
          className="flex w-full items-center gap-3 rounded-2xl bg-blinkit p-4 text-left text-blinkit-dark shadow-card"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blinkit-dark text-blinkit">
            <ShoppingCart className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-bold">Order today’s ingredients on Blinkit</p>
            <p className="text-xs opacity-70">Get verified · bulk discount · 10-min delivery</p>
          </div>
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Incoming orders */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink">Incoming orders</h3>
            {pending.length > 0 && (
              <span className="rounded-full bg-zomato-50 px-2 py-0.5 text-[11px] font-bold text-zomato">
                {pending.length} to accept
              </span>
            )}
          </div>
          <div className="space-y-2">
            {orders.map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border border-masala-100 bg-white p-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-masala-100 text-xl">
                  {o.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {o.meal} {o.qty > 1 && <span className="text-ink-faint">×{o.qty}</span>}
                  </p>
                  <p className="text-xs text-ink-faint">
                    {o.customer} · {o.slot}
                  </p>
                </div>
                {o.accepted ? (
                  <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
                    <Check className="h-3.5 w-3.5" /> Accepted
                  </span>
                ) : (
                  <button
                    onClick={() => acceptOrder(o.id)}
                    className="rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-soft"
                  >
                    Accept
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PhoneScreen>
  )
}
