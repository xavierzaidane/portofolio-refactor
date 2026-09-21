"use client";
import gsap from "gsap";
import { motion } from "motion/react";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/data/types";
import { ArrowUpRight } from "lucide-react";

const scaleAnimation = {
  initial: { scale: 0 },
  enter: {
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  closed: {
    scale: 0,
    transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] },
  },
} as const;

function WorkSections() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const navigate = useNavigate();

  const handleProjectClick = useCallback(
    (project: Project) => {
      navigate(`/project/${project.id}`);
    },
    [navigate]
  );

  // Transform PROJECTS data to match component structure with memoization
  const projectsWithMeta = useMemo(
    () =>
      PROJECTS.map((project) => ({
        src:
          project.image[0] ||
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
        title: project.title,
        id: project.id,
        project,
      })),
    []
  );

  return (
    <section id="work" className="container mx-auto px-20">
      {/* Left Label */}
      <div className="py-12 -mb-5">
        <span className="text-sm font-mono uppercase text-foreground/60">
          Selected Work
        </span>
      </div>

      {/* Projects Section - Full Width */}
      <div className="border-t border-foreground/10 dark:border-white/10 py-20">
        <div className="flex min-h-screen items-center justify-center -mt-20 -mb-10">
          <div className="flex w-full flex-col items-center justify-center">
            {projectsWithMeta.map((projectMeta, index) => (
              <ProjectItem
                key={projectMeta.id}
                index={index}
                setModal={setModal}
                title={projectMeta.title}
                project={projectMeta.project}
                onProjectClick={handleProjectClick}
              />
            ))}
          </div>
          <Modal modal={modal} projects={projectsWithMeta} />
        </div>
      </div>
    </section>
  );
}

function ProjectItem({
  index,
  title,
  setModal,
  project,
  onProjectClick,
}: {
  index: number;
  title: string;
  setModal: React.Dispatch<React.SetStateAction<{ active: boolean; index: number }>>;
  project: Project;
  onProjectClick: (project: Project) => void;
}) {
  return (
    <div
      className="group flex w-full cursor-pointer items-center justify-between border-t border-foreground/10 py-8 md:py-12 transition-opacity duration-200 first:border-t-0 last:border-b-0 hover:opacity-50"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      onClick={() => onProjectClick(project)}
    >
      <h2 className="m-0 font-medium text-5xl leading-[0.95] tracking-tight md:text-6xl transition-transform duration-300 group-hover:translate-x-2.5">
        <span className="text-[0.775rem] mr-6 font-mono tracking-wide text-foreground/60">
          {String(index + 1).padStart(2, "0")}.
        </span>{" "}
        {title}
      </h2>
      <div className="hidden md:flex items-center gap-6 text-[0.775rem] font-mono uppercase text-foreground/60 transition-transform duration-300 group-hover:translate-x-2.5">
        <span>{project.category}</span>
        <div className="w-13 h-13 bg-background dark:bg-background border dark:text-black text-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="text-foreground/70" size={20} />
        </div>
      </div>
    </div>
  );
}

function Modal({
  modal,
  projects,
}: {
  modal: { active: boolean; index: number };
  projects: { src: string; title: string; id: string }[];
}) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalContainer.current || !cursor.current || !cursorLabel.current) return;

    // Use GPU-accelerated translate with xPercent/yPercent for 50% centering
    gsap.set([modalContainer.current, cursor.current, cursorLabel.current], {
      xPercent: -50,
      yPercent: -50,
    });

    const xMoveContainer = gsap.quickTo(modalContainer.current, "x", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "y", {
      duration: 0.8,
      ease: "power3",
    });
    const xMoveCursor = gsap.quickTo(cursor.current, "x", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "y", {
      duration: 0.5,
      ease: "power3",
    });
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "x", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "y", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xMoveContainer(clientX);
      yMoveContainer(clientY);
      xMoveCursor(clientX);
      yMoveCursor(clientY);
      xMoveCursorLabel(clientX);
      yMoveCursorLabel(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={modalContainer}
        className="pointer-events-none fixed top-0 left-0 z-20 will-change-transform"
      >
        <motion.div
          animate={active ? "enter" : "closed"}
          className="relative flex h-100 w-120 items-center justify-center overflow-hidden shadow-2xl"
          initial="initial"
          variants={scaleAnimation}
        >
          <div
            className="absolute h-full w-full will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{ transform: `translate3d(0, ${index * -100}%, 0)` }}
          >
            {projects.map((project) => (
              <div
                className="flex h-full w-full items-center justify-center overflow-hidden"
                key={project.id}
              >
                <img
                  alt={project.title}
                  className="h-full w-full object-cover"
                  src={project.src}
                  decoding="async"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div
        ref={cursor}
        className="pointer-events-none fixed top-0 left-0 z-30 will-change-transform"
      >
        <motion.div
          animate={active ? "enter" : "closed"}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground opacity-90"
          initial="initial"
          variants={scaleAnimation}
        />
      </div>

      <div
        ref={cursorLabel}
        className="pointer-events-none fixed top-0 left-0 z-30 will-change-transform"
      >
        <motion.div
          animate={active ? "enter" : "closed"}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-transparent font-mono text-sm text-white dark:text-black uppercase select-none"
          initial="initial"
          variants={scaleAnimation}
        >
          Visit
        </motion.div>
      </div>
    </>
  );
}

export default WorkSections;