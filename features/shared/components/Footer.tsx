import Link from 'next/link';
import { socialLinks } from '@/constants';

const Footer = () => {
  return (
    <footer className='bg-[#0f0d13] w-full py-10 border-t border-[#494551]/10'>
      <div className='flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-7xl mx-auto'>
        <p className='text-sm text-[#06b6d4]/80 hover:text-[#06b6d4] transition-opacity'>
          © 2026 Krasimir Hristov. All rights reserved.
        </p>

        <div className='flex gap-5'>
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer nofollow'
              aria-label={label}
              className='text-[#cbc4d2] hover:text-[#06b6d4] transition-colors'
            >
              <Icon size={20} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
