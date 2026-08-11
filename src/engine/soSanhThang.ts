// "So với chính mình tháng trước" (kho ý tưởng I3).
//
// Bảng phân tích chỗ hay sai (`analyzeMistakes`) chỉ biết HIỆN TẠI: nó
// nói "bạn vấp 45% câu gõ tay", không nói được "tháng trước là 60%". Mà
// với người học dài hạn, con số thứ hai mới là con số đáng sống vì nó
// trả lời câu hỏi duy nhất người ta thật sự hỏi: mình có đang khá lên
// không.
//
// Nên mỗi tháng cất một LÁT CẮT nhỏ của bảng phân tích, rồi so lát cắt
// cũ với hiện tại.
//
// HAI QUYẾT ĐỊNH ĐẮT NHẤT, cùng bắt nguồn từ một sự thật của store:
// **học lại một bài đã xong thì bộ đếm vấp của bài đó bị dựng mới**
// (`beginLesson` gọi `startLesson`, `failCount` về 0).
//
//  1. **So TỈ LỆ tại hai thời điểm, KHÔNG lấy hiệu hai mốc.** Hiệu hai
//     mốc ("tháng này vấp thêm bao nhiêu") nghe hay hơn nhiều, nhưng chỉ
//     cần người học ôn lại một bài cũ là số trừ ra ÂM — và một bảng thống
//     kê ra số âm thì người đọc mất niềm tin vào cả trang, đúng lúc nó
//     đang định khen họ.
//  2. **Nói thẳng đây là trung bình CỘNG DỒN từ đầu khóa.** Nó nhích
//     chậm, và phải để người học biết điều đó, nếu không họ sẽ đọc
//     "45% → 43%" thành "tháng này mình chỉ khá lên tí tẹo" trong khi
//     thực tế tháng này họ có thể đã làm rất tốt.
//
// Technical contract: thuần TS, tất định, mọi mốc thời gian bơm từ ngoài.

import { MIN_SAMPLE, type MistakeAnalysis } from './mistakeLog'
import type { ISODate } from './types'

/** Tháng dạng 'YYYY-MM' — khóa của một lát cắt. */
export type ThangISO = string

/** Số liệu của MỘT dạng câu tại thời điểm chụp. */
export interface LatCatDang {
  /** Số câu đã làm xong thuộc dạng này. */
  attempted: number
  /** Số câu từng vấp ít nhất một lần. */
  stumbled: number
}

/** Ảnh chụp bảng phân tích của một tháng. */
export interface LatCatThang {
  thang: ThangISO
  /** Ngày chụp — để UI nói được "mốc ngày 01/07" thay vì chỉ "tháng 7". */
  ngay: ISODate
  theoDang: Record<string, LatCatDang>
}

/**
 * Giữ 12 lát cắt = một năm học. Mỗi lát chỉ là vài con số theo dạng câu
 * (không phải bản sao tiến độ), nên trần rộng tay được — nhưng vẫn phải
 * có trần: đây là trường persist mọc thêm mỗi tháng, không chặn là nó
 * phình mãi.
 */
export const SO_THANG_GIU = 12

/**
 * Chênh lệch dưới ngưỡng này thì gọi là ĐI NGANG.
 *
 * 5 điểm phần trăm trên một trung bình cộng dồn đã là một quãng dài. Gọi
 * tên mọi nhích nhỏ là "đã lên" thì lời khen mất giá ngay lần thứ hai
 * người học đọc nó.
 */
export const NGUONG_CHENH = 0.05

export function thangCua(ngay: ISODate): ThangISO {
  return ngay.slice(0, 7)
}

/**
 * Rút một lát cắt từ bảng phân tích hiện tại.
 *
 * Chỉ giữ lát cắt theo DẠNG CÂU, cố ý bỏ lát theo module và theo chủ đề:
 * module thì người học đi qua một lần rồi thôi (so hai tháng là so hai
 * vùng kiến thức khác nhau, vô nghĩa), còn chủ đề thì `hintTopic` là
 * trường tùy chọn nên mẫu số không tồn tại. Dạng câu là lát DUY NHẤT
 * sống suốt khóa: câu gõ tay tháng nào cũng có.
 */
export function latCatTuPhanTich(analysis: MistakeAnalysis, ngay: ISODate): LatCatThang {
  const theoDang: Record<string, LatCatDang> = {}
  for (const b of analysis.byKind) {
    theoDang[b.key] = { attempted: b.attempted, stumbled: b.stumbled }
  }
  return { thang: thangCua(ngay), ngay, theoDang }
}

/**
 * Tháng này đã cất mốc chưa? (danh sách MỚI NHẤT ĐỨNG ĐẦU)
 *
 * Mỗi tháng đúng một mốc. Mốc được cất ở lần mở trang Hồ sơ đầu tiên
 * của tháng, nên nó là "số liệu đầu tháng" — đúng thứ cần để cuối tháng
 * nhìn lại. Người học không mở trang cả tháng thì tháng đó không có mốc,
 * và như thế là ĐÚNG: bịa ra một mốc không ai đo được còn tệ hơn.
 */
export function nenChupThang(danhSach: readonly LatCatThang[], thangNay: ThangISO): boolean {
  return danhSach.length === 0 || danhSach[0]!.thang !== thangNay
}

/** Thêm một lát cắt vào đầu danh sách rồi cắt về trần. */
export function themLatCat(
  danhSach: readonly LatCatThang[],
  moi: LatCatThang,
  tran: number = SO_THANG_GIU,
): LatCatThang[] {
  return [moi, ...danhSach].slice(0, tran)
}

/**
 * Mốc đem ra so: mốc mới nhất thuộc một tháng KHÁC tháng hiện tại.
 *
 * Vì sao không lấy thẳng `danhSach[0]`: mốc đầu danh sách thường là mốc
 * vừa cất đầu tháng này, so nó với hiện tại thì đang so mình với mình
 * của mấy ngày trước — chưa đủ xa để có gì đáng nói. `null` = chưa có
 * tháng nào để so, và UI phải nói thật là chưa có.
 */
export function mocDeSo(danhSach: readonly LatCatThang[], thangNay: ThangISO): LatCatThang | null {
  return danhSach.find((l) => l.thang !== thangNay) ?? null
}

/** Một dòng so sánh của một dạng câu. */
export interface DongSoSanh {
  /** Mã dạng câu ('typed', 'lab', 'cli'…). */
  key: string
  /** Tỉ lệ vấp lúc chụp mốc, 0..1. */
  rateTruoc: number
  /** Tỉ lệ vấp bây giờ, 0..1. */
  rateNay: number
  attemptedTruoc: number
  attemptedNay: number
  /** rateTruoc - rateNay: dương là vấp ít đi, tức là KHÁ LÊN. */
  chenh: number
  /** Đủ mẫu ở CẢ HAI mốc thì mới được phán một chữ. */
  duMau: boolean
  /** 'tien' = vấp ít đi · 'lui' = vấp nhiều lên · 'ngang' = trong ngưỡng nhiễu. */
  huong: 'tien' | 'ngang' | 'lui'
}

/**
 * So bảng phân tích hiện tại với một mốc cũ, theo từng dạng câu.
 *
 * CHỈ so dạng câu có ở CẢ HAI mốc: dạng mới gặp tháng này (người học vừa
 * bước sang phần trung cấp, lần đầu chạm console thiết bị) không có gì
 * để so, mà bày nó ra với một cột trống thì người đọc tưởng mình tụt.
 *
 * Xếp: đủ mẫu trước, rồi CHÊNH LỆCH LỚN đứng trước bất kể chiều nào —
 * chỗ đổi nhiều nhất là chỗ đáng đọc nhất, kể cả khi nó là tin xấu.
 */
export function soSanhDang(moc: LatCatThang, analysis: MistakeAnalysis): DongSoSanh[] {
  const nay = new Map(analysis.byKind.map((b) => [b.key, b]))
  const rows: DongSoSanh[] = []

  for (const [key, truoc] of Object.entries(moc.theoDang)) {
    const hienTai = nay.get(key)
    if (truoc.attempted === 0 || hienTai === undefined || hienTai.attempted === 0) continue
    const rateTruoc = truoc.stumbled / truoc.attempted
    const rateNay = hienTai.stumbled / hienTai.attempted
    const chenh = rateTruoc - rateNay
    rows.push({
      key,
      rateTruoc,
      rateNay,
      attemptedTruoc: truoc.attempted,
      attemptedNay: hienTai.attempted,
      chenh,
      duMau: truoc.attempted >= MIN_SAMPLE && hienTai.attempted >= MIN_SAMPLE,
      huong: Math.abs(chenh) < NGUONG_CHENH ? 'ngang' : chenh > 0 ? 'tien' : 'lui',
    })
  }

  return rows.sort(
    (a, b) =>
      Number(b.duMau) - Number(a.duMau) ||
      Math.abs(b.chenh) - Math.abs(a.chenh) ||
      (a.key < b.key ? -1 : a.key > b.key ? 1 : 0),
  )
}
