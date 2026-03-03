'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { useApp } from '@/context/AppContext';
import clsx from 'clsx';

const navLinks = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'py-3 bg-[#fafafa]/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50'
            : 'py-5'
        )}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="relative group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="font-mono text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <span className="text-blue-500">{'<'}</span>
              C
              <span className="text-blue-500">{'/>'}</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className={clsx(
                  'text-sm font-medium transition-colors duration-200 relative',
                  activeSection === href.slice(1)
                    ? 'text-blue-500'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                )}
              >
                {t(key)}
                {activeSection === href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-blue-500"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 transition-all duration-200"
            >
              {lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 transition-all duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <RiSunFill size={16} /> : <RiMoonFill size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
            >
              {menuOpen ? <HiX size={18} /> : <HiMenuAlt4 size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#fafafa] dark:bg-[#09090b] md:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center items-center gap-8 px-8">
              {navLinks.map(({ key, href }, i) => (
                <motion.a
                  key={key}
                  href={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-bold text-zinc-900 dark:text-white hover:text-blue-500 transition-colors"
                >
                  {t(key)}
                </motion.a>
              ))}

              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={toggleLang}
                  className="px-4 py-2 rounded-full text-sm font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                >
                  {lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
                </button>
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-300 dark:border-zinc-700"
                >
                  {theme === 'dark' ? <RiSunFill size={18} /> : <RiMoonFill size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}