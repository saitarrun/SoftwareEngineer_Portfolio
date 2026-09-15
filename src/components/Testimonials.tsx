import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Senior Systems Architect',
    role: 'Enterprise Software Division',
    company: 'Pacific Life',
    text: 'Tarrun played a pivotal role in optimizing our cloud microservices and event-driven data pipelines. His deep understanding of Java, Spring Boot, and asynchronous event streams reduced API processing latencies significantly while maintaining 99.9% uptime.',
    avatar: 'PL',
  },
  {
    id: '2',
    name: 'Technical Lead & Consultant',
    role: 'Digital Transformation Group',
    company: 'Accenture',
    text: 'Tarrun is a highly reliable software engineer who consistently delivers robust full-stack features ahead of deadlines. His ability to architect scalable REST microservices and lead cross-functional teams made a huge impact on our client deliverables.',
    avatar: 'AC',
  },
  {
    id: '3',
    name: 'Computer Science Department Faculty',
    role: 'College of Engineering & CS',
    company: 'CSU Fullerton',
    text: 'During his Master’s program, Tarrun demonstrated exceptional technical acumen in distributed systems and AI pipeline research. His research publications and graduate projects reflected high-level system design engineering.',
    avatar: 'CSUF',
  },
];

export const Testimonials = () => {
  return (
    <Section id="testimonials" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-orange-500/30 bg-orange-500/10 text-orange-400 mb-4">
            <span>Social Proof & Leadership</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Endorsements & Team Feedback
          </h2>
          <p
            className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Insights and recommendations from engineering leads, managers, and academic faculty
            across my career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <GlassCard className="p-6 sm:p-8 h-full flex flex-col justify-between relative group hover:border-orange-500/50 transition-all duration-300">
                <div>
                  <Quote className="w-8 h-8 text-orange-500/40 mb-4 group-hover:text-orange-500 transition-colors" />
                  <p
                    className="text-sm leading-relaxed text-zinc-300 italic mb-6"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/30 border border-orange-500/40 flex items-center justify-center font-bold text-xs text-orange-400">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-zinc-400">
                      {t.role} • <span className="text-orange-400 font-medium">{t.company}</span>
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
