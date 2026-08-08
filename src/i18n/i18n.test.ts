import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi as vitestMock } from 'vitest'
import viDict from './vi.json'
import enDict from './en.json'
import { translate } from './index'

/** Mọi đường dẫn key lá ("nav.learn") của một dictionary. */
function keyPaths(node: unknown, prefix = ''): string[] {
  if (typeof node === 'string') return [prefix]
  if (typeof node !== 'object' || node === null) {
    throw new Error(`Giá trị không hợp lệ tại "${prefix}" — dictionary chỉ chứa object/string`)
  }
  return Object.entries(node).flatMap(([k, v]) => keyPaths(v, prefix === '' ? k : `${prefix}.${k}`))
}

describe('vi.json / en.json — cùng cấu trúc key (quy tắc i18n chung)', () => {
  it('không thiếu key ở bất kỳ bên nào', () => {
    expect(keyPaths(enDict).sort()).toEqual(keyPaths(viDict).sort())
  })

  it('không có chuỗi rỗng ở cả hai file', () => {
    for (const dict of [viDict, enDict]) {
      for (const path of keyPaths(dict)) {
        expect(translate(dict === viDict ? 'vi' : 'en', path)).not.toBe('')
      }
    }
  })

  it('hai bản dùng ĐÚNG CÙNG bộ {placeholder} ở từng key', () => {
    // Rơi mất một {count} lúc dịch là lỗi câm: chuỗi vẫn hiện, chỉ thiếu
    // con số — người đọc bản EN thấy "Cards due right now:" cụt lủn mà
    // không ai biết. Dịch thừa placeholder còn tệ hơn: chữ "{count}" hiện
    // nguyên xi lên màn hình (hội đồng 07-08, ghế i18n).
    const params = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]!).sort()
    for (const path of keyPaths(viDict)) {
      expect(params(translate('en', path)), `key "${path}": bộ placeholder lệch giữa vi và en`).toEqual(
        params(translate('vi', path)),
      )
    }
  })
})

// Parity vi ↔ en không bắt được key dùng trong CODE mà thiếu ở CẢ HAI
// file (đã xảy ra thật với clinic.* — màn Phòng khám hiện key trần).
// Test này quét mọi lời gọi t('...')/translate(..., '...') tĩnh trong
// src/ và đối chiếu với dictionary. Key động (template literal, ví dụ
// stage.${state}) nằm ngoài tầm quét — quy ước: mọi giá trị có thể của
// phần động phải là key lá đã tồn tại, được ràng bởi chính UI dùng nó.
describe('key dùng trong code tồn tại trong dictionary', () => {
  const SRC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..')

  function sourceFiles(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) return sourceFiles(full)
      if (!/\.(ts|tsx)$/.test(entry.name) || /\.test\.tsx?$/.test(entry.name)) return []
      return [full]
    })
  }

  it('không có key mồ côi', () => {
    const known = new Set(keyPaths(viDict))
    const missing: string[] = []
    for (const file of sourceFiles(SRC_DIR)) {
      const text = readFileSync(file, 'utf8')
      const calls = [
        ...text.matchAll(/\bt\(\s*'([^']+)'/g),
        ...text.matchAll(/\btranslate\(\s*[^,)]+,\s*'([^']+)'/g),
      ]
      for (const m of calls) {
        const key = m[1]!
        if (!known.has(key)) missing.push(`${file}: "${key}"`)
      }
    }
    expect(missing).toEqual([])
  })
})

describe('translate', () => {
  it('tra đúng theo ngôn ngữ', () => {
    expect(translate('vi', 'nav.learn')).toBe('Học')
    expect(translate('en', 'nav.learn')).toBe('Learn')
  })

  it('thay {param} trong chuỗi', () => {
    expect(translate('vi', 'feedback.tier1WithTopic', { topic: 'địa chỉ IP' })).toBe(
      'Gần rồi — nghĩ lại về địa chỉ IP nhé.',
    )
  })

  it('param không khai báo → giữ nguyên placeholder, không crash', () => {
    expect(translate('vi', 'feedback.tier1WithTopic')).toContain('{topic}')
  })

  it('key không tồn tại → trả chính key và cảnh báo dev, không ném lỗi', () => {
    const warn = vitestMock.spyOn(console, 'warn').mockImplementation(() => {})
    expect(translate('vi', 'khong.ton.tai')).toBe('khong.ton.tai')
    expect(warn).toHaveBeenCalledOnce()
    warn.mockRestore()
  })
})
