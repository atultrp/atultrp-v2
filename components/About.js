import { sectionHeading } from '@/shared/SharedComponents'
import React from 'react'
import { BsGithub, BsTwitter, BsLinkedin, BsInstagram } from 'react-icons/bs'
import { TbPoint } from 'react-icons/tb'
import { SiUpwork } from 'react-icons/si'
import { HiDocumentText } from 'react-icons/hi'
import { scrollNavItemSmooth } from '@/shared/ShareFunction'
import { BiCodeAlt } from 'react-icons/bi'

const About = () => {

  const SocialLinks = () => {
    return (
      <>
        <a href="https://github.com/atultrp" className="hover:scale-150 duration-200"><BsGithub /></a>
        <a href="https://www.upwork.com/freelancers/atultrp" className="hover:scale-150 duration-200"><SiUpwork /></a>
        <a href="https://www.linkedin.com/in/atultrp-/" className="hover:scale-150 duration-200"><BsLinkedin /></a>
        <a href="https://www.twitter.com/atultrp_" className="hover:scale-150 duration-200"><BsTwitter /></a>
        <a href="https://www.instagram.com/atultrp" className="hover:scale-150 duration-200"><BsInstagram /></a>
      </>
    )
  }

  return (
    <div>
      {sectionHeading('Who I am', 'About')}

      <div className="flex flex-col-reverse sm:flex-row sm:mt-6 sm:items-center">
        <div className="space-y-3 sm:w-3/5">
          <h3 className="text-xl sm:text-3xl font-medium custom-font">
            Hi, I &apos; m a Web Developer 🚀 from Bangalore, India.
          </h3>
          <p className="text-base sm:text-lg text-gray-200">
            I am always eager to learn and explore new technologies, and stay up-to-date with the latest trends in web development 🚀. I specialize in using ReactJS, JavaScript, Redux, and NextJS to create beautiful and functional interfaces.
          </p>
          <p className="text-base sm:text-lg text-gray-200">
            In addition to my web development skills, I also have a keen eye for design and enjoy working with Adobe Illustrator to bring my ideas to life. When I'm not coding, you can find me exploring new tech stuff and sharing my knowledge with the community😉️.
          </p>
          <p className="text-base sm:text-lg text-gray-200">
            I also enjoy freelancing on Upwork and currently my focus is on building accessible and inclusive products at {" "}
            <a href="https://riskcovry.com/" className="font-semibold underline">
              Riskcovry
            </a>.
          </p>
          <div className="text-base sm:text-lg text-gray-200">
            Here are a few technologies I've been working with recently:
            <ul className="grid grid-cols-2 mt-3">
              <li className="flex items-center space-x-2">
                <TbPoint /> <span> JavaScript (ES6+)</span>
              </li>
              <li className="flex items-center space-x-2">
                <TbPoint /> <span> React</span>
              </li>
              <li className="flex items-center space-x-2">
                <TbPoint /> <span> Next.js</span>
              </li>
              <li className="flex items-center space-x-2">
                <TbPoint /> <span> Tailwind Css</span>
              </li>
              <li className="flex items-center space-x-2">
                <TbPoint /> <span> Redux</span>
              </li>
              <li className="flex items-center space-x-2">
                <TbPoint /> <span> Node.js</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="sm:mx-auto my-5 sm:w-2/5 ">
          <div className='flex items-center'>
            <img src="/Images/atultrp_photo.jpg" alt="profile" className="w-60 md:w-72 rounded-3xl border-8 border-gray-100 sm:mx-auto" />
            <div className="ml-6 space-x-6 text-2xl my-3 sm:hidden">
              <SocialLinks />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl sm:text-center font-medium custom-font my-4">Atul Tripathi</p>
          <div className='w-fit flex space-x-3 sm:mx-auto sm:mb-4'>
            <a href="/Atul Tripathi - Resume 2025 - v2.1.pdf" target="_blank">
              <button className='px-3 py-2 bg-white text-[#0F1624] font-bold rounded-md flex items-center space-x-1 duration-300 ease-in-out hover:scale-110'>
                <HiDocumentText className='text-xl' />
                <span>Resume</span>
              </button>
            </a>
            <a href="#contact" onClick={(e) => { scrollNavItemSmooth(e, "#contact") }}>
              <button className='px-3 py-2 bg-white text-[#0F1624] font-bold rounded-md flex items-center space-x-1 duration-300 ease-in-out hover:scale-110'>
                <BiCodeAlt className='text-xl' />
                <span>Hire Me</span>
              </button>
            </a>
          </div>
          <div className="sm:flex justify-center space-x-6 text-2xl my-3 hidden">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About