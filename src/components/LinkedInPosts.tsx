import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import './LinkedInPosts.css';

declare global {
  interface Window {
    IN: {
      parse: () => void;
      init: () => void;
    };
  }
}

interface Post {
  id: string;
  text?: string;
  createdTime?: number;
  visibility?: string;
  url?: string;
}

export function LinkedInPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
    // Load LinkedIn embed script
    loadLinkedInScript();
  }, []);

  useEffect(() => {
    // Re-process LinkedIn embeds after posts load
    if (!loading && posts.length > 0 && window.IN) {
      window.IN.parse();
    }
  }, [loading, posts]);

  useEffect(() => {
    // Force uniform height after LinkedIn embeds render
    const targetHeight = 420;
    const enforceHeight = () => {
      const containers = document.querySelectorAll('.linkedin-embed-container');
      containers.forEach(container => {
        const el = container as HTMLElement;
        el.style.cssText = `height: ${targetHeight}px !important; max-height: ${targetHeight}px !important; overflow: hidden !important;`;
        const iframe = el.querySelector('iframe') as HTMLElement;
        if (iframe) {
          iframe.style.cssText = `height: ${targetHeight}px !important; max-height: ${targetHeight}px !important; min-height: ${targetHeight}px !important; width: 100% !important; border: none !important; margin: 0 !important; padding: 0 !important;`;
        }
      });
    };

    // Enforce immediately
    enforceHeight();

    // Set up MutationObserver to watch for height changes
    const observer = new MutationObserver(() => {
      enforceHeight();
    });

    const containers = document.querySelectorAll('.linkedin-embed-container');
    containers.forEach(container => {
      observer.observe(container as HTMLElement, {
        attributes: true,
        attributeFilter: ['style', 'height', 'width'],
        subtree: true
      });
    });

    // Periodic enforcement as fallback
    const interval = setInterval(enforceHeight, 300);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [loading, posts]);

  const loadLinkedInScript = () => {
    if (document.getElementById('linkedin-jssdk')) return;

    const script = document.createElement('script');
    script.id = 'linkedin-jssdk';
    script.src = 'https://platform.linkedin.com/in.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.IN) {
        window.IN.init();
      }
    };
    document.body.appendChild(script);
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/linkedin-posts');
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-gray-400 text-lg">
            Real-time updates from my LinkedIn profile
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin text-orange-500" size={32} />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface-container-low/40 ghost-border rounded-3xl p-12 text-center"
          >
            <p className="text-red-400 mb-4">
              {error}
            </p>
            <button
              onClick={fetchPosts}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* No Posts */}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No posts found
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-max">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="w-full"
                >
                  <div className="linkedin-embed-container rounded-2xl">
                    <iframe
                      src={`https://www.linkedin.com/embed/feed/update/urn:li:share:${post.id}`}
                      height="420"
                      width="100%"
                      frameBorder="0"
                      allowFullScreen={true}
                      title={`LinkedIn Post ${post.id}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sync Status */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center text-gray-500 text-sm mt-12"
            >
              Posts update automatically when you publish on LinkedIn
            </motion.p>
          </>
        )}
      </div>
    </section>
  );
}
