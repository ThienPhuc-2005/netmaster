// Render toàn bộ nội dung content/modules/*.json ra REVIEW-NOI-DUNG.md
// dạng đọc được (bài → bước → câu hỏi → đáp án → explain) để người duyệt
// nội dung không phải bơi trong JSON. Chạy: npm run content:review
// File sinh ra là ARTIFACT DUYỆT — không phải nguồn chân lý; sửa nội dung
// thì sửa JSON rồi render lại.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const modulesDir = join(root, 'content', 'modules')

const vi = (ltext) => (ltext && typeof ltext.vi === 'string' ? ltext.vi : '')

function renderQuestion(q, indent = '') {
  const lines = []
  lines.push(`${indent}- **Đề:** ${vi(q.prompt)}`)
  if (q.kind === 'typed') {
    lines.push(`${indent}  - **Dạng:** gõ tay · **Chấp nhận:** ${q.accept.join(' | ')}`)
  } else if (q.kind === 'mcq') {
    const choices = q.choices.map((c, i) => (i === q.answerIndex ? `**${vi(c)}** ✓` : vi(c)))
    lines.push(`${indent}  - **Dạng:** trắc nghiệm · ${choices.join(' / ')}`)
  } else if (q.kind === 'order') {
    lines.push(`${indent}  - **Dạng:** xếp thứ tự (thứ tự đúng):`)
    q.items.forEach((it, i) => lines.push(`${indent}    ${i + 1}. ${vi(it)}`))
  }
  if (q.hintTopic) lines.push(`${indent}  - **Chủ đề gợi ý (tầng 1):** ${vi(q.hintTopic)}`)
  if (q.explain) lines.push(`${indent}  - **Vì sao:** ${vi(q.explain)}`)
  return lines
}

function renderExercise(ex, indent = '') {
  const lines = renderQuestion(ex.question, indent)
  lines.push(`${indent}  - **Gợi ý (tầng 2):** ${vi(ex.hint)}`)
  lines.push(`${indent}  - **Lời giải (tầng 3):** ${vi(ex.solution)}`)
  return lines
}

function renderLesson(lesson) {
  const [hook, pretest, teach, practice, retrieval, summary] = lesson.steps
  const out = []
  out.push(`### Bài: ${vi(lesson.missionTitle)} \`${lesson.id}\``)
  out.push('')
  out.push(`**1 · Khởi động (hook):** ${vi(hook.question)}`)
  out.push('')
  out.push('**2 · Đoán thử (pretest):**')
  for (const q of pretest.questions) out.push(...renderQuestion(q))
  out.push('')
  out.push('**3 · Khám phá (teach):**')
  for (const s of teach.screens) {
    out.push(`- *[${s.conceptId}]* ${vi(s.body)}`)
    if (s.deepDive) out.push(`  - **Đào sâu hơn:** ${vi(s.deepDive)}`)
  }
  out.push('')
  out.push(`**4 · Thử tay (practice, fading ${practice.fadingLevel}):**`)
  if (practice.workedExample) out.push(`- **Ví dụ giải sẵn:** ${vi(practice.workedExample)}`)
  for (const ex of practice.exercises) out.push(...renderExercise(ex))
  out.push('')
  out.push('**5 · Nhớ lại (retrieval):**')
  for (const ex of retrieval.questions) out.push(...renderExercise(ex))
  out.push(`- **Tự giải thích:** ${vi(retrieval.selfExplain.prompt)}`)
  out.push(
    `  - **Nhóm ý cần chạm:** ${retrieval.selfExplain.keywords.map((g) => `[${g.join(', ')}]`).join(' · ')}`,
  )
  out.push(`  - **Trả lời mẫu:** ${vi(retrieval.selfExplain.exampleAnswer)}`)
  out.push('')
  out.push('**6 · Tổng kết:**')
  for (const b of summary.bullets) out.push(`- ${vi(b)}`)
  out.push(`- *Úp mở bài sau:* ${vi(summary.nextTeaser)}`)
  out.push('')
  return out
}

function renderModule(mod) {
  const out = []
  out.push(`## ${vi(mod.title)} \`${mod.id}\``)
  out.push('')
  out.push(`Phần ${mod.part} · ${mod.stages.length} chặng · ${mod.lessons.length} bài · ${mod.concepts.length} khái niệm${mod.drill ? ` · drill: ${mod.drill}` : ''}`)
  out.push('')
  out.push('**Chặng:** ' + mod.stages.map((s) => `${vi(s.title)} (${s.lessonIds.join(', ')})`).join(' → '))
  out.push('')

  const byId = new Map(mod.lessons.map((l) => [l.id, l]))
  for (const stage of mod.stages) {
    for (const lid of stage.lessonIds) {
      const lesson = byId.get(lid)
      if (lesson) out.push(...renderLesson(lesson))
    }
  }

  out.push(`### Khái niệm & flashcard (${mod.concepts.length})`)
  out.push('')
  for (const c of mod.concepts) {
    out.push(`- **${c.term}** \`${c.id}\` — ${c.glossVi}`)
    out.push(`  - Ẩn dụ: ${vi(c.metaphor)}`)
    if (c.flashcard) out.push(`  - Thẻ ôn: *${vi(c.flashcard.front)}* → ${vi(c.flashcard.back)}`)
    else out.push('  - Thẻ ôn: *(khái niệm meta — noFlashcard, không vào hộp ôn)*')
  }
  out.push('')

  out.push(`### Bài kiểm tra module (${mod.masteryTest.length} câu, cần ≥ 85%)`)
  out.push('')
  for (const q of mod.masteryTest) out.push(...renderQuestion(q))
  out.push('')
  return out
}

const files = readdirSync(modulesDir).filter((f) => f.endsWith('.json')).sort()
const lines = [
  '# REVIEW NỘI DUNG — Module 1-3 (Phần A)',
  '',
  `> Sinh tự động từ ${files.map((f) => `\`content/modules/${f}\``).join(', ')} bằng \`npm run content:review\`.`,
  '> Đây là bản để ĐỌC DUYỆT; muốn sửa thì sửa file JSON rồi render lại.',
  '',
]
for (const f of files) {
  const mod = JSON.parse(readFileSync(join(modulesDir, f), 'utf8'))
  lines.push(...renderModule(mod))
}

writeFileSync(join(root, 'REVIEW-NOI-DUNG.md'), lines.join('\n'), 'utf8')
console.log(`Đã render ${files.length} module → REVIEW-NOI-DUNG.md`)
