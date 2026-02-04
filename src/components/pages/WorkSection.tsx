import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import ProjectCard from '../ProjectCard'
import { PROJECTS } from '@/data/projects'

function WorkSections() {
  const [showAll, setShowAll] = useState(false)
  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4)

  return (
   <section id="work" className="py-32 bg-transparent">
        <div className="max-w-full mx-auto">
          <div className="px-6 md:px-12 mb-12 border-t border-white/10 pt-8">
            <h2 className="text-[15px] font-mono tracking-[0.2em] uppercase text-white/40">Selected Works</h2>
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
          
          <div className="mt-8 flex justify-center px-5">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="group flex flex-col items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
            >
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover:border-white/30 group-hover:bg-white transition-all duration-300"
              >
                <ChevronDown className="w-5 h-5 group-hover:text-black transition-colors duration-300" />
              </motion.div>
              <span className="text-xs font-mono tracking-widest uppercase">
                {showAll ? 'View Less' : 'View More'}
              </span>
            </motion.button>
          </div>
        </div>
      </section>
  )
}

export default WorkSections