// Chuẩn hóa câu trả lời gõ tay trước khi chấm (spec 2.1 bước 4-5).
//
// Triết lý chấm: người học Việt gõ thiếu dấu, thừa khoảng trắng, sai
// hoa/thường là chuyện THƯỜNG — những khác biệt đó không nói lên việc
// hiểu sai kiến thức nên không bao giờ bị tính là trả lời sai.
// Chỉ khác CHỮ mới là khác đáp án.
//
// NHƯNG bỏ dấu là con dao hai lưỡi: "mất" và "mật" bỏ dấu đều thành
// "mat" — nếu nhân nhượng vô điều kiện thì hai từ KHÁC NGHĨA bị chấm
// là một (lỗi thật đã gặp: "bảo mật" khớp nhầm từ khóa "mất").
// Luật vàng: người gõ CÓ dấu thì so CÓ dấu; chỉ so bản bỏ-dấu khi
// phía người học (hoặc chính đáp án soạn sẵn) vốn không có dấu.

/**
 * Unicode NFC -> lowercase -> trim -> collapse whitespace runs into a
 * single space. NFC first so precomposed and combining-mark input
 * (different IMEs produce different byte sequences for the same visible
 * text) become identical before any comparison.
 */
export function normalizeAnswer(raw: string): string {
  return raw.normalize('NFC').toLowerCase().trim().replace(/\s+/g, ' ')
}

/**
 * Bỏ dấu tiếng Việt: NFD tách dấu thành combining mark rồi xóa hết
 * (\p{M}). Riêng đ/Đ không phải "chữ + dấu" mà là một chữ cái riêng
 * (D có nét gạch), NFD không tách được nên thay thủ công đ→d, Đ→d.
 */
export function stripDiacritics(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
}

/** Chuỗi (đã normalize) không mang dấu tiếng Việt nào. */
function isDiacriticFree(normalized: string): boolean {
  return stripDiacritics(normalized) === normalized
}

/**
 * So khớp hai chuỗi đã normalize theo luật vàng ở đầu file:
 * - trùng nguyên văn (giữ dấu) → khớp;
 * - trùng bản bỏ dấu → CHỈ khớp khi một trong hai phía vốn không dấu
 *   (người học gõ kiểu không dấu, hoặc đáp án soạn sẵn dạng không dấu).
 * Hai từ đều CÓ dấu mà chỉ trùng sau khi bỏ dấu ("mật" vs "mất") là
 * hai từ khác nhau — không khớp.
 */
export function lenientEquals(learnerNorm: string, expectedNorm: string): boolean {
  if (learnerNorm === expectedNorm) return true
  if (stripDiacritics(learnerNorm) !== stripDiacritics(expectedNorm)) return false
  return isDiacriticFree(learnerNorm) || isDiacriticFree(expectedNorm)
}

/** Tách thành token từ (Unicode) — dấu câu không chặn việc so khớp. */
function tokenize(normalized: string): string[] {
  return normalized.split(/[^\p{L}\p{N}]+/u).filter((t) => t !== '')
}

/**
 * Người thật trả lời bằng CÂU: "là dns", "địa chỉ ip của máy". Từ phủ
 * định trong câu ("không phải dns") thì ngược nghĩa hoàn toàn — gặp
 * phủ định ở BẤT KỲ đâu, ta tắt chế độ khớp-chứa và chỉ còn nhận khớp
 * nguyên chuỗi (chặt hơn "đứng ngay trước cụm" để bắt cả "không phải
 * LÀ dns" — thà bắt gõ lại còn hơn chấm đúng câu phủ định).
 *
 * MỘT NGOẠI LỆ (lỗi thật chủ dự án báo 08-10): có câu mà ĐÁP ÁN ĐÚNG
 * vốn là một câu phủ định — "ai ra lệnh cho cổng dự phòng mở?" → "Không
 * ai cả". Người học gõ "không ai cả" bị chính lá chắn này chặn, dù cụm
 * "không ai" nằm ngay trong danh sách accept. Nên lá chắn xét theo TỪNG
 * đáp án: nó chỉ tắt khớp-chứa cho những đáp án KHÔNG mang phủ định.
 * Nhờ vậy "không phải stp" vẫn trượt accept "stp" (đúng như cũ), còn
 * "không ai cả" thì khớp accept "không ai".
 */
const NEGATIONS = ['không', 'chưa', 'sai']

/** Chuỗi có mang từ phủ định nào không (so theo TỪ, không theo chuỗi con). */
function hasNegation(tokens: readonly string[]): boolean {
  return tokens.some((t) => NEGATIONS.some((n) => lenientEquals(t, n)))
}

/**
 * Liên từ liệt kê — "1 hay 99", "2 hoặc 3", "chữ o hay chữ c gì đó".
 * Câu nước đôi kể ra NHIỀU ứng viên không phải là câu trả lời: với đáp án
 * ngắn (≤ 2 token) luật khớp-chứa luôn tìm thấy ứng viên đúng trong câu
 * liệt kê, nên gặp kiểu này thì tắt khớp-chứa — cùng nếp đã xử từ phủ
 * định (biên bản hội đồng trung cấp, ghế Đo lường).
 */
const LIST_CONJUNCTIONS = ['hay', 'hoặc']

/** Câu đang LIỆT KÊ nhiều ứng viên ngắn khác nhau (số / một chữ cái). */
function isHedgedListing(rawNorm: string, tokens: readonly string[]): boolean {
  const hasConjunction = tokens.some((t) => LIST_CONJUNCTIONS.some((c) => lenientEquals(t, c)))
  if (!hasConjunction && !rawNorm.includes(',')) return false
  const shortCandidates = new Set(tokens.filter((t) => /^\d+$/.test(t) || t.length === 1))
  return shortCandidates.size >= 2
}

/** Cụm `phrase` xuất hiện trong `tokens` dưới dạng dãy TỪ NGUYÊN liên tiếp. */
function containsPhrase(tokens: readonly string[], phraseTokens: readonly string[]): boolean {
  if (phraseTokens.length === 0) return false
  for (let start = 0; start + phraseTokens.length <= tokens.length; start++) {
    if (phraseTokens.every((pt, i) => lenientEquals(tokens[start + i]!, pt))) return true
  }
  return false
}

/**
 * Câu gõ tay được tính ĐÚNG khi:
 * - khớp nguyên chuỗi với một đáp án chấp nhận (lenientEquals: "goi tin"
 *   khớp "gói tin", nhưng "mật" KHÔNG khớp "mất"); hoặc
 * - CHỨA đáp án dưới dạng cụm từ nguyên vẹn ("là dns", "địa chỉ ip của
 *   máy") — trừ khi câu có từ phủ định (không/chưa/sai), khi đó chỉ còn
 *   nhận khớp nguyên chuỗi; và trừ đáp án NGẮN (≤ 2 token) khi câu đang
 *   liệt kê nước đôi ("1 hay 99" không phải là trả lời "1").
 * "portable" không bao giờ khớp "port": so theo TỪ, không theo chuỗi con.
 */
export function typedAnswerMatches(raw: string, accept: readonly string[]): boolean {
  const norm = normalizeAnswer(raw)
  if (accept.some((answer) => lenientEquals(norm, normalizeAnswer(answer)))) return true

  const tokens = tokenize(norm)
  const learnerNegates = hasNegation(tokens)
  const hedged = isHedgedListing(norm, tokens)
  return accept.some((answer) => {
    const answerTokens = tokenize(normalizeAnswer(answer))
    // Câu học viên có phủ định: chỉ còn cửa với đáp án CŨNG phủ định
    // (xem ghi chú ở NEGATIONS) — đáp án khẳng định thì đóng khớp-chứa.
    if (learnerNegates && !hasNegation(answerTokens)) return false
    if (hedged && answerTokens.length <= 2) return false
    return containsPhrase(tokens, answerTokens)
  })
}
