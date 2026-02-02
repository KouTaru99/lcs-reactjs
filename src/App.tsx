import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  Flag,
  PhoneCall,
  PhoneIncoming,
  Search,
  ShieldBan,
  User,
} from 'lucide-react'

import './App.css'
import {
  SBadge,
  SAppBar,
  SBottomSheet,
  SBottomSheetContent,
  SBottomSheetHeader,
  SBottomSheetTitle,
  SBottomSheetTrigger,
  SBottomNav,
  SButton,
  SCard,
  SCardContent,
  SCardDescription,
  SCardFooter,
  SCardHeader,
  SCardTitle,
  SCheckbox,
  SChip,
  SEmptyState,
  SInput,
  SListItem,
  SListItemSkeleton,
  SLoader,
  SRadioGroup,
  SRadioGroupItem,
  SSeparator,
  STabs,
  STabsContent,
  STabsList,
  STabsTrigger,
  STextarea,
  SToaster,
  toast,
  SDialog,
  SDialogContent,
  SDialogDescription,
  SDialogFooter,
  SDialogHeader,
  SDialogTitle,
} from '@/components/shared'

function App() {
  const [count, setCount] = useState(0)
  const [nav, setNav] = useState<'search' | 'block' | 'report'>('search')
  const [reportType, setReportType] = useState<'annoy' | 'scam'>('scam')
  const [loading, setLoading] = useState(false)
  const [hasResult, setHasResult] = useState(true)
  const [selectedTags, setSelectedTags] = useState<Record<string, boolean>>({
    finance: true,
    impersonation: false,
    sales: false,
    other: false,
  })
  const [comment, setComment] = useState('')
  const [dialogFormOpen, setDialogFormOpen] = useState(false)
  const [dialogSubmitting, setDialogSubmitting] = useState(false)
  const [dialogSubmitted, setDialogSubmitted] = useState(false)
  const [dialogName, setDialogName] = useState('')
  const [dialogPhone, setDialogPhone] = useState('')

  const reportTagOptions = useMemo(
    () => [
      { key: 'finance', label: 'Đầu tư tài chính' },
      { key: 'impersonation', label: 'Mạo danh' },
      { key: 'sales', label: 'Bán hàng' },
      { key: 'other', label: 'Khác' },
    ],
    []
  )

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-md">
        <SAppBar
          title="UI kit (S-*)"
          left={
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => toast('Back (demo)')}
              aria-label="Back"
            >
              <span className="text-lg">‹</span>
            </button>
          }
          right={
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => toast('Copy (demo)')}
              aria-label="Copy"
            >
              <Clipboard className="h-4 w-4" />
            </button>
          }
        />
        <div className="px-4 py-4">
        <div className="mb-6">
          <div className="text-sm text-muted-foreground">Theme & Shared Components</div>
          <div className="text-xl font-semibold">UI kit (S-*)</div>
        </div>

        <SCard className="mb-4">
          <SCardHeader>
            <SCardTitle>Tra cứu</SCardTitle>
            <SCardDescription>Khung demo để validate theme + component dùng chung.</SCardDescription>
          </SCardHeader>
          <SCardContent className="space-y-3">
            <STabs defaultValue="phone">
              <STabsList className="w-full">
                <STabsTrigger className="flex-1" value="phone">
                  Số điện thoại
                </STabsTrigger>
                <STabsTrigger className="flex-1" value="website">
                  Website
                </STabsTrigger>
              </STabsList>
              <STabsContent value="phone">
                <div className="flex gap-2">
                  <SInput inputMode="tel" placeholder="Nhập số điện thoại" />
                  <SButton variant="primary" className="shrink-0">
                    <Search className="h-4 w-4" />
                    Tra cứu
                  </SButton>
                </div>
              </STabsContent>
              <STabsContent value="website">
                <div className="flex gap-2">
                  <SInput inputMode="url" placeholder="Nhập website" />
                  <SButton variant="primary" className="shrink-0">
                    <Search className="h-4 w-4" />
                    Tra cứu
                  </SButton>
                </div>
              </STabsContent>
            </STabs>

            <div className="flex flex-wrap gap-2">
              <SBadge variant="brand">Cần cảnh giác</SBadge>
              <SBadge variant="success">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                An toàn
              </SBadge>
              <SBadge variant="warning">
                <AlertTriangle className="mr-1 h-3.5 w-3.5" />
                Lưu ý
              </SBadge>
            </div>
          </SCardContent>
          <SCardFooter className="justify-between">
            <div className="text-sm text-muted-foreground">Counter: {count}</div>
            <SButton variant="brand" size="sm" onClick={() => setCount((c) => c + 1)}>
              +1
            </SButton>
          </SCardFooter>
        </SCard>

        {/* Result + Detail primitives */}
        <SCard className="mb-4">
          <SCardHeader>
            <SCardTitle>Kết quả / Chi tiết cuộc gọi (demo)</SCardTitle>
            <SCardDescription>Mock các trạng thái loading/empty/result theo UI-Design.</SCardDescription>
          </SCardHeader>
          <SCardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <SButton
                size="sm"
                variant={loading ? 'brand' : 'outline'}
                onClick={() => setLoading((v) => !v)}
              >
                {loading ? 'Loading: ON' : 'Loading: OFF'}
              </SButton>
              <SButton
                size="sm"
                variant={hasResult ? 'brand' : 'outline'}
                onClick={() => setHasResult((v) => !v)}
              >
                {hasResult ? 'Result: ON' : 'Result: OFF'}
              </SButton>
              <SButton
                size="sm"
                variant="outline"
                onClick={() => toast('Action (demo)')}
              >
                Action
              </SButton>
            </div>

            {loading ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <SLoader />
                  Đang tìm thông tin...
                </div>
                <SListItemSkeleton />
                <SListItemSkeleton />
                <SListItemSkeleton />
              </div>
            ) : !hasResult ? (
              <SEmptyState
                icon={<AlertTriangle className="h-5 w-5" />}
                title="Không tìm thấy dữ liệu"
                description="Vui lòng kiểm tra lại số điện thoại / website và thử lại."
                action={
                  <SButton variant="brand" size="sm" onClick={() => setHasResult(true)}>
                    Thử lại
                  </SButton>
                }
              />
            ) : (
              <div className="space-y-2">
                <SListItem
                  onClick={() => toast('Open detail (demo)')}
                  left={
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      <PhoneIncoming className="h-4 w-4 text-muted-foreground" />
                    </div>
                  }
                  title="+855 232 346 543"
                  subtitle="Cần cảnh giác • 14:17, 13 Th12 • 37 giây"
                  right={<SBadge variant="brand">Cần cảnh giác</SBadge>}
                />
                <SListItem
                  onClick={() => toast('Open detail (demo)')}
                  left={
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  }
                  title="Cambodia"
                  subtitle="An toàn • 14:17, 13 Th12 • 37 giây"
                  right={<SBadge variant="success">An toàn</SBadge>}
                />
                <SListItem
                  onClick={() => toast('Open detail (demo)')}
                  left={
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      <PhoneCall className="h-4 w-4 text-muted-foreground" />
                    </div>
                  }
                  title="Hoạt động: Tư vấn/MMV - DMMVV"
                  subtitle="https://www.behance.net/search/projects?..."
                  right={<SBadge variant="warning">Lưu ý</SBadge>}
                />
              </div>
            )}
          </SCardContent>
        </SCard>

        <div className="grid grid-cols-2 gap-3">
          <SButton variant="secondary">Secondary</SButton>
          <SButton variant="outline">Outline</SButton>
          <SButton variant="ghost">Ghost</SButton>
          <SButton variant="destructive">Destructive</SButton>
        </div>

        <div className="mt-4">
          <SCard>
            <SCardHeader>
              <SCardTitle>Dialog form (demo)</SCardTitle>
              <SCardDescription>
                Ví dụ dialog có form + validate + state input. Nút Confirm/Cancel lần lượt là
                primary/secondary.
              </SCardDescription>
            </SCardHeader>
            <SCardContent className="space-y-2">
              <SButton
                variant="brand"
                className="w-full"
                onClick={() => {
                  setDialogSubmitted(false)
                  setDialogSubmitting(false)
                  setDialogFormOpen(true)
                }}
              >
                Mở dialog form
              </SButton>
            </SCardContent>
          </SCard>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <SButton
            variant="success"
            onClick={() => toast.success('Gửi báo cáo thành công')}
            className="col-span-1"
          >
            Toast success
          </SButton>
          <SButton
            variant="warning"
            onClick={() => toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!')}
            className="col-span-1"
          >
            Toast error
          </SButton>
        </div>

        <div className="mt-4">
          <SBottomSheet>
            <SBottomSheetTrigger asChild>
              <SButton variant="brand" className="w-full">
                <Flag className="h-4 w-4" />
                Mở BottomSheet Báo cáo
              </SButton>
            </SBottomSheetTrigger>
            <SBottomSheetContent>
              <SBottomSheetHeader>
                <SBottomSheetTitle>Báo cáo</SBottomSheetTitle>
              </SBottomSheetHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Bạn muốn báo cáo thuê bao này là</div>
                  <SRadioGroup
                    className="flex gap-6"
                    value={reportType}
                    onValueChange={(v) => setReportType(v as 'annoy' | 'scam')}
                  >
                    <label className="flex items-center gap-2 text-sm">
                      <SRadioGroupItem value="annoy" />
                      Làm phiền
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <SRadioGroupItem value="scam" />
                      Lừa đảo
                    </label>
                  </SRadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Nội dung báo cáo</div>
                  <div className="flex flex-wrap gap-2">
                    {reportTagOptions.map((t) => (
                      <SChip
                        key={t.key}
                        selected={!!selectedTags[t.key]}
                        onClick={() =>
                          setSelectedTags((s) => ({ ...s, [t.key]: !s[t.key] }))
                        }
                      >
                        {t.label}
                      </SChip>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Bình luận</div>
                    <div className="text-xs text-muted-foreground">{comment.length}/1000</div>
                  </div>
                  <STextarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Nhập bình luận..."
                    maxLength={1000}
                  />
                </div>

                <SSeparator />

                <label className="flex items-start gap-3 text-sm">
                  <SCheckbox defaultChecked />
                  <span>
                    Tôi xác nhận thông tin báo cáo là đúng.{' '}
                    <span className="text-muted-foreground">(demo)</span>
                  </span>
                </label>

                <div className="pt-1">
                  <SButton
                    className="w-full"
                    onClick={() => toast.success('Đã gửi báo cáo')}
                  >
                    Gửi báo cáo
                  </SButton>
                </div>
              </div>
            </SBottomSheetContent>
          </SBottomSheet>
        </div>
        </div>

        <SBottomNav
          activeKey={nav}
          onChange={(k) => setNav(k as typeof nav)}
          items={[
            { key: 'search', label: 'Tra cứu', icon: <Search className="h-5 w-5" /> },
            { key: 'block', label: 'Chặn số', icon: <ShieldBan className="h-5 w-5" /> },
            { key: 'report', label: 'Báo cáo', icon: <PhoneCall className="h-5 w-5" /> },
          ]}
        />
      </div>

      <SToaster richColors position="top-center" />

      <SDialog
        open={dialogFormOpen}
        onOpenChange={(open) => {
          setDialogFormOpen(open)
          if (!open) {
            setDialogSubmitted(false)
            setDialogSubmitting(false)
          }
        }}
      >
        <SDialogContent>
          <SDialogHeader>
            <SDialogTitle>Thêm liên hệ (demo)</SDialogTitle>
            <SDialogDescription>
              Form bất kỳ để dev tham khảo cách làm dialog có state input + validate.
            </SDialogDescription>
          </SDialogHeader>

          <div className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <div className="text-sm font-medium">Tên</div>
              <SInput
                value={dialogName}
                onChange={(e) => setDialogName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                aria-invalid={dialogSubmitted && !dialogName.trim()}
                className={
                  dialogSubmitted && !dialogName.trim()
                    ? 'border-destructive focus-visible:ring-destructive'
                    : undefined
                }
              />
              {dialogSubmitted && !dialogName.trim() ? (
                <div className="text-xs text-destructive">Vui lòng nhập tên</div>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <div className="text-sm font-medium">Số điện thoại</div>
              <SInput
                value={dialogPhone}
                onChange={(e) => setDialogPhone(e.target.value)}
                placeholder="Ví dụ: 0384 444 678"
                inputMode="tel"
                aria-invalid={dialogSubmitted && !dialogPhone.trim()}
                className={
                  dialogSubmitted && !dialogPhone.trim()
                    ? 'border-destructive focus-visible:ring-destructive'
                    : undefined
                }
              />
              {dialogSubmitted && !dialogPhone.trim() ? (
                <div className="text-xs text-destructive">Vui lòng nhập số điện thoại</div>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <div className="text-sm font-medium">Ghi chú (disabled state)</div>
              <SInput disabled placeholder="Ví dụ: field bị khóa theo nghiệp vụ" />
            </div>
          </div>

          <SDialogFooter className="justify-end">
            <SButton
              variant="secondary"
              onClick={() => setDialogFormOpen(false)}
              disabled={dialogSubmitting}
            >
              Cancel
            </SButton>
            <SButton
              variant="primary"
              onClick={() => {
                setDialogSubmitted(true)
                const ok = dialogName.trim() && dialogPhone.trim()
                if (!ok) return

                setDialogSubmitting(true)
                // Demo: giả lập submit xong thì đóng
                setTimeout(() => {
                  setDialogSubmitting(false)
                  setDialogFormOpen(false)
                  toast.success('Đã lưu (demo)')
                }, 500)
              }}
              disabled={dialogSubmitting}
            >
              {dialogSubmitting ? 'Đang lưu…' : 'Confirm'}
            </SButton>
          </SDialogFooter>
        </SDialogContent>
      </SDialog>
    </div>
  )
}

export default App
