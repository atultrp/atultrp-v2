import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CommandPaletteProvider } from '@/components/CommandPalette'
import { ToastProvider } from '@/components/Toast'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${sans.variable} ${mono.variable} font-sans`}>
      <ToastProvider>
        <CommandPaletteProvider>
          <SiteHeader />
          <main id="main" className="mx-auto max-w-page px-5 sm:px-8">
            <Component {...pageProps} />
          </main>
          <SiteFooter />
        </CommandPaletteProvider>
      </ToastProvider>
      <Analytics />
    </div>
  )
}
