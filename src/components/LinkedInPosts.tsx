import { motion } from 'framer-motion';
import { ExternalLink, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Post {
  id: string;
  text?: string;
  createdTime?: number;
  visibility?: string;
}

export function LinkedInPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('linkedin_access_token');
    if (token) {
      setAccessToken(token);
      setAuthenticated(true);
      fetchPosts(token);
    }
  }, []);

  const fetchPosts = async (token: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/linkedin-posts?access_token=${token}`);
      const data = await response.json();
      if (data.posts) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async () => {
    window.location.href = '/api/linkedin-auth';
  };

  const handleAuthCallback = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      try {
        const response = await fetch(`/api/linkedin-callback?code=${code}`);
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem('linkedin_access_token', data.access_token);
          setAccessToken(data.access_token);
          setAuthenticated(true);
          fetchPosts(data.access_token);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error('Auth failed:', error);
      }
    }
  };

  useEffect(() => {
    handleAuthCallback();
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
          <p className="text-gray-400 text-lg">
            Real-time updates from my LinkedIn profile
          </p>
        </motion.div>

        {/* Auth State */}
        {!authenticated ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface-container-low/40 ghost-border rounded-3xl p-12 text-center"
          >
            <p className="text-gray-300 mb-6">
              Connect your LinkedIn account to display your latest posts
            </p>
            <button
              onClick={handleAuth}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
            >
              Connect LinkedIn
            </button>
          </motion.div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="grid gap-6 md:gap-8">
              {loading && (
                <div className="flex justify-center items-center py-12">
                  <Loader className="animate-spin text-orange-500" size={32} />
                </div>
              )}

              {!loading && posts.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No posts found
                </div>
              )}

              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-surface-container-low/40 ghost-border rounded-2xl p-8 hover:bg-surface-container-low/60 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <p className="text-gray-300 leading-relaxed">
                        {post.text || 'Posted on LinkedIn'}
                      </p>
                    </div>
                    <a
                      href={`https://linkedin.com/feed/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 text-orange-500 hover:text-orange-400 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  {post.createdTime && (
                    <time className="text-sm text-gray-500">
                      {new Date(post.createdTime).toLocaleDateString()}
                    </time>
                  )}
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
