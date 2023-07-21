import About from "@/components/About";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Work from "@/components/Work";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className='max-w-[900px] w-full lg:mx-4 mx-6 sm:mx-8'>
      <Header />
      <HeroSection />
      <div id="about">
        <About />
        <TechStack />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="work">
        <Work />
      </div>
    </div>
  )
}
