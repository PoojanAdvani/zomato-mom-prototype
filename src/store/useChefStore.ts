import { create } from 'zustand'

export interface IncomingOrder {
  id: string
  customer: string
  meal: string
  emoji: string
  slot: string
  qty: number
  accepted: boolean
}

interface ChefState {
  /** meals the chef is committed to today (drives Blinkit ingredient needs) */
  committedMeals: number
  /** meals' worth of ingredients purchased on Blinkit */
  blinkitPurchasedMeals: number
  orders: IncomingOrder[]
  acceptOrder: (id: string) => void
  purchaseIngredients: (meals: number) => void
  resetBlinkit: () => void
}

const seedOrders: IncomingOrder[] = [
  { id: 'o1', customer: 'Mohit S.', meal: 'Kadi Chawal', emoji: '🍛', slot: 'Lunch · 1:00 PM', qty: 1, accepted: true },
  { id: 'o2', customer: 'Ananya R.', meal: 'Rajma Chawal', emoji: '🍲', slot: 'Lunch · 1:30 PM', qty: 2, accepted: false },
  { id: 'o3', customer: 'Vivek T.', meal: 'Aloo Paratha', emoji: '🥙', slot: 'Dinner · 8:30 PM', qty: 1, accepted: false },
  { id: 'o4', customer: 'Priya M.', meal: 'Kadi Chawal', emoji: '🍛', slot: 'Dinner · 8:00 PM', qty: 1, accepted: false },
]

export const useChefStore = create<ChefState>((set) => ({
  committedMeals: 48,
  blinkitPurchasedMeals: 40, // starts slightly under -> small existing delta
  orders: seedOrders,
  acceptOrder: (id) =>
    set((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, accepted: true } : o)),
      committedMeals: s.committedMeals + (s.orders.find((o) => o.id === id)?.qty ?? 0),
    })),
  purchaseIngredients: (meals) =>
    set((s) => ({ blinkitPurchasedMeals: s.blinkitPurchasedMeals + meals })),
  resetBlinkit: () => set({ blinkitPurchasedMeals: 40, committedMeals: 48 }),
}))
