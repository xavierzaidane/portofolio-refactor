import WORKFLOW_DATA from '@/data/workflow';
import { motion } from 'motion/react';
import { PlusCircle } from "lucide-react";

function WorkflowSection() {
  return (
     <section id="workflow" className="py-16 md:py-24 lg:py-32 bg-transparent border-t border-white/10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-12 md:mb-16 lg:mb-20">   
             <h2 className="text-xs sm:text-[13px] md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-white/40">Workflow</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 max-w-5xl"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-white/60">
              The essential software and ecosystem that powers my <span className="text-white font-normal">development</span> environment.
            </h3>
          </motion.div>
        </div>

        <div className="flex justify-between gap-6 md:gap-8 lg:gap-12 px-4 sm:px-5 md:px-8 lg:px-11">
          <div className="w-8 md:w-10 lg:w-10 shrink-0" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 max-w-5xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-px bg-white/10 border border-white/10">
              {/* Development Group */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                viewport={{ once: true, margin: "-100px" }}
                className="col-span-1 md:col-span-2 lg:col-span-8 bg-[#050505] p-3 sm:p-4 md:p-6"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-[11px] sm:text-[13px] md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-white/20 mb-3 md:mb-4"
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
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-white/10 hover:bg-white/5 transition-colors text-[11px] sm:text-[13px] md:text-[15px]"
                      >
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white/40 shrink-0" />
                        <span className="font-mono tracking-wide uppercase text-white/60 pointer-events-none">{item.name}</span>
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
                className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#050505] p-3 sm:p-4 md:p-6 md:border-l border-white/10"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-[11px] sm:text-[13px] md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-white/20 mb-3 md:mb-4"
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
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-white/10 hover:bg-white/5 transition-colors duration-300 text-[11px] sm:text-[13px] md:text-[15px]"
                      >
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white/40 shrink-0" />
                        <span className="font-mono tracking-wide uppercase text-white/60 pointer-events-none">{item.name}</span>
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
                className="col-span-1 md:col-span-2 lg:col-span-5 bg-[#050505] p-3 sm:p-4 md:p-6 md:border-t border-white/10"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-[11px] sm:text-[13px] md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-white/20 mb-3 md:mb-4"
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
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-white/10 hover:bg-white/5 transition-colors duration-300 text-[11px] sm:text-[13px] md:text-[15px]"
                      >
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white/40 shrink-0" />
                        <span className="font-mono tracking-wide uppercase text-white/60 pointer-events-none">{item.name}</span>
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
                className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#050505] p-3 sm:p-4 md:p-6 md:border-t md:border-l border-white/10"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-[11px] sm:text-[13px] md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-white/20 mb-3 md:mb-4"
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
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-white/10 hover:bg-white/5 transition-colors duration-300 text-[11px] sm:text-[13px] md:text-[15px]"
                      >
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white/40 shrink-0" />
                        <span className="font-mono tracking-wide uppercase text-white/60 pointer-events-none">{item.name}</span>
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
                className="col-span-1 md:col-span-2 lg:col-span-3 bg-[#050505] p-3 sm:p-4 md:p-6 md:border-t border-white/10 hidden lg:flex items-center justify-center"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
                  <PlusCircle className="w-5 h-5 md:w-6 md:h-6 text-white/20" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
      </section>
  )
}

export default WorkflowSection