import { cn } from '@/lib/cn'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  format?: (v: number) => string
  className?: string
}

/** Labeled range slider used across the Ops console simulators. */
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  className,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-ink-soft">{label}</label>
        <span className="text-sm font-bold tabular-nums text-ink">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-slider w-full"
        style={{
          background: `linear-gradient(to right, #E23744 0%, #E23744 ${pct}%, #E9DFD2 ${pct}%, #E9DFD2 100%)`,
        }}
      />
    </div>
  )
}
