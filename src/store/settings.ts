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

/**
 * Ba nấc âm thanh (kho ý tưởng C1 nối dài, khối 21.35).
 *
 * Có nấc giữa vì hai họ earcon có tần suất khác hẳn nhau: tiếng đúng/sai
 * và tiếng thao tác trong lab vang mấy chục lần một buổi, còn tiếng MỐC
 * (xong bài, lên chặng, đậu module, tốt nghiệp) cả buổi mới một lần. Chỉ
 * có tắt-hết thì người thấy ồn sẽ tắt luôn cả những tiếng đáng nghe nhất.
 */
export type MucAm = 'day-du' | 'chi-moc' | 'tat'

const MUC_AM_CYCLE: readonly MucAm[] = ['day-du', 'chi-moc', 'tat']

/** Bấm nút một cái thì sang nấc nào — đầy đủ → chỉ mốc → tắt → đầy đủ. */
export function nextMucAm(muc: MucAm): MucAm {
  const i = MUC_AM_CYCLE.indexOf(muc)
  return MUC_AM_CYCLE[(i + 1) % MUC_AM_CYCLE.length] ?? 'day-du'
}

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
  mucAm: MucAm
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
      mucAm: 'day-du',
      nhacNghi: true,
      lang: initialLang(),
      toggleTheme: () => set((s) => ({ theme: nextThemePref(s.theme) })),
      toggleSound: () => set((s) => ({ mucAm: nextMucAm(s.mucAm) })),
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
      partialize: (s) => ({ theme: s.theme, mucAm: s.mucAm, nhacNghi: s.nhacNghi }),
      /**
       * Máy đã cài bản cũ giữ `soundOn: true|false`, không có `mucAm`.
       * Persist của store này KHÔNG có version (quy ước cũ), nên chuyển
       * đổi làm ngay ở đây: bật → đầy đủ, tắt → tắt. Thiếu bước này thì
       * người đang tắt âm mở app lên là âm tự bật lại.
       */
      merge: (luuTru, hienTai) => {
        const cu = luuTru as Partial<SettingsState> & { soundOn?: boolean }
        const mucAm: MucAm =
          cu?.mucAm ?? (cu?.soundOn === false ? 'tat' : cu?.soundOn === true ? 'day-du' : hienTai.mucAm)
        return { ...hienTai, ...cu, mucAm }
      },
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
