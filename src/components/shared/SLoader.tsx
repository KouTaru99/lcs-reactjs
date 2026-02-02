import * as React from 'react'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

export type SLoaderProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: number
}

export function SLoader({ className, size = 18, ...props }: SLoaderProps) {
  return (
    <div className={cn('inline-flex items-center gap-2', className)} {...props}>
      <Loader2 className="animate-spin text-muted-foreground" style={{ width: size, height: size }} />
    </div>
  )
}

