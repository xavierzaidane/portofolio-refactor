import WORKFLOW_DATA from '@/data/workflow';
import { motion } from 'motion/react';
import { PlusCircle } from "lucide-react";

function WorkflowSection() {
  return (
     <section id="workflow" className="py-32 bg-transparent border-t border-white/10">
        <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12 mb-20">   
             <h2 className="text-[15px] font-mono tracking-[0.2em] uppercase text-white/40">Workflow</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 max-w-5xl"
          >
            <h3 className="text-3xl md:text-4xl font-light leading-snug text-white/60">
              The essential software and ecosystem that powers my <span className="text-white font-normal">development</span> environment.
            </h3>
          </motion.div>
        </div>

        <div className="flex justify-between gap-12 px-11">
          <div className="w-10" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 max-w-5xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10">
              {/* Development Group */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                viewport={{ once: true, margin: "-100px" }}
                className="lg:col-span-8 bg-[#050505] p-4 md:p-6"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-[15px] font-mono tracking-[0.2em] uppercase text-white/20 mb-4"
                >
                  Development
                </motion.h4>
                <div className="flex flex-wrap gap-3">
                  {WORKFLOW_DATA.development.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 + idx * 0.05 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex items-center gap-2.5 px-4 py-2 border border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <Icon className="w-5 h-5 text-white/40" />
                        <span className="text-[15px] font-mono tracking-wider uppercase text-white/60 pointer-events-none">{item.name}</span>
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
                className="lg:col-span-4 bg-[#050505] p-4 md:p-6 border-l border-white/10"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-[15px] font-mono tracking-[0.2em] uppercase text-white/20 mb-4"
                >
                  Design
                </motion.h4>
                <div className="flex flex-wrap gap-3">
                  {WORKFLOW_DATA.design.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + idx * 0.05 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex items-center gap-2.5 px-4 py-2 border border-white/10 hover:bg-white/5 transition-colors duration-300"
                      >
                        <Icon className="w-5 h-5 text-white/40" />
                        <span className="text-[15px] font-mono tracking-wider uppercase text-white/60 pointer-events-none">{item.name}</span>
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
                className="lg:col-span-5 bg-[#050505] p-4 md:p-6 border-t border-white/10"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-[15px] font-mono tracking-[0.2em] uppercase text-white/20 mb-4"
                >
                  Productivity
                </motion.h4>
                <div className="flex flex-wrap gap-3">
                  {WORKFLOW_DATA.productivity.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 + idx * 0.05 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex items-center gap-2.5 px-4 py-2 border border-white/10 hover:bg-white/5 transition-colors duration-300"
                      >
                        <Icon className="w-5 h-5 text-white/40" />
                        <span className="text-[15px] font-mono tracking-wider uppercase text-white/60 pointer-events-none">{item.name}</span>
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
                className="lg:col-span-4 bg-[#050505] p-4 md:p-6 border-t border-l border-white/10"
              >
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-[15px] font-mono tracking-[0.2em] uppercase text-white/20 mb-4"
                >
                  Testing
                </motion.h4>
                <div className="flex flex-wrap gap-3">
                  {WORKFLOW_DATA.testing.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.05 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex items-center gap-2.5 px-4 py-2 border border-white/10 hover:bg-white/5 transition-colors duration-300"
                      >
                        <Icon className="w-5 h-5 text-white/40" />
                        <span className="text-[15px] font-mono tracking-wider uppercase text-white/60 pointer-events-none">{item.name}</span>
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
                className="lg:col-span-3 bg-[#050505] p-4 md:p-6 border-t border-l border-white/10 hidden lg:flex items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <PlusCircle className="w-6 h-6 text-white/20" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
      </section>
  )
}

export default WorkflowSection