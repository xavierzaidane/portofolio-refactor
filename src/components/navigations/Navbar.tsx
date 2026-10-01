'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, ArrowUpRight } from 'lucide-react';
import { SiGithub, SiInstagram } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import gsap from 'gsap';
import { CurvedMenu, type iNavItem } from '../ui/curved-menu';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: 'work' },
  { label: 'Resume', href: 'resume' },
  { label: 'Contact', href: 'contact' },
];

const curvedNavItems: iNavItem[] = [
  { heading: 'Home', href: '/' },
  { heading: 'Work', href: 'work' },
  { heading: 'About', href: '/about' },
  { heading: 'Resume', href: 'resume' },
  { heading: 'Contact', href: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const underlineRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll target after navigation completes
  useEffect(() => {
    if (scrollTarget && location.pathname === '/') {
      const timer = requestAnimationFrame(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      setScrollTarget(null);
      return () => cancelAnimationFrame(timer);
    }
  }, [scrollTarget, location.pathname]);

  const handleNavigate = (href: string) => {
    setIsOpen(false);

    // Route navigation
    if (href === '/') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    // Section scroll
    const isOnHomePage = location.pathname === '/';
    if (isOnHomePage) {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setScrollTarget(href);
      navigate('/');
    }
  };

  const handleLinkHover = (href: string, isEntering: boolean) => {
    const underline = underlineRefs.current[href];
    if (!underline) return;

    gsap.to(underline, {
      scaleX: isEntering ? 1 : 0,
      duration: 0.7,
      ease: 'power3.out',
      transformOrigin: 'left center',
    });
  };

  return (
    <>
      {/* Top Navbar: Visible when at the top of the page */}
      <motion.nav
        className="fixed -top-8 w-full z-40 px-4 md:px-8 lg:px-12 py-6 flex justify-between items-center mix-blend-difference bg-linear-to-b from-white/10 via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: isScrolled ? 0 : 1,
          y: isScrolled ? -20 : 0,
          pointerEvents: isScrolled ? 'none' : 'auto',
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Left Section: Tagline */}
        <div className="absolute w-full h-full top-0 left-0 flex items-center gap-4 pointer-events-none px-4 md:px-8 lg:px-12">
          <div className="w-[42%] justify-end hidden md:flex">
            <div className="w-12 h-px bg-background/80 dark:bg-white/40" />
          </div>
          <p className="font-mono text-xs hidden md:block text-background/80 dark:text-white/60">
            打造 (crafting) &amp; 提升 (driving conversions)
          </p>
        </div>

        {/* Logo/Brand */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate('/');
          }}
          className="flex items-center gap-2 pointer-events-auto"
        >
          <div className="logo-nav cursor-pointer z-10">
            <p className="text-lg md:text-sm text-background/80 dark:text-white">
              希文
            </p>
          </div>
        </a>

        {/* Right Section: Desktop Nav Links + Mobile Trigger */}
        <div className="navbar-right z-10 relative flex items-center gap-6 top-7 pointer-events-auto">
          {/* Desktop Nav Links */}
          <div className="nav-links-desktop hidden md:flex flex-col items-end">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(link.href);
                }}
                onMouseEnter={() => handleLinkHover(link.href, true)}
                onMouseLeave={() => handleLinkHover(link.href, false)}
                className="relative text-xs md:text-sm cursor-pointer text-background/80 dark:text-white/60 hover:text-background/50 dark:hover:text-white transition-colors"
              >
                {link.label}
                <span
                  ref={(el) => {
                    underlineRefs.current[link.href] = el;
                  }}
                  className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-background/80 dark:bg-white/70"
                />
              </a>
            ))}
          </div>

          {/* Mobile hamburger button at top */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground/80 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors z-20"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Floating Kebab / Hamburger Trigger (Appears smoothly when scrolled down or when menu is open) */}
      <AnimatePresence>
        {(isScrolled || isOpen) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-5 right-5 md:top-6 md:right-8 z-50"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between items-center">
                <span
                  className={`block h-0.5 w-5 bg-neutral-900 dark:bg-white transition-transform duration-300 ${
                    isOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-neutral-900 dark:bg-white transition-opacity duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-neutral-900 dark:bg-white transition-transform duration-300 ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curved Menu Drawer */}
      <CurvedMenu
        isActive={isOpen}
        setIsActive={setIsOpen}
        navItems={curvedNavItems}
        showTrigger={false}
        onNavigate={handleNavigate}
        footer={
          <div className="flex flex-col gap-6 pt-6 border-t border-black/10 dark:border-white/10 pb-6">

            <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400">
              <a
                href="https://github.com/xavierzaidane"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors p-1"
                aria-label="GitHub Profile"
              >
                <SiGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/xavier-zaidane-athaya-5748b128a"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors p-1"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/xavierzdn?igsh=ZXlqYzEzaGxpZWpn&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors p-1"
                aria-label="Instagram Profile"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        }
      />
    </>
  );
}