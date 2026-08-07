// @vitest-environment jsdom
// Bàn PowerShell — kiểm ba lời hứa của UI:
//   1. Mọi việc đều PHẢI GÕ (generation effect) — không nút nào làm hộ;
//      gõ thử miễn phí, bảng mục tiêu chấm sống theo từng lệnh.
//   2. Output máy tiếng Anh render nguyên văn; help/lệnh lạ nói tiếng
//      Việt tử tế (ranh giới chuỗi như terminal Phòng khám).
//   3. "Nộp bài" trao đúng trạng thái phiên để tầng trên chấm hiệu ứng.

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { PsConsole } from './PsConsole'
import { QuestionSchema, type PsQuestion } from '../../engine/contentSchema'
import { gradeQuestion, type QuestionResponse } from '../../engine/grading/gradeQuestion'
import { specTaoMotUser } from '../../../tests/fixtures/psFixture'

afterEach(cleanup)

const PS_Q = QuestionSchema.parse({
  kind: 'ps',
  id: 'ui-ps-1',
  prompt: { vi: 'Tạo tài khoản cho chị Lê Thị Mai vào OU KeToan.' },
  spec: specTaoMotUser(),
}) as PsQuestion

function typeCommand(line: string) {
  fireEvent.change(screen.getByRole('textbox', { name: 'Ô gõ lệnh PowerShell' }), { target: { value: line } })
  fireEvent.click(screen.getByRole('button', { name: 'Chạy' }))
}

describe('terminal PowerShell', () => {
  it('mục tiêu hiện ngay từ đầu ở trạng thái chưa xong', () => {
    render(<PsConsole question={PS_Q} onSubmit={() => {}} />)
    expect(screen.getByText(/Tạo được user "ltmai" nằm đúng OU KeToan/)).toBeTruthy()
    expect(screen.getByText(/\(chưa xong\)/)).toBeTruthy()
  })

  it('Get-Help kể đồ nghề bằng tiếng Việt; cmdlet lạ được đáp tử tế', () => {
    render(<PsConsole question={PS_Q} onSubmit={() => {}} />)
    typeCommand('Get-Help')
    expect(screen.getByText(/tạo user mới/)).toBeTruthy()
    typeCommand('Remove-Item C:\\')
    expect(screen.getByText(/không có cmdlet "Remove-Item"/)).toBeTruthy()
  })

  it('output máy tiếng Anh nguyên văn; lệnh lỗi hiện đúng thông báo lỗi', () => {
    render(<PsConsole question={PS_Q} onSubmit={() => {}} />)
    typeCommand('Get-NetIPAddress')
    expect(screen.getByText(/IPAddress\s*: 192\.168\.20\.5/)).toBeTruthy()
    typeCommand('Get-ADUser -Identity khongco')
    expect(screen.getByText(/Cannot find an object with identity/)).toBeTruthy()
  })

  it('gõ đúng lệnh là mục tiêu chuyển ✓ sống — trước cả khi nộp', () => {
    render(<PsConsole question={PS_Q} onSubmit={() => {}} />)
    typeCommand('New-ADUser -Name "Le Thi Mai" -SamAccountName ltmai -Path "OU=KeToan,DC=noibo,DC=vn"')
    // New-ADUser im lặng — UI nói nhỏ và xúi đi kiểm chứng.
    expect(screen.getByText(/không in gì như PowerShell thật/)).toBeTruthy()
    expect(screen.getByText(/\(xong\)/)).toBeTruthy()
    typeCommand('Get-ADUser -Identity ltmai')
    expect(screen.getByText(/SamAccountName\s*: ltmai/)).toBeTruthy()
  })

  it('Nộp bài trao trạng thái phiên; tầng trên chấm hiệu ứng ra đúng/sai', () => {
    const onSubmit = vi.fn()
    render(<PsConsole question={PS_Q} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))
    const before = onSubmit.mock.calls[0]![0] as QuestionResponse
    expect(gradeQuestion(PS_Q, before)).toBe(false)

    typeCommand('New-ADUser -Name "Le Thi Mai" -SamAccountName ltmai -Path "OU=KeToan,DC=noibo,DC=vn"')
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))
    const after = onSubmit.mock.calls[1]![0] as QuestionResponse
    expect(gradeQuestion(PS_Q, after)).toBe(true)
  })

  it('Làm lại từ đầu trả nguyên thế giới ban đầu — user vừa tạo biến mất', () => {
    render(<PsConsole question={PS_Q} onSubmit={() => {}} />)
    typeCommand('New-ADUser -Name "Le Thi Mai" -SamAccountName ltmai -Path "OU=KeToan,DC=noibo,DC=vn"')
    expect(screen.getByText(/\(xong\)/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Làm lại từ đầu' }))
    expect(screen.getByText(/\(chưa xong\)/)).toBeTruthy()
    expect(screen.queryByText(/không in gì như PowerShell thật/)).toBeNull()
  })

  it('không truyền onSubmit (chế độ xem) thì không có nút nộp', () => {
    render(<PsConsole question={PS_Q} />)
    expect(screen.queryByRole('button', { name: 'Nộp bài' })).toBeNull()
  })
})
