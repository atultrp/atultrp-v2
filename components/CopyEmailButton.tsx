import { profile } from '@/content/profile'
import { useToast } from '@/components/Toast'

export default function CopyEmailButton({ className = 'btn-ghost' }: { className?: string }) {
  const toast = useToast()
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      toast('Email copied — talk soon')
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <button type="button" onClick={copy} className={className}>
      <span className="font-mono">{profile.email}</span>
      <span aria-hidden className="text-fg-subtle">⧉</span>
      <span className="sr-only">Copy email address</span>
    </button>
  )
}
