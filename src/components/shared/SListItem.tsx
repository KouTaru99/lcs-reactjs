import * as React from 'react'

import { cn } from '@/lib/utils'

export type SListItemProps = {
  left?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  right?: React.ReactNode
  onClick?: () => void
  className?: string
}

export function SListItem({
  left,
  title,
  subtitle,
  right,
  onClick,
  className,
}: SListItemProps) {
  const Comp: any = onClick ? 'button' : 'div'
  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'w-full rounded-xl border bg-card px-4 py-3 text-left shadow-sm',
        onClick &&
          'transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
    >
      <div className="flex items-start gap-3">
        {left ? <div className="mt-0.5 shrink-0">{left}</div> : null}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-foreground">{title}</div>
          {subtitle ? (
            <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {subtitle}
            </div>
          ) : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
    </Comp>
  )
}

