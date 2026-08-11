// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { StageStrip } from './StageStrip'
import type { StageProgressItem } from '../engine/contentPure'
import { loadModules } from '../content'

afterEach(cleanup)

const STAGES: StageProgressItem[] = [
  { id: 'c1', title: { vi: 'Chặng 1: Cắt đất trên giấy' }, state: 'done' },
  { id: 'c2', title: { vi: 'Chặng 2: Nối dây, dạy đường' }, state: 'current' },
  { id: 'c3', title: { vi: 'Chặng 3: Luật chặn đúng người' }, state: 'pending' },
]

describe('StageStrip — dải công trường (H4)', () => {
  it('in đủ tên ba chặng', () => {
    const { container } = render(<StageStrip stages={STAGES} label="Công trường" />)
    expect(container.textContent).toContain('Chặng 1: Cắt đất trên giấy')
    expect(container.textContent).toContain('Chặng 2: Nối dây, dạy đường')
    expect(container.textContent).toContain('Chặng 3: Luật chặn đúng người')
  })

  it('trạng thái nói bằng CHỮ chứ không chỉ bằng hình tròn', () => {
    const { container } = render(<StageStrip stages={STAGES} label="Công trường" />)
    expect(container.textContent).toContain('Đã xong')
    expect(container.textContent).toContain('Đang làm')
    expect(container.textContent).toContain('Chưa tới')
  })

  it('đúng một chặng mang aria-current="step" và danh sách có nhãn', () => {
    const { container } = render(<StageStrip stages={STAGES} label="Công trường" />)
    expect(container.querySelectorAll('[aria-current="step"]')).toHaveLength(1)
    expect(container.querySelector('ol')?.getAttribute('aria-label')).toBe('Công trường')
  })

  it('màn hẹp giấu tên chặng KHÁC, tên chặng đang làm luôn nhìn thấy', () => {
    const { container } = render(<StageStrip stages={STAGES} label="Công trường" />)
    const spans = [...container.querySelectorAll('span')]
    const nameOf = (text: string) => spans.find((s) => s.textContent === text)!
    expect(nameOf('Chặng 2: Nối dây, dạy đường').className).not.toContain('sr-only')
    // Giấu bằng sr-only chứ không phải `hidden`: tên vẫn nằm trong cây
    // đọc màn hình, chỉ khuất mắt trên màn hẹp.
    for (const other of ['Chặng 1: Cắt đất trên giấy', 'Chặng 3: Luật chặn đúng người']) {
      expect(nameOf(other).className).toContain('sr-only sm:not-sr-only')
      expect(nameOf(other).className).not.toContain('hidden')
    }
  })

  it('chặng chưa tới KHÔNG bị hạ opacity (rớt AA) — chỉ đổi màu chữ', () => {
    const { container } = render(<StageStrip stages={STAGES} label="Công trường" />)
    const html = container.innerHTML
    expect(html).not.toMatch(/opacity-\d/)
    expect(html).toContain('text-ink-muted')
  })
})

describe('cờ stageProgress trong nội dung thật', () => {
  it('chỉ capstone M21 bật dải công trường', () => {
    const on = loadModules().filter((m) => m.stageProgress === true)
    expect(on.map((m) => m.id)).toEqual(['module-21'])
  })
})
