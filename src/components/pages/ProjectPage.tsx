import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/data/types";
import ProjectHeader from "../project/ProjectHeader";
import ProjectMainImage from "../project/ProjectMainImage";
import CaseStudySection from "../project/CaseStudySection";
import ProjectNavigation from "../project/ProjectNavigation";

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const lenis = useLenis();
  const [project, setProject] = useState<Project | null>(null);
  const [previousProject, setPreviousProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);

  useEffect(() => {
    // Scroll to top immediately using Lenis
    if (lenis) {
      lenis.scrollTo(0, { duration: 0 });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, lenis]);

  useEffect(() => {
    const foundProject = PROJECTS.find((p) => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);

      const currentIndex = PROJECTS.findIndex((p) => p.id === projectId);
      if (currentIndex > 0) {
        setPreviousProject(PROJECTS[currentIndex - 1]);
      }
      if (currentIndex < PROJECTS.length - 1) {
        setNextProject(PROJECTS[currentIndex + 1]);
      }
    } else {
      navigate("/");
    }
  }, [projectId, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const handlePreviousClick = () => {
    if (previousProject) {
      navigate(`/project/${previousProject.id}`);
    }
  };

  const handleNextClick = () => {
    if (nextProject) {
      navigate(`/project/${nextProject.id}`);
    }
  };

  return (
    <main className="container mx-auto px-4 py-20 bg-background text-foreground">
      <ProjectHeader project={project} />
      <ProjectMainImage project={project} />
      <CaseStudySection project={project} />
      <ProjectNavigation
        previousProject={previousProject}
        nextProject={nextProject}
        onPreviousClick={handlePreviousClick}
        onNextClick={handleNextClick}
      />
    </main>
  );
};

export default ProjectPage;
