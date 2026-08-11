// Khung app: sidebar trái kiểu "phòng điều hành" + vùng nội dung.
// Menu đúng 4 mục (Hick's law, spec 4.5): Học | Ôn tập | Phòng khám | Hồ sơ.
// Phòng khám gắn khóa tới khi module chứa ca bệnh mở theo mastery gate
// (Phase 3 hạng mục 9 — quyết định đã chốt: mở khi Module 11 mở).

import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import {
  BookOpen,
  Layers,
  Stethoscope,
  User,
  Sun,
  Moon,
  MonitorCog,
  Volume2,
  VolumeX,
  Languages,
  AlarmClock,
  AlarmClockOff,
  Lock,
} from 'lucide-react'
import { siFacebook, siTelegram } from 'simple-icons'
import { useT } from '../i18n'
import { useSettings, applyLang, applyTheme, nextThemePref, watchSystemTheme } from '../store/settings'
import { useProgress } from '../store/progress'
import { clinicTabUnlocked } from '../features/clinic/clinicCases'
import { NhacNghi } from './NhacNghi'

const NAV = [
  { to: '/', key: 'nav.learn', icon: BookOpen, end: true, clinicGate: false },
  { to: '/on-tap', key: 'nav.review', icon: Layers, end: false, clinicGate: false },
  { to: '/phong-kham', key: 'nav.clinic', icon: Stethoscope, end: false, clinicGate: true },
  { to: '/ho-so', key: 'nav.profile', icon: User, end: false, clinicGate: false },
] as const

/**
 * Chế độ tập trung (kho ý tưởng B2): đang trong BÀI HỌC hay BÀI THI thì
 * khung app tự lùi lại — nguyên tắc "một màn hình một khái niệm" áp cho
 * cả cái khung, không riêng phần nội dung.
 *
 * Chỉ hai loại màn này, và có lý do: chúng là hai chỗ DUY NHẤT người học
 * đang giữ một chuỗi suy nghĩ dài. Trang Học, Ôn tập, Phòng khám, Hồ sơ
 * là nơi người ta đang CHỌN đi đâu — làm mờ menu ở đó là làm khó đúng
 * việc người ta định làm.
 *
 * Hàm thuần, tách ra để test được mà không phải dựng cả router.
 */
export function isFocusRoute(pathname: string): boolean {
  return /^\/(bai|kiem-tra)\//.test(pathname)
}

function BrandIcon({ path, title, href }: { path: string; title: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={title}
      className="rounded-md p-2 text-ink-muted transition-colors duration-(--dur) hover:bg-panel-hover hover:text-ink"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
        <path d={path} />
      </svg>
    </a>
  )
}

export function AppLayout() {
  const t = useT()
  const theme = useSettings((s) => s.theme)
  const soundOn = useSettings((s) => s.soundOn)
  const nhacNghiBat = useSettings((s) => s.nhacNghi)
  const { toggleTheme, toggleSound, toggleNhacNghi, toggleLang } = useSettings.getState()
  const passedModules = useProgress((s) => s.passedModules)
  const clinicOpen = clinicTabUnlocked(passedModules)

  const lang = useSettings((s) => s.lang)
  const focusMode = isFocusRoute(useLocation().pathname)

  useEffect(() => applyTheme(theme), [theme])
  // Ở chế độ tự động, nền hệ điều hành đổi thì app đổi ngay tại chỗ.
  useEffect(() => watchSystemTheme(theme, () => applyTheme(theme)), [theme])
  // <html lang> phải đi theo nút VI/EN, nếu không trình đọc màn hình đọc
  // giao diện EN bằng giọng Việt (WCAG 3.1.1).
  useEffect(() => applyLang(lang), [lang])

  const toggles = (
    <>
      {/* Nút nền có BA nấc (kho ý tưởng B3): tối → sáng → tự động. Icon và
          lời đọc đều nói về NẤC SAU — giữ đúng quy ước nút này vốn có, và
          đó cũng là thứ người bấm muốn biết. */}
      <button
        onClick={toggleTheme}
        aria-label={t(`settings.themeTo.${nextThemePref(theme)}`)}
        className="rounded-md p-2 text-ink-muted transition-colors duration-(--dur) hover:bg-panel-hover hover:text-ink"
      >
        {theme === 'dark' ? (
          <Sun size={16} aria-hidden />
        ) : theme === 'light' ? (
          <MonitorCog size={16} aria-hidden />
        ) : (
          <Moon size={16} aria-hidden />
        )}
      </button>
      <button
        onClick={toggleSound}
        aria-label={soundOn ? t('settings.soundOn') : t('settings.soundOff')}
        className="rounded-md p-2 text-ink-muted transition-colors duration-(--dur) hover:bg-panel-hover hover:text-ink"
      >
        {soundOn ? <Volume2 size={16} aria-hidden /> : <VolumeX size={16} aria-hidden />}
      </button>
      {/* Nhắc nghỉ (A6) — tắt được, và nút tắt phải nằm ngay cạnh mấy nút
          kia chứ không giấu trong trang cài đặt riêng: thứ chen ngang
          người học thì phải tắt được ở đúng chỗ nó vừa chen. */}
      <button
        onClick={toggleNhacNghi}
        aria-label={nhacNghiBat ? t('settings.nhacNghiOn') : t('settings.nhacNghiOff')}
        className="rounded-md p-2 text-ink-muted transition-colors duration-(--dur) hover:bg-panel-hover hover:text-ink"
      >
        {nhacNghiBat ? <AlarmClock size={16} aria-hidden /> : <AlarmClockOff size={16} aria-hidden />}
      </button>
      <button
        onClick={toggleLang}
        aria-label={t('settings.langSwitch')}
        className="flex items-center gap-1 rounded-md p-2 text-ink-muted transition-colors duration-(--dur) hover:bg-panel-hover hover:text-ink"
      >
        <Languages size={16} aria-hidden />
        <span className="font-mono text-[11px] font-semibold">{t('settings.langBadge')}</span>
      </button>
    </>
  )

  // Màn hẹp: menu 4 mục chuyển xuống THANH ĐÁY, nhường trọn chiều ngang
  // cho nội dung. Sidebar dọc ăn 224px trong 375px sẽ chỉ chừa lại ~90px
  // cho phần học — không đủ để thao tác phòng lab (spec Module 4).
  // `flex-col-reverse` đặt thanh điều hướng xuống dưới trên mobile mà vẫn
  // giữ nguyên thứ tự DOM: trình đọc màn hình gặp nội dung chính trước.
  // Chế độ tập trung THU KHUNG LẠI, không làm mờ: hạ độ đục của chữ menu
  // là hạ luôn contrast xuống dưới 4.5:1 — đổi một nguyên tắc sư phạm lấy
  // một lỗi tiếp cận thì không đáng. Thứ bị cất đi là thứ KHÔNG PHẢI đường
  // ra: tên app, dòng tag, cụm cài đặt, hai icon liên hệ. Bốn mục menu ở
  // lại nguyên độ tương phản (desktop còn biểu tượng + tooltip, tên vẫn
  // đọc được bằng trình đọc màn hình; mobile giữ nguyên cả chữ vì thanh
  // đáy là đường ra duy nhất trên màn hẹp).
  return (
    <div className="flex h-full flex-col-reverse md:flex-row">
      <aside
        data-focus-mode={focusMode ? 'on' : undefined}
        className={
          'flex shrink-0 flex-col border-t border-edge bg-panel md:border-r md:border-t-0 ' +
          'transition-[width] duration-(--dur) ease-(--ease) ' +
          (focusMode ? 'md:w-16' : 'md:w-56')
        }
      >
        <div className={'border-b border-edge px-5 py-4 ' + (focusMode ? 'hidden' : 'hidden md:block')}>
          <span className="font-mono text-lg font-bold text-accent">{t('app.name')}</span>
          <p className="mt-0.5 text-xs text-ink-muted">{t('app.tagline')}</p>
        </div>

        <nav className="flex flex-row md:flex-1 md:flex-col md:gap-1 md:p-3">
          {NAV.map(({ to, key, icon: Icon, end, clinicGate }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              // Thanh biểu tượng vẫn phải nói được mình là gì: `title` cho
              // chuột, chữ `sr-only` cho trình đọc màn hình — tên nút KHÔNG
              // được biến mất khỏi cây trợ năng chỉ vì màn hình hẹp lại.
              title={focusMode ? t(key) : undefined}
              className={({ isActive }) =>
                'flex flex-1 flex-col items-center gap-1 px-2 py-2 text-xs font-medium ' +
                'md:flex-none md:flex-row md:gap-3 md:rounded-md md:text-sm ' +
                (focusMode ? 'md:justify-center md:px-2 md:py-2.5 ' : 'md:px-3 ') +
                'transition-colors duration-(--dur) ease-(--ease) ' +
                (isActive
                  ? 'text-accent md:bg-panel-hover'
                  : 'text-ink-muted hover:bg-panel-hover hover:text-ink')
              }
            >
              <Icon size={17} aria-hidden />
              <span className={focusMode ? 'md:sr-only' : 'md:flex-1'}>{t(key)}</span>
              {clinicGate && !clinicOpen && (
                <Lock size={13} aria-label={t('nav.clinicLocked')} className="text-ink-muted" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Chân thanh bên trên DESKTOP xếp HAI DÒNG, không phải một. Nhét cả
            5 nút vào một dòng thì cụm cần 248px trong thanh bên 224px — icon
            Telegram bị mép thanh bên cắt mất một nửa (đo trên browser thật).
            Gọt vài pixel cho vừa chỉ là vá tạm: thêm một nút cài đặt, đổi
            font, hay dịch nhãn dài hơn là vỡ lại y hệt. Hai dòng thì rộng
            bao nhiêu cũng đủ. Mobile giữ nguyên một dòng — ở đó cụm liên hệ
            vốn đã ẩn. */}
        {!focusMode && (
          <div className="flex items-center justify-center gap-5 border-t border-edge py-2 md:flex-col md:gap-2 md:px-3 md:py-3">
            <div className="flex items-center gap-3">{toggles}</div>
            <div className="hidden items-center gap-3 md:flex">
              <BrandIcon
                path={siFacebook.path}
                title={t('contact.facebook')}
                href="https://www.facebook.com/thien.phuc.450676/"
              />
              <BrandIcon path={siTelegram.path} title={t('contact.telegram')} href="https://t.me/Benedetta24k" />
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8">
          <NhacNghi />
          <Outlet />
        </div>
      </main>
    </div>
  )
}
