import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FlipButton, FlipButtonBack, FlipButtonFront } from '../animate-ui/primitives/buttons/flip';
import { SiWhatsapp } from 'react-icons/si';
import { Typewriter } from '../ui/typewriter';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  heroOpacity: ReturnType<typeof useTransform>;
  heroScale: ReturnType<typeof useTransform>;
}

const words = ["feel intuitive", "are scalable", "stay responsive", "drive results"];

const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          gsap.to({ val: 0 }, {
            val: value,
            duration,
            ease: 'power2.out',
            onUpdate: function() {
              setCount(Math.floor(this.targets()[0].val));
            }
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
};

const handleWhatsAppClick = () => {
  const phoneNumber = "62812345678"; 
  const message = "Hi Xavier, I'm interested in collaborating with you!";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

const SplitText = ({ children, className, delay = 0 }: { children: string; className?: string; delay?: number }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.set(chars, { 
      opacity: 0, 
      y: '100%',
      rotateX: -90
    });

    gsap.to(chars, {
      opacity: 1,
      y: '0%',
      rotateX: 0,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.02,
      delay
    });
  }, [delay]);

  return (
    <span ref={containerRef} className={className} style={{ perspective: '1000px' }}>
      {children.split('').map((char, i) => (
        <span 
          key={i} 
          className="char inline-block" 
          style={{ 
            transformStyle: 'preserve-3d',
            willChange: 'transform, opacity'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

function HeroSection({  }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP scroll-based parallax and fade
  useLayoutEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax scroll effect
      gsap.to(contentRef.current, {
        y: -100,
        scale: 0.95,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Initial reveal animations
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Title animation with clip-path reveal
      if (titleRef.current) {
        gsap.set(titleRef.current, { 
          clipPath: 'inset(100% 0% 0% 0%)',
          y: 50
        });
        tl.to(titleRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          duration: 1.5
        }, 0.2);
      }

      // Subtitle with staggered letters
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { 
          clipPath: 'inset(100% 0% 0% 0%)',
          y: 50
        });
        tl.to(subtitleRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          duration: 1.5
        }, 0.4);
      }

      // Description fade in
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, { opacity: 0, y: 40 });
        tl.to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 1
        }, 0.8);
      }

      // CTA buttons staggered reveal
      if (ctaRef.current) {
        const ctaChildren = ctaRef.current.children;
        gsap.set(ctaChildren, { opacity: 0, y: 30 });
        tl.to(ctaChildren, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15
        }, 1);
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic effect for buttons
  useEffect(() => {
    const buttons = document.querySelectorAll('.magnetic-btn');
    
    const handleMouseMove = (e: MouseEvent, btn: Element) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = (btn: Element) => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent, btn));
      btn.addEventListener('mouseleave', () => handleMouseLeave(btn));
    });

    return () => {
      buttons.forEach(btn => {
        btn.removeEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent, btn));
        btn.removeEventListener('mouseleave', () => handleMouseLeave(btn));
      });
    };
  }, []);

  return (
    <section 
  ref={sectionRef}
  className="relative min-h-screen flex items-center justify-center px-6 border-b border-foreground/10 overflow-hidden"
>
  <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-10">

    {/* TITLE */}
    <div className="flex flex-col items-center leading-none">
      <h1 
        ref={titleRef}
        className="text-[12vw] md:text-[9vw] leading-[0.8] font-bold uppercase tracking-tight"
      >
        <SplitText delay={0.3}>Hello, I'm</SplitText>
      </h1>

      <h1 
        ref={subtitleRef}
        className="text-[14vw] md:text-[9vw] leading-[0.9] font-bold uppercase text-foreground/60 -mt-4"
      >
        <SplitText delay={0.6}>Xavier</SplitText>
      </h1>
    </div>

    {/* DESCRIPTION */}
    <div ref={descriptionRef} className="max-w-2xl">
      <h2 className="text-lg md:text-3xl font-light tracking-tight">
        <span className="font-medium">Frontend Developer. </span>
        <span className="text-foreground/60">
          Delivering meaningful experiences with tools that{" "}
        </span>

        <Typewriter
          text={["Impactful", "Efficient", "Innovative", "Responsive", "Optimized"]}
          speed={90}
          waitTime={1500}
          deleteSpeed={70}
          cursorChar="_"
          className="text-black dark:text-white"
        />
      </h2>
    </div>

    {/* CTA */}
    <div
      ref={ctaRef}
      className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
    >
      <div className="magnetic-btn">
        <FlipButton>
          <FlipButtonFront className="rounded-full border w-43 h-13 flex items-center justify-center">
            <span className="text-md font-medium font-mono uppercase">
              Work with me
            </span>
          </FlipButtonFront>

          <FlipButtonBack 
            onClick={handleWhatsAppClick}
            className="rounded-full border w-43 h-13 flex items-center justify-center cursor-pointer"
          >
            <SiWhatsapp className="text-[#25D366] mr-2 text-base"/>
            <span className="text-md font-medium">WhatsApp</span>
          </FlipButtonBack>
        </FlipButton>
      </div>

      <span className="text-sm font-mono uppercase text-foreground/60">
        <span className="text-foreground/60 text-md ">
          1+
        </span>{" "}
        Years of experience
      </span>
    </div>

  </div>
</section>
  );
}

export default HeroSection;

