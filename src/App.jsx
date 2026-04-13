import { useState } from 'react';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { WhatIBuild } from './components/sections/WhatIBuild';
import { SystemOverview } from './components/sections/SystemOverview';
import { Architecture } from './components/sections/Architecture';
import { EngineeringSystems } from './components/sections/EngineeringSystems';
import { APIDesign } from './components/sections/APIDesign';
import { Achievements } from './components/sections/Achievements';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Loader } from './components/ui/Loader';
import { useTheme } from './hooks/useTheme';

export default function App() {
  useTheme();

  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatIBuild />
        <SystemOverview />
        <Architecture />
        <EngineeringSystems />
        <APIDesign />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
