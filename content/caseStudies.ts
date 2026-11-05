export type CaseStudy = {
  slug: string
  title: string
  tagline: string
  kind: 'Product' | 'Client work' | 'Open source'
  year?: string
  image: string
  imageAlt: string
  /** Crop anchor; screenshots read best from the top, banners from the center. */
  imagePosition?: 'top' | 'center'
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
    slug: 'fastrag',
    title: 'FastRAG',
    tagline: 'A RAG starter kit for Next.js: chat with PDFs and web pages, with cited answers from Claude.',
    kind: 'Product',
    image: 'https://www.fastrag.live/api/og?page=home',
    imageAlt: 'FastRAG banner: "Build AI that knows your data." Ingest PDFs and URLs, answer with Claude, deploy to Vercel.',
    imagePosition: 'center',
    stack: ['Next.js', 'React', 'Claude Haiku 4.5', 'Voyage AI', 'Pinecone', 'LangChain.js', 'SSE'],
    live: 'https://www.fastrag.live/',
    headline: 'Launched · paid product',
    problem:
      'Developers who want to chat with their own documents must wire up ingestion, embeddings, vector search, and a streaming chat UI before they can ship a single feature. Each piece is simple; getting all of them to work together in production takes weeks.',
    decisions: [
      'Server-Sent Events for the chat stream. The first event carries the retrieved sources, so citations render before the first token of the answer.',
      'Cheerio instead of a headless browser for URL ingestion. It targets <main> and <article>, strips boilerplate, and stays within serverless limits.',
      'RecursiveCharacterTextSplitter with 1,000-character chunks and 200-character overlap, plus separate document and query embedders (Voyage AI voyage-3.5) to tune retrieval.',
      'One Pinecone index with a namespace per tenant, so documents never leak between users.',
      'The LLM, the vector store, and the embeddings each sit behind a single module, so buyers can swap a provider without touching the rest of the app.',
    ],
    challenges: [
      'A public demo spends real API money. I added per-visitor rate limiting (5 messages and 3 ingestions per 24 hours) and return a reset timestamp so the UI shows an exact countdown instead of a vague error.',
      'Questions with no relevant context invite hallucinated answers. Retrieval uses a 0.3 cosine similarity threshold, with a graceful fallback when nothing passes it.',
      'PDF uploads up to 20 MB must parse, chunk, embed, and upsert inside a serverless function, then report chunk stats back to the UI.',
    ],
    results: [
      'Launched as a paid product with a one-time license, delivered through Gumroad with lifetime updates.',
      'A public live demo runs real Claude streaming and Pinecone retrieval, with no signup.',
      'Shipped the full product surface on my own: landing page, docs, pricing, and the kit itself.',
    ],
  },
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
]

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug)
