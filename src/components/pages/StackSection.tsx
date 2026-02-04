import { STACK_DATA } from '@/data/stack';
import { motion } from 'motion/react'

function StackSection() {
  return (
     <section id="stack" className="py-32 bg-transparent border-t border-b border-white/10">
        <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12 mb-20">
             <h2 className="text-[15px] font-mono tracking-[0.2em] uppercase text-white/40">Stack</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 max-w-5xl"
          >
            <h3 className="text-3xl md:text-4xl font-light leading-snug text-white/60">
              The tools and technologies I use to build <span className="text-white font-normal">scalable</span>, modern web applications.
            </h3>
          </motion.div>
        </div>

        <div className="flex justify-between gap-12 px-11">
          <div className="w-12" />
          <div className="flex-1 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4">
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
                    className={`group flex flex-col items-center justify-center py-20 px-8 transition-colors  hover:bg-white/5 border-white/10
                      ${(idx + 1) % 4 !== 0 ? 'md:border-r' : ''} 
                      ${(idx + 1) % 2 !== 0 ? 'border-r' : ''}
                      ${isSecondRow ? 'border-t' : 'border-b'}
                    `}
                  >
                    <motion.div 
                      className="text-white/40 group-hover:text-white group-hover:scale-100"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-12 h-12" />
                    </motion.div>
                    <span className="text-[13px] font-mono tracking-[0.2em] uppercase text-white/20 group-hover:text-white/60 mt-8 transition-colors pointer-events-none">
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