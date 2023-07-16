import React from 'react'
import { BsGithub, BsTwitter, BsLinkedin, BsInstagram } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { TbPoint } from 'react-icons/tb'

const About = () => {
  return (
    <div className='mt-4 mb-8'>
      <h3 className='text-2xl font-semibold text-gray-300 italic'>Who I am</h3>
      <h2 className='text-5xl font-bold text-white'>About</h2>

      <div className="flex flex-col-reverse sm:flex-row sm:mt-6 items-center">
        <div className="space-y-3 sm:w-3/5">
          <h3 className="text-3xl font-medium custom-font">
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
        <div className="mx-auto my-5 sm:w-2/5 ">
          <img src="/Images/atultrp_photo_real.jpeg" alt="profile" className="w-56 rounded-lg border-8 border-gray-100 mx-auto" />
          <p className="text-3xl text-center font-medium custom-font mt-2">Atul Tripathi</p>
          <div className="flex justify-center space-x-4 text-2xl my-3">
            <a href="https://github.com/atultrp" className="hover:scale-150 duration-200"><BsGithub /></a>
            <a href="https://www.twitter.com/atultrp_" className="hover:scale-150 duration-200"><BsTwitter /></a>
            <a href="https://www.linkedin.com/in/atultrp-/" className="hover:scale-150 duration-200"><BsLinkedin /></a>
            <a href="https://www.instagram.com/atultrp" className="hover:scale-150 duration-200"><BsInstagram /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About