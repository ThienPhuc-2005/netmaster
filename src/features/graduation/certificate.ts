// Giấy chứng nhận tải được (kho ý tưởng H1) — vẽ thẳng lên canvas rồi
// xuất PNG, KHÔNG backend, KHÔNG thêm thư viện.
//
// Vì sao đáng có: màn tốt nghiệp là tấm gương, nhưng tấm gương không đem
// đi được. Một tấm ảnh thì đem khoe được — mà vẫn không phá luật
// "không cộng XP": tờ giấy này chỉ CHÉP LẠI những con số đã có, không
// sinh ra điểm nào.
//
// Hai quyết định về hình thức, khai ra để sau khỏi tưởng là bỏ sót:
//   1. Tờ giấy luôn NỀN SÁNG, kể cả khi app đang ở theme tối — thứ này
//      để gửi đi và để in, mà nền tối thì ngốn mực và ám xám khi in.
//      Bảng màu dưới đây chép đúng nhánh sáng của tokens.css.
//   2. Tên người học là Ô NHẬP TẠI CHỖ, không lưu vào store: app này
//      chưa bao giờ hỏi tên ai, và thêm một trường persist chỉ để in một
//      dòng chữ là đổi hình dạng dữ liệu cho một việc dùng một lần.
//
// Tách làm hai tầng có chủ đích: `buildCertificate` THUẦN (soạn nội dung,
// test được trong jsdom) và `drawCertificate` (chỉ đặt bút vẽ). Nội dung
// sai thì test bắt; nét vẽ thì phải nhìn bằng mắt.

export interface CertificateStat {
  label: string
  value: string
}

/** Một hàng của bản đồ hành trình trên giấy: Phần nào, đậu mấy ô. */
export interface CertificateRow {
  part: string
  total: number
  passed: number
}

export interface CertificateSpec {
  appName: string
  title: string
  /** Tên in trên giấy — null khi người học để trống ô nhập. */
  learnerName: string | null
  intro: string
  stats: CertificateStat[]
  rows: CertificateRow[]
  footer: string
  /** Tên file lúc tải về. */
  fileName: string
}

export interface CertificateInput {
  appName: string
  title: string
  learnerName: string
  intro: string
  stats: CertificateStat[]
  rows: CertificateRow[]
  footer: string
  milestoneId: string
  issuedOn: string
}

/**
 * Soạn nội dung tờ giấy. Thuần: cùng dữ liệu vào thì cùng tờ giấy ra.
 *
 * Tên người học được cắt khoảng trắng hai đầu và chặn ở 40 ký tự — dài
 * hơn thế là tràn khung giấy, mà cắt lúc VẼ thì người nhập không hiểu vì
 * sao chữ mất; cắt ở đây để phần vẽ chỉ còn việc vẽ.
 */
export function buildCertificate(input: CertificateInput): CertificateSpec {
  const name = input.learnerName.trim().replace(/\s+/g, ' ').slice(0, 40)
  return {
    appName: input.appName,
    title: input.title,
    learnerName: name === '' ? null : name,
    intro: input.intro,
    stats: input.stats,
    rows: input.rows,
    footer: input.footer,
    fileName: `netmaster-${input.milestoneId}-${input.issuedOn}.png`,
  }
}

// Bảng màu = nhánh SÁNG của tokens.css (xem ghi chú đầu file).
const PAPER = '#ffffff'
const INK = '#17202b'
const INK_MUTED = '#51637a'
const ACCENT = '#0369a1'
const EDGE = '#d5dde6'
const PART_COLOR: Record<string, string> = {
  A: '#0369a1',
  B: '#0f766e',
  C: '#c2410c',
  D: '#7e22ce',
  E: '#4d7c0f',
}

export const CERT_WIDTH = 1200
export const CERT_HEIGHT = 850

const UI_FONT = "'Be Vietnam Pro', 'Segoe UI', system-ui, sans-serif"
const MONO_FONT = "'JetBrains Mono', Consolas, monospace"

/** Cắt một đoạn thành các dòng vừa bề ngang — canvas không tự xuống dòng. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const next = line === '' ? word : `${line} ${word}`
    if (ctx.measureText(next).width > maxWidth && line !== '') {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line !== '') lines.push(line)
  return lines
}

/**
 * Vẽ tờ giấy lên canvas đã cho (canvas tự đặt kích thước theo CERT_*).
 * Ném lỗi khi trình duyệt không cấp được ngữ cảnh 2D — UI bắt lỗi đó và
 * nói bằng tiếng người, không để nút bấm im lìm.
 */
export function drawCertificate(canvas: HTMLCanvasElement, spec: CertificateSpec): void {
  canvas.width = CERT_WIDTH
  canvas.height = CERT_HEIGHT
  const ctx = canvas.getContext('2d')
  if (ctx === null) throw new Error('Không mở được ngữ cảnh 2D của canvas')

  ctx.fillStyle = PAPER
  ctx.fillRect(0, 0, CERT_WIDTH, CERT_HEIGHT)

  // Khung kép: nét ngoài mảnh màu viền, nét trong đậm màu nhấn.
  ctx.strokeStyle = EDGE
  ctx.lineWidth = 2
  ctx.strokeRect(24, 24, CERT_WIDTH - 48, CERT_HEIGHT - 48)
  ctx.strokeStyle = ACCENT
  ctx.lineWidth = 4
  ctx.strokeRect(40, 40, CERT_WIDTH - 80, CERT_HEIGHT - 80)

  ctx.textBaseline = 'alphabetic'
  ctx.textAlign = 'center'
  const mid = CERT_WIDTH / 2

  ctx.fillStyle = ACCENT
  ctx.font = `600 22px ${MONO_FONT}`
  ctx.fillText(spec.appName.toUpperCase(), mid, 112)

  ctx.fillStyle = INK
  ctx.font = `700 46px ${UI_FONT}`
  ctx.fillText(spec.title, mid, 176)

  let y = 236
  if (spec.learnerName !== null) {
    ctx.fillStyle = INK
    ctx.font = `600 40px ${UI_FONT}`
    ctx.fillText(spec.learnerName, mid, y)
    // Gạch chân dưới tên, co theo bề ngang chữ — dòng tên là tâm tờ giấy.
    const width = Math.min(ctx.measureText(spec.learnerName).width + 80, CERT_WIDTH - 240)
    ctx.strokeStyle = EDGE
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(mid - width / 2, y + 16)
    ctx.lineTo(mid + width / 2, y + 16)
    ctx.stroke()
    y += 72
  }

  ctx.fillStyle = INK_MUTED
  ctx.font = `400 21px ${UI_FONT}`
  for (const line of wrap(ctx, spec.intro, CERT_WIDTH - 300)) {
    ctx.fillText(line, mid, y)
    y += 32
  }

  // Bản đồ hành trình: mỗi Phần một hàng ô, ô đặc là module đã đậu —
  // đúng thứ đang hiện trên màn tốt nghiệp, chỉ đổi sang nét canvas.
  const cell = 22
  const gap = 6
  const widest = Math.max(...spec.rows.map((r) => r.total))
  const mapWidth = widest * cell + (widest - 1) * gap
  const mapLeft = mid - mapWidth / 2
  let mapY = y + 26
  ctx.textAlign = 'left'
  for (const row of spec.rows) {
    const color = PART_COLOR[row.part] ?? INK_MUTED
    for (let i = 0; i < row.total; i += 1) {
      const x = mapLeft + i * (cell + gap)
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      if (i < row.passed) {
        ctx.fillStyle = color
        ctx.fillRect(x, mapY, cell, cell)
      } else {
        ctx.strokeRect(x, mapY, cell, cell)
      }
    }
    ctx.fillStyle = color
    ctx.font = `500 15px ${MONO_FONT}`
    ctx.fillText(row.part, mapLeft + mapWidth + 16, mapY + cell - 5)
    mapY += cell + gap
  }

  // Bảng số liệu: chia đều bề ngang, số to trên nhãn nhỏ.
  const statsY = mapY + 76
  const columnWidth = (CERT_WIDTH - 240) / spec.stats.length
  ctx.textAlign = 'center'
  spec.stats.forEach((stat, i) => {
    const x = 120 + columnWidth * (i + 0.5)
    ctx.fillStyle = INK
    ctx.font = `700 34px ${MONO_FONT}`
    ctx.fillText(stat.value, x, statsY)
    ctx.fillStyle = INK_MUTED
    ctx.font = `400 15px ${UI_FONT}`
    ctx.fillText(stat.label, x, statsY + 26)
  })

  ctx.fillStyle = INK_MUTED
  ctx.font = `400 16px ${UI_FONT}`
  ctx.fillText(spec.footer, mid, CERT_HEIGHT - 70)
}

/** Vẽ rồi trả về PNG. Tách khỏi việc tải xuống để test/soi được riêng. */
export async function certificateBlob(spec: CertificateSpec): Promise<Blob> {
  const canvas = document.createElement('canvas')
  drawCertificate(canvas, spec)
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob === null) reject(new Error('Không xuất được ảnh PNG từ canvas'))
      else resolve(blob)
    }, 'image/png')
  })
}

/** Xuất PNG rồi đưa xuống máy người học. */
export async function downloadCertificate(spec: CertificateSpec): Promise<void> {
  const blob = await certificateBlob(spec)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = spec.fileName
  link.click()
  URL.revokeObjectURL(url)
}
