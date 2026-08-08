// Lưới đỡ cuối cùng của app — trước nó, một lỗi throw trong click
// handler (vd runtime persist lệch với nội dung đã cập nhật) là MÀN
// TRẮNG, đường thoát duy nhất là tự biết xóa localStorage.
//
// Đây cũng là bề mặt "lỗi hệ thống" đầu tiên của app — nơi token
// --danger sống đúng vai trò của nó (đỏ CHỈ cho lỗi hệ thống, không bao
// giờ cho câu trả lời sai — tokens.css). Chuỗi hiển thị qua i18n; chi
// tiết lỗi kỹ thuật in nguyên văn cho người có nghề đọc.

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { translate, type Lang } from '../i18n'

interface Props {
  lang: Lang
  children: ReactNode
}

interface State {
  error: Error | null
}

export class AppErrorBoundary extends Component<Props, State> {
  override state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // Không tracking, không gửi đi đâu (luật riêng tư) — chỉ console để
    // người dùng cần hỗ trợ thì chụp lại được.
    console.error('NetMaster crashed:', error, info.componentStack)
  }

  override render(): ReactNode {
    if (this.state.error === null) return this.props.children
    const t = (key: string) => translate(this.props.lang, key)
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6">
        <div className="flex max-w-md flex-col gap-4 rounded-md border border-danger/40 bg-panel px-6 py-5">
          <h1 className="text-lg font-bold text-danger">{t('error.title')}</h1>
          <p className="text-sm leading-relaxed text-ink-muted">{t('error.body')}</p>
          <pre className="overflow-x-auto rounded-md bg-bg px-3 py-2 font-mono text-xs text-ink-muted">
            {this.state.error.message}
          </pre>
          <div>
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:brightness-110"
            >
              {t('error.reload')}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
