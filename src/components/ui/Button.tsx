import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-zomato text-white hover:bg-zomato-600 active:bg-zomato-700 shadow-card',
  secondary: 'bg-white text-ink border border-masala-200 hover:border-masala-300 hover:bg-masala-50',
  ghost: 'bg-transparent text-ink-soft hover:bg-masala-100',
  dark: 'bg-ink text-white hover:bg-ink-soft',
}

const sizes: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-lg',
  md: 'text-sm px-4 py-2.5 rounded-xl',
  lg: 'text-base px-5 py-3.5 rounded-xl font-semibold',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-zomato/40',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
