// Khung i18n cho CHUỖI UI (khung app song ngữ VI/EN — đã chốt).
// Nội dung bài học KHÔNG đi qua đây: bài học là data (LText trong
// contentSchema), Phase 1 chỉ tiếng Việt.
//
// Quy tắc: component không hardcode chuỗi — mọi chữ hiển thị đi qua t().
// Hai file vi.json / en.json phải cùng cấu trúc key (có test parity chặn).

import { useCallback } from 'react'
import vi from './vi.json'
import en from './en.json'
import { useSettings } from '../store/settings'

export type Lang = 'vi' | 'en'

const dictionaries: Record<Lang, unknown> = { vi, en }

/** Dot-path lookup ("nav.learn") through a nested JSON dictionary. */
function lookup(dict: unknown, key: string): string | undefined {
  let node: unknown = dict
  for (const part of key.split('.')) {
    if (typeof node !== 'object' || node === null) return undefined
    node = (node as Record<string, unknown>)[part]
  }
  return typeof node === 'string' ? node : undefined
}

/** Thay {param} trong chuỗi dịch bằng giá trị truyền vào. */
function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (whole, name: string) => {
    const value = params[name]
    return value === undefined ? whole : String(value)
  })
}

/**
 * Dịch một key theo ngôn ngữ chỉ định. Thiếu key ở ngôn ngữ đang chọn →
 * rơi về tiếng Việt (ngôn ngữ gốc của nội dung); thiếu cả hai → trả
 * chính key và cảnh báo dev — không bao giờ ném lỗi giữa màn hình.
 */
export function translate(lang: Lang, key: string, params?: Record<string, string | number>): string {
  const hit = lookup(dictionaries[lang], key) ?? lookup(dictionaries.vi, key)
  if (hit === undefined) {
    console.warn(`[i18n] Thiếu key "${key}" ở cả vi.json lẫn en.json`)
    return key
  }
  return interpolate(hit, params)
}

/** Hàm dịch mà component nhận từ `useT` — đặt tên để truyền xuống helper thuần. */
export type TFunc = (key: string, params?: Record<string, string | number>) => string

/** Hook cho component: t() gắn với ngôn ngữ hiện tại, đổi lang là re-render. */
export function useT(): TFunc {
  const lang = useSettings((s) => s.lang)
  return useCallback((key, params) => translate(lang, key, params), [lang])
}
