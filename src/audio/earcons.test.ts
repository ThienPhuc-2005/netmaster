// Web Audio không tồn tại trong môi trường test node — playEarcon phải
// im lặng tuyệt đối (không ném lỗi) thay vì làm gãy luồng học.

import { describe, expect, it } from 'vitest'
import { duocVang, playEarcon, TONES_FOR_TEST, type EarconKind } from './earcons'
import { useSettings } from '../store/settings'

const KINDS: EarconKind[] = [
  'correct',
  'incorrect',
  'lessonComplete',
  'stageUp',
  'moduleComplete',
  'graduation',
  'wireClick',
  'packetFly',
]

describe('playEarcon', () => {
  it('không có AudioContext (node) → no-op, không ném lỗi', () => {
    for (const kind of KINDS) expect(() => playEarcon(kind)).not.toThrow()
  })

  it('đã tắt âm trong Settings → no-op', () => {
    useSettings.setState({ mucAm: 'tat' })
    for (const kind of KINDS) expect(() => playEarcon(kind)).not.toThrow()
    useSettings.setState({ mucAm: 'day-du' })
  })
})

// Bốn mốc phải nghe ra bốn thứ khác nhau. Trước khối 21.34 đậu module và
// lên chặng dùng chung một earcon, nên tai không học được thang bậc nào —
// test này chặn việc lặng lẽ gộp lại.
describe('mỗi mốc một tiếng riêng', () => {
  it('không hai earcon nào trùng bộ nốt', () => {
    const vanTay = KINDS.map((k) => JSON.stringify(TONES_FOR_TEST[k]))
    expect(new Set(vanTay).size).toBe(KINDS.length)
  })

  it('thang bậc mốc: tốt nghiệp dài hơn đậu module, đậu module dài hơn mọi tiếng còn lại', () => {
    const ketThuc = (k: EarconKind) => Math.max(...TONES_FOR_TEST[k].map((t) => t.at + t.dur))
    expect(ketThuc('graduation')).toBeGreaterThan(ketThuc('moduleComplete'))
    for (const k of KINDS.filter((x) => x !== 'graduation' && x !== 'moduleComplete')) {
      expect(ketThuc('moduleComplete'), `phải dài hơn ${k}`).toBeGreaterThan(ketThuc(k))
    }
  })

  it('chỉ hai tiếng ĐÓNG LẠI mới có nốt trầm NGÂN DÀI', () => {
    // Thứ làm tai nghe ra một chỗ khép lại là nốt trầm ngân, không phải
    // nốt trầm bất kỳ: "tách" của lab cũng có nốt 180Hz nhưng chỉ 45ms —
    // đó là cú gõ, không phải chân đế. Nên luật đo cả CAO ĐỘ lẫn ĐỘ NGÂN.
    const coChanDe = (k: EarconKind) =>
      TONES_FOR_TEST[k].some((t) => t.freq < 150 && t.dur >= 1)
    expect(KINDS.filter(coChanDe).sort()).toEqual(['graduation', 'moduleComplete'])
  })
})

// Nấc giữa sinh ra để giữ lại đúng những tiếng đáng nghe nhất. Xếp nhầm
// một tiếng thao tác vào nhóm mốc là nấc giữa mất hết ý nghĩa.
describe('ba nấc âm', () => {
  it('nấc "tắt" thì không tiếng nào vang', () => {
    for (const kind of KINDS) expect(duocVang(kind, 'tat'), kind).toBe(false)
  })

  it('nấc "đầy đủ" thì tiếng nào cũng vang', () => {
    for (const kind of KINDS) expect(duocVang(kind, 'day-du'), kind).toBe(true)
  })

  it('nấc "chỉ mốc" giữ đúng bốn tiếng MỐC, im mọi tiếng thao tác', () => {
    const vang = KINDS.filter((k) => duocVang(k, 'chi-moc'))
    expect(vang).toEqual(['lessonComplete', 'stageUp', 'moduleComplete', 'graduation'])
  })

  it('tiếng vang mỗi lần thao tác phải NGẮN — dưới 0,2 giây', () => {
    // Tiếng lặp mấy chục lần một buổi mà dài là thứ khiến người ta tắt cả
    // bộ âm, chứ không phải chỉ tắt riêng nó.
    for (const kind of ['wireClick', 'packetFly', 'correct'] as EarconKind[]) {
      const het = Math.max(...TONES_FOR_TEST[kind].map((t) => t.at + t.dur))
      expect(het, kind).toBeLessThan(0.2)
    }
  })
})
