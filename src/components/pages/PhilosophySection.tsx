import { PHILOSOPHY } from '@/data/philosophy'
import { motion } from 'motion/react'

function Philosophy() {
  return (
      <section id="philosophy" className="py-32 bg-transparent">
        <div className="max-w-full mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="px-6 md:px-12 flex justify-between border-t border-foreground/10 dark:border-white/10 pt-8 mb-20"
          >
            <h2 className="text-[15px] font-mono tracking-[0.2em] uppercase text-foreground/40 dark:text-white/40">Core Philosophy</h2>
            <h2 className="text-[15px] font-mono tracking-[0.2em] uppercase text-foreground/40 dark:text-white/40">03 — Attributes</h2>
          </motion.div>
          <div className="flex flex-col border-foreground/10 dark:border-white/10">
            {PHILOSOPHY.map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8,
                  delay: idx * 0.1
                }}
                className="grid grid-cols-1 lg:grid-cols-12 py-16 md:py-24 px-6 md:px-10 border-b border-foreground/10 dark:border-white/10 gap-8 lg:gap-0 items-start"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.7,
                    delay: idx * 0.1 + 0.1
                  }}
                  className="lg:col-span-5 relative"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.6,
                      delay: idx * 0.1 + 0.05
                    }}
                    className="absolute -top-8 -left-12 text-foreground/20 dark:text-white/20 font-mono text-lg px-13"
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.7,
                      delay: idx * 0.1 + 0.15
                    }}
                    className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-foreground dark:text-white uppercase"
                  >
                    {item.title}
                  </motion.h3>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.7,
                    delay: idx * 0.1 + 0.2
                  }}
                  className="lg:col-span-6 lg:pl-12 max-w-2xl pt-2"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.6,
                      delay: idx * 0.1 + 0.2
                    }}
                    className={`text-[12px] font-mono tracking-[0.2em] uppercase mb-6 ${item.color}`}
                  >
                    {item.category}
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.7,
                      delay: idx * 0.1 + 0.25
                    }}
                    className="text-base md:text-xl text-foreground/50 dark:text-white/50 leading-relaxed font-light"
                  >
                    {item.desc}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Philosophy