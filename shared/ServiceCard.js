import React from 'react'

const ServiceCard = ({ title, content }) => {
	return (
		<div className='w-[280px] bg-[#182338hh] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-xl px-6 py-6 flex flex-col hover:scale-110 duration-300 ease-in-out'>
			<h3 className='text-lg font-semibold'>{title}</h3>
			<p className='text-sm text-gray-400'>{content}</p>
		</div>
	)
}

export default ServiceCard