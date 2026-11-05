import { useEffect, useMemo, useState } from 'react'
import { availability, profile } from '@/content/profile'
import {
  MINUTES_PER_DAY,
  cityFromZone,
  computeOverlap,
  detectTimeZone,
  formatClock,
  formatDuration,
  isWithin,
  localMinutesNow,
  shortOffsetLabel,
  type DailyWindow,
  type Segment,
} from '@/lib/timezone'

const PRESETS = [
  { zone: 'America/Los_Angeles', label: 'San Francisco' },
  { zone: 'America/New_York', label: 'New York' },
  { zone: 'Europe/London', label: 'London' },
  { zone: 'Europe/Berlin', label: 'Berlin' },
] as const

const WORKDAY = { start: 9 * 60, end: 18 * 60 }
const FALLBACK_ZONE = 'Europe/Berlin'

function verdict(minutes: number) {
  if (minutes >= 360) return { label: 'Full-day overlap', tone: 'signal' as const }
  if (minutes >= 180) return { label: 'Strong overlap', tone: 'signal' as const }
  if (minutes >= 60) return { label: 'Enough for stand-ups and pairing', tone: 'signal' as const }
  if (minutes > 0) return { label: 'Short daily window', tone: 'warn' as const }
  return { label: 'Follow-the-sun: you wake up to shipped work', tone: 'warn' as const }
}

const pct = (m: number) => `${(m / MINUTES_PER_DAY) * 100}%`

function Band({ segments, className }: { segments: Segment[]; className: string }) {
  return (
    <>
      {segments.map((s) => (
        <span
          key={`${s.start}-${s.end}`}
          aria-hidden
          className={`absolute ${className}`}
          style={{ left: pct(s.start), width: pct(s.end - s.start) }}
        />
      ))}
    </>
  )
}

function ranges(segments: Segment[]) {
  // Merge the two halves of a midnight-crossing span for display: 22:00–01:00, not two ranges.
  if (segments.length === 2 && segments[0]?.start === 0 && segments[1]?.end === MINUTES_PER_DAY) {
    return `${formatClock(segments[1].start)}–${formatClock(segments[0].end)}`
  }
  return segments.map((s) => `${formatClock(s.start)}–${formatClock(s.end)}`).join(', ')
}

export default function OverlapCard() {
  const [detected, setDetected] = useState<string | null>(null)
  const [zone, setZone] = useState<string>(FALLBACK_ZONE)
  const [now, setNow] = useState<Date | null>(null)
  const [allZones, setAllZones] = useState<string[]>([])

  useEffect(() => {
    const tz = detectTimeZone()
    if (tz) {
      setDetected(tz)
      setZone(tz)
    }
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  // ~430 zones: build the <option> list on first interaction, not on load.
  const loadAllZones = () => {
    if (allZones.length) return
    try {
      setAllZones(Intl.supportedValuesOf('timeZone'))
    } catch {
      setAllZones(PRESETS.map((p) => p.zone))
    }
  }

  const viewer: DailyWindow = useMemo(() => ({ timeZone: zone, ...WORKDAY }), [zone])
  const result = useMemo(() => computeOverlap(availability, viewer, now ?? undefined), [viewer, now])
  const v = verdict(result.minutes)
  const city = cityFromZone(zone)
  const online = now ? isWithin(availability, now) : null
  const viewerNow = now ? localMinutesNow(zone, now) : null
  const hostRange = ranges(result.host)
  const overlapRange = result.minutes > 0 ? ranges(result.overlap) : null

  const mailto = useMemo(() => {
    const subject = `Intro call — ${profile.role} role`
    const lines = [
      `Hi Atul,`,
      ``,
      `I'm hiring for a remote frontend role and would like to talk.`,
      `We're based in ${city} (${shortOffsetLabel(zone)}).`,
      overlapRange ? `Your portfolio shows our overlap as ${overlapRange} our time — does a call in that window work?` : `Could we find a time that works for both of us?`,
      ``,
      `Role / team:`,
      `Link to job post:`,
    ]
    return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  }, [city, zone, overlapRange])

  const zoneOptions = useMemo(() => {
    const set = new Set(allZones)
    set.add(zone)
    return Array.from(set).sort()
  }, [allZones, zone])

  return (
    <section aria-labelledby="fit-title" className="card relative overflow-hidden p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Time zone fit</p>
          <h2 id="fit-title" className="mt-1 text-lg font-semibold">
            Your workday vs. my hours
          </h2>
        </div>
        {online !== null && (
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg-muted">
            <span className={`h-1.5 w-1.5 rounded-full ${online ? 'animate-pulseDot bg-signal' : 'bg-fg-subtle'}`} />
            {online ? 'Online now' : `Back at ${formatClock(result.host[result.host.length > 1 ? 1 : 0]?.start ?? 0)} your time`}
          </span>
        )}
      </div>

      <div role="radiogroup" aria-label="Choose your team's time zone" className="mt-5 flex flex-wrap gap-2">
        {detected && !PRESETS.some((p) => p.zone === detected) && (
          <ZoneChip active={zone === detected} onClick={() => setZone(detected)}>
            {cityFromZone(detected)} · you
          </ZoneChip>
        )}
        {PRESETS.map((p) => (
          <ZoneChip key={p.zone} active={zone === p.zone} onClick={() => setZone(p.zone)}>
            {p.label}
            {detected === p.zone && ' · you'}
          </ZoneChip>
        ))}
        <label className="relative">
          <span className="sr-only">Any time zone</span>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            onFocus={loadAllZones}
            onPointerDown={loadAllZones}
            className="h-8 max-w-[9.5rem] cursor-pointer appearance-none rounded-full border border-line bg-transparent px-3 pr-7 font-mono text-xs text-fg-muted hover:bg-white/5"
          >
            {zoneOptions.map((z) => (
              <option key={z} value={z} className="bg-ink-2">
                {z.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-fg-subtle">
            ▾
          </span>
        </label>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4" aria-live="polite">
        <div>
          <p className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
            {result.minutes > 0 ? formatDuration(result.minutes) : 'Async'}
          </p>
          <p className={`mt-1 text-sm ${v.tone === 'signal' ? 'text-signal' : 'text-warn'}`}>{v.label}</p>
        </div>
        <p className="text-right text-sm text-fg-muted">
          {overlapRange ? (
            <>
              <span className="font-mono text-fg">{overlapRange}</span>
              <br />
              shared, {city} time
            </>
          ) : (
            <>
              My hours are
              <br />
              <span className="font-mono text-fg">{hostRange}</span> {city} time
            </>
          )}
        </p>
      </div>

      {/* 24h timeline in the viewer's clock */}
      <figure className="mt-6">
        <div className="relative h-11 overflow-hidden rounded-lg bg-white/[0.03] ring-1 ring-inset ring-line">
          <Band segments={result.viewer} className="inset-y-0 bg-white/[0.07]" />
          <Band segments={result.host} className="inset-y-3 rounded-sm bg-signal/25" />
          <Band segments={result.overlap} className="inset-y-3 rounded-sm bg-signal" />
          {[6, 12, 18].map((h) => (
            <span key={h} aria-hidden className="absolute inset-y-0 w-px bg-line" style={{ left: pct(h * 60) }} />
          ))}
          {viewerNow !== null && (
            <span aria-hidden className="absolute inset-y-0 w-0.5 bg-white" style={{ left: pct(viewerNow) }}>
              <span className="absolute -top-px left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white" />
            </span>
          )}
        </div>
        <div aria-hidden className="mt-1.5 flex justify-between font-mono text-[10px] text-fg-subtle">
          <span>00</span>
          <span>06</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>
        <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-muted">
          <Legend swatch="bg-white/20">Your 09:00–18:00</Legend>
          <Legend swatch="bg-signal/40">My hours ({hostRange})</Legend>
          <Legend swatch="bg-signal">Overlap</Legend>
          {viewerNow !== null && <Legend swatch="bg-white">Now {formatClock(viewerNow)}</Legend>}
        </figcaption>
      </figure>

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-subtle">
          I&apos;m in {profile.location} ({shortOffsetLabel(availability.timeZone)}). Need another window? Tell me your core hours.
        </p>
        <a href={mailto} className="btn-primary shrink-0">
          Propose a call
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  )
}

function ZoneChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`h-8 rounded-full border px-3 text-xs font-medium transition-colors ${
        active ? 'border-signal bg-signal text-signal-ink' : 'border-line text-fg-muted hover:bg-white/5 hover:text-fg'
      }`}
    >
      {children}
    </button>
  )
}

function Legend({ swatch, children }: { swatch: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className={`h-2 w-3 rounded-sm ${swatch}`} />
      {children}
    </span>
  )
}
