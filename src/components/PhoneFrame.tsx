import type { ReactNode } from 'react'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/lib/cn'

/**
 * Wraps the mobile lenses. On desktop (when deviceFrame is on) it renders a
 * realistic phone mockup; on mobile it fills the screen.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  const deviceFrame = useUIStore((s) => s.deviceFrame)

  if (!deviceFrame) {
    return (
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-masala-50">
        {children}
      </div>
    )
  }

  return (
    <div className="flex justify-center px-4 py-6 sm:py-10">
      {/* On small screens the frame collapses to full-bleed */}
      <div className="w-full max-w-md sm:w-[390px]">
        <div
          className={cn(
            'relative mx-auto overflow-hidden bg-masala-50',
            'sm:rounded-[2.75rem] sm:border-[10px] sm:border-ink sm:shadow-phone',
            'h-[100dvh] sm:h-[812px]',
          )}
        >
          {/* Notch */}
          <div className="pointer-events-none absolute left-1/2 top-0 z-50 hidden h-6 w-36 -translate-x-1/2 rounded-b-2xl bg-ink sm:block" />
          <div className="scrollbar-none h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}
