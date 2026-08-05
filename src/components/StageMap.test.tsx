// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { StageMap, type StageItem } from './StageMap'

afterEach(cleanup)

const STAGES: StageItem[] = [
  { id: 's1', title: 'Lá thư đầu tiên', state: 'done' },
  { id: 's2', title: 'Bưu tá lên đường', state: 'active' },
  { id: 's3', title: 'Thư trả lời', state: 'locked' },
]

describe('StageMap — goal gradient (spec 2.4)', () => {
  it('hiện đủ tên chặng và nhãn trạng thái tiếng Việt', () => {
    const { container } = render(<StageMap stages={STAGES} />)
    expect(container.textContent).toContain('Lá thư đầu tiên')
    expect(container.textContent).toContain('Đã xong')
    expect(container.textContent).toContain('Đang học')
    expect(container.textContent).toContain('Chưa mở')
  })

  it('chặng đang học mang aria-current="step" (đúng một chặng)', () => {
    const { container } = render(<StageMap stages={STAGES} />)
    const current = container.querySelectorAll('[aria-current="step"]')
    expect(current).toHaveLength(1)
    expect(current[0]?.textContent).toContain('Bưu tá lên đường')
  })

  it('là danh sách có thứ tự với đủ số chặng', () => {
    const { getByRole } = render(<StageMap stages={STAGES} />)
    expect(getByRole('list').children).toHaveLength(3)
  })
})
