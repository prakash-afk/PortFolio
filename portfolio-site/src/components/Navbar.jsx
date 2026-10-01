import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { PORTFOLIO } from '../content';
import { ANIM } from '../utils/animations';

const NAV_LINKS = ['About', 'Projects', 'Skills', 'Education', 'Contact'];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('');
  const [menuOpen,       setMenuOpen]       = useState(false);
  const mobileMenuRef = useRef(null);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Navbar background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const sections = ['hero', ...NAV_LINKS.map(l => l.toLowerCase())]
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Close menu on resize ≥ 768 px
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Body scroll lock + Escape key
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050c1a]/90 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-accent origin-left"
        style={{ width: progressWidth, scaleX: 1 }}
        aria-hidden="true"
      />

      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group"
          aria-label="Prakash Kumar — Back to top"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/[0.12] transition-all duration-300 group-hover:border-accent group-hover:shadow-glow bg-[#0d1b35] flex-shrink-0 flex items-center justify-center">
            <img
              src="/profile.jpg"
              alt="Prakash Kumar"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <span className="hidden sm:block font-semibold text-[--text] text-sm">
            Prakash Kumar
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-7" role="list">
          {NAV_LINKS.map(link => {
            const active = activeSection === link.toLowerCase();
            return (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className={`relative text-sm font-medium py-1 transition-colors duration-200 ${
                    active ? 'text-[--text]' : 'text-[--muted] hover:text-[--text]'
                  }`}
                  aria-current={active ? 'true' : undefined}
                >
                  {link}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side: Social icons (GitHub, LinkedIn, Gmail) + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            {PORTFOLIO.social.github && (
              <a
                href={PORTFOLIO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(67,97,238,0.5)] transition-all p-0.5 rounded-full"
                aria-label="GitHub profile"
              >
                <img
                  src="/icons/github.png"
                  alt="GitHub"
                  className="w-[23px] h-[23px] rounded-full object-contain"
                />
              </a>
            )}

            <a
              href={PORTFOLIO.social.linkedin || 'https://linkedin.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.5)] transition-all p-0.5 rounded-full"
              aria-label="LinkedIn profile"
            >
              <img
                src="/icons/linkedin.png"
                alt="LinkedIn"
                className="w-[23px] h-[23px] rounded-full object-contain"
              />
            </a>

            {PORTFOLIO.social.email && (
              <a
                href={`mailto:${PORTFOLIO.social.email}`}
                className="hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(234,67,53,0.5)] transition-all p-0.5 rounded-full"
                aria-label="Send email via Gmail"
              >
                <img
                  src="/icons/gmail.png"
                  alt="Gmail"
                  className="w-[23px] h-[23px] rounded-full object-contain"
                />
              </a>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-[--muted] hover:text-[--text] hover:bg-white/[0.06] transition-colors"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: ANIM.duration.fast + 0.05, ease: ANIM.ease }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto overscroll-contain"
            style={{ background: 'var(--bg)' }}
          >
            <ul
              className="flex flex-col gap-1 px-6 pt-6"
              role="list"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.28, ease: ANIM.ease }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={closeMenu}
                    className="block text-xl sm:text-2xl font-semibold text-[--text] hover:text-accent transition-colors py-3 border-b border-white/[0.05]"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto px-6 pb-8 pt-6 flex flex-wrap items-center gap-4 sm:gap-5 border-t border-white/[0.06]">
              {PORTFOLIO.social.github && (
                <a
                  href={PORTFOLIO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[--muted] hover:text-[--text] transition-colors text-sm"
                  onClick={closeMenu}
                  aria-label="GitHub profile"
                >
                  <img src="/icons/github.png" alt="GitHub" className="w-5 h-5 rounded-full object-contain" />
                  <span>GitHub</span>
                </a>
              )}
              <a
                href={PORTFOLIO.social.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[--muted] hover:text-[--text] transition-colors text-sm"
                onClick={closeMenu}
                aria-label="LinkedIn profile"
              >
                <img src="/icons/linkedin.png" alt="LinkedIn" className="w-5 h-5 rounded-full object-contain" />
                <span>LinkedIn</span>
              </a>
              {PORTFOLIO.social.email && (
                <a
                  href={`mailto:${PORTFOLIO.social.email}`}
                  className="flex items-center gap-2.5 text-[--muted] hover:text-[--text] transition-colors text-sm"
                  onClick={closeMenu}
                  aria-label="Send email"
                >
                  <img src="/icons/gmail.png" alt="Gmail" className="w-5 h-5 rounded-full object-contain" />
                  <span>Email</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
