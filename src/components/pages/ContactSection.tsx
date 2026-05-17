import { useRef, useLayoutEffect } from 'react';
import { Mail, Loader, QuoteIcon } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TbQuotes } from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    title: 'Direct Message',
    description: 'Let\'s talk about your project, ideas, or just have a chat about design and engineering.',
    href: 'mailto:xavierzaidane@gmail.com',
    icon: Mail,
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'LinkedIn',
    description: 'Connect with me professionally. I\'m always interested in new collaborations and opportunities.',
    href: 'https://www.linkedin.com/in/xavier-zaidane-athaya-5748b128a',
    icon: FaLinkedin,
    color: 'from-indigo-500/20 to-blue-500/20'
  },
  {
    title: 'GitHub',
    description: 'Check out my projects and contributions. See my work, code quality, and development approach.',
    href: 'https://github.com/xavierzaidane',
    icon: SiGithub,
    color: 'from-slate-500/20 to-slate-400/20'
  }
];

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header border
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          borderBottomColor: 'rgba(0,0,0,0)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 1
          }
        });
      }

      // Animate icon
      if (iconRef.current) {
        gsap.set(iconRef.current, { opacity: 0, rotate: 12, scale: 0.8 });
        gsap.to(iconRef.current, {
          opacity: 1,
          rotate: 0,
          scale: 1,
          duration: 1.2,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Animate heading with stagger
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 50 });
        gsap.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Animate description text
      if (descRef.current) {
        const children = descRef.current.children;
        gsap.set(children, { opacity: 0, y: 30 });
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Animate contact cards with stagger and hover effect
      if (cardsRef.current) {
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          
          gsap.set(card, { opacity: 0, y: 60 });
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          });

          // Hover animation
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="container mx-auto px-4 py-24 relative overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="mb-16 flex items-center justify-between border-b border-foreground/10 dark:border-white/10 pb-6">
        <span className="text-sm font-mono uppercase text-foreground/60">
          Get in Touch
        </span>
        <span className="text-sm font-mono uppercase text-foreground/60">
          05 — Let's Connect
        </span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Icon - Hidden on mobile */}
        <div ref={iconRef} className="relative hidden lg:col-span-2 lg:flex lg:items-start lg:justify-center">
          <div className="sticky top-32">
            <QuoteIcon className="size-42 -rotate-12 -scale-x-100 text-foreground/10 dark:text-white/10 opacity-50" />
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-16 lg:col-span-10">
          {/* Heading */}
          <div>
            <h2
              ref={headingRef}
              className="font-medium text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Let's build
              <br />
              something <span className="relative inline-block text-foreground/50 dark:text-white/50 transition-colors duration-300 hover:text-foreground dark:hover:text-white">
                remarkable
              </span>
              <br />
              together.
            </h2>
          </div>

          {/* Description */}
          <div ref={descRef} className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6 font-light text-foreground/60 dark:text-white/60 text-lg leading-relaxed">
              <p>
                I'm always excited to explore <span className="font-normal text-foreground dark:text-white">new opportunities</span> and collaborate with talented people who share a passion for <span className="font-normal text-foreground dark:text-white">quality design and engineering</span>.
              </p>
              <p>
                Whether you have a project in mind, want to discuss ideas, or just want to connect — I'd love to hear from you.
              </p>
            </div>
            <div className="space-y-6 font-light text-foreground/60 dark:text-white/60 text-lg leading-relaxed">
              <p>
                I respond to messages quickly and love having <span className="font-normal text-foreground dark:text-white">meaningful conversations</span> about building digital products.
              </p>
              <p>
                Pick your preferred way to reach out below, and let's start a conversation.
              </p>
            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
}

export default Contact