import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LucideIcon,
  Search,
  FileText,
  Briefcase,
  Code,
  GraduationCap,
  BookOpen,
  Mail,
  Terminal,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenChat: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Actions' | 'Navigation' | 'Experience' | 'Projects' | 'Skills';
  icon: LucideIcon;
  action: () => void;
}

export const CommandPalette = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenChat,
}: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Global Keybindings (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by caller or dispatch event
          window.dispatchEvent(new window.Event('toggle-command-palette'));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const scrollToSection = useCallback(
    (id: string) => {
      onClose();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    },
    [onClose]
  );

  const items: CommandItem[] = [
    {
      id: 'action-resume',
      title: 'View Interactive PDF Resume',
      subtitle: 'Open full-screen responsive resume viewer modal',
      category: 'Actions',
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'action-chat',
      title: 'Ask AI Assistant',
      subtitle: 'Instant answers about Tarrun’s experience & tech stack',
      category: 'Actions',
      icon: Sparkles,
      action: () => {
        onClose();
        onOpenChat();
      },
    },
    {
      id: 'nav-experience',
      title: 'Experience & Roles',
      subtitle: 'Pacific Life, CSU Fullerton, Accenture, AI & Software Engineering',
      category: 'Navigation',
      icon: Briefcase,
      action: () => scrollToSection('experience'),
    },
    {
      id: 'nav-projects',
      title: 'Featured Projects',
      subtitle: 'Enterprise HR, Gemini multimodal app, Microservices, RAG',
      category: 'Navigation',
      icon: Code,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'nav-skills',
      title: 'Technical Skills Matrix',
      subtitle: 'Python, TypeScript, React, Next.js, Docker, Kubernetes, AWS',
      category: 'Navigation',
      icon: Terminal,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'nav-education',
      title: 'Education & Honors',
      subtitle: 'MS in Computer Science from CSU Fullerton',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => scrollToSection('education'),
    },
    {
      id: 'nav-publications',
      title: 'Research & Publications',
      subtitle: 'Academic papers & technical articles',
      category: 'Navigation',
      icon: BookOpen,
      action: () => scrollToSection('publications'),
    },
    {
      id: 'nav-contact',
      title: 'Contact & Connect',
      subtitle: 'Email, LinkedIn, GitHub',
      category: 'Navigation',
      icon: Mail,
      action: () => scrollToSection('contact'),
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const listRef = useRef<HTMLDivElement>(null);

  // Key navigation inside search palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = (prev + 1) % (filteredItems.length || 1);
          const el = listRef.current?.children[next] as HTMLElement;
          if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          return next;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = (prev - 1 + filteredItems.length) % (filteredItems.length || 1);
          const el = listRef.current?.children[next] as HTMLElement;
          if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          return next;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-zinc-950/90 border border-white/15 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl z-10"
            style={{
              boxShadow:
                '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15)',
            }}
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 border-b border-white/10 bg-white/[0.02]">
              <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search section (e.g. AWS, Resume, Chat)..."
                className="w-full h-14 bg-transparent text-white placeholder-zinc-500 focus:outline-none text-base"
                autoFocus
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-zinc-400 bg-zinc-900 border border-white/10 rounded">
                ESC
              </kbd>
            </div>

            {/* List with Ref & Auto-scroll */}
            <div
              ref={listRef}
              className="max-h-[300px] overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-amber-500/40 scrollbar-track-black/20"
            >
              {filteredItems.length === 0 ? (
                <div className="py-10 text-center text-zinc-500 text-sm">
                  No matching results found for &quot;{query}&quot;
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-colors duration-75 cursor-pointer outline-none ${
                        isSelected
                          ? 'bg-amber-500/20 border border-amber-500/40 text-white shadow-sm'
                          : 'text-zinc-300 hover:bg-amber-500/15 hover:border-amber-500/30 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-white/5 text-zinc-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-sm text-white truncate">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-xs text-zinc-400 truncate">{item.subtitle}</div>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-black/60 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-white/10 text-zinc-300">
                    ↑↓
                  </kbd>{' '}
                  Navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-white/10 text-zinc-300">
                    ↵
                  </kbd>{' '}
                  Select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-white/10 text-zinc-300">
                  ⌘K
                </kbd>{' '}
                Spotlight Search
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
