// @vitest-environment jsdom
// Hai màn của cung điện, kiểm bằng đúng đường người học đi.
//
// Điều đáng khóa nhất ở đây là chuyện SƯ PHẠM chứ không phải chuyện
// React: lúc đi lại từ trí nhớ, màn hình chỉ được đưa ra GỢI Ý (chỗ và
// hình), tuyệt đối không lộ sẵn con số. Một lỗi hiển thị kiểu đó biến
// bài retrieval thành bài chép lại mà vẫn "chạy đúng".

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { PalaceTour } from './PalaceTour'
import { PalaceWalk } from './PalaceWalk'
import { PORT_PALACE } from '../../../tests/fixtures/palaceFixture'
import { roomById } from '../../engine/palace'

afterEach(cleanup)

const FLOOR_1 = ['r-http', 'r-https', 'r-dns']

const portsBox = () => screen.getByLabelText('Số cổng')
const serviceBox = () => screen.getByLabelText('Dịch vụ')
const answerButton = () => screen.getByRole('button', { name: 'Trả lời' })

/** Trả lời phòng đang đứng bằng đúng nội dung của nó. */
function answerRoom(roomId: string) {
  const room = roomById(PORT_PALACE, roomId)!
  fireEvent.change(portsBox(), { target: { value: room.keys.join(', ') } })
  fireEvent.change(serviceBox(), { target: { value: room.name } })
  fireEvent.click(answerButton())
}

function answerWrong() {
  fireEvent.change(portsBox(), { target: { value: '1' } })
  fireEvent.change(serviceBox(), { target: { value: 'chưa nhớ ra' } })
  fireEvent.click(answerButton())
}

describe('đi xem: một phòng một màn hình', () => {
  it('mở ra là phòng đầu lộ trình, có đủ số cổng, dịch vụ và câu chuyện', () => {
    render(<PalaceTour palace={PORT_PALACE} roomIds={FLOOR_1} />)
    expect(screen.getByText(new RegExp('Phòng 1/3'))).toBeDefined()
    // Số cổng hiện ở cả thẻ phòng lẫn ô đã lật trên bản đồ — đi xem thì lộ hết là đúng.
    expect(screen.getAllByText('80').length).toBeGreaterThan(0)
    expect(screen.getByText('HTTP')).toBeDefined()
    expect(screen.getByText(/Cửa chính số 80/)).toBeDefined()
  })

  it('đi tuần tự và báo xong ở phòng cuối', () => {
    const onComplete = vi.fn()
    render(<PalaceTour palace={PORT_PALACE} roomIds={FLOOR_1} onComplete={onComplete} />)
    fireEvent.click(screen.getByRole('button', { name: /Sang phòng kế/ }))
    expect(screen.getByText(new RegExp('Phòng 2/3'))).toBeDefined()
    expect(screen.getAllByText('443').length).toBeGreaterThan(0)
    fireEvent.click(screen.getByRole('button', { name: /Sang phòng kế/ }))
    expect(onComplete).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: /Đi hết rồi/ }))
    expect(onComplete).toHaveBeenCalledTimes(1)
  })
})

describe('đi lại từ trí nhớ: gợi ý là chỗ và hình, không phải con số', () => {
  it('KHÔNG lộ số cổng hay tên dịch vụ của phòng đang hỏi', () => {
    render(<PalaceWalk palace={PORT_PALACE} roomIds={FLOOR_1} />)
    expect(screen.queryByText('80')).toBeNull()
    expect(screen.queryByText('HTTP')).toBeNull()
    // Nhưng vẫn nói rõ mình đang đứng ở đâu trong tòa nhà.
    expect(screen.getByText(/Tầng 1, phòng số 1/)).toBeDefined()
  })

  it('câu chuyện gợi nhớ chỉ hiện ở tầng 2, sau hai lần chưa nhớ ra', () => {
    render(<PalaceWalk palace={PORT_PALACE} roomIds={FLOOR_1} />)
    expect(screen.queryByText(/Cửa chính số 80/)).toBeNull()
    answerWrong()
    expect(screen.queryByText(/Cửa chính số 80/)).toBeNull()
    answerWrong()
    expect(screen.getByText(/Cửa chính số 80/)).toBeDefined()
  })

  it('đáp án chỉ hiện ở tầng 3, và vẫn phải tự gõ lại mới đi tiếp', () => {
    render(<PalaceWalk palace={PORT_PALACE} roomIds={FLOOR_1} />)
    answerWrong()
    answerWrong()
    answerWrong()
    expect(screen.getByText(/Phòng này là 80 — HTTP/)).toBeDefined()
    // Vẫn đứng nguyên phòng 1.
    expect(screen.getByText(new RegExp('Phòng 1/3'))).toBeDefined()
    answerRoom('r-http')
    expect(screen.getByText(new RegExp('Phòng 2/3'))).toBeDefined()
  })

  it('nói đúng vế đang hụt thay vì phủ nhận cả câu trả lời', () => {
    render(<PalaceWalk palace={PORT_PALACE} roomIds={FLOOR_1} />)
    fireEvent.change(portsBox(), { target: { value: '80' } })
    fireEvent.change(serviceBox(), { target: { value: 'DNS' } })
    fireEvent.click(answerButton())
    expect(screen.getByText(/việc người ta làm trong phòng/)).toBeDefined()
  })

  it('không bao giờ hiện chữ "SAI" trần trụi (spec 4.4)', () => {
    const { container } = render(<PalaceWalk palace={PORT_PALACE} roomIds={FLOOR_1} />)
    answerWrong()
    expect(container.textContent).not.toMatch(/\bSAI\b/)
  })

  it('đi trọn đoạn thì trao kết quả thô lên tầng gọi', () => {
    const onComplete = vi.fn()
    render(<PalaceWalk palace={PORT_PALACE} roomIds={FLOOR_1} onComplete={onComplete} />)
    for (const roomId of FLOOR_1) answerRoom(roomId)
    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(onComplete.mock.calls[0]![0]).toEqual([
      { roomId: 'r-http', failCount: 0, usedSolution: false },
      { roomId: 'r-https', failCount: 0, usedSolution: false },
      { roomId: 'r-dns', failCount: 0, usedSolution: false },
    ])
    expect(screen.getByText(/nhớ được ngay 3\/3 phòng/)).toBeDefined()
  })

  it('phòng hai cổng: gõ thứ tự nào cũng được', () => {
    const onComplete = vi.fn()
    render(<PalaceWalk palace={PORT_PALACE} roomIds={['r-dhcp']} onComplete={onComplete} />)
    fireEvent.change(portsBox(), { target: { value: '68 và 67' } })
    fireEvent.change(serviceBox(), { target: { value: 'dhcp' } })
    fireEvent.click(answerButton())
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('bản đồ tòa nhà lật ngửa dần theo bước chân', () => {
    const { container } = render(<PalaceWalk palace={PORT_PALACE} roomIds={FLOOR_1} />)
    const cell = (roomId: string) => container.querySelector(`[data-room="${roomId}"]`)
    expect(cell('r-http')?.getAttribute('data-state')).toBe('current')
    expect(cell('r-https')?.getAttribute('data-state')).toBe('pending')
    // Phòng ngoài đoạn đường vẫn được vẽ, chỉ mờ đi.
    expect(cell('r-ssh')?.getAttribute('data-state')).toBe('outside')
    answerRoom('r-http')
    expect(cell('r-http')?.getAttribute('data-state')).toBe('revealed')
    expect(cell('r-https')?.getAttribute('data-state')).toBe('current')
  })
})
