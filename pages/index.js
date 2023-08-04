import About from "@/components/About";
import Contact from "@/components/Contact";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Work from "@/components/Work";
import Header from "@/components/layout/Header";
import { Fade, Slide, Roll, Bounce, Flip, Hinge, JackInTheBox, Rotate, Zoom } from "react-awesome-reveal";

export default function Home() {
  return (
    <div className='max-w-[900px] w-full lg:mx-4 mx-6 sm:mx-8'>
      <Header />
      <Fade cascade duration={1500} triggerOnce>
        <HeroSection />
      </Fade>

      <div id="about" className='pt-12 pb-8'>
        <Fade cascade duration={1500} triggerOnce>
          <About />
          <TechStack />
        </Fade>
      </div>

      <div id="services" className='pt-12 pb-8'>
        <Fade cascade duration={1500} triggerOnce>
          <Services />
        </Fade>
      </div>

      <div id="projects" className='pt-12 pb-8'>
        <Fade cascade duration={1500} triggerOnce>
          <Projects />
        </Fade>
      </div>

      <div id="work" className='pt-12 pb-8'>
        <Fade cascade duration={1500} triggerOnce>
          <Work />
        </Fade>
      </div>

      <div id="contact" className='pt-12 pb-8'>
        <Fade cascade duration={1500} triggerOnce>
          <Contact />
        </Fade>
      </div>

    </div>
  )
}
