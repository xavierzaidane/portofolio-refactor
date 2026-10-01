import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

export interface iNavItem {
  heading: string;
  href: string;
  subheading?: string;
  imgSrc?: string;
  isExternal?: boolean;
}

export interface iNavLinkProps extends iNavItem {
  setIsActive: (isActive: boolean) => void;
  index: number;
  onNavigate?: (href: string) => void;
}

export interface iCurvedNavbarProps {
  setIsActive: (isActive: boolean) => void;
  navItems: iNavItem[];
  footer?: React.ReactNode;
  onNavigate?: (href: string) => void;
}

export interface iHeaderProps {
  navItems?: iNavItem[];
  footer?: React.ReactNode;
  isActive?: boolean;
  setIsActive?: (isActive: boolean) => void;
  showTrigger?: boolean;
  onNavigate?: (href: string) => void;
}

const MENU_SLIDE_ANIMATION: Variants = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
  },
};

export const defaultNavItems: iNavItem[] = [
  { heading: "Home", href: "/" },
  { heading: "Work", href: "work" },
  { heading: "About", href: "/about" },
  { heading: "Resume", href: "resume" },
  { heading: "Contact", href: "contact" },
];

export const NavLink: React.FC<iNavLinkProps> = ({
  heading,
  href,
  setIsActive,
  index,
  isExternal,
  onNavigate,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
    setIsActive(false);
  };

  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-black/15 dark:border-white/15 py-3 md:py-5 cursor-pointer"
    >
      <a
        href={href}
        onClick={handleClick}
        className="w-full flex items-center justify-between no-underline"
        {...linkProps}
      >
        <div className="relative flex items-center">
          <div className="flex flex-row overflow-hidden">
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: -8 },
              }}
              transition={{
                type: "spring",
                staggerChildren: 0.04,
                delayChildren: 0.05,
              }}
              className="relative z-10 block text-2xl md:text-7xl font-normal uppercase tracking-tight text-neutral-900 dark:text-white"
            >
              {heading.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { x: 0 },
                    whileHover: { x: 8 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.span>
          </div>
        </div>

        <motion.span
          variants={{
            initial: { opacity: 0, x: -10 },
            whileHover: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.2 }}
          className="text-xs font-normal text-neutral-400 dark:text-neutral-500 tracking-widest hidden sm:inline-block"
        >
          Explore
        </motion.span>
      </a>
    </motion.div>
  );
};

const getWindowHeight = () =>
  typeof window !== "undefined" ? window.innerHeight : 1000;

const subscribeWindowHeight = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

export const Curve: React.FC = () => {
  const height = React.useSyncExternalStore(
    subscribeWindowHeight,
    getWindowHeight,
    () => 1000,
  );

  const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;

  const curve: Variants = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  return (
    <svg
      className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full pointer-events-none fill-white dark:fill-[#0b0b0b] overflow-visible"
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
};

export const CurvedNavbar: React.FC<iCurvedNavbarProps> = ({
  setIsActive,
  navItems,
  footer,
  onNavigate,
}) => {
  return (
    <motion.div
      key="curved-navbar-panel"
      variants={MENU_SLIDE_ANIMATION}
      initial="initial"
      animate="enter"
      exit="exit"
      data-lenis-prevent
      className="h-[100dvh] w-screen max-w-screen-sm fixed right-0 top-0 z-50 bg-white dark:bg-[#0b0b0b] shadow-2xl border-l border-black/5 dark:border-white/10"
    >
      <div className="h-full pt-16 pb-8 flex flex-col justify-between overflow-y-auto" data-lenis-prevent>
        <div className="flex flex-col gap-4 px-8 md:px-16">
          <div className="text-black/50 dark:text-white/50 border-b border-black/10 dark:border-white/10 font-instrument italic text-lg tracking-tight pb-3 flex justify-between items-center">
            <span>Navigation</span>
          </div>
          <section className="bg-transparent mt-2">
            <div className="mx-auto w-full">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.href}
                  {...item}
                  setIsActive={setIsActive}
                  index={index + 1}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </section>
        </div>

        {footer && <div className="px-8 md:px-16 mt-6">{footer}</div>}
      </div>
      <Curve />
    </motion.div>
  );
};

export const CurvedMenu: React.FC<iHeaderProps> = ({
  navItems = defaultNavItems,
  footer,
  isActive: externalIsActive,
  setIsActive: externalSetIsActive,
  showTrigger = true,
  onNavigate,
}) => {
  const [internalIsActive, setInternalIsActive] = React.useState(false);

  const isControlled = externalIsActive !== undefined;
  const isActive = isControlled ? externalIsActive : internalIsActive;
  const setIsActive = isControlled
    ? (externalSetIsActive ?? (() => {}))
    : setInternalIsActive;

  // Lock body scroll while open
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  return (
    <>
      {showTrigger && (
        <div className="fixed top-4 right-4 md:top-6 md:right-8 z-50">
          <button
            onClick={() => setIsActive(!isActive)}
            className="w-12 h-12 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-6 h-4.5 flex flex-col justify-between items-center">
              <span
                className={`block h-0.5 w-5 bg-neutral-900 dark:bg-white transition-transform duration-300 ${
                  isActive ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-neutral-900 dark:bg-white transition-opacity duration-300 ${
                  isActive ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-neutral-900 dark:bg-white transition-transform duration-300 ${
                  isActive ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      )}

      <AnimatePresence>
        {isActive && (
          <motion.div
            key="curved-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsActive(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-[3px] z-40"
          />
        )}
        {isActive && (
          <CurvedNavbar
            key="curved-menu-drawer"
            setIsActive={setIsActive}
            navItems={navItems}
            footer={footer}
            onNavigate={onNavigate}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CurvedMenu;
