import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-[#0f0d13] w-full py-10 border-t border-[#494551]/10'>
      <div className='flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-7xl mx-auto'>
        <div className='font-mono text-xs uppercase tracking-widest text-[#948e9c]'>
          KH_SYSTEM_V2
        </div>

        <p className='text-sm text-[#e7c365]/80 hover:text-[#e7c365] transition-opacity'>
          © 2026 Krasimir Hristov. Built with Neural Engine.
        </p>

        <div className='flex gap-6'>
          <Link
            href='https://github.com/krasimirHristov'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#cbc4d2] hover:text-[#e7c365] transition-colors text-sm'
          >
            GitHub
          </Link>
          <Link
            href='https://linkedin.com/in/krasimir-hristov'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#cbc4d2] hover:text-[#e7c365] transition-colors text-sm'
          >
            LinkedIn
          </Link>
          <Link
            href='https://twitter.com/krasimirHristov'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#cbc4d2] hover:text-[#e7c365] transition-colors text-sm'
          >
            Twitter
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
