import { navItems } from '@/constant/data'
import React from 'react'

const Header = () => {

  const navItemsFunc = () => {
    return navItems()?.map((item, index) => {
      return (
        <a href={item?.link} className='w-fit'>
          <li key={index} className='text-gray-300 hover:text-white font-semibold'>
            {item?.name}
          </li>
        </a>
      )
    })
  }


  return (
    <nav className='flex justify-between items-center mt-2 sm:mt-8 sm:mb-8 mb-4'>
      <h1>
        <img src="/Logo/atultrp_logo_light-removebg_cropped.png" className='sm:w-32 w-24' />
      </h1>
      <ul className='sm:flex space-x-8 hidden'>
        {navItemsFunc()}
      </ul>
    </nav>
  )
}

export default Header