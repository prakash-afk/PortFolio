import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialises Lenis smooth scroll with:
 * - Slow, graceful easing for anchor links (#about, #projects, etc.)
 * - Subtle, light motion blur during scrolling
 * - Automatic offset compensation for sticky navbar
 */
export function useLenis() {
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    window.__lenis = lenis;

    const mainEl = document.querySelector('main');
    let blurTimeout = null;

    // Synchronize ScrollTrigger and apply minor motion blur based on velocity
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();

      if (mainEl && !isReduced) {
        // Minor, light motion blur (capped at 1.4px so text stays clean and comfortable)
        const velocity = Math.abs(e.velocity || 0);
        const blurAmount = Math.min(1.4, velocity * 0.04);

        mainEl.style.setProperty('--scroll-blur', `${blurAmount.toFixed(2)}px`);

        clearTimeout(blurTimeout);
        blurTimeout = setTimeout(() => {
          mainEl.style.setProperty('--scroll-blur', '0px');
        }, 90);
      }
    });

    // RAF ticker for Lenis & GSAP
    const ticker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // ── Global Anchor Interceptor for Slow, Smooth Transitions ──
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Update URL hash without instant jump
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }

      // Smoothly and slowly scroll to target section with offset for navbar
      lenis.scrollTo(target, {
        offset: -64,
        duration: 1.7, // Slow, graceful transition
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(blurTimeout);
      lenis.destroy();
      gsap.ticker.remove(ticker);
      delete window.__lenis;
    };
  }, []);
}
