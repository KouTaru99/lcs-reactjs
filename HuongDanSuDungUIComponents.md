### Hướng dẫn sử dụng UI Components (S-*)

Tài liệu này hướng dẫn **cách import và sử dụng** toàn bộ shared components prefix `S-` đã tạo trong dự án.

> Quy ước import: tất cả component được export từ `@/components/shared`.

---

### Import nhanh

```tsx
import {
  SAppBar,
  SBadge,
  SBottomNav,
  SBottomSheet,
  SBottomSheetContent,
  SBottomSheetHeader,
  SBottomSheetTitle,
  SBottomSheetTrigger,
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
  SIconButton,
  SInput,
  SListItem,
  SListItemSkeleton,
  SLoader,
  SRadioGroup,
  SRadioGroupItem,
  SSeparator,
  SSkeleton,
  STabs,
  STabsContent,
  STabsList,
  STabsTrigger,
  STextarea,
  SToaster,
  toast,
} from '@/components/shared'
```

---

### SButton

**Khi dùng**: mọi nút bấm chính/phụ/outline/ghost… trong app.

**Variants**:
- `primary` (default)
- `secondary`
- `brand`
- `success`
- `warning`
- `outline`
- `ghost`
- `link`
- `destructive`

**Sizes**: `sm | md (default) | lg | icon`

```tsx
<SButton>Primary</SButton>
<SButton variant="brand">Brand</SButton>
<SButton variant="outline">Outline</SButton>
<SButton variant="icon" size="icon" aria-label="Search">
  <Search className="h-4 w-4" />
</SButton>
```

---

### SInput

**Khi dùng**: mọi input text/phone/url…

```tsx
<SInput placeholder="Nhập số điện thoại" inputMode="tel" />
<SInput placeholder="Nhập website" inputMode="url" />
```

---

### STextarea

**Khi dùng**: comment/ghi chú, multiline.

```tsx
const [comment, setComment] = useState('')

<STextarea
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  placeholder="Nhập bình luận..."
  maxLength={1000}
/>
```

---

### SCard (layout khối nội dung)

**Khi dùng**: card hiển thị cụm thông tin (tra cứu, kết quả, khuyến nghị…).

```tsx
<SCard>
  <SCardHeader>
    <SCardTitle>Tra cứu</SCardTitle>
    <SCardDescription>Mô tả ngắn</SCardDescription>
  </SCardHeader>
  <SCardContent>
    Nội dung...
  </SCardContent>
  <SCardFooter className="justify-end">
    <SButton size="sm">OK</SButton>
  </SCardFooter>
</SCard>
```

---

### SBadge

**Khi dùng**: nhãn trạng thái (An toàn / Cần cảnh giác / Lưu ý…).

```tsx
<SBadge>Default</SBadge>
<SBadge variant="brand">Cần cảnh giác</SBadge>
<SBadge variant="success">An toàn</SBadge>
<SBadge variant="warning">Lưu ý</SBadge>
<SBadge variant="destructive">Nguy hiểm</SBadge>
```

---

### SChip (selectable)

**Khi dùng**: tag chọn nhiều (nội dung báo cáo, filter…).

```tsx
const [selected, setSelected] = useState(false)

<SChip selected={selected} onClick={() => setSelected((v) => !v)}>
  Đầu tư tài chính
</SChip>
```

---

### SCheckbox

**Khi dùng**: checkbox xác nhận, bật/tắt lựa chọn.

```tsx
<label className="flex items-start gap-3 text-sm">
  <SCheckbox defaultChecked />
  <span>Tôi xác nhận thông tin báo cáo là đúng</span>
</label>
```

---

### SRadioGroup / SRadioGroupItem

**Khi dùng**: radio chọn 1 trong nhiều lựa chọn.

```tsx
const [value, setValue] = useState<'annoy' | 'scam'>('scam')

<SRadioGroup value={value} onValueChange={(v) => setValue(v as any)} className="flex gap-6">
  <label className="flex items-center gap-2 text-sm">
    <SRadioGroupItem value="annoy" />
    Làm phiền
  </label>
  <label className="flex items-center gap-2 text-sm">
    <SRadioGroupItem value="scam" />
    Lừa đảo
  </label>
</SRadioGroup>
```

---

### STabs / STabsList / STabsTrigger / STabsContent

**Khi dùng**: segmented/tabs chuyển mode “Số điện thoại / Website”.

```tsx
<STabs defaultValue="phone">
  <STabsList className="w-full">
    <STabsTrigger className="flex-1" value="phone">Số điện thoại</STabsTrigger>
    <STabsTrigger className="flex-1" value="website">Website</STabsTrigger>
  </STabsList>

  <STabsContent value="phone">...</STabsContent>
  <STabsContent value="website">...</STabsContent>
</STabs>
```

---

### SBottomSheet (Report Sheet)

**Khi dùng**: bottom sheet trượt lên (màn “Báo cáo”, menu action…).

```tsx
<SBottomSheet>
  <SBottomSheetTrigger asChild>
    <SButton variant="brand">Mở Báo cáo</SButton>
  </SBottomSheetTrigger>

  <SBottomSheetContent>
    <SBottomSheetHeader>
      <SBottomSheetTitle>Báo cáo</SBottomSheetTitle>
    </SBottomSheetHeader>
    Nội dung...
  </SBottomSheetContent>
</SBottomSheet>
```

---

### Toast (SToaster + toast)

**Khi dùng**: thông báo success/error ở đầu màn.

```tsx
// đặt 1 lần ở root layout (hoặc App.tsx demo)
<SToaster richColors position="top-center" />

// gọi ở bất cứ đâu
toast.success('Gửi báo cáo thành công')
toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!')
toast('Thông báo thường')
```

---

### Loading / Skeleton / Empty State

**SSkeleton**: primitive (khối xám), dùng để ghép skeleton theo layout.

```tsx
<SSkeleton className="h-4 w-40" />
<SSkeleton className="h-16 w-full rounded-xl" />
```

**SLoader**: spinner (đi kèm text).

```tsx
<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <SLoader /> Đang tải...
</div>
```

**SEmptyState**: trạng thái rỗng/lỗi có CTA.

```tsx
<SEmptyState
  icon={<AlertTriangle className="h-5 w-5" />}
  title="Không tìm thấy dữ liệu"
  description="Vui lòng thử lại."
  action={<SButton size="sm" variant="brand">Thử lại</SButton>}
/>
```

---

### SListItem & SListItemSkeleton

**Khi dùng**: row card cho danh sách kết quả/chi tiết, lịch sử…

```tsx
<SListItem
  onClick={() => {}}
  left={<div className="h-9 w-9 rounded-full bg-muted" />}
  title="+855 232 346 543"
  subtitle="Cần cảnh giác • 14:17 • 37 giây"
  right={<SBadge variant="brand">Cần cảnh giác</SBadge>}
/>
```

**Loading row đúng hình**:

```tsx
<SListItemSkeleton />
<SListItemSkeleton />
<SListItemSkeleton />
```

---

### SSeparator

**Khi dùng**: phân tách section trong sheet/form.

```tsx
<SSeparator />
```

---

### SIconButton

**Khi dùng**: icon-only actions (copy, close, more…).

```tsx
<SIconButton aria-label="Copy" onClick={() => {}}>
  <Clipboard className="h-4 w-4" />
</SIconButton>
```

---

### SAppBar

**Khi dùng**: header mobile kiểu back + title + actions.

```tsx
<SAppBar
  title="Thông tin chi tiết"
  left={<button type="button">‹</button>}
  right={<SIconButton aria-label="Copy"><Clipboard className="h-4 w-4" /></SIconButton>}
/>
```

---

### SBottomNav

**Khi dùng**: bottom navigation 3 tab (Tra cứu / Chặn số / Báo cáo…).

```tsx
const [active, setActive] = useState('search')

<SBottomNav
  activeKey={active}
  onChange={setActive}
  items={[
    { key: 'search', label: 'Tra cứu', icon: <Search className="h-5 w-5" /> },
    { key: 'block', label: 'Chặn số', icon: <ShieldBan className="h-5 w-5" /> },
    { key: 'report', label: 'Báo cáo', icon: <PhoneCall className="h-5 w-5" /> },
  ]}
/>
```

---

### Ghi chú về theme tokens

Bạn có thể dùng các token trong className:

- `bg-brand text-brand-foreground`
- `bg-success text-success-foreground`
- `bg-warning text-warning-foreground`
- `bg-muted text-muted-foreground`

Khi có token chuẩn từ designer, chỉ cần cập nhật CSS variables trong `src/index.css` (không sửa lại từng component).

