import About from "@/components/About";
import Contact from "@/components/Contact";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Work from "@/components/Work";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className='max-w-[900px] w-full lg:mx-4 mx-6 sm:mx-8'>
      <Header />
      <HeroSection />
      <div id="about" className='pt-12 pb-8'>
        <About />
        <TechStack />
      </div>
      <div id="services" className='pt-12 pb-8'>
        <Services />
      </div>
      <div id="projects" className='pt-12 pb-8'>
        <Projects />
      </div>
      <div id="work" className='pt-12 pb-8'>
        <Work />
      </div>
      <div id="contact" className='pt-12 pb-8'>
        <Contact />
      </div>
    </div>
  )
}
