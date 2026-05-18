import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/features/shared/components/Navbar';
import Footer from '@/features/shared/components/Footer';
import MotionProvider from '@/features/shared/components/MotionProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
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
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className='min-h-full flex flex-col bg-[#09090b] text-[#e6e0e9]'>
        <MotionProvider>
          <Navbar />
          <div className='flex-1 pt-14'>{children}</div>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
