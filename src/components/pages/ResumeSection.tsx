import { Download } from "lucide-react"
import { FlipButton, FlipButtonBack, FlipButtonFront } from "../animate-ui/primitives/buttons/flip"
import { motion } from 'motion/react';

const handleDownloadResume = () => {
  const resumeUrl = '/document/Xavier_Zaidane_Athaya_Resume.pdf';
  const link = document.createElement('a');
  link.href = resumeUrl;
  link.download = 'Xavier_Zaidane_Athaya_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function ResumeSection() {
  return (
    <section id="resume" className="py-32 bg-transparent border-t border-white/10">
        <div className="px-2 md:px-12 flex flex-col md:flex-row justify-between gap-12 ">
             <h2 className="text-[15px] font-mono tracking-[0.2em] uppercase text-white/40">Resume</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 max-w-4xl mr-35"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-5xl md:text-8xl font-heading font-semibold mb-10 tracking-tighter text-left"
            >
                <span className="text-white/60">Take a look at my </span> <br className="leading-2"/><span className="text-white/60">Full-Stack</span> Development journey.
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-base md:text-2xl max-w-2xl text-white/50 leading-relaxed font-light mb-12"
            >
              Here's a comprehensive overview of my experience, skills, and achievements. Download my resume to learn more about what I've accomplished.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <FlipButton>
                <FlipButtonFront
                  className='flex items-center justify-center gap-3 w-65 h-12 rounded-full border border-white/20 text-white text-[17px] font-light transition-colors'
                >
                  Interested in learning more ?
                </FlipButtonFront>
                <FlipButtonBack 
                  onClick={handleDownloadResume}
                  className='flex items-center justify-center gap-3 w-65 h-12 rounded-full border border-white/20 text-white text-[17px] font-light transition-colors cursor-pointer'
                >
                  <Download className="w-5 h-5 text-white font-light"/>
                  <span className="text-[17px] text-white font-light">Download my resume 
                  </span>
                </FlipButtonBack>
              </FlipButton>
            </motion.div>
          </motion.div>
        </div>
    </section>
  )
}

export default ResumeSection
