import { techStackData } from '@/constant/data'
import { sectionHeading } from '@/shared/SharedComponents'
import React from 'react'

const TechStack = () => {
  const techStack = techStackData()

  const TitleText = ({ title }) => {
    return (
      <h3 className='text-lg sm:text-xl font-bold text-gray-200 mt-4'>{title}</h3>
    )
  }

  const TechStackCard = ({ title, icon }) => {
    return (
      <img src={icon} alt={title} className='mr-4 my-2' />
    )
  }

  return (
    <div className='mb-8 mt-20'>
      {sectionHeading('What I work with', 'Tech Stack')}

      <TitleText title='Languages' />
      <div className='flex flex-wrap'>
        {techStack?.languages?.map((item, index) => {
          return (
            <TechStackCard key={index} title={item?.title} icon={item?.icon} />
          )
        })}
      </div>

      <TitleText title='Frameworks and Libraries' />
      <div className='flex flex-wrap my-3'>
        {techStack?.frameworks?.map((item, index) => {
          return (
            <TechStackCard key={index} title={item?.title} icon={item?.icon} />
          )
        })}
      </div>

      <TitleText title='Databases' />
      <div className='flex flex-wrap my-3'>
        {techStack?.databases?.map((item, index) => {
          return (
            <TechStackCard key={index} title={item?.title} icon={item?.icon} />
          )
        })}
      </div>

      <TitleText title='Design' />
      <div className='flex flex-wrap my-3'>
        {techStack?.design?.map((item, index) => {
          return (
            <TechStackCard key={index} title={item?.title} icon={item?.icon} />
          )
        })}
      </div>

      <TitleText title='Package Managers' />
      <div className='flex flex-wrap my-3'>
        {techStack?.packageManagers?.map((item, index) => {
          return (
            <TechStackCard key={index} title={item?.title} icon={item?.icon} />
          )
        })}
      </div>

      <TitleText title='IDEs/Editors' />
      <div className='flex flex-wrap my-3'>
        {techStack?.IDEs?.map((item, index) => {
          return (
            <TechStackCard key={index} title={item?.title} icon={item?.icon} />
          )
        })}
      </div>

      <TitleText title='VersionControl and OS' />
      <div className='flex flex-wrap my-3'>
        {techStack?.versionControlOS?.map((item, index) => {
          return (
            <TechStackCard key={index} title={item?.title} icon={item?.icon} />
          )
        })}
      </div>

      <TitleText title='Hosting' />
      <div className='flex flex-wrap my-3'>
        {techStack?.hosting?.map((item, index) => {
          return (
            <TechStackCard key={index} title={item?.title} icon={item?.icon} />
          )
        })}
      </div>

    </div>
  )
}

export default TechStack