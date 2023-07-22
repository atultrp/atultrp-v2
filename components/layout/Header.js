import { navItems } from '@/constant/data'
import React, { useState } from 'react'


const Header = () => {
  const [open, setOpen] = useState(false)

  const navItemsFunc = (setOpen) => {
    return navItems()?.map((item, index) => {
      return (
        <a href={item?.link} className='w-fit' onClick={() => setOpen(false)}>
          <div key={index} className='text-gray-300 hover:text-white font-semibold'>
            {item?.name}
          </div>
        </a>
      )
    })
  }

  function MobileNav({ open, setOpen }) {
    return (
      <div className={`absolute top-0 left-0 h-screen w-screen bg-[#0F1624] z-40 transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
        {/*logo container*/}
        <div className="flex items-center pl-6 filter drop-shadow-md mt-6">
          <h1>
            <img src="/Logo/atultrp_logo_light-removebg_cropped.png" className='sm:w-32 w-24' />
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center mt-10">
          <ul className='sm:flex space-x-8'>
            {navItemsFunc(setOpen)}
          </ul>
        </div>
      </div>
    )
  }


  return (
    <nav className='flex justify-between items-center mt-6 sm:mt-8 sm:mb-8 mb-0'>
      <h1>
        <img src="/Logo/atultrp_logo_light-removebg_cropped.png" className='sm:w-32 w-24' />
      </h1>
      <ul className='sm:flex space-x-8 hidden'>
        {navItemsFunc(setOpen)}
      </ul>

      {/* mobile nav */}
      {/* hamburger button */}
      <div className="z-50 flex relative w-8 h-8 flex-col justify-center space-y-2 items-center lg:hidden" onClick={() => {
        setOpen(!open)
      }}>
        <span className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-1.5 " : ""}`} />
        <span className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-1.5 " : ""}`} />
      </div>
      <MobileNav open={open} setOpen={setOpen} />
    </nav>
  )
}



export default Header