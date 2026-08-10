// Sinh icon PWA (PNG) từ chính hình phong bì của favicon.
//
// Vì sao tự vẽ thay vì thêm thư viện ảnh: dự án này vốn không nuôi
// dependency cho việc chạy một lần (earcon còn tự tổng hợp bằng Web
// Audio thay vì mang theo file âm). Icon là bốn file tĩnh, vẽ xong là
// commit — kéo `sharp` về chỉ để chạy một lần rồi nằm đó là không đáng.
//
// Chạy lại khi đổi logo:  node scripts/make-icons.mjs
//
// Kỹ thuật: rasterize bằng SDF + lấy mẫu 4x4 mỗi pixel (khử răng cưa),
// rồi đóng gói PNG bằng zlib có sẵn của Node. Không phụ thuộc gì thêm.

import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

/** Màu lấy thẳng từ tokens.css (nền tối + xanh nhấn). */
const BG = [0x0d, 0x14, 0x21]
const ACCENT = [0x38, 0xbd, 0xf8]

// ---------------------------------------------------------------
// Hình học: hàm khoảng cách có dấu (âm = nằm trong hình)
// ---------------------------------------------------------------

/** Hình chữ nhật bo góc, tâm (cx, cy), nửa cạnh (hw, hh), bán kính r. */
function sdRoundRect(px, py, cx, cy, hw, hh, r) {
  const dx = Math.abs(px - cx) - (hw - r)
  const dy = Math.abs(py - cy) - (hh - r)
  const ax = Math.max(dx, 0)
  const ay = Math.max(dy, 0)
  return Math.hypot(ax, ay) + Math.min(Math.max(dx, dy), 0) - r
}

/** Đoạn thẳng từ (ax, ay) tới (bx, by). */
function sdSegment(px, py, ax, ay, bx, by) {
  const vx = bx - ax
  const vy = by - ay
  const wx = px - ax
  const wy = py - ay
  const len2 = vx * vx + vy * vy
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, (wx * vx + wy * vy) / len2))
  return Math.hypot(wx - vx * t, wy - vy * t)
}

/**
 * Vẽ dấu NetMaster trong ô vuông `size`.
 *
 * `inset` là tỉ lệ co hình vào giữa: icon `maskable` bị hệ điều hành cắt
 * tròn/bo góc tuỳ máy, nên nội dung phải nằm gọn trong vùng an toàn ~80%
 * ở giữa, nếu không là mất góc phong bì.
 */
function drawIcon(size, inset) {
  const px = new Uint8Array(size * size * 4)
  const S = 4 // lấy mẫu 4x4 mỗi pixel
  const c = size / 2
  const scale = size * inset

  // Phong bì: thân bo góc + nếp gấp chữ V, cùng tỉ lệ với favicon.
  const hw = scale * 0.44
  const hh = scale * 0.3
  const r = scale * 0.06
  const stroke = scale * 0.055
  const foldY0 = c - hh + stroke * 0.9
  const foldY1 = c + hh * 0.18

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let body = 0
      let fold = 0
      for (let sy = 0; sy < S; sy++) {
        for (let sx = 0; sx < S; sx++) {
          const fx = x + (sx + 0.5) / S
          const fy = y + (sy + 0.5) / S
          if (sdRoundRect(fx, fy, c, c, hw, hh, r) <= 0) body++
          const d = Math.min(
            sdSegment(fx, fy, c - hw + stroke, foldY0, c, foldY1),
            sdSegment(fx, fy, c, foldY1, c + hw - stroke, foldY0),
          )
          if (d <= stroke / 2) fold++
        }
      }
      const total = S * S
      const bodyA = body / total
      const foldA = fold / total

      // Nền → thân phong bì (accent) → nếp gấp (màu nền, khoét lên thân).
      let col = [...BG]
      col = mix(col, ACCENT, bodyA)
      col = mix(col, BG, foldA * bodyA)

      const i = (y * size + x) * 4
      px[i] = col[0]
      px[i + 1] = col[1]
      px[i + 2] = col[2]
      px[i + 3] = 255
    }
  }
  return px
}

function mix(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

// ---------------------------------------------------------------
// Đóng gói PNG (zlib của Node, không thư viện ngoài)
// ---------------------------------------------------------------

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buf) {
  let c = 0xffffffff
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

function encodePng(size, rgba) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // truecolour + alpha
  // Mỗi hàng bắt đầu bằng một byte filter (0 = None).
  const raw = Buffer.alloc(size * (size * 4 + 1))
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0
    Buffer.from(rgba.buffer, y * size * 4, size * 4).copy(raw, y * (size * 4 + 1) + 1)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// ---------------------------------------------------------------

mkdirSync(OUT_DIR, { recursive: true })

// `any` để nguyên khổ; `maskable` co vào vùng an toàn 80% vì hệ điều
// hành sẽ cắt viền theo hình dạng riêng của máy.
const FILES = [
  ['icon-192.png', 192, 0.96],
  ['icon-512.png', 512, 0.96],
  ['icon-maskable-192.png', 192, 0.76],
  ['icon-maskable-512.png', 512, 0.76],
  // iOS không nhận SVG cho apple-touch-icon, và cũng không bo góc hộ —
  // nên bản này để nguyên khổ như `any`.
  ['apple-touch-icon.png', 180, 0.92],
]

for (const [name, size, inset] of FILES) {
  writeFileSync(join(OUT_DIR, name), encodePng(size, drawIcon(size, inset)))
  console.log(`${name} — ${size}x${size}`)
}
