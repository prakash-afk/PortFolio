import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { PORTFOLIO } from '../content';
import { ANIM } from '../utils/animations';

const ALL_SKILLS  = PORTFOLIO.skills;
const ROW1 = ALL_SKILLS.slice(0, Math.ceil(ALL_SKILLS.length / 2));
const ROW2 = ALL_SKILLS.slice(Math.ceil(ALL_SKILLS.length / 2));

function SkillChip({ skill }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="skill-chip mx-2 flex-shrink-0">
      {skill.icon && !imgErr ? (
        <img
          src={skill.icon}
          alt={`${skill.name} logo`}
          width={20}
          height={20}
          loading="lazy"
          onError={() => setImgErr(true)}
          className="flex-shrink-0 object-contain"
        />
      ) : (
        <div
          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-accent text-[9px] font-bold"
          style={{ background: 'var(--accent-dim)' }}
        >
          {skill.name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <span className="text-sm font-medium text-[--text]">{skill.name}</span>
    </div>
  );
}

function MarqueeRow({ skills, speed, reducedMotion }) {
  const rowRef   = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !rowRef.current) return;
    tweenRef.current = gsap.to(rowRef.current, {
      xPercent: -50,
      duration: speed,
      ease:     'none',
      repeat:   -1,
    });
    return () => tweenRef.current?.kill();
  }, [speed, reducedMotion]);

  const pause  = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.play();

  // Reduced motion: static wrapped grid
  if (reducedMotion) {
    return (
      <div className="flex flex-wrap gap-3 justify-center py-2">
        {skills.map((s, i) => <SkillChip key={i} skill={s} />)}
      </div>
    );
  }

  const doubled = [...skills, ...skills];

  return (
    <div
      className="overflow-hidden marquee-fade"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div
        ref={rowRef}
        className="flex py-2"
        style={{ width: 'max-content' }}
        aria-hidden="true"
      >
        {doubled.map((s, i) => <SkillChip key={i} skill={s} />)}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section id="skills" className="py-24 sm:py-32" style={{ background: 'var(--bg)' }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: ANIM.revealY }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: ANIM.duration.normal, ease: ANIM.ease }}
          className="mb-12"
        >
          <span className="section-label">SKILLS</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold tracking-tight">Tech Stack</h2>
        </motion.div>

        {/* Screen reader: static list of skills */}
        <ul className="sr-only">
          {ALL_SKILLS.map(s => <li key={s.name}>{s.name}</li>)}
        </ul>

        <div className="flex flex-col gap-5" aria-hidden={!reducedMotion}>
          <MarqueeRow skills={ROW1} speed={ANIM.marquee.row1} reducedMotion={reducedMotion} />
          <MarqueeRow skills={ROW2} speed={ANIM.marquee.row2} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
