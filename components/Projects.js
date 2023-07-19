import React from 'react'
import { FaFolder } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { ProjectData } from '@/constant/data'

const Projects = () => {

  const projects = ProjectData()

  const ProjectCard = ({ index, title, description, techStack, github, live }) => {
    return (
      <div className='w-[280px] h-[250px] bg-[#182338hh] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-xl px-6 py-6 flex flex-col hover:scale-110 duration-300 ease-in-out' key={index}>
        <div className='flex justify-between mb-3'>
          <FaFolder className='text-2xl' />
          <div className='flex space-x-4'>
            {github && <a href={github} target='_blank'>
              <FiGithub className='text-xl hover:scale-125 duration-300 ease-in-out' />
            </a>}
            {live && <a href={live} target='_blank'>
              <FaArrowUpRightFromSquare className='text-xl hover:scale-125 duration-300 ease-in-out' />
            </a>}
          </div>
        </div>
        <div className='text-center mb-4'>
          <h3 className='text-xl font-bold text-gray-200 mt-2'>{title}</h3>
          <p className='text-gray-400 mt-2 text-xs'>{description}</p>
        </div>
        <div className='flex justify-center flex-wrap'>
          {techStack?.map((item, index) => {
            return (
              <span key={index} className='text-xs mt-2 text-gray-400 bg-[#1a263d] px-2 py-1 rounded-md mr-2 h-fit flex-wrap flex'>{item}</span>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className='mt-20 mb-8'>
      <h3 className='text-2xl font-semibold text-gray-300 italic'>I build real value</h3>
      <h2 className='text-5xl font-bold text-white'>Projects</h2>

      {/* Project Cards */}
      <div className='flex flex-wrap lg:justify-normal justify-center'>
        {projects?.map((project, index) => {
          return (
            <div className='my-3 lg:mr-5 sm:mr-3 mr-1 flex lg:justify-normal justify-center'>
              <ProjectCard
                index={index}
                title={project?.title}
                description={project?.description}
                techStack={project?.techStack}
                github={project?.github}
                live={project?.live}
              />
            </div>
          )
        })}
      </div>

      <div className='flex justify-center my-4'>
        <button className='bg-[#1a263d] px-4 py-2 rounded-lg text-gray-400 hover:text-white'>
          View More
        </button>
      </div>

    </div>
  )
}

export default Projects