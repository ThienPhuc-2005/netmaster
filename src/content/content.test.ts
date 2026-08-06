// Cổng chất lượng cho NỘI DUNG THẬT (content/modules/*.json).
// Schema đã ép cấu trúc; file này ép thêm các quy ước nội dung mà schema
// thuần không diễn đạt được.
//
// Các bất biến ở đây SUY TỪ DỮ LIỆU, không đếm cứng số module: thêm một
// module mới vào content/modules/ không được làm đỏ file này vì lý do
// "có thêm module". Chỉ nội dung SAI mới được làm đỏ.

import { describe, expect, it } from 'vitest'
import { findConcept, findLesson, loadModules } from './index'

const modules = loadModules() // parse + validateModules ném lỗi nếu hỏng

/** Tra module theo id — không dùng chỉ số mảng, để thêm module không lệch. */
function moduleById(id: string) {
  const found = modules.find((m) => m.id === id)
  expect(found, `không tìm thấy module "${id}"`).toBeDefined()
  return found!
}

const PART_RANK = { A: 0, B: 1, C: 2 } as const

describe('bộ nội dung', () => {
  it('order liên tục từ 1, không đứt quãng', () => {
    // Đứt quãng nghĩa là thiếu một module giữa chuỗi mở khóa — mastery
    // gate sẽ nối hai module không liền mạch về nội dung (nguyên tắc 2).
    expect(modules.map((m) => m.order)).toEqual(modules.map((_, i) => i + 1))
  })

  it('phần không lùi: A đứng trước B, B trước C', () => {
    const ranks = modules.map((m) => PART_RANK[m.part])
    const sorted = [...ranks].sort((a, b) => a - b)
    expect(ranks, 'thứ tự phần phải là A → B → C theo order').toEqual(sorted)
  })

  it('Module 3: đúng 6 chặng (spec: module dài nhất Phần A) + bật drill subnetting', () => {
    const m3 = moduleById('module-3')
    expect(m3.stages).toHaveLength(6)
    expect(m3.drill).toBe('subnet')
  })

  it('Module 2: retrieval có câu xếp thứ tự 8 chặng hành trình (spec Module 2)', () => {
    const m2 = moduleById('module-2')
    const orderQuestions = m2.lessons.flatMap((l) =>
      l.steps[4].questions.filter((e) => e.question.kind === 'order'),
    )
    const eightSteps = orderQuestions.some((e) => e.question.kind === 'order' && e.question.items.length === 8)
    expect(eightSteps).toBe(true)
  })

  it('Module 4: bài VLAN có lab NGAY Ở BƯỚC ĐOÁN THỬ (productive failure trước lý thuyết)', () => {
    // Spec Module 4 đòi "đưa sơ đồ mạng lỗi và yêu cầu sửa TRƯỚC khi dạy
    // lý thuyết VLAN". Đặt lab ở bước 2 là cách giữ đúng yêu cầu đó mà
    // không phá tuple 6 bước — nếu ai đó dời nó xuống sau bước Dạy thì
    // test này đỏ.
    const m4 = moduleById('module-4')
    const vlanLesson = m4.lessons.find((l) => l.steps[1].questions.some((q) => q.kind === 'lab'))
    expect(vlanLesson, 'Module 4 phải có bài mở đầu bằng lab ở bước Đoán thử').toBeDefined()

    const teachConcepts = vlanLesson!.steps[2].screens.map((s) => s.conceptId)
    expect(teachConcepts, 'lab ở bước 2 phải đứng TRƯỚC màn dạy VLAN').toContain('vlan')
  })

  it('Module 4: bài VLAN có lab đầy đủ ở bước Thử tay, với cặp mục tiêu thông + phải chặn', () => {
    const m4 = moduleById('module-4')
    const labExercises = m4.lessons.flatMap((l) => l.steps[3].exercises.filter((e) => e.question.kind === 'lab'))
    expect(labExercises.length).toBeGreaterThan(0)

    // Ít nhất một lab phải có cặp reach + blocked: thiếu "blocked" thì bài
    // VLAN bị giải bằng cách gộp tất cả vào một VLAN — đúng kết quả, sai bài.
    const hasPairedGoals = labExercises.some((e) => {
      if (e.question.kind !== 'lab') return false
      const pings = e.question.spec.goals.filter((g) => g.kind === 'ping')
      return pings.some((g) => g.expect === 'reach') && pings.some((g) => g.expect === 'blocked')
    })
    expect(hasPairedGoals, 'cần một lab có cả mục tiêu "phải thông" lẫn "phải chặn"').toBe(true)
  })

  it('bài thi Module 4 kết bằng đúng một câu lab (đã chốt)', () => {
    const m4 = moduleById('module-4')
    const labs = m4.masteryTest.filter((q) => q.kind === 'lab')
    expect(labs).toHaveLength(1)
    expect(m4.masteryTest.at(-1)?.kind, 'câu lab phải đặt cuối bài thi').toBe('lab')
  })

  it('mọi bài lab đều cho người học ít nhất một cách thao tác', () => {
    for (const m of modules) {
      const allQuestions = m.lessons.flatMap((l) => [
        ...l.steps[1].questions,
        ...l.steps[3].exercises.map((e) => e.question),
        ...l.steps[4].questions.map((e) => e.question),
      ])
      for (const q of [...allQuestions, ...m.masteryTest]) {
        if (q.kind !== 'lab') continue
        const allow = q.spec.allow
        const canDoSomething =
          allow.addDevices.length > 0 ||
          allow.removeDevices ||
          allow.addLinks ||
          allow.removeLinks ||
          allow.setVlan ||
          allow.setIp ||
          allow.setRoutes
        expect(canDoSomething, `${m.id}: lab "${q.id}" không cho thao tác gì`).toBe(true)
      }
    }
  })

  it('module có cung điện: mọi phòng đều được dẫn đi xem ở một bài nào đó', () => {
    // Schema đã ép "đi xem trước, hỏi sau" và "mỗi phòng dạy một lần",
    // nhưng nó KHÔNG ép phải dạy hết. Một tòa nhà 15 phòng mà chỉ dẫn qua
    // 12 phòng là nợ nội dung: ba phòng kia không bao giờ vào Hộp ôn tập.
    for (const m of modules) {
      if (m.palace === undefined) continue
      const toured = new Set(
        m.lessons.flatMap((l) => l.steps[2].screens.flatMap((s) => s.palaceTour ?? [])),
      )
      const missing = m.palace.rooms.filter((r) => !toured.has(r.id)).map((r) => r.id)
      expect(missing, `${m.id}: phòng chưa được dẫn đi xem`).toEqual([])
    }
  })

  it('module có cung điện: bài thi phủ HẾT các phòng (không phòng nào lọt qua cổng mastery)', () => {
    // Cả module này sinh ra để nhớ 15 con số. Nếu bài thi chỉ hỏi vài
    // phòng thì mastery gate (nguyên tắc 2) chỉ còn là hình thức.
    for (const m of modules) {
      if (m.palace === undefined) continue
      const asked = new Set(
        m.masteryTest.flatMap((q) => (q.kind === 'palace-walk' ? q.rooms : [])),
      )
      const missing = m.palace.rooms.filter((r) => !asked.has(r.id)).map((r) => r.id)
      expect(missing, `${m.id}: phòng không bị hỏi trong bài thi module`).toEqual([])
    }
  })

  it('Module 5: cung điện đúng 15 phòng, gồm đủ 15 port của spec', () => {
    const m5 = moduleById('module-5')
    expect(m5.palace, 'Module 5 phải có cung điện ký ức').toBeDefined()
    const ports = m5.palace!.rooms.flatMap((r) => r.keys.map(Number)).sort((a, b) => a - b)
    expect(ports).toEqual([21, 22, 23, 25, 53, 67, 68, 80, 123, 389, 443, 445, 587, 636, 3306, 3389])
  })

  it('Module 9: cung điện GPO 4 tầng × 1 phòng, keyStyle text, đúng chuỗi LSDOU', () => {
    // Spec Module 9: "tòa nhà 4 tầng Local → Site → Domain → OU, đi từ
    // tầng trệt lên". Thứ tự tầng CHÍNH LÀ thứ tự áp luật — khai sai
    // tầng là dạy sai kiến thức, không chỉ sai hình.
    const m9 = moduleById('module-9')
    expect(m9.palace, 'Module 9 phải có cung điện LSDOU').toBeDefined()
    const palace = m9.palace!
    expect(palace.floors).toBe(4)
    expect(palace.roomsPerFloor).toBe(1)
    expect(palace.keyStyle).toBe('text')
    const keysByFloor = [...palace.rooms].sort((a, b) => a.floor - b.floor).flatMap((r) => r.keys)
    expect(keysByFloor).toEqual(['Local', 'Site', 'Domain', 'OU'])
  })

  it('Module 9: khai checklist lab VMware (spec: app track tiến độ lab)', () => {
    const m9 = moduleById('module-9')
    expect(m9.vmLab, 'Module 9 phải có vmLab').toBeDefined()
    expect(m9.vmLab!.steps.length).toBeGreaterThanOrEqual(3)
  })

  it('Module 9: worked example fading 0→1→2 trên ba bài GPO liên tiếp (spec: đậm nhất app)', () => {
    // Spec: "bài 1 xem cấu hình GPO mẫu đầy đủ → bài 2 điền chỗ trống →
    // bài 3 tự cấu hình từ yêu cầu suông". Ba bài GPO là ba bài dạy các
    // concept m9-gpo → m9-lsdou → (m9-ke-thua + m9-gpresult).
    const m9 = moduleById('module-9')
    const fadingOfLessonTeaching = (conceptId: string) => {
      const lesson = m9.lessons.find((l) => l.steps[2].screens.some((s) => s.conceptId === conceptId))
      expect(lesson, `không bài nào dạy concept "${conceptId}"`).toBeDefined()
      return lesson!.steps[3]
    }
    const gpoLesson = fadingOfLessonTeaching('m9-gpo')
    expect(gpoLesson.fadingLevel, 'bài GPO đầu phải xem mẫu đầy đủ').toBe(0)
    expect(gpoLesson.workedExample, 'bài GPO đầu phải có ví dụ giải sẵn').toBeDefined()
    expect(fadingOfLessonTeaching('m9-lsdou').fadingLevel, 'bài LSDOU là bước điền chỗ trống').toBe(1)
    expect(fadingOfLessonTeaching('m9-gpresult').fadingLevel, 'bài cuối phải tự làm từ yêu cầu suông').toBe(2)
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
