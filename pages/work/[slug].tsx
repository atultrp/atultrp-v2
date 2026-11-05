import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { caseStudies, getCaseStudy, type CaseStudy } from '@/content/caseStudies'
import { profile } from '@/content/profile'
import Seo from '@/components/Seo'
import ProjectImage from '@/components/ProjectImage'

type Props = { study: CaseStudy; next: Pick<CaseStudy, 'slug' | 'title' | 'tagline'> }

export const getStaticPaths: GetStaticPaths = () => ({
  paths: caseStudies.map((c) => ({ params: { slug: c.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : ''
  const study = getCaseStudy(slug)
  if (!study) return { notFound: true }
  const i = caseStudies.indexOf(study)
  const n = caseStudies[(i + 1) % caseStudies.length] ?? study
  return { props: { study, next: { slug: n.slug, title: n.title, tagline: n.tagline } } }
}

export default function CaseStudyPage({ study, next }: Props) {
  const parts: { n: string; label: string; body: string | string[] }[] = [
    { n: '01', label: 'Problem', body: study.problem },
    { n: '02', label: 'Decisions', body: study.decisions },
    { n: '03', label: 'Challenges', body: study.challenges },
    { n: '04', label: 'Results', body: study.results },
  ]

  return (
    <article className="pb-16 pt-10 sm:pt-14">
      <Seo title={`${study.title} case study`} description={study.tagline} />

      <Link href="/#work" className="text-sm text-fg-muted link">
        <span aria-hidden>←</span> All work
      </Link>

      <header className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="eyebrow">
            Case study · {study.kind}
            {study.year && ` · ${study.year}`}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">{study.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-fg-muted">{study.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {study.live && (
            <a href={study.live} target="_blank" rel="noopener" className="btn-primary">
              Live site ↗
            </a>
          )}
          {study.repo && (
            <a href={study.repo} target="_blank" rel="noopener" className="btn-ghost">
              Source ↗
            </a>
          )}
        </div>
      </header>

      <div className="card mt-10 overflow-hidden">
        <ProjectImage aspect="aspect-[16/10] md:aspect-[2/1]" position={study.imagePosition} src={study.image} alt={study.imageAlt} title={study.title} sizes="(min-width: 1152px) 72rem, 100vw" priority />
      </div>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        <div className="bg-ink p-5">
          <dt className="eyebrow">Stack</dt>
          <dd className="mt-2 text-fg">{study.stack.join(' · ')}</dd>
        </div>
        <div className="bg-ink p-5">
          <dt className="eyebrow">Outcome</dt>
          <dd className="mt-2 text-fg">{study.headline ?? study.results[0]}</dd>
        </div>
      </dl>

      <div className="mt-16 space-y-14">
        {parts.map((p) => (
          <section key={p.label} aria-labelledby={`part-${p.n}`} className="grid gap-4 lg:grid-cols-[14rem_1fr] lg:gap-16">
            <h2 id={`part-${p.n}`} className="eyebrow pt-1">
              <span className="text-signal">{p.n}</span> / {p.label}
            </h2>
            {Array.isArray(p.body) ? (
              <ul className="space-y-3">
                {p.body.map((b) => (
                  <li key={b} className="relative pl-5 text-lg leading-relaxed text-fg-muted before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2.5 before:bg-signal">
                    {b}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xl leading-relaxed text-fg">{p.body}</p>
            )}
          </section>
        ))}

        {study.retrospective && (
          <aside className="grid gap-4 lg:grid-cols-[14rem_1fr] lg:gap-16">
            <p className="eyebrow pt-1">If I built it today</p>
            <p className="rounded-2xl border border-signal/25 bg-signal/[0.05] p-5 text-lg leading-relaxed text-fg">{study.retrospective}</p>
          </aside>
        )}
      </div>

      <nav aria-label="More" className="mt-20 grid gap-4 border-t border-line pt-10 md:grid-cols-2">
        <Link href={`/work/${next.slug}`} className="card group p-6 transition-colors hover:border-white/20">
          <p className="eyebrow">Next case study</p>
          <p className="mt-2 text-xl font-semibold">
            {next.title} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </p>
          <p className="mt-1 text-fg-muted">{next.tagline}</p>
        </Link>
        <a href={`mailto:${profile.email}?subject=${encodeURIComponent(`Re: ${study.title} case study`)}`} className="card group p-6 transition-colors hover:border-signal/40">
          <p className="eyebrow">Hiring?</p>
          <p className="mt-2 text-xl font-semibold">
            Let&apos;s talk about your team <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </p>
          <p className="mt-1 text-fg-muted">{profile.email}</p>
        </a>
      </nav>
    </article>
  )
}
