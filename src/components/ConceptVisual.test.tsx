// @vitest-environment jsdom
// Registry hình ↔ nội dung thật.
//
// ConceptVisual có lưới an toàn lúc chạy: visualId lạ rơi về hình thư
// chung nên bài vẫn dạy được. Nhưng lưới đó IM LẶNG — gõ sai một
// visualId trong JSON thì không ai biết, người học chỉ thấy hình chung
// chung ở một khái niệm lẽ ra phải có hình riêng (spec 4.2: mỗi khái
// niệm trọng yếu có 1 hình đại diện riêng, nhất quán toàn app).
// File này biến sự im lặng đó thành test đỏ.

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ConceptVisual, hasVisual } from './ConceptVisual'
import { loadModules } from '../content'

/** Mọi visualId nội dung thật đang tham chiếu, kèm chỗ khai báo để báo lỗi cho đúng. */
function visualRefsInContent(): { visualId: string; where: string }[] {
  const refs: { visualId: string; where: string }[] = []
  for (const mod of loadModules()) {
    for (const lesson of mod.lessons) {
      const [hook, , teach] = lesson.steps
      if (hook.visualId !== undefined) {
        refs.push({ visualId: hook.visualId, where: `${mod.id}/${lesson.id}/hook` })
      }
      teach.screens.forEach((screenDef, i) => {
        refs.push({ visualId: screenDef.visualId, where: `${mod.id}/${lesson.id}/teach[${i}]` })
      })
    }
  }
  return refs
}

describe('ConceptVisual ↔ nội dung thật', () => {
  it('mọi visualId trong nội dung đều có hình riêng (không rơi về hình chung)', () => {
    const missing = visualRefsInContent()
      .filter((r) => !hasVisual(r.visualId))
      .map((r) => `${r.where}: "${r.visualId}"`)
    expect(missing, 'visualId chưa có hình trong REGISTRY của ConceptVisual').toEqual([])
  })

  it('nội dung thật có tham chiếu hình (test trên không rỗng một cách vô nghĩa)', () => {
    expect(visualRefsInContent().length).toBeGreaterThan(0)
  })

  it('visualId lạ vẫn render được hình chung — bài không bao giờ vỡ vì thiếu hình', () => {
    render(<ConceptVisual visualId="vis-khong-ton-tai" title="Hình chung" />)
    expect(screen.getByRole('img', { name: 'Hình chung' })).toBeTruthy()
  })
})

describe('bản đồ khóa học (advance organizer)', () => {
  it('tô sáng đúng số module đang có trong app, không đếm cứng', () => {
    const { container } = render(<ConceptVisual visualId="vis-ban-do-khoa-hoc" title="Bản đồ" />)
    // Ô "đã có nội dung" được tô đặc (fill là biến màu), ô chưa có để rỗng.
    const filled = [...container.querySelectorAll('rect')].filter(
      (r) => r.getAttribute('fill') !== 'none',
    )
    expect(filled).toHaveLength(loadModules().length)
  })

  it('luôn vẽ đủ lưới 21 module của lộ trình (spec v1 mục 3 + spec v2)', () => {
    // Lưới là LỘ TRÌNH, không phải danh sách đã viết xong: 12 module nhập
    // môn (A-C) cộng 9 module trung cấp (D-E). Ô chưa có nội dung để rỗng
    // — bản đồ nói thật cả về phần còn dang dở.
    const { container } = render(<ConceptVisual visualId="vis-ban-do-khoa-hoc" title="Bản đồ" />)
    expect(container.querySelectorAll('rect')).toHaveLength(21)
  })
})
