// Bản vẽ FossFLOW (JSON) -> hình isometric bằng ngôn ngữ hình của app.
//
// Vì sao có script này: vẽ một sơ đồ nhiều nút bằng tay trong SVG là việc
// tính tọa độ mệt và dễ sai, còn FossFLOW làm đúng việc đó — kéo thả trên
// lưới isometric. Nhưng thứ FossFLOW XUẤT RA thì không dùng thẳng được:
// ảnh của nó là PNG (không đổi theo nền tối/sáng, không ăn token màu), còn
// bản JSON thì mang icon và màu của riêng nó.
//
// Nên chia việc: **FossFLOW lo BỐ CỤC, app lo NÉT VẼ.** Script chỉ đọc ba
// thứ từ bản vẽ — nút nằm ở ô lưới nào, tên nó là gì, nối với ai — rồi vẽ
// lại toàn bộ bằng nét currentColor trong khung 220x130 như mọi hình khác.
// Icon của FossFLOW bị bỏ đi hoàn toàn; hình dáng suy từ LOẠI thiết bị.
//
// Chạy: npm run visuals:isometric
// Vào:  content/ban-ve/*.json      (bản vẽ xuất từ FossFLOW)
// Ra:   src/components/IsometricScenes.generated.tsx  (đừng sửa tay)

import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const inputDir = join(root, 'content', 'ban-ve')
const outFile = join(root, 'src', 'components', 'IsometricScenes.generated.tsx')

// Khung hình của ConceptVisual — mọi hình trong app dùng chung cỡ này.
const VIEW_W = 220
const VIEW_H = 130
const PAD = 9

// Lưới isometric 2:1 (bề ngang gấp đôi bề cao) — đúng tỉ lệ FossFLOW dùng,
// nên bố cục nhìn trong xưởng vẽ thế nào thì ra hình y như vậy.
const TILE_W = 26
const TILE_H = 13

// Khối vẽ NHỎ HƠN ô lưới nó đứng. Bản đầu lấy khối bằng đúng ô, nên hai
// nút cạnh nhau là hai khối dính liền — mà khung tự co giãn cho vừa nên
// kéo bản vẽ chặt lại KHÔNG làm hình thưa ra, chỉ làm khối to lên và
// đâm vào nhau (đo trên browser thật). 0,72 để lại một rãnh nhìn thấy
// được giữa hai ô kề nhau.
const BOX = 0.72
const BOX_W = TILE_W * BOX
const BOX_H = TILE_H * BOX

/**
 * Hình dáng theo LOẠI thiết bị, suy từ id icon của FossFLOW.
 * `depth` là chiều cao khối: tòa nhà cao, máy chủ vừa, thiết bị mạng dẹt —
 * chênh lệch chiều cao chính là thứ khiến hình isometric đọc được ngay,
 * chứ không phải màu.
 */
const SHAPES = [
  { match: /office|building|tru-so/i, depth: 15, face: 'windows' },
  { match: /server|storage|database/i, depth: 11, face: 'slots' },
  { match: /router/i, depth: 5, face: 'plain' },
  { match: /switch/i, depth: 5, face: 'ports' },
  { match: /desktop|laptop|pc|user/i, depth: 8, face: 'screen' },
]
const DEFAULT_SHAPE = { depth: 7, face: 'plain' }

function shapeFor(iconId) {
  return SHAPES.find((s) => s.match.test(iconId ?? '')) ?? DEFAULT_SHAPE
}

/** Ô lưới (x, y) -> tâm mặt trên của khối, trong hệ tọa độ chưa co giãn. */
function project(tile) {
  return {
    x: (tile.x - tile.y) * (TILE_W / 2),
    y: (tile.x + tile.y) * (TILE_H / 2),
  }
}

const round = (n) => Math.round(n * 10) / 10

function buildScene(model) {
  const view = model.views?.[0]
  if (view === undefined) throw new Error('Bản vẽ không có view nào')

  const itemById = new Map((model.items ?? []).map((it) => [it.id, it]))
  const nodes = view.items.map((vi) => {
    const item = itemById.get(vi.id)
    if (item === undefined) throw new Error(`View trỏ tới nút không có trong items: "${vi.id}"`)
    const p = project(vi.tile)
    const shape = shapeFor(item.icon)
    return {
      id: vi.id,
      label: item.description ?? item.name,
      x: p.x,
      y: p.y,
      depth: shape.depth,
      face: shape.face,
    }
  })

  // Vẽ từ xa tới gần: ô có (x+y) nhỏ nằm sau, phải vẽ trước để khối gần
  // đè lên khối xa. Bỏ bước này là các khối chồng nhau sai chiều sâu.
  nodes.sort((a, b) => a.y - b.y || a.x - b.x)

  // Cảnh báo chỗ chật. Script KHÔNG tự dàn lại nút: bố cục là việc của
  // người vẽ trong xưởng vẽ, máy đoán hộ thì lần sau mở bản vẽ ra lại
  // thấy hình trong app khác hình mình vẽ. Chỉ mách chỗ cần kéo giãn.
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = Math.abs(nodes[i].x - nodes[j].x)
      const dy = Math.abs(nodes[i].y - nodes[j].y)
      if (dx < BOX_W && dy < BOX_H + Math.max(nodes[i].depth, nodes[j].depth)) {
        console.warn(`  ! "${nodes[i].label}" và "${nodes[j].label}" đứng sát nhau — kéo giãn thêm một ô trong xưởng vẽ`)
      }
    }
  }

  const nodeById = new Map(nodes.map((n) => [n.id, n]))
  const links = (view.connectors ?? []).flatMap((c) => {
    const ids = (c.anchors ?? []).map((a) => a.ref?.item).filter((v) => v !== undefined)
    if (ids.length < 2) return []
    const from = nodeById.get(ids[0])
    const to = nodeById.get(ids[ids.length - 1])
    if (from === undefined || to === undefined) return []
    return [{ from, to, label: c.description }]
  })

  // Co giãn cho vừa khung 220x130 — DÒ dần chứ không tính một phát.
  //
  // Lý do phải dò: khối thì co theo `scale`, còn NHÃN thì không (cỡ chữ 7
  // cố định để còn đọc được). Bản đầu chỉ đo hộp bao của khối rồi chia,
  // thế là cái đế nhãn "kinh doanh" ở nút ngoài cùng thò ra tận x=226 —
  // tràn viewBox, đúng thứ luật hình cấm. Hai đơn vị không cùng co giãn
  // thì không có công thức đóng; hạ dần 3% rồi đo lại là xong, và bao giờ
  // cũng dừng vì nhãn có bề ngang hữu hạn.
  const LABEL_H = 8
  const boxXs = nodes.flatMap((n) => [n.x - BOX_W / 2, n.x + BOX_W / 2])
  const boxYs = nodes.flatMap((n) => [
    n.y - BOX_H / 2 - (n.face === 'screen' ? 8 : 0),
    n.y + BOX_H / 2 + n.depth + LABEL_H,
  ])
  const minX = Math.min(...boxXs)
  const maxX = Math.max(...boxXs)
  const minY = Math.min(...boxYs)
  const maxY = Math.max(...boxYs)

  let scale = Math.min((VIEW_W - PAD * 2) / (maxX - minX), (VIEW_H - PAD * 2) / (maxY - minY), 1)
  let fit = null
  for (let i = 0; i < 40; i += 1) {
    const offX = (VIEW_W - (maxX - minX) * scale) / 2 - minX * scale
    const offY = (VIEW_H - (maxY - minY) * scale) / 2 - minY * scale
    const tx = (v) => v * scale + offX
    const ty = (v) => v * scale + offY

    // Mọi thứ SẼ được vẽ, đo ở tọa độ cuối cùng: khối, nhãn nút, nhãn dây.
    const xs = []
    const ys = []
    for (const n of nodes) {
      const cx = tx(n.x)
      const cy = ty(n.y)
      const depth = n.depth * scale
      xs.push(cx - (BOX_W / 2) * scale, cx + (BOX_W / 2) * scale)
      ys.push(cy - (BOX_H / 2) * scale - (n.face === 'screen' ? 7 : 0), cy + (BOX_H / 2) * scale + depth)
      const ly = cy + (BOX_H / 2) * scale + depth + 7
      const lw = labelWidth(n.label)
      xs.push(cx - lw / 2, cx + lw / 2)
      ys.push(ly - 5.6, ly + 1.8)
    }
    for (const l of links) {
      if (l.label === undefined) continue
      const cx = (tx(l.from.x) + tx(l.to.x)) / 2
      const cy = (ty(l.from.y) + ty(l.to.y)) / 2 - 1
      const lw = labelWidth(l.label)
      xs.push(cx - lw / 2, cx + lw / 2)
      ys.push(cy - 5.6, cy + 1.8)
    }

    const lo = { x: Math.min(...xs), y: Math.min(...ys) }
    const hi = { x: Math.max(...xs), y: Math.max(...ys) }
    if (lo.x >= 0 && lo.y >= 0 && hi.x <= VIEW_W && hi.y <= VIEW_H) {
      fit = { scale, tx: (v) => round(tx(v)), ty: (v) => round(ty(v)) }
      break
    }
    scale *= 0.97
  }
  if (fit === null) throw new Error('Không ép được bản vẽ vào khung 220x130 — bớt nút hoặc rút ngắn nhãn')

  return { nodes, links, scale: fit.scale, tx: fit.tx, ty: fit.ty }
}

/** Bề ngang cái đế nhãn — dùng chung cho lúc DÒ khung và lúc SINH mã. */
function labelWidth(text) {
  // 4,3 px/ký tự ở cỡ chữ 7 của font mono — đo trên browser thật, không
  // đoán: hệ số 3,7 của bản đầu làm đế hụt so với chữ "kinh doanh".
  return round(text.length * 4.3 + 4)
}

/**
 * Một nhãn có ĐẾ LÓT dưới chân.
 *
 * Bài học đã trả giá: bản đầu vẽ nhãn xen giữa các khối, đo trên browser
 * thật thì CẢ TÁM nhãn đều bị một nét hình cắt ngang qua chữ. Sơ đồ nhiều
 * nút thì nét với chữ tranh chỗ là chuyện tất yếu — nên nhãn vẽ SAU CÙNG,
 * và mỗi nhãn kê một mảnh nền màu panel để nét chui xuống dưới.
 */
function labelJsx(cx, cy, text, indent) {
  const w = labelWidth(text)
  const pad = ' '.repeat(indent)
  return [
    `${pad}<rect x="${round(cx - w / 2)}" y="${round(cy - 5.6)}" width="${w}" height="7.4" rx="1.5" {...isoPlate} />`,
    `${pad}<text x="${cx}" y="${cy}" textAnchor="middle" {...isoLabel}>${text}</text>`,
  ]
}

function sceneToJsx(scene, name) {
  const { nodes, links, scale, tx, ty } = scene
  const s = (v) => round(v * scale)
  const lines = []
  const labels = []

  lines.push(`function ${name}() {`)
  lines.push('  return (')
  lines.push('    <>')

  // Dây nối vẽ TRƯỚC mọi khối: dây chui sau thiết bị là cách sơ đồ mạng
  // vẽ tay xưa nay, và nó giấu luôn chỗ dây đâm vào giữa khối.
  lines.push('      <g className="text-ink-muted">')
  for (const l of links) {
    const x1 = tx(l.from.x)
    const y1 = ty(l.from.y)
    const x2 = tx(l.to.x)
    const y2 = ty(l.to.y)
    lines.push(`        <path d="M${x1} ${y1} L${x2} ${y2}" {...isoStroke} />`)
    if (l.label !== undefined) {
      labels.push(...labelJsx(round((x1 + x2) / 2), round((y1 + y2) / 2 - 1), l.label, 8))
    }
  }
  lines.push('      </g>')

  for (const n of nodes) {
    const cx = tx(n.x)
    const cy = ty(n.y)
    const depth = s(n.depth)
    const box = boxPathsScaled(cx, cy, depth, scale)
    lines.push(`      <g className="text-ink">`)
    lines.push(`        <path d="${box.left}" {...isoFace} />`)
    lines.push(`        <path d="${box.right}" {...isoFace} />`)
    lines.push(`        <path d="${box.top}" {...isoTop} />`)
    for (const d of facePathsScaled(cx, cy, depth, n.face, scale)) {
      lines.push(`        <path d="${d}" {...isoDetail} />`)
    }
    lines.push('      </g>')
    labels.push(...labelJsx(cx, round(cy + (BOX_H / 2) * scale + depth + 7), n.label, 8))
  }

  lines.push('      <g className="text-ink">')
  lines.push(...labels)
  lines.push('      </g>')
  lines.push('    </>')
  lines.push('  )')
  lines.push('}')
  return lines.join('\n')
}

function boxPathsScaled(cx, cy, depth, scale) {
  const hw = round((BOX_W / 2) * scale)
  const hh = round((BOX_H / 2) * scale)
  return {
    top: `M${cx} ${round(cy - hh)} L${round(cx + hw)} ${cy} L${cx} ${round(cy + hh)} L${round(cx - hw)} ${cy} Z`,
    left: `M${round(cx - hw)} ${cy} L${round(cx - hw)} ${round(cy + depth)} L${cx} ${round(cy + hh + depth)} L${cx} ${round(cy + hh)} Z`,
    right: `M${round(cx + hw)} ${cy} L${round(cx + hw)} ${round(cy + depth)} L${cx} ${round(cy + hh + depth)} L${cx} ${round(cy + hh)} Z`,
  }
}

function facePathsScaled(cx, cy, depth, face, scale) {
  const hh = (BOX_H / 2) * scale
  const hw = (BOX_W / 2) * scale
  const out = []
  if (face === 'slots' || face === 'windows') {
    const rows = face === 'windows' ? 3 : 2
    for (let i = 1; i <= rows; i += 1) {
      const dy = (depth / (rows + 1)) * i
      out.push(`M${round(cx - hw + 2)} ${round(cy + dy + 1)} L${round(cx - 2)} ${round(cy + hh + dy - 1)}`)
    }
  }
  if (face === 'ports') {
    for (let i = 0; i < 3; i += 1) {
      const t = 0.3 + i * 0.2
      out.push(
        `M${round(cx + hw - t * hw * 2)} ${round(cy + t * hh * 2 + 1)} l0 ${round(Math.max(depth - 2, 1.5))}`,
      )
    }
  }
  if (face === 'screen') {
    out.push(`M${round(cx - 5)} ${round(cy - hh - 7)} l10 0 l0 7 l-10 0 Z`)
  }
  return out
}

/** Tên bản vẽ (chi-nhanh-m21) -> tên hàm React (ChiNhanhM21). */
function pascal(slug) {
  return slug
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('')
}

const files = readdirSync(inputDir).filter((f) => f.endsWith('.json')).sort()
if (files.length === 0) throw new Error(`Không có bản vẽ nào trong ${inputDir}`)

const parts = []
const registry = []
for (const file of files) {
  const slug = file.replace(/\.json$/, '')
  const model = JSON.parse(readFileSync(join(inputDir, file), 'utf8'))
  const name = pascal(slug)
  parts.push(sceneToJsx(buildScene(model), name))
  registry.push(`  'vis-iso-${slug}': ${name},`)
  console.log(`  ${file} -> vis-iso-${slug}`)
}

const header = `// SINH TỰ ĐỘNG bởi scripts/isometric-tu-ban-ve.mjs — ĐỪNG SỬA TAY.
// Nguồn: content/ban-ve/*.json (bản vẽ xuất từ FossFLOW).
// Sửa hình = mở lại bản vẽ trong xưởng vẽ, xuất JSON đè lên, chạy
// \`npm run visuals:isometric\`.
//
// Chỉ trả về RUỘT của hình; khung 220x130 do Frame của ConceptVisual lo,
// nên hình sinh ra ăn đúng viền, nền và nhãn aria như mọi hình vẽ tay.

const isoStroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2 } as const
const isoFace = { fill: 'var(--panel-hover)', stroke: 'currentColor', strokeWidth: 1, strokeLinejoin: 'round' } as const
const isoTop = { fill: 'var(--panel)', stroke: 'currentColor', strokeWidth: 1.2, strokeLinejoin: 'round' } as const
const isoDetail = { fill: 'none', stroke: 'currentColor', strokeWidth: 0.9, opacity: 0.75 } as const
const isoPlate = { fill: 'var(--panel)', stroke: 'none' } as const
const isoLabel = {
  fontSize: 7,
  fill: 'currentColor',
  style: { fontFamily: 'var(--font-mono)' },
} as const
`

const body = `${header}
${parts.join('\n\n')}

/** visualId -> hình isometric sinh từ bản vẽ. ConceptVisual gộp map này vào REGISTRY. */
export const ISOMETRIC_SCENES: Record<string, () => React.ReactNode> = {
${registry.join('\n')}
}
`

writeFileSync(outFile, body, 'utf8')
console.log(`Đã sinh ${files.length} hình -> ${outFile.replace(root, '.')}`)
