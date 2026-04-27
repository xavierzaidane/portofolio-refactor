import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTransform } from 'motion/react';
import { gsap } from 'gsap';

import { FlipButton, FlipButtonBack, FlipButtonFront } from '../animate-ui/primitives/buttons/flip';
import { SiWhatsapp } from 'react-icons/si';
import AnimatedTextCycle from '../ui/animated-text-cycle';



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

const SplitText = ({ children, className }: { children: string; className?: string }) => {
  return (
    <span className={className}>
      {children}
    </span>
  );
};

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);



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
  id="/"
  className="relative min-h-screen flex items-center  container mx-auto px-4 py-20  justify-center  overflow-hidden "
>
  <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-10">

    {/* TITLE */}
    <div className="flex flex-col items-center leading-none text-center px-4">
      <motion.h1
          className="font-medium text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-9xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
      >
        <SplitText>Hello, I'm</SplitText>
      </motion.h1>

      <motion.h1
          className="font-medium text-foreground/70 text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl -mt-2  lg:text-9xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
      >
        <SplitText>Xavier</SplitText>
      </motion.h1>
    </div>


    {/* DESCRIPTION */}
    <motion.div
      className="max-w-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
    >
      <h2 className="text-[1.90rem] font-light tracking-tight">
        <span className="font-normal">Software Developer. </span>
        <span className="text-foreground/60">Delivering meaningful experiences with tools that </span>{""}
        <AnimatedTextCycle 
          words={[
            "Responsive",
            "Impactful",
            "Utilized",
            "Efficient",
            "Optimized",
            "Intuitive"

          ]}
          interval={3000}
          className="text-foreground font-normal" 
        />

      </h2>
    </motion.div>


    {/* CTA */}
    <motion.div
      className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
    >
      <div className="magnetic-btn">
        <FlipButton>
          <FlipButtonFront className="rounded-full border h-12 px-6 flex items-center justify-center">
            <span className="text-sm font-medium uppercase">
              Contact me
            </span>
          </FlipButtonFront>

          <FlipButtonBack 
            onClick={handleWhatsAppClick}
            className="rounded-full border h-12 px-6 flex items-center justify-center cursor-pointer hover:bg-foreground/10 dark:hover:bg-white/10"
          >
            <SiWhatsapp className="text-[#25D366] mr-2 text-base"/>
            <span className="text-sm font-medium">WhatsApp</span>
          </FlipButtonBack>
        </FlipButton>
      </div>

      <span className="text-sm font-mono uppercase text-foreground/60">
        <span className="text-foreground/60 text-md ">
          1+
        </span>{" "}
        Years of experience
      </span>
    </motion.div>

  </div>
</section>
  );
}

export default HeroSection;

