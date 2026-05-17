import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { experienceData } from '../../data/experience';


function Experience() {
  const [cols, setCols] = useState(() => {
    if (typeof window === 'undefined') return 3;
    const w = window.innerWidth;
    return w >= 1024 ? 4 : w >= 768 ? 3 : 2;
  });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setCols(w >= 1024 ? 4 : w >= 768 ? 3 : 2);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };


  return (
    <section id="experience" className="container mx-auto px-20">
      <div className="border-t border-foreground/10 dark:border-white/10 py-20">
        <div className="-mt-7 mb-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Label */}
          <div className="lg:col-span-3">
            <span className="text-sm font-mono uppercase text-foreground/60">
              Experience
            </span>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-12 lg:col-span-9">
            {/* Description */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-[1.90rem] font-light tracking-tight text-foreground/60 dark:text-foreground/60 max-w-3xl"
            >
With over <span className="text-foreground dark:text-white font-normal">a year</span> of experience in Software Development, contributing to impactful and <span className="text-foreground dark:text-white font-normal">modern digital solutions.</span> 
            </motion.h3>

            {/* Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-120px' }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px"
            >
            {experienceData.map((item, idx) => {
              const totalRows = Math.ceil(experienceData.length / cols);
              const rowIndex = Math.floor(idx / cols);
              const isLastRow = rowIndex === totalRows - 1;
              const isLastInRow = (idx % cols) === cols - 1;

              return (
                <motion.div
                  key={item.company}
                  className="relative group flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 transition-colors hover:bg-foreground/5 dark:hover:bg-white/5"
                >
                  {!isLastInRow && (
                    <div
                      aria-hidden="true"
                      className="absolute right-0 w-px bg-foreground/10 dark:bg-white/10"
                      style={{ top: '0%', bottom: '0%' }} 
                    />
                  )}

                  {!isLastRow && (
                    <div
                      aria-hidden="true"
                      className="absolute h-px bg-foreground/10 dark:bg-white/10"
                      style={{ left: '8%', right: '8%', bottom: 0 }} // adjust to change length
                    />
                  )}

                  <span className="text-[12px] leading-snug tracking-wide text-foreground/35 dark:text-foreground/25 group-hover:text-foreground/70 dark:group-hover:text-white mt-1 sm:mt-2 md:mt-1 mb-1 md:mb-1 transition-colors pointer-events-none text-center">
                    {item.year}
                  </span>

                  <span className="text-[20px] sm:text-[22px] leading-snug tracking-wide text-foreground/60 dark:text-foreground/60 group-hover:text-foreground/70 dark:group-hover:text-white mt-1 sm:mt-2 md:mt-1 transition-colors pointer-events-none text-center">
                    {item.company}
                  </span>

                  <span className="text-[14px] leading-snug tracking-wide text-foreground/40 dark:text-foreground/30 group-hover:text-foreground/70 dark:group-hover:text-white mt-3 sm:mt-4 md:mt-3 transition-colors pointer-events-none text-center">
                    {item.role}
                  </span>
                </motion.div>
              );
            })}
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Experience;

