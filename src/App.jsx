import { useState } from 'react';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { WhatIBuild } from './components/sections/WhatIBuild';
import { SystemOverview } from './components/sections/SystemOverview';
import { Architecture } from './components/sections/Architecture';
import { EngineeringSystems } from './components/sections/EngineeringSystems';
import { Achievements } from './components/sections/Achievements';
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
        <SystemOverview />
        <WhatIBuild />
        <Architecture />
        <EngineeringSystems />
        <Achievements />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
