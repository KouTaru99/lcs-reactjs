import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  X,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { SButton } from '@/components/shared/SButton'

export const SDialog = DialogPrimitive.Root
export const SDialogTrigger = DialogPrimitive.Trigger
export const SDialogClose = DialogPrimitive.Close
export const SDialogPortal = DialogPrimitive.Portal

export const SDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
SDialogOverlay.displayName = 'SDialogOverlay'

export const SDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SDialogPortal>
    <SDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-background p-4 shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    >
      {children}
      <SDialogClose
        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </SDialogClose>
    </DialogPrimitive.Content>
  </SDialogPortal>
))
SDialogContent.displayName = 'SDialogContent'

export const SDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('space-y-1', className)} {...props} />
)
SDialogHeader.displayName = 'SDialogHeader'

export const SDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-base font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
SDialogTitle.displayName = 'SDialogTitle'

export const SDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
SDialogDescription.displayName = 'SDialogDescription'

export const SDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-4 flex gap-2', className)} {...props} />
)
SDialogFooter.displayName = 'SDialogFooter'

export type SDialogType = 'info' | 'success' | 'warning' | 'error' | 'confirm'

const typeToIcon: Record<SDialogType, React.ReactNode> = {
  info: <Info className="h-5 w-5 text-brand" />,
  success: <CheckCircle2 className="h-5 w-5 text-success" />,
  warning: <AlertTriangle className="h-5 w-5 text-warning" />,
  error: <ShieldAlert className="h-5 w-5 text-destructive" />,
  confirm: <AlertTriangle className="h-5 w-5 text-warning" />,
}

export type SPresetDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  type?: SDialogType
  title: React.ReactNode
  description?: React.ReactNode
  content?: React.ReactNode

  /** Buttons */
  confirmText?: string
  cancelText?: string
  hideCancel?: boolean
  confirmVariant?: React.ComponentProps<typeof SButton>['variant']

  /** Handlers */
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void

  /** State */
  loading?: boolean
}

/**
 * Preset dialog for common cases:
 * - info/success/warning/error/confirm
 * - typed button variants and optional async confirm handler
 */
export function SPresetDialog({
  open,
  onOpenChange,
  type = 'info',
  title,
  description,
  content,
  confirmText = 'OK',
  cancelText = 'Hủy',
  hideCancel = false,
  confirmVariant,
  onConfirm,
  onCancel,
  loading = false,
}: SPresetDialogProps) {
  const finalConfirmVariant: React.ComponentProps<typeof SButton>['variant'] =
    confirmVariant ??
    (type === 'error'
      ? 'destructive'
      : type === 'success'
        ? 'success'
        : type === 'warning' || type === 'confirm'
          ? 'warning'
          : 'brand')

  const handleConfirm = async () => {
    if (!onConfirm) {
      onOpenChange(false)
      return
    }
    await onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  return (
    <SDialog open={open} onOpenChange={onOpenChange}>
      <SDialogContent>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            {typeToIcon[type]}
          </div>
          <div className="min-w-0 flex-1">
            <SDialogHeader>
              <SDialogTitle>{title}</SDialogTitle>
              {description ? <SDialogDescription>{description}</SDialogDescription> : null}
            </SDialogHeader>
          </div>
        </div>

        {content ? <div className="mt-3">{content}</div> : null}

        <SDialogFooter className={hideCancel ? 'justify-end' : 'justify-end'}>
          {!hideCancel ? (
            <SButton variant="outline" onClick={handleCancel} disabled={loading}>
              {cancelText}
            </SButton>
          ) : null}
          <SButton variant={finalConfirmVariant} onClick={handleConfirm} disabled={loading}>
            {loading ? 'Đang xử lý…' : confirmText}
          </SButton>
        </SDialogFooter>
      </SDialogContent>
    </SDialog>
  )
}

