import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO } from '../content';
import { ANIM } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);
  const lineRef    = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  // GSAP: draw the timeline line when section enters viewport
  useEffect(() => {
    if (!lineRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lineRef.current.style.transform = 'scaleY(1)';
      return;
    }

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      }
    );
  }, []);

  return (
    <section
      id="education"
      className="py-24 sm:py-32"
      style={{ background: 'var(--bg)' }}
    >
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: ANIM.revealY }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: ANIM.duration.normal, ease: ANIM.ease }}
          className="mb-12"
        >
          <span className="section-label">EDUCATION</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold tracking-tight">
            Academic Background
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div
            ref={lineRef}
            className="timeline-line hidden xs:block"
            aria-hidden="true"
          />

          {PORTFOLIO.education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -18 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: ANIM.duration.normal,
                delay: 0.25 + i * 0.12,
                ease: ANIM.ease,
              }}
              className="relative flex gap-4 sm:gap-8 pl-0 xs:pl-12 sm:pl-14 mb-6"
            >
              {/* Dot */}
              <div
                className="hidden xs:block absolute left-[18px] top-7 w-2.5 h-2.5 rounded-full bg-accent"
                style={{ boxShadow: '0 0 10px rgba(67,97,238,0.9)' }}
                aria-hidden="true"
              />

              {/* Card */}
              <div
                className="w-full p-4 sm:p-6 rounded-2xl border border-white/[0.07] flex flex-col sm:flex-row gap-4 sm:gap-5 items-start"
                style={{ background: 'var(--card)' }}
              >
                {/* SMIT Logo */}
                {edu.logo && (
                  <div className="flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/[0.15] bg-white p-2 sm:p-2.5 flex items-center justify-center shadow-md">
                    <img
                      src={edu.logo}
                      alt="Sikkim Manipal Institute of Technology logo"
                      width={96}
                      height={96}
                      loading="lazy"
                      className="object-contain w-full h-full scale-105"
                    />
                  </div>
                )}

                {/* Text info */}
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[--text] mb-1 leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-accent text-sm font-semibold mb-1.5">
                    {edu.institution}
                  </p>
                  <p className="text-[--muted] text-sm">{edu.year}</p>
                  {edu.cgpa && (
                    <p className="text-[--muted] text-sm mt-0.5">{edu.cgpa}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
