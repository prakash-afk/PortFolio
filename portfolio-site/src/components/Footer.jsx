import { Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO } from '../content';

export default function Footer() {
  return (
    <footer
      className="py-6 border-t border-white/[0.05]"
      style={{ background: 'var(--bg)' }}
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center text-center">
        {/* Copyright */}
        <p className="text-[--subtle] text-xs">
          © {new Date().getFullYear()} Prakash Kumar · Built with React, GSAP &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
