import { navItems } from '@/constant/data'
import { scrollNavItemSmooth } from '@/shared/ShareFunction'
import React, { useEffect, useState } from 'react'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'


const Header = () => {
  const [open, setOpen] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const navItemsData = navItems()

  const navItemsFunc = (setOpen) => {
    return navItemsData?.map((item, index) => {
      return (
        <a key={index} href={item?.link} className='w-fit scroll-smooth' onClick={(e) => {
          setOpen(false)
          scrollNavItemSmooth(e, item?.link)
        }}>
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

  // Scroll To Top
  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) {
      setShowScroll(true)
    } else if (showScroll && window.scrollY <= 400) {
      setShowScroll(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)
    return () => window.removeEventListener('scroll', checkScrollTop)
  }, [showScroll])

  // Disables Background Scrolling whilst the SideDrawer/Modal is open
  useEffect(() => {
    if (typeof window != 'undefined' && window.document && open) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling on mount
    }
    else {
      document.body.style.overflow = 'unset'; // Allow scrolling on mount
    }
  }, [open])


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
      <div className="z-50 flex relative w-8 h-8 flex-col justify-center space-y-2 items-center sm:hidden" onClick={() => {
        setOpen(!open)
      }}>
        <span className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-1.5 " : ""}`} />
        <span className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-1.5 " : ""}`} />
      </div>
      <MobileNav open={open} setOpen={setOpen} />
      {showScroll && <div
        className='fixed bottom-4 right-4 sm:bottom-5 sm:right-5 text-3xl sm:text-4xl cursor-pointer hover:scale-125 scroll-smooth ease-in-out duration-200 '
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }}
      >
        <BsFillArrowUpCircleFill />
      </div>}
    </nav>
  )
}



export default Header