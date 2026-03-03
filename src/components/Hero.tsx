'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useApp } from '@/context/AppContext';

const codeSnippet = [
  { type: 'comment', text: '// Gustavo Cardoso — Backend Developer' },
  { type: 'newline', text: '' },
  { type: 'keyword', text: 'const' },
  { type: 'variable', text: ' developer' },
  { type: 'operator', text: ' = {' },
  { type: 'newline', text: '' },
  { type: 'key', text: ' name:' },
  { type: 'string', text: " 'Gustavo Cardoso'," },
  { type: 'newline', text: '' },
  { type: 'key', text: ' role:' },
  { type: 'string', text: " 'Backend Developer'," },
  { type: 'newline', text: '' },
  { type: 'key', text: ' stack:' },
  { type: 'array', text: " ['TypeScript', 'Java', 'NodeJS']," },
  { type: 'newline', text: '' },
  { type: 'key', text: ' focus:' },
  { type: 'string', text: " 'APIs REST & Auth Segura'," },
  { type: 'newline', text: '' },
  { type: 'key', text: ' available:' },
  { type: 'boolean', text: ' true,' },
  { type: 'newline', text: '' },
  { type: 'operator', text: '};' },
];

const colorMap: Record<string, string> = {
  comment: 'text-zinc-500',
  keyword: 'text-blue-400',
  variable: 'text-white',
  operator: 'text-zinc-400',
  key: 'text-blue-300',
  string: 'text-emerald-400',
  array: 'text-amber-300',
  boolean: 'text-purple-400',
  newline: '',
};

export default function Hero() {
  const { t } = useApp();
  const [typed, setTyped] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const fullText = codeSnippet.map((s) => s.text).join('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(i);
      if (i >= fullText.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [fullText.length]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  let remaining = typed;
  const segments = codeSnippet.map((seg) => {
    const visible = seg.text.slice(0, remaining);
    remaining = Math.max(0, remaining - seg.text.length);
    return { ...seg, visible };
  });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background - POINTER EVENTS NONE */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-700/10 rounded-full blur-[100px] pointer-events-none" />
      {/* CONTEÚDO - Z-10 PARA FICAR ACIMA DO BACKGROUND */}
      <div className="container-custom w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-80px)] py-12 lg:py-16">
          {/* Left */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-medium text-blue-500 font-mono">{t('hero.role')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] text-zinc-900 dark:text-white mb-6"
            >
              {t('hero.greeting')}
              <br />
              <span className="gradient-text">Gustavo.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed mb-8"
            >
              {t('hero.sub')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {/* Ver Projetos */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative z-20 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer select-none"
              >
                {t('hero.cta')}
                <FiArrowDown size={14} />
              </button>

              {/* Download CV */}
              <button
                type="button"
                onClick={() => window.open('/cv.pdf', '_blank')}
                className="relative z-20 inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 hover:border-blue-500 text-zinc-700 dark:text-zinc-300 hover:text-blue-500 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer select-none"
              >
                {t('hero.resume')}
                <FiDownload size={14} />
              </button>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3"
            >
              <button
                type="button"
                onClick={() => window.open('https://github.com/cardosoGu', '_blank')}
                aria-label="GitHub"
                className="relative z-20 w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 transition-all duration-200 cursor-pointer"
              >
                <FiGithub size={16} />
              </button>

              <button
                type="button"
                onClick={() =>
                  window.open('https://www.linkedin.com/in/gustavocardoso08/', '_blank')
                }
                aria-label="LinkedIn"
                className="relative z-20 w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 transition-all duration-200 cursor-pointer"
              >
                <FiLinkedin size={16} />
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = 'mailto:cardosogustavo667@yahoo.com';
                }}
                aria-label="Email"
                className="relative z-20 w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 transition-all duration-200 cursor-pointer"
              >
                <FiMail size={16} />
              </button>

              <span className="w-12 h-px bg-zinc-300 dark:bg-zinc-700 ml-2" />
            </motion.div>
          </div>

          {/* Right — Code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative pb-8 order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-2xl shadow-black/5 dark:shadow-black/40">
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs font-mono text-zinc-400">developer.ts</span>
              </div>
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-6 sm:leading-7 min-h-[240px] sm:min-h-[280px]">
                {segments.map((seg, i) => (
                  <span
                    key={i}
                    className={
                      seg.type === 'newline' ? 'block' : colorMap[seg.type] || 'text-zinc-300'
                    }
                  >
                    {seg.type === 'newline' ? '\u00A0' : seg.visible}
                  </span>
                ))}
                <span
                  className={`inline-block w-2 h-4 bg-blue-500 ml-0.5 align-middle ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-100`}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-4 inline-flex items-center gap-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 shadow-lg"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                <span className="text-blue-500 text-lg">⚡</span>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Status</p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Available for hire
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-zinc-400 font-medium tracking-widest uppercase">
            {t('hero.scroll')}
          </span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <FiArrowDown size={16} className="text-zinc-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
