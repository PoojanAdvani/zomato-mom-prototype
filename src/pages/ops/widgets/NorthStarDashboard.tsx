import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { Star } from 'lucide-react'
import { northStar, northStarTrend, kpiFunnel, formatNum } from '@/data/metrics'
import { cn } from '@/lib/cn'

/** Dense KPI ribbon: North Star tile + supporting metric tiles. */
export function KpiRow() {
  const progressPct = Math.round((northStar.current / northStar.target) * 100)
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {/* North Star */}
      <div className="col-span-2 rounded-xl border border-ink bg-ink p-3 text-white">
        <div className="flex items-center gap-1.5 text-ghee-200">
          <Star className="h-3.5 w-3.5 fill-ghee-200" />
          <span className="text-[11px] font-semibold uppercase tracking-wide">North Star</span>
        </div>
        <p className="mt-0.5 text-[11px] leading-tight text-white/55">Meals to subscribers / mo</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums">{formatNum(northStar.current)}</span>
          <span className="text-xs font-semibold text-emerald-300">▲ {northStar.wowGrowthPct}%</span>
        </div>
        <div className="mt-2">
          <div className="mb-1 flex justify-between text-[10px] text-white/50">
            <span>{progressPct}% to target</span>
            <span>{formatNum(northStar.target)}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-ghee" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      <Metric label="Repeat subscription" value="72%" delta="▲ 4%" tone="good" />
      <Metric label="Avg delivery time" value="26 min" sub="Under 30-min SLA" />
      <Metric label="Chefs on Blinkit" value="88%" delta="▲ 6%" tone="good" />
      <Metric label="First-meal activation" value="61%" delta="▲ 2%" tone="good" />
    </div>
  )
}

function Metric({
  label,
  value,
  delta,
  sub,
  tone,
}: {
  label: string
  value: string
  delta?: string
  sub?: string
  tone?: 'good' | 'bad'
}) {
  return (
    <div className="rounded-xl border border-masala-200 bg-white p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">{label}</p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-xl font-bold tabular-nums text-ink">{value}</span>
        {delta && (
          <span
            className={cn(
              'text-[11px] font-semibold',
              tone === 'bad' ? 'text-zomato-600' : 'text-emerald-600',
            )}
          >
            {delta}
          </span>
        )}
      </div>
      {sub && <p className="mt-0.5 text-[11px] text-ink-faint">{sub}</p>}
    </div>
  )
}

/** Compact area chart of meals served over the last 8 weeks. */
export function TrendPanel() {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={northStarTrend} margin={{ top: 6, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="nsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E23744" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#E23744" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E9DFD2" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 10, fill: '#8A8480' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#8A8480' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v / 1000}k`}
            width={38}
          />
          <Tooltip
            cursor={{ stroke: '#E23744', strokeWidth: 1, strokeDasharray: '4 4' }}
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #E9DFD2',
              fontSize: 11,
              padding: '6px 10px',
              boxShadow: '0 8px 24px rgba(28,27,26,0.12)',
            }}
            formatter={(v: number) => [formatNum(v) + ' meals', 'Served']}
          />
          <Area
            type="monotone"
            dataKey="meals"
            stroke="#E23744"
            strokeWidth={2.5}
            fill="url(#nsFill)"
            dot={{ r: 2.5, fill: '#E23744' }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

/** Compact demand × supply metric funnel. */
export function FunnelTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[300px] border-collapse text-left text-[11px]">
        <thead>
          <tr className="text-ink-faint">
            <th className="pb-1.5 font-semibold uppercase tracking-wide">Stage</th>
            <th className="pb-1.5 font-semibold uppercase tracking-wide">Demand</th>
            <th className="pb-1.5 font-semibold uppercase tracking-wide">Supply</th>
          </tr>
        </thead>
        <tbody>
          {kpiFunnel.map((row) => (
            <tr key={row.stage} className="border-t border-masala-100 align-top">
              <td className="py-2 pr-2 font-bold text-zomato">{row.stage}</td>
              <td className="py-2 pr-2 text-ink-soft">
                <ul className="space-y-0.5">
                  {row.demand.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </td>
              <td className="py-2 text-ink-soft">
                <ul className="space-y-0.5">
                  {row.supply.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
