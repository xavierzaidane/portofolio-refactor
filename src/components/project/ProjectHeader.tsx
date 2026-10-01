import React, { useRef, useState } from "react";
import { Github, Globe, Globe2 } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/data/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };


  return (
    <div className="w-full md:h-[85vh] flex flex-col pt-24 sm:pt-32 md:pt-44 lg:pt-60 justify-between py-6 md:py-10 gap-8 md:gap-10">
      <div className="w-full h-full flex md:flex-row flex-col justify-between md:gap-3 gap-8 md:gap-12">
        {/* Name & Description */}
        <div className="flex flex-col gap-6 md:gap-8 md:w-[60%] w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-medium text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] md:leading-[0.95] tracking-tighter"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-normal text-sm sm:text-base md:text-xl 3xl:text-2xl text-foreground/80 leading-relaxed"
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
        className="flex gap-3 md:gap-4 justify-start flex-wrap"
      >
         <Button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onClick={() => window.open(project.github, '_blank')}
      variant="outline"
      className="relative overflow-hidden group flex items-center cursor-pointer justify-center gap-2 px-5 w-43 h-13 border border-foreground/60 dark:border-white/30 hover:border-foreground/20 rounded-full font-mono text-sm uppercase tracking-wider transition-all hover:bg-foreground/10"
    >
      <span
        className={cn(
          "absolute w-10 h-10 rounded-full scale-0 transition-transform duration-700 ease-in-out group-hover:scale-[15] pointer-events-none",
          "bg-foreground/80 dark:bg-white"
        )}
        style={{
          left: pos.x - 20,
          top: pos.y - 20,
        }}
      />
      <Github className="w-4 h-4 relative z-10  transition-colors duration-500 pointer-events-none group-hover:text-white dark:group-hover:text-black" />
      <span className="relative z-10 transition-colors duration-500 pointer-events-none group-hover:text-white dark:group-hover:text-black">
        view code
      </span>
    </Button>

    <Button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onClick={() => window.open(project.link, '_blank')}
      variant="outline"
      className="relative overflow-hidden group flex items-center cursor-pointer justify-center gap-2 px-5 w-43 h-13 border border-foreground/60 dark:border-foreground/20 hover:border-foreground/20 rounded-full font-mono text-sm uppercase tracking-wider transition-all hover:bg-foreground/10"
    >
      <span
        className={cn(
          "absolute w-10 h-10 rounded-full scale-0 transition-transform duration-700 ease-in-out group-hover:scale-[15] pointer-events-none",
          "bg-foreground/20 dark:bg-foreground/20"
        )}
        style={{
          left: pos.x - 20,
          top: pos.y - 20,
        }}
      />
      <Globe2 className="w-4 h-4 relative z-10  transition-colors duration-500 pointer-events-none group-hover:text-white dark:group-hover:text-foreground/20" />
      <span className="relative z-10 transition-colors duration-500 pointer-events-none group-hover:text-white dark:group-hover:text-foreground/20">
        Visit Live
      </span>
    </Button>
      </motion.div>
     
    </div>
  );
};

export default ProjectHeader;
