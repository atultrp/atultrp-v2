import { stack } from '@/content/profile'
import Section from '@/components/Section'

export default function Stack() {
  return (
    <Section id="stack" index="03" eyebrow="Stack" title="Tools I ship with">
      <dl className="divide-y divide-line rounded-2xl border border-line">
        {stack.map((g) => (
          <div key={g.label} className="grid gap-3 p-5 sm:grid-cols-[10rem_1fr] sm:items-center sm:p-6">
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{g.label}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item} className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-sm text-fg ring-1 ring-inset ring-line">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
