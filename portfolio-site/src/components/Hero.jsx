import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Brain, Cpu, Cloud, BarChart2 } from 'lucide-react';
import { PORTFOLIO } from '../content';
import { ANIM } from '../utils/animations';

// Map chip iconType → Lucide component
const ICON_MAP = { brain: Brain, cpu: Cpu, cloud: Cloud, bar: BarChart2 };

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
  return (
    <div
      className={`absolute ${chip.pos} ${chip.floatClass} z-20`}
      aria-hidden="true"
    >
      <div
        className="px-3 py-2.5 rounded-xl border border-white/[0.1] text-xs"
        style={{
          background:  'rgba(13,27,53,0.92)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          minWidth: '110px',
        }}
      >
        <Icon size={13} className="text-accent mb-1.5" />
        {chip.lines.map((line, i) => (
          <div key={i} className="text-[--text] font-medium leading-snug text-[11px]">
            {line}
          </div>
        ))}
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
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-4 items-center py-20 lg:py-0">
        {/* ════ LEFT: text content ════ */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 max-w-xl"
        >
          {/* Badge */}
          <motion.div variants={heroItem}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.09] text-[--muted] text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
              {PORTFOLIO.badge}
            </span>
          </motion.div>

          {/* Main heading with fluid typography */}
          <motion.div variants={heroItem}>
            <h1 className="text-[clamp(2rem,5.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight break-words">
              Hi, I'm{' '}
              <span
                className="text-accent"
                style={{ textShadow: '0 0 40px rgba(67,97,238,0.55)' }}
              >
                Prakash Kumar
              </span>
            </h1>
            <p className="text-[clamp(1.6rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-[--text] mt-1 break-words">
              {PORTFOLIO.headline}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={heroItem}
            className="text-[--muted] text-base sm:text-lg leading-relaxed max-w-prose"
          >
            {PORTFOLIO.heroDesc}
          </motion.p>


        </motion.div>

        {/* ════ RIGHT: hero visual + floating chips ════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: ANIM.ease }}
          className="relative flex items-center justify-center min-h-[340px] h-[360px] sm:h-[440px] lg:h-[500px] w-full max-w-full overflow-hidden"
          aria-hidden="true"
        >
          {/* Ambient Glow behind the device */}
          <div
            className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(67,97,238,0.45) 0%, transparent 68%)',
              animation: 'breathe 5s ease-in-out infinite',
            }}
          />

          {/* Outer ring decoration */}
          <div
            className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-white/[0.04] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 40px rgba(67,97,238,0.08)' }}
          />

          {/* Central circular profile frame */}
          <div
            className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-2 border-accent/40 flex items-center justify-center overflow-hidden p-1.5"
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

          {/* Floating chips (hidden on very small screens < 440px to prevent awkward overlap) */}
          <div className="hidden xs:contents sm:contents">
            {PORTFOLIO.chips.map((chip, i) => (
              <Chip key={i} chip={chip} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-500 pointer-events-none select-none"
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
