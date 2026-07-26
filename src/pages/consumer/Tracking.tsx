import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChefHat, Bike, Home, PartyPopper, Repeat } from 'lucide-react'
import { PhoneScreen, PhoneHeader } from '@/components/PhoneScreen'
import { Annotation } from '@/components/Annotation'
import { ServedHotGauge } from '@/components/ServedHotGauge'
import { useOrderStore } from '@/store/useOrderStore'
import type { OrderStatus } from '@/types'
import { cn } from '@/lib/cn'

const steps: { key: OrderStatus; label: string; sub: string; icon: typeof ChefHat }[] = [
  { key: 'placed', label: 'Order confirmed', sub: 'Sent to your Mom Chef', icon: Check },
  { key: 'chef_cooking', label: 'Cooking fresh', sub: 'Verified ingredients only', icon: ChefHat },
  { key: 'picked_up', label: 'Picked up', sub: 'Green delivery partner assigned', icon: Bike },
  { key: 'arriving', label: 'Arriving hot', sub: 'Insulated, sealed & tracked', icon: Bike },
  { key: 'delivered', label: 'Delivered', sub: 'Enjoy your ghar ka khana!', icon: Home },
]

export function Tracking() {
  const navigate = useNavigate()
  const { chef, meal, subscribe, status, setStatus, reset } = useOrderStore()
  const [stepIndex, setStepIndex] = useState(0)

  // Drive the order lifecycle forward on a timer.
  useEffect(() => {
    if (!chef) return
    setStatus('placed')
    setStepIndex(0)
    const timers = steps.map((s, i) =>
      setTimeout(() => {
        setStatus(s.key)
        setStepIndex(i)
      }, i * 2200),
    )
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chef?.id])

  const delivered = status === 'delivered'
  // Food stays hot as it approaches; temperature is a function of progress.
  const temperature = useMemo(() => {
    const map: Record<number, number> = { 0: 78, 1: 82, 2: 76, 3: 70, 4: 68 }
    return map[stepIndex] ?? 75
  }, [stepIndex])

  if (!chef || !meal) {
    return (
      <PhoneScreen>
        <PhoneHeader title="Tracking" back />
        <div className="p-6 text-sm text-ink-faint">No active order.</div>
      </PhoneScreen>
    )
  }

  return (
    <PhoneScreen>
      <div className="bg-gradient-to-b from-zomato to-zomato-600 px-4 pb-6 pt-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
          {delivered ? 'Delivered' : 'Live order'}
        </p>
        <h1 className="mt-1 text-xl font-bold">
          {delivered ? 'Your meal has arrived 🎉' : `${chef.name} is on it`}
        </h1>
        <p className="mt-0.5 text-sm text-white/80">
          {meal.emoji} {meal.name} · {subscribe ? 'Daily subscription active' : 'One-time order'}
        </p>
      </div>

      {/* Served Hot gauge */}
      <div className="px-4 pt-4">
        <div className="relative card p-4">
          <span className="absolute right-3 top-3">
            <Annotation id="tracking-hot" />
          </span>
          <ServedHotGauge temperature={temperature} delivered={delivered} />
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 px-4 py-4">
        <div className="card p-4">
          <div className="space-y-1">
            {steps.map((step, i) => {
              const done = i < stepIndex
              const active = i === stepIndex
              const Icon = step.icon
              return (
                <div key={step.key} className="flex gap-3">
                  {/* Rail */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor: done || active ? '#E23744' : '#E9DFD2',
                        scale: active ? 1.1 : 1,
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                    >
                      {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </motion.div>
                    {i < steps.length - 1 && (
                      <div
                        className={cn(
                          'my-1 w-0.5 flex-1 rounded-full transition-colors',
                          done ? 'bg-zomato' : 'bg-masala-200',
                        )}
                        style={{ minHeight: 24 }}
                      />
                    )}
                  </div>
                  {/* Label */}
                  <div className={cn('pb-4 transition-opacity', !done && !active && 'opacity-40')}>
                    <p className="text-sm font-semibold text-ink">{step.label}</p>
                    <p className="text-xs text-ink-faint">{step.sub}</p>
                    {active && !delivered && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-[11px] font-medium text-zomato"
                      >
                        In progress…
                      </motion.p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Green delivery note */}
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-xs text-emerald-700">
          <span className="text-base">🌱</span>
          <span>100% Green Delivery — part of the Zomato net-zero fleet.</span>
        </div>

        {/* Post-delivery */}
        <AnimatePresence>
          {delivered && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              {subscribe && (
                <div className="flex items-start gap-3 rounded-2xl border-2 border-zomato bg-gradient-to-br from-zomato-50 to-ghee-50 p-4">
                  <Repeat className="mt-0.5 h-5 w-5 shrink-0 text-zomato" />
                  <div>
                    <p className="text-sm font-bold text-ink">Subscription is live 🎯</p>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {meal.name} from {chef.name}, delivered daily. This meal now counts toward the
                      product’s North Star metric.
                    </p>
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    reset()
                    navigate('/consumer')
                  }}
                  className="flex-1 rounded-xl border border-masala-200 bg-white py-3 text-sm font-semibold text-ink"
                >
                  Order again
                </button>
                <button
                  onClick={() => navigate('/ops')}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-ink py-3 text-sm font-semibold text-white"
                >
                  <PartyPopper className="h-4 w-4" /> See the strategy
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PhoneScreen>
  )
}
