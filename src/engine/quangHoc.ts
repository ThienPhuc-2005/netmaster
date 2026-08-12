// Quãng ngồi học liền lâu nhất trong tuần (kho ý tưởng, cụm hồ sơ 08-10).
//
// `nhacNghi.ts` đã đo quãng ngồi liền để biết lúc nào nên rủ người ta
// nghỉ, nhưng con số ấy tan ngay khi tải lại trang. File này là nửa còn
// lại: giữ KỶ LỤC của từng ngày để trang Hồ sơ nói được "tuần này bạn
// ngồi liền lâu nhất 47 phút".
//
// GIỌNG CỦA CON SỐ NÀY LÀ CHỖ DỄ SAI NHẤT, và nó phải nhất quán với A6:
// app vừa mới rủ người ta nghỉ sau 25 phút thì không thể quay lại vỗ tay
// vì họ ngồi liền 90 phút. Nên đây là DỮ LIỆU, không phải thành tích —
// không huy hiệu, không XP, không "kỷ lục mới!", và quãng dài quá thì UI
// nói thẳng cái giá của nó.
//
// Technical contract: thuần TS, tất định, ngày bơm từ ngoài.

import { addDays, diffDays, isBefore } from './dates'
import { weekStartOf } from './mistakeLog'
import { HOC_LIEN_TUC_PHUT } from './nhacNghi'
import type { ISODate } from './types'

/**
 * Giữ kỷ lục của bao nhiêu ngày. 70 ngày = 10 tuần, rộng hơn đồ thị nếp
 * học 8 tuần một quãng — để tuần cũ nhất trên đồ thị vẫn còn số của nó.
 */
export const GIU_NGAY = 70

/**
 * Quá bao lâu thì một quãng ngồi liền đáng được nói thêm một câu.
 *
 * Gấp đôi mốc nhắc nghỉ: một lần lỡ đà tới 30 phút là chuyện thường của
 * người đang vào mạch, còn 50 phút liền thì phần học sau đã bắt đầu đè
 * lên phần trước — mà đó chính là điều app đã nói ở lời nhắc nghỉ.
 */
export const QUANG_DAI_PHUT = HOC_LIEN_TUC_PHUT * 2

/** ngày -> số phút của quãng ngồi liền DÀI NHẤT ngày đó. */
export type SoQuangHoc = Readonly<Record<string, number>>

/**
 * Ghi một quãng vừa đo được, rồi dọn ngày quá cũ.
 *
 * Chỉ ghi khi DÀI HƠN kỷ lục của chính ngày đó — quãng đang chạy được
 * báo lại mỗi phút, nên nếu ghi đè vô điều kiện thì con số của một ngày
 * sẽ TỤT xuống mỗi lần người học ngồi xuống lần thứ hai trong ngày.
 * Trả về chính object cũ khi không có gì đổi, để tầng store biết mà
 * không đụng vào ổ đĩa.
 */
export function ghiQuang(so: SoQuangHoc, ngay: ISODate, phut: number): SoQuangHoc {
  if (phut <= 0 || phut <= (so[ngay] ?? 0)) return so
  const moi: Record<string, number> = { [ngay]: phut }
  const canGiuTu = addDays(ngay, -GIU_NGAY)
  for (const [d, p] of Object.entries(so)) {
    if (d !== ngay && !isBefore(d, canGiuTu)) moi[d] = p
  }
  return moi
}

/** Kỷ lục của một tuần, kèm ngày lập nó (để UI nói "hôm thứ Tư"). */
export interface QuangTuan {
  phut: number
  /** null khi cả tuần không có quãng nào được ghi. */
  ngay: ISODate | null
}

/**
 * Quãng dài nhất của tuần chứa `moc` (tuần bắt đầu từ thứ Hai, nếp VN —
 * dùng chung `weekStartOf` với đồ thị nếp học để hai chỗ không lệch tuần).
 *
 * Hòa thì lấy ngày SỚM hơn: kỷ lục thuộc về hôm lập được nó trước.
 */
export function daiNhatTuan(so: SoQuangHoc, moc: ISODate): QuangTuan {
  const dau = weekStartOf(moc)
  let out: QuangTuan = { phut: 0, ngay: null }
  for (const [ngay, phut] of Object.entries(so)) {
    const cach = diffDays(dau, ngay)
    if (cach < 0 || cach > 6) continue
    if (phut > out.phut || (phut === out.phut && out.ngay !== null && isBefore(ngay, out.ngay))) {
      out = { phut, ngay }
    }
  }
  return out
}

/** Quãng dài nhất của tuần TRƯỚC — số một mình không nói gì, cần chỗ tựa. */
export function daiNhatTuanTruoc(so: SoQuangHoc, moc: ISODate): QuangTuan {
  return daiNhatTuan(so, addDays(weekStartOf(moc), -7))
}
