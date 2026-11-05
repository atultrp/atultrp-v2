import type { ReactNode } from 'react'

export default function Section({
  id,
  index,
  eyebrow,
  title,
  children,
}: {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
        <header>
          <p className="eyebrow">
            <span className="text-signal">{index}</span> / {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
        </header>
        <div>{children}</div>
      </div>
    </section>
  )
}
