import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  PlayCircle,
  ArrowRight,
  Utensils,
  ChefHat,
  LineChart,
  BadgeCheck,
  Flame,
  Leaf,
} from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { persona } from '@/data/persona'

const lenses = [
  {
    to: '/consumer',
    icon: Utensils,
    title: 'Consumer app',
    desc: 'Discover verified Mom Chefs, customize a meal, subscribe daily, and track it served hot.',
    accent: 'from-zomato to-zomato-600',
  },
  {
    to: '/chef',
    icon: ChefHat,
    title: 'Chef app',
    desc: 'The supply side: daily earnings, order intake, and Blinkit-powered ingredient verification.',
    accent: 'from-ink to-ink-soft',
  },
  {
    to: '/ops',
    icon: LineChart,
    title: 'Strategy console',
    desc: 'Interactive simulators: the 25% audit trigger, unit economics, revenue model, and North Star.',
    accent: 'from-ghee-500 to-ghee-600',
  },
]

export function PortfolioHome() {
  const navigate = useNavigate()
  const startTour = useUIStore((s) => s.startTour)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-masala-50 to-masala-100 px-4 pb-14 pt-12 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink-soft shadow-card"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Product Management case study · Interactive prototype
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-6xl"
          >
            Zomato <span className="text-gradient">Mom</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-ink-soft sm:text-lg"
          >
            Daily, high-quality home-cooked meals for working professionals — powered by home chefs
            and Blinkit-verified ingredients. <span className="font-semibold text-ink">Better food for everyone.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              onClick={startTour}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-bold text-white shadow-float transition-transform hover:scale-[1.02] sm:w-auto"
            >
              <PlayCircle className="h-5 w-5" /> Take the 60-second tour
            </button>
            <button
              onClick={() => navigate('/consumer')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-zomato px-6 py-3.5 text-sm font-bold text-white shadow-card transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Open the consumer app <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Value pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Pill icon={<BadgeCheck className="h-4 w-4 text-emerald-600" />}>Verified Ingredients</Pill>
            <Pill icon={<Flame className="h-4 w-4 text-zomato" />}>Served Hot</Pill>
            <Pill icon={<Leaf className="h-4 w-4 text-emerald-600" />}>100% Green Delivery</Pill>
          </div>
        </div>
      </section>

      {/* Lens selector */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-ink">Explore three lenses</h2>
          <p className="mt-1 text-sm text-ink-soft">
            End-to-end product thinking — demand, supply, and the strategy that ties them together.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {lenses.map((lens, i) => {
            const Icon = lens.icon
            return (
              <motion.button
                key={lens.to}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(lens.to)}
                className="card group flex flex-col p-5 text-left"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${lens.accent} text-white shadow-card`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{lens.title}</h3>
                <p className="mt-1 flex-1 text-sm text-ink-soft">{lens.desc}</p>
                <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-zomato">
                  Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            )
          })}
        </div>
      </section>

      {/* Problem + persona */}
      <section className="bg-white px-4 py-14">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zomato">The problem</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">
              People lack access to quality, affordable home-cooked meals.
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              {[
                'Too busy or too tired to cook; variable hybrid routines.',
                'Personal cooks are cost-prohibitive for most.',
                'No trust in dabbawalas & mess food for daily eating.',
                '3/3 users who tried dabba services quit within a week.',
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zomato" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Persona card */}
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-masala-100 text-3xl">
                {persona.avatar}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ghee-600">
                  Target persona
                </p>
                <p className="text-lg font-bold text-ink">
                  {persona.name}, {persona.age}
                </p>
                <p className="text-xs text-ink-faint">
                  {persona.role} · {persona.city} · {persona.lives}
                </p>
              </div>
            </div>
            <p className="mt-3 rounded-xl bg-masala-50 p-3 text-sm italic text-ink-soft">
              “{persona.desire}”
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {persona.values.map((v) => (
                <span key={v} className="chip bg-emerald-50 text-emerald-700">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-ink px-4 py-12 text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center md:grid-cols-4">
          <Stat value="$540 Bn" label="TAM — home-cooked meals" />
          <Stat value="$350 Mn" label="SOM — Bengaluru segment" />
          <Stat value="₹600–1,500" label="Chef daily earnings" />
          <Stat value="20–25 yr" label="Prioritized segment" />
        </div>
      </section>

      <footer className="px-4 py-8 text-center text-xs text-ink-faint">
        Concept prototype built for a Product Management portfolio · Not affiliated with Zomato.
        <br />
        Tip: toggle <span className="font-semibold text-ghee-600">PM notes</span> in the top bar to
        see the rationale behind each decision.
      </footer>
    </motion.div>
  )
}

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink shadow-card">
      {icon}
      {children}
    </span>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-ghee sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-white/60">{label}</p>
    </div>
  )
}
