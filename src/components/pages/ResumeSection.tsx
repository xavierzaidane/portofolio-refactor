import { Download, FileText } from "lucide-react"
import { FlipButton, FlipButtonBack, FlipButtonFront } from "../animate-ui/primitives/buttons/flip"
import { motion } from 'motion/react';

const handleDownloadResume = () => {
  const resumeUrl = '/document/Xavier_Zaidane_Athaya_CV.pdf';
  const link = document.createElement('a');
  link.href = resumeUrl;
  link.download = 'Xavier_Zaidane_Athaya_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function ResumeSection() {
  return (
    <section id="resume" className="container mx-auto px-4 py-20 border-t border-foreground/10 dark:border-white/10">
      <div className="-mt-7 mb-15">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Label */}
          <div className="lg:col-span-3">
            <span className="font-mono text-foreground/40 dark:text-white/40 text-xs uppercase tracking-widest">
              Resume
            </span>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-8 lg:col-span-9">
            {/* Heading */}
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="font-medium text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-left"
            >
              <span className="text-foreground/60 dark:text-white/60">Take a look at my </span> <br className="leading-2"/><span className="text-foreground/60 dark:text-white/60">Software</span> Development journey.
            </motion.h3>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-sm sm:text-base md:text-lg lg:text-2xl max-w-2xl text-foreground/50 dark:text-white/50 leading-relaxed font-light"
            >
              Here's a comprehensive overview of my experience, skills, and achievements. Download my resume to learn more about what I've accomplished.
            </motion.p>
            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-fit"
            >
              <FlipButton>
                <FlipButtonFront className="rounded-full border h-12 px-6 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4"/>
                  <span className="text-sm font-medium uppercase">
                    Download Resume
                  </span>
                </FlipButtonFront>
                <FlipButtonBack 
                  onClick={handleDownloadResume}
                  className='rounded-full border h-12 px-6 flex items-center justify-center cursor-pointer hover:bg-foreground/10 dark:hover:bg-white/10'
                >
                  <span className="text-sm font-medium uppercase">Click to Download</span>
                </FlipButtonBack>
              </FlipButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection
