import Head from 'next/head'
import { useRouter } from 'next/router'
import { profile, socials } from '@/content/profile'

export const DEFAULT_TITLE = 'Senior Frontend Engineer – React, TypeScript, Next.js'
export const DEFAULT_DESCRIPTION =
  'Atul Tripathi, Senior Frontend Engineer with 4+ years of experience in React, TypeScript, and Next.js. Open to full-time remote roles.'

export default function Seo({ title, description = DEFAULT_DESCRIPTION }: { title?: string; description?: string }) {
  const { asPath } = useRouter()
  const fullTitle = title ? `${title} · ${profile.name}` : `${DEFAULT_TITLE} | ${profile.name}`
  const url = `${profile.siteUrl}${asPath === '/' ? '' : asPath.split('#')[0]}`

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: profile.siteUrl,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
    sameAs: socials.map((s) => s.href),
    knowsAbout: ['React', 'TypeScript', 'Next.js', 'Frontend architecture', 'Web accessibility', 'Web performance', 'Retrieval-augmented generation', 'LLM applications'],
  }

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@atultrp_" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
    </Head>
  )
}
