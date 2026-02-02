import * as React from 'react'

import { cn } from '@/lib/utils'

export type SAppBarProps = {
  title?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  className?: string
}

export function SAppBar({ title, left, right, className }: SAppBarProps) {
  return (
    <div className={cn('flex h-12 items-center gap-2 px-3', className)}>
      <div className="w-10">{left}</div>
      <div className="flex-1 truncate text-sm font-medium text-foreground">{title}</div>
      <div className="flex w-10 justify-end">{right}</div>
    </div>
  )
}

