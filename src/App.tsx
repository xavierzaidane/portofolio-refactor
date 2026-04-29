/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import ReactLenis from 'lenis/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navigations/Navbar';
import HeroSection from './components/pages/HeroSection';
import Experience from './components/pages/ExperienceSectionh';
import WorkSections from './components/pages/WorkSection';
import Philosophy from './components/pages/PhilosophySection';
import Contact from './components/pages/ContactSection';
import StackSection from './components/pages/StackSection';
import WorkflowSection from './components/pages/WorkflowSection';
import ActivitySection from './components/pages/ActivitySection';
import Footer from './components/navigations/Footer';
import ResumeSection from './components/pages/ResumeSection';
import ProjectPage from './components/pages/ProjectPage';
import { ThemeToggleButton } from './components/ui/skiper26';
import FollowCursor from './components/ui/cursor';

const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative min-h-screen antialiased font-sans overflow-x-hidden bg-background text-foreground selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
        <FollowCursor zIndex={10} size={5} lightColor="#72767a" darkColor="#e7e9ea" />
        <HeroSection/>
          <Experience />
            <WorkSections />
              <ActivitySection />
                <StackSection />
              <WorkflowSection />
              <ResumeSection />
            <Philosophy />
        <Contact />
      <div className="fixed bottom-6 md:bottom-4 right-4 md:right-6 z-50 pointer-events-auto">
        <ThemeToggleButton className='h-8 w-8 ' variant="circle" start="bottom-right" blur={true} />
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="relative min-h-screen antialiased font-sans overflow-x-hidden bg-background text-foreground selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <FollowCursor zIndex={10} size={5} lightColor="#72767a" darkColor="#e7e9ea" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
      </Routes>
      <div className="fixed bottom-6 md:bottom-4 right-4 md:right-6 z-50 pointer-events-auto">
        <ThemeToggleButton className='h-8 w-8 ' variant="circle" start="bottom-right" blur={true} />
      </div>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ReactLenis root>
        <AppContent />
      </ReactLenis>
    </BrowserRouter>
  );
};

export default App;
