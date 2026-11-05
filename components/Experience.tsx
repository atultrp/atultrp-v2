import { experience } from '@/content/profile'
import Section from '@/components/Section'

export default function Experience() {
  return (
    <Section id="experience" index="01" eyebrow="Experience" title="Where I've shipped">
      <ol className="space-y-12">
        {experience.map((role) => (
          <li key={`${role.company}-${role.period}`} className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-8">
            <div className="font-mono text-xs leading-relaxed text-fg-subtle">
              <p className="text-fg-muted">{role.period}</p>
              <p>{role.location}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {role.title}{' '}
                <span className="text-fg-subtle">·</span>{' '}
                {role.companyUrl ? (
                  <a href={role.companyUrl} target="_blank" rel="noopener" className="text-signal link">
                    {role.company}
                  </a>
                ) : (
                  role.company
                )}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {role.highlights.map((h) => (
                  <li key={h} className="relative pl-5 leading-relaxed text-fg-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-signal">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
