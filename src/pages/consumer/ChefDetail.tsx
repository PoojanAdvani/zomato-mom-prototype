import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock, Soup, Plus } from 'lucide-react'
import { PhoneScreen, PhoneHeader } from '@/components/PhoneScreen'
import { Annotation } from '@/components/Annotation'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { Badge } from '@/components/ui/Badge'
import { getChef } from '@/data/chefs'
import { useOrderStore } from '@/store/useOrderStore'
import type { MealItem } from '@/types'

export function ChefDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const chef = getChef(id)
  const { setChef, setMeal } = useOrderStore()

  if (!chef) {
    return (
      <PhoneScreen>
        <PhoneHeader title="Chef not found" back />
        <div className="p-6 text-sm text-ink-faint">This chef doesn’t exist.</div>
      </PhoneScreen>
    )
  }

  const selectMeal = (meal: MealItem) => {
    setChef(chef)
    setMeal(meal)
    navigate('/consumer/customize')
  }

  return (
    <PhoneScreen>
      <PhoneHeader title={chef.name} subtitle={`${chef.area}, ${chef.city}`} back />

      {/* Profile */}
      <div className="bg-white px-4 pb-4 pt-3">
        <div className="flex gap-3">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-masala-100 text-4xl">
            {chef.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <VerifiedBadge verified={chef.verified} size="sm" />
              <Annotation id="chef-verified-badge" />
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
              <span className="flex items-center gap-1 font-semibold text-emerald-600">
                <Star className="h-3.5 w-3.5 fill-emerald-600" /> {chef.rating} ({chef.ratingCount})
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {chef.etaMins} min
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {chef.distanceKm} km
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-ghee-600">
              🍱 {chef.mealsServed.toLocaleString('en-IN')} meals served
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{chef.bio}</p>
      </div>

      {/* Ingredient provenance */}
      <div className="mt-2 bg-white px-4 py-4">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-sm font-bold text-ink">Ingredients she cooks with</h3>
          <Annotation id="chef-ingredients" />
        </div>
        <div className="flex flex-wrap gap-2">
          {chef.ingredients.map((ing) => (
            <div
              key={ing.label}
              className="group relative rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2"
            >
              <p className="text-xs font-semibold text-emerald-800">{ing.label}</p>
              <p className="text-[11px] text-emerald-700/70">{ing.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-blinkit/10 px-3 py-2 text-xs text-ink-soft">
          <span className="font-bold text-blinkit-green">Blinkit</span>
          <span>
            {chef.blinkitSourcingPct}% of groceries sourced & verified via Blinkit
          </span>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-2 flex-1 bg-white px-4 py-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
          <Soup className="h-4 w-4 text-zomato" /> Today’s specialties
        </h3>
        <div className="space-y-3">
          {chef.specialties.map((meal, i) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-2xl border border-masala-100 p-3"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-masala-100 text-2xl">
                {meal.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-emerald-600">◉</span>
                  <p className="truncate text-sm font-semibold text-ink">{meal.name}</p>
                </div>
                <p className="truncate text-xs text-ink-faint">{meal.desc}</p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-bold text-ink">₹{meal.price}</span>
                  {meal.tags?.map((t) => (
                    <Badge key={t} tone={t === 'Bestseller' ? 'red' : 'neutral'}>
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <button
                onClick={() => selectMeal(meal)}
                className="flex shrink-0 items-center gap-1 rounded-xl border border-zomato bg-white px-3 py-2 text-sm font-bold text-zomato transition-colors hover:bg-zomato hover:text-white"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-2 bg-white px-4 py-4">
        <h3 className="mb-3 text-sm font-bold text-ink">What subscribers say</h3>
        <div className="space-y-3">
          {chef.reviews.map((r, i) => (
            <div key={i} className="rounded-xl bg-masala-50 p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-ink">{r.author}</p>
                <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600">
                  <Star className="h-3 w-3 fill-emerald-600" /> {r.rating}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">{r.text}</p>
              <p className="mt-1 text-[10px] text-ink-faint">{r.when}</p>
            </div>
          ))}
        </div>
      </div>
    </PhoneScreen>
  )
}
