import { Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO } from '../content';

export default function Footer() {
  return (
    <footer
      className="py-6 border-t border-white/[0.05]"
      style={{ background: 'var(--bg)' }}
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + name */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/[0.12] bg-[#0d1b35] flex-shrink-0 flex items-center justify-center">
            <img
              src="/profile.jpg"
              alt="Prakash Kumar"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <span className="text-[--muted] text-sm font-medium">Prakash Kumar</span>
        </div>

        {/* Copyright */}
        <p className="text-[--subtle] text-xs text-center">
          © {new Date().getFullYear()} Prakash Kumar · Built with React, GSAP &amp; Framer Motion
        </p>

        {/* Social */}
        <div className="flex items-center gap-3">
          <a
            href={PORTFOLIO.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(67,97,238,0.5)] transition-all p-0.5 rounded-full"
            aria-label="GitHub"
          >
            <img src="/icons/github.png" alt="GitHub" className="w-[20px] h-[20px] rounded-full object-contain" />
          </a>
          <a
            href={PORTFOLIO.social.linkedin || 'https://linkedin.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.5)] transition-all p-0.5 rounded-full"
            aria-label="LinkedIn"
          >
            <img src="/icons/linkedin.png" alt="LinkedIn" className="w-[20px] h-[20px] rounded-full object-contain" />
          </a>
          {PORTFOLIO.social.email && (
            <a
              href={`mailto:${PORTFOLIO.social.email}`}
              className="hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(234,67,53,0.5)] transition-all p-0.5 rounded-full"
              aria-label="Email"
            >
              <img src="/icons/gmail.png" alt="Gmail" className="w-[20px] h-[20px] rounded-full object-contain" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
