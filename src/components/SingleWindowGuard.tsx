// Chặn hai cửa sổ app chạy song song (hội đồng 2026-08-07, ghế dữ liệu).
//
// Zustand persist ghi TOÀN BỘ state sau mỗi action và không có đồng bộ
// giữa các tab: học 3 bài ở cửa sổ A rồi lỡ bấm một nút ở cửa sổ B (state
// cũ trong RAM) là B ghi đè sạch công sức của A — mất tiến độ im lặng.
// Đồng bộ hai chiều là việc lớn; đúng tầm bây giờ là KHÔNG CHO xảy ra:
// cửa sổ mở SAU bị màn chặn, kèm nút "Dùng cửa sổ này" (khi đó các cửa
// sổ khác bị chặn lại — luôn chỉ một cửa sổ được ghi).
//
// BroadcastChannel không có trong môi trường test/trình duyệt rất cũ →
// guard tự tắt, app chạy như không có nó.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MonitorX } from 'lucide-react'
import { useSettings } from '../store/settings'
import { translate } from '../i18n'

const CHANNEL = 'netmaster-presence'

export function SingleWindowGuard({ children }: { children: ReactNode }) {
  const lang = useSettings((s) => s.lang)
  const [blocked, setBlocked] = useState(false)
  const blockedRef = useRef(false)
  blockedRef.current = blocked
  const channelRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return
    const ch = new BroadcastChannel(CHANNEL)
    channelRef.current = ch
    ch.onmessage = (e: MessageEvent<string>) => {
      // Cửa sổ mới chào hỏi → cửa sổ đang HOẠT ĐỘNG lên tiếng nhận chỗ.
      if (e.data === 'claim' && !blockedRef.current) ch.postMessage('active')
      // Có cửa sổ khác đang hoạt động / vừa giành quyền → mình lùi lại.
      if (e.data === 'active' || e.data === 'takeover') setBlocked(true)
    }
    ch.postMessage('claim')
    return () => ch.close()
  }, [])

  if (!blocked) return <>{children}</>

  const t = (key: string) => translate(lang, key)
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <MonitorX size={32} aria-hidden className="text-ink-muted" />
        <h1 className="text-lg font-bold text-ink">{t('app.otherWindowTitle')}</h1>
        <p className="text-sm leading-relaxed text-ink-muted">{t('app.otherWindowBody')}</p>
        <button
          onClick={() => {
            channelRef.current?.postMessage('takeover')
            setBlocked(false)
          }}
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:brightness-110"
        >
          {t('app.useThisWindow')}
        </button>
      </div>
    </div>
  )
}
