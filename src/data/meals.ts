import type { AddOn, Base } from '@/types'

// Customization options shown on the meal customization screen.
export const bases: Base[] = [
  { id: 'rice', name: 'Steamed Rice', desc: 'Soft, fluffy basmati', price: 0, emoji: '🍚' },
  { id: 'roti', name: 'Tawa Roti', desc: '4 fresh, soft rotis', price: 0, emoji: '🫓' },
  { id: 'paratha', name: 'Tikona Paratha', desc: '3 ghee-roasted parathas', price: 20, emoji: '🥙' },
]

export const addOns: AddOn[] = [
  { id: 'extra-roti', name: 'Extra Tawa Roti (2)', price: 20, emoji: '🫓' },
  { id: 'ghee', name: 'Homemade Ghee Dollop', price: 15, emoji: '🧈' },
  { id: 'salad', name: 'Fresh Salad & Onions', price: 25, emoji: '🥗' },
  { id: 'papad', name: 'Roasted Papad & Achar', price: 15, emoji: '🥘' },
  { id: 'dahi', name: 'Homemade Dahi', price: 20, emoji: '🥛' },
]

export const timeSlots: Record<'breakfast' | 'lunch' | 'dinner', string[]> = {
  breakfast: ['8:00 AM', '8:30 AM', '9:00 AM'],
  lunch: ['12:30 PM', '1:00 PM', '1:30 PM'],
  dinner: ['8:00 PM', '8:30 PM', '9:00 PM'],
}
