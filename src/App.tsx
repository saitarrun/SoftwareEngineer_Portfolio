import { lazy, Suspense, useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

const BackgroundCanvas = lazy(() =>
  import('./three/BackgroundCanvas').then((m) => ({ default: m.BackgroundCanvas }))
);
const Experience = lazy(() =>
  import('./components/Experience').then((m) => ({ default: m.Experience }))
);
const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })));
const Skills = lazy(() => import('./components/Skills').then((m) => ({ default: m.Skills })));
const Education = lazy(() =>
  import('./components/Education').then((m) => ({ default: m.Education }))
);
const Publications = lazy(() =>
  import('./components/Publications').then((m) => ({ default: m.Publications }))
);
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })));

const CanvasLoader = () => (
  <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
    <div className="absolute inset-0 bg-[#0e0e0e]" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
    </div>
  </div>
);

const ChatWidget = lazy(() =>
  import('./components/ChatWidget').then((m) => ({ default: m.ChatWidget }))
);

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
    transition={{
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {children}
  </motion.div>
);

const Portfolio = () => (
  <div className="min-h-screen bg-[#0e0e0e] grid-mesh font-sans selection:bg-orange-500/30 selection:text-orange-200 transition-colors duration-300">
    <Suspense fallback={<CanvasLoader />}>
      <BackgroundCanvas />
    </Suspense>

    <Navbar />

    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>

    <main id="main" className="relative z-10 min-h-screen" role="main">
      <Hero />
      <Suspense fallback={null}>
        <SectionWrapper>
          <Experience />
        </SectionWrapper>
        <SectionWrapper>
          <Education />
        </SectionWrapper>
        <SectionWrapper>
          <Projects />
        </SectionWrapper>
        <SectionWrapper>
          <Skills />
        </SectionWrapper>
        <SectionWrapper>
          <Publications />
        </SectionWrapper>
        <SectionWrapper>
          <Contact />
        </SectionWrapper>
      </Suspense>
    </main>
  </div>
);

function App() {
  const [useNativeScroll, setUseNativeScroll] = useState(
    () => window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    const updateScrollMode = () => setUseNativeScroll(mediaQuery.matches);

    mediaQuery.addEventListener('change', updateScrollMode);
    return () => mediaQuery.removeEventListener('change', updateScrollMode);
  }, []);

  if (useNativeScroll) return <Portfolio />;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.07,
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        infinite: false,
      }}
    >
      <Portfolio />
    </ReactLenis>
  );
}

export default App;
