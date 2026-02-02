import { useState } from 'react'
import { AlertTriangle, CheckCircle2, Search } from 'lucide-react'

import './App.css'
import {
  SBadge,
  SButton,
  SCard,
  SCardContent,
  SCardDescription,
  SCardFooter,
  SCardHeader,
  SCardTitle,
  SInput,
} from '@/components/shared'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-md px-4 py-6">
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
            <div className="flex gap-2">
              <SInput placeholder="Số điện thoại / Website" />
              <SButton variant="primary" className="shrink-0">
                <Search className="h-4 w-4" />
                Tra cứu
              </SButton>
            </div>

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

        <div className="grid grid-cols-2 gap-3">
          <SButton variant="secondary">Secondary</SButton>
          <SButton variant="outline">Outline</SButton>
          <SButton variant="ghost">Ghost</SButton>
          <SButton variant="destructive">Destructive</SButton>
        </div>
      </div>
    </div>
  )
}

export default App
