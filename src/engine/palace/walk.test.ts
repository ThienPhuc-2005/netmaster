import { describe, expect, it } from 'vitest'
import { roomById, roomCountOf, tourRoute } from './palace'
import { GPO_PALACE, PORT_PALACE, clonePalace, correctAnswer } from '../../../tests/fixtures/palaceFixture'

const ROOM_COUNT = roomCountOf(PORT_PALACE)
import {
  currentTourRoom,
  currentWalkRoom,
  gradeRoomAnswer,
  roomsRecalledFirstTry,
  seeNextRoom,
  startTour,
  startWalk,
  submitRoomAnswer,
  walkPassed,
  walkScore,
  walkTier,
  type WalkRuntime,
} from './walk'
const ROUTE = tourRoute(PORT_PALACE)

/** Đi trọn chuyến, trả lời đúng hết — dùng làm nền cho nhiều ca kiểm. */
function walkAllCorrect(): WalkRuntime {
  let rt = startWalk(PORT_PALACE)
  for (const room of ROUTE) {
    rt = submitRoomAnswer(rt, PORT_PALACE, correctAnswer(room)).runtime
  }
  return rt
}

describe('chuyến 1 — đi xem (encoding)', () => {
  it('bắt đầu ở phòng đầu lộ trình', () => {
    expect(currentTourRoom(startTour(PORT_PALACE), PORT_PALACE)?.id).toBe(ROUTE[0]!.id)
  })

  it('đi tuần tự hết 15 phòng rồi mới đánh dấu xong', () => {
    let rt = startTour(PORT_PALACE)
    const visited: string[] = []
    for (let i = 0; i < ROOM_COUNT; i += 1) {
      visited.push(currentTourRoom(rt, PORT_PALACE)!.id)
      rt = seeNextRoom(rt, PORT_PALACE)
    }
    expect(visited).toEqual(ROUTE.map((r) => r.id))
    expect(rt.completed).toBe(true)
  })

  it('đi tiếp khi đã xong thì đứng yên, không lỗi', () => {
    let rt = startTour(PORT_PALACE)
    for (let i = 0; i < ROOM_COUNT + 5; i += 1) rt = seeNextRoom(rt, PORT_PALACE)
    expect(rt.index).toBe(ROOM_COUNT - 1)
    expect(rt.completed).toBe(true)
  })

  it('runtime của cung điện khác thì ném lỗi', () => {
    const other = { ...clonePalace(), id: 'palace-khac' }
    expect(() => currentTourRoom(startTour(PORT_PALACE), other)).toThrow(/không khớp/i)
  })
})

describe('chấm một phòng', () => {
  const https = roomById(PORT_PALACE, 'r-https')!
  const dhcp = roomById(PORT_PALACE, 'r-dhcp')!

  it('nhớ đủ cổng và dịch vụ mới là đúng', () => {
    expect(gradeRoomAnswer(https, { keys: ['443'], name: 'HTTPS' })).toEqual({
      keysCorrect: true,
      nameCorrect: true,
      correct: true,
    })
  })

  it('tách riêng hai vế để lời phản hồi nói đúng chỗ hổng', () => {
    expect(gradeRoomAnswer(https, { keys: ['443'], name: 'HTTP' })).toEqual({
      keysCorrect: true,
      nameCorrect: false,
      correct: false,
    })
    expect(gradeRoomAnswer(https, { keys: ['80'], name: 'HTTPS' })).toEqual({
      keysCorrect: false,
      nameCorrect: true,
      correct: false,
    })
  })

  it('cách gọi khác được chấp nhận, gõ không dấu cũng vậy', () => {
    expect(gradeRoomAnswer(https, { keys: ['443'], name: 'web bao mat' }).correct).toBe(true)
  })

  it('phòng hai cổng: thứ tự nào cũng được, nhưng thiếu một số là chưa đủ', () => {
    expect(gradeRoomAnswer(dhcp, { keys: ['68', '67'], name: 'DHCP' }).keysCorrect).toBe(true)
    expect(gradeRoomAnswer(dhcp, { keys: ['67'], name: 'DHCP' }).keysCorrect).toBe(false)
  })

  it('gõ thừa cổng cũng là chưa đúng', () => {
    expect(gradeRoomAnswer(https, { keys: ['443', '80'], name: 'HTTPS' }).keysCorrect).toBe(false)
  })
})

describe('chuyến 2 — đi lại từ trí nhớ (retrieval)', () => {
  it('đúng thì sang phòng kế tiếp theo đúng lộ trình', () => {
    const rt = startWalk(PORT_PALACE)
    const next = submitRoomAnswer(rt, PORT_PALACE, correctAnswer(ROUTE[0]!))
    expect(next.advanced).toBe(true)
    expect(currentWalkRoom(next.runtime, PORT_PALACE)?.id).toBe(ROUTE[1]!.id)
  })

  it('sai thì đứng nguyên phòng cũ — không có đường đi tiếp bằng cách bỏ qua', () => {
    const rt = startWalk(PORT_PALACE)
    const next = submitRoomAnswer(rt, PORT_PALACE, { keys: ['1'], name: 'sai bét' })
    expect(next.advanced).toBe(false)
    expect(currentWalkRoom(next.runtime, PORT_PALACE)?.id).toBe(ROUTE[0]!.id)
  })

  it('thang 3 tầng chạy y như bài tập trong bài học', () => {
    let rt = startWalk(PORT_PALACE)
    expect(walkTier(rt)).toBe(0)
    const wrong = { keys: ['1'], name: 'sai' }
    const tiers = [1, 2, 3, 3].map(() => {
      const step = submitRoomAnswer(rt, PORT_PALACE, wrong)
      rt = step.runtime
      return step.tier
    })
    expect(tiers).toEqual([1, 2, 3, 3])
  })

  it('xem lời giải rồi vẫn phải TỰ gõ lại mới được đi tiếp', () => {
    let rt = startWalk(PORT_PALACE)
    for (let i = 0; i < 3; i += 1) rt = submitRoomAnswer(rt, PORT_PALACE, { keys: ['1'], name: 'sai' }).runtime
    expect(currentWalkRoom(rt, PORT_PALACE)?.id).toBe(ROUTE[0]!.id)
    const done = submitRoomAnswer(rt, PORT_PALACE, correctAnswer(ROUTE[0]!))
    expect(done.advanced).toBe(true)
    expect(done.runtime.outcomes[0]).toEqual({ roomId: ROUTE[0]!.id, failCount: 3, usedSolution: true })
  })

  it('đi hết 15 phòng thì chuyến đi khép lại', () => {
    const rt = walkAllCorrect()
    expect(rt.completed).toBe(true)
    expect(rt.outcomes).toHaveLength(ROOM_COUNT)
    expect(currentWalkRoom(rt, PORT_PALACE)).toBeNull()
  })

  it('nộp tiếp khi đã xong thì ném lỗi', () => {
    const rt = walkAllCorrect()
    expect(() => submitRoomAnswer(rt, PORT_PALACE, correctAnswer(ROUTE[0]!))).toThrow(/kết thúc/i)
  })
})

describe('đo kết quả chuyến đi', () => {
  it('chỉ phòng nhớ được NGAY LẦN ĐẦU mới tính là nhớ', () => {
    let rt = startWalk(PORT_PALACE)
    // Phòng 1: sai một lần rồi mới đúng. Phòng 2: đúng ngay.
    rt = submitRoomAnswer(rt, PORT_PALACE, { keys: ['1'], name: 'sai' }).runtime
    rt = submitRoomAnswer(rt, PORT_PALACE, correctAnswer(ROUTE[0]!)).runtime
    rt = submitRoomAnswer(rt, PORT_PALACE, correctAnswer(ROUTE[1]!)).runtime
    expect(roomsRecalledFirstTry(rt)).toEqual([ROUTE[1]!.id])
  })

  it('điểm tính trên TỔNG số phòng — bỏ dở giữa chừng không được điểm cao', () => {
    let rt = startWalk(PORT_PALACE)
    for (const room of ROUTE.slice(0, 3)) {
      rt = submitRoomAnswer(rt, PORT_PALACE, correctAnswer(room)).runtime
    }
    expect(walkScore(rt)).toEqual({ recalled: 3, visited: 3, total: ROOM_COUNT, pct: 20 })
  })

  it('đi trọn và nhớ hết là 100%', () => {
    expect(walkScore(walkAllCorrect()).pct).toBe(100)
  })
})

describe('đạt hay chưa khi nộp làm một câu hỏi', () => {
  it('chưa đi trọn thì chưa đạt', () => {
    const rt = submitRoomAnswer(startWalk(PORT_PALACE), PORT_PALACE, correctAnswer(ROUTE[0]!)).runtime
    expect(walkPassed(rt)).toBe(false)
  })

  it('đi trọn và không phải mở đáp án lần nào thì đạt', () => {
    expect(walkPassed(walkAllCorrect())).toBe(true)
  })

  it('quên một nhịp rồi tự nhớ ra vẫn đạt — đó vẫn là nhớ lại thành công', () => {
    const floor1 = ROUTE.slice(0, 3)
    let rt = startWalk(PORT_PALACE, floor1.map((r) => r.id))
    rt = submitRoomAnswer(rt, PORT_PALACE, { keys: ['1'], name: 'sai' }).runtime
    for (const room of floor1) rt = submitRoomAnswer(rt, PORT_PALACE, correctAnswer(room)).runtime
    expect(walkPassed(rt)).toBe(true)
  })

  it('đã phải mở đáp án ở một phòng thì lượt này chưa đạt', () => {
    const floor1 = ROUTE.slice(0, 3)
    let rt = startWalk(PORT_PALACE, floor1.map((r) => r.id))
    for (let i = 0; i < 3; i += 1) rt = submitRoomAnswer(rt, PORT_PALACE, { keys: ['1'], name: 'sai' }).runtime
    for (const room of floor1) rt = submitRoomAnswer(rt, PORT_PALACE, correctAnswer(room)).runtime
    expect(rt.completed).toBe(true)
    expect(walkPassed(rt)).toBe(false)
  })
})

describe('đi một đoạn của tòa nhà', () => {
  const floor2 = ROUTE.slice(3, 6).map((r) => r.id)

  it('chuyến đi chỉ gồm các phòng được chọn', () => {
    const rt = startWalk(PORT_PALACE, floor2)
    expect(rt.route).toEqual(floor2)
    expect(walkScore(rt).total).toBe(3)
  })

  it('đoạn nào cũng đi theo ĐÚNG thứ tự lộ trình gốc, kể cả khi khai lộn xộn', () => {
    const rt = startWalk(PORT_PALACE, [...floor2].reverse())
    expect(rt.route).toEqual(floor2)
  })

  it('đi tour cũng chia đoạn được — không nhồi 15 phòng vào một màn hình', () => {
    const rt = startTour(PORT_PALACE, floor2)
    expect(currentTourRoom(rt, PORT_PALACE)?.id).toBe(floor2[0])
    let walking = rt
    for (let i = 0; i < 3; i += 1) walking = seeNextRoom(walking, PORT_PALACE)
    expect(walking.completed).toBe(true)
  })

  it('phòng không thuộc tòa nhà, danh sách rỗng hoặc trùng đều bị chặn', () => {
    expect(() => startWalk(PORT_PALACE, ['khong-co-phong-nay'])).toThrow(/không thuộc cung điện/)
    expect(() => startWalk(PORT_PALACE, [])).toThrow(/ít nhất một phòng/)
    expect(() => startWalk(PORT_PALACE, ['r-http', 'r-http'])).toThrow(/trùng/)
  })
})

describe('tòa CHỮ (GPO 4×1) — cùng engine, key là từ', () => {
  const local = roomById(GPO_PALACE, 'r-local')!

  it('key chữ nhân nhượng hoa thường, vế phụ nhận cách gọi khác', () => {
    expect(gradeRoomAnswer(local, { keys: ['local'], name: 'chính máy đó' }).correct).toBe(true)
    expect(gradeRoomAnswer(local, { keys: ['Local'], name: 'may cuc bo' }).correct).toBe(true)
    expect(gradeRoomAnswer(local, { keys: ['Site'], name: 'chính máy đó' }).keysCorrect).toBe(false)
  })

  it('đi trọn 4 tầng LSDOU từ trí nhớ', () => {
    let rt = startWalk(GPO_PALACE)
    for (const room of tourRoute(GPO_PALACE)) {
      rt = submitRoomAnswer(rt, GPO_PALACE, correctAnswer(room)).runtime
    }
    expect(rt.completed).toBe(true)
    expect(walkScore(rt)).toEqual({ recalled: 4, visited: 4, total: 4, pct: 100 })
  })
})
