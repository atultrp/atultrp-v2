import Seo from '@/components/Seo'
import Hero from '@/components/Hero'
import Metrics from '@/components/Metrics'
import Experience from '@/components/Experience'
import CaseStudies from '@/components/CaseStudies'
import Stack from '@/components/Stack'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Metrics />
      <Experience />
      <CaseStudies />
      <Stack />
      <Contact />
    </>
  )
}
