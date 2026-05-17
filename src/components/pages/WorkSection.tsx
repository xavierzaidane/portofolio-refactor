"use client";
import gsap from "gsap";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/data/types";

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

function WorkSections() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const navigate = useNavigate();

  const handleProjectClick = (project: Project) => {
    navigate(`/project/${project.id}`);
  };

  // Transform PROJECTS data to match component structure
  const projectsWithMeta = PROJECTS.map((project) => ({
    src: project.image[0] || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
    title: project.title,
    id: project.id,
    project, // Include full project data
  }));

  return (
    <section id="work" className="container mx-auto px-4">
      {/* Left Label */}
      <div className="py-12 -mb-5">
        <span className="text-sm font-mono uppercase text-foreground/60">
            Selected Work
        </span>
      </div>

      {/* Projects Section - Full Width */}
      <div className="border-t border-foreground/10 dark:border-white/10 py-20">
      <div className="flex min-h-screen items-center justify-center -mt-5">
        <div className="flex w-full flex-col items-center justify-center">
          {projectsWithMeta.map((projectMeta, index) => (
            <Project
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

function Project({
  index,
  title,
  setModal,
  project,
  onProjectClick,
}: {
  index: number;
  title: string;
  setModal: (state: { active: boolean; index: number }) => void;
  project: Project;
  onProjectClick: (project: Project) => void;
}) {
  return (
    <div
      className="group flex w-full cursor-pointer items-center justify-between border-t border-foreground/10 px-6 md:px-20 py-8 md:py-12 transition-all duration-200 first:border-t-0 last:border-b-0 hover:opacity-50"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      onClick={() => onProjectClick(project)}
    >
      <h2 className="m-0 font-medium text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-6xl transition-all duration-300 group-hover:translate-x-2.5">
        {title}
      </h2>
      <p className="hidden md:block text-[0.775rem]  font-mono uppercase text-foreground/60 transition-all duration-300 group-hover:translate-x-2.5">
        {project.category}
      </p>
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
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute flex h-100 w-120 items-center justify-center overflow-hidden shadow-2xl"
        initial="initial"
        ref={modalContainer}
        variants={scaleAnimation}
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 "
          style={{ top: `${index * -100}%` }}
        >
          {projects.map((project) => (
            <div
              className="flex h-full w-full items-center justify-center"
              key={project.id}
            >
              <img
                alt={project.title}
                className="h-auto w-full object-cover"
                src={project.src}
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute z-20 flex h-20 w-20 items-center justify-center rounded-full bg-foreground opacity-93"
        initial="initial"
        ref={cursor}
        variants={scaleAnimation}
      />
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute z-20 flex h-20 w-20 items-center justify-center rounded-full bg-transparent font-mono text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-sm text-white dark:text-black uppercase"
        initial="initial"
        ref={cursorLabel}
        variants={scaleAnimation}
      >
        Visit
      </motion.div>
    </>
  );
}

export default WorkSections