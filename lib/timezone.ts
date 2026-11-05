export const MINUTES_PER_DAY = 1440

/** A daily window in local wall-clock minutes, e.g. 09:00–18:00 → { start: 540, end: 1080 }. */
export type DailyWindow = { timeZone: string; start: number; end: number }

/** A span on a 0–1440 axis. `end` is exclusive and always > `start`. */
export type Segment = { start: number; end: number }

export type OverlapResult = {
  /** Shared minutes per day. */
  minutes: number
  /** Overlap in the viewer's local time, split at midnight. */
  overlap: Segment[]
  /** My availability in the viewer's local time, split at midnight. */
  host: Segment[]
  /** The viewer's own working window. */
  viewer: Segment[]
}

const formatters = new Map<string, Intl.DateTimeFormat>()

// Constructing a DateTimeFormat costs far more than calling it; keep one per zone.
function formatterFor(timeZone: string) {
  let f = formatters.get(timeZone)
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    formatters.set(timeZone, f)
  }
  return f
}

/** Offset of `timeZone` from UTC in minutes at `date` (DST-aware). */
export function getOffsetMinutes(timeZone: string, date: Date): number {
  const parts = formatterFor(timeZone).formatToParts(date)

  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  const truncated = date.getTime() - date.getUTCMilliseconds()
  return Math.round((asUtc - truncated) / 60_000)
}

const mod = (n: number, m: number) => ((n % m) + m) % m

/** Map a span that starts anywhere on the number line onto 0–1440, splitting at midnight. */
export function toSegments(start: number, length: number): Segment[] {
  if (length <= 0) return []
  if (length >= MINUTES_PER_DAY) return [{ start: 0, end: MINUTES_PER_DAY }]
  const s = mod(start, MINUTES_PER_DAY)
  const e = s + length
  return e <= MINUTES_PER_DAY
    ? [{ start: s, end: e }]
    : [
        { start: 0, end: e - MINUTES_PER_DAY },
        { start: s, end: MINUTES_PER_DAY },
      ]
}

const windowLength = (w: DailyWindow) => mod(w.end - w.start, MINUTES_PER_DAY) || MINUTES_PER_DAY

/** Daily overlap between a host window and a viewer window, expressed in the viewer's local time. */
export function computeOverlap(host: DailyWindow, viewer: DailyWindow, date: Date = new Date()): OverlapResult {
  const hostOffset = getOffsetMinutes(host.timeZone, date)
  const viewerOffset = getOffsetMinutes(viewer.timeZone, date)

  // Shift the host window into the viewer's local clock.
  const shift = viewerOffset - hostOffset
  const hostStart = host.start + shift
  const hostLen = windowLength(host)
  const viewerLen = windowLength(viewer)

  // Intersect on a circular day by testing the host window one day either side.
  const overlap: Segment[] = []
  for (const day of [-1, 0, 1]) {
    const s = Math.max(viewer.start, hostStart + day * MINUTES_PER_DAY)
    const e = Math.min(viewer.start + viewerLen, hostStart + hostLen + day * MINUTES_PER_DAY)
    if (e > s) overlap.push(...toSegments(s, e - s))
  }

  return {
    minutes: overlap.reduce((sum, seg) => sum + (seg.end - seg.start), 0),
    overlap: overlap.sort((a, b) => a.start - b.start),
    host: toSegments(hostStart, hostLen),
    viewer: toSegments(viewer.start, viewerLen),
  }
}

/** Minutes since local midnight in `timeZone`. */
export function localMinutesNow(timeZone: string, date: Date = new Date()): number {
  const utc = date.getUTCHours() * 60 + date.getUTCMinutes()
  return mod(utc + getOffsetMinutes(timeZone, date), MINUTES_PER_DAY)
}

export function isWithin(window: DailyWindow, date: Date = new Date()): boolean {
  const now = localMinutesNow(window.timeZone, date)
  return toSegments(window.start, windowLength(window)).some((s) => now >= s.start && now < s.end)
}

export function formatClock(minutes: number): string {
  const m = mod(Math.round(minutes), MINUTES_PER_DAY)
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

/** "Europe/Berlin" → "Berlin", "America/Argentina/Buenos_Aires" → "Buenos Aires". */
export function cityFromZone(timeZone: string): string {
  return (timeZone.split('/').pop() ?? timeZone).replace(/_/g, ' ')
}

export function shortOffsetLabel(timeZone: string, date: Date = new Date()): string {
  const offset = getOffsetMinutes(timeZone, date)
  const sign = offset >= 0 ? '+' : '−'
  const abs = Math.abs(offset)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`
}

/** Legacy IANA names some browsers still report. */
const ZONE_ALIASES: Record<string, string> = {
  'Asia/Calcutta': 'Asia/Kolkata',
  'Asia/Saigon': 'Asia/Ho_Chi_Minh',
  'Asia/Katmandu': 'Asia/Kathmandu',
  'Europe/Kiev': 'Europe/Kyiv',
  'America/Buenos_Aires': 'America/Argentina/Buenos_Aires',
}

export function detectTimeZone(): string | null {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return zone ? ZONE_ALIASES[zone] ?? zone : null
  } catch {
    return null
  }
}
