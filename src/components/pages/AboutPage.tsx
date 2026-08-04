import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
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
  SiVite
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
    title: 'BACKEND DEVELOPMENT',
    description: 'I can handle both server-side development and database management for your web application, utilizing Node.js, TypeScript, Go, PostgreSQL, MongoDB, Redis, and Docker. My main focus is on developing REST & GraphQL API backends that are seamlessly integrated with efficient data management systems.',
    icons: [SiNodedotjs, SiTypescript, SiGo, SiPostgresql, SiMongodb, SiRedis, SiDocker]
  },
  {
    id: 'agentic',
    title: 'AGENTIC WORKFLOW ENGINEERING',
    description: 'Building custom LLM pipelines, multi-agent execution graphs, and Retrieval-Augmented Generation (RAG) workflows using Python, OpenAI, Docker, and TypeScript to automate complex enterprise tasks.',
    icons: [SiPython, SiOpenai, SiDocker, SiTypescript, SiNodedotjs]
  },
  {
    id: 'frontend',
    title: 'FRONTEND DEVELOPMENT',
    description: 'Crafting ultra-responsive, accessible, and performant web applications with React, Next.js, TypeScript, Tailwind CSS, Vite, and Framer Motion with rich micro-interactions and pixel-perfect layouts.',
    icons: [SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiFramer]
  },
  {
    id: 'webdesign',
    title: 'WEB DESIGN',
    description: 'Designing modern, aesthetic UI/UX frameworks, bespoke design systems, responsive dark/light themes, and interactive prototypes using Figma, HTML5, CSS3, and Framer that captivate users.',
    icons: [SiFigma, SiTailwindcss, SiHtml5, SiCss, SiFramer]
  }
];

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const lenis = useLenis();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

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
    link.download = 'Xavier_Zaidane_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background pt-24 pb-16 container mx-auto px-4 md:px-16 xl:px-20 overflow-hidden">


      {/* HEADER SECTION */}
      <motion.header
        className="flex flex-col gap-1 mb-50 mt-40"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-normal tracking-tighter leading-[0.9] text-foreground">
          About me
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-serif  text-foreground/80 tracking-tight ml-1 mt-1">
          Xavier Zaidane Athaya  <span className="text-foreground/50">希文</span>
        </h2>
      </motion.header>

      {/* LOCATION & SOCIAL BAR */}
      <motion.div
        className="flex flex-wrap items-center justify-between  border-b border-foreground/15 dark:border-white/15 py-4 my-6 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Left: Location */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-mono text-foreground/70">
          <MapPin size={15} className="text-foreground/90" />
          <span>Based in Shenyang, China</span>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex items-center gap-5 text-foreground/70">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-foreground transition-colors hover:scale-110">
            <SiYoutube size={16} />
          </a>
          <a href="https://github.com/xavierzaidane" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-foreground transition-colors hover:scale-110">
            <SiGithub size={16} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-foreground transition-colors hover:scale-110">
            <SiInstagram size={16} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-foreground transition-colors hover:scale-110">
            <Linkedin size={16} />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="hover:text-foreground transition-colors hover:scale-110">
            <SiX size={15} />
          </a>
        </div>
      </motion.div>

      {/* HERO PORTRAIT BANNER */}
      <motion.div
        className="relative w-full rounded-sm overflow-hidden my-10 bg-muted/30 border border-foreground/10 group"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <div className="aspect-[16/9] md:aspect-[11/8] w-full relative overflow-hidden">
          <img
            src="/about.jpg"
            alt="Xavier Zaidane Portrait"
            className="w-full h-full object-cover object-bottom filter grayscale contrast-[1.05] brightness-95 group-hover:grayscale-0  group-hover:scale-[1.02] transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* WHAT I DO SECTION */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 border-b border-foreground/15 dark:border-white/15 items-start"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="md:col-span-3">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 font-medium">
            WHAT I DO
          </span>
        </div>
        <div className="md:col-span-9">
          <p className="text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed tracking-tight text-foreground/90">
            I am a full stack engineer specializing in frontend development and AI-integrated Applications. With a strong focus on code, I build reliable software that drives business growth.
          </p>
        </div>
      </motion.section>

      {/* HOW I CAN HELP YOU SECTION */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12  border-foreground/15 dark:border-white/15 items-start"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="md:col-span-3">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 font-medium">
            HOW I CAN HELP YOU
          </span>
        </div>
        <div className="md:col-span-9 flex flex-col divide-y divide-foreground/15 dark:divide-white/15">
          {services.map((service) => {
            const isOpen = openAccordion === service.id;
            return (
              <div key={service.id} className="py-6 first:pt-0 last:pb-0">
                <button
                  onClick={() => toggleAccordion(service.id)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer py-4 gap-4"
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-mono uppercase tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">
                    {service.title}
                  </h3>

                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <div className="flex items-center gap-2.5 sm:gap-3.5 text-foreground/50 group-hover:text-foreground/80 transition-colors">
                      {service.icons.map((Icon, idx) => (
                        <Icon key={idx} className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform group-hover:scale-110" />
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
              </div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
