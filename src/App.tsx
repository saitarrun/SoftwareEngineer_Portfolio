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
import { LinkedInPosts } from './components/LinkedInPosts';
import { CustomCursor } from './components/CustomCursor';

const BackgroundCanvas = lazy(() =>
    import('./three/BackgroundCanvas').then(m => ({ default: m.BackgroundCanvas }))
);

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
        {children}
    </motion.div>
);

function App() {
    return (
        <ReactLenis root options={{
            lerp: 0.12,
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.2,
            infinite: false,
        }}>
            <div className="min-h-screen font-sans selection:bg-orange-500/30 selection:text-orange-200 transition-colors duration-300">

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
                    <SectionWrapper><LinkedInPosts /></SectionWrapper>
                    <SectionWrapper><Contact /></SectionWrapper>
                </main>
            </div>
        </ReactLenis>
    )
}

export default App
