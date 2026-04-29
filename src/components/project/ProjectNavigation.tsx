import React from "react";
import { motion } from "motion/react";
import type { Project } from "@/data/types";

interface ProjectNavigationProps {
  previousProject: Project | null;
  nextProject: Project | null;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  previousProject,
  nextProject,
  onPreviousClick,
  onNextClick,
}) => {
  if (!previousProject && !nextProject) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex my-10 justify-between gap-4 flex-wrap"
    >
      {previousProject && (
        <button
          onClick={onPreviousClick}
          className="cursor-pointer select-none group"
        >
          <div className="flex flex-col md:flex-row gap-2">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="mt-1 text-foreground/50 text-sm w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div className="text-left">
              <p className="text-foreground/50 text-sm">Previous Case Study</p>
              <p className="text-xl font-baskerville italic text-foreground">
                {previousProject.title}
              </p>
            </div>
          </div>
        </button>
      )}

      {nextProject && (
        <button
          onClick={onNextClick}
          className="cursor-pointer select-none group ml-auto md:ml-0"
        >
          <div className="flex flex-col-reverse md:flex-row items-end md:items-start gap-2 justify-end cursor-pointer">
            <div className="text-right">
              <p className="text-sm text-foreground/50">Next Case Study</p>
              <p className="text-xl font-baskerville italic text-foreground">
                {nextProject.title}
              </p>
            </div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="mt-1 text-foreground/50 text-sm w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      )}
    </motion.div>
  );
};



export default ProjectNavigation;
