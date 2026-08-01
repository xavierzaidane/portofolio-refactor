import React from "react";
import { motion } from "motion/react";
import type { Project } from "@/data/types";
import { getTechIcons as getTechIconsData } from "@/data/tech-icons";

interface CaseStudySectionProps {
  project: Project;
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ project }) => {
  const getTechIcons = () => {
    return getTechIconsData(project.tech, 8);
  };

  return (
    <div className="flex flex-col py-24 md:gap-14 gap-24">

      {/* Problem Definition */}
      {project.problem && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex gap-4"
        >
          <div className="md:w-[45%] flex gap-4 justify-end shrink-0">
            <p className="text-foreground/50 text-sm md:text-base font-mono">[1]</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="text-sm md:text-base text-foreground font-mono border-b border-foreground/10 pb-2">
              PROBLEM DEFINITION
            </p>
            <p className="text-foreground/70 md:w-[85%] text-sm md:text-base">
              {project.problem}
            </p>
          </div>
        </motion.div>
      )}

      {/* Solution */}
      {project.solution && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex gap-4"
        >
          <div className="md:w-[45%] flex gap-4 justify-end shrink-0">
            <p className="text-foreground/50 text-sm md:text-base font-mono">[2]</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="text-sm md:text-base text-foreground font-mono border-b border-foreground/10 pb-2">
              SOLUTIONS
            </p>
            <p className="text-foreground/70 md:w-[85%] text-sm md:text-base">
              {project.solution}
            </p>
          </div>
        </motion.div>
      )}

      {/* Features & Scope */}
      {project.scope && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex gap-4"
        >
          <div className="md:w-[45%] flex gap-4 justify-end shrink-0">
            <p className="text-foreground/50 text-sm md:text-base font-mono">[3]</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="text-sm md:text-base text-foreground font-mono border-b border-foreground/10 pb-2">
              FEATURES & SCOPE
            </p>
            <p className="text-foreground/70 md:w-[85%] text-sm md:text-base">
              {project.scope}
            </p>
          </div>
        </motion.div>
      )}

      {/* Development Process */}
      {project.development && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex gap-4"
        >
          <div className="md:w-[45%] flex gap-4 justify-end shrink-0">
            <p className="text-foreground/50 text-sm md:text-base font-mono">[4]</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between border-b border-foreground/10 pb-2">
              <p className="text-sm md:text-base text-foreground font-mono">
                DEVELOPMENT PROCESS
              </p>
              <div className="md:flex hidden gap-3 opacity-60">
                {getTechIcons().map((skill, idx) => {
                  const IconComponent = skill.icon;
                  return (
                    <div key={idx} className="flex items-center justify-center" title={skill.name}>
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="text-foreground/70 md:w-[85%] text-sm md:text-base">
              {project.development}
            </p>
            <div className="md:hidden flex gap-3 opacity-60">
              {getTechIcons().map((skill, idx) => {
                const IconComponent = skill.icon;
                return (
                  <div key={idx} className="flex items-center justify-center" title={skill.name}>
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default CaseStudySection;
