import BackgroundAnimation from '@/Animation/BackgroundAnimation'
import React from 'react'

const HeroSection = () => {
  return (
    <div className='flex relative items-center min-h-[80vh]'>
      <div className='md:w-11/12 space-y-4'>
        <h2 className='text-2xl sm:text-3xl font-semibold text-gray-300 italic'>Hi, my name is</h2>
        <h1 className='text-4xl sm:text-5xl font-bold text-white'>ATUL TRIPATHI.</h1>
        <h1 className='text-4xl sm:text-5xl font-bold text-white'>I LOVE TO LEARN & CREATE STUFF.</h1>
        <p className='text-base sm:text-[19px] text-gray-300 w-10/12 tracking-wide'>I'm a Fullstack web Developer. I love learning new things and challenging myself. Currently I'm focused on developing and maintaining awesome interfaces & experiences at {" "}<a href="https://riskcovry.com/" className="font-semibold underline">Riskcovry</a> for insurTech industry.</p>
      </div>
      <div className='sm:w-[500px] w-96 absolute right-0'>
        <BackgroundAnimation />
      </div>
    </div>
  )
}

export default HeroSection