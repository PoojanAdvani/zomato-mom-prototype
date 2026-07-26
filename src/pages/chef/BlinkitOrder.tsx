import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, BadgeCheck, Loader2, ShieldCheck } from 'lucide-react'
import { PhoneScreen } from '@/components/PhoneScreen'
import { Annotation } from '@/components/Annotation'
import { useChefStore } from '@/store/useChefStore'
import { ingredientModel } from '@/data/metrics'

// simple per-unit prices for the mock bill
const prices: Record<string, number> = {
  'Atta (flour)': 55,
  Rice: 70,
  'Cooking oil': 140,
  Vegetables: 40,
  'Dairy (ghee/butter/dahi)': 90,
}

export function BlinkitOrder() {
  const navigate = useNavigate()
  const { committedMeals, blinkitPurchasedMeals, purchaseIngredients } = useChefStore()
  const [placing, setPlacing] = useState(false)
  const [done, setDone] = useState(false)

  // Meals not yet covered by ingredients bought on Blinkit.
  const mealsToCover = Math.max(0, committedMeals - blinkitPurchasedMeals)
  const coverMeals = mealsToCover > 0 ? mealsToCover : committedMeals

  const cart = useMemo(
    () =>
      ingredientModel.map((ing) => {
        const qty = +((ing.perHundredMeals * coverMeals) / 100).toFixed(1)
        return { ...ing, qty, price: Math.round(prices[ing.name] * qty) }
      }),
    [coverMeals],
  )

  const subtotal = cart.reduce((s, c) => s + c.price, 0)
  const bulkDiscount = Math.round(subtotal * 0.12)
  const total = subtotal - bulkDiscount

  const placeOrder = () => {
    setPlacing(true)
    setTimeout(() => {
      purchaseIngredients(coverMeals)
      setPlacing(false)
      setDone(true)
    }, 1500)
  }

  return (
    <PhoneScreen>
      <div className="sticky top-0 z-20 flex items-center gap-2 bg-blinkit px-4 py-3 text-blinkit-dark">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blinkit-dark/10"
        >
          ‹
        </button>
        <div className="flex-1">
          <h1 className="text-base font-extrabold leading-none">blinkit</h1>
          <p className="text-[11px] font-medium opacity-70">Delivery in 9 minutes</p>
        </div>
        <Zap className="h-5 w-5 fill-blinkit-dark" />
      </div>

      <div className="flex-1 space-y-2 pb-40">
        {/* Smart basket note */}
        <div className="bg-white px-4 py-4">
          <div className="flex items-start gap-2 rounded-xl bg-ghee-50 p-3">
            <span className="text-lg">🧾</span>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-ink">Auto-filled from your Zomato orders</p>
                <Annotation id="chef-blinkit" />
              </div>
              <p className="mt-0.5 text-xs text-ink-soft">
                Exactly enough for <b>{coverMeals} meals</b>. Ordering here keeps your{' '}
                <span className="font-semibold text-emerald-600">Verified Ingredients</span> tag.
              </p>
            </div>
          </div>
        </div>

        {/* Cart */}
        <div className="bg-white px-4 py-4">
          <h3 className="mb-3 text-sm font-bold text-ink">Your smart basket</h3>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-masala-100 text-lg">
                  🛒
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-ink-faint">
                    {item.qty} {item.unit}
                  </p>
                </div>
                <span className="text-sm font-semibold text-ink">₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bill */}
        <div className="bg-white px-4 py-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Item total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Zomato partner bulk discount (12%)</span>
              <span>-₹{bulkDiscount}</span>
            </div>
            <div className="my-1 border-t border-dashed border-masala-200" />
            <div className="flex justify-between text-base font-bold text-ink">
              <span>To pay</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA / success */}
      <div className="sticky bottom-0 z-20 border-t border-masala-200 bg-white px-4 py-3">
        {!done ? (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={placeOrder}
            disabled={placing}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blinkit-green py-3.5 text-sm font-bold text-white disabled:opacity-80"
          >
            {placing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Placing order…
              </>
            ) : (
              <>Place Blinkit order · ₹{total}</>
            )}
          </motion.button>
        ) : (
          <motion.button
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            onClick={() => navigate('/chef/verification')}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white"
          >
            <BadgeCheck className="h-4 w-4" /> Verified! See your status
          </motion.button>
        )}
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="pointer-events-auto rounded-3xl bg-white p-6 text-center shadow-float"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <ShieldCheck className="h-8 w-8 text-emerald-600" />
              </div>
              <p className="mt-3 text-base font-bold text-ink">Ingredients verified ✓</p>
              <p className="mt-1 text-sm text-ink-soft">
                Blinkit purchases now match your Zomato meal volume. Your delta is back under the
                audit threshold.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PhoneScreen>
  )
}
