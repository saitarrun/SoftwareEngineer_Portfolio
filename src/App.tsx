import { lazy, Suspense } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { CustomCursor } from './components/CustomCursor';

const BackgroundCanvas = lazy(() =>
    import('./three/BackgroundCanvas').then(m => ({ default: m.BackgroundCanvas }))
);

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform, opacity' }}
    >
        {children}
    </motion.div>
);

function App() {
    return (
        <ReactLenis root options={{ 
            lerp: 0.1, 
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1.0, 
            touchMultiplier: 1.5,
            infinite: false,
        }}>
            <div className="min-h-screen font-sans selection:bg-orange-500/30 selection:text-orange-200 transition-colors duration-300">

                {/* Background */}
                <div className="gradient-bg" />

                {/* 3D particle background */}
                <Suspense fallback={null}>
                    <BackgroundCanvas />
                </Suspense>

                <Navbar />
            <CustomCursor />

            <main className="relative z-10 grid-mesh min-h-screen">
                    <Hero />
                    <SectionWrapper><Experience /></SectionWrapper>
                    <SectionWrapper><Projects /></SectionWrapper>
                    <SectionWrapper><Skills /></SectionWrapper>
                    <SectionWrapper><Education /></SectionWrapper>
                    <SectionWrapper><Contact /></SectionWrapper>
                </main>
            </div>
        </ReactLenis>
    )
}

export default App
