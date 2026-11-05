export type CaseStudy = {
  slug: string
  title: string
  tagline: string
  kind: 'Product' | 'Client work' | 'Open source'
  year?: string
  image: string
  imageAlt: string
  stack: string[]
  live?: string
  repo?: string
  /** Shown as the headline result on the card. Real numbers only. */
  headline?: string
  problem: string
  decisions: string[]
  challenges: string[]
  results: string[]
  /** What I would change with today's knowledge. */
  retrospective?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'track-daily',
    title: 'Track Daily',
    tagline: 'A habit tracker that syncs in real time across devices.',
    kind: 'Product',
    year: '2024',
    image: '/project/trackDaily.jpeg',
    imageAlt: 'Track Daily landing page with the headline "Track Your Daily Routines with Ease".',
    stack: ['Next.js 15', 'React', 'Firebase', 'Tailwind CSS'],
    live: 'https://track-daily.vercel.app/',
    headline: '50+ active users',
    problem:
      'People who want to build habits need to log each day in seconds and see progress at a glance. Heavy setup and slow screens make them stop.',
    decisions: [
      'Next.js 15 for fast first load and simple Vercel deploys.',
      'Firebase real-time storage, so a log on one device shows on every other device with no custom backend.',
      'Tailwind CSS with a small set of tokens to keep the UI consistent while iterating fast.',
    ],
    challenges: [
      'Keeping habit and streak data correct when the same user logs from more than one device.',
      'Making the daily check-in a one-tap action on mobile.',
    ],
    results: ['50+ users track habits on the app.', 'Live on Vercel with real-time sync.'],
  },
  {
    slug: 'theeclub',
    title: 'TheeClub',
    tagline: 'Token staking and purchase dApp for a crypto community.',
    kind: 'Client work',
    image: '/project/TheeClub.png',
    imageAlt: 'TheeClub dApp interface for staking and buying CRT tokens.',
    stack: ['Next.js', 'React', 'ethers.js', 'Web3', 'Tailwind CSS'],
    live: 'https://theeclub.vercel.app/',
    headline: 'Shipped to production',
    problem:
      'The client needed a web app where community members connect a wallet, stake tokens for rewards, and buy CRT tokens — without reading a manual.',
    decisions: [
      'ethers.js for MetaMask wallet connection and smart contract calls for staking and token purchase.',
      'Next.js and Tailwind CSS for a fast, responsive marketing site and app in one codebase.',
    ],
    challenges: [
      'On-chain transactions take seconds to minutes. The UI must show progress and never let users double-submit.',
      'Wallet and network changes can happen at any moment and must reset dependent state safely.',
    ],
    results: ['Delivered to the client and deployed to production on Vercel.'],
  },
  {
    slug: 'world-rank',
    title: 'World Ranking App',
    tagline: 'Sort, filter, and compare every country by population and area.',
    kind: 'Open source',
    image: '/project/worldRank.png',
    imageAlt: 'World Ranking App table listing countries with population and area columns.',
    stack: ['Next.js', 'React', 'REST Countries API', 'CSS Modules'],
    live: 'https://world-rank.atultrp.vercel.app/',
    repo: 'https://github.com/atultrp/World-Rank-App',
    problem:
      'Country data is public but hard to compare. Users want one sortable table with search, plus a detail page for each country.',
    decisions: [
      'Server-side rendering with getServerSideProps against REST Countries v3.1, so the first paint already contains the full table.',
      'In-memory filtering by name or region on the client — no refetch per keystroke.',
      'A dynamic /country/[id] route for detail pages, and a persistent light/dark theme.',
    ],
    challenges: [
      'The /all endpoint returns a large payload for a table that needs a few columns.',
      'Sorting by several keys while search is active, without losing the sort direction.',
    ],
    results: ['Open source and live on Vercel.'],
    retrospective:
      'Country data changes rarely. Today I would use static generation with revalidation instead of SSR on every request, request only the fields the table renders, and virtualize the list.',
  },
]

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug)
