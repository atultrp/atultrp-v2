import { describe, expect, it } from 'vitest'
import { computeOverlap, formatClock, formatDuration, getOffsetMinutes, isWithin, shortOffsetLabel, toSegments } from './timezone'

const host = { timeZone: 'Asia/Kolkata', start: 12 * 60, end: 22 * 60 }
const workday = (timeZone: string) => ({ timeZone, start: 9 * 60, end: 18 * 60 })

const winter = new Date('2026-01-15T12:00:00Z')
const summer = new Date('2026-07-15T12:00:00Z')

describe('getOffsetMinutes', () => {
  it('handles half-hour zones and DST', () => {
    expect(getOffsetMinutes('Asia/Kolkata', winter)).toBe(330)
    expect(getOffsetMinutes('Europe/Berlin', winter)).toBe(60)
    expect(getOffsetMinutes('Europe/Berlin', summer)).toBe(120)
    expect(getOffsetMinutes('America/Los_Angeles', winter)).toBe(-480)
  })
})

describe('toSegments', () => {
  it('splits spans that cross midnight', () => {
    expect(toSegments(1380, 120)).toEqual([
      { start: 0, end: 60 },
      { start: 1380, end: 1440 },
    ])
    expect(toSegments(-60, 120)).toEqual([
      { start: 0, end: 60 },
      { start: 1380, end: 1440 },
    ])
  })
})

describe('computeOverlap', () => {
  it.each([
    // IST 12:00–22:00 = UTC 06:30–16:30 in January
    ['Europe/Berlin', winter, 510], // 07:30–17:30 local → 09:00–17:30
    ['Europe/London', winter, 450], // 06:30–16:30 local → 09:00–16:30
    ['America/New_York', winter, 150], // 01:30–11:30 local → 09:00–11:30
    ['America/Los_Angeles', winter, 0], // 22:30–08:30 local → no overlap
    ['Asia/Tokyo', winter, 150], // 15:30–01:30 local → 15:30–18:00
    ['Europe/Berlin', summer, 540], // 08:30–18:30 local → full 09:00–18:00 workday
  ])('%s', (zone, date, expected) => {
    expect(computeOverlap(host, workday(zone), date).minutes).toBe(expected)
  })

  it('reports the overlap in the viewer clock', () => {
    const { overlap, host: hostLocal } = computeOverlap(host, workday('America/New_York'), winter)
    expect(overlap).toEqual([{ start: 540, end: 690 }])
    expect(hostLocal).toEqual([{ start: 90, end: 690 }])
  })

  it('wraps the host window across the viewer midnight', () => {
    const { host: hostLocal } = computeOverlap(host, workday('America/Los_Angeles'), winter)
    expect(hostLocal).toEqual([
      { start: 0, end: 510 },
      { start: 1350, end: 1440 },
    ])
  })

  it('treats identical zones as full overlap of the shorter window', () => {
    expect(computeOverlap(host, workday('Asia/Kolkata'), winter).minutes).toBe(360)
  })
})

describe('isWithin', () => {
  it('checks the host window against the current instant', () => {
    expect(isWithin(host, new Date('2026-01-15T08:00:00Z'))).toBe(true) // 13:30 IST
    expect(isWithin(host, new Date('2026-01-15T02:00:00Z'))).toBe(false) // 07:30 IST
  })
})

describe('formatters', () => {
  it('formats clocks, durations, and offsets', () => {
    expect(formatClock(1440 + 75)).toBe('01:15')
    expect(formatDuration(510)).toBe('8h 30m')
    expect(formatDuration(45)).toBe('45m')
    expect(shortOffsetLabel('Asia/Kolkata', winter)).toBe('UTC+5:30')
    expect(shortOffsetLabel('America/New_York', winter)).toBe('UTC−5')
  })
})
