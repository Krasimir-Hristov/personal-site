import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Krasimir Hristov — Web Developer & AI Engineer',
  description:
    'Portfolio of Krasimir Hristov. Full-stack web developer and AI engineer specialising in intelligent web applications, RAG systems, and LLM integrations.',
  openGraph: {
    title: 'Krasimir Hristov — Web Developer & AI Engineer',
    description:
      'Portfolio of Krasimir Hristov. Full-stack web developer and AI engineer specialising in intelligent web applications, RAG systems, and LLM integrations.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krasimir Hristov — Web Developer & AI Engineer',
    description:
      'Portfolio of Krasimir Hristov. Full-stack web developer and AI engineer specialising in intelligent web applications, RAG systems, and LLM integrations.',
    images: ['/og-image.png'],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className='min-h-full flex flex-col bg-[#09090b] text-[#e6e0e9]'>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
