import * as React from 'react'

import { cn } from '@/lib/utils'
import { SSkeleton } from '@/components/shared/SSkeleton'

export type SListItemSkeletonProps = {
  className?: string
  withLeft?: boolean
  withRight?: boolean
}

export function SListItemSkeleton({
  className,
  withLeft = true,
  withRight = true,
}: SListItemSkeletonProps) {
  return (
    <div className={cn('w-full rounded-xl border bg-card px-4 py-3 shadow-sm', className)}>
      <div className="flex items-start gap-3">
        {withLeft ? <SSkeleton className="mt-0.5 h-9 w-9 rounded-full" /> : null}
        <div className="min-w-0 flex-1 space-y-2">
          <SSkeleton className="h-4 w-44" />
          <SSkeleton className="h-3 w-64 max-w-full" />
        </div>
        {withRight ? <SSkeleton className="h-5 w-24 rounded-full" /> : null}
      </div>
    </div>
  )
}

