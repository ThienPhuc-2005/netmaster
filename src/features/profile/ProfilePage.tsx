// Tab Hồ sơ — đọc từ store tiến độ thật (persist localStorage).
// Huy hiệu CHƯA TỒN TẠI nên copy không được hứa mốc cụ thể (lời hứa
// không trả được là violated expectancy — hội đồng, ghế tâm lý); khi
// nào xây hệ huy hiệu thật thì trình kế hoạch theo spec 2.4 trước.

import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Flame, Zap, Award, GraduationCap, Snowflake, Layers, BookOpenCheck, Download, Upload } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useT } from '../../i18n'
import { PROGRESS_PERSIST_VERSION, todayIso, useProgress } from '../../store/progress'
import { baiDayKhaiNiem, findConcept, findPalaceRoom, loadModules } from '../../content'
import { analyzeMistakes, aoGiacHayGap, theGanQuen, theHayQuen, weakSpotDrill, weakSpots, weeklyActivity } from '../../engine/mistakeLog'
import { roomIdFromCardId } from '../../engine/palace'
import { Button } from '../../components/Button'
import { milestones } from '../graduation/milestones'
import { AoGiacList, ChuaLotList, DisputedList, HayQuenList, MemoryMap, MistakeAnalysisCard, SoSanhThangCard, WeakSpotList, WeeklyRhythm } from './LearningInsights'
import { memoryByModule, memoryCardsOf } from '../../engine/freshness'
import { theLanh } from '../../engine/reviewQueue'
import { freezesAvailable } from '../../engine/streak'
import { mocDeSo, soSanhDang, thangCua } from '../../engine/soSanhThang'
import { daiNhatTuan, daiNhatTuanTruoc } from '../../engine/quangHoc'
import type { AnhChup, LyDoChup } from '../../engine/anhChup'
import { chupTruocGhiDe, docAnhChup, khoiPhuc } from '../../store/anhChup'

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
  // Kiểm TỪNG THẺ, không chỉ "có phải mảng không" (phát hiện J1, khối
  // 21.43): hộp ôn tập là thứ app đọc đầu tiên mỗi lần mở, nên một thẻ
  // méo lọt qua đây là người học nhập file xong mở app lên gặp màn lỗi.
  // Chặn ở cửa thì họ còn nguyên tiến độ cũ để thử lại bằng file khác.
  if (!state.reviewCards.every((c) => theLanh(c))) throw new Error(badText)
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
  // CẤT BẢN ĐANG CÓ TRƯỚC KHI GHI ĐÈ (phát hiện L2). Nút "Lùi về bản này"
  // nằm ngay dưới khung này vốn đã làm đúng việc ấy và còn hứa hẳn ra
  // trong lời xác nhận; cửa nhập file thì không, dù nó mới là cửa dễ chọn
  // nhầm — file cũ ba tháng trước và file hôm qua trông y hệt nhau trong
  // hộp thoại chọn file. Nuốt nhầm một bản cũ mà không có đường lùi là
  // đúng kiểu mất mát tệ nhất: mất bằng chính thao tác đi cứu dữ liệu.
  chupTruocGhiDe('truoc-nhap', new Date())
  for (const key of BACKUP_KEYS) {
    const value = backup.data?.[key]
    if (typeof value === 'string') localStorage.setItem(key, value)
  }
  window.location.reload()
}

/** dd/mm HH:mm — cùng lối rút gọn ngày với biểu đồ ở trang này. */
function gioNgan(luc: string): string {
  const d = new Date(luc)
  if (Number.isNaN(d.getTime())) return luc
  const hai = (n: number) => String(n).padStart(2, '0')
  return `${hai(d.getDate())}/${hai(d.getMonth() + 1)} ${hai(d.getHours())}:${hai(d.getMinutes())}`
}

/**
 * Lý do chụp viết bằng tiếng người. Bảng TĨNH chứ không ghép key động:
 * key ghép động lọt khỏi phép quét "key mồ côi" của test i18n.
 */
const LY_DO_KEY: Record<LyDoChup, string> = {
  'dinh-ky': 'profile.anhChupLyDoNgay',
  'truoc-nang-cap': 'profile.anhChupLyDoNangCap',
  'truoc-khoi-phuc': 'profile.anhChupLyDoKhoiPhuc',
  'truoc-nhap': 'profile.anhChupLyDoNhap',
}

/**
 * Ảnh chụp tiến độ tự động (kho ý tưởng F3) — đường lùi khi có gì đó
 * ăn mất tiến độ mà không ai kịp bấm "Xuất ra file".
 *
 * Đặt ngay dưới cụm sao lưu vì cùng một nỗi lo, khác nhau ở chỗ ai phải
 * nhớ: sao lưu đòi người học nhớ bấm, ảnh chụp thì app tự làm.
 */
function AnhChupList() {
  const t = useT()
  const danhSach = docAnhChup()

  const lui = (anh: AnhChup) => {
    if (!window.confirm(t('profile.anhChupConfirm', { luc: gioNgan(anh.luc) }))) return
    khoiPhuc(anh, new Date())
    // BẮT BUỘC tải lại: state trong RAM lúc này vẫn là bản vừa bị ghi đè,
    // và hành động tiếp theo của người học sẽ persist nó đè ngược lại.
    window.location.reload()
  }

  return (
    <div className="mt-2 border-t border-edge pt-3">
      <h3 className="text-sm font-semibold text-ink">{t('profile.anhChupTitle')}</h3>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">{t('profile.anhChupBody')}</p>
      {danhSach.length === 0 ? (
        <p className="mt-2 text-xs text-ink-muted">{t('profile.anhChupEmpty')}</p>
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {danhSach.map((anh) => (
            <li key={anh.luc} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span className="font-mono text-ink">{gioNgan(anh.luc)}</span>
              <span className="text-ink-muted">{t(LY_DO_KEY[anh.lyDo])}</span>
              <button
                onClick={() => lui(anh)}
                className="rounded-md border border-edge px-2 py-1 font-medium text-ink transition-colors duration-(--dur) hover:bg-panel-hover"
              >
                {t('profile.anhChupRestore')}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * Tên đọc được của một thẻ ôn. Phải hỏi ĐÚNG HAI NGUỒN vì thẻ cung điện
 * mang tiền tố riêng (`palace:<roomId>`); nội dung đổi mà thẻ cũ không
 * còn thì trả null — nơi gọi hiện tạm cardId chứ không giấu dòng đi, vì
 * chuyện người học quên nó vẫn là chuyện có thật.
 */
function tenThe(cardId: string): string | null {
  const roomId = roomIdFromCardId(cardId)
  return roomId === null
    ? (findConcept(cardId)?.concept.term ?? null)
    : (findPalaceRoom(roomId)?.room.name ?? null)
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
  const lessonRuntimes = useProgress((s) => s.lessonRuntimes)
  const drillHistory = useProgress((s) => s.drillHistory)
  const aoGiacQuenMat = useProgress((s) => s.aoGiacQuenMat)
  const reachedMilestones = milestones().filter((m) => passedModules.includes(m.moduleId))
  const fileRef = useRef<HTMLInputElement>(null)

  // Đọc lại chính mình: chỗ hay vấp + nếp học theo tuần. Cả hai suy TỪ
  // dữ liệu đã có, không thêm trường persist nào.
  const modules = loadModules()
  const spots = weakSpots(modules, lessonRuntimes)
  // Phân tích chỗ hay sai (khối 21.8): vấp theo KIỂU nào, không chỉ câu nào.
  const analysis = analyzeMistakes(modules, lessonRuntimes)
  const drillSize = weakSpotDrill(modules, lessonRuntimes).length
  // Sổ "mình nghĩ câu này đúng": ghép với đề bài để đọc được (nội dung
  // đổi sau khi ghi thì giữ nguyên dòng, chỉ mất phần đề).
  const disputedAnswers = useProgress((s) => s.disputedAnswers)
  const clearDisputed = useProgress((s) => s.clearDisputedAnswer)
  const disputedRows = disputedAnswers.map((row) => ({
    ...row,
    prompt:
      modules
        .flatMap((m) => [
          ...m.masteryTest,
          ...m.lessons.flatMap((l) => [
            ...l.steps[3].exercises.map((e) => e.question),
            ...l.steps[4].questions.map((e) => e.question),
          ]),
        ])
        .find((q) => q.id === row.questionId)?.prompt ?? null,
  }))
  const moduleTitles = Object.fromEntries(modules.map((m) => [m.id, m.title]))
  // Sổ "giải thích chưa lọt" (ý N6) — cùng lối ghép với đề bài như sổ
  // khiếu nại chấm ngay trên, nhưng là MỘT MỤC KHÁC: kia nói về cách
  // chấm, đây nói về cách dạy.
  const giaiThichChuaLot = useProgress((s) => s.giaiThichChuaLot)
  const boChuaLot = useProgress((s) => s.boChuaLot)
  const chuaLotRows = giaiThichChuaLot.map((row) => ({
    ...row,
    prompt:
      modules
        .flatMap((m) =>
          m.lessons.flatMap((l) => [
            ...l.steps[3].exercises.map((e) => e.question),
            ...l.steps[4].questions.map((e) => e.question),
          ]),
        )
        .find((q) => q.id === row.questionId)?.prompt ?? null,
  }))
  // Bản đồ trí nhớ (kho A1): độ tươi theo module, chỉ đọc dữ liệu SM-2.
  // Kèm luôn TỪNG THẺ bên trong để mở ra xem được (chủ dự án hỏi 08-15):
  // "6 thẻ" không gọi được tên thì không dẫn tới việc gì.
  const memoryRows = memoryByModule(reviewCards, todayIso(), modules.map((m) => m.id)).map((row) => ({
    ...row,
    title: modules.find((m) => m.id === row.moduleId)?.title ?? { vi: row.moduleId },
    the: memoryCardsOf(reviewCards, row.moduleId, todayIso()).map((the) => ({
      ...the,
      ten: tenThe(the.cardId),
    })),
  }))
  const weeks = weeklyActivity(completedLessons, drillHistory, todayIso())
  // Quãng ngồi liền dài nhất tuần này — bề SÂU của một lần ngồi, đi kèm
  // đồ thị 8 tuần vốn chỉ đo bề rộng.
  const quangHoc = useProgress((s) => s.quangHoc)
  const quangTuanNay = daiNhatTuan(quangHoc, todayIso())
  const quangTuanTruoc = daiNhatTuanTruoc(quangHoc, todayIso())
  // So với chính mình tháng trước (kho ý tưởng I3). Trang này là nơi DUY
  // NHẤT đã có sẵn bảng phân tích trong tay, nên nó cũng là nơi cất mốc —
  // store tự quyết định tháng này đã cất chưa, ở đây chỉ đưa số liệu sang.
  const latCatThang = useProgress((s) => s.latCatThang)
  const ghiLatCatThang = useProgress((s) => s.ghiLatCatThang)
  useEffect(() => {
    ghiLatCatThang(analysis)
    // Chạy một lần mỗi lần mở trang: mốc là số liệu ĐẦU THÁNG, cất lại
    // giữa chừng thì mốc trôi theo và không còn gì để so.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const mocThang = mocDeSo(latCatThang, thangCua(todayIso()))
  const dongSoSanh = mocThang === null ? [] : soSanhDang(mocThang, analysis)
  // Ảo giác quen mặt (kho ý tưởng I4): tra cardId ra mặt trước đọc được.
  // Thẻ cung điện có tiền tố riêng nên phải hỏi đúng hai nguồn — nội dung
  // đổi mà thẻ cũ không còn thì để `null`, UI hiện tạm cardId chứ không
  // giấu dòng đi (số lần hụt vẫn là chuyện thật đã xảy ra).
  const aoGiacRows = aoGiacHayGap(aoGiacQuenMat).map((row) => ({ ...row, ten: tenThe(row.cardId) }))
  // "Thứ bạn hay quên" — cùng lối tra cardId ra tên đọc được như trên,
  // thêm đường mở lại BÀI đã dạy nó: người học hỏi mục này chính là để
  // biết nên quay lại học lại chỗ nào.
  const doc = (row: { cardId: string; moduleId: string; soLanQuen: number }) => {
    const bai = baiDayKhaiNiem(row.cardId)
    return {
      ...row,
      ten: tenThe(row.cardId),
      lessonId: bai?.lesson.id ?? null,
      moduleTitle: bai?.module.title ?? modules.find((m) => m.id === row.moduleId)?.title ?? null,
    }
  }
  const hayQuenRows = theHayQuen(reviewCards).map(doc)
  // Bậc thứ hai: mới trượt MỘT lần. Ngưỡng "hay quên" không đổi (vẫn là
  // 2, vẫn dùng chung với thẻ Hôm nay và phiên luyện) — đây chỉ là cửa
  // sổ nhìn sớm, đứng riêng và có nhãn riêng.
  const ganQuenRows = theGanQuen(reviewCards).map(doc)

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
        {/* Con số của HÔM NAY, không phải của tháng đã ghi trong state — xem
            `freezesAvailable` (phát hiện K2). */}
        <StatCard icon={Snowflake} label={t('profile.freezes')} value={freezesAvailable(streak, todayIso())} />
        <StatCard icon={BookOpenCheck} label={t('profile.lessonsDone')} value={Object.keys(completedLessons).length} />
        <StatCard icon={Layers} label={t('profile.cardsTotal')} value={reviewCards.length} />
      </div>
      <p className="mt-4 text-xs text-ink-muted">{t('profile.freezeNote')}</p>

      <MemoryMap rows={memoryRows} />
      {/* Đặt NGAY SAU bản đồ trí nhớ, tức gần đầu trang: đây là mục người
          học chủ động đi tìm ("cho tôi xem những câu hay quên"), nên nó
          không được nằm lẫn ở cuối trang. */}
      <HayQuenList rows={hayQuenRows} ganQuen={ganQuenRows} />
      <MistakeAnalysisCard analysis={analysis} moduleTitles={moduleTitles} drillSize={drillSize} />
      <SoSanhThangCard moc={mocThang} rows={dongSoSanh} dangCho={latCatThang.length > 0} />
      <DisputedList rows={disputedRows} onClear={clearDisputed} />
      <ChuaLotList rows={chuaLotRows} onClear={boChuaLot} />
      <WeakSpotList spots={spots} />
      <AoGiacList rows={aoGiacRows} />
      <WeeklyRhythm
        weeks={weeks}
        quangTuanNay={quangTuanNay}
        quangTuanTruoc={quangTuanTruoc}
        daTungHoc={Object.keys(completedLessons).length > 0 || drillHistory.length > 0}
      />

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
        <AnhChupList />
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
