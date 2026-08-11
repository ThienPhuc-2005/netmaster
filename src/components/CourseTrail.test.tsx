// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { CourseTrail } from './CourseTrail'
import { loadModules } from '../content'

afterEach(cleanup)

const MODULES = loadModules()

function trail(passedIds: string[], currentId: string | null = null) {
  return render(<CourseTrail modules={MODULES} passed={new Set(passedIds)} currentId={currentId} />).container
}

describe('CourseTrail — bản đồ đường đi (B1)', () => {
  it('vẽ đúng một ô cho mỗi chủ đề đã có nội dung', () => {
    const container = trail([])
    expect(container.querySelectorAll('span[title]')).toHaveLength(MODULES.length)
  })

  it('ô đã đậu được TÔ RUỘT, ô chưa đậu để trong suốt', () => {
    const container = trail([MODULES[0]!.id])
    const cells = [...container.querySelectorAll<HTMLElement>('span[title]')]
    expect(cells[0]!.style.background).toContain('--trail-')
    expect(cells[1]!.style.background).toBe('transparent')
  })

  it('càng đi xa ruột càng ấm — ô đầu và ô cuối khác nấc', () => {
    const first = MODULES[0]!.id
    const last = MODULES[MODULES.length - 1]!.id
    const cells = [...trail([first, last]).querySelectorAll<HTMLElement>('span[title]')]
    expect(cells[0]!.style.background).toContain('--trail-1')
    expect(cells[cells.length - 1]!.style.background).toContain('--trail-5')
  })

  it('ô đang học dày viền và ăn tông của Phần nó', () => {
    const target = MODULES[3]!
    const cells = [...trail([], target.id).querySelectorAll<HTMLElement>('span[title]')]
    const cell = cells[3]!
    expect(cell.style.borderWidth).toBe('2px')
    expect(cell.style.borderColor).toContain(`--part-${target.part.toLowerCase()}`)
  })

  it('cả dải là MỘT tấm hình có lời đọc kèm số, ô con không đọc lên', () => {
    const container = trail([MODULES[0]!.id, MODULES[1]!.id])
    const img = container.querySelector('[role="img"]')
    expect(img?.getAttribute('aria-label')).toBe(`Bản đồ đường đi: đã đậu 2 trên ${MODULES.length} chủ đề`)
    for (const cell of container.querySelectorAll('span[title]')) {
      expect(cell.getAttribute('aria-hidden')).toBe('true')
    }
  })

  it('chưa nạp được chủ đề nào thì không vẽ gì', () => {
    const { container } = render(<CourseTrail modules={[]} passed={new Set()} currentId={null} />)
    expect(container.firstChild).toBeNull()
  })
})
