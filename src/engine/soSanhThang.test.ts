import { describe, expect, it } from 'vitest'
import {
  latCatTuPhanTich,
  mocDeSo,
  nenChupThang,
  soSanhDang,
  themLatCat,
  thangCua,
  SO_THANG_GIU,
  type LatCatThang,
} from './soSanhThang'
import type { MistakeAnalysis, MistakeBucket } from './mistakeLog'

function bucket(key: string, attempted: number, stumbled: number): MistakeBucket {
  return {
    key,
    attempted,
    stumbled,
    fails: stumbled,
    usedSolution: 0,
    rate: attempted === 0 ? 0 : stumbled / attempted,
    ranked: attempted >= 4,
  }
}

function phanTich(...kinds: MistakeBucket[]): MistakeAnalysis {
  return {
    attempted: kinds.reduce((s, k) => s + k.attempted, 0),
    stumbled: kinds.reduce((s, k) => s + k.stumbled, 0),
    fails: 0,
    usedSolution: 0,
    byKind: kinds,
    byModule: [],
    byTopic: [],
    toughestKind: null,
  }
}

function moc(thang: string, theoDang: Record<string, [number, number]>): LatCatThang {
  return {
    thang,
    ngay: `${thang}-01`,
    theoDang: Object.fromEntries(
      Object.entries(theoDang).map(([k, [attempted, stumbled]]) => [k, { attempted, stumbled }]),
    ),
  }
}

describe('cất mốc mỗi tháng một lần', () => {
  it('chưa có mốc nào thì cất', () => {
    expect(nenChupThang([], '2026-08')).toBe(true)
  })

  it('tháng này đã có mốc thì thôi', () => {
    expect(nenChupThang([moc('2026-08', {})], '2026-08')).toBe(false)
  })

  it('mốc mới nhất là tháng trước thì cất mốc mới', () => {
    expect(nenChupThang([moc('2026-07', {}), moc('2026-06', {})], '2026-08')).toBe(true)
  })

  it('giữ tối đa một năm, bỏ mốc cũ nhất', () => {
    let list: LatCatThang[] = []
    for (let i = 1; i <= SO_THANG_GIU + 2; i += 1) {
      list = themLatCat(list, moc(`2026-${String(i).padStart(2, '0')}`, {}))
    }
    expect(list).toHaveLength(SO_THANG_GIU)
    expect(list[0]!.thang).toBe('2026-14') // mốc vừa cất đứng đầu
    expect(list.at(-1)!.thang).toBe('2026-03')
  })

  it('lát cắt chỉ giữ số theo DẠNG CÂU', () => {
    const lat = latCatTuPhanTich(phanTich(bucket('typed', 10, 4), bucket('lab', 5, 1)), '2026-08-12')
    expect(lat.thang).toBe('2026-08')
    expect(lat.ngay).toBe('2026-08-12')
    expect(lat.theoDang).toEqual({ typed: { attempted: 10, stumbled: 4 }, lab: { attempted: 5, stumbled: 1 } })
  })

  it('thangCua cắt đúng phần tháng', () => {
    expect(thangCua('2026-08-12')).toBe('2026-08')
  })
})

describe('chọn mốc đem ra so', () => {
  it('bỏ qua mốc của chính tháng này — so với mình mấy ngày trước thì chưa nói được gì', () => {
    const list = [moc('2026-08', {}), moc('2026-07', {}), moc('2026-05', {})]
    expect(mocDeSo(list, '2026-08')?.thang).toBe('2026-07')
  })

  it('nghỉ vài tháng thì so với mốc gần nhất còn giữ được', () => {
    expect(mocDeSo([moc('2026-08', {}), moc('2026-03', {})], '2026-08')?.thang).toBe('2026-03')
  })

  it('chưa có tháng nào khác thì trả null, không bịa ra mốc', () => {
    expect(mocDeSo([moc('2026-08', {})], '2026-08')).toBeNull()
    expect(mocDeSo([], '2026-08')).toBeNull()
  })
})

describe('so từng dạng câu', () => {
  it('vấp ít đi là TIẾN, và chênh lệch tính theo tỉ lệ', () => {
    const row = soSanhDang(moc('2026-07', { typed: [10, 6] }), phanTich(bucket('typed', 20, 6)))[0]!
    expect(row.rateTruoc).toBeCloseTo(0.6, 5)
    expect(row.rateNay).toBeCloseTo(0.3, 5)
    expect(row.chenh).toBeCloseTo(0.3, 5)
    expect(row.huong).toBe('tien')
    expect(row.duMau).toBe(true)
  })

  it('vấp nhiều lên là LÙI — không giấu tin xấu', () => {
    const row = soSanhDang(moc('2026-07', { lab: [10, 2] }), phanTich(bucket('lab', 20, 10)))[0]!
    expect(row.huong).toBe('lui')
  })

  it('nhích dưới ngưỡng thì gọi là ĐI NGANG, không khen bừa', () => {
    const row = soSanhDang(moc('2026-07', { typed: [100, 50] }), phanTich(bucket('typed', 100, 48)))[0]!
    expect(row.huong).toBe('ngang')
  })

  it('mẫu mỏng ở MỘT trong hai mốc là chưa đủ mẫu', () => {
    const row = soSanhDang(moc('2026-07', { cli: [2, 2] }), phanTich(bucket('cli', 20, 4)))[0]!
    expect(row.duMau).toBe(false)
    // Vẫn tính chênh lệch để hiện số, chỉ không được đem ra phán.
    expect(row.chenh).toBeCloseTo(0.8, 5)
  })

  it('dạng câu MỚI gặp tháng này thì không đem ra so', () => {
    const rows = soSanhDang(moc('2026-07', { typed: [10, 5] }), phanTich(bucket('typed', 12, 5), bucket('cli', 6, 3)))
    expect(rows.map((r) => r.key)).toEqual(['typed'])
  })

  it('dạng câu tháng trước có mà nay không còn số thì cũng bỏ', () => {
    expect(soSanhDang(moc('2026-07', { ps: [4, 2] }), phanTich(bucket('typed', 9, 1)))).toEqual([])
  })

  it('đủ mẫu đứng trước, rồi chỗ đổi NHIỀU NHẤT đứng trước — kể cả khi là tin xấu', () => {
    const rows = soSanhDang(
      moc('2026-07', { typed: [20, 10], lab: [20, 4], cli: [2, 2] }),
      phanTich(bucket('typed', 20, 9), bucket('lab', 20, 14), bucket('cli', 3, 0)),
    )
    expect(rows.map((r) => r.key)).toEqual(['lab', 'typed', 'cli'])
    expect(rows[0]!.huong).toBe('lui')
  })
})
