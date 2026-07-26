// Shared domain types for the Zomato Mom prototype.

export type Lens = 'consumer' | 'chef' | 'ops'

export interface IngredientBadge {
  /** e.g. "Amul Butter", "MP Atta" */
  label: string
  /** Brand/source note shown in tooltip */
  note: string
}

export interface MealItem {
  id: string
  name: string
  /** Hindi/regional descriptor, e.g. "Rajma Chawal" */
  desc: string
  price: number
  veg: boolean
  emoji: string
  /** meal slot suitability */
  slots: MealSlot[]
  tags?: string[]
}

export type MealSlot = 'breakfast' | 'lunch' | 'dinner'

export interface Chef {
  id: string
  name: string
  /** short tagline, e.g. "Punjabi ghar ka khana" */
  tagline: string
  area: string
  city: string
  distanceKm: number
  etaMins: number
  rating: number
  ratingCount: number
  /** monthly meals already served — social proof */
  mealsServed: number
  avatar: string // emoji stand-in for a photo
  verified: boolean
  /** ingredient provenance badges */
  ingredients: IngredientBadge[]
  specialties: MealItem[]
  bio: string
  /** % of groceries sourced via Blinkit (activation metric) */
  blinkitSourcingPct: number
  reviews: Review[]
}

export interface Review {
  author: string
  rating: number
  text: string
  when: string
}

export type Base = {
  id: string
  name: string
  desc: string
  price: number
  emoji: string
}

export type AddOn = {
  id: string
  name: string
  price: number
  emoji: string
}

export type OrderStatus =
  | 'idle'
  | 'placed'
  | 'chef_cooking'
  | 'picked_up'
  | 'arriving'
  | 'delivered'

export interface ScheduleSelection {
  slot: MealSlot
  time: string // e.g. "1:00 PM"
  subscribe: boolean
}
