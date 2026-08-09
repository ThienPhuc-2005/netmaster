// Contrast AA (spec 4.1) đo bằng CÔNG THỨC WCAG THẬT trên chính
// tokens.css — đổi màu mà rớt 4.5:1 là test này đỏ, không cần nhớ tay.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// Đọc thẳng file bằng fs (import '?raw' bị pipeline CSS của vitest chặn
// thành chuỗi rỗng) — test luôn soi đúng nguồn chân lý là tokens.css.
const tokensCss = readFileSync(fileURLToPath(new URL('./tokens.css', import.meta.url)), 'utf8')

// ---- WCAG 2.x relative luminance + contrast ratio ----

function channel(v: number): number {
  const c = v / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminance(hex: string): number {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function contrast(a: string, b: string): number {
  const la = luminance(a)
  const lb = luminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

// ---- Parse token blocks from tokens.css ----

function parseVars(block: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const m of block.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,6})\s*;/g)) {
    out[m[1]!] = m[2]!
  }
  return out
}

function themeBlock(pattern: RegExp): Record<string, string> {
  const m = tokensCss.match(pattern)
  if (!m || m[1] === undefined) throw new Error(`Không tìm thấy block theme khớp ${pattern}`)
  return parseVars(m[1])
}

const dark = themeBlock(/:root\s*\{([^}]*)\}/)
const light = themeBlock(/:root\[data-theme='light'\]\s*\{([^}]*)\}/)

// Các cặp chữ/nền phải đạt AA (>= 4.5:1) — cả hai theme.
const PAIRS: [fg: string, bg: string][] = [
  ['ink', 'surface'],
  ['ink', 'panel'],
  ['ink', 'panel-hover'],
  ['ink-muted', 'surface'],
  ['ink-muted', 'panel'],
  // panel-hover là nền THẬT của nav active (AppLayout) và các card-link —
  // hội đồng chỉ ra chúng render thật mà chưa được đo: ai đổi --panel-hover
  // có thể làm mù nav mà test vẫn xanh.
  ['ink-muted', 'panel-hover'],
  ['accent', 'panel-hover'],
  ['warn', 'panel-hover'],
  ['accent', 'surface'],
  ['accent', 'panel'],
  ['accent-contrast', 'accent'],
  ['ok', 'surface'],
  ['ok', 'panel'],
  ['warn', 'surface'],
  ['warn', 'panel'],
  ['danger', 'surface'],
  // danger giờ có consumer thật (AppErrorBoundary render chữ danger trên panel).
  ['danger', 'panel'],
  // part-a/b/c dùng làm màu chữ/viền của tông-theo-Phần trên cả hai nền.
  ['part-a', 'surface'],
  ['part-b', 'surface'],
  ['part-c', 'surface'],
  ['part-d', 'surface'],
  ['part-e', 'surface'],
  ['part-a', 'panel'],
  ['part-b', 'panel'],
  ['part-c', 'panel'],
  ['part-d', 'panel'],
  ['part-e', 'panel'],
]

describe.each([
  ['dark', dark],
  ['light', light],
] as const)('WCAG AA — theme %s', (_name, theme) => {
  it('khai báo đủ mọi token màu dùng trong các cặp kiểm tra', () => {
    for (const name of new Set(PAIRS.flat())) {
      expect(theme[name], `thiếu token --${name}`).toBeDefined()
    }
  })

  it.each(PAIRS)('%s trên %s đạt >= 4.5:1', (fg, bg) => {
    const ratio = contrast(theme[fg]!, theme[bg]!)
    expect(ratio, `${fg} (${theme[fg]}) trên ${bg} (${theme[bg]}) = ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5)
  })
})

describe('cấu trúc token', () => {
  it('hai theme khai báo cùng tập token màu', () => {
    expect(Object.keys(light).sort()).toEqual(Object.keys(dark).sort())
  })
})
