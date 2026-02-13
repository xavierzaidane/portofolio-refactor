import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import ProjectCard from '../ProjectCard'
import { PROJECTS } from '@/data/projects'

function WorkSections() {
  const [showAll, setShowAll] = useState(false)
  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4)

  return (
   <section id="work" className="py-16 md:py-24 lg:py-32 bg-transparent">
        <div className="max-w-full mx-auto">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 mb-8 md:mb-10 lg:mb-12 border-t border-white/10 pt-6 md:pt-8">
            <h2 className="text-xs sm:text-[13px] md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-white/40">Selected Works</h2>
          </div>
          
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              {displayedProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <ProjectCard project={project} index={idx} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-6 md:mt-8 lg:mt-8 flex justify-center px-4 sm:px-5">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="group flex flex-col items-center gap-2 md:gap-3 text-white/60 hover:text-white transition-colors duration-300"
            >
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 group-hover:border-white/30 group-hover:bg-white transition-all duration-300"
              >
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 group-hover:text-black transition-colors duration-300" />
              </motion.div>
              <span className="text-[10px] md:text-xs font-mono tracking-wide md:tracking-widest uppercase">
                {showAll ? 'View Less' : 'View More'}
              </span>
            </motion.button>
          </div>
        </div>
      </section>
  )
}

export default WorkSections