// Danh mục ca bệnh của tab Phòng khám (Phase 3 hạng mục 9 — quyết định
// đã chốt: "phòng luyện song song, làm lại case tự do").
//
// Ca lấy từ CÁC BÀI HỌC của mọi module (Đoán thử + Thử tay + Nhớ lại) —
// suy từ dữ liệu, không đếm cứng module nào. Ca trong BÀI THI MASTERY
// cố ý KHÔNG đem ra đây: đề thi mà luyện tự do trước được thì thang đo
// 85% của mastery gate (nguyên tắc 2) mất giá trị.

import { loadModules } from '../../content'
import { computeModuleStatuses } from '../../engine/masteryGate'
import type { ClinicQuestion, Lesson, Module } from '../../engine/contentSchema'

export interface ClinicCaseEntry {
  module: Module
  lesson: Lesson
  question: ClinicQuestion
  /** Gợi ý tầng 2 — có khi ca nằm trong Exercise (Thử tay/Nhớ lại). */
  hint?: string
  /** Lời giải tầng 3: solution của Exercise, hoặc explain với ca ở Đoán thử. */
  solution: string
}

/** Mọi ca bệnh luyện được, theo đúng thứ tự chặng/bài của nội dung. */
export function clinicCaseEntries(): ClinicCaseEntry[] {
  const out: ClinicCaseEntry[] = []
  for (const mod of loadModules()) {
    for (const lesson of mod.lessons) {
      for (const q of lesson.steps[1].questions) {
        if (q.kind === 'clinic') {
          out.push({ module: mod, lesson, question: q, solution: q.explain?.vi ?? '' })
        }
      }
      for (const pool of [lesson.steps[3].exercises, lesson.steps[4].questions]) {
        for (const e of pool) {
          if (e.question.kind === 'clinic') {
            out.push({ module: mod, lesson, question: e.question, hint: e.hint.vi, solution: e.solution.vi })
          }
        }
      }
    }
  }
  return out
}

/**
 * Tab Phòng khám mở khi module CHỨA ca bệnh đã mở theo mastery gate
 * (quyết định đã chốt: mở khi Module 11 mở, tức đậu Module 10) — nhưng
 * viết theo dữ liệu: module nào mang ca thì module đó quyết định cổng.
 */
export function clinicTabUnlocked(passedModules: readonly string[]): boolean {
  const withCases = new Set(clinicCaseEntries().map((e) => e.module.id))
  if (withCases.size === 0) return false
  const ids = loadModules().map((m) => m.id)
  const statuses = computeModuleStatuses(ids, new Set(passedModules))
  return [...withCases].some((id) => statuses[id] !== 'locked')
}
