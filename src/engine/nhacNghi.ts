// Nhắc nghỉ đúng lúc (kho ý tưởng A6).
//
// Học liền một mạch quá lâu thì phần học sau đè lên phần học trước, và
// thứ vừa nạp chưa kịp chuyển thành trí nhớ dài hạn. Nên sau ~25 phút
// liên tục, app nói nhẹ một câu rồi thôi.
//
// Ba luật làm nên "đúng lúc", và cả ba đều là chỗ dễ làm sai:
//
//   1. NGHỈ RỒI THÌ KHÔNG NHẮC. Rời máy quá `NGHI_PHUT` là người ta đã tự
//      nghỉ — quay lại mà bị nhắc "nghỉ đi" thì lời nhắc thành vô duyên và
//      lần sau không ai đọc nữa. Quãng tính lại từ đầu.
//   2. NHẮC RỒI THÌ IM MỘT QUÃNG. Không nhắc lại cho tới khi đủ thêm một
//      quãng nữa; nhắc dồn là cách nhanh nhất để người ta tắt tính năng.
//   3. KHÔNG TỰ LẤY GIỜ. Mọi hàm ở đây nhận `bayGio` từ ngoài (luật của
//      `src/engine/`), nên test đo được mọi mốc mà không phải chờ thật.
//
// File này KHÔNG quyết định chỗ hiện lời nhắc và KHÔNG biết gì về React —
// nó chỉ trả lời hai câu: quãng học liên tục đang dài bao nhiêu, và đã
// đến lúc nói chưa.

/** Học liền bao lâu thì nhắc. 25 phút — một nhịp pomodoro quen thuộc. */
export const HOC_LIEN_TUC_PHUT = 25

/** Rời máy bao lâu thì coi như đã nghỉ. */
export const NGHI_PHUT = 5

/**
 * Lời nhắc nằm lại bao lâu rồi TỰ LUI (giây).
 *
 * Nó là lời rủ, không phải việc phải làm — mà một lời rủ ngồi lì trên
 * đầu trang suốt buổi thì chỉ có hai kết cục: thành giấy dán tường
 * (người học thôi đọc mọi thứ hiện ở chỗ đó), hoặc thành lời trách đeo
 * theo từng câu trả lời tiếp theo. Ai định nghỉ thì 45 giây đủ để đọc
 * và đứng dậy; ai định học tiếp thì đỡ phải bấm tắt.
 *
 * Nút tắt vẫn còn: tự lui là để khỏi PHẢI bấm, không phải để cấm bấm.
 */
export const HIEN_GIAY = 45

const PHUT = 60_000

export interface TrangThaiNhacNghi {
  /** Mốc bắt đầu quãng học liên tục hiện tại; `null` = chưa học gì. */
  batDau: number | null
  /** Lần gần nhất người học động vào app. */
  chamCuoi: number | null
  /** Lần gần nhất đã nhắc; `null` = quãng này chưa nhắc lần nào. */
  daNhacLuc: number | null
}

export const TRANG_THAI_DAU: TrangThaiNhacNghi = {
  batDau: null,
  chamCuoi: null,
  daNhacLuc: null,
}

/**
 * Ghi nhận một cử động của người học (bấm phím, chạm màn hình, đổi trang).
 *
 * Đây là chỗ luật 1 sống: khoảng lặng dài hơn `NGHI_PHUT` nghĩa là họ đã
 * rời đi và quay lại, nên quãng học đếm lại từ đầu và xóa luôn dấu đã
 * nhắc — quãng mới xứng đáng một lời nhắc mới.
 */
export function chamMot(state: TrangThaiNhacNghi, bayGio: number): TrangThaiNhacNghi {
  const nghiRoi = state.chamCuoi !== null && bayGio - state.chamCuoi > NGHI_PHUT * PHUT
  if (state.batDau === null || nghiRoi) {
    return { batDau: bayGio, chamCuoi: bayGio, daNhacLuc: null }
  }
  return { ...state, chamCuoi: bayGio }
}

/** Quãng học liên tục hiện tại, tính bằng phút (làm tròn xuống). */
export function soPhutDaHoc(state: TrangThaiNhacNghi, bayGio: number): number {
  if (state.batDau === null) return 0
  return Math.max(0, Math.floor((bayGio - state.batDau) / PHUT))
}

/**
 * Đã đến lúc nói chưa?
 *
 * Cố ý KHÔNG tự xét chuyện người học đang bận gì — chỗ nào không nên
 * chen ngang (đang thi) là việc của tầng UI, không phải của lõi.
 */
export function denLucNhac(state: TrangThaiNhacNghi, bayGio: number): boolean {
  if (state.batDau === null) return false
  if (bayGio - state.batDau < HOC_LIEN_TUC_PHUT * PHUT) return false
  if (state.daNhacLuc === null) return true
  return bayGio - state.daNhacLuc >= HOC_LIEN_TUC_PHUT * PHUT
}

/** Đánh dấu vừa nhắc xong — quãng học vẫn chạy tiếp, chỉ lời nhắc im đi. */
export function daNhac(state: TrangThaiNhacNghi, bayGio: number): TrangThaiNhacNghi {
  return { ...state, daNhacLuc: bayGio }
}
