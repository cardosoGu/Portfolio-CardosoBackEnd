'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
type Lang = 'pt' | 'en';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

// Traduções organizadas por idioma
const translations: Record<Lang, Record<string, string>> = {
  pt: {
    // Navbar
    'nav.about': 'Sobre',
    'nav.skills': 'Skills',
    'nav.projects': 'Projetos',
    'nav.experience': 'Experiência',
    'nav.contact': 'Contato',

    // Hero
    'hero.greeting': 'Olá, eu sou',
    'hero.role': 'Desenvolvedor Backend',
    'hero.sub': 'Construindo sistemas robustos, escaláveis e de alta performance.',
    'hero.cta': 'Ver projetos',
    'hero.resume': 'Baixar CV',
    'hero.scroll': 'Role para baixo',

    // About
    'about.tag': 'Quem sou eu',
    'about.title': 'Backend, por essência.',
    'about.p1':
      'Desenvolvedor backend com foco em aplicações escaláveis e APIs REST. Experiência prática na construção de sistemas seguros, autenticação (OAuth2/JWT) e integração com bancos de dados relacionais.',
    'about.p2':
      'Entusiasta de tecnologias modernas e boas práticas de arquitetura de software. Cursando Engenharia de Software na CEUNSP e em constante evolução através de projetos reais e bootcamps focados em backend.',
    'about.stat1': 'Ano de experiência',
    'about.stat2': 'Projetos entregues',
    'about.stat3': 'Tecnologias dominadas',
    'about.skill1': 'APIs RESTful & OAuth2/JWT',
    'about.skill2': 'Node.js · Fastify · TypeScript',
    'about.skill3': 'Alta Performance & Segurança',
    'about.skill4': 'PostgreSQL · MongoDB · Prisma',

    // Skills
    'skills.tag': 'Arsenal técnico',
    'skills.title': 'Stack & Ferramentas',
    'skills.backend': 'Backend',
    'skills.database': 'Banco de Dados',
    'skills.devops': 'DevOps & Cloud',
    'skills.tools': 'Ferramentas',

    // Projects
    'projects.tag': 'O que construí',
    'projects.title': 'Projetos em destaque',
    'projects.view': 'Ver projeto',
    'projects.code': 'Código',

    // Experience
    'exp.tag': 'Minha trajetória',
    'exp.title': 'Experiência profissional',
    'exp.present': 'Presente',

    // Contact
    'contact.tag': 'Vamos conversar',
    'contact.title': 'Entre em contato',
    'contact.sub': 'Entre em contato comigo através de qualquer um dos canais abaixo.',
    'contact.name': 'Seu nome',
    'contact.email': 'Seu e-mail',
    'contact.message': 'Sua mensagem',
    'contact.send': 'Enviar mensagem',
    'contact.sending': 'Enviando...',
    'contact.success': 'Mensagem enviada com sucesso!',
    'contact.phone': 'Telefone',
    'contact.emailLabel': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.copy': 'Copiar',
    'contact.copied': 'Copiado!',
    'contact.open': 'Abrir',
    'contact.ctaTitle': 'Vamos conversar?',
    'contact.ctaSub': 'Estou sempre aberto a novas oportunidades e projetos interessantes.',

    // Footer
    'footer.copy': 'Todos os direitos reservados.',
    'footer.made': 'Feito com',
  },

  en: {
    // Navbar
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',

    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.role': 'Backend Developer',
    'hero.sub': 'Building robust, scalable, and high-performance systems.',
    'hero.cta': 'View projects',
    'hero.resume': 'Download CV',
    'hero.scroll': 'Scroll down',

    // About
    'about.tag': 'Who I am',
    'about.title': 'Backend, by essence.',
    'about.p1':
      'Backend developer focused on scalable applications and REST APIs. Hands-on experience building secure systems, authentication (OAuth2/JWT), and integration with relational databases.',
    'about.p2':
      'Enthusiast of modern technologies and software architecture best practices. Studying Software Engineering at CEUNSP and constantly evolving through real projects and backend-focused bootcamps.',
    'about.stat1': 'Year of experience',
    'about.stat2': 'Projects delivered',
    'about.stat3': 'Technologies mastered',
    'about.skill1': 'RESTful APIs & OAuth2/JWT',
    'about.skill2': 'Node.js · Fastify · TypeScript',
    'about.skill3': 'High Performance & Security',
    'about.skill4': 'PostgreSQL · MongoDB · Prisma',

    // Skills
    'skills.tag': 'Technical arsenal',
    'skills.title': 'Stack & Tools',
    'skills.backend': 'Backend',
    'skills.database': 'Databases',
    'skills.devops': 'DevOps & Cloud',
    'skills.tools': 'Tools',

    // Projects
    'projects.tag': 'What I built',
    'projects.title': 'Featured projects',
    'projects.view': 'View project',
    'projects.code': 'Code',

    // Experience
    'exp.tag': 'My journey',
    'exp.title': 'Professional experience',
    'exp.present': 'Present',

    // Contact
    'contact.tag': "Let's talk",
    'contact.title': 'Get in touch',
    'contact.sub': 'Get in touch with me through any of the channels below.',
    'contact.name': 'Your name',
    'contact.email': 'Your email',
    'contact.message': 'Your message',
    'contact.send': 'Send message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully!',
    'contact.phone': 'Phone',
    'contact.emailLabel': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.copy': 'Copy',
    'contact.copied': 'Copied!',
    'contact.open': 'Open',
    'contact.ctaTitle': "Let's chat?",
    'contact.ctaSub': "I'm always open to new opportunities and interesting projects.",

    // Footer
    'footer.copy': 'All rights reserved.',
    'footer.made': 'Made with',
  },
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Lang>('pt');
  const [mounted, setMounted] = useState(false);

  // Carrega preferências salvas
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLang = localStorage.getItem('lang') as Lang;

    if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
    if (savedLang && ['pt', 'en'].includes(savedLang)) {
      setLang(savedLang);
    }

    setMounted(true);
  }, []);

  // Aplica tema
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Salva idioma
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('lang', lang);
  }, [lang, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  const t = (key: string): string => {
    return translations[lang][key] ?? key;
  };

  // Evita flash de conteúdo não hidratado
  if (!mounted) {
    return null;
  }

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }

  return context;
}
