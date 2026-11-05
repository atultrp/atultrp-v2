import Link from 'next/link'
import { useEffect, useState } from 'react'
import { profile } from '@/content/profile'
import { useCommandPalette } from '@/components/CommandPalette'

const NAV = [
  { href: '/#experience', label: 'Experience' },
  { href: '/#work', label: 'Work' },
  { href: '/#stack', label: 'Stack' },
  { href: '/#contact', label: 'Contact' },
]

export default function SiteHeader() {
  const { open } = useCommandPalette()
  const [scrolled, setScrolled] = useState(false)
  const [mod, setMod] = useState('Ctrl')

  useEffect(() => {
    setMod(/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl')
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-ink/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-signal focus:px-3 focus:py-2 focus:text-signal-ink">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-lg bg-signal font-mono text-xs font-bold text-signal-ink transition-transform group-hover:-rotate-6">
            AT
          </span>
          <span className="sr-only text-sm font-semibold sm:not-sr-only">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:bg-white/5 hover:text-fg">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={open}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-3 text-sm text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
            aria-haspopup="dialog"
            aria-keyshortcuts="Meta+K Control+K"
          >
            <span className="md:hidden">Menu</span>
            <span className="hidden md:inline">Jump to</span>
            <kbd className="hidden rounded border border-line px-1.5 font-mono text-[11px] sm:inline">{mod} K</kbd>
          </button>
          <a href={profile.resumePath} target="_blank" rel="noopener" className="btn-primary hidden h-9 px-4 py-0 sm:inline-flex">
            Résumé
          </a>
        </div>
      </div>
    </header>
  )
}
