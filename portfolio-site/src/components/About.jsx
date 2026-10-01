import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Target, Lightbulb, Focus, BookOpen, ArrowRight } from 'lucide-react';
import { PORTFOLIO } from '../content';

const ICON_MAP = {
  target:    Target,
  lightbulb: Lightbulb,
  focus:     Focus,
  book:      BookOpen,
};

function AboutCard({ card, icon: Icon }) {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-glow group relative p-4 sm:p-5 overflow-hidden"
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[14px] transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, rgba(67,97,238,0.18), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-colors duration-200 group-hover:bg-accent/20"
          style={{ background: 'var(--accent-dim)' }}
        >
          <Icon size={16} className="text-accent" />
        </div>
        <h3 className="font-semibold text-sm text-[--text] mb-1.5">
          {card.title}
        </h3>
        <p className="text-[--muted] text-xs leading-relaxed">{card.desc}</p>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { about } = PORTFOLIO;
  const offsetX = isMobile ? 40 : 80;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">

          {/* ── Left: text ── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -offsetX }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="section-label">{about.sectionLabel}</span>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight tracking-tight mb-5">
              {about.heading}
            </h2>
            <p className="text-[--muted] text-base sm:text-[1.05rem] leading-relaxed mb-8">
              {about.body}
            </p>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-5 py-2.5 border border-accent text-accent rounded-xl hover:bg-accent hover:text-white transition-all duration-200 font-semibold text-sm"
            >
              <span>Know More About Me</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
          </motion.div>

          {/* ── Right: 2×2 info cards ── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: offsetX }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.95,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
          >
            {about.cards.map((card) => {
              const Icon = ICON_MAP[card.icon] || Target;
              return (
                <AboutCard
                  key={card.title}
                  card={card}
                  icon={Icon}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
