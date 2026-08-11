// Chiều NGƯỢC của xưởng vẽ: topology thật trong nội dung -> bản vẽ FossFLOW.
//
// Trước script này luồng chỉ đi một chiều (vẽ tay -> hình trong app), nên
// mỗi bài lab muốn có hình minh họa là phải ngồi đặt lại tọa độ bằng tay,
// và hình với lab lặng lẽ trôi xa nhau mỗi lần sửa nội dung. Giờ máy đọc
// thẳng `spec` của câu lab / ca bệnh rồi dựng sẵn bản vẽ: mở lên là NHÌN
// thấy sơ đồ thay vì đọc mảng JSON.
//
// Chạy: npm run ban-ve:tu-lab
// Vào:  content/modules/*.json  (câu kind 'lab' và kind 'clinic')
// Ra:   content/ban-ve-nhap/*.json
//
// **Ra thư mục NHÁP, không ra thẳng content/ban-ve/** — hai lý do:
//   - Bản máy đặt chỉ xếp theo LOẠI thiết bị, chưa phải bố cục đẹp. Việc
//     của người là mở nó trong xưởng vẽ, kéo lại cho dễ đọc, rồi mới chép
//     sang `content/ban-ve/`. Chép sang xong thì file bên đó là của người,
//     script này không bao giờ đụng vào nữa.
//   - Nếu ghi thẳng, mỗi lần chạy lại sẽ xóa sạch công kéo thả của người.
//
// Bản vẽ của câu LAB có HAI view: đề bài và lời giải. Bộ chuyển hình sinh
// mỗi view một hình, nên một lần kéo thả ra được cặp "lúc chưa nối / lúc
// đã nối" — đúng khuôn bước Khởi động và bước Tổng kết của bài chữa lỗi.

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const moduleDir = join(root, 'content', 'modules')
const outDir = join(root, 'content', 'ban-ve-nhap')

/** Loại thiết bị của engine -> icon của FossFLOW (bộ isoflow nền). */
const ICON = { pc: 'desktop', switch: 'switch-module', router: 'router' }

/** Hàng nào trước sau: router trên, switch giữa, máy trạm dưới. */
const HANG = { router: -4, switch: 0, pc: 4 }

/**
 * Xếp thiết bị lên lưới isometric theo LOẠI.
 *
 * Topology của engine không giữ tọa độ (nó tả mạng, không tả bức tranh),
 * nên phải tự đặt. Xếp theo tầng-loại là cách đoán an toàn nhất: sơ đồ
 * mạng vẽ tay xưa nay vẫn router trên, máy trạm dưới. Đây chỉ là điểm
 * KHỞI ĐẦU cho người kéo lại, không cố làm cho đẹp.
 *
 * Lưới isometric nhận (x, y) chứ không nhận (ngang, dọc), nên đổi hệ:
 * u = x - y là chiều ngang trên màn, v = x + y là chiều dọc. Giữ u và v
 * cùng chẵn để x, y ra số nguyên.
 */
function xepThietBi(devices) {
  const theoLoai = new Map()
  for (const d of devices) {
    const list = theoLoai.get(d.kind) ?? []
    list.push(d)
    theoLoai.set(d.kind, list)
  }

  const tiles = new Map()
  for (const [kind, list] of theoLoai) {
    const v = HANG[kind] ?? 8
    const giua = 6 * Math.floor((list.length - 1) / 2)
    list.forEach((d, i) => {
      const u = 6 * i - giua
      tiles.set(d.id, { x: (u + v) / 2, y: (v - u) / 2 })
    })
  }
  return tiles
}

/**
 * MỤC TIÊU của bài vẽ thành nét chấm.
 *
 * Bản nháp đầu chỉ có dây và thiết bị, nhìn vào không biết bài đòi gì —
 * phải mở JSON đọc `goals`. Giờ mỗi mục tiêu thành một nét CHẤM nối hai
 * đầu nó nói tới, kèm nhãn. Chấm chứ không đứt: nét đứt trong app này đã
 * mang nghĩa "sợi dây không còn dẫn được", còn đây là một lời hứa chứ
 * không phải một sợi dây.
 *
 * Cố ý CHỈ vẽ mục tiêu, KHÔNG vẽ những sợi còn thiếu (lấy solution trừ
 * initial ra là biết ngay) — nói bài đòi gì thì được, chỉ luôn chỗ phải
 * cắm dây là làm hộ bài.
 */
function mucTieuThanhDay(goals) {
  const out = []
  for (const [i, g] of (goals ?? []).entries()) {
    if (g.kind === 'ping' && g.from !== undefined && g.to !== undefined) {
      out.push({
        id: `muc-tieu-${i + 1}`,
        description: g.expect === 'reach' ? 'phải tới' : 'phải KHÔNG tới',
        style: 'DOTTED',
        anchors: [
          { id: `mt${i}-a`, ref: { item: g.from } },
          { id: `mt${i}-b`, ref: { item: g.to } },
        ],
      })
    }
    // Mục tiêu `pathThrough` CỐ Ý không vẽ. Đã thử: nối `from` với thiết bị
    // phải-đi-qua thì sợi nét chấm ấy trông y như một sợi cáp thật (nó nằm
    // đúng chỗ một sợi cáp sẽ nằm), còn nhãn thì rơi ngay cạnh nhãn của
    // chính thiết bị đó — đo trên browser: "phải đi qua" đè "R Đà Nẵng" và
    // đè "Switch-1". Một ràng buộc về ĐƯỜNG ĐI không vẽ được bằng một đoạn
    // thẳng giữa hai đầu; để chữ trong đề bài nói là đủ.
  }
  return out
}

function dungView(id, name, topology, tiles, goals) {
  return {
    id,
    name,
    items: topology.devices.map((d) => ({ id: d.id, tile: tiles.get(d.id) })),
    connectors: [
      ...(topology.links ?? []).map((l, i) => ({
        id: `day-${i + 1}`,
        anchors: [
          { id: `${l.id ?? i}-a`, ref: { item: l.a.deviceId } },
          { id: `${l.id ?? i}-b`, ref: { item: l.b.deviceId } },
        ],
      })),
      ...mucTieuThanhDay(goals),
    ],
  }
}

/** Mọi thiết bị xuất hiện ở BẤT KỲ view nào — items là danh sách chung. */
function gomThietBi(topologies) {
  const seen = new Map()
  for (const t of topologies) {
    for (const d of t.devices) {
      if (seen.has(d.id)) continue
      seen.set(d.id, {
        id: d.id,
        name: d.hostname ?? d.id,
        description: d.hostname ?? d.id,
        icon: ICON[d.kind] ?? 'block',
      })
    }
  }
  return [...seen.values()]
}

/** Duyệt cây nội dung tìm mọi câu có `kind` cho trước. */
function timCau(node, kind, out = []) {
  if (node === null || typeof node !== 'object') return out
  if (node.kind === kind && typeof node.id === 'string') out.push(node)
  for (const value of Object.values(node)) timCau(value, kind, out)
  return out
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const files = readdirSync(moduleDir).filter((f) => f.endsWith('.json')).sort()
let soBanVe = 0

for (const file of files) {
  const mod = JSON.parse(readFileSync(join(moduleDir, file), 'utf8'))

  for (const q of timCau(mod, 'lab')) {
    const dau = q.spec?.initial
    const giai = q.spec?.solution
    if (dau === undefined) continue
    const tiles = xepThietBi(giai?.devices ?? dau.devices)
    // Mục tiêu chỉ vẽ ở view ĐỀ BÀI. View lời giải là lúc đã xong — treo
    // thêm lời hứa lên đó chỉ làm rối cái hình vốn để ngắm thành quả.
    const views = [dungView('de-bai', 'Đề bài', dau, tiles, q.spec?.goals)]
    if (giai !== undefined) views.push(dungView('loi-giai', 'Lời giải', giai, tiles, undefined))
    const banVe = {
      title: `Lab ${q.id} (${mod.id})`,
      nguon: { loai: 'lab', cauId: q.id, moduleId: mod.id },
      description: `Máy dựng từ spec của câu lab "${q.id}". Kéo lại cho dễ đọc rồi chép sang content/ban-ve/ — chép xong thì file bên đó là của bạn, chạy lại script này không đụng tới nữa.`,
      icons: [],
      colors: [],
      items: gomThietBi([dau, ...(giai === undefined ? [] : [giai])]),
      views,
      fitToScreen: true,
    }
    writeFileSync(join(outDir, `lab-${q.id}.json`), `${JSON.stringify(banVe, null, 2)}\n`, 'utf8')
    console.log(`  ${file}: lab ${q.id} -> lab-${q.id}.json (${views.length} view)`)
    soBanVe += 1
  }

  for (const q of timCau(mod, 'clinic')) {
    // Ca bệnh giấu mạng sâu hơn câu lab một tầng: `spec.patient.topology`,
    // vì bệnh nhân còn mang theo `overlay` (triệu chứng phủ lên mạng) và
    // `seatId`. Ca nào chữa bằng tay thì `spec.fix` chỉ tả MỤC TIÊU, không
    // tả mạng sau khi sửa — nên ca bệnh chỉ có một view: lúc mới vào khám.
    const topo = q.spec?.patient?.topology
    if (topo === undefined) continue
    const tiles = xepThietBi(topo.devices)
    const banVe = {
      title: `Ca bệnh ${q.id} (${mod.id})`,
      nguon: { loai: 'clinic', cauId: q.id, moduleId: mod.id },
      description: `Máy dựng từ topology của ca bệnh "${q.id}" — hiện trạng lúc bệnh nhân vào phòng khám. Kéo lại cho dễ đọc rồi chép sang content/ban-ve/.`,
      icons: [],
      colors: [],
      items: gomThietBi([topo]),
      views: [dungView('hien-trang', 'Hiện trạng', topo, tiles, undefined)],
      fitToScreen: true,
    }
    writeFileSync(join(outDir, `ca-benh-${q.id}.json`), `${JSON.stringify(banVe, null, 2)}\n`, 'utf8')
    console.log(`  ${file}: ca bệnh ${q.id} -> ca-benh-${q.id}.json`)
    soBanVe += 1
  }
}

if (soBanVe === 0) throw new Error('Không dựng được bản vẽ nào — nội dung có câu lab/clinic nào không?')
console.log(`Đã dựng ${soBanVe} bản vẽ nháp -> ${outDir.replace(root, '.')}`)
