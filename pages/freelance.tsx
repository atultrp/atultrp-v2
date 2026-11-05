import Link from 'next/link'
import Seo from '@/components/Seo'
import { profile, upworkUrl } from '@/content/profile'

const services = [
  { title: 'Custom website design', body: 'Visually engaging websites that reflect your brand and put users first.' },
  { title: 'Responsive development', body: 'Websites that adapt to every device for a consistent experience.' },
  { title: 'Modern frontend stack', body: 'Dynamic websites built with React, Next.js, and modern frontend tools.' },
  { title: 'Performance optimization', body: 'Fast-loading pages that keep visitors engaged.' },
  { title: 'SEO-friendly development', body: 'Semantic, crawlable markup that improves search visibility.' },
  { title: 'Ongoing support', body: 'Maintenance and improvements after launch.' },
]

export default function Freelance() {
  return (
    <div className="pb-16 pt-10 sm:pt-14">
      <Seo title="Freelance services" description="Freelance React and Next.js development by Atul Tripathi." />
      <Link href="/" className="text-sm text-fg-muted link">
        <span aria-hidden>←</span> Home
      </Link>
      <p className="eyebrow mt-8">Freelance</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Need a website built? I take selected projects.</h1>
      <p className="mt-4 max-w-xl text-lg text-fg-muted">
        Alongside my full-time work, I build websites for small businesses and startups through Upwork.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={upworkUrl} target="_blank" rel="noopener" className="btn-primary">
          Hire me on Upwork ↗
        </a>
        <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Freelance project')}`} className="btn-ghost">
          Email me
        </a>
      </div>
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.title} className="card p-6">
            <h2 className="font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
