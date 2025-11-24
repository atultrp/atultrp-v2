import '@/styles/globals.css'
import { Analytics } from "@vercel/analytics/next"

export default function App({ Component, pageProps }) {
  return <div className='flex justify-center'>
    <Component {...pageProps} />
    <Analytics />
  </div>
}
