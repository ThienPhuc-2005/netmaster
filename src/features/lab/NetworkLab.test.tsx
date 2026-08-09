// @vitest-environment jsdom
// Phòng lab, kiểm bằng ĐƯỜNG BẤM CHỌN.
//
// Vì mọi thao tác đều dispatch cùng một action dù đi bằng chuột kéo hay
// bằng bấm chọn, test đi đường bấm là phủ trọn máy trạng thái — và đó
// cũng chính là đường mà điện thoại, bàn phím và trình đọc màn hình dùng.
//
// jsdom không có `getTotalLength` nên animation KHÔNG chạy ở đây. Đó là
// nhánh dự phòng, và test quan trọng nhất của file này chính là: nhánh
// dự phòng vẫn giao trọn bài học (nhật ký chặng đầy đủ).

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { NetworkLab } from './NetworkLab'
import { vlanRepairLab, wiringLab,
  stpLab,
  trunkLab,
  aclLab,
  routedWithAcl,
} from '../../../tests/fixtures/labFixture'
import type { Topology } from '../../engine/lab'

afterEach(cleanup)

/**
 * Nút THIẾT BỊ, phân biệt với nút CỔNG: nhãn thiết bị là "Tên, loại, dây"
 * còn nhãn cổng là "Tên · cổng — trạng thái". Dấu phẩy ngay sau tên là
 * thứ tách hai loại nút ra.
 */
const deviceButton = (hostname: string) =>
  screen.getByRole('button', { name: new RegExp(`^${hostname.replace(/[()]/g, '\\$&')}, `) })

const vlanGroup = (portId: string) => screen.getByRole('radiogroup', { name: `VLAN của cổng ${portId}` })
const hopLog = () => within(screen.getByRole('region', { name: 'Hành trình gói tin' })).getByRole('list')
const unfinished = () => screen.queryAllByText(/\(chưa xong\)/)

/** Chọn Switch-1 rồi đặt VLAN cho một cổng — lời giải của bài sửa VLAN. */
function setVlan(portId: string, vlan: number) {
  fireEvent.click(deviceButton('Switch-1'))
  fireEvent.click(within(vlanGroup(portId)).getByRole('radio', { name: `VLAN ${vlan}` }))
}

/**
 * Nối một cổng của thiết bị đang chọn tới cổng đích, qua bảng cấu hình.
 * `targetLabel` phải neo hai đầu (`/^…$/`) để không dính nhầm nút cổng
 * trên mặt bàn — nhãn nút đó dài hơn vì có kèm trạng thái nối.
 */
function connect(hostname: string, targetLabel: RegExp) {
  fireEvent.click(deviceButton(hostname))
  fireEvent.click(screen.getByRole('button', { name: /^Nối dây$/ }))
  fireEvent.click(screen.getByRole('button', { name: targetLabel }))
}

describe('mặt bàn', () => {
  it('mỗi thiết bị là một nút có tên đọc được, kèm số dây đã nối', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    expect(deviceButton('PC-A (kế toán)').getAttribute('aria-label')).toMatch(/máy tính, đã nối 1 dây/)
    expect(deviceButton('Switch-1').getAttribute('aria-label')).toMatch(/switch, đã nối 4 dây/)
  })

  it('mỗi cổng là một nút riêng, nói rõ đang nối tới đâu', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    expect(screen.getByRole('button', { name: /PC-A .* · eth0 — nối tới Switch-1/ })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Switch-1 · p1 — nối tới PC-A/ })).toBeTruthy()
  })

  it('thiết bị chưa cắm dây nói rõ là chưa nối', () => {
    render(<NetworkLab spec={wiringLab()} />)
    expect(deviceButton('PC-A').getAttribute('aria-label')).toMatch(/chưa nối dây nào/)
    expect(screen.getByRole('button', { name: /Switch-1 · p4 — chưa nối/ })).toBeTruthy()
  })

  it('mục tiêu của bài hiện ngay, kèm trạng thái từng mục', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    expect(screen.getByText(/phải gọi được/)).toBeTruthy()
    expect(screen.getByText(/phải KHÔNG gọi được/)).toBeTruthy()
    expect(unfinished()).toHaveLength(1)
  })
})

describe('sửa VLAN — lời giải của bài', () => {
  it('chọn thiết bị mới hiện bảng cấu hình của nó', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    expect(screen.getByText(/Chọn một thiết bị trên sơ đồ/)).toBeTruthy()
    fireEvent.click(deviceButton('Switch-1'))
    expect(vlanGroup('p1')).toBeTruthy()
  })

  it('đổi VLAN thì mục tiêu chuyển sang xong', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    expect(unfinished()).toHaveLength(1)
    setVlan('p2', 10)
    expect(unfinished()).toHaveLength(0)
  })

  it('LỜI GIẢI RẺ TIỀN gộp hết vào một VLAN thì mục tiêu "phải chặn" hỏng', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    setVlan('p2', 10)
    setVlan('p3', 10)
    setVlan('p4', 10)
    // A gọi được B (đạt) nhưng cũng gọi được C (hỏng mục tiêu tách phòng ban).
    expect(unfinished()).toHaveLength(1)
  })

  it('VLAN đang đặt được đánh dấu trên chip', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    fireEvent.click(deviceButton('Switch-1'))
    expect(within(vlanGroup('p1')).getByRole('radio', { name: 'VLAN 10' }).getAttribute('aria-checked')).toBe('true')
    expect(within(vlanGroup('p2')).getByRole('radio', { name: 'VLAN 20' }).getAttribute('aria-checked')).toBe('true')
  })
})

describe('hoàn tác', () => {
  it('lùi lại đúng bước vừa làm', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    setVlan('p2', 10)
    expect(unfinished()).toHaveLength(0)
    fireEvent.click(screen.getByRole('button', { name: /Hoàn tác/ }))
    expect(unfinished()).toHaveLength(1)
  })

  it('chưa làm gì thì nút hoàn tác mờ đi', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    expect(screen.getByRole('button', { name: /Hoàn tác/ }).hasAttribute('disabled')).toBe(true)
  })

  it('làm lại đưa về trạng thái sau khi hoàn tác', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    setVlan('p2', 10)
    fireEvent.click(screen.getByRole('button', { name: /Hoàn tác/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Làm lại/ }))
    expect(unfinished()).toHaveLength(0)
  })

  it('về sơ đồ ban đầu, và CHÍNH NÓ cũng hoàn tác được', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    setVlan('p2', 10)
    fireEvent.click(screen.getByRole('button', { name: /Về sơ đồ ban đầu/ }))
    expect(unfinished()).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: /Hoàn tác/ }))
    expect(unfinished()).toHaveLength(0)
  })
})

describe('nối dây bằng bấm chọn hai đầu', () => {
  it('bấm Nối rồi chọn cổng đích thì dây được cắm', () => {
    render(<NetworkLab spec={wiringLab()} />)
    connect('PC-A', /^Switch-1 · p1$/)
    expect(deviceButton('PC-A').getAttribute('aria-label')).toMatch(/đã nối 1 dây/)
  })

  it('nối đủ hai máy vào switch thì bài xong', () => {
    render(<NetworkLab spec={wiringLab()} />)
    connect('PC-A', /^Switch-1 · p1$/)
    connect('PC-B', /^Switch-1 · p2$/)
    expect(unfinished()).toHaveLength(0)
  })

  it('đang cầm dây thì bỏ được, không kẹt', () => {
    render(<NetworkLab spec={wiringLab()} />)
    fireEvent.click(deviceButton('PC-A'))
    fireEvent.click(screen.getByRole('button', { name: /^Nối dây$/ }))
    fireEvent.click(screen.getByRole('button', { name: /Thôi, không nối nữa/ }))
    expect(screen.queryByRole('button', { name: /^Switch-1 · p1$/ })).toBeNull()
  })

  it('gỡ dây được, và số dây trên nhãn thiết bị đổi theo', () => {
    render(<NetworkLab spec={wiringLab()} />)
    connect('PC-A', /^Switch-1 · p1$/)
    fireEvent.click(screen.getByRole('button', { name: /^Gỡ dây$/ }))
    expect(deviceButton('PC-A').getAttribute('aria-label')).toMatch(/chưa nối dây nào/)
  })
})

describe('lời từ chối tử tế (spec 4.4)', () => {
  /** Dựng ca bị từ chối: nối PC-B vào đúng cổng mà PC-A đã chiếm. */
  function refuseOccupiedPort() {
    connect('PC-A', /^Switch-1 · p1$/)
    fireEvent.click(deviceButton('PC-B'))
    fireEvent.click(screen.getByRole('button', { name: /^Nối dây$/ }))
    fireEvent.click(screen.getByRole('button', { name: /Switch-1 · p1 — nối tới PC-A/ }))
  }

  it('nối vào cổng đã có dây thì được giải thích, KHÔNG hiện chữ SAI', () => {
    render(<NetworkLab spec={wiringLab()} />)
    refuseOccupiedPort()
    expect(screen.getByRole('status').textContent).toMatch(/đã có dây rồi/)
    expect(document.body.textContent).not.toMatch(/\bSAI\b/)
  })

  it('dùng tông cảnh báo, không dùng màu lỗi hệ thống (đỏ dành cho spec 4.1)', () => {
    const { container } = render(<NetworkLab spec={wiringLab()} />)
    refuseOccupiedPort()
    expect(container.querySelector('.text-danger')).toBeNull()
    expect(container.querySelector('.bg-danger')).toBeNull()
  })
})

describe('gửi gói tin', () => {
  it('NHÁNH DỰ PHÒNG VẪN GIAO TRỌN BÀI HỌC: nhật ký chặng đầy đủ dù không có animation', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    expect(screen.getByText(/Bấm "Gửi thử" để xem gói tin chạy/)).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /Gửi thử/ }))
    expect(hopLog().textContent).toMatch(/rời máy gửi/)
    expect(screen.getByText(/Gói tin chưa tới được đích/)).toBeTruthy()
  })

  it('nói rõ bệnh gì bằng lời người, không phải mã lỗi', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    fireEvent.click(screen.getByRole('button', { name: /Gửi thử/ }))
    expect(screen.getByText(/nhưng không ai trả lời/)).toBeTruthy()
    expect(document.body.textContent).not.toMatch(/arp-unresolved/)
  })

  it('sửa xong thì gửi thử báo đi tới nơi và có trả lời về', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    setVlan('p2', 10)
    fireEvent.click(screen.getByRole('button', { name: /Gửi thử/ }))
    expect(screen.getByText(/tới nơi và có trả lời về/)).toBeTruthy()
  })

  it('nói rõ gửi thử KHÔNG tính vào bài (tách bạch với nộp bài)', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    expect(screen.getByText(/không tính vào bài/)).toBeTruthy()
  })

  // Module 17: bị ACL chặn thì "một danh sách nào đó cấm" là chưa đủ để
  // sửa. Phải nói ra DÒNG NÀO trên CỔNG NÀO — và phải phân biệt được dòng
  // người ta gõ với dòng cấm vô hình cuối danh sách, vì hai bệnh khác
  // nhau: một cái sửa bằng xóa luật, cái kia sửa bằng THÊM luật.
  it('bị luật lọc chặn thì nhật ký nói rõ dòng nào ăn gói, trên cổng nào', () => {
    render(<NetworkLab spec={aclLab()} />)
    fireEvent.click(screen.getByRole('button', { name: /Gửi thử/ }))
    expect(screen.getByText(/danh sách lọc trên cổng router đã cấm/)).toBeTruthy()
    expect(screen.getByText(/danh sách 101 dòng 20.*cổng g0.*chiều in/)).toBeTruthy()
  })

  it('không dòng nào khớp thì nhật ký gọi tên dòng cấm vô hình', () => {
    const spec = { ...aclLab(), initial: routedWithAcl({ apply: true, onlyPermitOther: true }) }
    render(<NetworkLab spec={spec} />)
    fireEvent.click(screen.getByRole('button', { name: /Gửi thử/ }))
    expect(screen.getByText(/Không dòng nào của danh sách 101 khớp/)).toBeTruthy()
  })
})

describe('chẩn đoán', () => {
  it('chỉ ra chỗ đáng nhìn lại mà không lộ lời giải', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    expect(screen.getByText(/Hai máy cùng dải địa chỉ nhưng đang nằm ở hai VLAN khác nhau/)).toBeTruthy()
    expect(document.body.textContent).not.toMatch(/p2 sang VLAN/)
  })

  it('sửa xong thì lời chẩn đoán biến mất', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    setVlan('p2', 10)
    expect(screen.queryByText(/hai VLAN khác nhau/)).toBeNull()
  })
})

describe('nộp bài', () => {
  it('không truyền onSubmit thì không có nút Nộp bài (dùng ở trang trưng bày)', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    expect(screen.queryByRole('button', { name: 'Nộp bài' })).toBeNull()
  })

  it('nộp bài trao lại đúng sơ đồ hiện tại', () => {
    const onSubmit = vi.fn<(topology: Topology) => void>()
    render(<NetworkLab spec={vlanRepairLab()} onSubmit={onSubmit} />)
    setVlan('p2', 10)
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    const submitted = onSubmit.mock.calls[0]![0]
    const swi = submitted.devices.find((d) => d.id === 'sw-1')
    expect(swi?.kind === 'switch' && swi.ports.find((p) => p.id === 'p2')?.vlan).toBe(10)
  })

  it('lab KHÔNG tự chấm — nộp sơ đồ chưa sửa vẫn gọi lên tầng trên', () => {
    const onSubmit = vi.fn<(topology: Topology) => void>()
    render(<NetworkLab spec={vlanRepairLab()} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})

describe('quyền thao tác của đề bài được TÔN TRỌNG ở giao diện', () => {
  it('bài chỉ cho đổi VLAN thì không có khay thêm thiết bị', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    expect(screen.getByText(/dùng đúng những thiết bị đã có sẵn/)).toBeTruthy()
    expect(screen.queryByRole('button', { name: /Thêm máy tính/ })).toBeNull()
  })

  it('bài chỉ cho cắm dây thì không hiện bảng VLAN', () => {
    render(<NetworkLab spec={wiringLab()} />)
    fireEvent.click(deviceButton('Switch-1'))
    expect(screen.queryByRole('radiogroup', { name: /VLAN/ })).toBeNull()
  })

  it('bài không cho gỡ thiết bị thì không có nút bỏ thiết bị', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    fireEvent.click(deviceButton('Switch-1'))
    expect(screen.queryByRole('button', { name: /Bỏ thiết bị này/ })).toBeNull()
  })
})

describe('bài dở: rời đi giữa chừng rồi quay lại (hội đồng #20)', () => {
  // Một bài lab lắp dở là mười lăm phút thật. Bản cũ mất sạch khi rời
  // trang — đó là kiểu mất mát khiến người ta bỏ hẳn bài, không phải
  // chỉ bực mình.
  it('mỗi lần sơ đồ đổi là bắn ra một ảnh chụp để tầng trên lưu', () => {
    const onDraftChange = vi.fn()
    render(<NetworkLab spec={vlanRepairLab()} onDraftChange={onDraftChange} />)
    // Chỉ MỞ bài ra xem thì chưa có gì để lưu.
    expect(onDraftChange).not.toHaveBeenCalled()

    setVlan('p2', 10)
    expect(onDraftChange).toHaveBeenCalled()
    const snapshot = onDraftChange.mock.calls.at(-1)![0] as { topology: Topology }
    const sw = snapshot.topology.devices.find((d) => d.id === 'sw-1')
    expect(sw?.kind === 'switch' && sw.ports.find((p) => p.id === 'p2')?.vlan).toBe(10)
  })

  it('mở lại bằng ảnh chụp: vào thẳng sơ đồ đang lắp dở, không phải đề bài', () => {
    // Lắp dở ở lần ngồi trước…
    const onDraftChange = vi.fn()
    const first = render(<NetworkLab spec={vlanRepairLab()} onDraftChange={onDraftChange} />)
    setVlan('p2', 10)
    const draft = onDraftChange.mock.calls.at(-1)![0] as never
    first.unmount()

    // …lần ngồi sau mở ra là thấy đúng chỗ mình bỏ dở (mục tiêu đã xanh).
    render(<NetworkLab spec={vlanRepairLab()} initialDraft={draft} />)
    expect(unfinished()).toHaveLength(0)
  })

  it('"Làm lại từ đầu" vẫn quay về ĐỀ BÀI, không quay về bài dở', () => {
    // restoreLab giữ `initial` là đề bài — nếu lấy bài dở làm mốc thì
    // người học mất luôn đường thoát về vạch xuất phát.
    const onDraftChange = vi.fn()
    const first = render(<NetworkLab spec={vlanRepairLab()} onDraftChange={onDraftChange} />)
    setVlan('p2', 10)
    const draft = onDraftChange.mock.calls.at(-1)![0] as never
    first.unmount()

    render(<NetworkLab spec={vlanRepairLab()} initialDraft={draft} />)
    fireEvent.click(screen.getByRole('button', { name: /Về sơ đồ ban đầu/ }))
    expect(unfinished()).toHaveLength(1)
  })
})

describe('bàn phím dời được thiết bị (hội đồng, ghế a11y)', () => {
  // Sắp xếp mặt bàn từng là thao tác DUY NHẤT chỉ có đường kéo-thả —
  // tức người dùng bàn phím không gỡ được sơ đồ rối. Giờ mũi tên đi
  // đúng một ô lưới, cùng snapToGrid với chuột.
  it('mũi tên dời thiết bị một ô lưới, dây vẽ lại theo', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    const device = deviceButton('PC-A (kế toán)')
    const before = device.style.left
    fireEvent.keyDown(device, { key: 'ArrowRight' })
    expect(deviceButton('PC-A (kế toán)').style.left).not.toBe(before)
  })

  it('phím không phải mũi tên thì không đụng gì tới bố cục', () => {
    render(<NetworkLab spec={vlanRepairLab()} />)
    const device = deviceButton('PC-A (kế toán)')
    const before = device.style.left
    fireEvent.keyDown(device, { key: 'a' })
    expect(deviceButton('PC-A (kế toán)').style.left).toBe(before)
  })
})

describe('trunk và STP trên mặt bàn (Module 14-15)', () => {
  /** Chip trong một nhóm chọn — đường bấm chọn của mọi bảng cấu hình. */
  const chip = (groupLabel: string, chipLabel: string) =>
    within(screen.getByRole('radiogroup', { name: groupLabel })).getByRole('radio', { name: chipLabel })

  it('đề không cho đụng trunk thì không có bảng vai cổng', () => {
    // Bài Module 4 cũ phải trông y như trước khi có trunk.
    render(<NetworkLab spec={vlanRepairLab()} />)
    fireEvent.click(deviceButton('Switch-1'))
    expect(screen.queryByRole('radiogroup', { name: /Vai của cổng/ })).toBeNull()
  })

  it('đổi cổng thành trunk bằng bấm chọn, rồi mở allowed list và native', () => {
    render(<NetworkLab spec={trunkLab()} />)
    fireEvent.click(deviceButton('Switch-1'))
    // Cổng access chưa có allowed list — bày ra là mời điền vào chỗ vô nghĩa.
    expect(screen.queryByRole('group', { name: /VLAN cho qua trunk p4/ })).toBeNull()

    fireEvent.click(chip('Vai của cổng p4', 'Trunk'))
    expect(screen.getByRole('group', { name: /VLAN cho qua trunk p4/ })).toBeTruthy()
    expect(screen.getByRole('radiogroup', { name: /Native VLAN của trunk p4/ })).toBeTruthy()
  })

  it('lời giải Module 14 đi trọn bằng đường bấm chọn: hai đầu trunk, mục tiêu xanh', () => {
    render(<NetworkLab spec={trunkLab()} />)
    expect(unfinished()).toHaveLength(1)

    for (const host of ['Switch-1', 'Switch-2']) {
      fireEvent.click(deviceButton(host))
      fireEvent.click(chip('Vai của cổng p4', 'Trunk'))
    }
    expect(unfinished(), 'trunk hai đầu là kế toán gọi được nhau, kỹ thuật vẫn bị chặn').toHaveLength(0)
  })

  it('cổng trunk và cổng bị STP chặn nói ra trong TÊN nút, không chỉ đổi màu', () => {
    // Người dùng bàn phím và trình đọc màn hình phải biết được hai trạng
    // thái này — chúng là nội dung bài học, không phải trang trí.
    render(<NetworkLab spec={trunkLab()} />)
    fireEvent.click(deviceButton('Switch-1'))
    fireEvent.click(chip('Vai của cổng p4', 'Trunk'))
    expect(screen.getByRole('button', { name: /Switch-1 · p4 —.*trunk/ })).toBeTruthy()
  })

  it('bảng STP: bật lên thì nói rõ ai làm gốc và mấy cổng đang nằm im', () => {
    render(<NetworkLab spec={stpLab()} />)
    expect(screen.getByText('Đang tắt')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Bật STP' }))
    expect(screen.getByText(/Gốc cây: Switch-2/)).toBeTruthy()
    expect(screen.getByText(/Cổng đang nằm im: 1/)).toBeTruthy()
    // Và cổng đó phải tự khai trong tên nút của chính nó.
    expect(screen.getAllByRole('button', { name: /STP chặn/ }).length).toBeGreaterThan(0)
  })

  it('bật STP là mạng vòng hết bão — mục tiêu bài 15 xanh ngay', () => {
    render(<NetworkLab spec={stpLab()} />)
    expect(unfinished()).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: 'Bật STP' }))
    expect(unfinished()).toHaveLength(0)
  })

  it('nhật ký chặng nói được khung mang nhãn hay đi trần', () => {
    // Tải trọng sư phạm của Module 14 nằm ở đây, không nằm ở animation.
    render(<NetworkLab spec={trunkLab()} />)
    for (const host of ['Switch-1', 'Switch-2']) {
      fireEvent.click(deviceButton(host))
      fireEvent.click(chip('Vai của cổng p4', 'Trunk'))
    }
    fireEvent.click(screen.getByRole('button', { name: /Gửi thử/ }))
    const log = within(screen.getByRole('region', { name: 'Hành trình gói tin' })).getByRole('list')
    expect(within(log).getAllByText(/VLAN 10, mang nhãn/).length).toBeGreaterThan(0)
    expect(within(log).getAllByText(/VLAN 10, đi trần/).length).toBeGreaterThan(0)
  })
})
