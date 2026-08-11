import { describe, expect, it } from 'vitest'
import { stageProgress } from './contentPure'
import type { Module } from './contentSchema'

const MOD: Pick<Module, 'stages'> = {
  stages: [
    { id: 'c1', title: { vi: 'Chặng 1: Cắt đất trên giấy' }, lessonIds: ['b1'] },
    { id: 'c2', title: { vi: 'Chặng 2: Nối dây, dạy đường' }, lessonIds: ['b2'] },
    { id: 'c3', title: { vi: 'Chặng 3: Luật chặn đúng người' }, lessonIds: ['b3'] },
    { id: 'c4', title: { vi: 'Tổng duyệt trước bàn giao' }, lessonIds: ['b4'] },
  ],
}

const doneSet = (...ids: string[]) => (id: string) => ids.includes(id)

describe('stageProgress — dải công trường trong bài (H4)', () => {
  it('chặng chứa bài đang mở là "current", phía sau "done", phía trước "pending"', () => {
    const items = stageProgress(MOD, 'b2', doneSet('b1'))
    expect(items.map((s) => s.state)).toEqual(['done', 'current', 'pending', 'pending'])
    expect(items[1]?.title.vi).toBe('Chặng 2: Nối dây, dạy đường')
  })

  it('học lại bài đã xong thì chặng ĐANG LÀM lùi về đúng chỗ đang đứng', () => {
    // Cả 4 bài đã xong, người học mở lại bài 1: công trường phải chỉ về
    // chặng 1, không được nhảy tới chặng cuối chỉ vì mọi bài đều done.
    const items = stageProgress(MOD, 'b1', doneSet('b1', 'b2', 'b3', 'b4'))
    expect(items.map((s) => s.state)).toEqual(['current', 'done', 'done', 'done'])
  })

  it('đúng MỘT chặng mang trạng thái current', () => {
    const items = stageProgress(MOD, 'b3', doneSet('b1', 'b2'))
    expect(items.filter((s) => s.state === 'current')).toHaveLength(1)
  })

  it('chặng nhiều bài chỉ "done" khi mọi bài trong chặng đã xong', () => {
    const gộp: Pick<Module, 'stages'> = {
      stages: [
        { id: 'c1', title: { vi: 'Chặng gộp' }, lessonIds: ['b1', 'b2'] },
        { id: 'c2', title: { vi: 'Chặng sau' }, lessonIds: ['b3'] },
      ],
    }
    expect(stageProgress(gộp, 'b3', doneSet('b1')).map((s) => s.state)).toEqual(['pending', 'current'])
    expect(stageProgress(gộp, 'b3', doneSet('b1', 'b2')).map((s) => s.state)).toEqual(['done', 'current'])
  })

  it('không có nấc "khóa" — mọi chặng chỉ nhận 3 trạng thái đã khai', () => {
    const states = new Set(stageProgress(MOD, 'b2', doneSet('b1')).map((s) => s.state))
    for (const s of states) expect(['done', 'current', 'pending']).toContain(s)
  })
})
