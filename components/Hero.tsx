import { profile, socials } from '@/content/profile'
import OverlapCard from '@/components/OverlapCard'
import Avatar from '@/components/Avatar'

const linkedin = socials.find((s) => s.label === 'LinkedIn')

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24">
      <div className="animate-rise">
        <p className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/[0.06] px-3 py-1 text-xs font-medium text-signal">
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-signal" />
          Open to full-time remote roles · US &amp; EU
        </p>

        <div className="mt-8 flex items-center gap-3">
          <Avatar size={44} />
          <div className="leading-tight">
            <p className="font-semibold">{profile.name}</p>
            <p className="text-sm text-fg-subtle">{profile.location}</p>
          </div>
        </div>

        <h1 id="hero-title" className="mt-6 text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Senior Frontend
          <br />
          Engineer<span className="text-signal">.</span>
        </h1>
        <p className="mt-3 font-mono text-sm text-fg-muted sm:text-base">{profile.stackLine}</p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">{profile.summary}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Frontend role — let’s talk')}`} className="btn-primary">
            Email me <span aria-hidden>→</span>
          </a>
          <a href={profile.resumePath} target="_blank" rel="noopener" className="btn-ghost">
            Download résumé
          </a>
          {linkedin && (
            <a href={linkedin.href} target="_blank" rel="noopener" className="px-2 text-sm text-fg-muted link">
              LinkedIn ↗
            </a>
          )}
        </div>
      </div>

      <div className="animate-rise [animation-delay:120ms]">
        <OverlapCard />
      </div>
    </section>
  )
}
