import { lazy, Suspense, useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Publications } from './components/Publications';
import { Contact } from './components/Contact';

const BackgroundCanvas = lazy(() =>
  import('./three/BackgroundCanvas').then((m) => ({ default: m.BackgroundCanvas }))
);

const ChatWidget = lazy(() =>
  import('./components/ChatWidget').then((m) => ({ default: m.ChatWidget }))
);

const MobileBackground = () => (
  <div className="fixed inset-0 pointer-events-none -z-0 overflow-hidden" aria-hidden="true">
    <div
      className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
      style={{ background: 'radial-gradient(circle, #ff7a00 0%, transparent 70%)' }}
    />
    <div
      className="absolute top-1/3 -right-40 w-80 h-80 rounded-full opacity-15 blur-3xl"
      style={{ background: 'radial-gradient(circle, #ff9249 0%, transparent 70%)' }}
    />
    <div
      className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl"
      style={{ background: 'radial-gradient(circle, #fb7800 0%, transparent 70%)' }}
    />
  </div>
);

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -2% 0px' }}
    transition={{
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    }}
    className="section-contain gpu-layer"
  >
    {children}
  </motion.div>
);

const DesktopBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = (
        window as unknown as { requestIdleCallback: (cb: () => void) => number }
      ).requestIdleCallback(() => setMounted(true));
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(
            id
          );
        }
      };
    } else {
      const timer = setTimeout(() => setMounted(true), 200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return <MobileBackground />;

  return (
    <Suspense fallback={<MobileBackground />}>
      <BackgroundCanvas />
    </Suspense>
  );
};

const Portfolio = ({ isMobile }: { isMobile: boolean }) => (
  <div className="min-h-screen bg-[#0e0e0e] grid-mesh font-sans selection:bg-orange-500/30 selection:text-orange-200 transition-colors duration-300">
    {isMobile ? <MobileBackground /> : <DesktopBackground />}

    <Navbar />

    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>

    <main id="main" className="relative z-10 min-h-screen" role="main">
      <Hero />
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
    </main>
  </div>
);

function App() {
  const [useNativeScroll, setUseNativeScroll] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    const updateScrollMode = () => setUseNativeScroll(mediaQuery.matches);

    mediaQuery.addEventListener('change', updateScrollMode);
    return () => mediaQuery.removeEventListener('change', updateScrollMode);
  }, []);

  if (useNativeScroll) return <Portfolio isMobile={true} />;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.14,
        duration: 0.75,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 0,
        infinite: false,
      }}
    >
      <Portfolio isMobile={false} />
    </ReactLenis>
  );
}

export default App;
