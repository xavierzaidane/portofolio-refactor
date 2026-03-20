import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FlipButton, FlipButtonBack, FlipButtonFront } from '../animate-ui/primitives/buttons/flip';
import { SiWhatsapp } from 'react-icons/si';
import { FlipWords } from '../ui/flip-words';

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

// Split text into spans for character animation
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
      className="relative h-screen flex flex-col items-center justify-center px-6 mb-10 border-b border-foreground/10 overflow-hidden"
    >
   

      <div 
        ref={contentRef}
        className="text-center z-10 w-full max-w-[50vw] -mt-20"
      >
        <div className="flex flex-col items-center mb-8 overflow-hidden">
          <h1 
            ref={titleRef}
            className="text-[12vw] md:text-[10vw] leading-[0.9] font-bold uppercase tracking-tighter text-foreground will-change-transform"
          >
            <SplitText delay={0.3}>Hello, I'm</SplitText>
          </h1>
          <h1 
            ref={subtitleRef}
            className="text-[15vw] md:text-[10vw] leading-[0.9]  font-bold uppercase tracking-normal text-foreground/40 -mt-[1.8vw] will-change-transform"
          >
            <SplitText delay={0.6}>Xavier</SplitText>
          </h1>
        </div>
        
        <div
          ref={descriptionRef}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-xl md:text-3xl font-light tracking-tight max-w-3xl text-foreground">
            <span className="font-medium">Frontend engineer.</span>{" "}
            <span className="text-foreground/60">
              Building and delivering meaningful digital experiences with the tools that
              <FlipWords words={words} /> <br />
            </span>
          </h2>
        </div>
        
        <div
          ref={ctaRef}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
        >
          <div className="magnetic-btn">
            <FlipButton>
              <FlipButtonFront className='rounded-full border border-border w-45 h-13 flex items-center justify-center'>
                <span className="text-[17px] font-medium font-mono uppercase text-foreground">Work with me</span>
              </FlipButtonFront>
              <FlipButtonBack 
                onClick={handleWhatsAppClick}
                className='rounded-full border border-border w-45 h-13 flex items-center justify-center cursor-pointer'
              >
                <SiWhatsapp className='text-[#25D366] mr-2 text-[17px]'/>
                <span className="text-[17px] font-medium text-foreground">WhatsApp</span>
              </FlipButtonBack>
            </FlipButton>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[13px] font-mono tracking-[0.2em] uppercase text-foreground/60">
              <span className="text-foreground font-bold"><Counter value={1} />+</span> Years of experience
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-foreground/40 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

