"use client";
import gsap from "gsap";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/projects";
import ProjectDialog from "../ProjectDialog";
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  // Transform PROJECTS data to match component structure
  const projectsWithMeta = PROJECTS.map((project) => ({
    src: project.image[0] || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
    title: project.title,
    id: project.id,
    project, // Include full project data
  }));

  return (
    <section id="work" className="py-16 md:py-24 lg:py-32 bg-transparent">
      <div className="max-w-full mx-auto border-t  dark:border-foreground/10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 mb-8 md:mb-10 lg:mb-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between gap-8 md:gap-12 pb-10">
          <h2 className="text-xs sm:text-[13px] md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-foreground/40 dark:text-white/40">
            Selected Works
          </h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 max-w-5xl"
          >

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-foreground/60 dark:text-white/60"
            >
              Here's a overview of my recent <span className="text-foreground dark:text-white font-normal">projects.</span> Each project represents my <span className="text-foreground dark:text-white font-normal">dedications.</span>
            </motion.p>
          </motion.div>
        </div>

        <div className="flex min-h-screen items-center justify-center">
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

        {selectedProject && (
          <ProjectDialog
            project={selectedProject}
            open={isDialogOpen}
            onOpenChange={handleDialogClose}
          />
        )}
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
      className="group flex w-full cursor-pointer items-center justify-between border-t border-foreground/10 px-6 md:px-20 py-8 md:py-12 transition-all duration-200 last:border-b hover:opacity-50"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      onClick={() => onProjectClick(project)}
    >
      <h2 className="m-0 text-3xl md:text-6xl font-normal transition-all duration-300 group-hover:translate-x-2.5">
        {title}
      </h2>
      <p className="hidden md:block font-light transition-all duration-300 group-hover:translate-x-2.5">
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
        className="pointer-events-none absolute flex h-[400px] w-[480px] items-center justify-center overflow-hidden  shadow-2xl"
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
        className="pointer-events-none absolute z-20 flex h-20 w-20 items-center justify-center rounded-full backdrop-blur-lg font-light text-sm text-white"
        initial="initial"
        ref={cursor}
        variants={scaleAnimation}
      />
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute z-20 flex h-20 w-20 items-center justify-center rounded-full bg-transparent font-light text-sm text-white"
        initial="initial"
        ref={cursorLabel}
        variants={scaleAnimation}
      >
        View
      </motion.div>
    </>
  );
}

export default WorkSections