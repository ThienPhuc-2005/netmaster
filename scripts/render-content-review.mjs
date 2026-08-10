// Render toàn bộ nội dung content/modules/*.json ra REVIEW-NOI-DUNG.md
// dạng đọc được (bài → bước → câu hỏi → đáp án → explain) để người duyệt
// nội dung không phải bơi trong JSON. Chạy: npm run content:review
// File sinh ra là ARTIFACT DUYỆT — không phải nguồn chân lý; sửa nội dung
// thì sửa JSON rồi render lại.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const modulesDir = join(root, 'content', 'modules')

const vi = (ltext) => (ltext && typeof ltext.vi === 'string' ? ltext.vi : '')

// --- Diễn đạt một đề lab thành chữ để người duyệt đọc được ---------

const hostnameOf = (topo, id) => topo.devices.find((d) => d.id === id)?.hostname ?? id

function describeTopology(topo) {
  const parts = topo.devices.map((d) => {
    if (d.kind === 'switch') {
      const vlans = d.ports.map((p) => `${p.id}:VLAN ${p.vlan}`).join(', ')
      return `${d.hostname} [${vlans}]`
    }
    if (d.kind === 'router') {
      const ips = d.ports.map((p) => `${p.id}:${p.ipConfig ? `${p.ipConfig.ip}/${p.ipConfig.prefix}` : 'chưa đặt'}`)
      return `${d.hostname} [${ips.join(', ')}]`
    }
    const ip = d.ipConfig ? `${d.ipConfig.ip}/${d.ipConfig.prefix}` : 'chưa đặt IP'
    return `${d.hostname} [${ip}${d.gateway ? `, gw ${d.gateway}` : ''}]`
  })
  const wires = topo.links.map(
    (l) => `${hostnameOf(topo, l.a.deviceId)}·${l.a.portId} — ${hostnameOf(topo, l.b.deviceId)}·${l.b.portId}`,
  )
  return `${parts.join(' · ')} — dây: ${wires.length === 0 ? 'chưa cắm dây nào' : wires.join(' | ')}`
}

function describeGoal(goal) {
  if (goal.kind === 'ping') {
    return goal.expect === 'reach'
      ? `${goal.from} PHẢI gọi được ${goal.to}`
      : `${goal.from} phải KHÔNG gọi được ${goal.to}`
  }
  if (goal.kind === 'pathThrough') return `đường ${goal.from} → ${goal.to} phải qua ${goal.via.join(', ')}`
  if (goal.kind === 'macLearned') {
    return `${goal.switchId} học được ${goal.mac} ở cổng ${goal.portId} (VLAN ${goal.vlan})`
  }
  return `${goal.deviceId} phân giải được ${goal.ip} → ${goal.mac}`
}

function describeAllowance(allow) {
  const yes = []
  if (allow.addDevices.length > 0) yes.push(`thêm thiết bị (${allow.addDevices.join('/')})`)
  if (allow.removeDevices) yes.push('gỡ thiết bị')
  if (allow.addLinks) yes.push('cắm dây')
  if (allow.removeLinks) yes.push('gỡ dây')
  if (allow.setVlan) yes.push('đổi VLAN')
  if (allow.setIp) yes.push('đặt địa chỉ')
  if (allow.setRoutes) yes.push('đặt tuyến tĩnh')
  return yes.length === 0 ? 'KHÔNG cho phép thao tác nào (đề bài hỏng)' : yes.join(', ')
}

// --- Diễn đạt một ca bệnh phòng khám thành chữ -----------------------

/** Hồ sơ bệnh (overlay) gọn một dòng — người duyệt thấy hết manh mối được cài. */
function describeOverlay(overlay) {
  const parts = []
  if (overlay.dns) {
    const records = overlay.dns.records.map((r) => `${r.name} → ${r.ip}`).join(', ')
    parts.push(
      `DNS ${overlay.dns.serverIp}${overlay.dns.down ? ' (ĐANG CHẾT)' : ''} [${records || 'không bản ghi'}]`,
    )
  }
  for (const b of overlay.hostBlocks ?? []) {
    parts.push(`luật chặn ICMP ${b.direction} trên ${b.deviceId} (nguồn ${b.source}: "${b.ruleName}")`)
  }
  for (const [dev, gpos] of Object.entries(overlay.gpos ?? {})) {
    parts.push(`gpresult ${dev}: ${gpos.map((g) => `${g.name}${g.blocking ? ' ⚠' : ''}`).join(', ')}`)
  }
  for (const [dev, rows] of Object.entries(overlay.connections ?? {})) {
    parts.push(`netstat ${dev}: ${rows.length} dòng`)
  }
  return parts.length === 0 ? 'không có (bệnh nằm trọn trong sơ đồ)' : parts.join(' · ')
}

// --- Diễn đạt một bài terminal PowerShell thành chữ ------------------

function describePsWorld(world) {
  const parts = [`máy ${world.hostname} [${world.interfaces.map((i) => `${i.ip}/${i.prefix}`).join(', ')}]`]
  if (world.targets.length > 0) {
    parts.push(
      `đích: ${world.targets
        .map((t) => `${t.name ? `${t.name}=` : ''}${t.ip}${t.pingable ? '' : ' (im lặng)'}${t.openPorts.length ? ` cổng ${t.openPorts.join('/')}` : ''}`)
        .join(' · ')}`,
    )
  }
  if (world.ad) {
    parts.push(`AD ${world.ad.domain}: OU [${world.ad.ous.join(', ')}], ${world.ad.users.length} user sẵn có`)
  }
  const files = Object.keys(world.files)
  if (files.length > 0) parts.push(`file: ${files.join(', ')}`)
  return parts.join(' — ')
}

function describePsGoal(goal) {
  if (goal.kind === 'ad-user') return `user "${goal.sam}" phải tồn tại${goal.ou ? ` trong OU ${goal.ou}` : ''}`
  if (goal.kind === 'ad-user-count') return `OU ${goal.ou} phải có ít nhất ${goal.atLeast} user`
  if (goal.kind === 'tested-connection')
    return `phải kiểm tra ${goal.port ? `cổng ${goal.port} của ` : 'ping tới '}${goal.ip} thành công`
  return `phải lôi ra được dòng chứa "${goal.mustContain}"`
}

function describeCliGoal(goal, topo) {
  const where = () => `cổng ${goal.portId} của ${hostnameOf(topo, goal.deviceId)}`
  switch (goal.kind) {
    case 'behavior':
      return describeGoal(goal.goal)
    case 'port-mode':
      return `${where()} phải là ${goal.mode === 'trunk' ? 'trunk' : 'cổng access'}`
    case 'access-vlan':
      return `${where()} phải thuộc VLAN ${goal.vlan}`
    case 'trunk-carries':
      return `trunk ở ${where()} phải cho VLAN ${goal.vlans.join(', ')} đi qua`
    case 'trunk-blocks':
      return `trunk ở ${where()} phải CHẶN VLAN ${goal.vlans.join(', ')}`
    case 'native-vlan':
      return `trunk ở ${where()} phải khai native VLAN ${goal.vlan}`
    case 'native-match':
      return `hai đầu trunk ${goal.a.portId} của ${hostnameOf(topo, goal.a.deviceId)} và ${goal.b.portId} của ${hostnameOf(topo, goal.b.deviceId)} phải khai CÙNG native VLAN`
    case 'port-up':
      return `${where()} phải đang bật (đã no shutdown)`
    case 'port-ip':
      return `${where()} phải mang địa chỉ ${goal.ip}/${goal.prefix}`
    case 'static-route':
      return `${hostnameOf(topo, goal.deviceId)} phải có tuyến tĩnh tới ${goal.destination}/${goal.prefix} qua ${goal.nextHop}`
    case 'vlan-exists':
      return `${hostnameOf(topo, goal.deviceId)} phải có VLAN ${goal.vlan}`
    default:
      return `phải xem "${goal.command}" trên ${hostnameOf(topo, goal.deviceId)}`
  }
}

function describeSymptom(symptom, topo) {
  const from = hostnameOf(topo, symptom.from)
  if (symptom.kind === 'ping-fails') return `${from} ping ${symptom.target} PHẢI hỏng`
  if (symptom.kind === 'resolve-fails') return `${from} phân giải tên "${symptom.name}" PHẢI hỏng`
  return `${from} ping ${symptom.target} lúc được lúc không (nhiều máy giành một IP)`
}

/** Một dòng mô tả phòng cung điện cho người duyệt: chỗ, hai vế, hình, chuyện. */
function describeRoom(room) {
  return `tầng ${room.floor} phòng ${room.position} · ${room.keys.join('/')} · ${room.name} · hình \`${room.imageId}\` — ${vi(room.story)}`
}

function roomsOf(palace, roomIds) {
  if (!palace) return roomIds.map((id) => `${id} *(không tra được — module không khai cung điện)*`)
  const byId = new Map(palace.rooms.map((r) => [r.id, r]))
  return roomIds.map((id) => {
    const room = byId.get(id)
    return room ? describeRoom(room) : `${id} *(không có phòng này trong cung điện)*`
  })
}

export function renderQuestion(q, indent = '', palace = null) {
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
  } else if (q.kind === 'lab') {
    lines.push(`${indent}  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)`)
    lines.push(`${indent}    - **Sơ đồ đề bài:** ${describeTopology(q.spec.initial)}`)
    lines.push(`${indent}    - **Mục tiêu:**`)
    for (const goal of q.spec.goals) lines.push(`${indent}      - ${describeGoal(goal)}`)
    lines.push(`${indent}    - **Được phép:** ${describeAllowance(q.spec.allow)}`)
    lines.push(`${indent}    - **Lời giải mẫu:** ${describeTopology(q.spec.solution)}`)
  } else if (q.kind === 'palace-walk') {
    lines.push(`${indent}  - **Dạng:** đi lại cung điện từ trí nhớ (${q.rooms.length} phòng)`)
    for (const line of roomsOf(palace, q.rooms)) lines.push(`${indent}    - ${line}`)
  } else if (q.kind === 'clinic') {
    lines.push(`${indent}  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)`)
    lines.push(`${indent}    - **Mạng bệnh nhân:** ${describeTopology(q.spec.patient.topology)}`)
    lines.push(`${indent}    - **Ngồi ở máy:** ${hostnameOf(q.spec.patient.topology, q.spec.patient.seatId)}`)
    lines.push(`${indent}    - **Hồ sơ bệnh:** ${describeOverlay(q.spec.patient.overlay)}`)
    lines.push(`${indent}    - **Triệu chứng:** ${describeSymptom(q.spec.symptom, q.spec.patient.topology)}`)
    const diag = q.diagnosis.choices.map((c, i) => (i === q.diagnosis.answerIndex ? `**${vi(c)}** ✓` : vi(c)))
    lines.push(`${indent}    - **Chẩn đoán (chọn 1):** ${diag.join(' · ')}`)
    if (q.spec.fix.kind === 'edit-network') {
      lines.push(`${indent}    - **Sửa:** trực tiếp trên sơ đồ — mục tiêu:`)
      for (const goal of q.spec.fix.goals) lines.push(`${indent}      - ${describeGoal(goal)}`)
      if (q.spec.fix.mustClearDiagnoses) {
        lines.push(`${indent}      - phải hết sạch: ${q.spec.fix.mustClearDiagnoses.join(', ')}`)
      }
      lines.push(`${indent}    - **Được phép:** ${describeAllowance(q.spec.fix.allow)}`)
      lines.push(`${indent}    - **Lời giải mẫu:** ${describeTopology(q.spec.fix.solution)}`)
    } else {
      const acts = (q.actions?.choices ?? []).map((c, i) =>
        i === q.actions.answerIndex ? `**${vi(c)}** ✓` : vi(c),
      )
      lines.push(`${indent}    - **Sửa:** chọn hành động — ${acts.join(' · ')}`)
    }
  } else if (q.kind === 'ps') {
    lines.push(`${indent}  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)`)
    lines.push(`${indent}    - **Thế giới:** ${describePsWorld(q.spec.world)}`)
    lines.push(`${indent}    - **Mục tiêu:**`)
    for (const goal of q.spec.goals) lines.push(`${indent}      - ${describePsGoal(goal)}`)
    lines.push(`${indent}    - **Lệnh mẫu:** ${q.spec.solution.map((s) => `\`${s}\``).join(' rồi ')}`)
  } else if (q.kind === 'cli') {
    lines.push(`${indent}  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)`)
    lines.push(`${indent}    - **Sơ đồ đề bài:** ${describeTopology(q.spec.initial)}`)
    lines.push(`${indent}    - **Console cắm ở:** ${hostnameOf(q.spec.initial, q.spec.deviceId)}`)
    lines.push(`${indent}    - **Mục tiêu:**`)
    for (const goal of q.spec.goals) lines.push(`${indent}      - ${describeCliGoal(goal, q.spec.initial)}`)
    for (const step of q.spec.solution) {
      const cmds = step.lines.map((s) => `\`${s}\``).join(' rồi ')
      lines.push(`${indent}    - **Lệnh mẫu trên ${hostnameOf(q.spec.initial, step.deviceId)}:** ${cmds}`)
    }
  } else {
    // Kind mới mà quên bổ sung nhánh render → NỔ NGAY, không im lặng bỏ
    // qua. Bản duyệt thiếu phần đáp án còn tệ hơn không có bản duyệt:
    // người duyệt sẽ ký vào thứ họ chưa hề nhìn thấy.
    throw new Error(
      `renderQuestion: chưa biết render câu kind "${q.kind}" (câu "${q.id}") — bổ sung nhánh trong scripts/render-content-review.mjs`,
    )
  }
  if (q.hintTopic) lines.push(`${indent}  - **Chủ đề gợi ý (tầng 1):** ${vi(q.hintTopic)}`)
  if (q.explain) lines.push(`${indent}  - **Vì sao:** ${vi(q.explain)}`)
  return lines
}

function renderExercise(ex, indent = '', palace = null) {
  const lines = renderQuestion(ex.question, indent, palace)
  lines.push(`${indent}  - **Gợi ý (tầng 2):** ${vi(ex.hint)}`)
  lines.push(`${indent}  - **Lời giải (tầng 3):** ${vi(ex.solution)}`)
  return lines
}

function renderLesson(lesson, palace = null) {
  const [hook, pretest, teach, practice, retrieval, summary] = lesson.steps
  const out = []
  out.push(`### Bài: ${vi(lesson.missionTitle)} \`${lesson.id}\``)
  out.push('')
  out.push(`**1 · Khởi động (hook):** ${vi(hook.question)}`)
  out.push('')
  out.push('**2 · Đoán thử (pretest):**')
  for (const q of pretest.questions) out.push(...renderQuestion(q, '', palace))
  out.push('')
  out.push('**3 · Khám phá (teach):**')
  for (const s of teach.screens) {
    out.push(`- *[${s.conceptId}]* ${vi(s.body)}`)
    if (s.palaceTour) {
      out.push(`  - **Đi xem cung điện (${s.palaceTour.length} phòng):**`)
      for (const line of roomsOf(palace, s.palaceTour)) out.push(`    - ${line}`)
    }
    if (s.deepDive) out.push(`  - **Đào sâu hơn:** ${vi(s.deepDive)}`)
  }
  out.push('')
  out.push(`**4 · Thử tay (practice, fading ${practice.fadingLevel}):**`)
  if (practice.workedExample) out.push(`- **Ví dụ giải sẵn:** ${vi(practice.workedExample)}`)
  for (const ex of practice.exercises) out.push(...renderExercise(ex, '', palace))
  out.push('')
  out.push('**5 · Nhớ lại (retrieval):**')
  for (const ex of retrieval.questions) out.push(...renderExercise(ex, '', palace))
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

  const palace = mod.palace ?? null
  if (palace) {
    out.push(`### Cung điện ký ức: ${vi(palace.title)} \`${palace.id}\` (${palace.rooms.length} phòng)`)
    out.push('')
    const byFloor = [...palace.rooms].sort((a, b) => a.floor - b.floor || a.position - b.position)
    for (const room of byFloor) out.push(`- \`${room.id}\` — ${describeRoom(room)}`)
    out.push('')
  }

  // Thư cuối module là chữ người học ĐỌC lúc đậu — bản duyệt phải in ra
  // nguyên văn để người duyệt bắt được giọng sai hay lời hứa suông.
  if (mod.letter) {
    out.push('### Thư cuối module (hiện ở màn đậu bài thi)', '')
    out.push(`> ${vi(mod.letter)}`, '')
  }

  // Checklist lab VMware là nội dung người học nhìn thấy — bản duyệt
  // phải tả nó, không được nuốt im lặng (cùng luật với câu hỏi kind lạ).
  if (mod.vmLab) {
    out.push(`### Checklist lab VMware: ${vi(mod.vmLab.title)} (${mod.vmLab.steps.length} bước, không XP)`)
    out.push('')
    if (mod.vmLab.intro) out.push(`${vi(mod.vmLab.intro)}`, '')
    for (const [i, step] of mod.vmLab.steps.entries()) out.push(`${i + 1}. ${vi(step.text)} \`${step.id}\``)
    out.push('')
  }

  const byId = new Map(mod.lessons.map((l) => [l.id, l]))
  for (const stage of mod.stages) {
    for (const lid of stage.lessonIds) {
      const lesson = byId.get(lid)
      if (lesson) out.push(...renderLesson(lesson, palace))
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

  // Pool: mỗi lượt thi rút ra 8 câu (câu lab/cung điện/ca bệnh/terminal
  // luôn có mặt). Bản duyệt in TRỌN pool — người đọc phải thấy hết những
  // câu có thể rơi vào đề.
  out.push(`### Bài kiểm tra module (pool ${mod.masteryTest.length} câu, mỗi lượt rút 8, cần ≥ 85%)`)
  out.push('')
  for (const q of mod.masteryTest) out.push(...renderQuestion(q, '', palace))
  out.push('')
  return out
}

/** Tiêu đề sinh từ chính bộ nội dung — thêm module không phải sửa tay. */
function renderTitle(mods) {
  const orders = mods.map((m) => m.order).sort((a, b) => a - b)
  const parts = [...new Set(mods.map((m) => m.part))].sort()
  const span = orders.length === 1 ? `Module ${orders[0]}` : `Module ${orders[0]}-${orders.at(-1)}`
  const partLabel = parts.length === 1 ? `Phần ${parts[0]}` : `Phần ${parts.join('+')}`
  return `# REVIEW NỘI DUNG — ${span} (${partLabel})`
}

export function renderReview(mods, files) {
  // Render theo THỨ TỰ HỌC (order), giống loadModules — không theo tên file.
  const ordered = [...mods].sort((a, b) => a.order - b.order)
  const lines = [
    renderTitle(ordered),
    '',
    `> Sinh tự động từ ${files.map((f) => `\`content/modules/${f}\``).join(', ')} bằng \`npm run content:review\`.`,
    '> Đây là bản để ĐỌC DUYỆT; muốn sửa thì sửa file JSON rồi render lại.',
    '',
  ]
  for (const mod of ordered) lines.push(...renderModule(mod))
  return lines.join('\n')
}

function main() {
  const files = readdirSync(modulesDir).filter((f) => f.endsWith('.json')).sort()
  const mods = files.map((f) => JSON.parse(readFileSync(join(modulesDir, f), 'utf8')))
  writeFileSync(join(root, 'REVIEW-NOI-DUNG.md'), renderReview(mods, files), 'utf8')
  console.log(`Đã render ${files.length} module → REVIEW-NOI-DUNG.md`)
}

// Chỉ ghi file khi chạy như một lệnh; import từ test thì không đụng đĩa.
if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
