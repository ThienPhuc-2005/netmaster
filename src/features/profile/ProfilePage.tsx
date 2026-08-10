// Tab Hồ sơ — đọc từ store tiến độ thật (persist localStorage).
// Huy hiệu CHƯA TỒN TẠI nên copy không được hứa mốc cụ thể (lời hứa
// không trả được là violated expectancy — hội đồng, ghế tâm lý); khi
// nào xây hệ huy hiệu thật thì trình kế hoạch theo spec 2.4 trước.

import { useRef } from 'react'
import { Link } from 'react-router'
import { Flame, Zap, Award, GraduationCap, Snowflake, Layers, BookOpenCheck, Download, Upload } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useT } from '../../i18n'
import { PROGRESS_PERSIST_VERSION, useProgress } from '../../store/progress'
import { Button } from '../../components/Button'
import { milestones } from '../graduation/milestones'

/**
 * Cửa thoát hiểm cho dữ liệu (hội đồng 2026-08-07, ghế dữ liệu): toàn bộ
 * tiến độ nằm trong localStorage của MỘT profile trình duyệt — một lần
 * "Clear browsing data" theo thói quen là mất hàng chục giờ học. Xuất =
 * tải file JSON chứa đúng 3 key persist; nhập = validate tối thiểu rồi
 * ghi đè + reload. Không đổi data model, không network — vẫn Phase 1
 * localStorage đúng spec.
 */
const BACKUP_KEYS = ['netmaster-progress', 'netmaster-settings', 'lang'] as const

function exportBackup(): void {
  const data: Record<string, string | null> = {}
  for (const key of BACKUP_KEYS) data[key] = localStorage.getItem(key)
  const blob = new Blob(
    [JSON.stringify({ app: 'netmaster', exportedAt: new Date().toISOString(), data }, null, 2)],
    { type: 'application/json' },
  )
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `netmaster-tien-do-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(a.href)
}

async function importBackup(file: File, confirmText: string, badText: string, newerText: string): Promise<void> {
  const parsed: unknown = JSON.parse(await file.text())
  const backup = parsed as { app?: string; data?: Record<string, string | null> }
  const progressRaw = backup.data?.['netmaster-progress']
  // Validate đủ chặt để file hỏng kiểu TINH VI bị chặn ngay ở cửa, thay
  // vì qua êm rồi crash rải rác sau reload (biên bản trung cấp, ghế dữ
  // liệu): đúng app, version nằm trong dải app này hiểu được, và vài
  // trường quý đúng kiểu.
  if (backup.app !== 'netmaster' || typeof progressRaw !== 'string') throw new Error(badText)
  const progress = JSON.parse(progressRaw) as { state?: unknown; version?: unknown }
  const version = progress.version
  if (typeof progress.state !== 'object' || progress.state === null) throw new Error(badText)
  if (typeof version !== 'number' || !Number.isInteger(version) || version < 1) throw new Error(badText)
  // Version tương lai: migrate chỉ biết đi TỚI, không biết đi lùi — nuốt
  // vào là state bị đọc sai im lặng. Nói thẳng "cập nhật app đã".
  if (version > PROGRESS_PERSIST_VERSION) throw new Error(newerText)
  const state = progress.state as { reviewCards?: unknown; xpTotal?: unknown; passedModules?: unknown }
  if (!Array.isArray(state.reviewCards) || typeof state.xpTotal !== 'number' || !Array.isArray(state.passedModules)) {
    throw new Error(badText)
  }
  // Hai key phụ cũng phải lành: settings phải parse được, lang là chuỗi.
  const settingsRaw = backup.data?.['netmaster-settings']
  if (typeof settingsRaw === 'string') {
    try {
      JSON.parse(settingsRaw)
    } catch {
      throw new Error(badText)
    }
  }
  if (!window.confirm(confirmText)) return
  for (const key of BACKUP_KEYS) {
    const value = backup.data?.[key]
    if (typeof value === 'string') localStorage.setItem(key, value)
  }
  window.location.reload()
}

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: LucideIcon
  label: string
  value: number
  unit?: string
}) {
  return (
    <div className="flex items-center gap-4 rounded-md border border-edge bg-panel px-5 py-4">
      <Icon size={20} aria-hidden className="text-accent" />
      <div>
        <div className="font-mono text-2xl font-bold text-ink">
          {value}
          {unit !== undefined && <span className="ml-1 text-sm font-medium text-ink-muted">{unit}</span>}
        </div>
        <div className="text-xs text-ink-muted">{label}</div>
      </div>
    </div>
  )
}

export function ProfilePage() {
  const t = useT()
  const streak = useProgress((s) => s.streak)
  const xpTotal = useProgress((s) => s.xpTotal)
  const reviewCards = useProgress((s) => s.reviewCards)
  const completedLessons = useProgress((s) => s.completedLessons)
  const passedModules = useProgress((s) => s.passedModules)
  const reachedMilestones = milestones().filter((m) => passedModules.includes(m.moduleId))
  const fileRef = useRef<HTMLInputElement>(null)

  const onImportFile = (file: File | undefined) => {
    if (file === undefined) return
    void importBackup(
      file,
      t('profile.backupImportConfirm'),
      t('profile.backupImportBad'),
      t('profile.backupImportNewer'),
    ).catch((e: unknown) => {
      window.alert(e instanceof Error && e.message !== '' ? e.message : t('profile.backupImportBad'))
    })
  }

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">{t('profile.title')}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Flame} label={t('profile.streak')} value={streak.current} unit={t('profile.streakUnit')} />
        <StatCard icon={Zap} label={t('profile.xp')} value={xpTotal} />
        <StatCard icon={Snowflake} label={t('profile.freezes')} value={streak.freezesLeft} />
        <StatCard icon={BookOpenCheck} label={t('profile.lessonsDone')} value={Object.keys(completedLessons).length} />
        <StatCard icon={Layers} label={t('profile.cardsTotal')} value={reviewCards.length} />
      </div>
      <p className="mt-4 text-xs text-ink-muted">{t('profile.freezeNote')}</p>

      <div className="mt-6 flex flex-col gap-3 rounded-md border border-edge bg-panel px-5 py-4">
        <h2 className="text-sm font-semibold text-ink">{t('profile.backupTitle')}</h2>
        <p className="text-xs leading-relaxed text-ink-muted">{t('profile.backupBody')}</p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={exportBackup}>
            <Download size={15} aria-hidden />
            {t('profile.backupExport')}
          </Button>
          <Button variant="ghost" onClick={() => fileRef.current?.click()}>
            <Upload size={15} aria-hidden />
            {t('profile.backupImport')}
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            aria-label={t('profile.backupImport')}
            onChange={(e) => {
              onImportFile(e.target.files?.[0])
              e.target.value = ''
            }}
          />
        </div>
      </div>
      {reachedMilestones.length > 0 && (
        <div className="mt-6 flex flex-col gap-2 rounded-md border border-edge bg-panel px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">{t('grad.profileTitle')}</h2>
          {reachedMilestones.map((m) => (
            <Link
              key={m.id}
              to={`/tot-nghiep/${m.id}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              <GraduationCap size={15} aria-hidden />
              {t(m.id === 'nhap-mon' ? 'grad.titleNhapMon' : 'grad.titleTrungCap')}
            </Link>
          ))}
        </div>
      )}
      <div className="mt-6 flex items-start gap-3 rounded-md border border-edge bg-panel px-5 py-4 text-sm text-ink-muted">
        <Award size={18} aria-hidden className="mt-0.5 shrink-0" />
        <p>{t('profile.emptyBadges')}</p>
      </div>
    </>
  )
}
