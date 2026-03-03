import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Cardoso — Backend Developer',
  description:
    'Portfolio profissional de Cardoso, desenvolvedor backend especializado em sistemas escaláveis e de alta performance.',
  keywords: ['backend', 'developer', 'nodejs', 'python', 'api', 'cardoso'],
  authors: [{ name: 'Cardoso' }],
  openGraph: {
    title: 'Cardoso — Backend Developer',
    description: 'Portfolio profissional de Cardoso, desenvolvedor backend.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="noise">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}