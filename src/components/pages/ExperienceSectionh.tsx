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
    <section id="experience" className="py-12 md:py-20 lg:py-28 bg-transparent">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-10 md:mb-14">
        <h2 className="text-xs sm:text-[13px] md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-foreground/40 dark:text-white/40">
          Experiences
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex-1 max-w-5xl"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-foreground/60 dark:text-white/60">
            My journey has been <span className="text-foreground dark:text-white font-normal">1+</span> years in Frontend Development
          </h3>
        </motion.div>
      </div>

      <div className="flex justify-between gap-6 md:gap-8 lg:gap-12 px-4 sm:px-5 md:px-8 lg:px-11">
        <div className="w-8 md:w-10 lg:w-12 shrink-0" />
        <div className="flex-1 max-w-5xl">
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
                      className="absolute h-[1px] bg-foreground/10 dark:bg-white/10"
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
    </section>
  );
}

export default Experience;

