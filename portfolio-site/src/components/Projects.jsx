import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, LayoutGroup, useInView } from 'framer-motion';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Maximize2, ArrowRight } from 'lucide-react';
import { PORTFOLIO } from '../content';

// ─── Project Card Component ─────────────────────────────────
function ProjectCard({ project, idx, inView, onOpen, isReducedMotion }) {
  const cardRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const title = project.name || project.title;
  const shortDescription = project.shortDescription || project.desc || '';
  const tags = project.tags || project.tech || [];
  const thumbnail = project.thumbnail || '/images/healthcare-rag.png';

  // Stagger delays: Card 1: 0ms, Card 2: 100ms, Card 3: 200ms, Card 4: 300ms
  const revealDelay = isReducedMotion ? 0 : idx * 0.1;

  return (
    <motion.article
      ref={cardRef}
      tabIndex={0}
      role="button"
      onClick={() => onOpen(idx, cardRef.current)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(idx, cardRef.current);
        }
      }}
      initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 26 }}
      animate={inView ? (isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : {}}
      transition={{
        duration: isReducedMotion ? 0.01 : 0.6,
        delay: revealDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col w-full h-full text-left rounded-2xl border border-white/[0.08] overflow-hidden cursor-pointer outline-none transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_14px_32px_-10px_rgba(0,0,0,0.7),0_0_24px_rgba(67,97,238,0.22)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      style={{
        background: 'linear-gradient(160deg, rgba(13,27,53,0.92) 0%, rgba(8,15,34,0.95) 100%)',
        backdropFilter: 'blur(12px)',
      }}
      aria-haspopup="dialog"
      aria-label={`View details for ${title}`}
    >
      {/* Thumbnail with lazy load and subtle hover zoom */}
      <div className="relative w-full h-[210px] sm:h-[230px] overflow-hidden bg-[#070b14] border-b border-white/[0.06]">
        <img
          src={thumbnail}
          alt={`${title} preview graphic`}
          loading="lazy"
          width={600}
          height={375}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-top origin-top transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3.5">
        <h3 className="font-bold text-[--text] text-lg sm:text-xl leading-snug group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>

        <p className="text-[--muted] text-sm leading-relaxed line-clamp-2">
          {shortDescription}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2" aria-label="Technologies used">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-1 rounded-full border border-accent/20 text-accent bg-accent/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Details CTA */}
        <div className="flex items-center gap-1.5 text-accent text-xs font-semibold pt-2 border-t border-white/[0.05]">
          <span>View Details</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
          >
            →
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Details Popup Modal Component (Rendered via React Portal) ───
function ProjectModal({
  projects,
  currentIndex,
  onNavigate,
  onClose,
  isReducedMotion,
}) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const project = projects[currentIndex] || projects[0];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + projects.length) % projects.length);
  }, [currentIndex, onNavigate, projects.length]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % projects.length);
  }, [currentIndex, onNavigate, projects.length]);

  // Lock body scroll without layout shift and add modal-open class
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.classList.add('modal-open');

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Focus close button initially
  useEffect(() => {
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard controls: Escape, ArrowLeft, ArrowRight, Focus Trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape closes lightbox first, then modal
      if (e.key === 'Escape') {
        e.preventDefault();
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
        return;
      }

      // Arrow navigation
      if (!lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
          return;
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
          return;
        }
      }

      // Focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handlePrev, handleNext, onClose]);

  // Touch swipe support for mobile
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    // Horizontal swipe threshold 45px, mostly horizontal
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!project) return null;

  const title = project.name || project.title;
  const tags = project.tags || project.tech || [];
  const techList = project.tech || project.technology || [];
  const githubLink = project.githubUrl || project.github;
  const liveLink = project.liveUrl || project.demo;
  const thumbnail = project.thumbnail || '/images/healthcare-rag.png';
  const counterStr = `${String(currentIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;

  const modalNode = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[9999] flex items-end lg:items-center justify-center p-0 lg:p-6"
    >
      {/* ── Fixed Overlay covering Navbar and entire screen ── */}
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: isReducedMotion ? 0.01 : 0.25 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Modal Card / Sheet ── */}
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        initial={
          isReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 20, scale: 0.98 }
        }
        animate={
          isReducedMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        exit={
          isReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 16, scale: 0.98 }
        }
        transition={{
          duration: isReducedMotion ? 0.01 : 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative z-10 w-full lg:max-w-[980px] max-h-[92dvh] lg:max-h-[min(88dvh,780px)] rounded-t-[22px] lg:rounded-[18px] border-t lg:border border-white/[0.12] bg-[var(--card)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(67,97,238,0.2)] overflow-hidden flex flex-col outline-none"
      >
        {/* Mobile top pull indicator */}
        <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mt-2.5 mb-1 lg:hidden flex-shrink-0" />

        {/* ── Desktop & Mobile Header Bar (Always Visible) ── */}
        <div className="flex items-center justify-between px-5 lg:px-6 py-2.5 lg:py-3 border-b border-white/[0.08] flex-shrink-0 bg-[var(--card)]">
          {/* Navigation & Counter */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.12] text-[--muted] hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Previous project"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-xs font-mono font-medium text-[--muted] px-1 select-none">
              {counterStr}
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.12] text-[--muted] hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Next project"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Close button with 44px tap target */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-[--muted] hover:text-white hover:bg-white/[0.08] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Modal Content: 2 Columns on Desktop, Single Column on Mobile/Tablet ── */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-y-auto lg:overflow-hidden overscroll-contain">
          
          {/* LEFT: Project Screenshot */}
          <div className="lg:w-[50%] flex-shrink-0 bg-[#060e1d] flex flex-col items-center justify-center p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
            <div
              tabIndex={0}
              role="button"
              onClick={() => setLightboxOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxOpen(true);
                }
              }}
              title="Click to view full size"
              aria-label="Click to enlarge project screenshot"
              className="group relative w-full aspect-[16/10] max-h-[30dvh] lg:max-h-[58dvh] rounded-xl overflow-hidden bg-black/40 border border-white/[0.08] flex items-center justify-center cursor-zoom-in shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <img
                src={thumbnail}
                alt={`${title} interface preview`}
                loading="lazy"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* Hover badge */}
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                <span className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-sm border border-white/20 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
                  <Maximize2 size={13} />
                  <span>View full size</span>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Details Column (Scrollable if overflowing on short screens) */}
          <div className="lg:w-[50%] flex flex-col flex-1 min-h-0 bg-[var(--card)]">
            
            {/* Title & Tags Header */}
            <div className="px-5 lg:px-6 pt-4 lg:pt-5 pb-3 flex-shrink-0 border-b border-white/[0.04]">
              <h2
                id="modal-project-title"
                className="text-xl sm:text-2xl font-bold text-[--text] leading-snug mb-2.5"
              >
                {title}
              </h2>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5" aria-label="Tags">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-accent/25 text-accent"
                      style={{ background: 'rgba(67,97,238,0.08)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Scrollable details: Problem, Approach, Technology, Result */}
            <div className="flex-1 overflow-y-auto px-5 lg:px-6 py-4 pr-4 lg:pr-5 scrollbar-thin space-y-4 text-sm leading-relaxed">
              {/* Problem */}
              {project.problem && (
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-accent mb-1">
                    Problem
                  </p>
                  <p className="text-[--muted] text-xs sm:text-sm">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Approach */}
              {project.approach && (
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-accent mb-1">
                    Approach
                  </p>
                  <p className="text-[--muted] text-xs sm:text-sm">
                    {project.approach}
                  </p>
                </div>
              )}

              {/* Technology */}
              {techList.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-accent mb-1">
                    Technology
                  </p>
                  <p className="text-[--muted] text-xs sm:text-sm font-medium">
                    {techList.join(' · ')}
                  </p>
                </div>
              )}

              {/* Result: only rendered if non-empty, never invented */}
              {project.result && project.result.trim() && (
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-accent mb-1">
                    Result
                  </p>
                  <p className="text-[--text] text-xs sm:text-sm font-semibold">
                    {project.result}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Buttons: Always visible at bottom */}
            {(githubLink || liveLink) && (
              <div className="px-5 lg:px-6 py-3.5 lg:py-4 border-t border-white/[0.08] flex flex-wrap items-center gap-3 bg-[var(--card)] flex-shrink-0">
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.12] text-[--text] rounded-xl hover:border-accent hover:text-accent transition-all text-xs sm:text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Github size={15} />
                    <span>View on GitHub</span>
                  </a>
                )}
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent-hover hover:shadow-glow transition-all text-xs sm:text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Fullscreen Lightbox Preview for Screenshot ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReducedMotion ? 0.01 : 0.2 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Lightbox Close Button (44px tap target) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/[0.1] hover:bg-white/[0.2] text-white flex items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close enlarged preview"
            >
              <X size={22} />
            </button>

            <img
              src={thumbnail}
              alt={`${title} enlarged preview`}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[85dvh] object-contain rounded-xl border border-white/10 shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalNode, document.body) : null;
}

// ─── Main Projects Section ──────────────────────────────────
export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const lastTriggerRef = useRef(null);

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Detect prefers-reduced-motion
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const projects = PORTFOLIO.projects;

  const handleOpenModal = (idx, triggerEl) => {
    lastTriggerRef.current = triggerEl;
    setSelectedIndex(idx);
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
    // Return focus to the trigger card button
    setTimeout(() => {
      lastTriggerRef.current?.focus();
      lastTriggerRef.current = null;
    }, 50);
  };

  return (
    <section id="projects" className="py-24 sm:py-32" style={{ background: 'var(--surface)' }}>
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12"
        >
          <div>
            <span className="section-label">PROJECTS</span>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold tracking-tight text-[--text]">
              Featured Projects
            </h2>
            <p className="text-[--muted] text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Selected AI/ML, GenAI and full-stack projects I've built.
            </p>
          </div>

          {PORTFOLIO.social?.github && (
            <a
              href={PORTFOLIO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] hover:border-accent/40 text-accent text-sm font-semibold transition-all duration-200 self-start sm:self-auto flex-shrink-0"
              aria-label="View all projects on GitHub"
            >
              <span>View All Projects</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          )}
        </motion.div>

        {/* 2×2 Projects Grid (1 column on mobile, 2 columns on tablet & desktop) */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 items-stretch"
          aria-label={`${projects.length} projects displayed in a 2 by 2 grid`}
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id || p.title}
              project={p}
              idx={i}
              inView={inView}
              onOpen={handleOpenModal}
              isReducedMotion={isReducedMotion}
            />
          ))}
        </div>
      </div>

      {/* Details Popup Modal via React Portal into document.body */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <ProjectModal
            projects={projects}
            currentIndex={selectedIndex}
            onNavigate={setSelectedIndex}
            onClose={handleCloseModal}
            isReducedMotion={isReducedMotion}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
