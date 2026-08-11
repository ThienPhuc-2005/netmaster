// @vitest-environment jsdom
// Nơi DUY NHẤT nối bài dở với store — và cái ranh giới quan trọng nhất
// của nó: BÀI HỌC lưu bài dở, BÀI THI thì không.
//
// Vì sao ranh giới đó đáng một file test riêng: `draftKey` là một prop
// tùy chọn, ai đó "tiện tay" truyền nó ở ModuleTestPage cho đồng bộ là
// mở đường mang đề thi về nhà làm dần — sơ đồ lắp dở của câu lab trong
// đề thi sẽ chờ sẵn ở lượt thi sau. Test này đứng gác chỗ đó.

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { QuestionInput } from './QuestionInput'
import { QuestionSchema, type Question } from '../engine/contentSchema'
import { practiceDraftKey, useProgress } from '../store/progress'
import { vlanRepairLab } from '../../tests/fixtures/labFixture'

const INITIAL = useProgress.getInitialState()

const LAB_Q = QuestionSchema.parse({
  kind: 'lab',
  id: 'ui-draft-lab',
  prompt: { vi: 'Tách máy khách ra khỏi hai máy nội bộ.' },
  spec: vlanRepairLab(),
}) as Question

const KEY = practiceDraftKey('bai-thu', 'ui-draft-lab')

// Trần thời gian của CẢ CÂU TEST phải rộng hơn quãng chờ chunk phòng lab
// bên trong (5s), không thì câu test chết trước khi quãng chờ ấy kịp hết
// hạn — máy bận là đỏ, mà đỏ vì hết giờ chứ không vì hỏng gì.
const CHO_TOI_DA = 20_000

/** Một thao tác thật trên mặt bàn: đổi VLAN cổng p2 của Switch-1. */
async function changeVlan() {
  // Phòng lab nạp LƯỜI (lazy) — chờ rộng tay để lượt chạy cả bộ test,
  // lúc máy đang bận, không thua vì hết giờ chờ chunk.
  const device = await screen.findByRole('button', { name: /^Switch-1, / }, { timeout: 5000 })
  fireEvent.click(device)
  const group = screen.getByRole('radiogroup', { name: 'VLAN của cổng p2' })
  fireEvent.click(within(group).getByRole('radio', { name: 'VLAN 10' }))
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})
afterEach(cleanup)

describe('bài dở đi qua QuestionInput', () => {
  it('CÓ draftKey (bài học): thao tác trên sơ đồ được lưu lại', async () => {
    render(<QuestionInput question={LAB_Q} draftKey={KEY} onSubmit={() => {}} />)
    await changeVlan()
    const draft = useProgress.getState().practiceDrafts[KEY]
    expect(draft?.kind).toBe('lab')
  }, CHO_TOI_DA)

  it('KHÔNG draftKey (bài thi): không một bài dở nào được ghi', async () => {
    render(<QuestionInput question={LAB_Q} onSubmit={() => {}} />)
    await changeVlan()
    expect(useProgress.getState().practiceDrafts).toEqual({})
  }, CHO_TOI_DA)

  it('có bài dở sẵn thì mở thẳng vào sơ đồ đang lắp dở', async () => {
    render(<QuestionInput question={LAB_Q} draftKey={KEY} onSubmit={() => {}} />)
    await changeVlan()
    cleanup()

    // Mở lại y như lần sau vào bài: mục tiêu đã xanh sẵn nhờ bài dở.
    render(<QuestionInput question={LAB_Q} draftKey={KEY} onSubmit={() => {}} />)
    await screen.findByRole('button', { name: /^Switch-1, / }, { timeout: 5000 })
    expect(screen.queryAllByText(/\(chưa xong\)/)).toHaveLength(0)
  }, CHO_TOI_DA)
})
