'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useApp } from '@/context/AppContext';

interface Project {
  number: string;
  titlePt: string;
  titleEn: string;
  descPt: string;
  descEn: string;
  tags: string[];
  github: string;
  live: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    number: '01',
    titlePt: 'Secure Auth — API de Autenticação',
    titleEn: 'Secure Auth — Authentication API',
    descPt:
      'API completa com autenticação social (OAuth2), JWT, verificação de e-mail, rotação de tokens, HTTPOnly Cookies e rate limiting. Foco em segurança e boas práticas de arquitetura.',
    descEn:
      'Full API with social authentication (OAuth2), JWT, email verification, token rotation, HTTPOnly Cookies and rate limiting. Focus on security and architecture best practices.',
    tags: ['TypeScript', 'Fastify', 'Prisma', 'PostgreSQL', 'OAuth2', 'JWT'],
    github: 'https://github.com/cardosoGu/Secure_Auth_System-API',
    live: 'https://github.com/cardosoGu/Secure_Auth_System-API',
    featured: true,
  },
  {
    number: '02',
    titlePt: 'School API — Gestão Escolar',
    titleEn: 'School API — School Management',
    descPt:
      'API REST para gestão de usuários, alunos e upload de arquivos com criptografia bcryptjs. Sistema completo de CRUDs com autenticação e controle de permissões.',
    descEn:
      'REST API for managing users, students and file upload with bcryptjs encryption. Complete CRUD system with authentication and permission control.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'bcryptjs'],
    github: 'https://github.com/cardosoGu/BackEnd-SchoolAPI',
    live: 'https://github.com/cardosoGu/BackEnd-SchoolAPI',
    featured: true,
  },
];

export default function Projects() {
  const { t, lang } = useApp();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="projects" className="py-28">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-block text-xs font-mono font-semibold text-blue-500 uppercase tracking-[0.2em] mb-4">
            {t('projects.tag')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            {t('projects.title')}
          </h2>
        </motion.div>

        <div className="space-y-px">
          {projects.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(project.number)}
              onMouseLeave={() => setHovered(null)}
              className="group relative"
            >
              <div
                className={`
                  flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 p-6 lg:p-8
                  border border-transparent rounded-2xl cursor-default transition-all duration-300
                  ${hovered === project.number
                    ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-lg shadow-black/5 dark:shadow-black/30'
                    : 'border-zinc-100 dark:border-zinc-900'}
                `}
              >
                <span className="font-mono text-4xl lg:text-5xl font-black text-zinc-100 dark:text-zinc-800 group-hover:text-blue-500/20 transition-colors duration-300 select-none shrink-0 leading-none">
                  {project.number}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {lang === 'pt' ? project.titlePt : project.titleEn}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-blue-500 hover:border-blue-500 transition-all duration-200"
                      >
                        <FiGithub size={14} />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-blue-500 hover:border-blue-500 transition-all duration-200"
                      >
                        <FiExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 max-w-2xl">
                    {lang === 'pt' ? project.descPt : project.descEn}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {i < projects.length - 1 && (
                <div className="h-px bg-zinc-100 dark:bg-zinc-900 mx-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
