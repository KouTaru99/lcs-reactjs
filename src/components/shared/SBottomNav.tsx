import * as React from 'react'

import { cn } from '@/lib/utils'

export type SBottomNavItem = {
  key: string
  label: string
  icon: React.ReactNode
}

export type SBottomNavProps = {
  items: SBottomNavItem[]
  activeKey: string
  onChange: (key: string) => void
  className?: string
}

export function SBottomNav({ items, activeKey, onChange, className }: SBottomNavProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80',
        className
      )}
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 px-4 py-2">
        {items.map((item) => {
          const active = item.key === activeKey
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChange(item.key)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-xs transition-colors',
                active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  active ? 'bg-brand-muted text-brand' : 'bg-muted text-muted-foreground'
                )}
              >
                {item.icon}
              </div>
              <div className="leading-none">{item.label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

