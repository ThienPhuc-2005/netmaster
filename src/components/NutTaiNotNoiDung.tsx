// Nút "tải nốt phần nội dung còn thiếu" — dùng chung cho mọi chỗ phải
// nói với người học rằng kho nội dung đang cụt (khối 21.49 → 21.50).
//
// Chỉ gói phần HÀNH ĐỘNG, cố ý KHÔNG gói phần câu chữ: trang Học nói về
// danh sách chủ đề ngắn đi, màn tốt nghiệp nói về việc chưa soát được cả
// khóa — hai câu chuyện khác nhau, chung đúng một cái nút.
//
// LUẬT LỚN NHẤT CỦA FILE NÀY (ý N2, khối 21.56): **người bấm thì tải lại
// luôn; MÁY tự làm thì phải hỏi.** Mạng về là app tự kéo nốt phần thiếu —
// đó là việc của máy, không nên bắt người học nhớ bấm. Nhưng tải lại
// trang thì giật trang khỏi tay người đang đọc dở, nên lượt tự động chỉ
// dừng ở chỗ báo "đã tải xong" kèm một nút để họ tự chọn lúc áp dụng.

import { useEffect, useRef, useState } from 'react'
import { primeModules, soDaVe, soModuleThieu, tongSoModule } from '../content'
import { useT } from '../i18n'
import { Button } from './Button'

type TrangThai =
  | { kind: 'cho' }
  /** Đang kéo — `daVe` là con số sống, nhích lên theo từng gói. */
  | { kind: 'dang-keo'; daVe: number }
  /** Kéo xong mà vẫn chưa đủ. */
  | { kind: 'hut' }
  /** MÁY tự kéo được thêm; chờ người học chọn lúc tải lại trang. */
  | { kind: 'xong-cho-lenh' }

export function NutTaiNotNoiDung() {
  const t = useT()
  const [trangThai, setTrangThai] = useState<TrangThai>({ kind: 'cho' })
  // Số gói còn thiếu lúc bắt đầu một lượt kéo — mốc để biết lượt đó có
  // thu được gì không. Giữ trong ref để tay bắt sự kiện `online` (gắn một
  // lần) luôn đọc được con số mới nhất.
  const thieuRef = useRef(soModuleThieu())
  thieuRef.current = soModuleThieu()
  const dangKeoRef = useRef(false)

  // Hàm kéo sống trong ref chứ không dựng lại trong effect: tay bắt sự
  // kiện `online` gắn ĐÚNG MỘT LẦN nhưng vẫn phải gọi được bản mới nhất,
  // mà nút bấm cũng gọi chính nó — một đường duy nhất cho cả hai lối vào.
  const keoRef = useRef<(tuDong: boolean) => void>(() => undefined)
  keoRef.current = (tuDong: boolean) => {
      // Hai lượt kéo chồng nhau chỉ tổ đếm loạn; mạng chập chờn bắn
      // `online` nhiều lần là chuyện thường.
      if (dangKeoRef.current) return
      const thieuLucDau = thieuRef.current
      if (thieuLucDau <= 0) return
      dangKeoRef.current = true
      setTrangThai({ kind: 'dang-keo', daVe: soDaVe() })
      primeModules(() => setTrangThai({ kind: 'dang-keo', daVe: soDaVe() })).then(
        () => {
          dangKeoRef.current = false
          const duocThem = soModuleThieu() < thieuLucDau
          if (!duocThem) {
            setTrangThai({ kind: 'hut' })
            return
          }
          // Người BẤM thì họ đang chờ kết quả — tải lại luôn. MÁY tự kéo
          // thì họ đang đọc dở một trang, nên chỉ báo và để họ chọn lúc.
          if (tuDong) setTrangThai({ kind: 'xong-cho-lenh' })
          else window.location.reload()
        },
        () => {
          dangKeoRef.current = false
          setTrangThai({ kind: 'hut' })
        },
      )
  }

  useEffect(() => {
    // MẠNG VỀ THÌ TỰ THỬ LẠI (ý N2): bắt người học nhớ bấm là bắt họ làm
    // việc của máy. Sự kiện này KHÔNG hứa mạng thật sự thông — nó chỉ nói
    // máy vừa nối lại được — nên lượt kéo vẫn có thể hụt, và nhánh hụt ở
    // trên lo chuyện đó.
    const khiOnline = () => keoRef.current(true)
    window.addEventListener('online', khiOnline)
    return () => window.removeEventListener('online', khiOnline)
  }, [])

  const bamTay = () => keoRef.current(false)

  if (trangThai.kind === 'xong-cho-lenh') {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs text-ink">{t('learn.thieuTuXong')}</p>
        <Button onClick={() => window.location.reload()}>{t('learn.thieuDungNgay')}</Button>
      </div>
    )
  }

  const dangKeo = trangThai.kind === 'dang-keo'
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="ghost" onClick={bamTay} disabled={dangKeo}>
        {dangKeo
          ? t('learn.thieuDangKeoTien', { daVe: trangThai.daVe, tong: tongSoModule() })
          : t('learn.thieuRetry')}
      </Button>
      {trangThai.kind === 'hut' && <p className="text-xs text-warn">{t('learn.thieuVanChua')}</p>}
    </div>
  )
}
