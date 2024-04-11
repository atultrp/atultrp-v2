import React, { useEffect, useState } from 'react'
import { FaFolder } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { FreelanceProjectData, ProjectData } from '@/constant/data'
import { sectionHeading } from '@/shared/SharedComponents'
import { Fade } from 'react-awesome-reveal'
import { FaDiagramProject } from "react-icons/fa6";

const Projects = () => {

  const projects = ProjectData()
  const [projectCardCount, setProjectCardCount] = useState(6)
  const [projectCardCountFreelance, setProjectCardCountFreelance] = useState(6)
  const [viewMore, setViewMore] = useState(false)
  const [viewMoreFreelance, setViewMoreFreelance] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setProjectCardCount(4)
    }
  }, [])

  const handleViewMore = () => {
    setViewMore(!viewMore)
    if (!viewMore) {
      setProjectCardCount(12)
    } else {
      if (window.innerWidth < 1024) {
        setProjectCardCount(4)
      }
      else {
        setProjectCardCount(6)
      }
    }
  }
  const handleViewMoreFreelance = () => {
    setViewMoreFreelance(!viewMoreFreelance)
    if (!viewMoreFreelance) {
      setProjectCardCountFreelance(12)
    } else {
      if (window.innerWidth < 1024) {
        setProjectCardCountFreelance(4)
      }
      else {
        setProjectCardCountFreelance(6)
      }
    }
  }


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
          <h3 className='text-lg sm:text-xl font-bold text-gray-200 mt-2'>{title}</h3>
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
    <div>
      {sectionHeading("I build real value", "Projects")}

      {/* Persoal Projects*/}

      <h3 className='text-xl font-semibold mt-6 mb-2 flex items-center space-x-3'>
        <FaDiagramProject />
        <span>Personal Projects</span>
      </h3>
      <div className='flex flex-wrap lg:justify-normal justify-center'>
        {projects?.slice(0, projectCardCount)?.map((project, index) => {
          return (
            <div className='my-3 lg:mr-5 sm:mr-3 mr-1 flex lg:justify-normal justify-center' key={index}>
              <Fade cascade duration={1500} triggerOnce>
                <ProjectCard
                  title={project?.title}
                  description={project?.description}
                  techStack={project?.techStack}
                  github={project?.github}
                  live={project?.live}
                />
              </Fade>
            </div>
          )
        })}
      </div>

      <div className='flex justify-center my-4'>
        <button
          className='bg-[#1a263d] px-4 py-2 rounded-lg text-gray-400 hover:text-white'
          onClick={() => handleViewMore()}
        >
          {viewMore ? "View Less" : "View More"}
        </button>
      </div>

      {/* Freelance Projects*/}

      <h3 className='text-xl font-semibold mt-6 mb-2 flex items-center space-x-3'>
        <FaDiagramProject />
        <span>Freelance Projects</span>
      </h3>
      <div className='flex flex-wrap lg:justify-normal justify-center'>
        {FreelanceProjectData?.slice(0, projectCardCountFreelance)?.map((project, index) => {
          return (
            <div className='my-3 lg:mr-5 sm:mr-3 mr-1 flex lg:justify-normal justify-center' key={index}>
              <Fade cascade duration={1500} triggerOnce>
                <ProjectCard
                  title={project?.title}
                  description={project?.description}
                  techStack={project?.techStack}
                  github={project?.github}
                  live={project?.live}
                />
              </Fade>
            </div>
          )
        })}
      </div>

      <div className='flex justify-center my-4'>
        <button
          className='bg-[#1a263d] px-4 py-2 rounded-lg text-gray-400 hover:text-white'
          onClick={() => handleViewMoreFreelance()}
        >
          {viewMoreFreelance ? "View Less" : "View More"}
        </button>
      </div>

    </div>
  )
}

export default Projects