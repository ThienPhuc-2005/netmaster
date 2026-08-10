// Bài dở của phòng lab / terminal PS (hội đồng 07-08, ghế UX #20).
//
// Ba lời hứa được khóa ở đây:
//   1. Lưu rồi mở lại đúng thứ đã lưu (khóa theo bài × câu, không lẫn).
//   2. Lưu bài dở KHÔNG phải một lượt trả lời: không XP, không streak,
//      không ghi answerHistory, không đụng lịch SM-2 (nguyên tắc 5).
//   3. Có TRẦN: ngăn bài dở không phình vô hạn theo số bài đã mở.

import { beforeEach, describe, expect, it } from 'vitest'
import {
  PRACTICE_DRAFT_CAP,
  practiceDraftKey,
  todayIso,
  useProgress,
  type PracticeDraft,
} from './progress'
import { vlanRepairLab } from '../../tests/fixtures/labFixture'

const INITIAL = useProgress.getInitialState()

function labDraft(): PracticeDraft {
  return { kind: 'lab', topology: vlanRepairLab().initial, layout: {}, savedAt: todayIso() }
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})

describe('bài dở: lưu, mở lại, bỏ đi', () => {
  it('lưu rồi đọc lại đúng ảnh chụp, khóa theo bài × câu', () => {
    const key = practiceDraftKey('m4-bai-4', 'm4-b4-lab')
    const other = practiceDraftKey('m4-bai-2', 'm4-b4-lab')
    expect(key).not.toBe(other)

    useProgress.getState().savePracticeDraft(key, labDraft())
    const saved = useProgress.getState().practiceDrafts[key]
    expect(saved?.kind).toBe('lab')
    expect(useProgress.getState().practiceDrafts[other], 'bài khác không được dính bài dở').toBeUndefined()
  })

  it('bỏ bài dở: xóa đúng một khóa, không đụng khóa khác', () => {
    const a = practiceDraftKey('m4-bai-4', 'q-a')
    const b = practiceDraftKey('m4-bai-4', 'q-b')
    useProgress.getState().savePracticeDraft(a, labDraft())
    useProgress.getState().savePracticeDraft(b, labDraft())
    useProgress.getState().clearPracticeDraft(a)
    expect(useProgress.getState().practiceDrafts[a]).toBeUndefined()
    expect(useProgress.getState().practiceDrafts[b]).toBeDefined()
  })

  it('bỏ một khóa không tồn tại: im lặng, không ném', () => {
    expect(() => useProgress.getState().clearPracticeDraft('không-có')).not.toThrow()
  })

  it('lưu bài dở KHÔNG phải một lượt trả lời — không XP, không streak, không lịch sử', () => {
    // Đây là hàng rào nguyên tắc 5 ở đúng chỗ dễ thủng nhất: lưu tự động
    // chạy rất nhiều lần, cộng điểm ở đây là phát XP cho việc kéo thả.
    for (let i = 0; i < 5; i++) {
      useProgress.getState().savePracticeDraft(practiceDraftKey('bai', `q-${i}`), labDraft())
    }
    const s = useProgress.getState()
    expect(s.xpTotal).toBe(0)
    expect(s.streak.current).toBe(INITIAL.streak.current)
    expect(s.answerHistory).toHaveLength(0)
    expect(s.answerTotal).toBe(0)
    expect(s.reviewCards).toHaveLength(0)
  })

  it('vượt trần thì bỏ bài dở CŨ NHẤT, giữ đủ trần bài mới nhất', () => {
    for (let i = 0; i < PRACTICE_DRAFT_CAP + 3; i++) {
      useProgress.getState().savePracticeDraft(`k-${i}`, labDraft())
    }
    const drafts = useProgress.getState().practiceDrafts
    expect(Object.keys(drafts)).toHaveLength(PRACTICE_DRAFT_CAP)
    expect(drafts['k-0'], 'bài dở cũ nhất phải bị dọn').toBeUndefined()
    expect(drafts[`k-${PRACTICE_DRAFT_CAP + 2}`], 'bài dở mới nhất phải còn').toBeDefined()
  })

  it('ghi đè bài dở của cùng một câu không làm phình ngăn', () => {
    const key = practiceDraftKey('bai', 'q')
    for (let i = 0; i < 20; i++) useProgress.getState().savePracticeDraft(key, labDraft())
    expect(Object.keys(useProgress.getState().practiceDrafts)).toHaveLength(1)
  })

  it('quay lại làm tiếp bài cũ thì nó thành MỚI NHẤT — LRU theo lần chạm', () => {
    // Bản cũ giữ-nguyên-chỗ-đứng có bẫy ngược đời: bài vừa được đầu tư
    // thêm 20 phút vẫn là bài bị dọn đầu tiên (biên bản trung cấp).
    useProgress.getState().savePracticeDraft('k-old', labDraft())
    for (let i = 0; i < PRACTICE_DRAFT_CAP - 1; i++) {
      useProgress.getState().savePracticeDraft(`k-${i}`, labDraft())
    }
    // Chạm lại bài cũ nhất rồi mở thêm một bài mới cho vượt trần:
    useProgress.getState().savePracticeDraft('k-old', labDraft())
    useProgress.getState().savePracticeDraft('k-new', labDraft())
    const drafts = useProgress.getState().practiceDrafts
    expect(drafts['k-old'], 'bài vừa chạm lại phải còn').toBeDefined()
    expect(drafts['k-0'], 'bài lâu không chạm nhất mới là bài bị dọn').toBeUndefined()
  })
})
