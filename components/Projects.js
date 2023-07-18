import React from 'react'
import { FaFolder } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

const Projects = () => {

  const ProjectCard = ({ title, description, techStack, github, live }) => {
    return (
      <div className='w-[300px] h-[250px] bg-[#182338] rounded-xl px-6 py-4 flex flex-col justify-between'>
        <div className='flex justify-between'>
          <FaFolder className='text-3xl' />
          <div className='flex space-x-4'>
            <a href={github} target='_blank'>
              <FiGithub className='text-2xl' />
            </a>
            <a href={live}>
              <FaArrowUpRightFromSquare className='text-2xl' />
            </a>
          </div>
        </div>
        <div className='text-center'>
          <h3 className='text-xl font-bold text-gray-200 mt-4'>{title}</h3>
          <p className='text-gray-400 mt-2 text-xs'>{description}</p>
        </div>
        <div>
          {techStack?.map((item, index) => {
            return (
              <span key={index} className='text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-md mr-2'>{item}</span>
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

      <ProjectCard
        title={"Mark 1"}
        description={"This is a description of the project."}
        techStack={["tech1", "tech2", "tech3"]}
        github={"github1"}
        live={"live1"}
      />

    </div>
  )
}

export default Projects