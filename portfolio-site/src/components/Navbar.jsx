import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { PORTFOLIO } from '../content';
import { sound } from '../utils/sound';

const NAV_LINKS = ['About', 'Projects', 'Skills', 'Education', 'Contact'];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('');
  const [isMuted,        setIsMuted]        = useState(sound.isMuted);

  // Sound state listener
  useEffect(() => {
    const handleSoundChange = (e) => {
      setIsMuted(e.detail.isMuted);
    };
    window.addEventListener('sound-state-change', handleSoundChange);
    return () => window.removeEventListener('sound-state-change', handleSoundChange);
  }, []);

  const toggleSound = () => {
    const unmuted = sound.toggle();
    setIsMuted(!unmuted);
  };

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
        {/* Logo & Name */}
        <a
          href="#hero"
          className="flex items-center gap-2 sm:gap-2.5 group min-w-0"
          aria-label="Prakash Kumar: Back to top"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-white/[0.12] transition-all duration-300 group-hover:border-accent group-hover:shadow-glow bg-[#0d1b35] flex-shrink-0 flex items-center justify-center">
            <img
              src="/profile.jpg"
              alt="Prakash Kumar"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <span className="font-semibold text-[--text] text-xs sm:text-sm whitespace-nowrap tracking-tight">
            Prakash Kumar
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-7" role="list">
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

        {/* Right side: Social icons (GitHub, LinkedIn, Gmail) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {PORTFOLIO.social.github && (
            <a
              href={PORTFOLIO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 sm:hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(67,97,238,0.5)] transition-all p-1 sm:p-0.5 rounded-full flex items-center justify-center"
              aria-label="GitHub profile"
            >
              <img
                src="/icons/github.png"
                alt="GitHub"
                className="w-5 h-5 sm:w-[23px] sm:h-[23px] rounded-full object-contain"
              />
            </a>
          )}

          <a
            href={PORTFOLIO.social.linkedin || 'https://linkedin.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 sm:hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.5)] transition-all p-1 sm:p-0.5 rounded-full flex items-center justify-center"
            aria-label="LinkedIn profile"
          >
            <img
              src="/icons/linkedin.png"
              alt="LinkedIn"
              className="w-5 h-5 sm:w-[23px] sm:h-[23px] rounded-full object-contain"
            />
          </a>

          {PORTFOLIO.social.email && (
            <a
              href={`mailto:${PORTFOLIO.social.email}`}
              className="hover:scale-110 sm:hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(234,67,53,0.5)] transition-all p-1 sm:p-0.5 rounded-full flex items-center justify-center"
              aria-label="Send email via Gmail"
            >
              <img
                src="/icons/gmail.png"
                alt="Gmail"
                className="w-5 h-5 sm:w-[23px] sm:h-[23px] rounded-full object-contain"
              />
            </a>
          )}

          {/* Sound FX Toggle (Muted by default) */}
          <button
            type="button"
            onClick={toggleSound}
            title={isMuted ? 'Sound effects: Off (click to unmute)' : 'Sound effects: On (click to mute)'}
            aria-label={isMuted ? 'Enable sound effects' : 'Disable sound effects'}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[--muted] hover:text-white hover:bg-white/[0.08] transition-colors ml-0.5 border border-white/[0.1] bg-white/[0.03]"
          >
            {isMuted ? (
              <VolumeX size={14} className="opacity-60" />
            ) : (
              <Volume2 size={14} className="text-accent" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
