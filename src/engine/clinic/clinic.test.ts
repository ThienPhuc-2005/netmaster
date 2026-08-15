// Test engine Phòng khám (spec Module 11) — chạy trên 5 CA THẬT của
// fixture (đúng thang dễ → khó spec liệt kê), không ca bịa dễ dãi.

import { describe, expect, it } from 'vitest'
import {
  CASE_DNS_CHET,
  CASE_GPO_CHAN,
  CASE_RUT_DAY,
  CASE_SAI_GATEWAY,
  CASE_TRUNG_IP,
  CASE_DAY_OM,
  ALL_CLINIC_CASES,
} from '../../../tests/fixtures/clinicFixture'
import { validatePatient } from './patient'
import { initialTerminalState, runCommand, type TerminalState } from './terminal'
import { checkSymptom, gradeClinicFix, phanMang, smellsOf } from './gradeClinic'
import { parseClinicCase } from './clinicSchema'
import type { ClinicCaseSpec } from './gradeClinic'

/** Gõ một chuỗi lệnh liên tiếp, trả kết quả lệnh cuối + state cuối. */
function type(spec: ClinicCaseSpec, ...inputs: string[]) {
  let state: TerminalState = initialTerminalState()
  let last = runCommand(spec.patient, state, inputs[0] ?? 'help')
  for (const input of inputs) {
    last = runCommand(spec.patient, state, input)
    state = last.state
  }
  return { last, state }
}

describe('hồ sơ bệnh nhân — kiểm cấu trúc', () => {
  it('cả 5 ca fixture đều sạch lỗi cấu trúc', () => {
    for (const spec of ALL_CLINIC_CASES) {
      expect(validatePatient(spec.patient), 'ca có lỗi cấu trúc').toEqual([])
    }
  })

  it('seat không tồn tại / không phải PC thì báo lỗi soạn bài', () => {
    expect(validatePatient({ ...CASE_RUT_DAY.patient, seatId: 'khong-co' }).map((p) => p.code)).toContain(
      'seat-not-found',
    )
    expect(validatePatient({ ...CASE_RUT_DAY.patient, seatId: 'cl1-switch' }).map((p) => p.code)).toContain(
      'seat-not-pc',
    )
  })

  it('DNS server trỏ IP không ai giữ là lỗi soạn bài', () => {
    const broken = {
      ...CASE_DNS_CHET.patient,
      overlay: { dns: { serverIp: '10.9.9.9', records: [] } },
    }
    expect(validatePatient(broken).map((p) => p.code)).toContain('dns-server-ip-unowned')
  })

  it('luật chặn nguồn GPO phải có mặt trong gpresult của máy đó', () => {
    const broken = {
      ...CASE_GPO_CHAN.patient,
      overlay: { ...CASE_GPO_CHAN.patient.overlay, gpos: {} },
    }
    const codes = validatePatient(broken).map((p) => p.code)
    expect(codes).toContain('block-gpo-unlisted')
  })
})

describe('terminal — ipconfig và nslookup', () => {
  it('ipconfig đọc thẳng cấu hình máy đang ngồi', () => {
    const { last } = type(CASE_SAI_GATEWAY, 'ipconfig')
    expect(last.outcome).toMatchObject({ kind: 'ipconfig', ip: '192.168.10.10', gateway: '192.168.10.99' })
    expect(last.lines.join('\n')).toContain('192.168.10.99')
  })

  it('nslookup khi DNS chết: timeout, có tên server trong output', () => {
    const { last } = type(CASE_DNS_CHET, 'nslookup web.noibo.vn')
    expect(last.outcome).toMatchObject({ kind: 'nslookup', failure: 'dns-timeout', serverIp: '192.168.10.53' })
    expect(last.lines.join('\n')).toContain('DNS request timed out')
  })

  it('nslookup tên không có trong bảng: Non-existent domain', () => {
    const healthy = {
      ...CASE_DNS_CHET,
      patient: {
        ...CASE_DNS_CHET.patient,
        overlay: { dns: { serverIp: '192.168.10.53', records: [{ name: 'web.noibo.vn', ip: '192.168.10.80' }] } },
      },
    }
    const { last } = type(healthy, 'nslookup khongco.noibo.vn')
    expect(last.outcome).toMatchObject({ kind: 'nslookup', failure: 'nxdomain' })
    const ok = type(healthy, 'nslookup web.noibo.vn')
    expect(ok.last.outcome).toMatchObject({ kind: 'nslookup', answer: '192.168.10.80', failure: null })
  })

  it('máy không khai DNS: nslookup báo thẳng, ping theo tên cũng chịu', () => {
    const { last } = type(CASE_RUT_DAY, 'nslookup web.noibo.vn')
    expect(last.outcome).toMatchObject({ kind: 'nslookup', failure: 'no-dns-configured' })
    const ping = type(CASE_RUT_DAY, 'ping web.noibo.vn')
    expect(ping.last.outcome).toMatchObject({ kind: 'ping', resolveFailure: 'no-dns-configured' })
    expect(ping.last.lines[0]).toContain('could not find host')
  })
})

describe('terminal — ping suy từ mô phỏng', () => {
  it('ca rút dây: ping báo transmit failed (máy không có dây)', () => {
    const { last } = type(CASE_RUT_DAY, 'ping 192.168.10.20')
    expect(last.outcome).toMatchObject({ kind: 'ping', replied: false, failure: 'src-no-link' })
    // src-no-link: gói không rời nổi MÁY MÌNH → General failure tại chỗ —
    // khác hẳn "Destination host unreachable" khi dây MÁY ĐÍCH rơi (ARP
    // không ai đáp). Phân biệt hai ca đó là bài học của Module 11 bài 1.
    expect(last.lines.join('\n')).toContain('General failure')
    expect(last.lines.join('\n')).toContain('Lost = 4')
  })

  it('lời từ chối unreachable có người KÝ TÊN, và đếm 0% loss như Windows thật', () => {
    // Hai chuyện gộp trong một ca (ghế kỹ thuật mạng, hội đồng 07-08):
    //   1. "Destination host unreachable" là gói ICMP do MỘT MÁY gửi về,
    //      nên Windows in "Reply from <ai>:" phía trước. Ai ký tên chính
    //      là manh mối: máy mình (ARP im) hay router (không có đường).
    //   2. Gói đó VẪN được đếm là nhận được → "0% loss" trong khi mạng
    //      không thông. Bẫy đọc lướt này có thật, phải giữ nguyên.
    // Ca sai gateway: máy gọi mãi cái gateway ma mà không ai thưa (ARP im)
    // → chính MÁY MÌNH sinh ra lời từ chối, nên nó ký tên bằng IP của mình.
    const seat = CASE_SAI_GATEWAY.patient.topology.devices.find((d) => d.id === CASE_SAI_GATEWAY.patient.seatId)
    const from = seat?.kind === 'pc' ? seat.ipConfig?.ip : undefined
    const { last } = type(CASE_SAI_GATEWAY, 'ping 203.0.113.1')
    expect(last.outcome).toMatchObject({ kind: 'ping', replied: false, failure: 'arp-unresolved' })
    const out = last.lines.join(' ')
    expect(out).toContain(`Reply from ${from}: Destination host unreachable.`)
    expect(out).toContain('Received = 4, Lost = 0 (0% loss)')
  })

  it('ca sai gateway: ping ra ngoài chết, triệu chứng đúng như lời than', () => {
    const { last } = type(CASE_SAI_GATEWAY, 'ping 203.0.113.1')
    expect(last.outcome).toMatchObject({ kind: 'ping', replied: false })
    const symptom = checkSymptom(CASE_SAI_GATEWAY, CASE_SAI_GATEWAY.patient.topology)
    expect(symptom.sick).toBe(true)
  })

  it('mạng khỏe: ping thông, TTL trừ đúng số router, tracert kê đúng chặng', () => {
    const fixed = CASE_SAI_GATEWAY.fix.kind === 'edit-network' ? CASE_SAI_GATEWAY.fix.solution : null
    const healthy: ClinicCaseSpec = { ...CASE_SAI_GATEWAY, patient: { ...CASE_SAI_GATEWAY.patient, topology: fixed! } }
    const ping = type(healthy, 'ping 203.0.113.1')
    expect(ping.last.outcome).toMatchObject({ kind: 'ping', replied: true })
    expect(ping.last.lines.join('\n')).toContain('TTL=127') // qua đúng 1 router
    const trace = type(healthy, 'tracert 203.0.113.1')
    expect(trace.last.outcome).toMatchObject({ kind: 'tracert', reachedDest: true, routerIps: ['192.168.10.1'] })
  })

  it('ca trùng IP: hai lượt ping liên tiếp, ARP đổi MAC — bệnh flap lộ ra', () => {
    const first = type(CASE_TRUNG_IP, 'ping 192.168.10.20', 'arp')
    expect(first.last.outcome.kind).toBe('arp')
    const mac1 = first.last.outcome.kind === 'arp' ? first.last.outcome.entries.find((e) => e.ip === '192.168.10.20')?.mac : null

    const second = type(CASE_TRUNG_IP, 'ping 192.168.10.20', 'ping 192.168.10.20', 'arp')
    const mac2 = second.last.outcome.kind === 'arp' ? second.last.outcome.entries.find((e) => e.ip === '192.168.10.20')?.mac : null

    expect(mac1).toBeTruthy()
    expect(mac2).toBeTruthy()
    expect(mac1).not.toBe(mac2)
  })

  it('ca GPO chặn outbound: ping General failure, netstat vẫn thấy web sống — đúng cái bẫy', () => {
    const ping = type(CASE_GPO_CHAN, 'ping 192.168.10.80')
    expect(ping.last.outcome).toMatchObject({ kind: 'ping', replied: false })
    expect(ping.last.lines.join('\n')).toContain('General failure')
    expect(ping.last.outcome.kind === 'ping' && ping.last.outcome.blockedBy?.ruleName).toBe('GPO-Chan-ICMP-Ra')

    const netstat = type(CASE_GPO_CHAN, 'netstat')
    expect(netstat.last.lines.join('\n')).toContain('ESTABLISHED')

    const gp = type(CASE_GPO_CHAN, 'gpresult')
    expect(gp.last.lines.join('\n')).toContain('GPO-Chan-ICMP-Ra')
  })
})

describe('terminal — capture (Wireshark cơ bản) và arp', () => {
  it('chưa ping thì capture trống; ping xong thấy đủ nhịp ARP + ICMP', () => {
    const empty = type(CASE_DNS_CHET, 'capture')
    expect(empty.last.outcome).toMatchObject({ kind: 'capture', empty: true })

    const after = type(CASE_DNS_CHET, 'ping 192.168.10.80', 'capture')
    expect(after.last.outcome.kind).toBe('capture')
    if (after.last.outcome.kind === 'capture') {
      const phases = after.last.outcome.rows.map((r) => r.phase)
      expect(phases).toContain('arp-request')
      expect(phases).toContain('echo-request')
      expect(phases).toContain('echo-reply')
    }
  })

  it('lệnh lạ và help không sinh output thiết bị — UI tự lo lời', () => {
    const unknown = type(CASE_RUT_DAY, 'format c:')
    expect(unknown.last.outcome).toMatchObject({ kind: 'unknown' })
    expect(unknown.last.lines).toEqual([])
    const help = type(CASE_RUT_DAY, 'help')
    expect(help.last.outcome).toMatchObject({ kind: 'help' })
  })
})

describe('chấm ca — gradeClinicFix ba lớp', () => {
  it('ca rút dây: lời giải đạt, trạng thái đầu thì không', () => {
    if (CASE_RUT_DAY.fix.kind !== 'edit-network') throw new Error('fixture đổi kiểu fix?')
    expect(gradeClinicFix(CASE_RUT_DAY, CASE_RUT_DAY.fix.solution).passed).toBe(true)
    expect(gradeClinicFix(CASE_RUT_DAY, CASE_RUT_DAY.patient.topology).passed).toBe(false)
  })

  it('ca trùng IP: goals xanh mà bệnh còn thì vẫn trượt (mustClearDiagnoses)', () => {
    if (CASE_TRUNG_IP.fix.kind !== 'edit-network') throw new Error('fixture đổi kiểu fix?')
    const result = gradeClinicFix(CASE_TRUNG_IP, CASE_TRUNG_IP.patient.topology)
    expect(result.passed).toBe(false)
    expect(result.remainingDiagnoses).toContain('duplicate-ip')
    expect(gradeClinicFix(CASE_TRUNG_IP, CASE_TRUNG_IP.fix.solution).passed).toBe(true)
  })

  it('mùi bệnh đọc ra đúng loại ca — người soạn không khai nhầm', () => {
    expect(smellsOf(CASE_TRUNG_IP)).toContain('duplicate-ip')
    expect(smellsOf(CASE_DNS_CHET)).toContain('dns-down')
    expect(smellsOf(CASE_GPO_CHAN)).toContain('host-block-gpo')
  })
})

describe('clinicSchema — chốt chặn nội dung', () => {
  it('cả 5 ca fixture qua schema', () => {
    for (const spec of ALL_CLINIC_CASES) {
      expect(() => parseClinicCase(spec)).not.toThrow()
    }
  })

  it('bệnh nhân không ốm là đề bài nói dối — schema chặn', () => {
    if (CASE_RUT_DAY.fix.kind !== 'edit-network') throw new Error('fixture đổi kiểu fix?')
    const healthy = { ...CASE_RUT_DAY, patient: { ...CASE_RUT_DAY.patient, topology: CASE_RUT_DAY.fix.solution } }
    expect(() => parseClinicCase(healthy)).toThrow(/không ốm|đạt sẵn/)
  })

  it('lời giải không chữa được ca của chính nó — schema chặn', () => {
    if (CASE_RUT_DAY.fix.kind !== 'edit-network') throw new Error('fixture đổi kiểu fix?')
    const broken = {
      ...CASE_RUT_DAY,
      fix: { ...CASE_RUT_DAY.fix, solution: CASE_RUT_DAY.patient.topology },
    }
    expect(() => parseClinicCase(broken)).toThrow(/không chữa được/)
  })

  it('mustClearDiagnoses khai khống bệnh không tồn tại — schema chặn', () => {
    if (CASE_RUT_DAY.fix.kind !== 'edit-network') throw new Error('fixture đổi kiểu fix?')
    const bogus = {
      ...CASE_RUT_DAY,
      fix: { ...CASE_RUT_DAY.fix, mustClearDiagnoses: ['duplicate-ip' as const] },
    }
    expect(() => parseClinicCase(bogus)).toThrow(/không hề có bệnh/)
  })
})

// ---------------------------------------------------------------
// Ca LIÊN TẦNG 'edit-and-act' (kho ý tưởng H3)
// ---------------------------------------------------------------
//
// Kiểu ca thứ ba: một nửa bệnh nằm trong sơ đồ (sửa bằng tay), một nửa
// nằm ngoài (chọn hành động). Bất biến file này canh: **mọi cổng chất
// lượng của ca sửa-sơ-đồ phải áp y nguyên cho nửa mạng của ca liên tầng**
// — bỏ sót là ca liên tầng thành cửa sau đưa đề ẩu vào app.

describe('ca liên tầng — nửa mạng vẫn qua đủ cổng cũ', () => {
  /** Đúng ca rút dây, chỉ đổi nhãn kiểu sửa sang 'edit-and-act'. */
  const CASE_HAI_NUA: ClinicCaseSpec = (() => {
    if (CASE_RUT_DAY.fix.kind !== 'edit-network') throw new Error('fixture đổi kiểu fix?')
    return { ...CASE_RUT_DAY, fix: { ...CASE_RUT_DAY.fix, kind: 'edit-and-act' as const } }
  })()

  it('phanMang trả nửa mạng cho cả hai kiểu ca có sửa sơ đồ, null cho ca chọn-hành-động', () => {
    expect(phanMang(CASE_RUT_DAY.fix)).not.toBeNull()
    expect(phanMang(CASE_HAI_NUA.fix)).not.toBeNull()
    expect(phanMang({ kind: 'choose-action' })).toBeNull()
  })

  it('chấm nửa mạng y hệt ca sửa-sơ-đồ: lời giải qua, trạng thái đầu rớt', () => {
    if (CASE_HAI_NUA.fix.kind !== 'edit-and-act') throw new Error('sai kiểu fix')
    expect(gradeClinicFix(CASE_HAI_NUA, CASE_HAI_NUA.fix.solution).passed).toBe(true)
    expect(gradeClinicFix(CASE_HAI_NUA, CASE_HAI_NUA.patient.topology).passed).toBe(false)
  })

  it('schema vẫn bắt lời giải không chữa được ca của chính nó', () => {
    // Nếu cổng này bỏ sót kiểu ca mới thì đề ẩu lọt vào app mà không ai biết.
    const broken = { ...CASE_HAI_NUA, fix: { ...CASE_HAI_NUA.fix, solution: CASE_HAI_NUA.patient.topology } }
    expect(() => parseClinicCase(broken)).toThrow(/không chữa được/)
  })

  it('schema vẫn bắt mustClearDiagnoses khai khống', () => {
    const bogus = { ...CASE_HAI_NUA, fix: { ...CASE_HAI_NUA.fix, mustClearDiagnoses: ['duplicate-ip' as const] } }
    expect(() => parseClinicCase(bogus)).toThrow(/không hề có bệnh/)
  })

  it('ca liên tầng hợp lệ thì parse trót lọt', () => {
    expect(() => parseClinicCase(CASE_HAI_NUA)).not.toThrow()
  })
})

// ---------------------------------------------------------------
// Bệnh "CHẬM CHỨ KHÔNG CHẾT" — độ trễ và rớt gói (lỗ hổng Q3)
// ---------------------------------------------------------------
//
// Loại bệnh này khác mọi ca cũ ở một điểm quyết định: mạng THÔNG. Mọi
// lệnh đọc lướt đều xanh, chỉ CON SỐ là xấu. Vì thế bất biến file này
// canh là "khỏi" phải đòi cả hai vế — có tiếng đáp VÀ số đo đẹp — chứ
// không phải chỉ ping ra Reply là qua bài.

describe('dây ốm — chậm chứ không chết', () => {
  it('ping vẫn có tiếng đáp nhưng con số xấu: trễ cộng dồn cả hai chiều', () => {
    const { last } = type(CASE_DAY_OM, 'ping 10.0.0.2')
    if (last.outcome.kind !== 'ping') throw new Error('không phải kết quả ping')
    expect(last.outcome.replied).toBe(true)
    // 90ms mỗi chiều, gói qua sợi dây bệnh hai lượt đi-về.
    expect(last.outcome.quality.rttMs).toBe(180)
    // Rơi 20% mỗi lượt qua dây, hai lượt: 1 - 0.8*0.8 = 36%.
    expect(last.outcome.quality.lossPercent).toBe(36)
    const out = last.lines.join('\n')
    expect(out).toContain('time=180ms')
    expect(out).toContain('Request timed out.')
    expect(out).toContain('Approximate round trip times in milli-seconds:')
  })

  it('không bao giờ rơi trọn 4 gói — ốm không được phép trông y hệt chết', () => {
    const nang: ClinicCaseSpec = {
      ...CASE_DAY_OM,
      patient: {
        ...CASE_DAY_OM.patient,
        overlay: { impairments: [{ linkId: 'cl6-w-seat-cu', latencyMs: 90, lossPercent: 90 }] },
      },
    }
    const { last } = type(nang, 'ping 10.0.0.2')
    if (last.outcome.kind !== 'ping') throw new Error('không phải kết quả ping')
    expect(last.outcome.replied).toBe(true)
    expect(last.lines.join('\n')).toContain('Received = 1')
  })

  it('mạng khỏe thì không có con số nào bịa ra', () => {
    const { last } = type(CASE_RUT_DAY, 'ping 192.168.10.20')
    if (last.outcome.kind !== 'ping') throw new Error('không phải kết quả ping')
    expect(last.outcome.quality).toEqual({ rttMs: 0, lossPercent: 0 })
  })

  it('tracert chỉ đúng KHÚC nào chậm, không chỉ nói cả chuyến chậm', () => {
    const { last } = type(CASE_DAY_OM, 'tracert 10.0.0.2')
    const rows = last.lines.filter((l) => /^\s+\d+\s/.test(l))
    expect(rows.length).toBe(2)
    // Sợi dây bệnh nằm ngay chặng đầu nên MỌI chặng sau đều gánh 180ms.
    // Đã đỏ mặt ở browser một lần: chỉ đọc chặng echo-request ĐẦU TIÊN thì
    // dòng đích in "<1 ms" ngay dưới một dòng "180 ms" — bản đồ tự cãi
    // nhau ngay trước mắt người học. Gói qua router đi thành NHIỀU chặng.
    for (const row of rows) expect(row, `chặng này mất số đo: ${row}`).toContain('180 ms')
  })

  it('sợi dây ốm ở NHÁNH CỤT không được tính vào ping của đường khác', () => {
    // Máy chủ nằm sau router; dây ốm cắm ở nhánh không dính đường đi.
    const lac: ClinicCaseSpec = {
      ...CASE_DAY_OM,
      patient: {
        ...CASE_DAY_OM.patient,
        overlay: { impairments: [{ linkId: 'cl6-w-server', latencyMs: 300 }] },
        seatId: 'cl6-may-phong-hop',
      },
    }
    const { last } = type(lac, 'ping 192.168.30.1')
    if (last.outcome.kind !== 'ping') throw new Error('không phải kết quả ping')
    expect(last.outcome.replied).toBe(true)
    expect(last.outcome.quality.rttMs).toBe(0)
  })

  it('"khỏi" đòi cả hai vế: thay dây thì đạt, rút phăng dây thì KHÔNG', () => {
    if (CASE_DAY_OM.fix.kind !== 'edit-network') throw new Error('fixture đổi kiểu fix?')
    expect(gradeClinicFix(CASE_DAY_OM, CASE_DAY_OM.fix.solution).passed).toBe(true)
    expect(gradeClinicFix(CASE_DAY_OM, CASE_DAY_OM.patient.topology).passed).toBe(false)
    // Rút dây bệnh mà không cắm dây mới: hết chậm vì hết mạng luôn.
    const rutPhang = {
      ...CASE_DAY_OM.patient.topology,
      links: CASE_DAY_OM.patient.topology.links.filter((l) => l.id !== 'cl6-w-seat-cu'),
    }
    expect(checkSymptom(CASE_DAY_OM, rutPhang).sick).toBe(true)
    expect(gradeClinicFix(CASE_DAY_OM, rutPhang).passed).toBe(false)
  })

  it('smellsOf kể đúng hai mùi bệnh mới', () => {
    expect(smellsOf(CASE_DAY_OM)).toEqual(expect.arrayContaining(['link-slow', 'link-lossy']))
  })

  it('khai dây ốm trỏ vào link không có thật — chặn ở kiểm cấu trúc', () => {
    const broken = {
      ...CASE_DAY_OM.patient,
      overlay: { impairments: [{ linkId: 'khong-co-day-nay', latencyMs: 50 }] },
    }
    expect(validatePatient(broken).map((p) => p.code)).toContain('impair-link-not-found')
  })

  it('khai dây ốm mà không xấu ở con số nào — chặn ở kiểm cấu trúc', () => {
    const broken = {
      ...CASE_DAY_OM.patient,
      overlay: { impairments: [{ linkId: 'cl6-w-seat-cu' }] },
    }
    expect(validatePatient(broken).map((p) => p.code)).toContain('impair-empty')
  })

  it('triệu chứng khai "chậm" mà hồ sơ không có dây ốm nào — schema chặn', () => {
    const bogus = { ...CASE_DAY_OM, patient: { ...CASE_DAY_OM.patient, overlay: {} } }
    expect(() => parseClinicCase(bogus)).toThrow(/không khai sợi dây ốm nào/)
  })

  it('ca dây ốm hợp lệ thì parse trót lọt', () => {
    expect(() => parseClinicCase(CASE_DAY_OM)).not.toThrow()
  })
})
