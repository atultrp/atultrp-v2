import { ServicesData } from '@/constant/data'
import ServiceCard from '@/shared/ServiceCard'
import Accordion from '@/shared/ServiceCard'
import { sectionHeading } from '@/shared/SharedComponents'
import React, { useEffect, useState } from 'react'
import { Fade } from 'react-awesome-reveal'

const Services = () => {
  const servicesData = ServicesData()
  const [serviceCardCount, setServiceCardCount] = useState(6)
  const [viewMore, setViewMore] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setServiceCardCount(3)
    }
  }, [])

  const handleViewMore = () => {
    if (window.innerWidth < 1024) {
      !viewMore ? setServiceCardCount(6) : setServiceCardCount(3)
      setViewMore(!viewMore)
    }
  }

  return (
    <div>
      {sectionHeading('What I can do', 'Services')}
      <div className='my-3'>
        Are you looking to establish a strong online presence for your business or showcase your work through a stunning personal website? Look no further! As a passionate web developer, I specialize in crafting high-quality, bespoke websites that leave a lasting impression.
      </div>
      <div>
        <h3 className='text-xl font-semibold mt-2'>What I Offer</h3>
        <div className='flex flex-wrap lg:justify-normal justify-center'>
          {servicesData?.slice(0, serviceCardCount)?.map((item, index) => (
            <div key={index} className='my-3 lg:mr-5 sm:mr-3 mr-1 flex lg:justify-normal justify-center'>
              <Fade cascade duration={1500} triggerOnce>
                <ServiceCard title={item.title} content={item.content} imgSrc={item.imgSrc} />
              </Fade>
            </div>
          ))}
        </div>
        <div className='flex justify-center my-4 lg:hidden'>
          <button
            className='bg-[#1a263d] px-4 py-2 rounded-lg text-gray-400 hover:text-white'
            onClick={() => handleViewMore()}
          >
            {viewMore ? "View Less" : "View More"}
          </button>
        </div>

      </div>
      <div className='mt-8'>
        <h3 className='text-xl font-semibold my-3'>Why Choose Me?</h3>
        <div className='space-y-2'>
          <p>
            I'm not just a developer, I'm your online journey partner. Through close collaboration, I understand your vision, goals, and audience. Together, we'll create a unique website that reflects your business objectives and sets you apart.
          </p>
          <p className='italic font-medium'>
            Reach out to me, and let's bring your ideas to life!
          </p>

        </div>
      </div>

    </div>
  )
}

export default Services