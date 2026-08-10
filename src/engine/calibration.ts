// Tự chấm độ chắc trước khi lật thẻ (kho ý tưởng A2) — và đối chiếu lời
// tự chấm đó với kết quả thật.
//
// Vì sao đáng có: kỹ năng phân biệt "mình BIẾT" với "mình THẤY QUEN" là
// kỹ năng lõi của người tự học, và nó hỏng theo một hướng cố định —
// đọc lại thấy quen nên tưởng đã nhớ (illusion of fluency). Người học
// không tự sửa được nếu không ai chỉ ra khoảng lệch. Một câu hỏi trước
// khi lật, rồi một dòng đối chiếu sau khi chấm, là cách rẻ nhất để biến
// khoảng lệch đó thành thứ nhìn thấy được.
//
// BA LUẬT giữ cho nó không phá cơ chế học:
//  1. Hỏi SAU khi người học đã cố nhớ, TRƯỚC khi lật đáp án — hỏi sau
//     khi lật thì câu trả lời chỉ là suy diễn ngược từ kết quả.
//  2. Không cộng XP, không đụng lịch SM-2 (nguyên tắc 5): đây là phép
//     đo của người học về chính mình, không phải nguồn điểm.
//  3. Nút chọn độ chắc CHÍNH LÀ nút lật thẻ — thêm một cú bấm nữa vào
//     nhịp ôn 15 thẻ là đổi một thói quen tốt lấy một phiền phức.
//
// Technical contract: thuần TS, tất định, không đồng hồ, không lưu trữ —
// một phiên ôn tự giữ danh sách bản ghi của mình.

/** Người học tự thấy mình chắc tới đâu, TRƯỚC khi nhìn đáp án. */
export type Confidence = 'sure' | 'unsure' | 'blank'

/** Kết quả đối chiếu giữa lời tự chấm và chuyện đã xảy ra. */
export type CalibrationVerdict =
  /** Thấy chắc mà không nhớ ra — ảo giác quen mặt, cái đáng chỉ ra nhất. */
  | 'overconfident'
  /** Nói chịu mà vẫn nhớ ra — tự đánh giá thấp mình. */
  | 'underconfident'
  /** Tự chấm khớp với kết quả. */
  | 'aligned'

export interface CalibrationRecord {
  cardId: string
  confidence: Confidence
  remembered: boolean
}

/**
 * Đối chiếu một lượt. "Lơ mơ" luôn là KHỚP dù kết quả thế nào — người
 * nói mình không chắc thì nhớ được hay không cũng không mâu thuẫn với
 * chính lời họ nói; phạt họ ở đây là dạy người ta đừng thành thật.
 */
export function calibrationVerdict(confidence: Confidence, remembered: boolean): CalibrationVerdict {
  if (confidence === 'unsure') return 'aligned'
  if (confidence === 'sure') return remembered ? 'aligned' : 'overconfident'
  return remembered ? 'underconfident' : 'aligned'
}

export interface CalibrationSummary {
  total: number
  aligned: number
  overconfident: number
  underconfident: number
  /** Tỉ lệ tự chấm khớp, 0..1 — null khi chưa có lượt nào để nói. */
  accuracy: number | null
}

/** Tổng kết cả phiên — nguyên liệu cho MỘT dòng ở màn kết phiên ôn. */
export function calibrationSummary(records: readonly CalibrationRecord[]): CalibrationSummary {
  let aligned = 0
  let over = 0
  let under = 0
  for (const r of records) {
    const verdict = calibrationVerdict(r.confidence, r.remembered)
    if (verdict === 'aligned') aligned += 1
    else if (verdict === 'overconfident') over += 1
    else under += 1
  }
  return {
    total: records.length,
    aligned,
    overconfident: over,
    underconfident: under,
    accuracy: records.length === 0 ? null : aligned / records.length,
  }
}
