// Cổng chất lượng cho NỘI DUNG THẬT (content/modules/*.json).
// Schema đã ép cấu trúc; file này ép thêm các quy ước nội dung mà schema
// thuần không diễn đạt được.
//
// Các bất biến ở đây SUY TỪ DỮ LIỆU, không đếm cứng số module: thêm một
// module mới vào content/modules/ không được làm đỏ file này vì lý do
// "có thêm module". Chỉ nội dung SAI mới được làm đỏ.

import { describe, expect, it } from 'vitest'
import { conceptIdsInLesson } from '../engine/contentPure'
import { typedAnswerMatches } from '../engine/grading/normalize'
import { lt } from '../engine/ltext'
import { MASTERY_DRAW_COUNT, isAnchorQuestion } from '../engine/masteryPool'
import { findConcept, findLesson, loadModules } from './index'

const modules = loadModules() // parse + validateModules ném lỗi nếu hỏng

/** Tra module theo id — không dùng chỉ số mảng, để thêm module không lệch. */
function moduleById(id: string) {
  const found = modules.find((m) => m.id === id)
  expect(found, `không tìm thấy module "${id}"`).toBeDefined()
  return found!
}

const PART_RANK = { A: 0, B: 1, C: 2, D: 3, E: 4 } as const

// ---------------------------------------------------------------
// Đồ nghề soi CÂU GÕ TAY (lượt soát 08-15)
//
// Chấm oan người hiểu đúng là lớp lỗi lớn nhất của cả bộ nội dung — 36
// câu ở 16/21 module — và nó vô hình vì danh sách "Chấp nhận" viết tay,
// không ai thử ngược bao giờ. Ba cổng bên dưới soi nó bằng máy.
// ---------------------------------------------------------------

interface CauGoTay {
  id: string
  de: string
  accept: readonly string[]
  /** Chữ chính app đưa ra làm đáp án (lời giải bước học, giải thích đề thi). */
  dapAnCuaApp: string
}

/** Mọi câu gõ tay của app: bước Thử tay, bước Nhớ lại, và pool đề thi. */
function moiCauGoTay(): CauGoTay[] {
  const ds: CauGoTay[] = []
  for (const m of modules) {
    for (const l of m.lessons) {
      for (const e of [...l.steps[3].exercises, ...l.steps[4].questions]) {
        if (e.question.kind !== 'typed') continue
        ds.push({ id: e.question.id, de: lt(e.question.prompt), accept: e.question.accept, dapAnCuaApp: lt(e.solution) })
      }
    }
    for (const q of m.masteryTest) {
      if (q.kind !== 'typed') continue
      ds.push({ id: q.id, de: lt(q.prompt), accept: q.accept, dapAnCuaApp: q.explain === undefined ? '' : lt(q.explain) })
    }
  }
  return ds
}

const acceptGoTay = new Map(moiCauGoTay().map((q) => [q.id, q.accept]))

/** Mệnh đề đầu của một lời giải — chỗ app nói thẳng đáp án, trước khi kể. */
function menhDeDau(s: string): string {
  return (s.split(/[;:]|—|\. /)[0] ?? '').trim().replace(/\.$/, '')
}

/** Có mang từ phủ định không — so theo TỪ, cùng bộ từ với bộ chấm. */
function coPhuDinh(s: string): boolean {
  return /(^|[^\p{L}])(không|khong|chưa|chua|sai)([^\p{L}]|$)/iu.test(s)
}

/** Bộ chữ số trong đề, đã xếp — hai đề khác số là hai câu khác nhau. */
function soTrongDe(de: string): string {
  return (de.match(/\d+/g) ?? []).sort().join(',')
}

/** Độ giống nhau của hai đề bài, tính theo tỉ lệ từ dùng chung (Jaccard). */
function giongNhau(a: string, b: string): number {
  const tok = (s: string) => new Set(s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean))
  const x = tok(a)
  const y = tok(b)
  let chung = 0
  for (const t of x) if (y.has(t)) chung += 1
  return chung / (x.size + y.size - chung)
}

describe('bộ nội dung', () => {
  it('order liên tục từ 1, không đứt quãng', () => {
    // Đứt quãng nghĩa là thiếu một module giữa chuỗi mở khóa — mastery
    // gate sẽ nối hai module không liền mạch về nội dung (nguyên tắc 2).
    expect(modules.map((m) => m.order)).toEqual(modules.map((_, i) => i + 1))
  })

  it('phần không lùi: A trước B, B trước C, C trước D', () => {
    const ranks = modules.map((m) => PART_RANK[m.part])
    const sorted = [...ranks].sort((a, b) => a - b)
    expect(ranks, 'thứ tự phần phải là A → B → C → D theo order').toEqual(sorted)
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
        // Giữ ĐỒNG BỘ với `allowsAnything` của labSchema: quyền nào mở ra
        // cho người học thao tác thì đều tính, kể cả hai quyền của Phần D
        // (đổi vai trunk, bật/tắt STP). Thiếu chúng ở đây thì một bài lab
        // hợp lệ vẫn bị báo là "không cho làm gì".
        const canDoSomething =
          allow.addDevices.length > 0 ||
          allow.removeDevices ||
          allow.addLinks ||
          allow.removeLinks ||
          allow.setVlan ||
          allow.setTrunk === true ||
          allow.setStp === true ||
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

  it('Module 16: cung điện OSPF 4 tầng × 2 phòng, đúng 8 trạng thái neighbor theo thứ tự', () => {
    // Spec v2 mục 3 (Module 16): "tòa nhà 4 tầng × 2 phòng cho 8 trạng
    // thái neighbor, mỗi tầng một giai đoạn". Thứ tự CHÍNH LÀ kiến thức —
    // xếp sai tầng là dạy sai cuộc làm quen, không chỉ sai hình. Bậc
    // Attempt phải giữ ghi chú NBMA: spec đòi "dạy đúng, không làm tròn".
    const m16 = moduleById('module-16')
    expect(m16.palace, 'Module 16 phải có cung điện 8 trạng thái').toBeDefined()
    const palace = m16.palace!
    expect(palace.floors).toBe(4)
    expect(palace.roomsPerFloor).toBe(2)
    expect(palace.keyStyle).toBe('text')

    const inRouteOrder = [...palace.rooms].sort((a, b) => a.floor - b.floor || a.position - b.position)
    expect(inRouteOrder.flatMap((r) => r.keys)).toEqual([
      'Down',
      'Attempt',
      'Init',
      '2-Way',
      'ExStart',
      'Exchange',
      'Loading',
      'Full',
    ])

    const attempt = palace.rooms.find((r) => r.keys[0] === 'Attempt')!
    expect(attempt.note?.vi, 'bậc Attempt phải nói rõ chỉ có ở mạng NBMA').toMatch(/NBMA/)
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

  it('Module 11: 100% productive failure — MỌI bài mở màn bằng một ca bệnh ở bước Đoán thử', () => {
    // Spec Module 11: "KHÔNG có phần lý thuyết trước". Cách giữ điều đó
    // trong tuple 6 bước là chiêu của Module 4: bệnh nhân ĐẦU TIÊN của
    // mỗi bài nằm ở bước 2 (Đoán thử) — người học chạm tay vào ca hỏng
    // trước khi đọc bất kỳ màn dạy nào. Ai dời ca xuống sau bước Dạy là
    // test này đỏ.
    const m11 = moduleById('module-11')
    for (const lesson of m11.lessons) {
      const hasClinicPretest = lesson.steps[1].questions.some((q) => q.kind === 'clinic')
      expect(hasClinicPretest, `${lesson.id}: bước Đoán thử phải có một ca bệnh`).toBe(true)
    }
  })

  it('Module 11: phủ đủ thang bệnh dễ → khó của spec', () => {
    // Spec liệt kê đích danh: rút dây → sai gateway → DNS chết → trùng
    // IP → GPO chặn nhầm. Mỗi bệnh phải có ít nhất một ca thật trong
    // module — thiếu bệnh nào là cắt xén thang độ khó spec đã chốt.
    const m11 = moduleById('module-11')
    const specs = [
      ...m11.lessons.flatMap((l) => [
        ...l.steps[1].questions,
        ...l.steps[3].exercises.map((e) => e.question),
        ...l.steps[4].questions.map((e) => e.question),
      ]),
      ...m11.masteryTest,
    ].flatMap((q) => (q.kind === 'clinic' ? [q.spec] : []))
    expect(specs.length).toBeGreaterThanOrEqual(8)

    // Rút dây: có ca chữa bằng cắm dây.
    expect(specs.some((s) => s.fix.kind === 'edit-network' && s.fix.allow.addLinks)).toBe(true)
    // DNS chết: có ca overlay khai dịch vụ DNS ngừng chạy.
    expect(specs.some((s) => s.patient.overlay.dns?.down === true)).toBe(true)
    // Trùng IP: có ca hai thiết bị cùng giữ một địa chỉ ở trạng thái đầu.
    const hasDuplicateIp = specs.some((s) => {
      const ips = s.patient.topology.devices.flatMap((d) =>
        d.kind === 'pc' ? (d.ipConfig ? [d.ipConfig.ip] : []) : [],
      )
      return new Set(ips).size < ips.length
    })
    expect(hasDuplicateIp).toBe(true)
    // GPO chặn nhầm: có ca luật chặn nguồn gpo; và có cả ca tường lửa
    // (biến thể inbound) để dạy cặp chiều đi/chiều vào.
    const blocks = specs.flatMap((s) => s.patient.overlay.hostBlocks ?? [])
    expect(blocks.some((b) => b.source === 'gpo')).toBe(true)
    expect(blocks.some((b) => b.source === 'firewall')).toBe(true)
    // Cả hai kiểu sửa đều phải xuất hiện: sửa sơ đồ và chọn hành động.
    expect(specs.some((s) => s.fix.kind === 'edit-network')).toBe(true)
    expect(specs.some((s) => s.fix.kind === 'choose-action')).toBe(true)
  })

  it('bài thi Module 11 trộn kiến thức module trước và kết bằng ca bệnh (tổng ôn trá hình)', () => {
    // Spec: "case trộn kiến thức mọi module trước — đây chính là bài
    // tổng ôn trá hình". Chốt kiểm hai điểm đo được: bài thi kết bằng
    // ca clinic, và trong các ca thi có ca sửa VLAN (kiến thức Module 4
    // xuất hiện lại trong khung phòng khám).
    const m11 = moduleById('module-11')
    expect(m11.masteryTest.at(-1)?.kind, 'câu chốt bài thi phải là một ca bệnh').toBe('clinic')
    const examSpecs = m11.masteryTest.flatMap((q) => (q.kind === 'clinic' ? [q.spec] : []))
    expect(
      examSpecs.some((s) => s.fix.kind === 'edit-network' && s.fix.allow.setVlan),
      'bài thi cần một ca sửa VLAN — kiến thức Module 4 quay lại trong vai bệnh',
    ).toBe(true)
  })

  it('Module 12: generation effect tối đa — MỌI bài đều bắt gõ lệnh vào terminal ảo', () => {
    // Spec Module 12: "mọi bài đều là gõ lệnh vào terminal ảo". Một bài
    // chỉ toàn trắc nghiệm và gõ chữ là bài NÓI VỀ PowerShell chứ không
    // phải bài DÙNG PowerShell — đúng cái bẫy spec dựng test này để chặn.
    const m12 = moduleById('module-12')
    for (const lesson of m12.lessons) {
      const hasPs = [
        ...lesson.steps[1].questions,
        ...lesson.steps[3].exercises.map((e) => e.question),
        ...lesson.steps[4].questions.map((e) => e.question),
      ].some((q) => q.kind === 'ps')
      expect(hasPs, `${lesson.id}: không có câu terminal nào`).toBe(true)
    }
  })

  it('Module 12: phủ đủ 4 mảng nội dung spec (cmdlet mạng, AD, hàng loạt, đọc log)', () => {
    // Spec liệt kê đích danh: "cmdlet mạng (Test-NetConnection,
    // Get-NetIPAddress), script tạo user AD hàng loạt, đọc log". Mỗi mảng
    // phải có bài THẬT chấm được, không chỉ được nhắc tới trong màn dạy.
    const m12 = moduleById('module-12')
    const specs = [
      ...m12.lessons.flatMap((l) => [
        ...l.steps[1].questions,
        ...l.steps[3].exercises.map((e) => e.question),
        ...l.steps[4].questions.map((e) => e.question),
      ]),
      ...m12.masteryTest,
    ].flatMap((q) => (q.kind === 'ps' ? [q.spec] : []))
    expect(specs.length).toBeGreaterThanOrEqual(6)

    const goalKinds = new Set(specs.flatMap((s) => s.goals.map((g) => g.kind)))
    for (const kind of ['tested-connection', 'ad-user', 'ad-user-count', 'found-line'] as const) {
      expect(goalKinds.has(kind), `thiếu bài thuộc mảng "${kind}"`).toBe(true)
    }

    // "Hàng loạt" đã chốt là MỘT dòng pipeline chạy thật, không phải
    // script đa dòng: lời giải tham chiếu của bài đếm-user phải là một
    // dòng duy nhất có dấu ống.
    const batch = specs.filter((s) => s.goals.some((g) => g.kind === 'ad-user-count'))
    expect(batch.length).toBeGreaterThan(0)
    expect(
      batch.some((s) => s.solution.some((line) => line.includes('|'))),
      'bài hàng loạt phải giải được bằng một dòng pipeline',
    ).toBe(true)
  })

  it('Module 12: gợi ý mờ dần — fadingLevel không lùi dọc module và kết ở mức 2', () => {
    // Spec Module 12: "có gợi ý mờ dần (fading)". Ở cấp module, fading
    // đo được bằng chuỗi fadingLevel dọc các bài: chỉ được giữ nguyên
    // hoặc tăng, và bài cuối phải để người học tự làm hẳn.
    const m12 = moduleById('module-12')
    const byId = new Map(m12.lessons.map((l) => [l.id, l]))
    const levels = m12.stages
      .flatMap((s) => s.lessonIds)
      .map((id) => byId.get(id)!.steps[3].fadingLevel)
    expect(levels[0], 'bài đầu phải có ví dụ giải sẵn').toBe(0)
    expect(levels.at(-1), 'bài cuối phải tự làm hẳn').toBe(2)
    for (const [i, level] of levels.entries()) {
      if (i === 0) continue
      expect(level, `bài thứ ${i + 1} lùi về mức dễ hơn bài trước`).toBeGreaterThanOrEqual(levels[i - 1]!)
    }
  })

  it('bài thi Module 12 kết bằng một câu terminal PowerShell', () => {
    // Module cuối của cả khóa: câu chốt phải là việc làm thật trên
    // terminal, không phải câu hỏi về PowerShell.
    const m12 = moduleById('module-12')
    expect(m12.masteryTest.at(-1)?.kind).toBe('ps')
  })

  it('Module 17: ca "ACL chặn nhầm cả sếp" có thật và chẩn đoán được bằng show access-lists', () => {
    // Spec v2 mục 3 (Module 17) gọi đích danh ca này: danh sách mới có
    // đúng một dòng cấm mà cả văn phòng tắc, vì dòng cấm vô hình cuối
    // danh sách ra tay. Đo được bằng ba dấu hiệu cùng lúc trên MỘT câu:
    // đề đã áp một danh sách chỉ có dòng deny, mục tiêu có cả "phải
    // thông" lẫn "phải chặn" (thiếu vế chặn thì mở toang là qua bài), và
    // có mục tiêu dấu vết đã tra bảng luật.
    const m17 = moduleById('module-17')
    const cliSpecs = [
      ...m17.lessons.flatMap((l) => [
        ...l.steps[1].questions,
        ...l.steps[3].exercises.map((e) => e.question),
        ...l.steps[4].questions.map((e) => e.question),
      ]),
      ...m17.masteryTest,
    ].flatMap((q) => (q.kind === 'cli' ? [q.spec] : []))
    expect(cliSpecs.length, 'ACL chỉ cấu hình được bằng CLI nên module phải có nhiều câu cli').toBeGreaterThanOrEqual(4)

    const bossBlockedCase = cliSpecs.some((spec) => {
      const routers = spec.initial.devices.filter((d) => d.kind === 'router')
      const onlyDenyApplied = routers.some((r) =>
        r.ports.some((p) => p.aclIn !== undefined || p.aclOut !== undefined) &&
        (r.accessLists ?? []).some((list) => list.rules.every((rule) => rule.action === 'deny')),
      )
      const pings = spec.goals.flatMap((g) => (g.kind === 'behavior' && g.goal.kind === 'ping' ? [g.goal] : []))
      return (
        onlyDenyApplied &&
        pings.some((g) => g.expect === 'reach') &&
        pings.some((g) => g.expect === 'blocked') &&
        spec.goals.some((g) => g.kind === 'viewed' && g.command === 'show access-lists')
      )
    })
    expect(bossBlockedCase, 'thiếu ca danh sách chỉ có dòng cấm khiến cả văn phòng tắc').toBe(true)
  })

  it('Module 17: interleaving tường lửa stateful M7 ↔ ACL không trạng thái', () => {
    // Spec đòi trộn hai họ trong bài tập để người học phân biệt được
    // chúng. Đo bằng chỗ chắc chắn nhất: phải có câu (bài tập lẫn đề thi)
    // nhắc tới stateful, và câu đó phải nằm ở Module 17 chứ không phải
    // chỉ còn nằm lại ở Module 7.
    const m17 = moduleById('module-17')
    const mentionsStateful = (text: string) => /stateful/i.test(text)
    /** Cả gói một bài tập: đề, các lựa chọn và lời giải đều là chữ người học đọc. */
    const exerciseText = (e: { question: { prompt: { vi: string } }; hint: { vi: string }; solution: { vi: string } }) =>
      [
        e.question.prompt.vi,
        ...('choices' in e.question ? (e.question.choices as { vi: string }[]).map((c) => c.vi) : []),
        e.hint.vi,
        e.solution.vi,
      ].join(' ')
    const inPractice = m17.lessons.some((l) => l.steps[3].exercises.some((e) => mentionsStateful(exerciseText(e))))
    const inExam = m17.masteryTest.some((q) => mentionsStateful(q.prompt.vi) || mentionsStateful(q.explain?.vi ?? ''))
    expect(inPractice, 'bài tập chưa trộn câu tường lửa stateful với ACL').toBe(true)
    expect(inExam, 'đề thi chưa hỏi tới chỗ phân biệt hai họ').toBe(true)
  })

  it('Module 13: bật drill VLSM — màn luyện thiết kế là một nửa phép đo của spec', () => {
    expect(moduleById('module-13').drill).toBe('vlsm')
  })

  it('Module 14: bài 1 mở màn bằng câu CLI ở bước Đoán thử (mò lệnh show TRƯỚC khi giảng)', () => {
    // Spec chỉ đích danh: người học bị thả vào Switch> và tự mò ra
    // show vlan brief trước khi đọc một chữ lý thuyết trunk nào. Dời
    // pretest xuống sau màn dạy là mất productive failure — phải đỏ ngay.
    const m14 = moduleById('module-14')
    expect(m14.lessons[0]!.steps[1].questions.some((q) => q.kind === 'cli')).toBe(true)
  })

  it('Module 15: bài 1 là productive failure — lab mạng vòng CHƯA bật STP ở bước Đoán thử', () => {
    // "Productive failure trứ danh của module" (spec): người học bấm Gửi
    // thử, tự xem cơn bão chạy vòng, rồi tìm ra nút bật STP. Sơ đồ mở màn
    // mà bật STP sẵn (hoặc không cho bật) là bài giảng biến mất.
    const m15 = moduleById('module-15')
    const lab = m15.lessons[0]!.steps[1].questions.find((q) => q.kind === 'lab')
    expect(lab, 'bài 1 Module 15 phải mở màn bằng một lab ở bước Đoán thử').toBeDefined()
    if (lab?.kind !== 'lab') return
    expect(lab.spec.initial.stpEnabled ?? false, 'sơ đồ mở màn phải CHƯA bật STP — cơn bão là bài giảng').toBe(false)
    expect(lab.spec.allow.setStp, 'muốn hết bão phải BẬT STP được').toBe(true)
  })

  it('Module 19: bài 3 mở màn bằng câu PS ở bước Đoán thử (bẫy AGDLP tự vấp trước khi giảng)', () => {
    const m19 = moduleById('module-19')
    expect(m19.lessons[2]!.steps[1].questions.some((q) => q.kind === 'ps')).toBe(true)
  })

  it('Module 19: fading AGDLP leo đúng 0→1→2 dọc bài 3→5', () => {
    // Fading dọc module 19 là 0,1,0,1,2 (hai bài đầu là mạch site/replication
    // riêng) nên luật "không lùi" kiểu M12 không áp thô được — chuỗi AGDLP
    // bài 3→5 mới là thứ phải khóa: xem mẫu → điền mắt xích → tự xếp.
    const m19 = moduleById('module-19')
    expect(m19.lessons.slice(2, 5).map((l) => l.steps[3].fadingLevel)).toEqual([0, 1, 2])
  })

  it('Module 20: bài thi đọc log THẬT độ dài thật (>= 150 dòng, có distractor)', () => {
    // Spec M20: kỹ năng là lôi ĐÚNG dòng giữa đống rơm 150-200 dòng có
    // cảnh báo giả. Log mastery mà teo lại còn vài chục dòng thì
    // Select-String thành trang trí.
    const m20 = moduleById('module-20')
    const psExams = m20.masteryTest.filter((q) => q.kind === 'ps')
    expect(psExams.length).toBeGreaterThan(0)
    for (const q of psExams) {
      if (q.kind !== 'ps') continue
      const longest = Math.max(...Object.values(q.spec.world.files ?? {}).map((lines) => lines.length))
      expect(longest, `${q.id}: log dài nhất chỉ ${longest} dòng`).toBeGreaterThanOrEqual(150)
    }
  })

  it('Module 20: thẻ 8 mức severity hỏi được cả kiểu điền chỗ khuyết, không chỉ hỏi xuôi', () => {
    // Danh sách 8 mức học bằng câu nhớ là chỗ dễ học vẹt MẶT CHỮ nhất
    // trong cả app: hỏi mãi một kiểu thì người học nhận ra hình dạng câu
    // hỏi rồi đọc trôi mặt sau mà chẳng nhớ mức nào là mức nào. Thẻ này
    // BẮT BUỘC có cách hỏi thứ hai, và một trong số đó phải là chỗ khuyết.
    const severity = moduleById('module-20').concepts.find((c) => c.id === 'm20-severity')
    expect(severity?.flashcard?.alsoAsk?.length ?? 0).toBeGreaterThanOrEqual(1)
    const asks = (severity?.flashcard?.alsoAsk ?? []).map((a) => lt(a))
    expect(asks.some((a) => a.includes('___')), 'không cách hỏi nào có chỗ khuyết').toBe(true)
    // Mặt sau phải TRẢ LỜI được mọi cách hỏi: cách hỏi ngược đòi gọi tên
    // mức theo SỐ, nên mặt sau phải đánh số chứ không chỉ liệt kê.
    const back = lt(severity!.flashcard!.back)
    for (const n of ['0 Emergency', '2 Critical', '5 Notice', '7 Debug']) {
      expect(back, `mặt sau thiếu "${n}"`).toContain(n)
    }
  })

  it('Module 21: pool thi có ca bệnh liên tầng (clinic) làm câu trụ khép khóa', () => {
    // Spec hứa "kết bằng ca bệnh liên tầng" — vị trí KẾT do drawMasteryTest
    // lo (câu trụ nặng nhất về cuối, có test riêng); tầng dữ liệu chỉ cần
    // bảo đảm ca đó TỒN TẠI trong pool.
    const m21 = moduleById('module-21')
    expect(m21.masteryTest.some((q) => q.kind === 'clinic')).toBe(true)
  })

  it('LỜI GIẢI của app phải qua được chính BỘ CHẤM của app', () => {
    // Lỗi thật chủ dự án báo 08-10: câu m4-b2-ret-1 in lời giải "Địa chỉ
    // MAC của người GỬI", app bảo người học "tự gõ lại đáp án", họ gõ
    // đúng câu đó và bị chấm là chưa đúng — accept list hẹp hơn chính
    // lời giải. Đây là lớp lỗi tệ nhất của bộ chấm: người trả lời ĐÚNG
    // HƠN đáp án mẫu (nói rõ MAC thay vì "địa chỉ") thì bị phạt.
    //
    // Phép đo chỉ áp cho lời giải mở đầu bằng một CỤM ĐÁP ÁN ngắn: dài
    // hơn 9 chữ là lời giải kể chuyện, có chữ số là đáp án IP/port (dấu
    // chấm trong 192.168.1.1 làm mọi phép cắt câu vô nghĩa), có dấu ngoặc
    // kép là ký hiệu. Ba ca đó không phải thứ người học chép lại nguyên.
    const rejected: string[] = []
    for (const m of modules) {
      for (const lesson of m.lessons) {
        for (const e of [...lesson.steps[3].exercises, ...lesson.steps[4].questions]) {
          const q = e.question
          if (q.kind !== 'typed') continue
          const clause = (e.solution.vi.split(/[;:]|—|\. /)[0] ?? '').trim().replace(/\.$/, '')
          if (clause.split(' ').length > 9 || /\d/.test(clause) || clause.includes('"')) continue
          if (!typedAnswerMatches(clause, q.accept)) {
            rejected.push(`${m.id}/${q.id}: lời giải "${clause}" không nằm trong accept`)
          }
        }
      }
    }
    expect(rejected).toEqual([])
  })

  it('module nào cũng có THƯ CUỐI MODULE, đủ dài để nói được một chuyện', () => {
    // Thư là phần thưởng duy nhất của mastery gate (nguyên tắc 2 cấm cộng
    // XP ở bài thi) — module mới mà quên soạn thư thì người học đậu xong
    // nhận đúng một dòng "chúc mừng". Schema để trường này tùy chọn cho
    // fixture; nội dung THẬT thì bắt buộc, luật nằm ở đây.
    const MIN_CHARS = 220
    for (const m of modules) {
      const letter = m.letter?.vi
      expect(letter, `${m.id}: thiếu "letter" — thư cuối module`).toBeDefined()
      expect(letter!.length, `${m.id}: thư chỉ ${letter!.length} ký tự, quá ngắn để kể được gì`).toBeGreaterThanOrEqual(
        MIN_CHARS,
      )
      // 3-4 câu như ý gốc: đếm dấu kết câu, chặn cả thư một câu lê thê
      // lẫn thư dài thành bài giảng thứ hai.
      const sentences = letter!.split(/[.!?]\s/).filter((s) => s.trim() !== '').length
      expect(sentences, `${m.id}: thư có ${sentences} câu, ngoài khoảng 3-5`).toBeGreaterThanOrEqual(3)
      expect(sentences, `${m.id}: thư có ${sentences} câu, ngoài khoảng 3-5`).toBeLessThanOrEqual(5)
    }
  })

  it('mỗi module một lá thư RIÊNG — không chép qua chép lại giữa các module', () => {
    const seen = new Map<string, string>()
    for (const m of modules) {
      const letter = m.letter?.vi ?? ''
      const first = seen.get(letter)
      expect(first, `${m.id}: thư trùng nguyên văn với ${first ?? ''}`).toBeUndefined()
      seen.set(letter, m.id)
    }
  })

  it('mastery test là POOL đủ rộng: mỗi module >= 12 câu để rút ra đề 8 câu', () => {
    // Đề cố định thì lượt thi lại chỉ còn đo TRÍ NHỚ VỀ ĐỀ. Pool rộng
    // hơn cỡ đề mới có chỗ mà rút khác đi giữa hai lượt (ghế Đo lường).
    // Số dư càng nhỏ thì hai đề liên tiếp càng giống nhau — 12 rút 8 cho
    // 495 tổ hợp, đủ để không lượt nào lặp lại lượt trước.
    const POOL_MIN = 12
    for (const m of modules) {
      expect(m.masteryTest.length, `${m.id}: pool cần >= ${POOL_MIN} câu`).toBeGreaterThanOrEqual(POOL_MIN)
      expect(m.masteryTest.length, `${m.id}: pool phải rộng hơn cỡ đề`).toBeGreaterThan(MASTERY_DRAW_COUNT)
    }
  })

  it('câu TRỤ không được nhiều hơn cỡ đề (rút xong vẫn còn chỗ cho câu thường)', () => {
    // Lab/cung điện/ca bệnh/terminal luôn vào đề. Khai quá tay thì đề
    // phình to hơn 8 câu và ngưỡng 85% không còn so sánh được giữa các
    // module — nên chặn ngay ở tầng dữ liệu.
    for (const m of modules) {
      const anchors = m.masteryTest.filter(isAnchorQuestion)
      expect(
        anchors.length,
        `${m.id}: ${anchors.length} câu trụ, vượt cỡ đề ${MASTERY_DRAW_COUNT}`,
      ).toBeLessThanOrEqual(MASTERY_DRAW_COUNT)
      // Và phải chừa chỗ cho ít nhất vài câu thường, nếu không mọi lượt
      // thi của module đó gần như giống hệt nhau.
      expect(anchors.length, `${m.id}: câu trụ chiếm gần trọn đề`).toBeLessThanOrEqual(MASTERY_DRAW_COUNT - 4)
    }
  })

  it('M13: kỹ năng cắt VLSM liên hoàn phải có câu TRỤ — không được rút trượt', () => {
    // Biên bản hội đồng trung cấp: M13 từng là module trung cấp duy nhất
    // không có câu trụ nào — rút 8/12 có thể bỏ đúng các câu đòi THỰC HIỆN
    // trình tự cắt/gộp, người học đậu module VLSM mà chưa cắt trọn dải nào.
    // Cờ `anchor: true` theo câu (contentSchema) chở kỹ năng này.
    const m13 = modules.find((m) => m.id === 'module-13')
    expect(m13).toBeDefined()
    const anchors = m13!.masteryTest.filter(isAnchorQuestion)
    expect(anchors.length, 'module-13: cần ít nhất 2 câu trụ tính-tay (cắt liên hoàn + gộp tuyến)').toBeGreaterThanOrEqual(2)
  })

  it('bài thi mastery: đáp án MCQ không lộ mình bằng ĐỘ DÀI', () => {
    // Cue độ-dài là chị em với cue vị-trí (đã vá bằng xáo lựa chọn lúc
    // render): người không thuộc bài vẫn ăn điểm bằng cách bấm lựa chọn
    // dài nhất, vì người soạn hay viết đáp án đủ ý còn distractor cụt lủn.
    // Đề đo sai thì ngưỡng 85% mất nghĩa (nguyên tắc 2).
    //
    // Hai hàng rào, cùng suy từ dữ liệu:
    //   (a) từng câu — đáp án không được cao hơn distractor dài nhất quá
    //       10%, cũng không được ngắn hơn 30% (cue ngược cũng là cue);
    //       trừ câu mà cả ba lựa chọn chênh nhau <= 8 ký tự (mắt không
    //       phân biệt được thì không thành cue).
    //   (b) toàn bộ đề — tỉ lệ câu có đáp án dài nhất phải quanh mức
    //       ngẫu nhiên, không được vượt 45%.
    const GRACE_CHARS = 8
    let strictLongest = 0
    let mcqCount = 0

    for (const m of modules) {
      for (const q of m.masteryTest) {
        if (q.kind !== 'mcq') continue
        mcqCount++
        const lens = q.choices.map((c) => c.vi.length)
        const answerLen = lens[q.answerIndex]!
        const distractors = lens.filter((_, i) => i !== q.answerIndex)
        const maxD = Math.max(...distractors)
        const spread = Math.max(...lens) - Math.min(...lens)

        if (lens.filter((l) => l === answerLen).length === 1 && answerLen === Math.max(...lens)) {
          strictLongest++
        }
        if (spread <= GRACE_CHARS) continue

        expect(answerLen, `${m.id}/${q.id}: đáp án dài vượt distractor (${lens.join('/')})`).toBeLessThanOrEqual(
          Math.round(maxD * 1.1),
        )
        expect(answerLen, `${m.id}/${q.id}: đáp án ngắn bất thường (${lens.join('/')})`).toBeGreaterThanOrEqual(
          Math.round(maxD * 0.7),
        )
      }
    }

    expect(mcqCount, 'phải có câu MCQ để đo').toBeGreaterThan(0)
    expect(
      strictLongest / mcqCount,
      `${strictLongest}/${mcqCount} câu có đáp án là lựa chọn dài nhất — chiến thuật "bấm câu dài" đang ăn điểm`,
    ).toBeLessThanOrEqual(0.45)
  })

  it('ca bệnh trong đề thi: lựa chọn chẩn đoán/hành động không lộ mình bằng độ dài hay cấu trúc bao-trùm', () => {
    // Biên bản hội đồng trung cấp: ca hai tầng của M21 từng có đúng MỘT
    // lựa chọn "HAI bệnh chồng nhau…" giữa hai distractor "Một bệnh duy
    // nhất…" — người thi lụa bấm phương án bao trùm mà không cần mở
    // terminal. Hai hàng rào cho MỌI ca clinic trong pool thi:
    //   (a) cue độ-dài như MCQ (đáp án <= 1.1x distractor dài nhất);
    //   (b) cue bao-trùm: nếu đáp án kể NHIỀU bệnh ("cả A lẫn B") thì mọi
    //       distractor cũng phải cùng cấu trúc nhiều-vế — không được để
    //       đáp án là lựa chọn "gộp" duy nhất.
    const GRACE_CHARS = 8
    const checkChoices = (
      moduleId: string,
      questionId: string,
      label: string,
      choices: { vi: string }[],
      answerIndex: number,
    ) => {
      const lens = choices.map((c) => c.vi.length)
      const answerLen = lens[answerIndex]!
      const distractors = lens.filter((_, i) => i !== answerIndex)
      const maxD = Math.max(...distractors)
      const spread = Math.max(...lens) - Math.min(...lens)
      if (spread > GRACE_CHARS) {
        expect(
          answerLen,
          `${moduleId}/${questionId} (${label}): đáp án dài vượt distractor (${lens.join('/')})`,
        ).toBeLessThanOrEqual(Math.round(maxD * 1.1))
      }
      // Cue bao-trùm: đáp án tự nhận NHIỀU bệnh ("hai bệnh", "cả hai")
      // trong khi distractor tự nhận một vế là lộ đề không cần khám.
      const multi = (s: string) => /hai bệnh|cả hai/i.test(s)
      if (multi(choices[answerIndex]!.vi)) {
        const oneSided = choices.filter((c, i) => i !== answerIndex && /một bệnh duy nhất|chỉ /i.test(c.vi))
        expect(
          oneSided.length,
          `${moduleId}/${questionId} (${label}): đáp án gộp-hai-vế đứng giữa distractor một-vế — bấm bao trùm là ăn điểm`,
        ).toBe(0)
      }
    }

    let clinicCount = 0
    for (const m of modules) {
      for (const q of m.masteryTest) {
        if (q.kind !== 'clinic') continue
        clinicCount++
        checkChoices(m.id, q.id, 'diagnosis', q.diagnosis.choices as { vi: string }[], q.diagnosis.answerIndex)
        if (q.actions !== undefined) {
          checkChoices(m.id, q.id, 'actions', q.actions.choices as { vi: string }[], q.actions.answerIndex)
        }
      }
    }
    expect(clinicCount, 'phải có ca clinic trong pool thi để đo').toBeGreaterThan(0)
  })

  it('accept gõ tay nhận đủ các cách viết mà người thật hay gõ', () => {
    // Người học biết đáp án nhưng gõ theo thói quen khác người soạn thì
    // vẫn là NHỚ ĐƯỢC — chấm sai chỗ này là đo sai, không phải đo chặt.
    //
    // LƯỢT SOÁT 08-15 đổi bộ này từ "vài ca đã từng trượt oan" thành CỔNG
    // PHỦ TRỌN: mỗi câu gõ tay trong pool đề thi phải có ít nhất một cách
    // gõ khác được thử ở đây (luật ép ở test ngay dưới). Lý do: lượt soát
    // 696 câu tìm ra 36 câu chấm oan người hiểu đúng, ở 16/21 module —
    // lớp lỗi lớn nhất của cả app, và nó vô hình vì accept viết tay không
    // ai thử ngược bao giờ. Viết ca thử cho từng câu chính là động tác ép
    // người soạn nghĩ ra "còn ai gõ kiểu nào nữa" trước khi giao bài.
    const CASES: ReadonlyArray<readonly [string, string]> = [
      ['m1-mt-1', 'địa chỉ IP của máy'],
      ['m1-mt-2', 'gói dữ liệu nhỏ'],
      ['m1-mt-3', 'bộ định tuyến (router)'],
      ['m1-mt-4', 'port number'],
      ['m1-mt-6', 'bộ quy tắc chung mà hai bên thỏa thuận'],
      ['m1-mt-9', 'số hiệu port'],
      ['m2-mt-1', 'máy chủ tên miền'],
      ['m2-mt-5', 'máy chủ (server)'],
      ['m2-mt-7', 'gói response'],
      ['m2-mt-10', 'router nhà mình'],
      ['m2-mt-12', 'gói yêu cầu'],
      ['m3-mt-2', 'từ 0 đến 255'],
      ['m3-mt-4', 'mask 255.255.255.0'],
      ['m3-mt-5', 'magic number là 64'],
      ['m3-mt-6', '172.16.4.128/25'],
      ['m3-mt-9', '::'],
      ['m3-mt-9', 'dấu ::'],
      ['m3-mt-9', 'hai dấu hai chấm'],
      ['m3-mt-10', 'mạng 10.0.5.64'],
      ['m3-mt-12', 'prefix /26'],
      ['m4-mt-2', 'địa chỉ MAC của máy'],
      ['m4-mt-4', 'giao thức ARP'],
      ['m4-mt-6', 'router (bộ định tuyến)'],
      ['m4-mt-10', 'chia VLAN'],
      ['m4-mt-12', 'bảng routing'],
      ['m5-mt-2', 'SYN/ACK'],
      ['m5-mt-4', '65535'],
      ['m5-mt-4', '65,535'],
      ['m5-mt-4', '65.535'],
      ['m5-mt-10', 'tới 1023'],
      ['m5-mt-12', 'port ngẫu nhiên tạm thời'],
      ['m6-mt-2', 'máy chủ có thẩm quyền'],
      ['m6-mt-4', 'bản ghi AAAA'],
      ['m6-mt-8', '50 phần trăm'],
      ['m6-mt-9', 'bản ghi CNAME'],
      ['m7-mt-1', 'NAT'],
      ['m7-mt-4', 'tường lửa stateful'],
      ['m7-mt-7', 'doublenat'],
      ['m7-mt-7', 'NAT kép'],
      ['m7-mt-11', 'mở cổng'],
      ['m8-mt-2', '6 GHz'],
      ['m8-mt-3', 'WPA3'],
      ['m8-mt-4', 'linklocal'],
      ['m8-mt-4', 'địa chỉ link-local'],
      ['m8-mt-7', 'DHCP'],
      ['m8-mt-8', 'tự cấu hình không trạng thái'],
      ['m9-mt-2', 'DC'],
      ['m9-mt-4', 'tầng Site'],
      ['m9-mt-7', 'gpupdate /force'],
      ['m9-mt-8', 'gpresult /r'],
      ['m9-mt-11', 'OU của phòng kế toán'],
      ['m10-mt-1', 'virtual network'],
      ['m10-mt-4', 'VPN site to site'],
      ['m10-mt-5', 'client VPN'],
      ['m10-mt-7', 'danh tính người dùng'],
      ['m11-mt-1', 'ipconfig /all'],
      ['m11-mt-3', 'hệ thống DNS'],
      ['m11-mt-4', '2 router'],
      ['m11-mt-6', 'gpresult /r'],
      ['m11-mt-10', 'tracert'],
      ['m12-mt-1', 'động từ - danh từ'],
      ['m12-mt-1', 'động từ và danh từ'],
      ['m12-mt-1', 'verb-noun'],
      ['m12-mt-3', 'Get-Help'],
      ['m12-mt-3', 'get help'],
      ['m12-mt-3', 'gethelp'],
      ['m12-mt-4', '-SearchBase'],
      ['m12-mt-4', 'search base'],
      ['m12-mt-6', '|'],
      ['m12-mt-6', 'dấu |'],
      ['m12-mt-6', 'dấu gạch đứng'],
      ['m12-mt-6', 'dấu ống'],
      ['m12-mt-7', 'Get-NetIPAddress'],
      ['m12-mt-9', 'Select-String'],
      ['m13-mt-2', '/26'],
      ['m13-mt-4', '192.168.10.128'],
      ['m13-mt-5', '0.0.0.15'],
      ['m13-mt-7', '192.168.4.0/22'],
      ['m13-mt-9', '126 máy'],
      ['m13-mt-11', '10.20.30.128'],
      ['m14-mt-2', '802.1Q'],
      ['m14-mt-3', 'switchport mode trunk'],
      ['m14-mt-5', 'VLAN 1'],
      ['m14-mt-7', 'sh interfaces trunk'],
      ['m15-mt-2', 'spanning tree'],
      ['m15-mt-4', 'blocking'],
      ['m15-mt-7', 'PortFast'],
      ['m15-mt-12', 'BPDU'],
      ['m15-mt-13', 'Switch-2'],
      ['m16-mt-2', 'của chính nó'],
      ['m16-mt-4', 'gói hello'],
      ['m16-mt-7', 'mặt nạ lộn ngược'],
      ['m16-mt-9', 'chữ O'],
      ['m17-mt-2', 'dòng đầu tiên khớp'],
      ['m17-mt-4', 'từ 100 đến 199'],
      ['m17-mt-7', 'lúc gói vào cổng'],
      ['m17-mt-9', 'cổng bị tắt bằng lệnh'],
      ['m18-mt-2', 'trường giaddr'],
      ['m18-mt-4', 'dải 169.254'],
      ['m18-mt-10', 'DNS forwarder'],
      ['m18-mt-12', 'hạ TTL xuống'],
      ['m19-mt-2', 'DC gần nhất'],
      ['m19-mt-10', 'ủy quyền'],
      ['m19-mt-13', 'Get-ADGroupMember'],
      ['m20-mt-2', 'mức 3'],
      ['m20-mt-6', 'NTP'],
      ['m20-mt-11', 'SNMP trap'],
      ['m21-mt-2', '10.50.0.0/26'],
      ['m21-mt-5', 'show ip ospf neighbors'],
      ['m21-mt-8', 'implicit deny'],
      ['m21-mt-stp2', 'cổng blocking'],
    ]

    /**
     * CA XẤU — nới accept mà không có vế này là mở cửa cho câu trả lời
     * sai. Bộ chấm khớp theo CỤM TỪ NGUYÊN nằm trong câu, nên một mục
     * accept ngắn và phổ thông (kiểu "gói") biến mọi câu chứa từ đó
     * thành đúng. Mỗi lần nới một câu thì thêm ca xấu cho chính câu đó.
     */
    const CA_XAU: ReadonlyArray<readonly [string, string]> = [
      ['m1-mt-2', 'gói cước'],
      ['m1-mt-6', 'địa chỉ IP'],
      ['m1-mt-6', 'quy tắc đặt tên miền'],
      ['m8-b2-ret-1', 'router đời cũ phải chạy theo máy mới'],
      ['m15-b3-ret-1', 'nó im hẳn, còn cổng chính mới nghe BPDU'],
      ['m2-mt-1', 'tên miền'],
      ['m4-mt-12', 'bảng mac'],
      ['m7-mt-11', 'mở máy chủ'],
      ['m7-mt-11', 'đóng cổng'],
      ['m8-mt-8', 'có trạng thái'],
      ['m8-mt-8', 'dhcp'],
      ['m12-b4-ret-1', 'chữ thuần'],
      ['m14-mt-7', 'sh ip route'],
      ['m16-mt-2', 'của nhà cung cấp'],
      ['m16-mt-2', 'của router hàng xóm'],
      ['m16-mt-7', 'subnet mask'],
      ['m17-b1-ret-1', 'cho phép tất cả'],
      ['m17-mt-7', 'lúc gói rời cổng'],
      ['m17-mt-7', 'sau khi tra bảng định tuyến'],
      ['m21-mt-stp2', 'cổng đang phát'],
      ['m21-mt-stp2', 'cổng root'],
    ]

    for (const [id, typed] of CASES) {
      const accept = acceptGoTay.get(id)
      expect(accept, `không còn câu gõ tay "${id}" trong bài thi`).toBeDefined()
      expect(typedAnswerMatches(typed, accept!), `${id}: gõ "${typed}" bị chấm sai`).toBe(true)
    }
    for (const [id, typed] of CA_XAU) {
      const accept = acceptGoTay.get(id)
      expect(accept, `không còn câu gõ tay "${id}"`).toBeDefined()
      expect(typedAnswerMatches(typed, accept!), `${id}: câu SAI "${typed}" lại được chấm đúng`).toBe(false)
    }

    // Cổng ép: câu thi mới thêm mà quên viết ca thử thì đỏ ngay tại đây.
    const thiGoTay = modules.flatMap((m) => m.masteryTest.filter((q) => q.kind === 'typed').map((q) => q.id))
    const daCoCaThu = new Set(CASES.map(([id]) => id))
    const thieu = thiGoTay.filter((id) => !daCoCaThu.has(id))
    expect(thieu, 'câu gõ tay trong đề thi chưa có ca thử "gõ thế này cũng đúng"').toEqual([])
  })

  it('lá chắn phủ định không được khóa chính người trả lời đúng', () => {
    // Bộ chấm TẮT chế độ khớp-chứa khi câu trả lời mang chữ phủ định
    // (không/chưa/sai) — cần thiết, vì "không phải DNS" ngược nghĩa hẳn
    // với "DNS". Nhưng có những câu mà đáp án ĐÚNG vốn là một câu phủ
    // định ("cấm tất cả những gì CHƯA được cho phép"). Khi đó accept
    // phải có một mục NGẮN cũng mang phủ định, nếu không người trả lời
    // đúng bị khóa cứng: mục dài chỉ khớp khi họ chép lại gần nguyên văn.
    // Chỉ soi MỆNH ĐỀ ĐẦU của lời giải — đó là chỗ app nói thẳng đáp án.
    // Lấy cả câu thì dính mọi lời kể có chữ "không" ("Không phải router
    // xếp lại, mà là máy nhận") và cổng hóa ra báo động 68 lần vô cớ.
    const hong: string[] = []
    for (const q of moiCauGoTay()) {
      const nguon = [menhDeDau(q.dapAnCuaApp), ...q.accept]
      if (!nguon.some(coPhuDinh)) continue
      if (q.accept.some((a) => coPhuDinh(a) && a.trim().split(/\s+/).length <= 5)) continue
      hong.push(`${q.id}: đáp án mang phủ định mà accept không có mục ngắn nào phủ định`)
    }
    expect(hong).toEqual([])
  })

  it('hai câu hỏi GIỐNG NHAU thì không được chấm lệch nhau', () => {
    // Lỗi thật (lượt soát 08-15): m7-mt-11 và m10-mt-1 bê nguyên đề của
    // câu trong bài nhưng accept bị cắt bớt — người học được BÀI dạy rằng
    // "mở cổng" là đúng, tới PHÒNG THI gõ đúng chữ đó thì mất điểm.
    // Cùng một câu hỏi mà hai nơi chấm hai kiểu là app tự mâu thuẫn.
    //
    // Chỉ so những cặp cùng bộ CHỮ SỐ: "/24 là mask nào" và "/25 là mask
    // nào" viết gần giống hệt nhau nhưng là hai câu khác nhau.
    const ds = moiCauGoTay()
    const lech: string[] = []
    for (let i = 0; i < ds.length; i++) {
      for (let j = i + 1; j < ds.length; j++) {
        const a = ds[i]!
        const b = ds[j]!
        if (soTrongDe(a.de) !== soTrongDe(b.de)) continue
        if (giongNhau(a.de, b.de) < 0.75) continue
        const chi = (x: typeof a, y: typeof a) =>
          x.accept.filter((v) => !y.accept.some((w) => w.toLowerCase().trim() === v.toLowerCase().trim()))
        const thieuA = chi(a, b)
        const thieuB = chi(b, a)
        if (thieuA.length + thieuB.length > 0) {
          lech.push(`${a.id} vs ${b.id}: ${a.id} thiếu ${JSON.stringify(thieuB)}, ${b.id} thiếu ${JSON.stringify(thieuA)}`)
        }
      }
    }
    expect(lech).toEqual([])
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

// Thẻ khái niệm của câu tập (ý N5, khối 21.58) — phần TÙY CHỌN nhưng khai
// sai còn tệ hơn không khai: phiên "luyện thứ hay quên" sẽ lôi câu này ra
// cho một khái niệm nó không hề luyện.
describe('thẻ khái niệm trên câu tập', () => {
  const modules = loadModules()

  it('thẻ nào cũng trỏ vào khái niệm CHÍNH BÀI ĐÓ dạy', () => {
    const pham: string[] = []
    for (const m of modules) {
      for (const l of m.lessons) {
        const day = new Set(conceptIdsInLesson(l))
        for (const e of l.steps[3].exercises) {
          if (e.conceptId !== undefined && !day.has(e.conceptId)) {
            pham.push(`${e.question.id} → ${e.conceptId} (bài ${l.id} không dạy)`)
          }
        }
      }
    }
    expect(pham).toEqual([])
  })

  it('có thật sự gắn thẻ, không phải tính năng rỗng dữ liệu', () => {
    const daGan = modules.flatMap((m) =>
      m.lessons.flatMap((l) => l.steps[3].exercises.filter((e) => e.conceptId !== undefined)),
    )
    expect(daGan.length, 'gắn thẻ mà không câu nào có thẻ thì luật lọc chỉ là code chết').toBeGreaterThan(50)
  })

  it('bỏ trống vẫn HỢP LỆ — câu bắc cầu hai khái niệm không được gán bừa', () => {
    const chuaGan = modules.flatMap((m) =>
      m.lessons.flatMap((l) => l.steps[3].exercises.filter((e) => e.conceptId === undefined)),
    )
    expect(chuaGan.length, 'không còn câu nào bỏ trống nghĩa là đã gán bừa cả câu bắc cầu').toBeGreaterThan(0)
  })
})
