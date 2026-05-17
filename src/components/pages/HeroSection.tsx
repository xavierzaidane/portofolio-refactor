import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTransform } from 'motion/react';
import { gsap } from 'gsap';

import { FlipButton, FlipButtonBack, FlipButtonFront } from '../animate-ui/primitives/buttons/flip';
import { SiWhatsapp } from 'react-icons/si';
import AnimatedTextCycle from '../ui/animated-text-cycle';
import { ArrowUpRight } from 'lucide-react';

const scaleAnimation = {
  closed: {
    scale: 0,
    transition: { duration: 0.4, ease: "easeIn" },
    x: "-50%",
    y: "-50%",
  },
  enter: {
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
    x: "-50%",
    y: "-50%",
  },
  initial: { scale: 0, x: "-50%", y: "-50%" },
} as const;

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
  const helloCursor = useRef<HTMLDivElement>(null);
  const helloCursorLabel = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const [titleHovered, setTitleHovered] = useState(false);





  // Hello cursor effect for title
  useEffect(() => {
    const xMoveCursor = gsap.quickTo(helloCursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(helloCursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    const xMoveCursorLabel = gsap.quickTo(helloCursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(helloCursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  xMoveCursor(clientX);
  yMoveCursor(clientY);
  xMoveCursorLabel(clientX);
  yMoveCursorLabel(clientY);
};

    const titleWrapper = titleWrapperRef.current;
    if (titleWrapper) {
      titleWrapper.addEventListener("mousemove", handleMouseMove);
      titleWrapper.addEventListener("mouseenter", () => setTitleHovered(true));
      titleWrapper.addEventListener("mouseleave", () => setTitleHovered(false));
    }

    return () => {
      if (titleWrapper) {
        titleWrapper.removeEventListener("mousemove", handleMouseMove);
        titleWrapper.removeEventListener("mouseenter", () => setTitleHovered(true));
        titleWrapper.removeEventListener("mouseleave", () => setTitleHovered(false));
      }
    };
  }, []);

  return (
    <section 
  ref={sectionRef}
  id="/"
  className="relative min-h-screen flex items-center  container mx-auto px-20 py-20  justify-center  overflow-hidden "
>
  <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-10">

    {/* TITLE */}
    <div ref={titleWrapperRef} className="flex flex-col items-center cursor-pointer leading-none text-center px-4">
      <motion.h1
          className="font-medium text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-9xl pointer-events-none"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
      >
        <SplitText>Hello, I'm</SplitText>
      </motion.h1>

      <motion.h1
          className="font-medium text-foreground/70 text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl -mt-2  lg:text-9xl pointer-events-none"
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
        <span className="text-foreground/60">Delivering professional experiences that </span>{""}
        <AnimatedTextCycle 
          words={[
            "solve real problems",
            "deliver results",
            "drive real impact",
            "make a difference",
            "optimize outcomes"

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
          <FlipButtonFront className="rounded-full border h-12 px-6 ps-6 pe-13 flex items-center justify-center">
            <span className="text-sm font-medium uppercase ">
              Contact me
            </span>
            <div className="absolute right-1 w-10 h-10 bg-foreground/70 dark:bg-white dark:text-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
          </FlipButtonFront>

          <FlipButtonBack 
            onClick={handleWhatsAppClick}
            className="rounded-full border h-12 px-6  flex items-center justify-center cursor-pointer hover:bg-foreground/10 dark:hover:bg-white/10"
          >
            <SiWhatsapp className="text-[#25D366] w-4 h-4  mr-2 text-base"/>
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
    </motion.div>

  </div>

  {/* Hello Cursor Circle */}
<motion.div
  animate={titleHovered ? "enter" : "closed"}
  className="pointer-events-none fixed z-50 flex h-20 w-20 items-center justify-center rounded-full bg-foreground opacity-93"
  initial="initial"
  ref={helloCursor}
  variants={scaleAnimation}
>
  <span className="text-sm text-center font-mono uppercase text-background">
    你好(Hello)
  </span>
</motion.div>
</section>
  );
}

export default HeroSection;

