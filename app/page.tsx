import HeroSection from '@/features/home/components/HeroSection';
import AboutSection from '@/features/home/components/AboutSection';
import ProjectsPreview from '@/features/home/components/ProjectsPreview';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Krasimir Hristov — Web Developer & AI Engineer',
  description:
    'Portfolio of Krasimir Hristov — full-stack web developer and AI engineer specializing in Next.js, TypeScript, and RAG systems.',
  openGraph: {
    title: 'Krasimir Hristov — Web Developer & AI Engineer',
    description:
      'Portfolio of Krasimir Hristov — full-stack web developer and AI engineer.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krasimir Hristov — Web Developer & AI Engineer',
    description:
      'Portfolio of Krasimir Hristov — full-stack web developer and AI engineer.',
    images: ['/og-image.png'],
  },
};

const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsPreview />
    </main>
  );
};

export default Home;
