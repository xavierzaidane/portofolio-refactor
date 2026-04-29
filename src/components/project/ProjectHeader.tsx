import React from "react";
import { Github, Globe } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/data/types";

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <div className="w-full md:h-[85vh] flex flex-col pt-60 justify-between py-10 gap-10">
      <div className="w-full h-full flex md:flex-row flex-col justify-between md:gap-3 gap-12">
        {/* Name & Description */}
        <div className="flex flex-col gap-8 md:w-[60%] w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-medium text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-baskerville 3xl:text-2xl md:text-xl text-foreground/80"
          >
            {project.fullDescription || project.description}
          </motion.p>
        </div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col justify-between lg:h-[75%] h-full gap-6"
        >
          {project.year && (
            <div className="text-left">
              <p className="text-foreground/60 text-sm font-mono">YEAR</p>
              <p className="md:text-xl text-lg">{project.year}</p>
            </div>
          )}

          <div className="text-left">
            <p className="text-foreground/60 text-sm font-mono">CATEGORY</p>
            <p className="md:text-xl text-lg">{project.category}</p>
          </div>

          {project.role && (
            <div className="text-left">
              <p className="text-foreground/60 text-sm font-mono">ROLE</p>
              <p className="md:text-xl text-lg">{project.role}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Link Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex gap-3 md:gap-4 md:justify-start justify-end flex-wrap"
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 px-5 h-12 border border-foreground/20 hover:border-foreground/20 rounded-full font-mono text-xs uppercase tracking-wider transition-all hover:bg-foreground/10"
          >
            <Github className="w-4 h-4" />
            <span className="hidden md:inline">GitHub</span>
          </a>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 px-5 h-12 border border-foreground rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-wider transition-all hover:opacity-90"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden md:inline">Visit Live</span>
          </a>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectHeader;
