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
import { useProgress } from './progress'
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

  it('v1 đi trọn chuỗi tới v3: cả hai trường mới đều mọc ra rỗng', async () => {
    await rehydrateFrom(v1Payload)
    const s = useProgress.getState()
    expect(s.challengeUsed).toEqual({})
    expect(s.practiceDrafts).toEqual({})
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
