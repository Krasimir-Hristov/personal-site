import { Metadata } from 'next';
import ContactInfo from '@/features/contact/components/ContactInfo';
import ContactForm from '@/features/contact/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Krasimir Hristov',
  description:
    'Get in touch with Krasimir Hristov — Web Developer & AI Engineer. Open a channel for project proposals, collaborations, or general inquiries.',
  openGraph: {
    title: 'Contact — Krasimir Hristov',
    description:
      'Get in touch with Krasimir Hristov — Web Developer & AI Engineer.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Krasimir Hristov',
    description:
      'Get in touch with Krasimir Hristov — Web Developer & AI Engineer.',
  },
};

const ContactPage = () => {
  return (
    <main className='relative min-h-screen px-8 py-24 overflow-hidden'>
      {/* Background glow */}
      <div className='absolute inset-0 pointer-events-none' aria-hidden='true'>
        <div className='absolute top-1/3 left-1/4 w-96 h-96 bg-[#06b6d4]/5 blur-[120px] rounded-full' />
        <div className='absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#cfbcff]/5 blur-[100px] rounded-full' />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start'>
          {/* Left — contact info */}
          <ContactInfo />

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
