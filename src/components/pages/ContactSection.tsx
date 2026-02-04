import { motion } from 'motion/react'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { FlipButton, FlipButtonFront } from '../animate-ui/components/buttons/flip'
import { FlipButtonBack } from '../animate-ui/primitives/buttons/flip'
import { TextLoop } from '@/components/ui/text-loop';

const handleEmailClick = () => {
  const email = "xavierzaidane@gmail.com";
  const subject = "Let's Collaborate";
  const body = "Hi Xavier, I'd like to discuss a project with you.";
  
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
};

function Contact() {
  return (
   <section id="contact" className="relative py-40 px-7 md:px-12 overflow-hidden">
        <div className="pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[15px] font-mono tracking-[0.2em] uppercase text-white/40 mb-8">Next Steps</h2>
            <h3 className="text-5xl md:text-9xl font-heading font-bold mb-16 leading-[0.9] tracking-tighter uppercase">
              Let's build <span className="text-white/60">something</span> <br/> <span className="text-white/60">
               <TextLoop 
               className='overflow-y-clip'
        transition={{
          type: 'spring',
          stiffness: 900,
          damping: 100,
          mass: 10,
        }}
        variants={{
          initial: {
            y: 20,
            rotateX: 90,
            opacity: 0,
            filter: 'blur(1px)',
          },
          animate: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
          },
          exit: {
            y: -20,
            rotateX: -90,
            opacity: 0,
            filter: 'blur(1px)',
          },
        }}
      >
        <span>meaningful</span>
        <span>thoughtful</span>
        <span>expressive</span>
        <span>impactful</span>
      </TextLoop>
               
              </span> together.
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <FlipButton>
                <FlipButtonFront
                  className='flex items-center justify-center gap-3 w-70 h-14 rounded-full border border-white/20 text-white text-[19px] font-light hover:border-white/40 transition-colors'
                >
                  Interested in collaborating ?
                </FlipButtonFront>
                <FlipButtonBack 
                  onClick={handleEmailClick}
                  className='flex items-center justify-center gap-3 w-76 h-14 rounded-full border border-white/20 text-white hover:border-white/40 text-[19px] font-light transition-colors cursor-pointer'
                >
                  <img src="/gmail.png" alt="Gmail" className="mr-1 w-9 h-9" />
                  <span className="text-[19px] text-white font-light">xavierzaidane@gmail.com</span>
                </FlipButtonBack>
              </FlipButton>
              
              <div className="flex gap-4">
                <a 
                  href="https://github.com/xavierzaidane" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-white hover:text-white/70 transition-colors"
                >
                  <SiGithub className="w-9 h-9" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/xavier-zaidane-athaya-5748b128a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BhHHBe9gWQB%2BXs06oqiLCHw%3D%3D" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-[#0A66C2] hover:text-[#0A66C2]/70 transition-colors"
                >
                  <SiLinkedin className="w-9 h-9" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
  )
}

export default Contact