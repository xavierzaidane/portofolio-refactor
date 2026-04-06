import { useRef, useLayoutEffect } from 'react';
import { motion } from 'motion/react'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'
import { FlipButton, FlipButtonFront } from '../animate-ui/components/buttons/flip'
import { FlipButtonBack } from '../animate-ui/primitives/buttons/flip'
import { TextLoop } from '@/components/ui/text-loop';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const handleEmailClick = () => {
  const email = "xavierzaidane@gmail.com";
  const subject = "Let's Collaborate";
  const body = "Hi Xavier, I'd like to discuss a project with you.";
  
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
};

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax background effect
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 30%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Title reveal with split text effect
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 60, scale: 0.95 });
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Subtitle with dramatic reveal
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { 
          opacity: 0, 
          y: 80,
          clipPath: 'inset(100% 0% 0% 0%)'
        });
        gsap.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // CTA buttons staggered reveal
      if (ctaRef.current) {
        const children = ctaRef.current.children;
        gsap.set(children, { opacity: 0, y: 40 });
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
   <section ref={sectionRef} id="contact" className="relative py-40 px-7 md:px-12 overflow-hidden bg-transparent">
        <div className="pointer-events-none" />
        <div ref={contentRef} className="max-w-5xl mx-auto text-center relative z-10">
          <div>
            <h2 ref={titleRef} className="text-[15px] font-mono tracking-[0.2em] uppercase text-foreground/40 dark:text-white/40 mb-8">Next Steps</h2>
            <h3 ref={subtitleRef} className="text-5xl md:text-9xl font-heading font-bold font-mono mb-16 leading-[0.9] tracking-tighter uppercase">
              Let's build <span className="text-foreground/60 dark:text-white/60">something</span> <br/> <span className="text-foreground/60 dark:text-white/60">
               Exquisite
              </span> together.
            </h3>
            
            <div ref={ctaRef} className="flex flex-col md:flex-row items-center justify-center gap-6">
              <FlipButton>
                <FlipButtonFront
                  className='flex items-center justify-center gap-3 w-70 h-14 rounded-full border border-foreground/20 dark:border-white/20 text-foreground dark:text-white text-[19px] font-light hover:border-foreground/40 dark:hover:border-white/40 transition-colors bg-background dark:bg-background hover:bg-foreground/10 dark:hover:bg-white/10'
                >
                  Interested in collaborating ?
                </FlipButtonFront>
                <FlipButtonBack 
                  onClick={handleEmailClick}
                  className='flex items-center justify-center gap-3 w-76 h-14 rounded-full text-foreground dark:text-white text-[19px] font-light transition-colors cursor-pointer bg-background dark:bg-background hover:bg-foreground/10 dark:hover:bg-white/10'
                >
                  <img src="/gmail.png" alt="Gmail" className=" w-8 h-8" />
                  <span className="text-[19px] text-foreground dark:text-white font-light">xavierzaidane@gmail.com</span>
                </FlipButtonBack>
              </FlipButton>
              
              <div className="flex gap-4">
                <a 
                  href="https://github.com/xavierzaidane" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-foreground dark:text-white hover:text-foreground/70 dark:hover:text-white/70 transition-colors"
                >
                  <SiGithub className="w-8 h-8" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/xavier-zaidane-athaya-5748b128a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BhHHBe9gWQB%2BXs06oqiLCHw%3D%3D" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-foreground/60 dark:text-white/60 hover:text-foreground/80 dark:hover:text-white/80 transition-colors"
                >
                  <FaLinkedin className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Contact