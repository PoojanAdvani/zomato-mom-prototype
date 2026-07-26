import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ControlBar } from '@/components/ControlBar'
import { GuidedTour } from '@/components/GuidedTour'
import { PortfolioHome } from '@/pages/PortfolioHome'

// Route-level code splitting: the Ops console pulls in Recharts, so keep it out of
// the initial bundle. Each lens loads on demand.
const ConsumerApp = lazy(() =>
  import('@/pages/consumer/ConsumerApp').then((m) => ({ default: m.ConsumerApp })),
)
const ChefApp = lazy(() => import('@/pages/chef/ChefApp').then((m) => ({ default: m.ChefApp })))
const OpsConsole = lazy(() =>
  import('@/pages/ops/OpsConsole').then((m) => ({ default: m.OpsConsole })),
)

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-masala-300 border-t-zomato" />
    </div>
  )
}

export default function App() {
  // Note: route transitions use enter-only animations (each page/screen animates
  // in on mount). We deliberately avoid AnimatePresence `mode="wait"` for routing —
  // a blocking exit animation can stall navigation if the tab isn't compositing
  // (throttled rAF in a background tab), leaving the user on a frozen screen.
  return (
    <div className="min-h-[100dvh]">
      <ControlBar />
      <GuidedTour />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/consumer/*" element={<ConsumerApp />} />
          <Route path="/chef/*" element={<ChefApp />} />
          <Route path="/ops" element={<OpsConsole />} />
          <Route path="*" element={<PortfolioHome />} />
        </Routes>
      </Suspense>
    </div>
  )
}
