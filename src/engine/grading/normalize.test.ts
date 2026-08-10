import { describe, expect, it } from 'vitest'
import { normalizeAnswer, stripDiacritics, typedAnswerMatches } from './normalize'

describe('normalizeAnswer', () => {
  it('lowercases, trims and collapses inner whitespace', () => {
    expect(normalizeAnswer('  Gói  Tin ')).toBe('gói tin')
  })

  it('collapses tabs and newlines into single spaces', () => {
    expect(normalizeAnswer('gói\t\n tin')).toBe('gói tin')
  })

  it('unifies NFC: precomposed and combining-mark input give the same result', () => {
    // ASCII \u escapes so no editor/formatter can silently re-normalize the fixtures
    const precomposed = 'g\u00F3i tin' // "o" + dau sac DUNG SAN, 1 code point (U+00F3)
    const decomposed = 'go\u0301i tin' // "o" + dau sac ROI, 2 code points (U+006F U+0301)
    expect(precomposed).not.toBe(decomposed) // fixtures really differ before normalizing
    expect(normalizeAnswer(decomposed)).toBe(normalizeAnswer(precomposed))
    expect(normalizeAnswer(decomposed)).toBe('gói tin')
  })

  it('lowercases decomposed uppercase after NFC', () => {
    expect(normalizeAnswer('GÓI TIN')).toBe('gói tin')
  })

  it('handles empty and whitespace-only input', () => {
    expect(normalizeAnswer('')).toBe('')
    expect(normalizeAnswer('   ')).toBe('')
  })
})

describe('stripDiacritics', () => {
  it('removes Vietnamese diacritics', () => {
    expect(stripDiacritics('gói tin đặc biệt')).toBe('goi tin dac biet')
  })

  it('maps đ and Đ to d', () => {
    expect(stripDiacritics('đường đi')).toBe('duong di')
    expect(stripDiacritics('Đèn')).toBe('den')
  })

  it('handles stacked marks (ư, ở, ậ...)', () => {
    expect(stripDiacritics('mượt mà ở đậm')).toBe('muot ma o dam')
  })

  it('leaves plain ASCII untouched', () => {
    expect(stripDiacritics('router port 80')).toBe('router port 80')
  })
})

describe('typedAnswerMatches', () => {
  const accept = ['gói tin']

  it('matches the exact answer with diacritics', () => {
    expect(typedAnswerMatches('gói tin', accept)).toBe(true)
  })

  it('matches an answer typed without diacritics', () => {
    // Người học gõ thiếu dấu không bị chấm sai
    expect(typedAnswerMatches('goi tin', accept)).toBe(true)
  })

  it('matches when the accepted answer itself lacks diacritics', () => {
    expect(typedAnswerMatches('gói tin', ['goi tin'])).toBe(true)
  })

  it('ignores case and extra whitespace', () => {
    expect(typedAnswerMatches('  GÓI   TIN ', accept)).toBe(true)
  })

  it('rejects genuinely different words', () => {
    expect(typedAnswerMatches('gói tinh', accept)).toBe(false)
    expect(typedAnswerMatches('thư', accept)).toBe(false)
  })

  it('accepts any of multiple accepted answers', () => {
    const multi = ['gói tin', 'packet']
    expect(typedAnswerMatches('packet', multi)).toBe(true)
    expect(typedAnswerMatches('Goi tin', multi)).toBe(true)
    expect(typedAnswerMatches('frame', multi)).toBe(false)
  })

  // Cùng lớp bug "do bảo mật": hai từ CÓ dấu chỉ trùng nhau sau khi bỏ
  // dấu là hai từ KHÁC nghĩa — bỏ dấu chỉ nhân nhượng cho người gõ
  // không dấu (hoặc đáp án soạn sẵn không dấu).
  it('không chấm đúng khi cả hai phía có dấu mà chỉ trùng bản bỏ dấu ("mật" vs "mất")', () => {
    expect(typedAnswerMatches('mật', ['mất'])).toBe(false)
    expect(typedAnswerMatches('bảo mật', ['bảo mất'])).toBe(false)
    // người gõ không dấu vẫn được nhân nhượng
    expect(typedAnswerMatches('mat', ['mất'])).toBe(true)
  })

  // Người thật trả lời bằng CÂU — chấp nhận khi câu CHỨA cụm đáp án
  // dưới dạng từ nguyên vẹn (yêu cầu người duyệt nội dung, Khối 5).
  describe('khớp-chứa cụm nguyên từ', () => {
    it('câu chứa đáp án → đúng: "là dns", "địa chỉ ip của máy"', () => {
      expect(typedAnswerMatches('là dns', ['dns'])).toBe(true)
      expect(typedAnswerMatches('địa chỉ ip của máy', ['địa chỉ ip'])).toBe(true)
      expect(typedAnswerMatches('mình nghĩ là gói tin', ['gói tin'])).toBe(true)
      expect(typedAnswerMatches('đó là default gateway đó', ['default gateway'])).toBe(true)
    })

    it('chỉ khớp TỪ nguyên vẹn: "portable" không chứa "port"', () => {
      expect(typedAnswerMatches('máy này rất portable', ['port'])).toBe(false)
      expect(typedAnswerMatches('gateway', ['gate'])).toBe(false)
    })

    it('cụm nhiều từ phải liên tiếp, không khớp rời rạc', () => {
      expect(typedAnswerMatches('địa chỉ của ip', ['địa chỉ ip'])).toBe(false)
    })

    it('câu có từ phủ định (không/chưa/sai) → tắt khớp-chứa, chỉ còn khớp nguyên chuỗi', () => {
      expect(typedAnswerMatches('không phải dns', ['dns'])).toBe(false)
      expect(typedAnswerMatches('không phải là dns', ['dns'])).toBe(false)
      expect(typedAnswerMatches('chưa chắc là gateway', ['gateway'])).toBe(false)
      expect(typedAnswerMatches('sai rồi, là router', ['router'])).toBe(false)
      expect(typedAnswerMatches('khong phai dns', ['dns'])).toBe(false) // phủ định gõ không dấu
    })

    it('khớp nguyên chuỗi vẫn hoạt động như cũ dù chứa từ trùng phủ định trong đáp án', () => {
      // đáp án nguyên chuỗi trùng khít thì nhận thẳng, chưa tới bước chứa-cụm
      expect(typedAnswerMatches('gói tin', ['gói tin'])).toBe(true)
    })

    it('ĐÁP ÁN vốn là câu phủ định thì lá chắn không được chặn nhầm (lỗi thật 08-10)', () => {
      // "Ai ra lệnh cho cổng dự phòng mở?" → đáp án đúng là "Không ai cả".
      // Người học gõ đúng câu đó từng bị chính lá chắn phủ định đánh trượt.
      expect(typedAnswerMatches('Không ai cả', ['không ai', 'stp'])).toBe(true)
      expect(typedAnswerMatches('không ai ra lệnh hết', ['không ai'])).toBe(true)
      // ...nhưng lá chắn vẫn gác đúng chỗ của nó: câu phủ định KHÔNG được
      // khớp một đáp án khẳng định nằm cùng danh sách.
      expect(typedAnswerMatches('không phải stp', ['không ai', 'stp'])).toBe(false)
      expect(typedAnswerMatches('chưa chắc là stp', ['không ai', 'stp'])).toBe(false)
    })
  })
})
