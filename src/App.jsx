import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';

import { Navbar }       from './components/sections/Navbar';
import { Hero }         from './components/sections/Hero';
import { About }        from './components/sections/About';
import { Skills }       from './components/sections/Skills';
import { Projects }     from './components/sections/Projects';
import { Experience }   from './components/sections/Experience';
import { Achievements } from './components/sections/Achievements';
import { Contact }      from './components/sections/Contact';
import { Footer }       from './components/sections/Footer';
import { Loader }       from './components/ui/Loader';
import { ScrollToTop }  from './components/ui/ScrollToTop';
import { CursorGlow }   from './components/ui/CursorGlow';

export default function App() {
  const [isDark, toggleTheme] = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Loader show={loading} />
      <CursorGlow />

      {/* background-color and color both come from CSS vars (index.css body rule) */}
      <div className="font-sans antialiased min-h-screen transition-colors duration-300">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <Contact />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
