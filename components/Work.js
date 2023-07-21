import { WorkData } from '@/constant/data'
import { sectionHeading } from '@/shared/SharedComponents'
import React, { useState } from 'react'
import { FaFeatherPointed } from 'react-icons/fa6'

const Work = () => {
  const [activeTab, setActiveTab] = useState('Riskcovry')
  const work = WorkData()

  const CompanyCard = ({ company, active, key }) => {
    return (
      <div key={key} className={`${active === company && 'bg-[#1a263d]'} hover:bg-[#1a263d] duration-300 py-2 px-4 cursor-pointer rounded-lg whitespace-nowrap`} onClick={() => handleClickCompanyCard(company)}>
        {company}
      </div>
    )
  }

  const CompanyDetails = ({ company, description, active, position, date, url }) => {
    return (
      <div className={`${active !== company && "hidden"}`}>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-xl font-semibold'>
              {position}
            </h3>
            <p className=''>
              {date}
            </p>
          </div>
          <div>
            <a href={url} className='text-lg font-medium'>@{company}</a>
          </div>
        </div>
        <div>
          {description?.split(';')?.map((item, index) => {
            return (
              <div key={index} className='my-2 flex space-x-2'>
                <FaFeatherPointed className='mt-[2px] text-green-500' />
                <span>
                  {item}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const handleClickCompanyCard = (company) => {
    setActiveTab(company)
  }

  return (
    <div className='mt-20 mb-8'>
      {sectionHeading('Where I', 'Work')}

      <div className='my-5 sm:flex sm:space-x-5'>
        <div className='w-fit space-y-2'>
          {work?.map((item, index) => (
            <CompanyCard company={item?.company} active={activeTab} key={index} />
          ))}
        </div>
        <div className='w-full'>
          {work?.map((item, index) => (
            <CompanyDetails company={item?.company} description={item?.description} position={item?.position} date={item?.date} url={item?.url} active={activeTab} key={index} />
          ))}
          {/* <CompanyDetails company={'Riskcovry'} description={'This is the riskcovry data'} active={activeTab} />
          <CompanyDetails company={'Riskcovry (Intern)'} description={'This is the riskcovry data'} active={activeTab} /> */}
        </div>
      </div>
    </div>
  )
}

export default Work