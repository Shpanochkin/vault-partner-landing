import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0b0f]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo height={28} />
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#tiers" className="text-sm text-white/60 transition-colors hover:text-white">
            Tiers
          </a>
          <a href="#calculator" className="text-sm text-white/60 transition-colors hover:text-white">
            Calculator
          </a>
          <a href="#faq" className="text-sm text-white/60 transition-colors hover:text-white">
            FAQ
          </a>
        </nav>
        <a
          href="#apply"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
        >
          Become a Partner
        </a>
      </div>
    </motion.header>
  );
}
