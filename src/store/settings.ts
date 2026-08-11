// Store cài đặt giao diện: theme / âm thanh / ngôn ngữ.
//
// - theme + soundOn persist qua zustand key 'netmaster-settings'.
// - lang persist RIÊNG vào localStorage key 'lang' (quy ước chung của
//   mọi project: nút chuyển VI/EN, mặc định VI, mở lại giữ nguyên).
// Store này thuộc tầng UI — engine không bao giờ import nó.

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Lang } from '../i18n'

/** Nền THẬT đang vẽ ra màn hình — chỉ có hai. */
export type Theme = 'dark' | 'light'

/**
 * Thứ người học CHỌN (kho ý tưởng B3). Khác `Theme` ở đúng một giá trị:
 * 'auto' không phải một cái nền, nó là lời ủy quyền cho hệ điều hành.
 * Tách hai kiểu ra để không chỗ nào lỡ gán 'auto' vào <html data-theme>.
 */
export type ThemePref = Theme | 'auto'

const THEME_CYCLE: readonly ThemePref[] = ['dark', 'light', 'auto']

/** Bấm nút một cái thì sang lựa chọn nào — tối → sáng → tự động → tối. */
export function nextThemePref(pref: ThemePref): ThemePref {
  const i = THEME_CYCLE.indexOf(pref)
  return THEME_CYCLE[(i + 1) % THEME_CYCLE.length] ?? 'dark'
}

/**
 * Nền hệ điều hành đang đặt. Máy/trình duyệt không trả lời được (test cũ,
 * môi trường không có matchMedia) thì rơi về TỐI — mặc định của app theo
 * spec 4.1, không phải sáng.
 */
export function systemTheme(): Theme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/** Lựa chọn → nền thật. */
export function resolveTheme(pref: ThemePref): Theme {
  return pref === 'auto' ? systemTheme() : pref
}

interface SettingsState {
  theme: ThemePref
  soundOn: boolean
  /**
   * Nhắc nghỉ sau mỗi quãng học dài (kho ý tưởng A6). BẬT mặc định: lời
   * nhắc chỉ có ích khi nó tới mà người học chưa nghĩ đến việc nghỉ, mà
   * thứ phải tự đi bật thì gần như không ai bật.
   */
  nhacNghi: boolean
  lang: Lang
  toggleTheme: () => void
  toggleSound: () => void
  toggleNhacNghi: () => void
  toggleLang: () => void
}

function initialLang(): Lang {
  if (typeof localStorage === 'undefined') return 'vi'
  return localStorage.getItem('lang') === 'en' ? 'en' : 'vi'
}

function persistLang(lang: Lang): void {
  if (typeof localStorage !== 'undefined') localStorage.setItem('lang', lang)
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      // Dark mode mặc định (spec 4.1), tiếng Việt mặc định. KHÔNG lấy
      // 'auto' làm mặc định: spec chốt nền tối là bộ mặt của app, còn
      // 'auto' là lựa chọn người học tự bật.
      theme: 'dark',
      soundOn: true,
      nhacNghi: true,
      lang: initialLang(),
      toggleTheme: () => set((s) => ({ theme: nextThemePref(s.theme) })),
      toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
      toggleNhacNghi: () => set((s) => ({ nhacNghi: !s.nhacNghi })),
      toggleLang: () =>
        set((s) => {
          const lang: Lang = s.lang === 'vi' ? 'en' : 'vi'
          persistLang(lang)
          return { lang }
        }),
    }),
    {
      name: 'netmaster-settings',
      // lang sống ở key 'lang' riêng — không persist đúp trong store.
      partialize: (s) => ({ theme: s.theme, soundOn: s.soundOn, nhacNghi: s.nhacNghi }),
      // Trỏ global localStorage (mặc định zustand cần window — vắng trong test).
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

/** Đồng bộ theme lên <html data-theme> — gọi từ App qua useEffect. */
export function applyTheme(pref: ThemePref): void {
  if (typeof document === 'undefined') return
  if (resolveTheme(pref) === 'light') document.documentElement.dataset['theme'] = 'light'
  else delete document.documentElement.dataset['theme']
}

/**
 * Đang ở 'auto' mà người dùng đổi nền của hệ điều hành thì app phải đổi
 * theo NGAY, không đợi mở lại — hứa "tự động" rồi bắt tải lại trang là
 * hứa suông. Trả về hàm gỡ theo dõi; ngoài 'auto' thì không theo dõi gì.
 */
export function watchSystemTheme(pref: ThemePref, onChange: () => void): () => void {
  if (pref !== 'auto' || typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {}
  const mq = window.matchMedia('(prefers-color-scheme: light)')
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

/**
 * Đồng bộ ngôn ngữ lên <html lang> — cặp song sinh của applyTheme.
 *
 * index.html khai cứng lang="vi". Bật EN mà thẻ vẫn "vi" thì trình đọc
 * màn hình phát âm toàn bộ giao diện tiếng Anh bằng giọng Việt — nghe
 * như tiếng lạ, và đó là lỗi WCAG 3.1.1 chứ không phải chuyện thẩm mỹ.
 */
export function applyLang(lang: Lang): void {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lang
}
