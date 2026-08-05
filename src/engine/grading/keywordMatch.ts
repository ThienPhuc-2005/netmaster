// Chấm câu "Giải thích tại sao bằng lời của bạn" (spec 2.1 bước 5,
// self-explanation) — MVP chấm bằng keyword matching: mỗi Ý cần nêu là
// một NHÓM từ khóa, trong nhóm là các cách nói tương đương của cùng ý
// (["địa chỉ", "address"]); người học chạm 1 biến thể là ý đó được tính.
//
// So khớp theo TỪ với luật dấu của normalize.lenientEquals: người gõ có
// dấu thì so có dấu — "bảo mật" không bao giờ khớp nhầm từ khóa "mất"
// (bug thật do người dùng phát hiện); "goi tin" gõ không dấu vẫn khớp
// "gói tin". Kết quả trả về chỉ số các nhóm THIẾU để UI dựng gợi ý
// tầng 2 — engine chỉ trả dữ liệu ngữ nghĩa, không trả chuỗi hiển thị.

import { lenientEquals, normalizeAnswer } from './normalize'

/**
 * Ngưỡng đạt mặc định: nêu được >= 60% số ý là coi như đã hiểu.
 * Không đòi 100% vì câu trả lời tự do có nhiều cách diễn đạt mà
 * keyword matching MVP không lường hết — thà nhân từ còn hơn chấm
 * oan người đã hiểu bài.
 */
export const KEYWORD_PASS_RATIO = 0.6

export interface KeywordMatchResult {
  /** Chỉ số các nhóm đã khớp. */
  matchedGroups: number[]
  /** Chỉ số các nhóm thiếu — UI dùng để gợi ý tầng 2 ("nhắc thêm về..."). */
  missedGroups: number[]
  /** Tổng số nhóm (số ý cần nêu). */
  total: number
  /** matchedGroups.length / total. */
  ratio: number
  /** ratio >= passRatio. */
  passed: boolean
}

/**
 * Tokenize into word tokens: normalize, then split on anything that is
 * not a letter/digit (Unicode-aware). Punctuation never blocks a match
 * ("nhỏ," ≡ "nhỏ"); symbol-bearing variants like "c++" degrade to their
 * letter core — acceptable for Vietnamese learning content.
 */
function tokenize(s: string): string[] {
  return normalizeAnswer(s)
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t !== '')
}

/**
 * Biến thể (1..n từ) xuất hiện trong câu trả lời khi có một CỬA SỔ n từ
 * LIÊN TIẾP của câu khớp từng-từ-một theo lenientEquals — biến thể nhiều
 * từ ("địa chỉ ip") không được khớp rời rạc.
 */
function variantFoundIn(textTokens: readonly string[], variant: string): boolean {
  const variantTokens = tokenize(variant)
  // Defensive: a variant that tokenizes to nothing can never be a keyword.
  if (variantTokens.length === 0) return false
  for (let start = 0; start + variantTokens.length <= textTokens.length; start++) {
    if (variantTokens.every((vt, i) => lenientEquals(textTokens[start + i]!, vt))) {
      return true
    }
  }
  return false
}

/** Chấm bài giải thích tự do theo nhóm từ khóa. */
export function matchKeywords(
  text: string,
  groups: readonly (readonly string[])[],
  passRatio = KEYWORD_PASS_RATIO,
): KeywordMatchResult {
  // Lỗi soạn bài, không phải lỗi người học. Schema đã chặn từ lúc load
  // nội dung — đây là phòng thủ chiều sâu để không bao giờ "đạt" một
  // bài giải thích không có ý nào để chấm.
  if (groups.length === 0) {
    throw new Error('matchKeywords: groups rỗng — lỗi soạn bài (schema phải chặn từ trước)')
  }
  const textTokens = tokenize(text)
  const matchedGroups: number[] = []
  const missedGroups: number[] = []
  for (const [i, group] of groups.entries()) {
    if (group.length === 0) {
      throw new Error(`matchKeywords: nhóm từ khóa ${i} rỗng — lỗi soạn bài (schema phải chặn từ trước)`)
    }
    if (group.some((variant) => variantFoundIn(textTokens, variant))) {
      matchedGroups.push(i)
    } else {
      missedGroups.push(i)
    }
  }
  const total = groups.length
  const ratio = matchedGroups.length / total
  return { matchedGroups, missedGroups, total, ratio, passed: ratio >= passRatio }
}
