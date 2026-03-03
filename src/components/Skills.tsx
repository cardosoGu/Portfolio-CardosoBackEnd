'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  SiNodedotjs, SiTypescript, SiPostgresql, SiMongodb,
  SiDocker, SiGit, SiSpring, SiPrisma, SiReact, SiFastify,
  SiExpress,
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { FiShield, FiTerminal } from 'react-icons/fi';

interface SkillItem {
  name: string;
  icon: React.ElementType;
}

const skillGroups = [
  {
    key: 'skills.backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Fastify', icon: SiFastify },
      { name: 'Express', icon: SiExpress },
      { name: 'Java', icon: DiJava },
      { name: 'Spring Boot', icon: SiSpring },
    ] as SkillItem[],
  },
  {
    key: 'skills.database',
    label: 'Banco de Dados',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Prisma ORM', icon: SiPrisma },
      { name: 'Sequelize', icon: FiTerminal },
    ] as SkillItem[],
  },
  {
    key: 'skills.devops',
    label: 'DevOps & Tools',
    items: [
      { name: 'Docker', icon: SiDocker },
      { name: 'Git / GitHub', icon: SiGit },
      { name: 'REST APIs', icon: FiTerminal },
      { name: 'OAuth2 / JWT', icon: FiShield },
    ] as SkillItem[],
  },
  {
    key: 'skills.tools',
    label: 'Frontend',
    items: [
      { name: 'React', icon: SiReact },
    ] as SkillItem[],
  },
];

function SkillCard({ item, index, inView }: { item: SkillItem; index: number; inView: boolean }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-blue-500/60 hover:bg-blue-500/5 transition-all duration-200"
    >
      <Icon size={18} className="text-zinc-400 group-hover:text-blue-500 transition-colors duration-200 shrink-0" />
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{item.name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useApp();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-28 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-block text-xs font-mono font-semibold text-blue-500 uppercase tracking-[0.2em] mb-4">
            {t('skills.tag')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            {t('skills.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillGroups.map(({ key, label, items }, gi) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <h3 className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest mb-4">
                {label}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {items.map((item, i) => (
                  <SkillCard key={item.name} item={item} index={i} inView={inView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
