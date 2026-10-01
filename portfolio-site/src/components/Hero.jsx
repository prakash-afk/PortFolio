import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, FileText, ChevronDown, Brain, Cpu, Cloud, BarChart2, Layers } from 'lucide-react';
import { PORTFOLIO } from '../content';
import { ANIM } from '../utils/animations';

// Map chip iconType → Lucide component
const ICON_MAP = { brain: Brain, cpu: Cpu, cloud: Cloud, bar: BarChart2, layers: Layers };

// Stagger container for hero entrance
const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: ANIM.heroPer, delayChildren: 0.15 },
  },
};

const heroItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIM.duration.slow, ease: ANIM.ease },
  },
};

function Chip({ chip }) {
  const Icon = ICON_MAP[chip.iconType] || Brain;
  const title = chip.title || (chip.lines ? chip.lines[0] : '');
  const items = chip.items || (chip.lines ? chip.lines.slice(1) : []);

  return (
    <div
      className={`absolute ${chip.pos} ${chip.floatClass} z-20`}
      aria-hidden="true"
    >
      <div
        className="px-2.5 py-1.5 xs:px-3 xs:py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-white/[0.1] text-xs transition-all duration-300"
        style={{
          background:  'rgba(13,27,53,0.92)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          minWidth: '85px',
        }}
      >
        <Icon size={12} className="text-accent mb-1 sm:mb-1.5 sm:w-[14px] sm:h-[14px]" />
        <div className="text-[12px] xs:text-[13px] sm:text-[15px] lg:text-[16px] font-bold text-white tracking-tight leading-tight mb-0.5 sm:mb-1.5">
          {title}
        </div>
        <div className="flex flex-col gap-0.5">
          {items.map((tech, i) => (
            <div key={i} className="text-[--muted] font-normal leading-snug text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] lg:text-[12px]">
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const scrollHintRef = useRef(null);

  // Fade scroll hint on scroll
  useEffect(() => {
    const onScroll = () => {
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = window.scrollY > 60 ? '0' : '1';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleViewProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -64, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── Subtle dot grid background ── */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* ── Ambient bottom gradient ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, var(--surface), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-4 items-center py-8 sm:py-12 lg:py-0">
        {/* ════ LEFT: text content ════ */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col gap-4 sm:gap-6 max-w-xl"
        >
          {/* Badge */}
          <motion.div variants={heroItem}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.1] text-[--text] text-xs font-semibold bg-white/[0.03] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
              {PORTFOLIO.badge}
            </span>
          </motion.div>

          {/* Main heading (Name) & Professional title */}
          <motion.div variants={heroItem} className="flex flex-col">
            <h1 className="text-[clamp(1.85rem,5.5vw,3.3rem)] font-bold leading-[1.12] tracking-tight break-words">
              Hi, I'm{' '}
              <span
                className="text-accent"
                style={{ textShadow: '0 0 40px rgba(67,97,238,0.55)' }}
              >
                Prakash Kumar
              </span>
            </h1>
            <p className="text-[clamp(1.2rem,3.4vw,2.15rem)] font-bold leading-[1.25] tracking-tight text-white/95 mt-1.5 sm:mt-2 break-words">
              {PORTFOLIO.headline}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={heroItem}
            className="text-[--muted] text-sm sm:text-base lg:text-[1.05rem] leading-relaxed max-w-xl"
          >
            {PORTFOLIO.heroDesc}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={heroItem}
            className="relative z-20 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2.5 sm:gap-3 pt-1 w-full sm:w-auto"
          >
            <a
              href="#projects"
              onClick={handleViewProjects}
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 hover:shadow-glow active:scale-[0.97] transition-all duration-200 text-xs sm:text-sm min-h-[44px] cursor-pointer touch-manipulation select-none text-center"
            >
              <span>View Projects</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>

            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 xs:flex-initial">
              {PORTFOLIO.social?.github && (
                <a
                  href={PORTFOLIO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border border-white/[0.14] text-[--text] font-semibold rounded-xl hover:border-accent hover:text-accent hover:bg-white/[0.04] active:scale-[0.97] transition-all duration-200 text-xs sm:text-sm min-h-[44px] cursor-pointer touch-manipulation select-none flex-1 xs:flex-initial text-center"
                  aria-label="GitHub profile"
                >
                  <Github size={15} />
                  <span>GitHub</span>
                </a>
              )}

              {PORTFOLIO.resume && (
                <a
                  href={PORTFOLIO.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border border-white/[0.14] text-[--text] font-semibold rounded-xl hover:border-accent hover:text-accent hover:bg-white/[0.04] active:scale-[0.97] transition-all duration-200 text-xs sm:text-sm min-h-[44px] cursor-pointer touch-manipulation select-none flex-1 xs:flex-initial text-center"
                  aria-label="View Resume"
                >
                  <FileText size={15} />
                  <span>Resume</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* ════ RIGHT: hero visual + floating chips ════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: ANIM.ease }}
          className="relative flex items-center justify-center h-[320px] xs:h-[360px] sm:h-[440px] lg:h-[500px] w-full max-w-[420px] lg:max-w-full mx-auto overflow-hidden my-2 sm:my-0"
          aria-hidden="true"
        >
          {/* Ambient Glow behind the device */}
          <div
            className="absolute w-44 h-44 xs:w-52 xs:h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(67,97,238,0.45) 0%, transparent 68%)',
              animation: 'breathe 5s ease-in-out infinite',
            }}
          />

          {/* Outer ring decoration */}
          <div
            className="absolute w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border border-white/[0.04] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 40px rgba(67,97,238,0.08)' }}
          />

          {/* Central circular profile frame */}
          <div
            className="relative z-10 w-28 h-28 xs:w-36 xs:h-36 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full border-2 border-accent/40 flex items-center justify-center overflow-hidden p-1.5"
            style={{
              background:
                'linear-gradient(145deg, #0d1b35 0%, #0a1628 60%, #06101f 100%)',
              boxShadow:
                '0 0 70px rgba(67,97,238,0.35), inset 0 0 20px rgba(67,97,238,0.2)',
            }}
          >
            <img
              src="/profile.jpg"
              alt="Prakash Kumar"
              className="w-full h-full object-cover rounded-full select-none"
            />
          </div>

          {/* Floating chips (rendered responsively on both mobile and desktop) */}
          <div className="contents">
            {PORTFOLIO.chips.map((chip, i) => (
              <Chip key={i} chip={chip} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        ref={scrollHintRef}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 transition-opacity duration-500 pointer-events-none select-none"
        style={{ color: 'var(--subtle)' }}
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.22em] uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>
    </section>
  );
}
