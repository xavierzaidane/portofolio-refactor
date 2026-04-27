import WORKFLOW_DATA from '@/data/workflow';
import { motion } from 'motion/react';
import { PlusCircle } from "lucide-react";

function WorkflowSection() {
  return (
    <section id="workflow" className="container mx-auto px-4 py-20 border-t border-foreground/10 dark:border-foreground/10">
      <div className="-mt-7 mb-25">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Label */}
          <div className="lg:col-span-3">
            <span className="font-mono text-foreground/40 dark:text-white/40 text-xs uppercase tracking-widest">
              Workflow
            </span>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-12 lg:col-span-9">
            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-foreground/60 dark:text-foreground/60">
                The essential software and ecosystem that powers my <span className="text-foreground dark:text-white font-normal">development</span> environment.
              </h3>
            </motion.div>

            {/* Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-px bg-foreground/20 dark:bg-white/10 border border-foreground/10 dark:border-background/20">
              {/* Development Group */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                viewport={{ once: true, margin: "-100px" }}
                className="col-span-1 md:col-span-2 lg:col-span-8 bg-background dark:bg-background p-3 sm:p-4 md:p-6"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="font-mono text-foreground/40 dark:text-white/40 text-xs uppercase tracking-widest mb-3 md:mb-4"
                >
                  Development
                </motion.h4>
                <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
                  {WORKFLOW_DATA.development.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 + idx * 0.05 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-2 py-1.5 sm:py-2 border border-foreground/10 dark:border-white/10 hover:bg-foreground/5 dark:hover:bg-white/5 transition-colors text-[11px] sm:text-[13px] md:text-[13px]"
                      >
                        <Icon className="w-3 h-3 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 text-foreground/40 dark:text-white/40 shrink-0" />
                        <span className="font-mono tracking-wide uppercase text-foreground/60 dark:text-white/60 pointer-events-none">{item.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Design Group */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                className="col-span-1 md:col-span-2 lg:col-span-4 bg-background dark:bg-background p-3 sm:p-4 md:p-6  border-foreground/10 dark:border-white/10"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="font-mono text-foreground/40 dark:text-white/40 text-xs uppercase tracking-widest mb-3 md:mb-4"
                >
                  Design
                </motion.h4>
                <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
                  {WORKFLOW_DATA.design.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + idx * 0.05 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-2 py-1.5 sm:py-2 border border-foreground/10 dark:border-white/10 hover:bg-foreground/5 dark:hover:bg-white/5 transition-colors duration-300 text-[11px] sm:text-[13px] md:text-[13px]"
                      >
                        <Icon className="w-3 h-3 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 text-foreground/40 dark:text-white/40 shrink-0" />
                        <span className="font-mono tracking-wide uppercase text-foreground/60 dark:text-white/60 pointer-events-none">{item.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Productivity Group */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                viewport={{ once: true, margin: "-100px" }}
                className="col-span-1 md:col-span-2 lg:col-span-5 bg-background dark:bg-background p-3 sm:p-4 md:p-6  border-foreground/10 dark:border-white/10"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="font-mono text-foreground/40 dark:text-white/40 text-xs uppercase tracking-widest mb-3 md:mb-4"
                >
                  Productivity
                </motion.h4>
                <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
                  {WORKFLOW_DATA.productivity.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 + idx * 0.05 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-2 py-1.5 sm:py-2 border border-foreground/10 dark:border-white/10 hover:bg-foreground/5 dark:hover:bg-white/5 transition-colors duration-300 text-[11px] sm:text-[13px] md:text-[13px]"
                      >
                        <Icon className="w-3 h-3 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 text-foreground/40 dark:text-white/40 shrink-0" />
                        <span className="font-mono tracking-wide uppercase text-foreground/60 dark:text-white/60 pointer-events-none">{item.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Testing Group */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className="col-span-1 md:col-span-2 lg:col-span-4 bg-background dark:bg-background p-3 sm:p-4 md:p-6 border-foreground/10 dark:border-white/10"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="font-mono text-foreground/40 dark:text-white/40 text-xs uppercase tracking-widestmb-3 md:mb-4"
                >
                  Testing
                </motion.h4>
                <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
                  {WORKFLOW_DATA.testing.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.05 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-2 py-1.5 sm:py-2 border border-foreground/10 dark:border-white/10 hover:bg-foreground/5 dark:hover:bg-white/5 transition-colors duration-300 text-[11px] sm:text-[13px] md:text-[13px]"
                      >
                        <Icon className="w-3 h-3 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 text-foreground/40 dark:text-white/40 shrink-0" />
                        <span className="font-mono tracking-wide uppercase text-foreground/60 dark:text-white/60 pointer-events-none">{item.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Decoration Cell */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                viewport={{ once: true, margin: "-100px" }}
                className="col-span-1 md:col-span-2 lg:col-span-3 bg-background dark:bg-background/80 p-3 sm:p-4 md:p-6 border-foreground/10 dark:border-white/10 hidden lg:flex items-center justify-center"
              >
              
              </motion.div>
            </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkflowSection