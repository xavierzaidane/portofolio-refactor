
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiGithub, SiInstagram, SiDribbble } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { HiArrowUp } from 'react-icons/hi2';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'GitHub', icon: SiGithub, href: 'https://github.com/xavier' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/in/xavier' },
  { name: 'Instagram', icon: SiInstagram, href: 'https://instagram.com/xavier' },
  { name: 'Dribbble', icon: SiDribbble, href: 'https://dribbble.com/xavier' },
];

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'Experience', href: '#experience' },
  { name: 'Stack', href: '#stack' },
  { name: 'Contact', href: '#contact' },
];

function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const topBorderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useLayoutEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate top border
      gsap.set(topBorderRef.current, {
        scaleX: 0,
        transformOrigin: 'center center'
      });
      
      gsap.to(topBorderRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none'
        }
      });

      // Animate logo
      gsap.set(logoRef.current, { opacity: 0, y: 40 });
      gsap.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      // Animate nav links with stagger
      const navItems = navRef.current?.children;
      if (navItems) {
        gsap.set(navItems, { opacity: 0, y: 30 });
        gsap.to(navItems, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Animate social icons with stagger
      const socialItems = socialRef.current?.children;
      if (socialItems) {
        gsap.set(socialItems, { opacity: 0, scale: 0, rotation: -180 });
        gsap.to(socialItems, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Animate bottom section
      gsap.set(bottomRef.current, { opacity: 0 });
      gsap.to(bottomRef.current, {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      // Back to top button animation
      gsap.set(backToTopRef.current, { opacity: 0, y: 20 });
      gsap.to(backToTopRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-16 md:py-20 px-6 md:px-12">


      <div className="max-w-7xl mx-auto">
    

        {/* Bottom section */}
        <div 
          ref={bottomRef}
          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-foreground/5"
        >
          <p className="text-foreground/40 font-mono text-xs md:text-sm uppercase tracking-wider">
            ©2026 Xavier. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-foreground/40 font-mono text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse" />
              Available for work
            </span>

            <button
              ref={backToTopRef}
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors duration-300 font-mono text-xs uppercase tracking-wider"
            >
              <span>Back to top</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-foreground/10 group-hover:border-zinc-500/50 group-hover:bg-zinc-500/10 transition-all duration-300">
                <HiArrowUp className="w-4 h-4 group-hover:text-zinc-500 group-hover:-translate-y-0.5 transition-all duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;