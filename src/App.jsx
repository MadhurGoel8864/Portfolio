import { CustomCursor } from './components/ui/CustomCursor';
import { ParticleCanvas } from './components/ui/ParticleCanvas';
import { BootSequence } from './components/ui/BootSequence';
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

export default function App() {
  return (
    <>
      <CustomCursor />
      <BootSequence />
      <ParticleCanvas />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 10 }}>
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
