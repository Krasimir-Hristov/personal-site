import dynamic from 'next/dynamic';
import HeroSection from '@/features/home/components/HeroSection';
import HeroImage from '@/features/home/components/HeroImage';
import { getProjects } from '@/features/admin/lib/project-actions';
import type { Metadata } from 'next';

const AboutSection = dynamic(
  () => import('@/features/home/components/AboutSection'),
);
const SpecializationsSection = dynamic(
  () => import('@/features/home/components/SpecializationsSection'),
);
const CTABanner = dynamic(() => import('@/features/home/components/CTABanner'));
const ProjectsList = dynamic(
  () => import('@/features/projects/components/ProjectsList'),
);
const ContactInfo = dynamic(
  () => import('@/features/contact/components/ContactInfo'),
);
const ContactForm = dynamic(
  () => import('@/features/contact/components/ContactForm'),
);

export const metadata: Metadata = {
  metadataBase: new URL('https://www.krasimirxristov.com'),
  alternates: { canonical: '/' },
  title: 'Krasimir Hristov — Web Developer & AI Engineer',
  description:
    'Krasimir Hristov — full-stack web developer & AI engineer. Next.js, TypeScript, RAG systems. Stuttgart, Germany. Available for remote work.',
  openGraph: {
    title: 'Krasimir Hristov — Web Developer & AI Engineer',
    description:
      'Full-stack web developer and AI engineer based in Stuttgart, Germany. Specializing in Next.js, TypeScript, and RAG systems.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krasimir Hristov — Web Developer & AI Engineer',
    description:
      'Full-stack web developer and AI engineer based in Stuttgart, Germany. Next.js, TypeScript, RAG systems.',
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
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Wendlingen am Neckar',
        addressRegion: 'Baden-Württemberg',
        postalCode: '73240',
        addressCountry: 'DE',
      },
      areaServed: [
        { '@type': 'City', name: 'Stuttgart' },
        { '@type': 'State', name: 'Baden-Württemberg' },
        { '@type': 'Country', name: 'Germany' },
        'Remote',
      ],
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

const Home = async () => {
  const projects = await getProjects();
  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection heroImage={<HeroImage />} />
      <AboutSection />
      <SpecializationsSection />
      <section id='projects' className='px-8 py-24 max-w-7xl mx-auto'>
        <div className='mb-10'>
          <span className='font-mono text-xs text-[#06b6d4] uppercase tracking-widest block mb-3'>
            Portfolio Archive
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-[#e6e0e9] tracking-tight'>
            Projects
          </h2>
        </div>
        <ProjectsList projects={projects} />
      </section>
      <CTABanner />
      <section id='contact' className='px-8 py-24 max-w-7xl mx-auto'>
        <div className='mb-12'>
          <span className='font-mono text-xs text-[#06b6d4] uppercase tracking-widest block mb-3'>
            Get In Touch
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-[#e6e0e9] tracking-tight'>
            Contact
          </h2>
        </div>
        <div className='grid lg:grid-cols-2 gap-16 lg:gap-24'>
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </main>
  );
};

export default Home;
