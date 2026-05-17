
import { useRef, useLayoutEffect } from 'react';
import { SiGithub, SiGmail, SiResend } from 'react-icons/si'
import { FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { Download, Mail } from 'lucide-react'
import { HiArrowUp } from 'react-icons/hi2';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ButtonWithIconDemo from '../ui/button-witn-icon';

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
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
      // Animate left section - title
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 20 });
        gsap.to(titleRef.current, {
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
      }

      // Animate heading
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 40 });
        gsap.to(headingRef.current, {
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
      }

      // Animate CTA buttons
      if (ctaRef.current) {
        const children = ctaRef.current.children;
        gsap.set(children, { opacity: 0, y: 30 });
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Animate navigation links
      if (navRef.current) {
        const children = navRef.current.children;
        gsap.set(children, { opacity: 0, x: 20 });
        gsap.to(children, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Animate social links
      if (socialRef.current) {
        const children = socialRef.current.children;
        gsap.set(children, { opacity: 0, scale: 0 });
        gsap.to(children, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Animate bottom section
      if (bottomRef.current) {
        gsap.set(bottomRef.current, { opacity: 0, y: 20 });
        gsap.to(bottomRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Back to top button animation
      if (backToTopRef.current) {
        gsap.set(backToTopRef.current, { opacity: 0, y: 20 });
        gsap.to(backToTopRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Animate bottom section
      if (bottomRef.current) {
        gsap.set(bottomRef.current, { opacity: 0, y: 20 });
        gsap.to(bottomRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative container mx-auto px-20 bg-background flex flex-col justify-between overflow-hidden">
      <div className="border-t border-foreground/10 dark:border-white/10 px-4 py-24 xl:px-20 md:px-16 flex w-full justify-between md:flex-row flex-col md:gap-0 gap-12">
        {/* Left Section */}
        <div ref={leftRef} className="flex flex-col justify-between h-full md:w-[50%]">
          <div>
            <p ref={titleRef} className="font-medium text-foreground/70 text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-2xl mb-1">
              Contact
            </p>
            <p ref={headingRef} className="font-medium text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-5xl mb-16">
              Let's stay connected
            </p>
            
            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex gap-4 flex-col md:flex-row">
              <ButtonWithIconDemo />
            </div>
            <p className="mt-15 text-sm leading-relaxed text-foreground/60 dark:text-white/60">
              &copy; 2026 portfolio by Xavier Zaidane Athaya
              <br />
              Made with React &mdash; escape from the matrix
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div ref={rightRef} className="md:w-[45%] w-full flex gap-16 md:justify-end justify-start my-10 md:mt-0">
          {/* Navigation Links */}
          <div ref={navRef} className="flex flex-col w-fit">
            <p className="font-medium text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-xl mb-5">
              Navigation
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { name: 'Home', href: '#' },
                { name: 'Work', href: '#work' },
                { name: 'Experience', href: '#experience' },
                { name: 'Stack', href: '#stack' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors duration-300 md:text-base text-sm font-light"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div ref={socialRef} className="flex flex-col w-fit">
            <p className="font-medium text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-xl mb-5">
              Socials
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/xavierzaidane"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors duration-300 md:text-base text-sm font-light"
              >
                <SiGithub className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/xavier-zaidane-athaya-5748b128a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors duration-300 md:text-base text-sm font-light"
              >
                <FaLinkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/xavierzdn?igsh=ZXlqYzEzaGxpZWpn&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors duration-300 md:text-base text-sm font-light"
              >
                <FaInstagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <a
                href="mailto:xavierzaidane@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors duration-300 md:text-base text-sm font-light"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-b from-transparent to-background/50 pointer-events-none z-0" />
    </footer>
  );
}

export default Footer;