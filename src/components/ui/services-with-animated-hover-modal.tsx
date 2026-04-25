"use client";
import gsap from "gsap";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    color: "#000000",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
    title: "Freight Transportation",
  },
  {
    color: "#8C8C8C",
    src: "https://images.unsplash.com/photo-1664575066211-36c3a9d38d7d?w=600&h=600&fit=crop",
    title: "Last-Mile Delivery",
  },
  {
    color: "#EFE8D3",
    src: "https://images.unsplash.com/photo-1494200666200-c5d88cdd33c0?w=600&h=600&fit=crop",
    title: "Supply Chain Optimization",
  },
  {
    color: "#706D63",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
    title: "24/7 Customer Support",
  },
];

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

export default function Services() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <div className="py-16 overflow-hidden bg-[#f9f9f9] dark:bg-background text-black dark:text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-0">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-16">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Services.</h2>
          <p className="max-w-md font-medium text-neutral-500">
            Our solutions are tailored to meet the unique challenges of modern
            supply chains, providing speed, reliability, and flexibility at
            every stage of the journey.
          </p>
        </div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            {projects.map((project, index) => (
              <Project
                index={index}
                key={project.title}
                setModal={setModal}
                title={project.title}
              />
            ))}
          </div>
          <Modal modal={modal} projects={projects} />
        </div>
      </div>
    </div>
  );
}

function Project({ index, title, setModal }: { index: number; title: string; setModal: any }) {
  return (
    <div
      className="group flex w-full cursor-pointer items-center justify-between border-t border-[rgb(201,201,201)] px-6 md:px-20 py-8 md:py-12 transition-all duration-200 last:border-b hover:opacity-50"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <h2 className="m-0 text-3xl md:text-6xl font-normal transition-all duration-300 group-hover:translate-x-2.5">
        {title}
      </h2>
      <p className="hidden md:block font-light transition-all duration-300 group-hover:translate-x-2.5">
        Design & Development
      </p>
    </div>
  );
}

function Modal({ modal, projects }: { modal: { active: boolean; index: number }; projects: any[] }) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Move Container
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    // Move cursor
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    // Move cursor label
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
        className="pointer-events-none absolute flex h-80 w-96 items-center justify-center overflow-hidden bg-white"
        initial="initial"
        ref={modalContainer}
        variants={scaleAnimation}
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -100}%` }}
        >
          {projects.map((project) => (
            <div
              className="flex h-full w-full items-center justify-center"
              key={project.title}
              style={{ backgroundColor: project.color }}
            >
              <img
                alt={project.title}
                className="h-auto max-w-sm object-cover"
                src={project.src}
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute z-20 flex h-20 w-20 items-center justify-center rounded-full bg-[#455CE9] font-light text-sm text-white"
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
