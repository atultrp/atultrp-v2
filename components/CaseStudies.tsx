import Link from 'next/link'
import { caseStudies } from '@/content/caseStudies'
import Section from '@/components/Section'
import ProjectImage from '@/components/ProjectImage'

export default function CaseStudies() {
  return (
    <Section id="work" index="02" eyebrow="Selected work" title="Case studies">
      <p className="-mt-2 mb-8 max-w-xl text-fg-muted">
        Three projects, each written up as problem, decisions, challenges, and results — the way I would walk you through them in an interview.
      </p>
      <ul className="grid gap-6 md:grid-cols-2">
        {caseStudies.map((c, i) => (
          <li key={c.slug} className={i === 0 ? 'md:col-span-2' : ''}>
            <Link href={`/work/${c.slug}`} className="card group block overflow-hidden transition-colors hover:border-white/20">
              <ProjectImage aspect={i === 0 ? 'aspect-[16/10] md:aspect-[21/9]' : undefined} position={c.imagePosition} src={c.image} alt={c.imageAlt} title={c.title} sizes={i === 0 ? '(min-width: 1024px) 56rem, 100vw' : '(min-width: 768px) 28rem, 100vw'} />
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="eyebrow">
                    {c.kind}
                    {c.year && ` · ${c.year}`}
                  </p>
                  {c.headline && <span className="chip border-signal/30 text-signal">{c.headline}</span>}
                </div>
                <h3 className="mt-3 text-xl font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-fg-muted">{c.tagline}</p>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {c.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <span className="shrink-0 text-sm font-medium text-fg transition-transform group-hover:translate-x-1">
                    Read <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
