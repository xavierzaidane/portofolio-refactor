import React from "react";
import { motion } from "motion/react";
import type { Project } from "@/data/types";

interface ProjectMainImageProps {
  project: Project;
}

const ProjectMainImage: React.FC<ProjectMainImageProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="border-t border-foreground/10 flex pt-4 gap-2 w-full"
    >
      <div className="flex items-center justify-center overflow-hidden rounded-[0.5rem] md:h-screen w-full h-[50vh]">
        <img
          src={project.image[0]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
};

export default ProjectMainImage;
