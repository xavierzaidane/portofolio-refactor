import { Download, DownloadIcon, FileText, Github } from "lucide-react"
import { FlipButton, FlipButtonBack, FlipButtonFront } from "../animate-ui/primitives/buttons/flip"
import { motion } from 'motion/react';
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

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
  const [pos, setPos] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
  
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
  return (
    <section id="resume" className="container mx-auto px-4 py-20 border-t border-foreground/10 dark:border-white/10">
      <div className="-mt-7 mb-15">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Label */}
          <div className="lg:col-span-3">
            <span className="text-sm font-mono uppercase text-foreground/60">
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
          <Button
                ref={buttonRef}
                onMouseEnter={handleMouseEnter}
                onClick={handleDownloadResume}
                variant="outline"
                className="relative overflow-hidden group flex items-center cursor-pointer justify-center gap-2 px-5 w-57 h-13 border border-foreground/20 dark:border-foreground/10 hover:border-foreground/20 rounded-full text-sm font-medium uppercase tracking-wider transition-all hover:bg-foreground/10"
              >
                <span
                  className={cn(
                    "absolute w-10 h-10 rounded-full scale-0 transition-transform duration-700 ease-in-out group-hover:scale-[15] pointer-events-none",
                    "bg-foreground/80 dark:bg-white"
                  )}
                  style={{
                    left: pos.x - 20,
                    top: pos.y - 20,
                  }}
                />
                <DownloadIcon className="w-4 h-4 relative z-10  transition-colors duration-500 pointer-events-none group-hover:text-white dark:group-hover:text-black" />
                <span className="relative z-10 transition-colors duration-500 pointer-events-none group-hover:text-white dark:group-hover:text-black">
                  Download Resume
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection
