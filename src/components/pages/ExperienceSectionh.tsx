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
     <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
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
              className="flex items-baseline gap-2 mb-4"
            >
              <span className="text-8xl md:text-9xl font-heading font-bold tracking-tighter">
                <Counter value={2} />
              </span>
              <span className="text-2xl md:text-4xl font-light text-white/40 font-mono">+</span>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl md:text-4xl font-bold mb-6 uppercase"
            >
              Years of Digital Innovation
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-lg md:text-xl text-white/50 leading-relaxed font-light"
            >
              Collaborating with global brands and agile startups to engineer systems that define the modern web. From stealth-mode MVPs to high-availability enterprise platforms.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-8 md:gap-12 w-full"
          >
            <div className="relative pt-16">
        
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="absolute top-0 left-0 w-full mt-16 h-[1px] bg-white/10 origin-left" 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                      className="absolute top-[-5px] left-0 w-2.5 h-2.5 rounded-full bg-white" 
                    />
                    
                    <div className="space-y-2">
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase block"
                      >
                        {exp.year}
                      </motion.span>
                      
                      <Tooltip
                        containerClassName="text-white"
                        content={
                          <div className="w-64">
                            <span>
                              <img src={exp.Image} alt={exp.company} className="w-14 h-14 mb-2 object-contain rounded-full"/>
                            </span>
                            <p className="text-lg font-bold text-white mb-2">{exp.company} 
                              <span className='ml-2 text-white/50 font-light text-xs'>{exp.location}</span>
                              </p>
                            <p className="text-xs text-white/60">
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
                          whileHover={{ x: 5 }}
                          className="text-xl font-heading font-bold tracking-tight text-white group-hover:text-white/40 transition-colors pointer-events-auto cursor-pointer"
                        >
                          {exp.company}
                        </motion.h4>
                      </Tooltip>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 + i * 0.12, duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-[10px] font-mono tracking-widest text-white/40 uppercase"
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

