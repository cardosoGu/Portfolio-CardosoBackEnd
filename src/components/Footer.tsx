'use client';

import { useApp } from '@/context/AppContext';
import { FiHeart } from 'react-icons/fi';

export default function Footer() {
  const { t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-mono text-lg font-bold text-zinc-900 dark:text-white"
          >
            <span className="text-blue-500">{'<'}</span>C
            <span className="text-blue-500">{'/>'}</span>
          </a>

          <p className="text-sm text-zinc-500 flex items-center gap-1.5">
            {© {year}. {t('footer.copy')}
          </p>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-mono text-zinc-400 hover:text-blue-500 transition-colors"
          >
            back_to_top()
          </a>
        </div>
      </div>
    </footer>
  );
}
