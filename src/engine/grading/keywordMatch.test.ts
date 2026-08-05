import { describe, expect, it } from 'vitest'
import { KEYWORD_PASS_RATIO, matchKeywords } from './keywordMatch'

describe('matchKeywords', () => {
  it('exports the agreed default threshold', () => {
    expect(KEYWORD_PASS_RATIO).toBe(0.6)
  })

  // Bug thật do người dùng phát hiện khi test bài 1: "do bảo mật" từng
  // được chạm nhóm keyword ["gửi lại","thất lạc","mất"] vì bỏ dấu xong
  // "mật" ≡ "mất". Người gõ CÓ dấu thì phải so CÓ dấu — câu này không
  // chứa ý nào và không bao giờ được đạt.
  it('ghim bug "do bảo mật": không khớp nhóm nào, không bao giờ passed', () => {
    const groups = [
      ['chia nhỏ', 'nhiều gói', 'tách'],
      ['gửi lại', 'thất lạc', 'mất'],
    ]
    const m = matchKeywords('do bảo mật', groups)
    expect(m.matchedGroups).toEqual([])
    expect(m.missedGroups).toEqual([0, 1])
    expect(m.passed).toBe(false)
  })

  it('hai từ CÓ dấu chỉ trùng nhau sau khi bỏ dấu là hai từ KHÁC nhau', () => {
    expect(matchKeywords('dữ liệu bị mật', [['mất']]).matchedGroups).toEqual([])
    expect(matchKeywords('dữ liệu bị mất', [['mất']]).matchedGroups).toEqual([0])
    // Người học gõ không dấu vẫn được nhân nhượng ("mat" chạm "mất")
    expect(matchKeywords('du lieu bi mat', [['mất']]).matchedGroups).toEqual([0])
  })

  it('matches variants with and without diacritics, both directions', () => {
    const groups = [['địa chỉ', 'address']]
    // Người học gõ có dấu
    expect(matchKeywords('mỗi máy cần một địa chỉ riêng', groups).matchedGroups).toEqual([0])
    // Người học gõ không dấu vẫn khớp biến thể có dấu
    expect(matchKeywords('moi may can mot dia chi rieng', groups).matchedGroups).toEqual([0])
    // Biến thể tiếng Anh trong cùng nhóm
    expect(matchKeywords('the address of the machine', groups).matchedGroups).toEqual([0])
    // Gõ hoa vẫn khớp (fold có lowercase)
    expect(matchKeywords('ĐỊA CHỈ IP', groups).matchedGroups).toEqual([0])
  })

  it('matches on word boundaries only: "port" must not match inside "portable"', () => {
    const groups = [['port']]
    expect(matchKeywords('máy này rất portable', groups).matchedGroups).toEqual([])
    expect(matchKeywords('mở port 80', groups).matchedGroups).toEqual([0]) // giữa câu
    expect(matchKeywords('port là số căn hộ', groups).matchedGroups).toEqual([0]) // đầu chuỗi
    expect(matchKeywords('phải đúng port', groups).matchedGroups).toEqual([0]) // cuối chuỗi
    expect(matchKeywords('(port)', groups).matchedGroups).toEqual([0]) // ranh giới là dấu câu
  })

  it('matches multi-word variants only as consecutive phrases', () => {
    const groups = [['địa chỉ ip']]
    expect(matchKeywords('cần địa chỉ IP để gửi gói tin', groups).passed).toBe(true)
    expect(matchKeywords('can   dia chi ip de gui', groups).passed).toBe(true)
    // Đủ các từ nhưng không liền nhau → không khớp
    expect(matchKeywords('địa chỉ của giao thức ip', groups).passed).toBe(false)
  })

  it('passes at exactly the 0.6 threshold: 3 of 5 groups pass, 2 of 5 fail', () => {
    const groups = [['một'], ['hai'], ['ba'], ['bốn'], ['năm']]

    const three = matchKeywords('một hai ba', groups)
    expect(three.total).toBe(5)
    expect(three.matchedGroups).toEqual([0, 1, 2])
    expect(three.missedGroups).toEqual([3, 4])
    expect(three.ratio).toBe(0.6)
    expect(three.passed).toBe(true)

    const two = matchKeywords('một hai', groups)
    expect(two.ratio).toBe(0.4)
    expect(two.passed).toBe(false)
    expect(two.missedGroups).toEqual([2, 3, 4])
  })

  it('reports missed group indices for tier-2 hints', () => {
    const groups = [['nat'], ['private', 'riêng'], ['public', 'công cộng']]
    const res = matchKeywords('NAT đổi địa chỉ riêng', groups)
    expect(res.matchedGroups).toEqual([0, 1])
    expect(res.missedGroups).toEqual([2])
    expect(res.passed).toBe(true) // 2/3 >= 0.6
  })

  it('honors a custom passRatio', () => {
    const groups = [['gateway'], ['router']]
    expect(matchKeywords('đi qua gateway', groups, 1).passed).toBe(false) // 1/2 < 1
    expect(matchKeywords('đi qua gateway', groups, 0.5).passed).toBe(true) // 1/2 >= 0.5
  })

  it('treats regex metacharacters in variants literally, without crashing', () => {
    const ipGroups = [['192.168.1.1']]
    expect(matchKeywords('địa chỉ 192.168.1.1 là private', ipGroups).passed).toBe(true)
    // Dấu chấm KHÔNG được hiểu là wildcard: nếu không escape thì chuỗi
    // dưới đây sẽ khớp nhầm
    expect(matchKeywords('192a168b1c1', ipGroups).passed).toBe(false)

    const weird = [['c++'], ['(test)'], ['[x]']]
    expect(() => matchKeywords('c++ và (test) [x]', weird)).not.toThrow()
    expect(matchKeywords('c++ và (test) [x]', weird).matchedGroups).toEqual([0, 1, 2])
  })

  it('throws on empty groups (content authoring error)', () => {
    expect(() => matchKeywords('bất kỳ câu nào', [])).toThrow()
  })

  it('throws on a group with no variants', () => {
    expect(() => matchKeywords('bất kỳ câu nào', [['ok'], []])).toThrow()
  })
})
