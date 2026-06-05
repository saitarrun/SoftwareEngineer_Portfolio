import { motion } from 'framer-motion';
import { useEffect } from 'react';

declare global {
  interface Window {
    IN?: { parse: () => void };
  }
}

interface LinkedInPost {
  embedUrl: string;
}

const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    embedUrl:
      'https://www.linkedin.com/embed/feed/update/urn:li:share:7459827604435439616?collapsed=1',
  },
  {
    embedUrl:
      'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7443167826288422912?collapsed=1',
  },
];

export function LinkedInPosts() {
  useEffect(() => {
    if (window.IN?.parse) {
      window.IN.parse();
    }
  }, []);

  return (
    <section className="px-4 md:px-8 lg:px-12 py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Latest <span className="text-orange-500">LinkedIn Posts</span>
          </h2>
          <p className="text-gray-400 text-lg">Featured posts from my LinkedIn profile</p>
        </motion.div>

        {/* LinkedIn Embeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
          {LINKEDIN_POSTS.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex justify-center"
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: '504px',
                  height: '800px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 140, 0, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <iframe
                  src={post.embedUrl}
                  height="800"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen
                  title={`LinkedIn Post ${index + 1}`}
                  style={{
                    borderRadius: '16px',
                    display: 'block',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-gray-500 text-sm mt-12"
        >
          View more on{' '}
          <a
            href="https://linkedin.com/in/saitarrunpitta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-400 transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-1 outline-none"
          >
            LinkedIn Profile
          </a>
        </motion.p>
      </div>

      {/* LinkedIn SDK */}
      <script async src="https://platform.linkedin.com/in.js" charSet="utf-8" />
    </section>
  );
}
