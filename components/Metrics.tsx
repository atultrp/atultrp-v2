import { metrics } from '@/content/profile'

export default function Metrics() {
  return (
    <section aria-label="Impact at a glance" className="pb-16 sm:pb-24">
      <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={`flex flex-col-reverse gap-2 p-5 sm:p-6 ${i % 2 === 1 ? 'border-l border-line' : ''} ${
              i >= 2 ? 'border-t border-line lg:border-t-0' : ''
            } ${i === 2 ? 'lg:border-l' : ''}`}
          >
            <dt className="text-sm leading-snug text-fg-muted">{m.label}</dt>
            <dd className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{m.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
