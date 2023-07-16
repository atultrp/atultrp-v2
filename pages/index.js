import HeroSection from "@/components/HeroSection";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className='max-w-[900px] w-full mx-4'>
      <Header />
      <HeroSection />
    </div>
  )
}
