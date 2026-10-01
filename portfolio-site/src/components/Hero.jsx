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
        className="px-3.5 py-2.5 rounded-xl border border-white/[0.1] text-xs transition-all duration-300"
        style={{
          background:  'rgba(13,27,53,0.92)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          minWidth: '115px',
        }}
      >
        <Icon size={14} className="text-accent mb-1.5" />
        <div className="text-[15px] sm:text-[16px] font-bold text-white tracking-tight leading-tight mb-1.5">
          {title}
        </div>
        <div className="flex flex-col gap-0.5">
          {items.map((tech, i) => (
            <div key={i} className="text-[--muted] font-normal leading-snug text-[11.5px] sm:text-[12px]">
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

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-4rem)] lg:min-h-screen flex flex-col justify-start lg:justify-center pt-16 overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── Subtle dot grid background ── */}
      <div
        className="absolute inset-0 opacity-[0.022]"
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-4 items-center pt-4 sm:pt-6 lg:pt-0 pb-8 sm:pb-12 lg:pb-0">
        {/* ════ LEFT: text content ════ */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 sm:gap-6 max-w-xl"
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

          {/* CTAs (desktop only to maintain clean mobile hero structure) */}
          <motion.div variants={heroItem} className="hidden lg:flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 hover:shadow-glow active:scale-[0.97] transition-all duration-200 text-sm"
            >
              <span>View Projects</span>
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>

            {PORTFOLIO.social?.github && (
              <a
                href={PORTFOLIO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/[0.14] text-[--text] font-semibold rounded-xl hover:border-accent hover:text-accent hover:bg-white/[0.04] active:scale-[0.97] transition-all duration-200 text-sm"
                aria-label="GitHub profile"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
            )}

            {PORTFOLIO.resume && (
              <a
                href={PORTFOLIO.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/[0.14] text-[--text] font-semibold rounded-xl hover:border-accent hover:text-accent hover:bg-white/[0.04] active:scale-[0.97] transition-all duration-200 text-sm"
                aria-label="View Resume"
              >
                <FileText size={16} />
                <span>Resume</span>
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* ════ RIGHT: hero visual + floating chips ════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: ANIM.ease }}
          className="relative flex items-center justify-center py-2 sm:py-4 lg:py-0 lg:h-[500px] w-full max-w-full overflow-hidden"
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
            className="absolute w-52 h-52 xs:w-60 xs:h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border border-white/[0.04] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 40px rgba(67,97,238,0.08)' }}
          />

          {/* Central circular profile frame */}
          <div
            className="relative z-10 w-36 h-36 xs:w-44 xs:h-44 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full border-2 border-accent/40 flex items-center justify-center overflow-hidden p-1.5"
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

          {/* Floating chips (cleanly displayed on desktop, hidden on mobile to avoid overlap) */}
          <div className="hidden lg:contents">
            {PORTFOLIO.chips.map((chip, i) => (
              <Chip key={i} chip={chip} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Scroll hint (desktop only) ── */}
      <div
        ref={scrollHintRef}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 transition-opacity duration-500 pointer-events-none select-none"
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
