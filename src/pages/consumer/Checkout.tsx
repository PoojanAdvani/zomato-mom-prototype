import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Repeat, ShieldCheck, Clock, Loader2 } from 'lucide-react'
import { PhoneScreen, PhoneHeader } from '@/components/PhoneScreen'
import { useOrderStore } from '@/store/useOrderStore'
import { cn } from '@/lib/cn'

const upiApps = [
  { id: 'phonepe', name: 'PhonePe', emoji: '🟣' },
  { id: 'gpay', name: 'Google Pay', emoji: '🔵' },
  { id: 'paytm', name: 'Paytm', emoji: '🔷' },
]

const DELIVERY_FEE = 20
const PLATFORM_FEE = 5

export function Checkout() {
  const navigate = useNavigate()
  const { chef, meal, base, addOns, slot, time, subscribe, total, setStatus } = useOrderStore()
  const [pay, setPay] = useState('phonepe')
  const [processing, setProcessing] = useState(false)

  if (!chef || !meal) {
    return (
      <PhoneScreen>
        <PhoneHeader title="Checkout" back />
        <div className="p-6 text-sm text-ink-faint">Your cart is empty.</div>
      </PhoneScreen>
    )
  }

  const subDiscount = subscribe ? 15 : 0
  const grand = total() + DELIVERY_FEE + PLATFORM_FEE - subDiscount

  const placeOrder = () => {
    setProcessing(true)
    setStatus('placed')
    // Simulated payment + order confirmation.
    setTimeout(() => navigate('/consumer/tracking'), 1400)
  }

  return (
    <PhoneScreen>
      <PhoneHeader title="Checkout" subtitle={`${chef.name} · ${chef.area}`} back />

      <div className="flex-1 space-y-2 pb-40">
        {/* Delivery slot */}
        <div className="bg-white px-4 py-4">
          <div className="flex items-center gap-2 rounded-xl bg-masala-50 p-3">
            <Clock className="h-5 w-5 text-zomato" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink capitalize">
                {slot} · {time}
              </p>
              <p className="text-xs text-ink-faint">Delivered hot to PG · Baner, Pune</p>
            </div>
            {subscribe && (
              <span className="flex items-center gap-1 rounded-full bg-zomato-50 px-2 py-1 text-[11px] font-bold text-zomato">
                <Repeat className="h-3 w-3" /> Daily
              </span>
            )}
          </div>
        </div>

        {/* Bill */}
        <div className="bg-white px-4 py-4">
          <h3 className="mb-3 text-sm font-bold text-ink">Bill details</h3>
          <div className="space-y-2 text-sm">
            <Row label={`${meal.name}`} value={meal.price} />
            {base && base.price > 0 && <Row label={base.name} value={base.price} />}
            {addOns.map((a) => (
              <Row key={a.id} label={a.name} value={a.price} />
            ))}
            <Row label="Delivery fee" value={DELIVERY_FEE} />
            <Row label="Platform fee" value={PLATFORM_FEE} />
            {subscribe && <Row label="Subscription discount" value={-subDiscount} good />}
            <div className="my-2 border-t border-dashed border-masala-200" />
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-ink">To pay</span>
              <span className="text-base font-bold text-ink">₹{grand}</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white px-4 py-4">
          <h3 className="mb-3 text-sm font-bold text-ink">Pay using UPI</h3>
          <div className="space-y-2">
            {upiApps.map((app) => (
              <button
                key={app.id}
                onClick={() => setPay(app.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border p-3 transition-all',
                  pay === app.id ? 'border-zomato bg-zomato-50/60' : 'border-masala-200',
                )}
              >
                <span className="text-xl">{app.emoji}</span>
                <span className="flex-1 text-left text-sm font-semibold text-ink">{app.name}</span>
                <span
                  className={cn(
                    'h-4 w-4 rounded-full border-2',
                    pay === app.id ? 'border-zomato bg-zomato ring-2 ring-zomato/20' : 'border-masala-300',
                  )}
                />
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] text-emerald-700">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Prototype only — no real payment is processed.
          </div>
        </div>
      </div>

      {/* Pay CTA */}
      <div className="sticky bottom-0 z-20 border-t border-masala-200 bg-white px-4 py-3">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={placeOrder}
          disabled={processing}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-zomato py-3.5 text-sm font-bold text-white shadow-card disabled:opacity-80"
        >
          {processing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Confirming…
            </>
          ) : (
            <>Pay ₹{grand} {subscribe && '· Start subscription'}</>
          )}
        </motion.button>
      </div>
    </PhoneScreen>
  )
}

function Row({ label, value, good }: { label: string; value: number; good?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-soft">{label}</span>
      <span className={cn('font-medium', good ? 'text-emerald-600' : 'text-ink')}>
        {value < 0 ? `-₹${Math.abs(value)}` : `₹${value}`}
      </span>
    </div>
  )
}
