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

  return (
    <div className="flex h-full">
      <aside className="flex w-56 shrink-0 flex-col border-r border-edge bg-panel">
        <div className="border-b border-edge px-5 py-4">
          <span className="font-mono text-lg font-bold text-accent">{t('app.name')}</span>
          <p className="mt-0.5 text-xs text-ink-muted">{t('app.tagline')}</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map(({ to, key, icon: Icon, end, locked }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ` +
                `transition-colors duration-(--dur) ease-(--ease) ` +
                (isActive
                  ? 'bg-panel-hover text-accent'
                  : 'text-ink-muted hover:bg-panel-hover hover:text-ink')
              }
            >
              <Icon size={17} aria-hidden />
              <span className="flex-1">{t(key)}</span>
              {locked && <Lock size={13} aria-label={t('nav.clinicLocked')} className="text-ink-muted" />}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-between border-t border-edge px-4 py-3">
          <div className="flex items-center gap-3">
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
          </div>
          <div className="flex items-center gap-3">
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
        <div className="mx-auto max-w-4xl px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
