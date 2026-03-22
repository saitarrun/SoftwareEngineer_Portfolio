import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Education } from './components/Education';

const BackgroundCanvas = lazy(() =>
    import('./three/BackgroundCanvas').then(m => ({ default: m.BackgroundCanvas }))
);

function App() {
    return (
        <div className="min-h-screen font-sans selection:bg-orange-500/30 selection:text-orange-200 transition-colors duration-300">

            {/* Background */}
            <div className="gradient-bg" />

            {/* 3D particle background */}
            <Suspense fallback={null}>
                <BackgroundCanvas />
            </Suspense>

            <Navbar />

            <main className="relative z-10">
                <Hero />
                <Experience />
                <Projects />
                <Skills />
                <Education />
                <Contact />
            </main>
        </div>
    )
}

export default App
