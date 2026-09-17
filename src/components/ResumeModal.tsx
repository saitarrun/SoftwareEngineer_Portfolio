import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Maximize2, Minimize2, FileText, Check } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  pdfUrl = '/TarrunPitta_SoftwareEngineer_Resume.pdf',
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'html'>('pdf');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyLink = async () => {
    if (typeof window === 'undefined') return;
    const fullUrl = `${window.location.origin}${pdfUrl}`;
    try {
      await window.navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard permission denied
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          {/* Backdrop with frosted glass effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className={`relative flex flex-col w-full bg-black border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-300 z-10 ${
              isFullscreen ? 'h-[96vh] max-w-[98vw]' : 'h-[88vh] max-w-5xl'
            }`}
          >
            {/* Modal Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#000000]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    id="resume-modal-title"
                    className="text-sm sm:text-base font-bold text-white tracking-tight leading-none"
                  >
                    Tarrun Pitta — Resume
                  </h3>
                  <p className="text-[11px] text-white/50 font-medium mt-1">
                    Software Engineer • Master of Science in Computer Science
                  </p>
                </div>
              </div>

              {/* View Mode Switcher & Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/10 text-xs font-semibold mr-1 sm:mr-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('pdf')}
                    className={`px-3 py-1 rounded-full transition-all ${
                      viewMode === 'pdf'
                        ? 'bg-primary text-black font-bold shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('html')}
                    className={`px-3 py-1 rounded-full transition-all ${
                      viewMode === 'html'
                        ? 'bg-primary text-black font-bold shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    HTML
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy resume URL"
                  title="Copy direct link"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <span>Share</span>
                  )}
                </button>

                <a
                  href={pdfUrl}
                  download="TarrunPitta_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold text-black bg-primary hover:bg-primary/90 transition-transform active:scale-95 shadow-sm"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Download</span>
                </a>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Open PDF in new tab"
                  title="Open in new window"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden md:flex p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors ml-1"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="relative flex-1 w-full bg-[#000000] overflow-y-auto overflow-x-hidden touch-pan-y">
              {viewMode === 'pdf' ? (
                <iframe
                  src={pdfUrl}
                  title="Tarrun Pitta Resume PDF Viewer"
                  className="w-full h-full border-none bg-[#0a0a0c]"
                />
              ) : (
                <iframe
                  src="/SaiTarrunPitta_Resume.html"
                  title="Tarrun Pitta HTML Resume Viewer"
                  className="w-full h-full border-none bg-white"
                />
              )}
            </div>

            {/* Modal Footer Info Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#000000] border-t border-white/10 text-[11px] text-white/50 font-medium">
              <span>
                {viewMode === 'pdf' ? 'PDF format • ATS-friendly' : 'Interactive HTML Format'}
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors underline"
                >
                  Direct PDF Link
                </a>
                <span className="hidden sm:inline">Press ESC to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
