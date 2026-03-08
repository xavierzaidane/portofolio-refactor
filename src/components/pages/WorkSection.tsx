import React, { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '../ProjectCard'
import { PROJECTS } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger);

function WorkSections() {
  const [showAll, setShowAll] = useState(false)
  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4)
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal with line animation
      if (headerRef.current) {
        const line = headerRef.current.querySelector('.reveal-line');
        const title = headerRef.current.querySelector('h2');

        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
          gsap.to(line, {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          });
        }

        if (title) {
          gsap.set(title, { opacity: 0, x: -30 });
          gsap.to(title, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
   <section ref={sectionRef} id="work" className="py-16 md:py-24 lg:py-32 bg-transparent">
        <div className="max-w-full mx-auto border-t border-foreground/10 dark:border-foreground/10">
          <div ref={headerRef} className="px-4 sm:px-6 md:px-8 lg:px-12 mb-8 md:mb-10 lg:mb-12 pt-6 md:pt-8 relative overflow-hidden">
            <h2 className="text-xs sm:text-[13px] md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-foreground/40 dark:text-white/40">Selected Works</h2>
          </div>
          
          <div ref={projectsRef} className="flex flex-col">
            <AnimatePresence mode="wait">
              {displayedProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ 
                    duration: 0.8, 
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <ProjectCard project={project} index={idx} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-6 md:mt-8 lg:mt-8 flex justify-center px-4 sm:px-5">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center gap-2 md:gap-3 text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors duration-300"
            >
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/10 dark:border-white/10 group-hover:border-foreground/30 dark:group-hover:border-white/30 group-hover:bg-foreground dark:group-hover:bg-white transition-all duration-300"
              >
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 group-hover:text-background dark:group-hover:text-card transition-colors duration-300" />
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