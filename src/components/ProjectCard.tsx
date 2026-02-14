/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../data/types';
import ProjectDialog from './ProjectDialog';


interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
        animate={{ scale: isHovered ? 0.98 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="group relative w-full border-b border-border py-8 sm:py-12 md:py-16 lg:py-20 cursor-pointer"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 md:gap-8 px-4 sm:px-5 md:px-0">
          {/* Left Side: Number and Title */}
          <div className="flex items-start md:items-baseline gap-3 sm:gap-6 md:gap-12 flex-1">
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-lg font-mono text-foreground/20 mt-1 md:mt-0 px-3 sm:px-4 md:px-5 pointer-events-none">
              {formattedIndex}
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-9xl font-heading font-bold tracking-tighter text-foreground/70 group-hover:text-foreground transition-colors duration-500 pointer-events-none">
              {project.title}
            </h3>
          </div>

          {/* Right Side: Category and Arrow */}
          <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-8 md:gap-12 px-3 sm:px-4 md:px-0">
            <span className="text-[9px] sm:text-[10px] md:text-xs font-mono tracking-wide md:tracking-widest uppercase text-foreground/30 whitespace-nowrap">
              {project.category}
            </span>
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all duration-500">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-foreground group-hover:text-background transition-colors duration-500" />
            </div>
          </div>
        </div>
      </motion.div>

      <ProjectDialog project={project} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default ProjectCard;
