import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Education } from './components/Education';

function App() {
    return (
        <div className="min-h-screen font-sans selection:bg-purple-200 selection:text-purple-900 transition-colors duration-300">

            {/* Gradient Background Layer */}
            <div className="gradient-bg"></div>

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
