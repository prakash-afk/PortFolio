import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Lightbulb, Focus, BookOpen, ArrowRight } from 'lucide-react';
import { PORTFOLIO } from '../content';
import { ANIM } from '../utils/animations';

const ICON_MAP = {
  target:    Target,
  lightbulb: Lightbulb,
  focus:     Focus,
  book:      BookOpen,
};

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { about } = PORTFOLIO;

  return (
    <section
      id="about"
      className="py-24 sm:py-32"
      style={{ background: 'var(--surface)' }}
    >
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">

          {/* ── Left: text ── */}
          <motion.div
            initial={{ opacity: 0, y: ANIM.revealY }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: ANIM.duration.slow, ease: ANIM.ease }}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {about.cards.map((card, i) => {
              const Icon = ICON_MAP[card.icon] || Target;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: ANIM.duration.normal,
                    delay: 0.12 + i * ANIM.stagger,
                    ease: ANIM.ease,
                  }}
                  className="card-glow group p-4 sm:p-5"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-colors duration-200 group-hover:bg-accent/20"
                    style={{ background: 'var(--accent-dim)' }}
                  >
                    <Icon size={16} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-sm text-[--text] mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-[--muted] text-xs leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
