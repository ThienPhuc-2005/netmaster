// Bản duyệt nội dung (REVIEW-NOI-DUNG.md) là thứ người duyệt ĐỌC RỒI KÝ.
// Nên rủi ro lớn nhất của script render không phải là nổ, mà là IM LẶNG
// bỏ sót: thêm một loại câu hỏi mới, quên bổ sung nhánh render, và bản
// duyệt vẫn sinh ra bình thường — chỉ thiếu mất phần đáp án. Bộ test này
// canh đúng chỗ đó.

import { describe, expect, it } from 'vitest'
import { renderQuestion, renderReview } from '../scripts/render-content-review.mjs'
import { makeValidModule } from './fixtures/moduleFixture'
import { vlanRepairLab } from './fixtures/labFixture'

describe('renderQuestion', () => {
  it('câu gõ tay: in danh sách đáp án chấp nhận', () => {
    const lines = renderQuestion({
      kind: 'typed',
      id: 'q1',
      prompt: { vi: 'Phong bì tương ứng với gì?' },
      accept: ['gói tin', 'packet'],
    }).join('\n')
    expect(lines).toContain('Phong bì tương ứng với gì?')
    expect(lines).toContain('gói tin | packet')
  })

  it('trắc nghiệm: đánh dấu đúng lựa chọn đáp án', () => {
    const lines = renderQuestion({
      kind: 'mcq',
      id: 'q2',
      prompt: { vi: 'Chọn câu đúng' },
      choices: [{ vi: 'Sai rồi' }, { vi: 'Đúng đây' }],
      answerIndex: 1,
    }).join('\n')
    expect(lines).toContain('**Đúng đây** ✓')
  })

  it('xếp thứ tự: in đủ các mục theo thứ tự đúng', () => {
    const lines = renderQuestion({
      kind: 'order',
      id: 'q3',
      prompt: { vi: 'Xếp lại' },
      items: [{ vi: 'Bước một' }, { vi: 'Bước hai' }],
    }).join('\n')
    expect(lines).toContain('1. Bước một')
    expect(lines).toContain('2. Bước hai')
  })

  it('kind lạ: NỔ thay vì im lặng bỏ mất phần đáp án', () => {
    // Đây là cổng chặn thật sự của file này: thêm kind mới vào schema mà
    // quên sửa script thì test đỏ ngay, không đợi tới lúc người duyệt
    // đọc phải một bản review thiếu dữ liệu.
    expect(() =>
      renderQuestion({ kind: 'ket-noi-cap-doi', id: 'q4', prompt: { vi: 'Ghép cặp' } }),
    ).toThrow(/kind "ket-noi-cap-doi"/)
  })

  it('bài lab: in đủ sơ đồ, mục tiêu, quyền thao tác và lời giải mẫu', () => {
    const lines = renderQuestion({
      kind: 'lab',
      id: 'q-lab',
      prompt: { vi: 'Sửa mạng hỏng giúp mình' },
      spec: vlanRepairLab(),
    }).join('\n')

    expect(lines).toContain('phòng lab')
    // Sơ đồ phải đọc được thành chữ: người duyệt không mở nổi JSON topology.
    expect(lines).toContain('VLAN 10')
    expect(lines).toMatch(/dây: .*Switch-1/)
    expect(lines).toContain('PHẢI gọi được')
    expect(lines).toContain('phải KHÔNG gọi được')
    expect(lines).toContain('đổi VLAN')
    expect(lines).toContain('Lời giải mẫu')
  })
})

describe('renderReview', () => {
  const modA = makeValidModule()
  const modB = { ...makeValidModule(), id: 'module-9', order: 9, part: 'C' as const }

  it('tiêu đề suy từ dữ liệu, không đếm cứng số module', () => {
    const one = renderReview([modA], ['module-01.json'])
    expect(one.split('\n')[0]).toBe('# REVIEW NỘI DUNG — Module 1 (Phần A)')

    const two = renderReview([modA, modB], ['module-01.json', 'module-09.json'])
    expect(two.split('\n')[0]).toBe('# REVIEW NỘI DUNG — Module 1-9 (Phần A+C)')
  })

  it('render theo thứ tự học (order), không theo thứ tự truyền vào', () => {
    const out = renderReview([modB, modA], ['module-09.json', 'module-01.json'])
    expect(out.indexOf(modA.id)).toBeLessThan(out.indexOf(modB.id))
  })

  it('có đủ 6 bước của mỗi bài trong bản duyệt', () => {
    const out = renderReview([modA], ['module-01.json'])
    for (const heading of ['Khởi động', 'Đoán thử', 'Khám phá', 'Thử tay', 'Nhớ lại', 'Tổng kết']) {
      expect(out, `bản duyệt thiếu bước "${heading}"`).toContain(heading)
    }
  })
})
