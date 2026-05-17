'use client';

import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const underlineRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: 'work' },
    { label: 'Resume', href: 'resume' },
    { label: 'Contact', href: 'contact' },
  ];

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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // If it's a route (Home), navigate to it
    if (href === '/') {
      navigate('/');
      return;
    }

    // For section scrolling
    const isOnHomePage = location.pathname === '/';
    
    if (isOnHomePage) {
      // Already on home page, scroll to section
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // On project page, navigate to home first, then scroll
      setScrollTarget(href);
      navigate('/');
    }
  };

  const handleLinkHover = (href: string, isEntering: boolean) => {
    const underline = underlineRefs.current[href];
    if (!underline) return;

    gsap.to(underline, {
      scaleX: isEntering ? 1 : 0,
      duration: 0.90,
      ease: 'power3.out',
      transformOrigin: 'left center',
    });
  };

  return (
    <motion.nav 
      className="fixed -top-8 w-full z-50 px-4 md:px-8 lg:px-12 py-6 flex justify-between items-center mix-blend-difference bg-linear-to-b from-white/10 via-transparent to-transparent"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
    
      {/* Left Section: Tagline */}
      <div className="absolute w-full h-full top-0 left-0 flex items-center gap-4 pointer-events-none px-4 md:px-8 lg:px-12">
        <div className="w-[42%] justify-end hidden md:flex">
          <div className="w-12 h-px bg-background/80 dark:bg-white/40" />
        </div>
        <p className="font-mono text-xs md:text-xs hidden md:block text-background/80 dark:text-white/60">
  打造 (crafting) &amp; 提升 (driving conversions)
</p>
      </div>

      {/* Logo/Brand */}
        <a href="/"
          onClick={(e) => handleSmoothScroll(e, '/')}
          className="flex items-center gap-2"
        >
      <div className="logo-nav cursor-pointer z-10">
      
        <p className="text-lg md:text-sm font-medium text-background/80 dark:text-white">
          希文
        </p>
        
      </div>
      </a>

      {/* Right Section: Nav Links + Hamburger */}
      <div className="navbar-right z-10 relative flex items-center gap-6 top-7">
        {/* Desktop Nav Links */}
        <div className="nav-links-desktop hidden md:flex flex-col items-end ">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
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

        {/* Hamburger Menu */}
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-foreground/80 dark:text-white/60 hover:text-foreground/90 dark:hover:text-white transition-colors z-20"
          aria-label="Toggle menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 dark:bg-background/95 border-b border-foreground/10 dark:border-white/10 md:hidden py-6 px-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm font-mono text-foreground/80 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
}

export default Navbar;