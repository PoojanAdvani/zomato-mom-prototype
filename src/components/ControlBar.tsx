import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Lightbulb, Smartphone, PlayCircle, Utensils, ChefHat, LineChart, Home } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/lib/cn'

const lenses = [
  { to: '/consumer', label: 'Consumer', icon: Utensils },
  { to: '/chef', label: 'Chef', icon: ChefHat },
  { to: '/ops', label: 'Strategy', icon: LineChart },
]

export function ControlBar() {
  const { annotationsOn, toggleAnnotations, deviceFrame, toggleDeviceFrame, startTour } = useUIStore()
  const location = useLocation()
  const navigate = useNavigate()
  const isMobileLens = location.pathname.startsWith('/consumer') || location.pathname.startsWith('/chef')

  return (
    <header className="sticky top-0 z-[60] border-b border-masala-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:px-5">
        {/* Brand / home */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 pr-2 text-ink transition-opacity hover:opacity-70"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zomato text-white shadow-card">
            <Home className="h-4 w-4" />
          </span>
          <span className="hidden text-sm font-bold sm:block">
            Zomato <span className="text-zomato">Mom</span>
          </span>
        </button>

        {/* Lens switcher */}
        <nav className="flex items-center gap-0.5 rounded-xl bg-masala-100 p-1">
          {lenses.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all sm:px-3',
                  isActive ? 'bg-white text-zomato shadow-card' : 'text-ink-soft hover:text-ink',
                )
              }
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden xs:inline sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          {/* Guided tour */}
          <button
            onClick={() => {
              navigate('/')
              startTour()
            }}
            className="hidden items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:flex"
          >
            <PlayCircle className="h-4 w-4" />
            Guided tour
          </button>

          {/* Annotations toggle */}
          <ToggleButton
            active={annotationsOn}
            onClick={toggleAnnotations}
            icon={<Lightbulb className="h-4 w-4" />}
            label="PM notes"
            activeClass="bg-ghee text-white"
          />

          {/* Device frame toggle (desktop only) */}
          {isMobileLens && (
            <ToggleButton
              active={deviceFrame}
              onClick={toggleDeviceFrame}
              icon={<Smartphone className="h-4 w-4" />}
              label="Frame"
              activeClass="bg-ink text-white"
              className="hidden sm:flex"
            />
          )}
        </div>
      </div>
    </header>
  )
}

function ToggleButton({
  active,
  onClick,
  icon,
  label,
  activeClass,
  className,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  activeClass: string
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all',
        active ? activeClass : 'bg-masala-100 text-ink-soft hover:bg-masala-200',
        className,
      )}
      aria-pressed={active}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  )
}
