// Local-date utilities. The engine works exclusively with 'YYYY-MM-DD'
// strings; reading the wall clock is the store/UI layer's job. All the
// arithmetic below runs in UTC on purpose — a calendar date is timezone-
// less once captured, so UTC math avoids DST edge cases entirely.

import type { ISODate } from './types'

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const MS_PER_DAY = 86_400_000

/** Parse an ISODate into a UTC timestamp; throws on malformed input. */
function toUtc(date: ISODate): number {
  if (!ISO_DATE_RE.test(date)) {
    throw new Error(`Invalid ISODate: "${date}" (expected YYYY-MM-DD)`)
  }
  const year = Number(date.slice(0, 4))
  const month = Number(date.slice(5, 7))
  const day = Number(date.slice(8, 10))
  const ts = Date.UTC(year, month - 1, day)
  // Reject dates like 2026-02-30 that Date.UTC silently rolls over.
  const d = new Date(ts)
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) {
    throw new Error(`Invalid ISODate: "${date}" (no such calendar day)`)
  }
  return ts
}

function fromUtc(ts: number): ISODate {
  const d = new Date(ts)
  const y = String(d.getUTCFullYear()).padStart(4, '0')
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Format a Date as the LOCAL calendar day of the learner's machine. */
export function isoFromDate(d: Date): ISODate {
  const y = String(d.getFullYear()).padStart(4, '0')
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDays(date: ISODate, days: number): ISODate {
  if (!Number.isInteger(days)) throw new Error(`addDays: days must be an integer, got ${days}`)
  return fromUtc(toUtc(date) + days * MS_PER_DAY)
}

/** Whole days from `from` to `to` (positive when `to` is later). */
export function diffDays(from: ISODate, to: ISODate): number {
  return Math.round((toUtc(to) - toUtc(from)) / MS_PER_DAY)
}

/** 'YYYY-MM' of a date — dùng cho chu kỳ reset "đóng băng" streak theo tháng. */
export function monthOf(date: ISODate): string {
  toUtc(date) // validate
  return date.slice(0, 7)
}

/** ISO dates compare correctly as strings; named helper for readability. */
export function isOnOrBefore(a: ISODate, b: ISODate): boolean {
  toUtc(a)
  toUtc(b)
  return a <= b
}

export function isBefore(a: ISODate, b: ISODate): boolean {
  toUtc(a)
  toUtc(b)
  return a < b
}
