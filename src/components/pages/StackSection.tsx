import { STACK_DATA } from '@/data/stack';
import { motion } from 'motion/react'

function StackSection() {
  return (
     <section id="stack" className="py-16 md:py-24 lg:py-32 bg-transparent border-t border-b border-foreground/10 dark:border-white/10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-12 md:mb-16 lg:mb-20">
             <h2 className="text-xs sm:text-[13px] md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-foreground/40 dark:text-white/40">Stack</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 max-w-5xl"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-foreground/60 dark:text-white/60">
              The tools and technologies I use to build <span className="text-foreground dark:text-white font-normal">scalable</span>, modern web applications.
            </h3>
          </motion.div>
        </div>

        <div className="flex justify-between gap-6 md:gap-8 lg:gap-12 px-4 sm:px-5 md:px-8 lg:px-11">
          <div className="w-8 md:w-10 lg:w-12 shrink-0" />
          <div className="flex-1 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {STACK_DATA.map((item, idx) => {
                const Icon = item.icon;
                const isSecondRow = idx >= 4;
                return (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.6,
                      delay: idx * 0.08 
                    }}
                    className={`group flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 transition-colors hover:bg-foreground/5 dark:hover:bg-white/5 border-foreground/10 dark:border-white/10
                      ${(idx + 1) % 4 !== 0 ? 'md:border-r lg:border-r' : ''} 
                      ${(idx + 1) % 1 !== 0 ? 'md:border-r' : ''}
                      ${(idx + 1) % 2 !== 0 ? 'border-r' : ''}
                      ${idx >= 4 ? 'border-t' : 'border-b'}
                    `}
                  >
                    <motion.div 
                      className="text-foreground/40 dark:text-white/40 group-hover:text-foreground dark:group-hover:text-white group-hover:scale-100"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                    </motion.div>
                    <span className="text-[10px] sm:text-[11px] md:text-[13px] font-mono tracking-wide md:tracking-widest uppercase text-foreground/20 dark:text-white/20 group-hover:text-foreground/60 dark:group-hover:text-white/60 mt-4 sm:mt-6 md:mt-8 transition-colors pointer-events-none text-center">
                      {item.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
  )
}

export default StackSection