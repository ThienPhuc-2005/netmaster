// Lời nhắc nghỉ (kho ý tưởng A6) — vỏ UI cho `engine/nhacNghi`.
//
// Mọi luật "khi nào nên nói" nằm ở engine; file này chỉ lo ba việc mà
// engine cố ý không biết: đọc đồng hồ thật, nghe cử động của người học,
// và giữ mồm ở những chỗ không được chen ngang.
//
// KHÔNG CHEN NGANG BÀI THI. Đang thi cuối module mà bị nhắc nghỉ là phá
// đúng lúc người ta cần liền mạch nhất — bài thi có thời gian của nó và
// người học đã tự chọn ngồi vào. Nhắc sau khi thi xong vẫn kịp.
//
// KHÔNG NHỚ QUA LẦN TẢI TRANG. Quãng học sống trong bộ nhớ, tải lại trang
// là đếm lại từ đầu. Cố ý: nhắc muộn một quãng thì không ai thiệt, còn
// nhắc oan ngay khi vừa mở app là lời nhắc mất uy tín ngay lần đầu.

import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { Coffee, X } from 'lucide-react'
import { useT } from '../i18n'
import { useSettings } from '../store/settings'
import { useProgress } from '../store/progress'
import {
  chamMot,
  daNhac,
  denLucNhac,
  HIEN_GIAY,
  HOC_LIEN_TUC_PHUT,
  soPhutDaHoc,
  soPhutDenChamCuoi,
  TRANG_THAI_DAU,
  type TrangThaiNhacNghi,
} from '../engine/nhacNghi'

/** Nhịp soi lại đồng hồ. 30 giây là đủ mịn cho một mốc tính bằng phút. */
const NHIP_MS = 30_000

/** Đang thi thì im — xem ghi chú đầu file. */
export function duocPhepNhac(pathname: string): boolean {
  return !/^\/kiem-tra\//.test(pathname)
}

export function NhacNghi() {
  const t = useT()
  const bat = useSettings((s) => s.nhacNghi)
  const pathname = useLocation().pathname
  const trangThai = useRef<TrangThaiNhacNghi>(TRANG_THAI_DAU)
  const [dangHien, setDangHien] = useState(false)
  const [soPhut, setSoPhut] = useState(HOC_LIEN_TUC_PHUT)
  const ghiQuangHoc = useProgress((s) => s.ghiQuangHoc)

  // Nghe cử động. Dùng sự kiện ở tầng document với `capture` để bắt được
  // cả thao tác trong các ô nhập của phòng lab/terminal — chúng nuốt sự
  // kiện nổi bọt, mà gõ lệnh trong terminal thì đúng là đang học.
  //
  // KHÔNG gác theo cài đặt `nhacNghi`: quãng ngồi liền còn là số liệu của
  // trang Hồ sơ ("tuần này ngồi liền lâu nhất N phút"). Tắt lời nhắc là
  // tắt LỜI NHẮC, không phải tắt cái đồng hồ — người tắt nhắc vẫn có
  // quyền đọc nếp ngồi của mình.
  useEffect(() => {
    const cham = () => {
      trangThai.current = chamMot(trangThai.current, Date.now())
    }
    cham() // mở app / đổi trang cũng là một cử động
    const loai = ['pointerdown', 'keydown'] as const
    for (const ten of loai) document.addEventListener(ten, cham, true)
    return () => {
      for (const ten of loai) document.removeEventListener(ten, cham, true)
    }
  }, [pathname])

  useEffect(() => {
    if (!bat) setDangHien(false)
    const soi = () => {
      const bayGio = Date.now()
      // Ghi kỷ lục trước, và ghi bằng quãng tính tới LẦN CHẠM CUỐI — xem
      // `soPhutDenChamCuoi`. Store tự bỏ qua khi chưa phá kỷ lục trong ngày.
      ghiQuangHoc(soPhutDenChamCuoi(trangThai.current))
      if (!bat) return
      if (!denLucNhac(trangThai.current, bayGio) || !duocPhepNhac(pathname)) return
      setSoPhut(soPhutDaHoc(trangThai.current, bayGio))
      trangThai.current = daNhac(trangThai.current, bayGio)
      setDangHien(true)
    }
    const id = setInterval(soi, NHIP_MS)
    return () => clearInterval(id)
  }, [bat, pathname, ghiQuangHoc])

  // TỰ LUI sau `HIEN_GIAY` giây — xem lý do ở engine. Đếm bằng thời gian
  // TRANG ĐANG HIỆN, không phải thời gian trôi: người nghe lời rủ mà
  // đứng dậy thật thì tab nằm ở nền, đếm tiếp là lời nhắc tan đúng lúc
  // không ai nhìn — quay lại chỉ thấy màn hình y như chưa từng nhắc gì.
  useEffect(() => {
    if (!dangHien) return
    let conLai = HIEN_GIAY
    const id = setInterval(() => {
      if (document.visibilityState === 'hidden') return
      conLai -= 1
      if (conLai <= 0) setDangHien(false)
    }, 1_000)
    return () => clearInterval(id)
  }, [dangHien])

  if (!dangHien) return null

  return (
    // `role="status"` chứ không phải `alert`: đây là lời rủ, không phải
    // cảnh báo — trình đọc màn hình đọc nó khi rảnh, không cắt ngang.
    <div
      role="status"
      className="mb-6 flex items-start gap-3 rounded-md border border-edge bg-panel px-4 py-3"
    >
      <Coffee size={18} aria-hidden className="mt-0.5 shrink-0 text-accent" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-ink">{t('nhacNghi.title')}</p>
        <p className="mt-1 text-sm text-ink-muted">{t('nhacNghi.body', { phut: soPhut })}</p>
      </div>
      <button
        onClick={() => setDangHien(false)}
        aria-label={t('nhacNghi.dong')}
        className="shrink-0 rounded-md p-1 text-ink-muted transition-colors duration-(--dur) hover:bg-panel-hover hover:text-ink"
      >
        <X size={16} aria-hidden />
      </button>
    </div>
  )
}
