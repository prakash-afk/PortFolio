import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, X, Award, ZoomIn } from 'lucide-react';
import { gsap } from 'gsap';
import { PORTFOLIO } from '../content';
import { ANIM } from '../utils/animations';

// ─── Certificate Card Component ─────────────────────────────
function CertificateCard({ cert, onSelect, isDuplicate = false }) {
  return (
    <div
      role="button"
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate ? 'true' : undefined}
      onClick={() => onSelect(cert)}
      onKeyDown={(e) => {
        if (!isDuplicate && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect(cert);
        }
      }}
      className="group relative w-[290px] sm:w-[330px] md:w-[360px] flex-shrink-0 mx-2.5 sm:mx-3 rounded-2xl border border-white/[0.08] overflow-hidden cursor-pointer outline-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.7),0_0_28px_rgba(67,97,238,0.28)] focus-visible:ring-2 focus-visible:ring-accent flex flex-col"
      style={{
        background: 'linear-gradient(160deg, rgba(13,27,53,0.92) 0%, rgba(8,15,34,0.95) 100%)',
        backdropFilter: 'blur(12px)',
      }}
      aria-label={isDuplicate ? undefined : `View ${cert.title} certificate`}
    >
      {/* Thumbnail area with fixed aspect ratio */}
      <div className="relative w-full aspect-[16/10.5] overflow-hidden bg-[#050b18]/90 border-b border-white/[0.06] p-2 flex items-center justify-center">
        <img
          src={cert.image}
          alt={`${cert.title} preview`}
          loading="lazy"
          className="w-full h-full object-contain rounded-lg transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />

        {/* Badge */}
        {cert.badge && (
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/75 backdrop-blur-md border border-white/10 text-accent shadow-sm">
            {cert.badge}
          </span>
        )}

        {/* Hover zoom indicator overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
            <ZoomIn size={13} className="text-accent" />
            <span>View Certificate</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3.5">
        <div>
          {/* Issuer and Year */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-accent font-semibold tracking-wide uppercase text-[11px] truncate pr-2">
              {cert.issuer}
            </span>
            <span className="text-[--muted] font-medium flex-shrink-0">
              {cert.year}
            </span>
          </div>

          {/* Certificate Title */}
          <h3 className="font-bold text-[--text] text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
            {cert.title}
          </h3>
        </div>

        {/* View Action Link */}
        <div className="flex items-center gap-1.5 text-accent text-xs font-semibold pt-1 border-t border-white/[0.05]">
          <span>View Certificate</span>
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Fullscreen Modal / Lightbox Component ──────────────────
function CertificateModal({ cert, onClose, isReducedMotion }) {
  const modalRef = useRef(null);

  useEffect(() => {
    // Lock scroll and mark body
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    // Focus close button initially
    const closeBtn = modalRef.current?.querySelector('button[aria-label="Close certificate preview"]');
    closeBtn?.focus();

    // Handle Escape and focus trapping
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
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

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const modalNode = (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} full view`}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-3 sm:p-6"
    >
      {/* Dark Blurred Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: isReducedMotion ? 0.01 : 0.22 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Modal Content Dialog */}
      <motion.div
        initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 14 }}
        animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 14 }}
        transition={{ duration: isReducedMotion ? 0.01 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-[94vw] max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close certificate preview"
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-200 z-20 shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X size={20} />
        </button>

        {/* Certificate Full Image Container */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#050b18] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-auto h-auto max-w-[92vw] max-h-[74vh] sm:max-h-[78vh] object-contain block"
          />
        </div>

        {/* Certificate Caption */}
        <div className="mt-3.5 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-center max-w-xl">
          <h4 className="text-white text-sm sm:text-base font-semibold leading-snug">
            {cert.title}
          </h4>
          <p className="text-[--muted] text-xs mt-0.5">
            {cert.issuer} • {cert.year}
          </p>
        </div>
      </motion.div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalNode, document.body) : null;
}

// ─── Main Certifications Section ────────────────────────────
export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lastTriggerRef = useRef(null);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const certificates = PORTFOLIO.certificates || [];

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // GSAP seamless loop carousel (45 seconds per complete cycle)
  useEffect(() => {
    if (isReducedMotion || !trackRef.current || certificates.length === 0) return;

    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 45,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [isReducedMotion, certificates.length]);

  const handlePause = () => {
    tweenRef.current?.pause();
  };

  const handleResume = () => {
    tweenRef.current?.play();
  };

  const handleOpenModal = (cert) => {
    lastTriggerRef.current = document.activeElement;
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
    setTimeout(() => {
      lastTriggerRef.current?.focus?.();
      lastTriggerRef.current = null;
    }, 50);
  };

  // Duplicated list for seamless infinite loop
  const carouselItems = [...certificates, ...certificates];

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-24 sm:py-32 overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-label="Certifications & Achievements"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="section-label">ACHIEVEMENTS</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[--text] mb-3">
            Certifications &amp; Achievements
          </h2>
          <p className="text-[--muted] text-sm sm:text-base leading-relaxed">
            Certifications, programs and technical activities that strengthened my skills.
          </p>
        </motion.div>
      </div>

      {/* Screen reader only list for accessibility */}
      <ul className="sr-only">
        {certificates.map((cert) => (
          <li key={cert.id}>
            {cert.title} - {cert.issuer} ({cert.year})
          </li>
        ))}
      </ul>

      {/* Carousel Container */}
      {isReducedMotion ? (
        // Reduced motion: static wrapped grid
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                onSelect={handleOpenModal}
              />
            ))}
          </div>
        </div>
      ) : (
        // Continuous smooth infinite horizontal carousel
        <div
          className="relative w-full overflow-hidden marquee-fade py-4"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onFocusCapture={handlePause}
          onBlurCapture={handleResume}
        >
          <div
            ref={trackRef}
            className="flex items-stretch"
            style={{ width: 'max-content' }}
          >
            {carouselItems.map((cert, index) => {
              const isDuplicate = index >= certificates.length;
              return (
                <CertificateCard
                  key={`${cert.id}-${index}`}
                  cert={cert}
                  isDuplicate={isDuplicate}
                  onSelect={handleOpenModal}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Fullscreen Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            cert={selectedCert}
            onClose={handleCloseModal}
            isReducedMotion={isReducedMotion}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
