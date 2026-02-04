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
        className="group relative w-full border-b border-white/10 py-16 md:py-20 cursor-pointer"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 px-7 md:px-0">
          {/* Left Side: Number and Title */}
          <div className="flex items-start md:items-baseline gap-6 md:gap-12 flex-1">
            <span className="text-xs md:text-lg font-mono text-white/20 mt-1 md:mt-0 px-5 pointer-events-none">
              {formattedIndex}
            </span>
            <h3 className="text-5xl md:text-9xl font-heading font-bold tracking-tighter text-white/70 group-hover:text-white transition-colors duration-500 pointer-events-none">
              {project.title}
            </h3>
          </div>

          {/* Right Side: Category and Arrow */}
          <div className="flex items-center justify-between md:justify-end gap-12 px-5">
            <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-white/30 whitespace-nowrap">
              {project.category}
            </span>
            
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors duration-500" />
            </div>
          </div>
        </div>
      </motion.div>

      <ProjectDialog project={project} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default ProjectCard;
