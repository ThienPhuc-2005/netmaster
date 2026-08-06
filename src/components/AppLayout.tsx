// Khung app: sidebar trái kiểu "phòng điều hành" + vùng nội dung.
// Menu đúng 4 mục (Hick's law, spec 4.5): Học | Ôn tập | Phòng khám | Hồ sơ.
// Phòng khám hiện nhưng gắn khóa (Phase 3) — bấm vào thấy màn úp mở.

import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router'
import {
  BookOpen,
  Layers,
  Stethoscope,
  User,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Languages,
  Lock,
} from 'lucide-react'
import { siFacebook, siTelegram } from 'simple-icons'
import { useT } from '../i18n'
import { useSettings, applyTheme } from '../store/settings'

const NAV = [
  { to: '/', key: 'nav.learn', icon: BookOpen, end: true, locked: false },
  { to: '/on-tap', key: 'nav.review', icon: Layers, end: false, locked: false },
  { to: '/phong-kham', key: 'nav.clinic', icon: Stethoscope, end: false, locked: true },
  { to: '/ho-so', key: 'nav.profile', icon: User, end: false, locked: false },
] as const

function BrandIcon({ path, title, href }: { path: string; title: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={title}
      className="text-ink-muted transition-colors duration-(--dur) hover:text-ink"
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
  const { toggleTheme, toggleSound, toggleLang } = useSettings.getState()

  useEffect(() => applyTheme(theme), [theme])

  const toggles = (
    <>
      <button
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('settings.themeToLight') : t('settings.themeToDark')}
        className="text-ink-muted transition-colors duration-(--dur) hover:text-ink"
      >
        {theme === 'dark' ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
      </button>
      <button
        onClick={toggleSound}
        aria-label={soundOn ? t('settings.soundOn') : t('settings.soundOff')}
        className="text-ink-muted transition-colors duration-(--dur) hover:text-ink"
      >
        {soundOn ? <Volume2 size={16} aria-hidden /> : <VolumeX size={16} aria-hidden />}
      </button>
      <button
        onClick={toggleLang}
        aria-label={t('settings.langSwitch')}
        className="flex items-center gap-1 text-ink-muted transition-colors duration-(--dur) hover:text-ink"
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
  return (
    <div className="flex h-full flex-col-reverse md:flex-row">
      <aside className="flex shrink-0 flex-col border-t border-edge bg-panel md:w-56 md:border-r md:border-t-0">
        <div className="hidden border-b border-edge px-5 py-4 md:block">
          <span className="font-mono text-lg font-bold text-accent">{t('app.name')}</span>
          <p className="mt-0.5 text-xs text-ink-muted">{t('app.tagline')}</p>
        </div>

        <nav className="flex flex-row md:flex-1 md:flex-col md:gap-1 md:p-3">
          {NAV.map(({ to, key, icon: Icon, end, locked }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                'flex flex-1 flex-col items-center gap-1 px-2 py-2 text-xs font-medium ' +
                'md:flex-none md:flex-row md:gap-3 md:rounded-md md:px-3 md:text-sm ' +
                'transition-colors duration-(--dur) ease-(--ease) ' +
                (isActive
                  ? 'text-accent md:bg-panel-hover'
                  : 'text-ink-muted hover:bg-panel-hover hover:text-ink')
              }
            >
              <Icon size={17} aria-hidden />
              <span className="md:flex-1">{t(key)}</span>
              {locked && <Lock size={13} aria-label={t('nav.clinicLocked')} className="text-ink-muted" />}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-center gap-5 border-t border-edge py-2 md:justify-between md:px-4 md:py-3">
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
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
