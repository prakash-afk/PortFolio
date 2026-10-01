// ─────────────────────────────────────────────────────────
//  ANIMATION SETTINGS: tweak all speeds and delays here
// ─────────────────────────────────────────────────────────

export const ANIM = {
  // Easing curve used site-wide (Framer Motion + GSAP)
  ease: [0.22, 1, 0.36, 1],

  duration: {
    fast:   0.2,   // hover transitions
    normal: 0.55,  // card / section reveals
    slow:   0.8,   // hero, large reveals
  },

  // Stagger between children in a list
  stagger: 0.08,

  // Hero stagger delay increment
  heroPer: 0.1,

  // Marquee cycle duration in seconds (longer = slower)
  marquee: {
    row1: 16,
    row2: 20,
  },

  // Scroll reveal: fade up from this many pixels
  revealY: 22,
};

// ─── Framer Motion variant presets ───────────────────────

export const fadeUp = {
  hidden:  { opacity: 0, y: ANIM.revealY },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: ANIM.duration.normal, delay, ease: ANIM.ease },
  }),
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: ANIM.duration.normal, delay, ease: ANIM.ease },
  }),
};

export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: ANIM.duration.normal, ease: ANIM.ease },
  },
};
