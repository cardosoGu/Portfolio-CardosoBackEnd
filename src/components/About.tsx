'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { FiCode, FiServer, FiLayers, FiZap } from 'react-icons/fi';

const stats = [
  { value: '1', key: 'about.stat1', icon: FiZap },
  { value: '6+', key: 'about.stat2', icon: FiLayers },
  { value: '10+', key: 'about.stat3', icon: FiCode },
];

export default function About() {
  const { t } = useApp();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    { icon: FiServer, key: 'about.skill1' },
    { icon: FiCode, key: 'about.skill2' },
    { icon: FiZap, key: 'about.skill3' },
    { icon: FiLayers, key: 'about.skill4' },
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-2/3 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />

      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-block text-xs font-mono font-semibold text-blue-500 uppercase tracking-[0.2em] mb-4">
            {t('about.tag')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            {t('about.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base lg:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              {t('about.p1')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base lg:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              {t('about.p2')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4"
            >
              {skills.map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
                  <Icon size={16} className="text-blue-500 shrink-0" />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {t(key)}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {stats.map(({ value, key, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 32 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Icon size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-zinc-900 dark:text-white">{value}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{t(key)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
