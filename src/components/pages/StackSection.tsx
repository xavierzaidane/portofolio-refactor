import { useRef, useLayoutEffect } from 'react';
import { STACK_DATA } from '@/data/stack';
import { motion } from 'motion/react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header text reveal
      if (headerRef.current) {
        const heading = headerRef.current.querySelector('h3');
        if (heading) {
          gsap.set(heading, { opacity: 0, y: 40 });
          gsap.to(heading, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          });
        }
      }

      // Grid items stagger animation
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.stack-item');
        gsap.set(items, { opacity: 0, y: 60, scale: 0.9 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            each: 0.08,
            from: 'start'
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
     <section ref={sectionRef} id="stack" className="container mx-auto px-4 py-20  bg-transparent border-t border-foreground/10 dark:border-foreground/10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-12 md:mb-16 lg:mb-20">
             <h2 className="text-xs sm:text-[13px] md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-foreground/40 dark:text-white/40">Stack</h2>
          <div
            ref={headerRef}
            className="flex-1 max-w-5xl"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-foreground/60 dark:text-white/60">
              The tools and technologies I use to build <span className="text-foreground dark:text-white font-normal">scalable</span>, modern web applications.
            </h3>
          </div>
        </div>

        <div className="flex justify-between gap-6 md:gap-8 lg:gap-12 px-4 sm:px-5 md:px-8 lg:px-11">
          <div className="w-8 md:w-10 lg:w-12 shrink-0" />
          <div className="flex-1 max-w-5xl">
            <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {STACK_DATA.map((item, idx) => {
                const Icon = item.icon;
                const isSecondRow = idx >= 4;
                return (
                  <motion.div 
                    key={item.name}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: 'easeOut' }
                    }}
                    className={`stack-item group flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 transition-colors hover:bg-foreground/5 dark:hover:bg-white/5 border-foreground/10 dark:border-white/10
                      ${(idx + 1) % 4 !== 0 ? 'md:border-r lg:border-r' : ''} 
                      ${(idx + 1) % 1 !== 0 ? 'md:border-r' : ''}
                      ${(idx + 1) % 2 !== 0 ? 'border-r' : ''}
                      ${idx >= 4 ? 'border-t' : 'border-b'}
                    `}
                  >
                    <motion.div 
                      className="text-foreground/40 dark:text-white/40 group-hover:text-foreground dark:group-hover:text-white"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11" />
                    </motion.div>
                    <span className="text-[10px] sm:text-[11px] md:text-[13px] font-mono tracking-wide md:tracking-widest uppercase text-foreground/20 dark:text-white/20 group-hover:text-foreground/60 dark:group-hover:text-white/60 mt-4 sm:mt-6 md:mt-8 transition-colors pointer-events-none text-center">
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