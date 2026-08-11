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
import { execFileSync } from 'node:child_process'
// Luật rút gọn nhãn ở file riêng để test import được — file này chạy ngay
// khi import nên không đưa vào test được.
import { NHAN_DAI, rutGonNhan } from './rut-gon-nhan.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const moduleDir = join(root, 'content', 'modules')
const outDir = join(root, 'content', 'ban-ve-nhap')
const banVeDir = join(root, 'content', 'ban-ve')

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

// ---------------------------------------------------------------
// Chép thẳng sang content/ban-ve/ (tùy chọn)
// ---------------------------------------------------------------

/**
 * `--chep <cauId> [--ten <slug>]` — chép luôn bản vẽ của MỘT câu sang
 * `content/ban-ve/`, tức là đưa nó vào app.
 *
 * Vì sao phải GỌI TÊN từng câu chứ không chép tất: nội dung có 29 câu
 * lab/ca bệnh, chép hết là 29 hình nằm trong gói app mà không bài nào dùng.
 * Quyết định "bài này đáng có hình" là của người, không của script.
 *
 * Ba việc script làm hộ, đúng ba việc phải làm bằng tay ba lần liền:
 *   1. Gỡ nét MỤC TIÊU — nó chỉ sống trong bản nháp (xem GHI-CHU mục 10).
 *   2. Bỏ view thứ hai nếu sau khi gỡ nó trùng khít view đầu — lab đổi
 *      ĐỊA CHỈ (không đổi dây) thì đề bài và lời giải là một bức tranh.
 *   3. Nhắc rút gọn nhãn nào quá dài, vì khung 220x130 không co chữ.
 *
 * KHÔNG BAO GIỜ GHI ĐÈ: file bên `content/ban-ve/` là công kéo thả của
 * người, đè lên là xóa mất mà không ai biết.
 */
function docThamSo(argv) {
  const out = { chep: [], ten: null }
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--chep' && argv[i + 1] !== undefined) out.chep.push(argv[i + 1])
    if (argv[i] === '--ten' && argv[i + 1] !== undefined) out.ten = argv[i + 1]
  }
  if (out.ten !== null && out.chep.length !== 1) {
    throw new Error('--ten chỉ dùng được khi chép ĐÚNG MỘT câu')
  }
  return out
}

/** Dây của một view, bỏ nét mục tiêu, sắp xếp để so hai view với nhau. */
function vanTayCuaView(view) {
  return JSON.stringify(
    (view.connectors ?? [])
      .filter((c) => !String(c.id).startsWith('muc-tieu'))
      .map((c) => [c.anchors[0].ref.item, c.anchors[c.anchors.length - 1].ref.item].sort().join('~'))
      .sort(),
  )
}

function chuanBiChep(banVe) {
  const ban = JSON.parse(JSON.stringify(banVe))
  for (const v of ban.views) {
    v.connectors = (v.connectors ?? []).filter((c) => !String(c.id).startsWith('muc-tieu'))
  }
  const trung = ban.views.length === 2 && vanTayCuaView(ban.views[0]) === vanTayCuaView(ban.views[1])
  if (trung) ban.views = [ban.views[0]]

  // Chỉ đổi `description` (cái nhãn vẽ lên hình), KHÔNG đụng `name` — tên
  // đầy đủ ở lại làm nguồn sự thật, và là thứ để đối chiếu về sau.
  const goc = ban.items.map((it) => it.description ?? it.name)
  const gon = rutGonNhan(goc)
  const daDoi = []
  const conDai = []
  ban.items.forEach((it, i) => {
    if (gon[i] !== goc[i]) daDoi.push([goc[i], gon[i]])
    else if (goc[i].length > NHAN_DAI) conDai.push(goc[i])
    it.description = gon[i]
  })
  return { ban, boViewTrung: trung, daDoi, conDai }
}

function chep(banVe, slug) {
  const dich = join(banVeDir, `${slug}.json`)
  if (existsSync(dich)) {
    throw new Error(
      `Đã có content/ban-ve/${slug}.json — script không ghi đè công kéo thả của bạn. Xóa file đó trước, hoặc đặt --ten khác.`,
    )
  }
  const { ban, boViewTrung, daDoi, conDai } = chuanBiChep(banVe)
  ban.description = `${ban.description} ĐÃ CHÉP tự động: gỡ nét mục tiêu${boViewTrung ? ', bỏ view thứ hai vì trùng view đầu' : ''}${daDoi.length > 0 ? `, rút gọn ${daDoi.length} nhãn` : ''}. Tên đầy đủ vẫn nằm ở trường name.`
  writeFileSync(dich, `${JSON.stringify(ban, null, 2)}\n`, 'utf8')
  console.log(`  => chép sang content/ban-ve/${slug}.json (${ban.views.length} view)`)
  if (boViewTrung) console.log('     · bỏ view thứ hai: sau khi gỡ nét mục tiêu nó trùng khít view đầu')
  // In ra TỪNG chỗ đã đổi: máy không biết "KyThuat" đọc là "kỹ thuật", nên
  // người phải soi lại được cái nó vừa làm.
  for (const [truoc, sau] of daDoi) console.log(`     · rút nhãn "${truoc}" -> "${sau}"`)
  for (const nhan of conDai) {
    console.log(`     ! nhãn "${nhan}" dài ${nhan.length} ký tự mà rút thì TRÙNG nhãn khác — sửa tay`)
  }
  console.log('     · mở trong xưởng vẽ kéo lại cho dễ đọc, rồi chạy npm run visuals:isometric')
}

const thamSo = docThamSo(process.argv.slice(2))
const canChep = new Set(thamSo.chep)
const daChep = new Set()

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
    if (canChep.has(q.id)) {
      chep(banVe, thamSo.ten ?? `lab-${q.id}`)
      daChep.add(q.id)
    }
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
    if (canChep.has(q.id)) {
      chep(banVe, thamSo.ten ?? `ca-benh-${q.id}`)
      daChep.add(q.id)
    }
  }
}

if (soBanVe === 0) throw new Error('Không dựng được bản vẽ nào — nội dung có câu lab/clinic nào không?')

// Gõ nhầm id thì phải biết ngay, đừng để script chạy xong êm ru mà không
// chép gì cả.
const khongThay = [...canChep].filter((id) => !daChep.has(id))
if (khongThay.length > 0) {
  throw new Error(`Không tìm thấy câu lab/ca bệnh nào tên: ${khongThay.join(', ')}`)
}
console.log(`Đã dựng ${soBanVe} bản vẽ nháp -> ${outDir.replace(root, '.')}`)

// Chép xong thì sinh hình luôn — chép mà không sinh thì bản vẽ nằm trong
// `content/ban-ve/` nhưng app chưa thấy hình nào, và người dễ tưởng lệnh
// chạy hỏng. CHỈ chạy khi thật sự có chép: lần chạy thường chỉ dựng nháp,
// không có lý do gì đụng vào file hình đang yên.
if (daChep.size > 0) {
  console.log('')
  execFileSync(process.execPath, [join(root, 'scripts', 'isometric-tu-ban-ve.mjs')], {
    stdio: 'inherit',
  })
}
