'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { FiBriefcase, FiMapPin } from 'react-icons/fi';

interface ExpItem {
  role_pt: string;
  role_en: string;
  company: string;
  location: string;
  start: string;
  end_pt: string;
  end_en: string;
  desc_pt: string;
  desc_en: string;
  tags: string[];
  current?: boolean;
}

const experiences: ExpItem[] = [
  {
    role_pt: 'Desenvolvedor Backend',
    role_en: 'Backend Developer',
    company: 'Startup GoatRealm',
    location: 'Remoto',
    start: '01/2026',
    end_pt: '03/2026',
    end_en: '03/2026',
    desc_pt:
      'Desenvolvimento de APIs REST com foco em alta performance e segurança. Implementação de autenticação robusta com OAuth2, rotação de tokens e HTTPOnly Cookies. Criação de sistemas de gestão (CRUDs, cupons, gerenciamento de projetos), controle de permissões RBAC e integração em nuvem com Square Cloud.',
    desc_en:
      'Development of REST APIs focused on high performance and security. Implementation of robust authentication with OAuth2, token rotation and HTTPOnly Cookies. Building management systems (CRUDs, coupons, project management), RBAC permission control and cloud integration with Square Cloud.',
    tags: ['TypeScript', 'Node.js', 'Fastify', 'PostgreSQL', 'OAuth2', 'RBAC', 'Square Cloud'],
    current: true,
  },
  {
    role_pt: 'Auxiliar Administrativo',
    role_en: 'Administrative Assistant',
    company: 'Lojas Cem',
    location: 'Salto, SP',
    start: 'Jun 2023',
    end_pt: 'Jul 2025',
    end_en: 'Jul 2025',
    desc_pt:
      'Suporte operacional no setor de Transporte e Faturamento da Matriz. Conferência de DACTE/NFS-e e organização de processos administrativos de alta demanda.',
    desc_en:
      'Operational support in the Transport and Billing sector of the headquarters. Verification of DACTE/NFS-e and organization of high-demand administrative processes.',
    tags: ['Transporte', 'Faturamento', 'DACTE', 'NFS-e'],
    current: false,
  },
];

export default function Experience() {
  const { t, lang } = useApp();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-28 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-block text-xs font-mono font-semibold text-blue-500 uppercase tracking-[0.2em] mb-4">
            {t('exp.tag')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            {t('exp.title')}
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-zinc-300 dark:via-zinc-700 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative sm:pl-14"
              >
                <div className="absolute left-[14px] top-6 w-3 h-3 rounded-full border-2 border-blue-500 bg-[#fafafa] dark:bg-[#09090b] hidden sm:block z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping" />
                  )}
                </div>

                <div className="group p-6 lg:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                          {lang === 'pt' ? exp.role_pt : exp.role_en}
                        </h3>

                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                          <FiBriefcase size={13} />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMapPin size={13} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-mono text-zinc-400 shrink-0">
                      {exp.start} → {lang === 'pt' ? exp.end_pt : exp.end_en}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                    {lang === 'pt' ? exp.desc_pt : exp.desc_en}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
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
