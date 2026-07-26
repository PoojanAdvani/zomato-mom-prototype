import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, CalendarDays, Repeat, Sparkles } from 'lucide-react'
import { PhoneScreen, PhoneHeader } from '@/components/PhoneScreen'
import { Annotation } from '@/components/Annotation'
import { bases, addOns, timeSlots } from '@/data/meals'
import { useOrderStore } from '@/store/useOrderStore'
import { cn } from '@/lib/cn'
import type { MealSlot } from '@/types'

const slotLabels: Record<MealSlot, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
}

export function Customize() {
  const navigate = useNavigate()
  const {
    chef,
    meal,
    base,
    addOns: chosenAddOns,
    slot,
    time,
    subscribe,
    setBase,
    toggleAddOn,
    setSlot,
    setTime,
    setSubscribe,
    total,
  } = useOrderStore()

  if (!chef || !meal) {
    return (
      <PhoneScreen>
        <PhoneHeader title="Customize" back />
        <div className="p-6 text-sm text-ink-faint">
          No meal selected. Go back and pick a dish.
        </div>
      </PhoneScreen>
    )
  }

  const availableSlots = (Object.keys(timeSlots) as MealSlot[]).filter((s) =>
    meal.slots.includes(s),
  )

  return (
    <PhoneScreen>
      <PhoneHeader title="Customize your meal" subtitle={`${meal.name} · ${chef.name}`} back />

      <div className="flex-1 space-y-2 pb-40">
        {/* Meal summary */}
        <div className="bg-white px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-masala-100 text-2xl">
              {meal.emoji}
            </span>
            <div>
              <p className="font-bold text-ink">{meal.name}</p>
              <p className="text-xs text-ink-faint">{meal.desc}</p>
              <p className="mt-0.5 text-sm font-bold text-ink">₹{meal.price}</p>
            </div>
          </div>
        </div>

        {/* Base choice */}
        <section className="bg-white px-4 py-4">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-sm font-bold text-ink">Choose your base</h3>
            <span className="text-[11px] font-medium text-zomato">Required</span>
            <Annotation id="customize-base" />
          </div>
          <div className="space-y-2">
            {bases.map((b) => {
              const active = base?.id === b.id
              return (
                <button
                  key={b.id}
                  onClick={() => setBase(b)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all',
                    active ? 'border-zomato bg-zomato-50/60' : 'border-masala-200 hover:border-masala-300',
                  )}
                >
                  <span className="text-2xl">{b.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{b.name}</p>
                    <p className="text-xs text-ink-faint">{b.desc}</p>
                  </div>
                  <span className="text-sm font-medium text-ink-soft">
                    {b.price ? `+₹${b.price}` : 'Free'}
                  </span>
                  <span
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full border-2',
                      active ? 'border-zomato bg-zomato text-white' : 'border-masala-300',
                    )}
                  >
                    {active && <Check className="h-3 w-3" />}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Add-ons */}
        <section className="bg-white px-4 py-4">
          <h3 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-ink">
            <Sparkles className="h-4 w-4 text-ghee" /> Add-ons
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {addOns.map((a) => {
              const active = chosenAddOns.some((x) => x.id === a.id)
              return (
                <button
                  key={a.id}
                  onClick={() => toggleAddOn(a)}
                  className={cn(
                    'flex items-center gap-2 rounded-xl border p-2.5 text-left transition-all',
                    active ? 'border-ghee bg-ghee-50' : 'border-masala-200 hover:border-masala-300',
                  )}
                >
                  <span className="text-xl">{a.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-ink">{a.name}</p>
                    <p className="text-[11px] text-ink-faint">+₹{a.price}</p>
                  </div>
                  {active && <Check className="h-4 w-4 shrink-0 text-ghee-600" />}
                </button>
              )
            })}
          </div>
        </section>

        {/* Schedule */}
        <section className="bg-white px-4 py-4">
          <h3 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-ink">
            <CalendarDays className="h-4 w-4 text-zomato" /> When should it arrive?
          </h3>
          <div className="mb-3 flex gap-2">
            {availableSlots.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSlot(s)
                  setTime(timeSlots[s][1])
                }}
                className={cn(
                  'flex-1 rounded-xl border py-2 text-sm font-semibold transition-all',
                  slot === s ? 'border-zomato bg-zomato text-white' : 'border-masala-200 text-ink-soft',
                )}
              >
                {slotLabels[s]}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {timeSlots[slot].map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={cn(
                  'flex-1 rounded-lg border py-1.5 text-xs font-medium transition-all',
                  time === t ? 'border-ink bg-ink text-white' : 'border-masala-200 text-ink-soft',
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* Subscribe */}
        <section className="bg-white px-4 py-4">
          <button
            onClick={() => setSubscribe(!subscribe)}
            className={cn(
              'relative flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all',
              subscribe ? 'border-zomato bg-gradient-to-br from-zomato-50 to-ghee-50' : 'border-masala-200',
            )}
          >
            <span className="absolute right-3 top-3">
              <Annotation id="customize-subscribe" />
            </span>
            <span
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                subscribe ? 'bg-zomato text-white' : 'bg-masala-100 text-ink-soft',
              )}
            >
              <Repeat className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-ink">Subscribe Daily</p>
              <p className="mt-0.5 text-xs text-ink-soft">
                Same meal, same time, every day. Skip or pause anytime.
              </p>
              <p className="mt-1 text-xs font-semibold text-emerald-600">
                Save ₹15/meal + priority hot delivery
              </p>
            </div>
            <span
              className={cn(
                'mt-1 flex h-6 w-11 items-center rounded-full p-0.5 transition-colors',
                subscribe ? 'bg-zomato' : 'bg-masala-300',
              )}
            >
              <motion.span
                layout
                className="h-5 w-5 rounded-full bg-white shadow"
                style={{ marginLeft: subscribe ? 'auto' : 0 }}
              />
            </span>
          </button>
        </section>
      </div>

      {/* Sticky CTA */}
      <StickyBar
        total={total()}
        subscribe={subscribe}
        disabled={!base}
        onProceed={() => navigate('/consumer/checkout')}
      />
    </PhoneScreen>
  )
}

function StickyBar({
  total,
  subscribe,
  disabled,
  onProceed,
}: {
  total: number
  subscribe: boolean
  disabled: boolean
  onProceed: () => void
}) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-masala-200 bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(28,27,26,0.05)]">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-lg font-bold text-ink">₹{total}</p>
          <p className="text-[11px] text-ink-faint">
            {subscribe ? 'per meal · billed daily' : 'one-time order'}
          </p>
        </div>
        <button
          onClick={onProceed}
          disabled={disabled}
          className="flex-1 rounded-xl bg-zomato py-3.5 text-center text-sm font-bold text-white shadow-card transition-colors hover:bg-zomato-600 disabled:opacity-50"
        >
          {disabled ? 'Choose a base' : 'Proceed to pay'}
        </button>
      </div>
    </div>
  )
}
