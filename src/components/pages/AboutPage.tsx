import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { BRAILLE_ART } from '@/data/braille';
import {
  MapPin,
  ChevronDown,
  ArrowUpRight,
  Download,
  ArrowLeft,
  Linkedin
} from 'lucide-react';
import {
  SiYoutube,
  SiGithub,
  SiInstagram,
  SiX,
  SiWhatsapp,
  SiNodedotjs,
  SiTypescript,
  SiGo,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiPython,
  SiOpenai,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiFigma,
  SiHtml5,
  SiCss,
  SiVite,
  SiN8N
} from 'react-icons/si';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icons: React.ComponentType<{ className?: string; size?: number }>[];
}

const services: ServiceItem[] = [
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'I can handle both server-side development and database management for your web application, utilizing Node.js, TypeScript, Go, PostgreSQL, MongoDB, Redis, and Docker. My main focus is on developing REST & GraphQL API backends that are seamlessly integrated with efficient data management systems.',
    icons: [SiNodedotjs, SiTypescript, SiGo, SiPostgresql, SiMongodb, SiRedis, SiDocker]
  },
  {
    id: 'agentic',
    title: 'Agentic Workflow Engineering',
    description: 'Building custom LLM pipelines, multi-agent execution graphs, and Retrieval-Augmented Generation (RAG) workflows using n8n, Python, OpenAI, Docker, and TypeScript to automate complex enterprise tasks.',
    icons: [SiN8N, SiPython, SiOpenai, SiDocker, SiTypescript, SiNodedotjs]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Crafting ultra-responsive, accessible, and performant web applications with React, Next.js, TypeScript, Tailwind CSS, Vite, and Framer Motion with rich micro-interactions and pixel-perfect layouts.',
    icons: [SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiFramer]
  },
  {
    id: 'webdesign',
    title: 'Web Design & UI/UX',
    description: 'Designing modern, aesthetic UI/UX frameworks, bespoke design systems, responsive dark/light themes, and interactive prototypes using Figma, HTML5, CSS3, and Framer that captivate users.',
    icons: [SiFigma, SiTailwindcss, SiHtml5, SiCss, SiFramer]
  }
];

const headlineWords = [
  { text: "I" },
  { text: "am" },
  { text: "Xavier" },
  { text: "Zaidane" },
  { text: "Athaya," },
  { text: "a" },
  { text: "Fullstack", isHighlight: true },
  { text: "Developer", isHighlight: true },
  { text: "and" },
  { text: "Agentic", isHighlight: true },
  { text: "Workflow", isHighlight: true },
  { text: "Engineer", isHighlight: true },
  { text: "with" },
  { text: "a" },
  { text: "passion" },
  { text: "for" },
  { text: "building." },
];

const sublineWords = [
  "—Undergrads",
  "who",
  "likes",
  '"building"',
  "something",
  "based",
  "on",
  "my",
  "daily",
  "activity",
  "as",
  "a",
  "student",
  "in",
  "China"
];

const headlineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.15,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const sublineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.75,
    },
  },
};

const sublineWordVariants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const lenis = useLenis();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [brailleText, setBrailleText] = useState(BRAILLE_ART);

  useEffect(() => {
    fetch('/braile.txt')
      .then((res) => {
        if (res.ok) return res.text();
        return BRAILLE_ART;
      })
      .then((text) => setBrailleText(text))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 0 });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "62812345678";
    const message = "Hi Xavier, I reached out from your About Me page!";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/document/CV_Xavier.pdf'; // or resume link
    link.download = 'Xavier_Zaidane_Athaya_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background pt-24 pb-16 container mx-auto px-4 md:px-16 xl:px-20 overflow-hidden">


      {/* HEADER SECTION */}
      <motion.header
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-between mb-24 md:mb-32 mt-20 md:mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Column: Title & Intro */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-normal text-sm tracking-widest text-foreground/50 font-medium"
          >
            About Me
          </motion.div>

          <motion.h1
            variants={headlineContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tighter leading-[1.05] text-foreground max-w-2xl flex flex-wrap gap-x-[0.28em] gap-y-[0.08em]"
          >
            {headlineWords.map((item, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                className={
                  item.isHighlight
                    ? "font-instrument italic text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors duration-300 inline-block"
                    : "inline-block"
                }
              >
                {item.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h2
            variants={sublineContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl font-normal text-foreground/75 tracking-tight ml-0.5 mt-2 max-w-2xl flex flex-wrap gap-x-[0.25em] gap-y-[0.06em]"
          >
            {sublineWords.map((word, idx) => (
              <motion.span key={idx} variants={sublineWordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Right Column: Braille Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end items-center"
        >
          <div className="relative group p-7 sm:p-5">
            <pre className="font-mono text-[4.5px] sm:text-[5.5px] md:text-[6px] lg:text-lg xl:text-[10px] leading-[1.30] tracking-[-0.05em] text-foreground/70 dark:text-foreground/80 select-none whitespace-pre transition-colors duration-300 group-hover:text-foreground">
              {brailleText}
            </pre>
          </div>
        </motion.div>
      </motion.header>

      {/* HOW I CAN HELP YOU SECTION */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-16 border-t border-foreground/15 dark:border-white/15 items-start mt-12 md:-mt-37"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="md:col-span-3"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 font-medium">
            HOW I CAN HELP YOU
          </span>
        </motion.div>

        <div className="md:col-span-9 flex flex-col divide-y divide-foreground/15 dark:divide-white/15">
          {services.map((service) => {
            const isOpen = openAccordion === service.id;
            return (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="py-6 first:pt-0 last:pb-0"
              >
                <button
                  onClick={() => toggleAccordion(service.id)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer py-4 gap-4"
                >
                  <h3 className="text-base sm:text-lg md:text-2xl font-instrument italic tracking-tight text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {service.title}
                  </h3>

                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <div className="flex items-center gap-2.5 sm:gap-3.5 text-foreground/50 group-hover:text-foreground/80 transition-colors duration-300">
                      {service.icons.map((Icon, idx) => (
                        <Icon key={idx} className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:scale-110" />
                      ))}
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-0.5 text-foreground/60 group-hover:text-foreground ml-1"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-6 text-foreground/75">
                        <p className="text-sm sm:text-base leading-relaxed font-sans max-w-3xl">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
