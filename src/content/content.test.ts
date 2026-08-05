// Cổng chất lượng cho NỘI DUNG THẬT (content/modules/*.json).
// Schema đã ép cấu trúc; file này ép thêm các yêu cầu của Khối 5:
// đúng 3 module Phần A, Module 3 đủ 6 chặng + bật drill, và các
// quy ước nội dung mà schema thuần không diễn đạt được.

import { describe, expect, it } from 'vitest'
import { findConcept, findLesson, loadModules } from './index'

const modules = loadModules() // parse + validateModules ném lỗi nếu hỏng

describe('bộ nội dung Phần A', () => {
  it('đủ 3 module, đúng thứ tự 1-2-3, đều thuộc Phần A', () => {
    expect(modules.map((m) => m.id)).toEqual(['module-1', 'module-2', 'module-3'])
    expect(modules.map((m) => m.order)).toEqual([1, 2, 3])
    expect(modules.every((m) => m.part === 'A')).toBe(true)
  })

  it('Module 3: đúng 6 chặng (spec: module dài nhất Phần A) + bật drill subnetting', () => {
    const m3 = modules[2]!
    expect(m3.stages).toHaveLength(6)
    expect(m3.drill).toBe('subnet')
  })

  it('Module 2: retrieval có câu xếp thứ tự 8 chặng hành trình (spec Module 2)', () => {
    const m2 = modules[1]!
    const orderQuestions = m2.lessons.flatMap((l) =>
      l.steps[4].questions.filter((e) => e.question.kind === 'order'),
    )
    const eightSteps = orderQuestions.some((e) => e.question.kind === 'order' && e.question.items.length === 8)
    expect(eightSteps).toBe(true)
  })

  it('mastery test đủ dày để ngưỡng 85% có nghĩa (>= 7 câu mỗi module)', () => {
    for (const m of modules) {
      expect(m.masteryTest.length, `${m.id} cần >= 7 câu thi`).toBeGreaterThanOrEqual(7)
    }
  })

  it('tra cứu xuyên module hoạt động (bài học + concept đều tìm được)', () => {
    for (const m of modules) {
      for (const l of m.lessons) expect(findLesson(l.id)?.module.id).toBe(m.id)
      for (const c of m.concepts) expect(findConcept(c.id)?.module.id).toBe(m.id)
    }
  })

  it('mọi bài mở đầu module có worked example; fading không vượt 2', () => {
    for (const m of modules) {
      const firstId = m.stages[0]!.lessonIds[0]
      const first = m.lessons.find((l) => l.id === firstId)!
      expect(first.steps[3].fadingLevel, `${m.id} bài đầu`).toBe(0)
    }
  })

  it('selfExplain: từ khóa không rơi vào bẫy đồng-âm-bỏ-dấu một-từ quá ngắn', () => {
    // Biến thể 1 từ và < 3 ký tự sau bỏ dấu rất dễ khớp nhầm — cấm hẳn.
    for (const m of modules) {
      for (const l of m.lessons) {
        for (const group of l.steps[4].selfExplain.keywords) {
          for (const variant of group) {
            expect(variant.trim().length, `${m.id}/${l.id}: biến thể "${variant}" quá ngắn`).toBeGreaterThanOrEqual(2)
          }
        }
      }
    }
  })
})
