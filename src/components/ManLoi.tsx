// Màn "có gì đó hỏng" — bề mặt lỗi hệ thống DUY NHẤT của app, dùng
// chung cho hai lưới đỡ: `AppErrorBoundary` (lỗi ngoài router) và
// `errorElement` của router (lỗi khi render một route).
//
// VÌ SAO PHẢI CÓ ĐƯỜNG THOÁT Ở ĐÂY, không chỉ một nút Tải lại (phát
// hiện J1 của lượt rà soát 08-12):
//
// App mở ra là tự vào phiên ôn khi còn thẻ đến hạn ("ôn trước học sau").
// Nếu chính phiên ôn là chỗ ném lỗi, người học rơi vào vòng lặp kín: mở
// app → sập → bấm Tải lại → vào lại phiên ôn → sập. Màn lỗi thay cả
// khung app nên bốn tab biến mất luôn, và trang Hồ sơ — nơi có nút lùi
// về bản tự lưu — không còn đường nào tới được. Tiến độ vẫn nằm nguyên
// trong máy mà người học không cách nào chạm tới: đó là kiểu mất mát
// tệ nhất, mất mà biết là mình vẫn còn.
//
// Nên màn này mang theo hai đường ra không phụ thuộc vào phần app đang
// hỏng: mở thẳng trang Hồ sơ (điều hướng cứng, không qua router), và
// lùi thẳng về bản tự lưu gần nhất (chỉ đụng localStorage, không cần
// engine nào chạy được).

import { useT } from '../i18n'
import { translate, type Lang } from '../i18n'
import { docAnhChup, khoiPhuc } from '../store/anhChup'

/** dd/mm HH:mm — cùng lối rút gọn với danh sách bản tự lưu ở Hồ sơ. */
function gioNgan(luc: string): string {
  const d = new Date(luc)
  if (Number.isNaN(d.getTime())) return luc
  const hai = (n: number) => String(n).padStart(2, '0')
  return `${hai(d.getDate())}/${hai(d.getMonth() + 1)} ${hai(d.getHours())}:${hai(d.getMinutes())}`
}

export interface ManLoiProps {
  /** Lời máy nói — in nguyên văn cho người có nghề đọc. */
  message: string
  /**
   * Ngôn ngữ: `AppErrorBoundary` là class component không hook được nên
   * truyền vào; bản dùng trong router thì lấy từ `useT`.
   */
  t: (key: string, params?: Record<string, string | number>) => string
}

export function ManLoi({ message, t }: ManLoiProps) {
  // Đọc TRONG lúc render: màn này chỉ dựng khi đã hỏng, và danh sách bản
  // tự lưu là thứ duy nhất còn đọc được mà không cần store sống.
  const banTuLuu = docAnhChup()
  const banMoiNhat = banTuLuu[0] ?? null

  const lui = () => {
    if (banMoiNhat === null) return
    if (!window.confirm(t('error.rollbackConfirm', { luc: gioNgan(banMoiNhat.luc) }))) return
    khoiPhuc(banMoiNhat, new Date())
    window.location.assign('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-6">
      <div className="flex max-w-md flex-col gap-4 rounded-md border border-danger/40 bg-panel px-6 py-5">
        <h1 className="text-lg font-bold text-danger">{t('error.title')}</h1>
        <p className="text-sm leading-relaxed text-ink-muted">{t('error.body')}</p>
        <pre className="overflow-x-auto rounded-md bg-bg px-3 py-2 font-mono text-xs text-ink-muted">{message}</pre>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:brightness-110"
          >
            {t('error.reload')}
          </button>
          {/* Điều hướng CỨNG, không dùng router: chính router có thể là
              thứ đang hỏng, và cổng "ôn trước học sau" chỉ chặn ở trang
              gốc nên /ho-so luôn vào thẳng được. */}
          <button
            onClick={() => window.location.assign('/ho-so')}
            className="rounded-md border border-edge px-4 py-2 text-sm font-semibold text-ink hover:bg-panel-hover"
          >
            {t('error.openProfile')}
          </button>
        </div>
        {banMoiNhat !== null && (
          <div className="flex flex-col gap-2 border-t border-edge pt-3">
            <p className="text-xs leading-relaxed text-ink-muted">{t('error.rollbackNote')}</p>
            <div>
              <button
                onClick={lui}
                className="rounded-md border border-edge px-4 py-2 text-sm font-semibold text-ink hover:bg-panel-hover"
              >
                {t('error.rollback', { luc: gioNgan(banMoiNhat.luc) })}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Đọc lời máy nói từ thứ router ném ra.
 *
 * Router không chỉ ném `Error`: đường không khớp route nào thì nó ném
 * một object `{status, statusText}`. `String(object)` ra "[object
 * Object]" — đúng thứ vô dụng nhất có thể in ở màn này, vì dòng đó tồn
 * tại để người cần hỗ trợ chụp lại gửi đi.
 */
export function loiThanhChu(error: unknown): string {
  if (error instanceof Error) return error.message
  if (error !== null && typeof error === 'object') {
    const e = error as { status?: unknown; statusText?: unknown; data?: unknown }
    if (typeof e.status === 'number') {
      const duoi = typeof e.data === 'string' && e.data !== '' ? ` — ${e.data}` : ''
      return `${e.status} ${typeof e.statusText === 'string' ? e.statusText : ''}${duoi}`.trim()
    }
    try {
      return JSON.stringify(error)
    } catch {
      return String(error)
    }
  }
  return String(error)
}

/** Bản cho `errorElement` của router — lỗi khi render một route. */
export function ManLoiRoute({ error }: { error: unknown }) {
  const t = useT()
  return <ManLoi message={loiThanhChu(error)} t={t} />
}

/** Bản cho class boundary — nhận `lang` vì class không hook được. */
export function ManLoiTheoLang({ message, lang }: { message: string; lang: Lang }) {
  return <ManLoi message={message} t={(key, params) => translate(lang, key, params)} />
}
