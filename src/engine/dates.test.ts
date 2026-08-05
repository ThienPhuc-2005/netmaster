import { describe, expect, it } from 'vitest'
import { addDays, diffDays, isBefore, isOnOrBefore, isoFromDate, monthOf } from './dates'

describe('isoFromDate', () => {
  it('formats with zero padding', () => {
    expect(isoFromDate(new Date(2026, 0, 5))).toBe('2026-01-05')
    expect(isoFromDate(new Date(2026, 11, 31))).toBe('2026-12-31')
  })
})

describe('addDays', () => {
  it('adds within a month', () => {
    expect(addDays('2026-08-04', 3)).toBe('2026-08-07')
  })
  it('crosses month and year boundaries', () => {
    expect(addDays('2026-08-31', 1)).toBe('2026-09-01')
    expect(addDays('2026-12-25', 14)).toBe('2027-01-08')
  })
  it('handles leap years', () => {
    expect(addDays('2028-02-28', 1)).toBe('2028-02-29')
    expect(addDays('2026-02-28', 1)).toBe('2026-03-01')
  })
  it('supports negative offsets', () => {
    expect(addDays('2026-01-01', -1)).toBe('2025-12-31')
  })
  it('rejects malformed dates and rolled-over days', () => {
    expect(() => addDays('2026-8-4', 1)).toThrow()
    expect(() => addDays('2026-02-30', 1)).toThrow()
    expect(() => addDays('2026-08-04', 1.5)).toThrow()
  })
})

describe('diffDays', () => {
  it('is positive when `to` is later', () => {
    expect(diffDays('2026-08-04', '2026-08-07')).toBe(3)
    expect(diffDays('2026-08-07', '2026-08-04')).toBe(-3)
    expect(diffDays('2026-08-04', '2026-08-04')).toBe(0)
  })
  it('spans month boundaries', () => {
    expect(diffDays('2026-07-30', '2026-08-02')).toBe(3)
  })
})

describe('monthOf', () => {
  it('extracts YYYY-MM', () => {
    expect(monthOf('2026-08-04')).toBe('2026-08')
  })
  it('validates input', () => {
    expect(() => monthOf('rác')).toThrow()
  })
})

describe('comparisons', () => {
  it('compares ISO dates', () => {
    expect(isOnOrBefore('2026-08-04', '2026-08-04')).toBe(true)
    expect(isOnOrBefore('2026-08-05', '2026-08-04')).toBe(false)
    expect(isBefore('2026-08-04', '2026-08-04')).toBe(false)
    expect(isBefore('2026-07-31', '2026-08-01')).toBe(true)
  })
})
