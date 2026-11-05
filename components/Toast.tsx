import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

const ToastContext = createContext<(message: string) => void>(() => {})
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<number>()

  const show = useCallback((m: string) => {
    setMessage(m)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(null), 2200)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
        {message && (
          <p className="animate-rise rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink shadow-lg">{message}</p>
        )}
      </div>
    </ToastContext.Provider>
  )
}
