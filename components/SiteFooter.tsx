import Link from 'next/link'
import { profile } from '@/content/profile'

export default function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-page flex-col gap-3 border-t border-line px-5 py-8 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript, and Tailwind CSS —{' '}
        <a href="https://github.com/atultrp/atultrp-v2" target="_blank" rel="noopener" className="link">
          source
        </a>
        .
      </p>
      <Link href="/freelance" className="link">
        Freelance work
      </Link>
    </footer>
  )
}
