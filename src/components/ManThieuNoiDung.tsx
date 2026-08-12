// Màn "chưa tải được nội dung bài học" — bề mặt cho đúng MỘT cảnh, và
// là cảnh trước đây không có bề mặt nào cả.
//
// VÌ SAO CẦN (phát hiện L1, lượt rà soát màn hiếm gặp 08-12):
//
// `AppGate` CHỜ `primeModules()` kéo đủ 21 chunk nội dung rồi mới mở
// khung app. Promise đó có thể HỤT trong đời thật: mạng rớt giữa chừng,
// hoặc service worker cài lúc mạng chập chờn — phần nội dung được cache
// theo kiểu CỐ GẮNG (`Promise.allSettled`, xem scripts/pwa-plugin.mjs),
// nên thiếu một file là chuyện được phép xảy ra ở tầng đó. Trước đây
// không ai bắt cú hụt ấy: cổng đứng nguyên ở `return null`, người học
// nhìn MÀN TRẮNG, tải lại vẫn trắng, không một chữ nào nói vì sao.
//
// Cùng họ với J1 và K1: app không sập, nhưng cũng không đi được đâu.
//
// Màn này KHÔNG mời sang trang Hồ sơ như màn lỗi hệ thống: mọi trang
// trong app đều gọi `loadModules()` đồng bộ, mà kho nội dung đang rỗng —
// mời sang đó là mời thẳng vào một màn lỗi khác. Thứ duy nhất đáng đưa
// ở đây là đường thử lại, và một câu nói rõ tiến độ vẫn còn nguyên: cái
// hụt là bài học chưa tải về, không phải công sức đã học.

import { WifiOff } from 'lucide-react'
import { useT } from '../i18n'

export function ManThieuNoiDung({ thuLai }: { thuLai: () => void }) {
  const t = useT()
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-6">
      <div className="flex max-w-md flex-col gap-4 rounded-md border border-warn/40 bg-panel px-6 py-5">
        <div className="flex items-center gap-3">
          <WifiOff size={20} aria-hidden className="shrink-0 text-warn" />
          <h1 className="text-lg font-bold text-warn">{t('error.noiDungTitle')}</h1>
        </div>
        <p className="text-sm leading-relaxed text-ink-muted">{t('error.noiDungBody')}</p>
        <div className="flex flex-wrap gap-2">
          {/* Thử lại KHÔNG tải lại trang: `primeModules()` gọi lại là kéo
              thật (kho vẫn rỗng nên không có cache nào chắn), mà giữ
              nguyên tab đang mở. Tải lại trang lúc mất mạng còn phải
              trông vào service worker dựng lại được vỏ app. */}
          <button
            onClick={thuLai}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:brightness-110"
          >
            {t('error.noiDungRetry')}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md border border-edge px-4 py-2 text-sm font-semibold text-ink hover:bg-panel-hover"
          >
            {t('error.reload')}
          </button>
        </div>
      </div>
    </div>
  )
}
