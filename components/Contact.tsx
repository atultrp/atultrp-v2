import { availability, profile, socials } from '@/content/profile'
import { formatClock, shortOffsetLabel } from '@/lib/timezone'
import CopyEmailButton from '@/components/CopyEmailButton'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-16 sm:py-24">
      <div className="card relative overflow-hidden p-6 sm:p-12">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal/10 blur-3xl" />
        <p className="eyebrow">
          <span className="text-signal">04</span> / Contact
        </p>
        <h2 id="contact-title" className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
          I am open to full-time remote frontend roles.
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-fg-muted">
          I work from {profile.location} ({shortOffsetLabel(availability.timeZone)}), available {formatClock(availability.start)}–
          {formatClock(availability.end)} IST. That covers most of the EU workday and the morning of US East Coast teams.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Frontend role — let’s talk')}`} className="btn-primary">
            Email me <span aria-hidden>→</span>
          </a>
          <CopyEmailButton />
          <a href={profile.resumePath} target="_blank" rel="noopener" className="btn-ghost">
            Résumé (PDF)
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener me" className="text-fg-muted link">
                {s.label} <span className="font-mono text-xs text-fg-subtle">{s.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
