// Nút "tải nốt phần nội dung còn thiếu" — dùng chung cho mọi chỗ phải
// nói với người học rằng kho nội dung đang cụt (khối 21.49 → 21.50).
//
// Chỉ gói phần HÀNH ĐỘNG, cố ý KHÔNG gói phần câu chữ: trang Học nói về
// danh sách chủ đề ngắn đi, màn tốt nghiệp nói về việc chưa soát được cả
// khóa — hai câu chuyện khác nhau, chung đúng một cái nút.

import { useState } from 'react'
import { primeModules, soModuleThieu } from '../content'
import { useT } from '../i18n'
import { Button } from './Button'

export function NutTaiNotNoiDung() {
  const t = useT()
  const [trangThai, setTrangThai] = useState<'cho' | 'dang-keo' | 'hut'>('cho')
  const thieu = soModuleThieu()

  const keoNot = () => {
    setTrangThai('dang-keo')
    primeModules().then(
      () => {
        // Về thêm được gói nào thì TẢI LẠI TRANG, không tự vẽ lại: mọi
        // màn đọc `loadModules()` lúc render, mà chuỗi mở khóa và bộ dọn
        // thẻ mồ côi đều nằm ở cổng vào app — cho nó chạy lại một lượt
        // sạch sẽ đáng hơn là vá từng chỗ.
        if (soModuleThieu() < thieu) window.location.reload()
        else setTrangThai('hut')
      },
      () => setTrangThai('hut'),
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="ghost" onClick={keoNot} disabled={trangThai === 'dang-keo'}>
        {t(trangThai === 'dang-keo' ? 'learn.thieuDangKeo' : 'learn.thieuRetry')}
      </Button>
      {trangThai === 'hut' && <p className="text-xs text-warn">{t('learn.thieuVanChua')}</p>}
    </div>
  )
}
