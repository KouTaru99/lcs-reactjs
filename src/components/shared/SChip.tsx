import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const chipVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
  {
    variants: {
      variant: {
        default: 'border-input bg-background text-foreground hover:bg-accent',
        brand: 'border-brand/30 bg-brand-muted text-brand hover:bg-brand-muted/80',
        warning: 'border-warning/30 bg-warning-muted text-warning hover:bg-warning-muted/80',
      },
      selected: {
        true: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      selected: false,
    },
  }
)

export type SChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof chipVariants>

export const SChip = React.forwardRef<HTMLButtonElement, SChipProps>(
  ({ className, variant, selected, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-pressed={!!selected}
      className={cn(chipVariants({ variant, selected }), className)}
      {...props}
    />
  )
)
SChip.displayName = 'SChip'

