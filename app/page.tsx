import HeroSection from '@/features/home/components/HeroSection';
import AboutSection from '@/features/home/components/AboutSection';
import ProjectsPreview from '@/features/home/components/ProjectsPreview';
import CTABanner from '@/features/home/components/CTABanner';
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Krasimir Hristov',
      url: 'https://www.krasimirxristov.com/',
      jobTitle: 'Web Developer & AI Engineer',
      sameAs: [
        'https://github.com/Krasimir-Hristov',
        'https://www.linkedin.com/in/krasimir-hristov/',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Krasimir Hristov — Web Developer & AI Engineer',
      url: 'https://www.krasimirxristov.com/',
      description:
        'Portfolio of Krasimir Hristov — full-stack web developer and AI engineer specializing in Next.js, TypeScript, and RAG systems.',
    },
  ],
};

const Home = () => {
  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <AboutSection />
      <ProjectsPreview />
      <CTABanner />
    </main>
  );
};

export default Home;
