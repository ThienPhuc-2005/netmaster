// @vitest-environment jsdom
// Hình isometric sinh từ bản vẽ FossFLOW.
//
// Cái bẫy của mọi thứ SINH TỰ ĐỘNG: sửa bản vẽ rồi quên chạy lại script,
// file sinh ra nằm im với nội dung cũ mà chẳng ai biết — app vẫn chạy,
// test vẫn xanh, chỉ có hình là nói sai. Test này đối chiếu file sinh ra
// với chính bản vẽ nguồn, nên quên chạy script là đỏ.

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { ConceptVisual, hasVisual } from './ConceptVisual'

afterEach(cleanup)

const BAN_VE_DIR = join(process.cwd(), 'content', 'ban-ve')
const files = readdirSync(BAN_VE_DIR).filter((f) => f.endsWith('.json'))

interface BanVe {
  items: { id: string; name: string; description?: string }[]
  views: {
    items: { id: string }[]
    connectors?: { description?: string }[]
  }[]
}

function doc(file: string): BanVe {
  return JSON.parse(readFileSync(join(BAN_VE_DIR, file), 'utf8')) as BanVe
}

describe('hình isometric sinh từ bản vẽ', () => {
  it('có ít nhất một bản vẽ để sinh', () => {
    expect(files.length).toBeGreaterThan(0)
  })

  it.each(files)('%s có visualId trong registry', (file) => {
    expect(hasVisual(`vis-iso-${file.replace(/\.json$/, '')}`)).toBe(true)
  })

  it.each(files)('%s: số nhãn trên hình khớp bản vẽ (quên chạy lại script là đỏ)', (file) => {
    const model = doc(file)
    const view = model.views[0]!
    const soNhanMongDoi =
      view.items.length + (view.connectors ?? []).filter((c) => c.description !== undefined).length

    const { container } = render(
      <ConceptVisual visualId={`vis-iso-${file.replace(/\.json$/, '')}`} title="hình thử" />,
    )
    expect(container.querySelectorAll('text')).toHaveLength(soNhanMongDoi)
  })

  it.each(files)('%s: nhãn nào cũng có đế lót (chữ không bị nét hình cắt qua)', (file) => {
    const { container } = render(
      <ConceptVisual visualId={`vis-iso-${file.replace(/\.json$/, '')}`} title="hình thử" />,
    )
    const texts = container.querySelectorAll('text')
    const plates = container.querySelectorAll('rect')
    expect(plates.length).toBe(texts.length)
  })

  it.each(files)('%s: tên thiết bị trong bản vẽ hiện đúng trên hình', (file) => {
    const model = doc(file)
    const { container } = render(
      <ConceptVisual visualId={`vis-iso-${file.replace(/\.json$/, '')}`} title="hình thử" />,
    )
    for (const vi of model.views[0]!.items) {
      const item = model.items.find((it) => it.id === vi.id)!
      expect(container.textContent).toContain(item.description ?? item.name)
    }
  })

  it.each(files)('%s: dùng chung Frame với hình vẽ tay (viền, nền, nhãn aria)', (file) => {
    const { container } = render(
      <ConceptVisual visualId={`vis-iso-${file.replace(/\.json$/, '')}`} title="hình thử" />,
    )
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('viewBox')).toBe('0 0 220 130')
    expect(svg.getAttribute('aria-label')).toBe('hình thử')
  })

  it.each(files)('%s: không có màu cứng — hình đổi theo nền tối/sáng', (file) => {
    const { container } = render(
      <ConceptVisual visualId={`vis-iso-${file.replace(/\.json$/, '')}`} title="hình thử" />,
    )
    // Nét ăn currentColor, mặt khối ăn biến token. Một mã màu #rrggbb lọt
    // vào là hình đó chết cứng ở một nền.
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,6}\b/)
  })
})
