/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { useScroll, useTransform } from 'framer-motion';
import ReactLenis from 'lenis/react';
import HeroSection from './components/pages/HeroSection';
import Experience from './components/pages/ExperienceSectionh';
import WorkSections from './components/pages/WorkSection';
import Philosophy from './components/pages/PhilosophySection';
import Contact from './components/pages/ContactSection';
import Header from './components/navigations/Header';
import StackSection from './components/pages/StackSection';
import WorkflowSection from './components/pages/WorkflowSection';
import ActivitySection from './components/pages/ActivitySection';
import Footer from './components/navigations/Footer';
import ResumeSection from './components/pages/ResumeSection';
import { ThemeToggleButton } from './components/ui/skiper26';

const AppContent: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden bg-background text-foreground selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Header />
        <HeroSection heroOpacity={heroOpacity} heroScale={heroScale} />
          <Experience />
            <WorkSections />
              <ActivitySection />
                <StackSection />
              <WorkflowSection />
              <ResumeSection />
            <Philosophy />
        <Contact />
      <div className="fixed bottom-6 md:bottom-4 right-4 md:right-6 z-50 pointer-events-auto">
        <ThemeToggleButton className='h-8 w-8 ' variant="circle" start="bottom-right" />
      </div>
      <Footer/>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ReactLenis root>
      <AppContent />
    </ReactLenis>
  );
};

export default App;
