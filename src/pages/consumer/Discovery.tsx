import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Search, Star, BadgeCheck, Flame, Clock } from 'lucide-react'
import { PhoneScreen } from '@/components/PhoneScreen'
import { Annotation } from '@/components/Annotation'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { chefs } from '@/data/chefs'
import { persona } from '@/data/persona'
import type { Chef } from '@/types'

export function Discovery() {
  const navigate = useNavigate()

  return (
    <PhoneScreen>
      {/* App shell header */}
      <div className="bg-gradient-to-b from-zomato to-zomato-600 px-4 pb-16 pt-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs text-white/80">
              <MapPin className="h-3.5 w-3.5" /> PG · Baner, {persona.city}
            </div>
            <p className="mt-0.5 text-sm font-semibold">Hi {persona.name.split(' ')[0]} 👋</p>
          </div>
          <span className="text-2xl" aria-hidden>
            {persona.avatar}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-ink shadow-card">
          <Search className="h-4 w-4 text-ink-faint" />
          <span className="text-sm text-ink-faint">Search “Rajma Chawal”, “Mom chefs”…</span>
        </div>
      </div>

      {/* Hero banner — the value proposition */}
      <div className="-mt-12 px-4">
        <div className="relative overflow-hidden rounded-2xl bg-ink p-5 text-white shadow-float">
          <div className="absolute -right-6 -top-6 text-8xl opacity-20" aria-hidden>
            🍲
          </div>
          <div className="absolute right-2 top-2">
            <Annotation id="discovery-banner" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ghee-200">
            Introducing
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold leading-tight">
            Zomato <span className="text-ghee">Mom</span>
          </h2>
          <p className="mt-1 text-sm text-white/80">
            Daily home-cooked meals from verified Mom Chefs near you.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill icon={<BadgeCheck className="h-3.5 w-3.5" />}>Verified Ingredients</Pill>
            <Pill icon={<Flame className="h-3.5 w-3.5" />}>Served Hot</Pill>
            <Pill icon={<Star className="h-3.5 w-3.5" />}>Zomato Mom Chefs</Pill>
          </div>
        </div>
      </div>

      {/* Chef list */}
      <div className="flex-1 px-4 pb-8 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-ink">Mom Chefs near you</h3>
          <Annotation id="discovery-persona" />
        </div>
        <div className="space-y-3">
          {chefs.map((chef, i) => (
            <ChefCard key={chef.id} chef={chef} index={i} onClick={() => navigate(`/consumer/chef/${chef.id}`)} />
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-ink-faint">
          Concept prototype · not a real ordering service.
          <br />
          Built for a Product Management portfolio.
        </p>
      </div>
    </PhoneScreen>
  )
}

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
      {icon}
      {children}
    </span>
  )
}

function ChefCard({ chef, index, onClick }: { chef: Chef; index: number; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card w-full overflow-hidden text-left"
    >
      <div className="flex gap-3 p-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-masala-100 text-3xl">
          {chef.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-bold text-ink">{chef.name}</p>
              <p className="truncate text-xs text-ink-faint">{chef.tagline}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-md bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white">
              <Star className="h-3 w-3 fill-white" />
              {chef.rating}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs text-ink-faint">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {chef.etaMins} min
            </span>
            <span>·</span>
            <span>{chef.distanceKm} km</span>
          </div>
          <div className="mt-2">
            <VerifiedBadge verified={chef.verified} size="sm" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto border-t border-masala-100 px-3 py-2 text-xs text-ink-soft scrollbar-none">
        <span className="font-medium text-ink-faint">Popular:</span>
        {chef.specialties.slice(0, 2).map((s) => (
          <span key={s.id} className="whitespace-nowrap rounded-full bg-masala-100 px-2 py-0.5">
            {s.emoji} {s.name}
          </span>
        ))}
      </div>
    </motion.button>
  )
}
