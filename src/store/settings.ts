// Store cài đặt giao diện: theme / âm thanh / ngôn ngữ.
//
// - theme + soundOn persist qua zustand key 'netmaster-settings'.
// - lang persist RIÊNG vào localStorage key 'lang' (quy ước chung của
//   mọi project: nút chuyển VI/EN, mặc định VI, mở lại giữ nguyên).
// Store này thuộc tầng UI — engine không bao giờ import nó.

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Lang } from '../i18n'

export type Theme = 'dark' | 'light'

interface SettingsState {
  theme: Theme
  soundOn: boolean
  lang: Lang
  toggleTheme: () => void
  toggleSound: () => void
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
      // Dark mode mặc định (spec 4.1), tiếng Việt mặc định.
      theme: 'dark',
      soundOn: true,
      lang: initialLang(),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
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
      partialize: (s) => ({ theme: s.theme, soundOn: s.soundOn }),
      // Trỏ global localStorage (mặc định zustand cần window — vắng trong test).
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

/** Đồng bộ theme lên <html data-theme> — gọi từ App qua useEffect. */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return
  if (theme === 'light') document.documentElement.dataset['theme'] = 'light'
  else delete document.documentElement.dataset['theme']
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
