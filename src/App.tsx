import { lazy, Suspense } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

const BackgroundCanvas = lazy(() =>
  import('./three/BackgroundCanvas').then((m) => ({ default: m.BackgroundCanvas }))
);
const Experience = lazy(() => import('./components/Experience').then((m) => ({ default: m.Experience })));
const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })));
const Skills = lazy(() => import('./components/Skills').then((m) => ({ default: m.Skills })));
const Education = lazy(() => import('./components/Education').then((m) => ({ default: m.Education })));
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })));

const CanvasLoader = () => (
  <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
    <div className="absolute inset-0 bg-[#0e0e0e]" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
    </div>
  </div>
);

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.2,
        infinite: false,
      }}
    >
      <div className="min-h-screen font-sans selection:bg-orange-500/30 selection:text-orange-200 transition-colors duration-300">
        {/* 3D particle background */}
        <Suspense fallback={<CanvasLoader />}>
          <BackgroundCanvas />
        </Suspense>

        <Navbar />

        <main id="main" className="relative z-10 grid-mesh min-h-screen" role="main">
          <Hero />
          <Suspense fallback={null}>
            <SectionWrapper>
              <Experience />
            </SectionWrapper>
            <SectionWrapper>
              <Projects />
            </SectionWrapper>
            <SectionWrapper>
              <Skills />
            </SectionWrapper>
            <SectionWrapper>
              <Education />
            </SectionWrapper>
            <SectionWrapper>
              <Contact />
            </SectionWrapper>
          </Suspense>
        </main>
      </div>
    </ReactLenis>
  );
}

export default App;
