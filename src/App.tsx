import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Education } from './components/Education';

function App() {
    return (
        <div className="min-h-screen font-sans selection:bg-orange-500/30 selection:text-orange-200 transition-colors duration-300">

            {/* Dark gradient background with animated orange orbs */}
            <div className="gradient-bg">
                <div className="orb-1" />
                <div className="orb-2" />
                <div className="orb-3" />
            </div>

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
