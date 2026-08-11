// @vitest-environment jsdom
// Nền "tự động" (kho ý tưởng B3) — lựa chọn thứ ba bên cạnh tối/sáng.
//
// Ba thứ được khóa ở đây:
//   1. 'auto' KHÔNG bao giờ chạm vào <html data-theme> dưới dạng 'auto' —
//      nó phải được quy về một trong hai nền thật trước.
//   2. Hỏi hệ điều hành mà không ai trả lời được thì rơi về TỐI (mặc định
//      của app, spec 4.1), không phải sáng.
//   3. Vòng bấm nút đúng ba nấc và quay lại đầu.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { applyTheme, nextThemePref, resolveTheme, systemTheme, watchSystemTheme } from './settings'

/** Giả lập câu trả lời của hệ điều hành cho prefers-color-scheme. */
function stubSystem(prefersLight: boolean) {
  const listeners: (() => void)[] = []
  const mq = {
    matches: prefersLight,
    addEventListener: (_: string, fn: () => void) => listeners.push(fn),
    removeEventListener: (_: string, fn: () => void) => {
      const i = listeners.indexOf(fn)
      if (i >= 0) listeners.splice(i, 1)
    },
  }
  vi.stubGlobal('matchMedia', () => mq)
  return { fire: () => listeners.forEach((fn) => fn()), listenerCount: () => listeners.length }
}

beforeEach(() => {
  delete document.documentElement.dataset['theme']
})
afterEach(() => vi.unstubAllGlobals())

describe('nextThemePref — vòng ba nấc', () => {
  it('tối → sáng → tự động → tối', () => {
    expect(nextThemePref('dark')).toBe('light')
    expect(nextThemePref('light')).toBe('auto')
    expect(nextThemePref('auto')).toBe('dark')
  })
})

describe('resolveTheme / systemTheme', () => {
  it('tối và sáng là chính nó, không hỏi hệ điều hành', () => {
    stubSystem(true)
    expect(resolveTheme('dark')).toBe('dark')
    expect(resolveTheme('light')).toBe('light')
  })

  it('tự động: hệ điều hành đang sáng → sáng, đang tối → tối', () => {
    stubSystem(true)
    expect(resolveTheme('auto')).toBe('light')
    stubSystem(false)
    expect(resolveTheme('auto')).toBe('dark')
  })

  it('không hỏi được hệ điều hành thì rơi về TỐI, không phải sáng', () => {
    // Nền tối là mặc định của app (spec 4.1) — rơi về sáng nghĩa là một
    // trình duyệt cũ tự ý đổi bộ mặt app.
    vi.stubGlobal('matchMedia', undefined)
    expect(systemTheme()).toBe('dark')
    expect(resolveTheme('auto')).toBe('dark')
  })
})

describe('applyTheme — chỉ nền THẬT được lên <html>', () => {
  it('tối: xóa hẳn data-theme', () => {
    document.documentElement.dataset['theme'] = 'light'
    applyTheme('dark')
    expect(document.documentElement.dataset['theme']).toBeUndefined()
  })

  it('sáng: đặt data-theme="light"', () => {
    applyTheme('light')
    expect(document.documentElement.dataset['theme']).toBe('light')
  })

  it('tự động KHÔNG bao giờ ghi chữ "auto" lên <html> — nó quy về nền thật', () => {
    stubSystem(true)
    applyTheme('auto')
    expect(document.documentElement.dataset['theme']).toBe('light')
    stubSystem(false)
    applyTheme('auto')
    expect(document.documentElement.dataset['theme']).toBeUndefined()
  })
})

describe('watchSystemTheme', () => {
  it('chỉ theo dõi khi đang ở tự động', () => {
    const sys = stubSystem(false)
    watchSystemTheme('dark', () => {})
    watchSystemTheme('light', () => {})
    expect(sys.listenerCount()).toBe(0)
    watchSystemTheme('auto', () => {})
    expect(sys.listenerCount()).toBe(1)
  })

  it('hệ điều hành đổi nền giữa chừng → app được báo ngay, không đợi mở lại', () => {
    const sys = stubSystem(false)
    let calls = 0
    watchSystemTheme('auto', () => calls++)
    sys.fire()
    expect(calls).toBe(1)
  })

  it('gỡ theo dõi thì thôi báo — không để lại listener khi đổi sang nền cố định', () => {
    const sys = stubSystem(false)
    const stop = watchSystemTheme('auto', () => {})
    stop()
    expect(sys.listenerCount()).toBe(0)
  })
})
