import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';

import { FlipButton, FlipButtonBack, FlipButtonFront } from '../animate-ui/primitives/buttons/flip';
import { SiWhatsapp } from 'react-icons/si';
import { FlipWords } from '../ui/flip-words';

interface HeroSectionProps {
  heroOpacity: ReturnType<typeof useTransform>;
  heroScale: ReturnType<typeof useTransform>;
}

const words = ["feel intuitive", "are scalable", "stay responsive", "drive results"];

const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalMilliseconds = duration * 1000;
      const incrementTime = totalMilliseconds / end;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const handleWhatsAppClick = () => {
  const phoneNumber = "62812345678"; 
  const message = "Hi Xavier, I'm interested in collaborating with you!";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

function HeroSection({  }: HeroSectionProps) {
  const { scrollYProgress } = useScroll();
  const heroOpacityTransform = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScaleTransform = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-6 mb-10 border-b border-foreground/10 overflow-hidden">
      <motion.div 
        style={{ opacity: heroOpacityTransform, scale: heroScaleTransform }} 
        className="text-center z-10 w-full max-w-[90vw] -mt-20"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[12vw] leading-[0.9] font-heading font-bold uppercase tracking-tighter text-foreground"
          >
            Hello, I'm
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] md:text-[12vw] leading-[0.9] font-heading font-bold uppercase tracking-normal text-foreground/40 -mt-[1.8vw]"
          >
            Xavier
          </motion.h1>
        </div>
        
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-xl md:text-3xl font-light tracking-tight max-w-3xl text-foreground">
            <span className="font-medium">Frontend engineer.</span>{" "}
            <span className="text-foreground/60">
              Building and delivering meaningful digital experiences with the tools that
             <FlipWords words={words} /> <br />
            </span>
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
        >
          <FlipButton>
            <FlipButtonFront className='rounded-full border border-border w-45 h-13 flex items-center justify-center'>
            <span className="text-[17px] font-medium uppercase text-foreground">Work with me</span>
          </FlipButtonFront>
          <FlipButtonBack 
            onClick={handleWhatsAppClick}
            className='rounded-full border border-border w-45 h-13 flex items-center justify-center cursor-pointer'
          >
            <SiWhatsapp className='text-[#25D366] mr-2 text-[17px]'/>
            <span className="text-[17px] font-medium text-foreground">WhatsApp</span>
          </FlipButtonBack>
          </FlipButton>
          

          <div className="flex items-center gap-2">
            <span className="text-[13px] font-mono tracking-[0.2em] uppercase text-foreground/60">
              <span className="text-foreground font-bold"><Counter value={1} />+</span> Years of experience
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;

