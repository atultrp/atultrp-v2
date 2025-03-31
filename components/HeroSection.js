import BackgroundAnimation from '@/Animation/BackgroundAnimation'
import React from 'react'
import { HiDocumentText } from 'react-icons/hi'
import { BiCodeAlt } from 'react-icons/bi'
import { scrollNavItemSmooth } from '@/shared/ShareFunction'

const HeroSection = () => {
  return (
    <div className='flex relative items-center min-h-[80vh]'>
      <div className='md:w-11/12 space-y-4'>
        <h2 className='text-2xl sm:text-3xl font-semibold text-gray-300 italic'>Hi, my name is</h2>
        <h1 className='text-4xl sm:text-5xl font-bold text-white'>ATUL TRIPATHI.</h1>
        <h1 className='text-4xl sm:text-5xl font-bold text-white'>I LOVE TO LEARN & CREATE STUFF.</h1>
        <p className='text-base sm:text-[19px] text-gray-300 w-10/12 tracking-wide'>I'm a Fullstack web Developer. I love learning new things and challenging myself. Currently I'm focused on developing and maintaining awesome interfaces & experiences at {" "}<a href="https://riskcovry.com/" className="font-semibold underline">Riskcovry</a> for insurTech industry.</p>
        <div className='hidden sm:flex space-x-3'>
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
      </div>
      <div className='sm:w-[500px] w-96 absolute right-0'>
        <BackgroundAnimation />
      </div>
    </div>
  )
}

export default HeroSection