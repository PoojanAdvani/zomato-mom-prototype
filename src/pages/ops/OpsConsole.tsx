import { OpsSection } from './OpsSection'
import { KpiRow, TrendPanel, FunnelTable } from './widgets/NorthStarDashboard'
import { VerificationSimulator } from './widgets/VerificationSimulator'
import { UnitEconomicsPlayground } from './widgets/UnitEconomicsPlayground'
import { RevenueCalculator } from './widgets/RevenueCalculator'

export function OpsConsole() {
  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-5 sm:py-6">
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-masala-200 pb-3">
        <div>
          <h1 className="text-lg font-bold leading-tight text-ink">Operations &amp; Analytics</h1>
          <p className="text-xs text-ink-faint">Zomato Mom · Bengaluru MVP</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
          </span>
          <span className="rounded-full border border-masala-200 px-2.5 py-1 font-medium text-ink-soft">
            Last 8 weeks
          </span>
        </div>
      </div>

      {/* KPI ribbon */}
      <KpiRow />

      {/* Trend + funnel */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <OpsSection title="Meals served / week" meta="North Star trend" className="lg:col-span-2">
          <TrendPanel />
        </OpsSection>
        <OpsSection title="Metric funnel" meta="demand × supply">
          <FunnelTable />
        </OpsSection>
      </div>

      {/* Verification simulator */}
      <div className="mt-4">
        <OpsSection
          title="Blinkit ingredient verification"
          meta="audit > 25%"
          annotationId="ops-verification"
        >
          <VerificationSimulator />
        </OpsSection>
      </div>

      {/* Economics + revenue */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <OpsSection title="Unit economics" meta="per chef / day" annotationId="ops-economics">
          <UnitEconomicsPlayground />
        </OpsSection>
        <OpsSection title="Revenue model" meta="monthly" annotationId="ops-revenue">
          <RevenueCalculator />
        </OpsSection>
      </div>
    </div>
  )
}
