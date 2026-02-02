### Hướng dẫn xây dựng UI Base (theme + shared components)

Tài liệu này mô tả **quy trình chuẩn** khi được giao nhiệm vụ xây dựng **theme** và **các component dùng chung** (prefix `S-`) cho một dự án React + Vite + Tailwind + shadcn-style.

---

### Mục tiêu

- **Theme nhất quán**: toàn bộ UI dùng chung 1 hệ token (colors, radius, typography…).
- **Component tái sử dụng**: S- components có API rõ ràng, dễ compose, dễ mở rộng.
- **Đúng UX + a11y**: focus, keyboard, aria, disabled state, loading state.
- **Dễ review**: có demo page/Storybook (nếu có), checklist QA cơ bản.

---

### Bước 0 — Xác nhận đầu bài

- **Phạm vi**:
  - Chỉ làm UI base hay kèm screen cụ thể?
  - Mobile-first hay responsive đa màn hình?
  - Có dark mode không?
- **Nguồn thiết kế**:
  - Folder hình ảnh (`UI-Design/`) hoặc Figma link.
  - Danh sách “must-have” component (Button, Input, BottomSheet…).
- **Quy ước tên**:
  - Shared component: `S-` prefix (VD: `SButton`, `SInput`…).
  - Token: dùng CSS variables + Tailwind map.

---

### Bước 1 — Phân tích thiết kế (Design audit)

Từ `UI-Design/` (hoặc Figma), liệt kê:

- **Màu**:
  - Background / foreground
  - Primary/secondary
  - Border/input/ring
  - Semantic: success/warning/destructive/info
  - “Brand” (tạm có thể chọn placeholder, sau thay bằng token chuẩn)
- **Bo góc (radius)**: card, button, chip, bottom sheet.
- **Typography**: font, size, weight, line-height cho title/body/caption.
- **Spacing/layout**: padding card, gap list item, height input/button…
- **Pattern UI**:
  - Tabs/segmented
  - Bottom sheet
  - Toast/banners
  - List rows (kết quả, chi tiết…)
  - Empty/loading states

Output của bước này nên là **bảng token** (có thể tạm trong markdown).

---

### Bước 2 — Dựng Theme Tokens (CSS Variables)

**Nguyên tắc**: token nằm ở CSS variables để:
- Dễ đổi theme (light/dark)
- Dễ đồng bộ giữa các component

Thực hiện:

- **Trong `src/index.css`**:
  - Khai báo `@tailwind base; components; utilities;`
  - Trong `@layer base` thêm `:root { ... }` và `.dark { ... }`
  - Khai báo tối thiểu:
    - `--background`, `--foreground`, `--card`, `--border`, `--input`, `--ring`
    - `--primary`, `--secondary`, `--accent`, `--muted`
    - `--destructive`, `--success`, `--warning`
    - `--radius`
    - `--brand` (placeholder nếu chưa có màu chuẩn)

---

### Bước 3 — Map token vào Tailwind (`tailwind.config.cjs`)

- **darkMode**: `['class']`
- **content**: `['./index.html', './src/**/*.{js,ts,jsx,tsx}']`
- **theme.extend.colors**: map từ CSS variables:
  - `background: 'hsl(var(--background))'`
  - `primary.DEFAULT: 'hsl(var(--primary))'`…
  - `success`, `warning`, `brand`…
- **borderRadius**: map theo `--radius`:
  - `lg: 'var(--radius)'`, `md/sm` theo công thức.
- **plugin**: nếu dùng animation (VD `tailwindcss-animate`) thì add và đảm bảo đã install deps.

---

### Bước 4 — Quy ước cấu trúc thư mục

Khuyến nghị:

- `src/components/shared/`:
  - Mỗi file 1 component: `SButton.tsx`, `SInput.tsx`, `SBottomSheet.tsx`…
  - `index.ts` export tất cả để import gọn: `import { SButton } from '@/components/shared'`
- `src/lib/utils.ts`:
  - `cn()` để merge className (`clsx` + `tailwind-merge`)

---

### Bước 5 — Xây shared components theo thứ tự ưu tiên

Thứ tự khuyến nghị (để build screen nhanh nhất):

- **Core**:
  - `SButton`, `SInput`, `STextarea`, `SBadge`, `SCard`
- **Layout/Navigation**:
  - `SAppBar`, `SBottomNav`
- **Behavior**:
  - `STabs`/segmented
  - `SBottomSheet` (Radix Dialog)
  - `SToast` (VD dùng `sonner`)
- **States**:
  - `SLoader`, `SSkeleton`, `SEmptyState`
  - `SListItem` + `SListItemSkeleton` (danh sách kết quả/chi tiết)
- **Form**:
  - `SCheckbox`, `SRadioGroup`
  - (tuỳ dự án) `SSelect`, `SSwitch`, `SDatePicker`…

---

### Bước 6 — Chuẩn hóa API component (để “dùng lại” thật sự)

Checklist:

- **Props tối thiểu**: `className`, `children`, `...props` passthrough
- **Variant/size**: dùng `class-variance-authority (cva)` cho:
  - `SButton`, `SBadge`, `SChip`, `SIconButton`…
- **forwardRef**: dùng `React.forwardRef` cho input/button/dialog content…
- **State classes**:
  - `disabled`, `focus-visible`, `hover`, `active`
  - `data-[state=...]` nếu dùng Radix
- **A11y**:
  - `aria-pressed` cho chip toggle
  - `aria-current="page"` cho bottom nav active
  - label/keyboard navigation cho radio/checkbox

---

### Bước 7 — Loading & Skeleton “đúng hình”

Nguyên tắc:
- Loading không chỉ có spinner; cần skeleton **giống layout thật** (row/card/form).

Thực hiện:
- `SSkeleton` là primitive (khối xám)
- Tạo skeleton theo component:
  - `SListItemSkeleton` (avatar + title/subtitle + badge)
  - (tuỳ màn) `SCardSkeleton`, `SFormSkeleton`

---

### Bước 8 — Demo/Playground để review nhanh

Tạo 1 màn demo (VD trong `App.tsx` hoặc route `/ui-kit`) gồm:

- Theme preview (light/dark nếu có)
- Button variants, input states
- BottomSheet + form demo
- Toast success/error
- List result + loading + empty

Mục tiêu: designer/PM/dev **review trong 1 trang** thay vì lật nhiều màn.

---

### Bước 9 — Checklist QA trước khi bàn giao

- **Theme**:
  - Màu/contrast ổn (đặc biệt text trên primary/brand)
  - Radius/spacing nhất quán
- **A11y**:
  - Tab focus đi được tới mọi control
  - Có focus ring rõ
  - Label/aria cơ bản ok
- **States**:
  - disabled/hover/focus/active/loading/empty đều có hiển thị hợp lý
- **Dev experience**:
  - Import gọn qua `src/components/shared/index.ts`
  - Không trùng lặp class
  - Tên component/variant rõ ràng, dễ đoán

---

### Bước 10 — Khi có token chuẩn từ designer (cập nhật “brand”)

Khi bạn nhận được mã màu chuẩn:

- Chỉ cần update:
  - `--brand`, `--brand-foreground`, `--brand-muted` trong `src/index.css`
- Không phải sửa lại từng component (vì đã map qua Tailwind token `brand`).

---

### Gợi ý mở rộng (khi dự án lớn dần)

- Tách demo sang route riêng: `src/pages/UiKit.tsx`
- Thêm Storybook để review component độc lập
- Thêm snapshot visual test (nếu team cần)

