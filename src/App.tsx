/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { useScroll, useTransform } from 'framer-motion';
import ReactLenis from 'lenis/react';
import FluidBackground from './components/FluidBackground';
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

const AppContent: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="relative min-h-screen text-white bg-[#050505] selection:bg-white selection:text-black font-sans overflow-x-hidden">
      <FluidBackground />
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
