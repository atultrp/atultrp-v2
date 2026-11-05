import type { DailyWindow } from '@/lib/timezone'

export const profile = {
  name: 'Atul Tripathi',
  role: 'Senior Frontend Engineer',
  stackLine: 'React · TypeScript · Next.js',
  location: 'Bangalore, India',
  email: 'atul31815@gmail.com',
  resumePath: '/Atul_Tripathi_Resume.pdf',
  photo: '/Images/AtulTripathi.jpeg',
  summary:
    'Senior Frontend Engineer with 4+ years of experience building React and Next.js products for insurance and fintech. I focus on performance, accessibility, and scalable UI architecture. Open to full-time remote roles.',
  siteUrl: 'https://atultrp.vercel.app',
} as const

/**
 * Hours I can be online for live collaboration, in my local time.
 * The overlap card on the home page reads this. Keep it honest — recruiters will hold you to it.
 */
export const availability: DailyWindow = {
  timeZone: 'Asia/Kolkata',
  start: 12 * 60,
  end: 22 * 60,
}

export type Social = { label: string; href: string; handle: string }

export const socials: Social[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/atultrp-/', handle: 'in/atultrp-' },
  { label: 'GitHub', href: 'https://github.com/atultrp', handle: '@atultrp' },
  { label: 'X / Twitter', href: 'https://www.twitter.com/atultrp_', handle: '@atultrp_' },
  { label: 'dev.to', href: 'https://dev.to/atultrp', handle: '@atultrp' },
]

export const upworkUrl = 'https://www.upwork.com/freelancers/atultrp'

export type Metric = { value: string; label: string }

/** Every number here comes from the résumé. Do not add numbers you cannot defend in an interview. */
export const metrics: Metric[] = [
  { value: '4+ yrs', label: 'shipping production React' },
  { value: '20+', label: 'components in the design system I built' },
  { value: '−40%', label: 'bugs after I set code review standards' },
  { value: '−30%', label: 'dev time from reusable component library' },
]

export type Role = {
  title: string
  company: string
  companyUrl?: string
  period: string
  location: string
  highlights: string[]
}

export const experience: Role[] = [
  {
    title: 'Senior Software Engineer, Frontend',
    company: 'Riskcovry',
    companyUrl: 'https://riskcovry.com/',
    period: 'Apr 2025 — Present',
    location: 'Bangalore · Insurtech',
    highlights: [
      'Built a reusable design system with 20+ components, which removed UI inconsistencies and sped up delivery.',
      'Set code review standards and frontend best practices, which cut bugs by 40%.',
      'Led frontend architecture decisions across multiple React projects for scalability and maintainability.',
      'Mentored junior developers and set requirements with backend and product, so features shipped with minimal rework.',
    ],
  },
  {
    title: 'Software Engineer, Frontend (promoted)',
    company: 'Riskcovry',
    companyUrl: 'https://riskcovry.com/',
    period: 'Jul 2022 — Apr 2025',
    location: 'Bangalore · Insurtech',
    highlights: [
      'Built 15+ reusable React components, which cut development time by 30%.',
      'Integrated REST APIs into 5+ frontend applications with consistent data handling.',
      'Introduced Redux state management, which improved stability and maintainability by 25%.',
      'Shipped with cross-functional teams of 5+ people and raised user satisfaction by 20%.',
    ],
  },
  {
    title: 'Independent Frontend Engineer',
    company: 'Upwork',
    companyUrl: upworkUrl,
    period: 'Mar 2022 — Present',
    location: 'Remote · Client work',
    highlights: [
      'Delivered 9 client frontends end to end, from scoping to production deploy on Vercel.',
      'Built Web3 interfaces with MetaMask wallet connection, token staking, and minting using ethers.js.',
    ],
  },
  {
    title: 'Frontend Engineer, Intern',
    company: 'Riskcovry',
    companyUrl: 'https://riskcovry.com/',
    period: 'Jan 2022 — Apr 2022',
    location: 'Remote',
    highlights: [
      'Optimized frontend code, which improved load speed by 15%.',
    ],
  },
]

export type StackGroup = { label: string; items: string[] }

export const stack: StackGroup[] = [
  { label: 'Core', items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Redux', 'Tailwind CSS', 'Framer Motion'] },
  { label: 'AI & LLM', items: ['Claude API', 'RAG pipelines', 'LangChain.js', 'Voyage AI embeddings', 'Pinecone', 'SSE streaming'] },
  { label: 'Backend & data', items: ['Node.js', 'Express', 'MongoDB', 'Firebase'] },
  { label: 'Testing', items: ['Vitest', 'React Testing Library'] },
  { label: 'Workflow', items: ['Git', 'GitHub Actions', 'Figma', 'Vercel'] },
]
