import { create } from 'zustand'
import type { AddOn, Base, Chef, MealItem, MealSlot, OrderStatus } from '@/types'

interface OrderState {
  chef?: Chef
  meal?: MealItem
  base?: Base
  addOns: AddOn[]
  slot: MealSlot
  time: string
  subscribe: boolean
  status: OrderStatus

  setChef: (chef: Chef) => void
  setMeal: (meal: MealItem) => void
  setBase: (base: Base) => void
  toggleAddOn: (addOn: AddOn) => void
  setSlot: (slot: MealSlot) => void
  setTime: (time: string) => void
  setSubscribe: (v: boolean) => void
  setStatus: (status: OrderStatus) => void

  total: () => number
  reset: () => void
}

export const useOrderStore = create<OrderState>((set, get) => ({
  chef: undefined,
  meal: undefined,
  base: undefined,
  addOns: [],
  slot: 'lunch',
  time: '1:00 PM',
  subscribe: true,
  status: 'idle',

  setChef: (chef) => set({ chef }),
  setMeal: (meal) => set({ meal }),
  setBase: (base) => set({ base }),
  toggleAddOn: (addOn) =>
    set((s) => ({
      addOns: s.addOns.some((a) => a.id === addOn.id)
        ? s.addOns.filter((a) => a.id !== addOn.id)
        : [...s.addOns, addOn],
    })),
  setSlot: (slot) => set({ slot }),
  setTime: (time) => set({ time }),
  setSubscribe: (subscribe) => set({ subscribe }),
  setStatus: (status) => set({ status }),

  total: () => {
    const { meal, base, addOns } = get()
    const mealPrice = meal?.price ?? 0
    const basePrice = base?.price ?? 0
    const addOnPrice = addOns.reduce((sum, a) => sum + a.price, 0)
    return mealPrice + basePrice + addOnPrice
  },

  reset: () =>
    set({
      meal: undefined,
      base: undefined,
      addOns: [],
      slot: 'lunch',
      time: '1:00 PM',
      subscribe: true,
      status: 'idle',
    }),
}))
