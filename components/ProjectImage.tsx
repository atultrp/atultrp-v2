import Image from 'next/image'
import { useState } from 'react'

export default function ProjectImage({
  src,
  alt,
  title,
  sizes,
  priority = false,
  aspect = 'aspect-[16/10]',
}: {
  src: string
  alt: string
  title: string
  sizes: string
  priority?: boolean
  aspect?: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-ink-3 ${aspect}`}>
      {failed ? (
        <div aria-label={alt} role="img" className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(185,243,91,0.18),transparent_55%)]">
          <span className="font-mono text-sm text-fg-subtle">{title}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
    </div>
  )
}
