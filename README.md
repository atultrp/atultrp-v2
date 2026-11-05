# atultrp.vercel.app

Portfolio of Atul Tripathi, Senior Frontend Engineer (React, TypeScript, Next.js).

## Highlights

- **Time zone fit card** — detects the visitor's time zone and shows how many hours of their 09:00–18:00 workday overlap with mine, on a 24-hour timeline. DST-aware, built on `Intl` with no date library. "Propose a call" opens a prefilled email with the overlap window.
- **⌘K / Ctrl+K command menu** — keyboard-first navigation and contact actions, built as an ARIA combobox.
- **Case studies** — each project is written up as Problem, Decisions, Challenges, and Results at `/work/[slug]` (statically generated).

## Stack

Next.js 13 (pages router) · React 18 · TypeScript (strict) · Tailwind CSS · Vitest + Testing Library · GitHub Actions

## Scripts

```bash
npm run dev        # local dev server
npm run lint       # ESLint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit, strict mode
npm test           # Vitest
npm run build      # production build
```

## Editing content

All copy lives in `content/`:

- `content/profile.ts` — summary, metrics, experience, stack, socials, and the `availability` window that drives the time zone card.
- `content/caseStudies.ts` — case study data.

Use real numbers only.
