import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Tooltip } from '../ui/tooltip-card';
import { experienceData } from '../../data/experience';


const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalMilliseconds = duration * 1000;
      const incrementTime = totalMilliseconds / end;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

function Experience() {
  return (
     <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-baseline gap-2 mb-4 flex-wrap"
            >
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tighter text-foreground">
                <Counter value={1} />
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-foreground/40 font-mono">+</span>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 uppercase text-foreground"
            >
              Years of Digital Innovation
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-base sm:text-lg md:text-xl text-foreground/60 leading-relaxed font-light"
            >
              Over the past year, I've immersed myself in diverse projects spanning web development and AI integration. My journey has equipped me with a robust skill set and enabled me to deliver innovative solutions that drive digital transformation.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6 md:gap-8 lg:gap-12 w-full"
          >
            <div className="relative pt-8 md:pt-12 lg:pt-16">
        
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="absolute top-0 left-0 w-full mt-8 md:mt-12 lg:mt-16 h-px bg-foreground/10 origin-left" 
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                {experienceData.map((exp, i) => (
                  <motion.div 
                    key={exp.company}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.3 + i * 0.12, 
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative pt-6 group"
                  >
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: 0.3 + i * 0.12, 
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="absolute top-[-5px] left-0 w-2.5 h-2.5 rounded-full bg-foreground/80" 
                    />
                    
                    <div className="space-y-2">
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-[9px] sm:text-[10px] font-mono tracking-wide sm:tracking-widest text-foreground/30 uppercase block"
                      >
                        {exp.year}
                      </motion.span>
                      
                      <Tooltip
                        containerClassName="text-foreground"
                        content={
                          <div className="w-64">
                            <span>
                              <img src={exp.Image} alt={exp.company} className="w-14 h-14 mb-2 object-contain rounded-full"/>
                            </span>
                            <p className="text-lg font-bold text-foreground mb-2">{exp.company} 
                              <span className='ml-2 text-foreground/50 font-light text-xs'>{exp.location}</span>
                              </p>
                            <p className="text-xs text-foreground/60">
                              {exp.Description ? exp.Description : 'No additional description available.'}
                            </p>
                          </div>
                        }
                      >
                        <motion.h4 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                          viewport={{ once: true, margin: "-100px" }}
                   
                          className="text-lg sm:text-xl md:text-xl lg:text-xl font-heading font-bold tracking-tight text-foreground group-hover:text-foreground/40 transition-colors pointer-events-auto cursor-pointer"
                        >
                          {exp.company}
                        </motion.h4>
                      </Tooltip>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 + i * 0.12, duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-[9px] sm:text-[10px] font-mono tracking-wide sm:tracking-widest text-foreground/40 uppercase"
                      >
                        {exp.role}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
  );
}

export default Experience;

