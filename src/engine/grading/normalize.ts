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
 */
const NEGATIONS = ['không', 'chưa', 'sai']

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
 *   nhận khớp nguyên chuỗi.
 * "portable" không bao giờ khớp "port": so theo TỪ, không theo chuỗi con.
 */
export function typedAnswerMatches(raw: string, accept: readonly string[]): boolean {
  const norm = normalizeAnswer(raw)
  if (accept.some((answer) => lenientEquals(norm, normalizeAnswer(answer)))) return true

  const tokens = tokenize(norm)
  if (tokens.some((t) => NEGATIONS.some((n) => lenientEquals(t, n)))) return false
  return accept.some((answer) => containsPhrase(tokens, tokenize(normalizeAnswer(answer))))
}
