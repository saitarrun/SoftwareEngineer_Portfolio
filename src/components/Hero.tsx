import { motion } from 'framer-motion';

export const Hero = () => {

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center relative pt-20 px-6">
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

                {/* Left: Typography */}
                <div className="order-2 md:order-1 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-7xl md:text-9xl font-serif font-black tracking-tight leading-none mb-6 text-slate-900"
                    >
                        Software <br />
                        <span className="italic font-normal text-slate-800">Engineer</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg text-slate-700 max-w-lg font-light leading-relaxed mb-10"
                    >
                        Software Engineer with 3+ years of experience building scalable backend services and web applications. Proficient in Python, Java, and JavaScript.
                    </motion.p>

                    <motion.a
                        href="#projects"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="group flex items-center gap-6 cursor-pointer"
                    >
                        <div className="w-20 h-20 rounded-full border border-slate-900/20 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-45 group-hover:rotate-90 transition-transform duration-300"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </div>
                        <span className="text-sm font-medium tracking-widest uppercase text-slate-900 group-hover:translate-x-2 transition-transform duration-300">View Projects</span>
                    </motion.a>
                </div>

                {/* Right: Visual Abstract  */}
                {/* Using CSS gradient blobs instead of image for abstract feel */}
                <div className="order-1 md:order-2 relative flex justify-center items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative w-64 h-80 md:w-72 md:h-96 group">
                            <div className="absolute inset-0 bg-slate-200 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
                            <img
                                src="/profile.jpg"
                                alt="Sai Tarrun Pitta"
                                className="w-full h-full object-cover object-top rounded-3xl shadow-xl relative z-10 transition-all duration-500 ease-in-out"
                            />
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};
