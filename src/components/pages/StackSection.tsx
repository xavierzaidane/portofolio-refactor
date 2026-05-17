import { useRef, useLayoutEffect } from 'react';
import { STACK_DATA } from '@/data/stack';
import { motion } from 'motion/react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stackLinks: { [key: string]: string } = {
  'React': 'https://react.dev',
  'Next.js': 'https://nextjs.org',
  'Vue.js': 'https://vuejs.org',
  'Angular': 'https://angular.io',
  'TypeScript': 'https://www.typescriptlang.org',
  'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'Node.js': 'https://nodejs.org',
  'Python': 'https://www.python.org',
  'GSAP': 'https://gsap.com',
  'Tailwind': 'https://tailwindcss.com',
  '.NET': 'https://dotnet.microsoft.com',
  'SQL': 'https://www.mysql.com'
};

function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 40 });
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Grid items stagger animation
      if (gridRef.current) {
        itemsRef.current.forEach((item, index) => {
          if (!item) return;

          gsap.set(item, { opacity: 0, y: 60, scale: 0.9 });
          gsap.to(item, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="stack" className="container mx-auto px-4 py-20 border-t border-foreground/10 dark:border-white/10">
      <div className="-mt-7 mb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Label */}
          <div className="lg:col-span-3">
            <span className="text-sm font-mono uppercase text-foreground/60">
              Stack
            </span>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-12 lg:col-span-9">
            {/* Description */}
            <div ref={headerRef}>
              <p className="text-[1.90rem] font-light tracking-tight text-foreground/60 dark:text-foreground/60 max-w-3xl">
                The tools and technologies I use to build{' '}
                <span className="font-normal text-foreground dark:text-white">scalable</span>, modern web applications.
              </p>
            </div>

            {/* Grid */}
            <div
              ref={gridRef}
              className="grid grid-cols-2 gap-px bg-foreground/10 dark:bg-white/10 sm:grid-cols-4"
            >
              {STACK_DATA.map((item, idx) => {
                const Icon = item.icon;
                const link = stackLinks[item.name] || '#';
                
                return (
                  <motion.a
                    key={item.name}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={(el) => {
                      itemsRef.current[idx] = el as HTMLAnchorElement;
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: 'easeOut' }
                    }}
                    className="group relative flex aspect-square flex-col items-center justify-center gap-4 bg-background p-6 transition-colors duration-300 hover:bg-foreground/5 dark:hover:bg-white/5"
                  >
                    <motion.div 
                      className="text-foreground/40 dark:text-white/40 transition-colors duration-300 group-hover:text-foreground dark:group-hover:text-white"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <Icon className="w-10 h-10" />
                    </motion.div>
                    <span className="font-mono text-foreground/40 dark:text-white/40 text-xs uppercase tracking-widest transition-colors duration-300 group-hover:text-foreground dark:group-hover:text-white">
                      {item.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StackSection;