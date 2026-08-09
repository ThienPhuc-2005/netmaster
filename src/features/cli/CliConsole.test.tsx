// @vitest-environment jsdom
// Console thiết bị — kiểm bốn lời hứa của UI:
//   1. Đi TRỌN lời giải bằng chính bàn phím: hai switch, đủ chế độ, và
//      bảng mục tiêu lật ✓ SỐNG trước cả khi nộp.
//   2. Rút dây console là thao tác BẤM CHỌN (không phải câu lệnh), và nó
//      để lại dấu mốc trong nhật ký + đưa chế độ về `user`.
//   3. Output máy tiếng Anh nguyên văn; `?` và lệnh lạ nói tiếng Việt.
//   4. "Nộp bài" trao đúng trạng thái phiên để tầng trên chấm hiệu ứng.

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { CliConsole } from './CliConsole'
import { QuestionSchema, type CliQuestion } from '../../engine/contentSchema'
import { gradeQuestion, type QuestionResponse } from '../../engine/grading/gradeQuestion'
import { trunkByCli } from '../../../tests/fixtures/cliFixture'

afterEach(cleanup)

const CLI_Q = QuestionSchema.parse({
  kind: 'cli',
  id: 'ui-cli-1',
  prompt: { vi: 'Dựng trunk cho VLAN 10 và 20 đi chung sợi dây giữa hai switch.' },
  spec: trunkByCli(),
}) as CliQuestion

/** Bảng mục tiêu — hỏi trong đúng vùng đó, không lẫn với live region. */
function goals() {
  return within(screen.getByRole('region', { name: 'Mục tiêu của bài' }))
}

function typeCommand(line: string) {
  const box = screen.getByRole('textbox')
  fireEvent.change(box, { target: { value: line } })
  fireEvent.click(screen.getByRole('button', { name: 'Chạy' }))
}

/** Đủ chuỗi lệnh dựng trunk trên switch đang cắm console. */
function buildTrunkHere() {
  typeCommand('enable')
  typeCommand('configure terminal')
  typeCommand('interface p4')
  typeCommand('switchport mode trunk')
  typeCommand('switchport trunk allowed vlan 10,20')
  typeCommand('end')
}

describe('console thiết bị', () => {
  it('mục tiêu hiện ngay từ đầu ở trạng thái chưa xong', () => {
    render(<CliConsole question={CLI_Q} onSubmit={() => {}} />)
    expect(goals().getByText(/Cổng p4 của Switch-1 phải là trunk/)).toBeTruthy()
    expect(goals().getAllByText(/\(chưa xong\)/).length).toBeGreaterThan(0)
  })

  it('dấu ? kể đồ nghề bằng tiếng Việt; lệnh lạ được đáp tử tế', () => {
    render(<CliConsole question={CLI_Q} onSubmit={() => {}} />)
    typeCommand('?')
    expect(screen.getByText(/vào chế độ có quyền/)).toBeTruthy()
    typeCommand('reload')
    expect(screen.getByText(/chưa biết lệnh "reload"/)).toBeTruthy()
  })

  it('output máy tiếng Anh nguyên văn; lệnh sai chế độ hiện đúng lời từ chối', () => {
    render(<CliConsole question={CLI_Q} onSubmit={() => {}} />)
    typeCommand('configure terminal')
    expect(screen.getByText(/% Invalid input detected/)).toBeTruthy()
    typeCommand('show vlan brief')
    expect(screen.getByText(/VLAN0010/)).toBeTruthy()
  })

  it('gõ đúng lệnh là mục tiêu lật ✓ SỐNG — trước cả khi nộp', () => {
    render(<CliConsole question={CLI_Q} onSubmit={() => {}} />)
    buildTrunkHere()
    expect(goals().getByText(/Cổng p4 của Switch-1 phải là trunk/).textContent).toContain('(xong)')
    // Nhưng switch còn lại chưa đụng tới nên bài vẫn chưa xong.
    expect(goals().getByText(/Cổng p4 của Switch-2 phải là trunk/).textContent).toContain('(chưa xong)')
  })

  it('rút dây console: chế độ về user, có dấu mốc trong nhật ký', () => {
    render(<CliConsole question={CLI_Q} onSubmit={() => {}} />)
    typeCommand('enable')
    fireEvent.click(screen.getByRole('button', { name: 'Switch-2' }))
    expect(screen.getByText(/đã cắm dây console sang Switch-2/)).toBeTruthy()
    // Ngồi xuống máy mới là phải enable lại: gõ thẳng configure terminal bị từ chối.
    typeCommand('configure terminal')
    expect(screen.getByText(/% Invalid input detected/)).toBeTruthy()
  })

  it('đi trọn bài bằng bàn phím + một cú bấm chuyển máy là đạt trọn mục tiêu', () => {
    const onSubmit = vi.fn()
    render(<CliConsole question={CLI_Q} onSubmit={onSubmit} />)
    buildTrunkHere()
    fireEvent.click(screen.getByRole('button', { name: 'Switch-2' }))
    buildTrunkHere()
    expect(goals().queryByText(/\(chưa xong\)/)).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))
    const response = onSubmit.mock.calls[0]![0] as QuestionResponse
    expect(gradeQuestion(CLI_Q, response)).toBe(true)
  })

  it('nộp khi chưa làm gì thì tầng trên chấm ra chưa đạt', () => {
    const onSubmit = vi.fn()
    render(<CliConsole question={CLI_Q} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))
    expect(gradeQuestion(CLI_Q, onSubmit.mock.calls[0]![0] as QuestionResponse)).toBe(false)
  })

  it('Làm lại từ đầu trả nguyên sơ đồ đề bài', () => {
    render(<CliConsole question={CLI_Q} onSubmit={() => {}} />)
    buildTrunkHere()
    expect(goals().getByText(/Cổng p4 của Switch-1 phải là trunk/).textContent).toContain('(xong)')
    fireEvent.click(screen.getByRole('button', { name: 'Làm lại từ đầu' }))
    expect(goals().getByText(/Cổng p4 của Switch-1 phải là trunk/).textContent).toContain('(chưa xong)')
  })

  it('không truyền onSubmit (chế độ xem) thì không có nút nộp', () => {
    render(<CliConsole question={CLI_Q} />)
    expect(screen.queryByRole('button', { name: 'Nộp bài' })).toBeNull()
  })
})

describe('bài dở: rời console giữa chừng rồi quay lại (hội đồng #20)', () => {
  it('mỗi lệnh bắn ra ảnh chụp gồm CẢ sơ đồ lẫn nhật ký, kèm dấu nhắc của lúc gõ', () => {
    const onDraftChange = vi.fn()
    render(<CliConsole question={CLI_Q} onDraftChange={onDraftChange} />)
    expect(onDraftChange).not.toHaveBeenCalled()

    typeCommand('enable')
    typeCommand('configure terminal')
    const draft = onDraftChange.mock.calls.at(-1)![0] as { entries: { input: string; prompt: string }[] }
    expect(draft.entries.map((e) => e.input)).toEqual(['enable', 'configure terminal'])
    // Dấu nhắc lưu theo TỪNG DÒNG: chuỗi `>` rồi `#` chính là bằng chứng
    // người học đã đi qua những chế độ nào.
    expect(draft.entries.map((e) => e.prompt)).toEqual(['Switch-1>', 'Switch-1#'])
  })

  it('mở lại bằng ảnh chụp: sơ đồ đã sửa và nhật ký lệnh còn nguyên', () => {
    const onDraftChange = vi.fn()
    const first = render(<CliConsole question={CLI_Q} onDraftChange={onDraftChange} />)
    buildTrunkHere()
    const draft = onDraftChange.mock.calls.at(-1)![0] as never
    first.unmount()

    render(<CliConsole question={CLI_Q} onSubmit={() => {}} initialDraft={draft} />)
    expect(goals().getByText(/Cổng p4 của Switch-1 phải là trunk/).textContent).toContain('(xong)')
    expect(screen.getByText(/switchport trunk allowed vlan 10,20/)).toBeTruthy()
  })

  it('"Làm lại từ đầu" BỎ luôn bài dở, không lưu một sơ đồ trắng', () => {
    const onDraftChange = vi.fn()
    render(<CliConsole question={CLI_Q} onDraftChange={onDraftChange} />)
    typeCommand('enable')
    fireEvent.click(screen.getByRole('button', { name: 'Làm lại từ đầu' }))
    expect(onDraftChange.mock.calls.at(-1)![0]).toBeNull()
  })
})
