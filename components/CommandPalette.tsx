import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { caseStudies } from '@/content/caseStudies'
import { profile, socials } from '@/content/profile'
import { useToast } from '@/components/Toast'

type Command = { id: string; group: string; label: string; hint?: string; run: () => void }

const PaletteContext = createContext<{ open: () => void }>({ open: () => {} })
export const useCommandPalette = () => useContext(PaletteContext)

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const open = useCallback(() => setOpen(true), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(() => ({ open }), [open])

  return (
    <PaletteContext.Provider value={value}>
      {children}
      {isOpen && <Palette onClose={() => setOpen(false)} />}
    </PaletteContext.Provider>
  )
}

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const toast = useToast()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const restoreFocus = useRef<Element | null>(null)

  const go = useCallback(
    (hash: string) => {
      if (router.pathname === '/') document.querySelector(hash)?.scrollIntoView()
      else void router.push(`/${hash}`)
    },
    [router],
  )

  const commands: Command[] = useMemo(
    () => [
      {
        id: 'copy-email',
        group: 'Contact',
        label: 'Copy email address',
        hint: profile.email,
        run: () => {
          void navigator.clipboard.writeText(profile.email).then(() => toast('Email copied'))
        },
      },
      { id: 'email', group: 'Contact', label: 'Write an email', run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: 'resume', group: 'Contact', label: 'Open résumé (PDF)', run: () => window.open(profile.resumePath, '_blank', 'noopener') },
      ...socials.map((s) => ({
        id: s.label,
        group: 'Contact',
        label: `Open ${s.label}`,
        hint: s.handle,
        run: () => window.open(s.href, '_blank', 'noopener'),
      })),
      { id: 'nav-fit', group: 'Navigate', label: 'Time zone fit', run: () => go('#top') },
      { id: 'nav-exp', group: 'Navigate', label: 'Experience', run: () => go('#experience') },
      { id: 'nav-work', group: 'Navigate', label: 'Case studies', run: () => go('#work') },
      { id: 'nav-stack', group: 'Navigate', label: 'Stack', run: () => go('#stack') },
      { id: 'nav-contact', group: 'Navigate', label: 'Contact', run: () => go('#contact') },
      ...caseStudies.map((c) => ({
        id: `cs-${c.slug}`,
        group: 'Case studies',
        label: c.title,
        hint: c.tagline,
        run: () => void router.push(`/work/${c.slug}`),
      })),
    ],
    [go, router, toast],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.group} ${c.label} ${c.hint ?? ''}`.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    restoreFocus.current = document.activeElement
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      if (restoreFocus.current instanceof HTMLElement) restoreFocus.current.focus()
    }
  }, [])

  const execute = (cmd: Command | undefined) => {
    if (!cmd) return
    onClose()
    cmd.run()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      execute(results[active])
    } else if (e.key === 'Tab') {
      e.preventDefault() // keep focus in the dialog
    }
  }

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, listId])

  let lastGroup = ''

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]" onKeyDown={onKeyDown}>
      <div aria-hidden className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label="Command menu" className="card relative w-full max-w-lg animate-rise overflow-hidden bg-ink-2 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span aria-hidden className="font-mono text-fg-subtle">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
            aria-autocomplete="list"
            className="h-14 w-full bg-transparent text-base text-fg placeholder:text-fg-subtle focus:outline-none focus-visible:ring-0"
          />
          <kbd className="chip shrink-0">esc</kbd>
        </div>
        <ul id={listId} role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-fg-subtle">No results</li>}
          {results.map((cmd, i) => {
            const header = cmd.group !== lastGroup ? cmd.group : null
            lastGroup = cmd.group
            return (
              <li key={cmd.id} role="presentation">
                {header && <p className="eyebrow px-3 pb-1 pt-3">{header}</p>}
                <div
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => execute(cmd)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm ${
                    i === active ? 'bg-white/[0.06] text-fg' : 'text-fg-muted'
                  }`}
                >
                  <span>{cmd.label}</span>
                  {cmd.hint && <span className="truncate font-mono text-xs text-fg-subtle">{cmd.hint}</span>}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
