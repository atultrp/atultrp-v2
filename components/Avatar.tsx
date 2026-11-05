import Image from 'next/image'
import { useState } from 'react'
import { profile } from '@/content/profile'

export default function Avatar({ size }: { size: number }) {
  const [failed, setFailed] = useState(false)
  const style = { width: size, height: size }

  if (failed) {
    return (
      <span style={style} className="grid shrink-0 place-items-center rounded-full bg-ink-3 font-mono text-xs font-semibold text-fg-muted ring-1 ring-line">
        AT
      </span>
    )
  }

  return (
    <Image
      src={profile.photo}
      alt={profile.name}
      width={size}
      height={size}
      priority
      onError={() => setFailed(true)}
      style={style}
      className="shrink-0 rounded-full object-cover ring-1 ring-line"
    />
  )
}
