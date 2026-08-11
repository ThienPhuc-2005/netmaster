// Cửa migrate của persist — chuông báo cho hợp đồng dữ liệu người học.
//
// Toàn bộ công sức người học nằm trong MỘT key localStorage. Zustand
// persist khi version lưu ≠ version code mà không có migrate sẽ VỨT
// TRẮNG state cũ. File này đóng băng một payload v1 THẬT
// (tests/fixtures/progressV1.json) và khẳng định:
//   1. Rehydrate payload v1 ra state dùng được, không mất trường nào.
//   2. Payload THIẾU trường (người dùng bản rất cũ) không làm crash —
//      shallow-merge với default đỡ phần thiếu.
// Ai đổi shape state persist mà quên bump version + viết case migrate
// sẽ thấy test này đỏ trước khi người dùng thấy dữ liệu bay màu.

import { beforeEach, describe, expect, it } from 'vitest'
import { PROGRESS_PERSIST_VERSION, useProgress } from './progress'
import { docAnhChup } from './anhChup'
import v1Payload from '../../tests/fixtures/progressV1.json'

const INITIAL = useProgress.getInitialState()

/** Ghi payload vào localStorage rồi ép store rehydrate lại từ đó. */
async function rehydrateFrom(payload: unknown): Promise<void> {
  localStorage.setItem('netmaster-progress', JSON.stringify(payload))
  await useProgress.persist.rehydrate()
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})

describe('persist migrate: hợp đồng payload v1', () => {
  it('payload v1 đóng băng rehydrate ra state đầy đủ, không mất trường', async () => {
    await rehydrateFrom(v1Payload)
    const s = useProgress.getState()

    // Các trường quý nhất — mất là mất sản phẩm.
    expect(s.reviewCards).toHaveLength(2)
    expect(s.reviewCards[0]!.conceptId).toBe('goi-tin')
    expect(s.reviewCards[0]!.intervalIndex).toBe(2)
    expect(s.xpTotal).toBe(32)
    expect(s.streak.current).toBe(3)
    expect(s.streak.freezesLeft).toBe(1)
    expect(s.completedLessons['m1-bai-1']).toBe('2026-07-20')
    expect(s.masteryScores['module-1']).toBeCloseTo(71.4, 5)
    expect(s.lessonRuntimes['m1-bai-2']!.stepIndex).toBe(2)
    expect(s.clinicSolved['m11-b1-pre-ca']).toBe('2026-08-01')
    expect(s.drillHistory).toHaveLength(1)
    expect(s.onboardingDone).toBe(true)

    // Action vẫn chạy được trên state đã rehydrate (không phải object cụt).
    expect(() => useProgress.getState().completeOnboarding()).not.toThrow()
  })

  it('payload v1 THIẾU trường mới → default đỡ, không crash, không undefined', async () => {
    const partial = JSON.parse(JSON.stringify(v1Payload)) as {
      state: Record<string, unknown>
      version: number
    }
    // Giả người dùng bản cũ chưa từng có các trường thêm sau này.
    delete partial.state['clinicSolved']
    delete partial.state['vmLabDone']
    delete partial.state['supportShownAtTotal']
    await rehydrateFrom(partial)
    const s = useProgress.getState()
    expect(s.clinicSolved).toEqual({})
    expect(s.vmLabDone).toEqual({})
    expect(s.supportShownAtTotal).toBeNull()
    // Trường có mặt vẫn nguyên.
    expect(s.xpTotal).toBe(32)
  })

  it('v2 → v3 (bài dở lab/PS): ngăn bài dở mọc ra rỗng, sổ vượt giữ nguyên', async () => {
    // Payload v2 THẬT: v1 đã đi qua bậc học vượt nên có challengeUsed.
    // Bậc mới không được làm mất nó — mỗi bậc migrate chỉ thêm phần của
    // mình rồi chuyền tiếp.
    const v2 = JSON.parse(JSON.stringify(v1Payload)) as { state: Record<string, unknown>; version: number }
    v2.version = 2
    v2.state['challengeUsed'] = { 'module-1': '2026-08-08' }
    await rehydrateFrom(v2)
    const s = useProgress.getState()
    expect(s.practiceDrafts).toEqual({})
    expect(s.challengeUsed).toEqual({ 'module-1': '2026-08-08' })
    expect(s.xpTotal).toBe(32)
    expect(s.reviewCards).toHaveLength(2)
  })

  it('v5 → v6 (ảo giác quen mặt): sổ đếm mọc ra rỗng, phần cũ nguyên vẹn', async () => {
    const v5 = JSON.parse(JSON.stringify(v1Payload)) as { state: Record<string, unknown>; version: number }
    v5.version = 5
    v5.state['disputedAnswers'] = [
      { lessonId: 'm1-bai-1', questionId: 'q1', answer: 'mình nghĩ đúng', at: '2026-08-10' },
    ]
    await rehydrateFrom(v5)
    const s = useProgress.getState()
    // Dữ liệu tự chấm trước đây tan theo phiên, không dựng lại được —
    // để trống là đúng, đoán bừa một con số còn tệ hơn.
    expect(s.aoGiacQuenMat).toEqual({})
    expect(s.disputedAnswers).toHaveLength(1)
    expect(s.xpTotal).toBe(32)
  })

  it('v1 đi trọn chuỗi tới v6: các trường mới mọc ra rỗng, phiên drill cũ được đóng dấu', async () => {
    await rehydrateFrom(v1Payload)
    const s = useProgress.getState()
    expect(s.challengeUsed).toEqual({})
    expect(s.practiceDrafts).toEqual({})
    // Phiên drill ghi trước khi có VLSM đều là drill subnetting — đóng
    // dấu đúng như thế, đừng để chúng thành phiên "không loại" rồi rơi
    // khỏi biểu đồ tiến bộ người học đã xây cả tháng.
    expect(s.drillHistory).toHaveLength(1)
    expect(s.drillHistory[0]).toMatchObject({ mode: 'subnet', correct: 8, total: 10, avgSeconds: 21.5 })
    expect(s.disputedAnswers).toEqual([])
    expect(s.aoGiacQuenMat).toEqual({})
  })

  it('v4 → v5 (nút "mình nghĩ câu này đúng"): sổ góp ý mọc ra rỗng, phần cũ nguyên vẹn', async () => {
    const v4 = JSON.parse(JSON.stringify(v1Payload)) as { state: Record<string, unknown>; version: number }
    v4.version = 4
    v4.state['challengeUsed'] = { 'module-2': '2026-08-09' }
    await rehydrateFrom(v4)
    const s = useProgress.getState()
    expect(s.disputedAnswers).toEqual([])
    // Bậc mới chỉ thêm phần của mình rồi chuyền tiếp — không nuốt gì.
    expect(s.challengeUsed).toEqual({ 'module-2': '2026-08-09' })
    expect(s.xpTotal).toBe(32)
    expect(s.reviewCards).toHaveLength(2)
  })

  it('v3 → v4 (drill VLSM): phiên đã có mode thì migrate KHÔNG đụng vào', async () => {
    const v3 = JSON.parse(JSON.stringify(v1Payload)) as { state: Record<string, unknown>; version: number }
    v3.version = 3
    v3.state['drillHistory'] = [
      { date: '2026-08-02', mode: 'vlsm', correct: 4, total: 5, avgSeconds: 96.2 },
      { date: '2026-08-03', correct: 9, total: 10, avgSeconds: 18 },
    ]
    await rehydrateFrom(v3)
    expect(useProgress.getState().drillHistory.map((d) => d.mode)).toEqual(['vlsm', 'subnet'])
  })

  it('cửa migrate CHỤP ẢNH dữ liệu cũ trước khi sửa (F3)', async () => {
    // Đường lùi cho đúng cái tình huống file này canh: bậc migrate viết
    // sai thì bản chụp v1 nguyên vẹn vẫn nằm đó, lùi về được.
    await rehydrateFrom(v1Payload)
    const anh = docAnhChup()
    expect(anh).toHaveLength(1)
    expect(anh[0]!.lyDo).toBe('truoc-nang-cap')
    expect(anh[0]!.version).toBe(1)
    const cu = JSON.parse(anh[0]!.duLieu) as { version: number; state: { xpTotal: number } }
    expect(cu.version).toBe(1)
    expect(cu.state.xpTotal).toBe(32)
  })

  it('rehydrate đúng version hiện tại thì KHÔNG chụp bản trước-nâng-cấp', async () => {
    const hienTai = JSON.parse(JSON.stringify(v1Payload)) as { state: Record<string, unknown>; version: number }
    hienTai.version = PROGRESS_PERSIST_VERSION
    await rehydrateFrom(hienTai)
    expect(docAnhChup().filter((a) => a.lyDo === 'truoc-nang-cap')).toEqual([])
  })

  it('v1 → v2 (học vượt): sổ lượt thi vượt mọc ra rỗng, phần còn lại nguyên', async () => {
    // Người học cũ chưa từng có `challengeUsed`. Migrate phải cấp sổ
    // RỖNG — tức là ai đang học dở vẫn còn nguyên một lượt thi vượt cho
    // module đang mở, chứ không phải bị coi như đã dùng.
    await rehydrateFrom(v1Payload)
    const s = useProgress.getState()
    expect(s.challengeUsed).toEqual({})
    expect(s.xpTotal).toBe(32)
    expect(s.masteryScores['module-1']).toBeCloseTo(71.4, 5)
  })
})
