// Lưới đỡ cuối cùng của app — trước nó, một lỗi throw trong click
// handler (vd runtime persist lệch với nội dung đã cập nhật) là MÀN
// TRẮNG, đường thoát duy nhất là tự biết xóa localStorage.
//
// Đây cũng là bề mặt "lỗi hệ thống" đầu tiên của app — nơi token
// --danger sống đúng vai trò của nó (đỏ CHỈ cho lỗi hệ thống, không bao
// giờ cho câu trả lời sai — tokens.css). Chuỗi hiển thị qua i18n; chi
// tiết lỗi kỹ thuật in nguyên văn cho người có nghề đọc.

import { Component, type ErrorInfo, type ReactNode } from 'react'
import type { Lang } from '../i18n'
import { ManLoiTheoLang } from './ManLoi'

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
    // Màn lỗi (kèm hai đường thoát) dùng chung với errorElement của
    // router — xem ghi chú đầu ManLoi.tsx.
    return <ManLoiTheoLang message={this.state.error.message} lang={this.props.lang} />
  }
}
