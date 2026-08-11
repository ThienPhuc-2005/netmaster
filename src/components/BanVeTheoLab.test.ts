// Bản vẽ đã kéo tay có TRÔI XA nội dung lab không?
//
// `npm run ban-ve:tu-lab` dựng bản vẽ từ spec của câu lab, người kéo lại
// cho đẹp rồi chép sang `content/ban-ve/`. Từ giây phút chép sang đó, hai
// bên sống hai đời: sửa topology của lab thì hình KHÔNG đổi theo, và không
// ai biết — đúng cái bệnh mà việc "lab tự sinh ra bản vẽ" sinh ra để chữa,
// nhưng mới chữa được một nửa.
//
// Nửa còn lại nằm ở đây. Bản vẽ nào mang dấu `nguon` thì test này đối
// chiếu THIẾT BỊ và DÂY của nó với chính câu lab đang có trong nội dung.
//
// Cố ý KHÔNG so tọa độ: kéo thả là việc của người, dời một nút không phải
// là trôi. Chỉ so thứ thuộc về NỘI DUNG — có những máy nào, nối với ai.

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const BAN_VE_DIR = join(process.cwd(), 'content', 'ban-ve')
const MODULE_DIR = join(process.cwd(), 'content', 'modules')

interface Nguon {
  loai: 'lab' | 'clinic'
  cauId: string
  moduleId: string
}

interface BanVe {
  nguon?: Nguon
  items: { id: string }[]
  views: { id: string; items: { id: string }[]; connectors?: { anchors: { ref?: { item?: string } }[] }[] }[]
}

interface Topology {
  devices: { id: string }[]
  links?: { a: { deviceId: string }; b: { deviceId: string } }[]
}

function doc(file: string): BanVe {
  return JSON.parse(readFileSync(join(BAN_VE_DIR, file), 'utf8')) as BanVe
}

/** Duyệt cây nội dung tìm câu hỏi theo id. */
function timCau(node: unknown, cauId: string): Record<string, unknown> | null {
  if (node === null || typeof node !== 'object') return null
  const obj = node as Record<string, unknown>
  if (obj['id'] === cauId && typeof obj['kind'] === 'string') return obj
  for (const value of Object.values(obj)) {
    const found = timCau(value, cauId)
    if (found !== null) return found
  }
  return null
}

function docCau(cauId: string): Record<string, unknown> {
  for (const f of readdirSync(MODULE_DIR).filter((x) => x.endsWith('.json'))) {
    const mod: unknown = JSON.parse(readFileSync(join(MODULE_DIR, f), 'utf8'))
    const found = timCau(mod, cauId)
    if (found !== null) return found
  }
  throw new Error(`Bản vẽ khai nguồn là câu "${cauId}" nhưng nội dung không còn câu đó`)
}

/** Cặp thiết bị của một sợi dây, sắp xếp để so được không cần đúng chiều. */
function capDay(a: string, b: string): string {
  return [a, b].sort().join('~')
}

function dayCuaView(view: BanVe['views'][number]): Set<string> {
  const out = new Set<string>()
  for (const c of view.connectors ?? []) {
    const ids = c.anchors.map((x) => x.ref?.item).filter((x): x is string => x !== undefined)
    if (ids.length >= 2) out.add(capDay(ids[0]!, ids[ids.length - 1]!))
  }
  return out
}

function dayCuaTopology(topo: Topology): Set<string> {
  return new Set((topo.links ?? []).map((l) => capDay(l.a.deviceId, l.b.deviceId)))
}

const files = readdirSync(BAN_VE_DIR).filter((f) => f.endsWith('.json'))
const theoLab = files.filter((f) => doc(f).nguon !== undefined)

describe('bản vẽ vẽ từ lab không được trôi xa nội dung', () => {
  it('có ít nhất một bản vẽ mang dấu nguồn (test này không rỗng một cách vô nghĩa)', () => {
    expect(theoLab.length).toBeGreaterThan(0)
  })

  it.each(theoLab)('%s: đủ đúng những thiết bị mà câu hỏi đang có', (file) => {
    const banVe = doc(file)
    const nguon = banVe.nguon!
    const cau = docCau(nguon.cauId)
    const spec = cau['spec'] as Record<string, unknown>
    const topo = (
      nguon.loai === 'lab'
        ? ((spec['solution'] ?? spec['initial']) as Topology)
        : ((spec['patient'] as Record<string, unknown>)['topology'] as Topology)
    )

    const trongBanVe = [...banVe.items.map((i) => i.id)].sort()
    const trongNoiDung = [...topo.devices.map((d) => d.id)].sort()
    expect(trongBanVe, `thiết bị lệch — chạy lại npm run ban-ve:tu-lab rồi chép lại`).toEqual(trongNoiDung)
  })

  it.each(theoLab)('%s: dây trong hình đúng bằng dây của lab (bỏ qua nét mục tiêu)', (file) => {
    const banVe = doc(file)
    const nguon = banVe.nguon!
    if (nguon.loai !== 'lab') return
    const spec = docCau(nguon.cauId)['spec'] as Record<string, unknown>

    for (const [viewId, topo] of [
      ['de-bai', spec['initial'] as Topology],
      ['loi-giai', spec['solution'] as Topology | undefined],
    ] as const) {
      if (topo === undefined) continue
      const view = banVe.views.find((v) => v.id === viewId)
      if (view === undefined) continue
      // Nét MỤC TIÊU cũng là connector nhưng không phải dây thật — nó nối
      // hai đầu mà bài đòi ping tới, mà hai đầu ấy hầu như không bao giờ
      // cắm thẳng vào nhau. Nhận ra nó bằng id, không bằng kiểu nét: người
      // kéo tay hoàn toàn có thể đổi nét của một sợi dây thật.
      const chiDayThat = dayCuaView({
        ...view,
        connectors: (view.connectors ?? []).filter(
          (c) => !String((c as { id?: string }).id ?? '').startsWith('muc-tieu'),
        ),
      })
      expect([...chiDayThat].sort(), `view "${viewId}" của ${file} lệch dây so với lab`).toEqual(
        [...dayCuaTopology(topo)].sort(),
      )
    }
  })
})
