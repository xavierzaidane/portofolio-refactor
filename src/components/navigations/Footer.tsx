import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { SiGithub } from 'react-icons/si';
import { FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from 'next-themes';
import ButtonWithIconDemo from '../ui/button-witn-icon';
import HalftoneWordmarkFooter from '../ui/halftone-wordmark-footer';

gsap.registerPlugin(ScrollTrigger);

export interface FooterProps {
  wordmark?: string;
  height?: string;
  crop?: number;
}

export default function Footer({
  wordmark = 'xavier',
  height = '980px',
  crop = 0.25,
}: FooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  useLayoutEffect(() => {
    if (!containerRef.current) return;

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
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
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
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
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
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
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
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
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
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <HalftoneWordmarkFooter
      wordmark={wordmark}
      height={height}
      crop={crop}
      preset={isDark ? 'night' : 'paper'}
      palette={{
        background: isDark ? '#0b0b0b' : '#ffffff',
      }}
      containerClassName="container mx-auto px-4 sm:px-8 md:px-12 lg:px-2"
    >
      <div
        ref={containerRef}
        className="border-t border-foreground/10 dark:border-white/10 px-0 sm:px-4 py-16 md:py-24 xl:px-2 md:px-16 flex w-full justify-between md:flex-row flex-col items-center md:items-start md:gap-0 gap-12"
      >
        {/* Left Section */}
        <div
          ref={leftRef}
          className="flex flex-col justify-between h-full md:w-[50%] items-center md:items-start text-center md:text-left"
        >
          <div className="flex flex-col items-center md:items-start">
            <p
              ref={titleRef}
              className="font-instrument italic text-foreground/70 text-lg sm:text-xl md:text-xl lg:text-2xl tracking-tighter mb-1"
            >
              Contact
            </p>
            <p
              ref={headingRef}
              className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.05] md:leading-[0.95] tracking-tighter mb-8 sm:mb-12 md:mb-16"
            >
              Let's stay connected
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex gap-4 flex-col md:flex-row items-center md:items-start justify-center md:justify-start"
            >
              <ButtonWithIconDemo />
            </div>
            <p className="mt-10 md:mt-15 text-xs sm:text-sm leading-relaxed text-foreground/60 dark:text-white/60 text-center md:text-left">
              &copy; 2026 portfolio by Xavier Zaidane Athaya
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div
          ref={rightRef}
          className="md:w-[45%] w-full flex gap-12 sm:gap-16 justify-center md:justify-end my-6 md:my-10 md:mt-0"
        >
          {/* Navigation Links */}
          <div
            ref={navRef}
            className="flex flex-col w-fit items-center md:items-start text-center md:text-left"
          >
            <p className="font-instrument italic text-base sm:text-lg md:text-lg lg:text-xl tracking-tighter mb-3 sm:mb-4 md:mb-5">
              Navigation
            </p>
            <nav className="flex flex-col gap-2 items-center md:items-start">
              {[
                { name: 'Home', href: '/' },
                { name: 'Work', href: '/#work' },
                { name: 'Experience', href: '/#experience' },
                { name: 'Stack', href: '/#stack' },
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
          <div
            ref={socialRef}
            className="flex flex-col w-fit items-center md:items-start text-center md:text-left"
          >
            <p className="font-instrument italic text-base sm:text-lg md:text-lg lg:text-xl tracking-tighter mb-3 sm:mb-4 md:mb-5">
              Socials
            </p>
            <div className="flex flex-col gap-3 items-center md:items-start">
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
    </HalftoneWordmarkFooter>
  );
}