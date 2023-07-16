import React from 'react'

const Header = () => {

  const navItemsFunc = () => {
    const navItems = [
      { name: 'About', link: '#about' },
      { name: 'Projects', link: '#projects' },
      { name: 'Work', link: '#work' },
      { name: 'Contact', link: '#contact' },
    ]
    return navItems.map((item, index) => {
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
    <nav className='flex justify-between items-center'>
      <h1>
        <img src="/Logo/atultrp_logo_light-removebg.png" className='w-32' />
      </h1>
      <ul className='sm:flex space-x-8 hidden'>
        {navItemsFunc()}
      </ul>
    </nav>
  )
}

export default Header