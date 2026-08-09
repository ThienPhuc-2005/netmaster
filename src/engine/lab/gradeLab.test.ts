import { describe, expect, it } from 'vitest'
import { devicesReferencedBy, diagnose, gradeLab, isLabSolved, type LabSpec } from './gradeLab'
import { findDevice, type Topology } from './topology'
import {
  MAC,
  ONLY_VLAN_ALLOWANCE,
  flatNetwork,
  loopedNetwork,
  looseParts,
  routedNetwork,
  splitVlanNetwork,
  teamsAllOneVlan,
  teamsFixed,
  teamsNetwork,
  unwiredParts,
  vlanRepairLab,
  wiredUp,
  wiringLab,
  trunkHealthy,
  trunkLab,
  trunkNativeMismatch,
  threeRouterRing,
} from '../../../tests/fixtures/labFixture'

describe('chấm bài "sửa VLAN"', () => {
  it('lời giải đúng thì đạt', () => {
    expect(isLabSolved(vlanRepairLab(), teamsFixed())).toBe(true)
  })

  it('sơ đồ đề bài chưa đạt — người học có việc để làm', () => {
    expect(isLabSolved(vlanRepairLab(), teamsNetwork())).toBe(false)
  })

  it('LỜI GIẢI RẺ TIỀN gộp hết vào một VLAN thì TRƯỢT', () => {
    // Thông được A↔B nhưng cũng thông luôn A↔C — phá mất yêu cầu tách
    // phòng ban. Đây chính là lý do đề bài phải có mục tiêu "blocked".
    const spec = vlanRepairLab()
    const evaluation = gradeLab(spec, teamsAllOneVlan())
    expect(evaluation.passed).toBe(false)
    const blocked = evaluation.goals.find((g) => g.goal.kind === 'ping' && g.goal.expect === 'blocked')
    expect(blocked?.met).toBe(false)
    const reach = evaluation.goals.find((g) => g.goal.kind === 'ping' && g.goal.expect === 'reach')
    expect(reach?.met).toBe(true)
  })

  it('rút hết dây cũng trượt — "chặn" một mình không phải lời giải', () => {
    const topo = teamsNetwork()
    topo.links = []
    expect(isLabSolved(vlanRepairLab(), topo)).toBe(false)
  })

  it('mọi mục tiêu phải đạt (AND), không tính điểm từng phần', () => {
    const evaluation = gradeLab(vlanRepairLab(), teamsNetwork())
    expect(evaluation.goals.some((g) => g.met)).toBe(true)
    expect(evaluation.goals.every((g) => g.met)).toBe(false)
    expect(evaluation.passed).toBe(false)
  })

  it('trả kèm kết quả mô phỏng để UI phát lại trên sơ đồ người học', () => {
    const evaluation = gradeLab(vlanRepairLab(), teamsNetwork())
    expect(evaluation.runs).toHaveLength(2)
    expect(evaluation.runs[0]?.stages.length).toBeGreaterThan(0)
  })

  it('goal hỏng mang theo mã lý do để nói cho người học biết bệnh gì', () => {
    const evaluation = gradeLab(vlanRepairLab(), teamsNetwork())
    const reach = evaluation.goals.find((g) => g.goal.kind === 'ping' && g.goal.expect === 'reach')
    expect(reach?.failure).toBe('arp-unresolved')
  })
})

describe('chấm bài "lắp mạng từ thiết bị rời"', () => {
  it('cắm đúng hai dây là xong', () => {
    expect(isLabSolved(wiringLab(), wiredUp())).toBe(true)
  })

  it('chưa cắm dây thì chưa đạt', () => {
    expect(isLabSolved(wiringLab(), unwiredParts())).toBe(false)
  })

  it('pathThrough chặn lời giải nối thẳng hai máy vào nhau', () => {
    const topo = unwiredParts()
    topo.links = [{ id: 'w1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'pc-b', portId: 'eth0' } }]
    const evaluation = gradeLab(wiringLab(), topo)
    const ping = evaluation.goals.find((g) => g.goal.kind === 'ping')
    const path = evaluation.goals.find((g) => g.goal.kind === 'pathThrough')
    expect(ping?.met).toBe(true) // hai máy nối thẳng thì vẫn ping được...
    expect(path?.met).toBe(false) // ...nhưng không đi qua switch nên trượt
    expect(evaluation.passed).toBe(false)
  })

  it('macLearned đạt khi switch học đúng máy ở đúng cổng', () => {
    const evaluation = gradeLab(wiringLab(), wiredUp())
    expect(evaluation.goals.find((g) => g.goal.kind === 'macLearned')?.met).toBe(true)
  })

  it('cắm nhầm cổng: ping vẫn thông nhưng mục tiêu bảng MAC trượt', () => {
    const topo = unwiredParts()
    topo.links = [
      { id: 'w1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p3' } },
      { id: 'w2', a: { deviceId: 'pc-b', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p2' } },
    ]
    const evaluation = gradeLab(wiringLab(), topo)
    expect(evaluation.goals.find((g) => g.goal.kind === 'ping')?.met).toBe(true)
    expect(evaluation.goals.find((g) => g.goal.kind === 'macLearned')?.met).toBe(false)
  })
})

describe('mục tiêu về ARP', () => {
  const arpLab = (): LabSpec => ({
    initial: unwiredParts(),
    goals: [
      { kind: 'ping', from: 'pc-a', to: 'pc-b', expect: 'reach' },
      { kind: 'arpResolved', deviceId: 'pc-a', ip: '192.168.1.20', mac: MAC.pcB },
    ],
    allow: { ...ONLY_VLAN_ALLOWANCE, setVlan: false, addLinks: true, removeLinks: true },
    solution: wiredUp(),
  })

  it('đạt khi máy đã nhớ được địa chỉ vật lý của máy kia', () => {
    expect(gradeLab(arpLab(), wiredUp()).goals.at(-1)?.met).toBe(true)
  })

  it('không đạt khi mạng chưa nối nên chưa hỏi được ai', () => {
    expect(gradeLab(arpLab(), unwiredParts()).goals.at(-1)?.met).toBe(false)
  })
})

describe('chẩn đoán tĩnh (nguyên liệu cho phản hồi tầng 1-2)', () => {
  const reachAB = [{ kind: 'ping', from: 'pc-a', to: 'pc-b', expect: 'reach' }] as const

  it('mạng lành thì không có chẩn đoán nào', () => {
    expect(diagnose(flatNetwork(), reachAB)).toEqual([])
  })

  it('thiết bị chưa cắm dây', () => {
    expect(diagnose(looseParts(), reachAB)).toContain('device-isolated')
  })

  it('máy chưa có địa chỉ IP', () => {
    const topo = flatNetwork()
    const pcA = findDevice(topo, 'pc-a')!
    if (pcA.kind === 'pc') pcA.ipConfig = null
    expect(diagnose(topo, reachAB)).toContain('missing-ip')
  })

  it('đề đòi ping sang dải khác mà máy chưa có gateway', () => {
    const topo = routedNetwork()
    const pcA = findDevice(topo, 'pc-a')!
    if (pcA.kind === 'pc') pcA.gateway = null
    expect(diagnose(topo, reachAB)).toContain('missing-gateway')
  })

  it('cùng dải thì KHÔNG nhắc gateway (mạng phẳng không cần)', () => {
    expect(diagnose(flatNetwork(), reachAB)).not.toContain('missing-gateway')
  })

  it('gateway ghi ngoài dải của máy — bệnh tuyệt đối, không cần mục tiêu', () => {
    const topo = routedNetwork()
    const pcA = findDevice(topo, 'pc-a')!
    if (pcA.kind === 'pc') pcA.gateway = '10.9.9.1'
    expect(diagnose(topo, [])).toContain('gateway-not-in-subnet')
  })

  it('hai máy trùng địa chỉ IP', () => {
    const topo = flatNetwork()
    const pcB = findDevice(topo, 'pc-b')!
    if (pcB.kind === 'pc') pcB.ipConfig = { ip: '192.168.1.10', prefix: 24 }
    expect(diagnose(topo, [])).toContain('duplicate-ip')
  })

  it('dây nối hai cổng switch khác VLAN', () => {
    const topo: Topology = {
      devices: [
        { kind: 'switch', id: 'sw-1', hostname: 'S1', ports: [{ id: 'p1', vlan: 10 }] },
        { kind: 'switch', id: 'sw-2', hostname: 'S2', ports: [{ id: 'p1', vlan: 20 }] },
      ],
      links: [{ id: 'l1', a: { deviceId: 'sw-1', portId: 'p1' }, b: { deviceId: 'sw-2', portId: 'p1' } }],
    }
    expect(diagnose(topo, [])).toContain('vlan-mismatch-on-link')
  })

  it('CA CHÍNH: đề đòi hai máy phải thông mà chúng khác VLAN', () => {
    expect(diagnose(splitVlanNetwork(), reachAB)).toContain('same-subnet-different-vlan')
    expect(diagnose(teamsNetwork(), vlanRepairLab().goals)).toContain('same-subnet-different-vlan')
  })

  it('sửa VLAN xong thì chẩn đoán đó biến mất', () => {
    expect(diagnose(teamsFixed(), vlanRepairLab().goals)).not.toContain('same-subnet-different-vlan')
  })

  it('KHÔNG kêu oan: hai VLAN khác nhau mà đề bài CỐ Ý muốn tách thì im lặng', () => {
    // Trong bài chia phòng ban, A và C nằm hai VLAN là đúng thiết kế.
    // Chẩn đoán chỉ được nêu cho cặp máy mà đề đòi phải thông nhau.
    const separateOnly = [{ kind: 'ping', from: 'pc-a', to: 'pc-c', expect: 'blocked' }] as const
    expect(diagnose(teamsNetwork(), separateOnly)).not.toContain('same-subnet-different-vlan')
  })

  it('mạng vòng', () => {
    expect(diagnose(loopedNetwork(), [])).toContain('l2-loop')
    expect(diagnose(flatNetwork(), [])).not.toContain('l2-loop')
  })

  it('vòng ĐI QUA ROUTER không phải vòng lặp tầng 2', () => {
    // Ba router nối vòng là đường DỰ PHÒNG — cả Module 16 dựng lên để
    // khen nó. Router chặn khung quảng bá nên vòng đó không sinh bão;
    // báo "sơ đồ có vòng kín giữa các switch" ở đây là chỉ sai hướng.
    expect(diagnose(threeRouterRing({}), [])).not.toContain('l2-loop')
  })

  it('chẩn đoán vẫn có kể cả khi mọi mục tiêu đều trượt', () => {
    const evaluation = gradeLab(vlanRepairLab(), teamsNetwork())
    expect(evaluation.passed).toBe(false)
    expect(evaluation.diagnosis).toContain('same-subnet-different-vlan')
  })
})

describe('hợp đồng của bộ chấm', () => {
  it('không mutate sơ đồ người học lẫn đề bài', () => {
    const spec = vlanRepairLab()
    const learner = teamsNetwork()
    const specBefore = JSON.stringify(spec)
    const learnerBefore = JSON.stringify(learner)
    gradeLab(spec, learner)
    expect(JSON.stringify(spec)).toBe(specBefore)
    expect(JSON.stringify(learner)).toBe(learnerBefore)
  })

  it('chấm hai lần cho kết quả y hệt (tất định)', () => {
    const spec = vlanRepairLab()
    const a = gradeLab(spec, teamsNetwork())
    const b = gradeLab(spec, teamsNetwork())
    expect(a.passed).toBe(b.passed)
    expect(a.goals.map((g) => g.met)).toEqual(b.goals.map((g) => g.met))
    expect(a.diagnosis).toEqual(b.diagnosis)
  })

  it('sơ đồ hỏng CẤU TRÚC thì ném lỗi (bug trình soạn thảo, không phải lỗi người học)', () => {
    const topo = teamsNetwork()
    topo.links.push({ id: 'lx', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p4' } })
    expect(() => gradeLab(vlanRepairLab(), topo)).toThrowError(/lỗi cấu trúc/)
  })

  it('devicesReferencedBy gom đủ thiết bị mà mục tiêu nhắc tới', () => {
    expect(devicesReferencedBy(wiringLab().goals).sort()).toEqual(['pc-a', 'pc-b', 'sw-1'])
  })
})

describe('chẩn đoán bệnh trunk (Module 14)', () => {
  it('mới khai trunk MỘT đầu: gọi đúng tên, không nhầm với "hai đầu khác VLAN"', () => {
    // Đây là bệnh riêng của trunk, và lời chẩn đoán phải khác hẳn ca
    // access-khác-VLAN của Module 4 — hai bệnh, hai chỗ phải nhìn.
    const topo = trunkHealthy()
    const sw = topo.devices.find((d) => d.id === 'sw-2')
    if (sw?.kind === 'switch') {
      const uplink = sw.ports.find((p) => p.id === 'p4')
      if (uplink !== undefined) {
        delete uplink.mode
        delete uplink.allowedVlans
        delete uplink.nativeVlan
      }
    }
    const found = diagnose(topo, trunkLab().goals)
    expect(found).toContain('trunk-one-side-only')
    expect(found).not.toContain('vlan-mismatch-on-link')
  })

  it('hai đầu trunk lệch native: nêu ra dù ping của mục tiêu này vẫn chạy', () => {
    // Native lệch là bệnh IM LẶNG — nêu được nó lúc sơ đồ còn "trông ổn"
    // mới là giá trị của bảng chẩn đoán.
    const found = diagnose(trunkNativeMismatch(), trunkLab().goals)
    expect(found).toContain('native-vlan-mismatch-on-trunk')
  })

  it('trunk khai đúng hai đầu: không bịa ra bệnh nào', () => {
    expect(diagnose(trunkHealthy(), trunkLab().goals)).not.toContain('trunk-one-side-only')
    expect(diagnose(trunkHealthy(), trunkLab().goals)).not.toContain('native-vlan-mismatch-on-trunk')
  })

  it('đề lab Module 14 chấm được: đề chưa đạt, lời giải đạt trọn', () => {
    const spec = trunkLab()
    expect(gradeLab(spec, spec.initial).passed, 'đề bài không được đạt sẵn').toBe(false)
    expect(gradeLab(spec, spec.solution).passed, 'lời giải phải thật sự giải được').toBe(true)
  })
})
