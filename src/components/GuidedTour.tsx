import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowRight, Utensils, ChefHat, LineChart, Sparkles } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'

const tourSteps = [
  {
    icon: Sparkles,
    title: 'Welcome — a 60-second tour',
    body: 'Zomato Mom is a two-sided marketplace for daily home-cooked meals. We’ll walk the consumer app, the chef app, and the strategy behind it.',
    cta: 'Start with the consumer',
    route: '/consumer',
  },
  {
    icon: Utensils,
    title: '1 · Consumer app',
    body: 'Mohit discovers verified Mom Chefs, sees exactly which ingredients they cook with, customizes a meal, and subscribes daily. Tap a chef to explore.',
    cta: 'Next: the chef side',
    route: '/chef',
  },
  {
    icon: ChefHat,
    title: '2 · Chef app (supply)',
    body: 'Madhu sees her daily earnings, accepts orders, and orders ingredients on Blinkit — which keeps her "Verified Ingredients" tag alive.',
    cta: 'Next: the strategy',
    route: '/ops',
  },
  {
    icon: LineChart,
    title: '3 · Strategy console',
    body: 'The engine room: drag the Blinkit verification simulator past 25% to trigger an audit, stress-test unit economics, and model revenue. This is the PM depth.',
    cta: 'Finish tour',
    route: null,
  },
]

export function GuidedTour() {
  const { tourStep, nextTourStep, endTour } = useUIStore()
  const navigate = useNavigate()
  const active = tourStep !== null

  // enable PM notes while touring for full context
  useEffect(() => {
    if (!active) return
    const { annotationsOn, toggleAnnotations } = useUIStore.getState()
    if (!annotationsOn) toggleAnnotations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  if (!active || tourStep === null) return null
  const step = tourSteps[Math.min(tourStep, tourSteps.length - 1)]
  const Icon = step.icon
  const isLast = tourStep >= tourSteps.length - 1

  const advance = () => {
    if (isLast) {
      endTour()
      return
    }
    if (step.route) navigate(step.route)
    nextTourStep()
  }

  return (
    <AnimatePresence>
      <motion.div
        key="tour"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="fixed inset-x-0 bottom-4 z-[70] mx-auto w-[calc(100%-2rem)] max-w-md px-1"
      >
        <div className="relative overflow-hidden rounded-2xl bg-ink p-5 text-white shadow-float">
          <button
            onClick={endTour}
            className="absolute right-3 top-3 text-white/50 hover:text-white"
            aria-label="Close tour"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2 text-ghee-200">
            <Icon className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">Guided tour</span>
          </div>
          <p className="mt-2 text-base font-bold">{step.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/75">{step.body}</p>

          <div className="mt-4 flex items-center justify-between">
            {/* progress dots */}
            <div className="flex gap-1.5">
              {tourSteps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === tourStep ? 'w-5 bg-ghee' : 'w-1.5 bg-white/25'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={advance}
              className="flex items-center gap-1.5 rounded-xl bg-zomato px-4 py-2 text-sm font-bold text-white hover:bg-zomato-600"
            >
              {step.cta}
              {!isLast && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
