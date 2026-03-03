'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiCopy,
  FiCheck,
  FiExternalLink,
} from 'react-icons/fi';
import { useApp } from '@/context/AppContext';

const colorClasses: Record<string, { bg: string; text: string; hover: string; border: string }> = {
  emerald: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    hover: 'group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-500/30',
    border: 'hover:border-emerald-500/50',
  },
  blue: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    hover: 'group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30',
    border: 'hover:border-blue-500/50',
  },
  sky: {
    bg: 'bg-sky-500/10 dark:bg-sky-500/20',
    text: 'text-sky-600 dark:text-sky-400',
    hover: 'group-hover:bg-sky-500/20 dark:group-hover:bg-sky-500/30',
    border: 'hover:border-sky-500/50',
  },
  violet: {
    bg: 'bg-violet-500/10 dark:bg-violet-500/20',
    text: 'text-violet-600 dark:text-violet-400',
    hover: 'group-hover:bg-violet-500/20 dark:group-hover:bg-violet-500/30',
    border: 'hover:border-violet-500/50',
  },
};

export default function Contact() {
  const { t } = useApp();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const contacts = [
    {
      icon: FiPhone,
      labelKey: 'contact.phone',
      value: '(11) 96154-0505',
      copyValue: '11961540505',
      href: 'tel:+5511961540505',
      color: 'emerald',
    },
    {
      icon: FiMail,
      labelKey: 'contact.emailLabel',
      value: 'cardosogustavo667@yahoo.com',
      copyValue: 'cardosogustavo667@yahoo.com',
      href: 'mailto:cardosogustavo667@yahoo.com',
      color: 'blue',
    },
    {
      icon: FiLinkedin,
      labelKey: 'contact.linkedin',
      value: 'in/gustavocardoso08',
      copyValue: 'https://www.linkedin.com/in/gustavocardoso08/',
      href: 'https://www.linkedin.com/in/gustavocardoso08/',
      color: 'sky',
    },
    {
      icon: FiGithub,
      labelKey: 'contact.github',
      value: 'github.com/cardosoGu',
      copyValue: 'https://github.com/cardosoGu',
      href: 'https://github.com/cardosoGu',
      color: 'violet',
    },
  ];

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error copying:', err);
    }
  };

  return (
    <section id="contact" className="py-28">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-xs font-mono font-semibold text-blue-500 uppercase tracking-[0.2em] mb-4">
            {t('contact.tag')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {t('contact.sub')}
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {contacts.map(({ icon: Icon, labelKey, value, copyValue, href, color }, index) => {
            const colors = colorClasses[color];
            const isCopied = copiedIndex === index;

            return (
              <motion.div
                key={labelKey}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`
                  group relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 
                  bg-white dark:bg-zinc-900/50 backdrop-blur-sm
                  ${colors.border} transition-all duration-300
                  hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    w-14 h-14 rounded-xl ${colors.bg} ${colors.hover}
                    flex items-center justify-center mb-4 transition-all duration-300
                  `}
                >
                  <Icon size={24} className={`${colors.text} transition-colors duration-200`} />
                </div>

                {/* Label */}
                <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                  {t(labelKey)}
                </p>

                {/* Value */}
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 break-all leading-relaxed">
                  {value}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-4">
                  {/* Copy Button */}
                  <motion.button
                    onClick={() => handleCopy(copyValue, index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium
                      transition-all duration-200
                      ${
                        isCopied
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }
                    `}
                  >
                    {isCopied ? (
                      <>
                        <FiCheck size={14} />
                        {t('contact.copied')}
                      </>
                    ) : (
                      <>
                        <FiCopy size={14} />
                        {t('contact.copy')}
                      </>
                    )}
                  </motion.button>

                  {/* Open Link Button */}
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium
                      ${colors.bg} ${colors.text}
                      hover:opacity-80 transition-all duration-200
                    `}
                  >
                    <FiExternalLink size={14} />
                    {t('contact.open')}
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-emerald-500/5 border border-zinc-200/50 dark:border-zinc-800/50">
            <div className="text-4xl">💬</div>
            <div className="text-center sm:text-left">
              <p className="text-zinc-900 dark:text-white font-semibold">{t('contact.ctaTitle')}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('contact.ctaSub')}</p>
            </div>
            <motion.a
              href="https://wa.me/5511961540505"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
