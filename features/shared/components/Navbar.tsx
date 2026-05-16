'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { navLinks } from '@/constants';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className='fixed top-0 w-full z-50 bg-[#09090b]/60 backdrop-blur-xl border-b border-[#494551]/20 shadow-sm'>
      <div className='flex justify-between items-center px-8 py-2 max-w-7xl mx-auto'>
        {/* Logo */}
        <Link
          href='/'
          className='font-bold text-2xl text-[#06b6d4] tracking-tight cursor-pointer'
        >
          KH
        </Link>

        {/* Desktop nav links */}
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium transition-colors cursor-pointer',
                pathname === href
                  ? 'text-[#06b6d4] border-b-2 border-[#06b6d4] pb-0.5'
                  : 'text-[#cbc4d2] hover:text-[#06b6d4]',
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className='flex items-center gap-4'>
          <Link
            href='/contact'
            className='hidden md:block bg-[#06b6d4] text-[#09090b] px-6 py-2 font-bold rounded text-sm hover:bg-cyan-400 active:scale-95 transition-all cursor-pointer'
          >
            Contact Me
          </Link>

          {/* Hamburger */}
          <Button
            className='md:hidden text-[#e6e0e9] p-2'
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label='Toggle navigation menu'
          >
            <motion.svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            >
              {mobileOpen ? (
                <>
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </>
              ) : (
                <>
                  <line x1='3' y1='6' x2='21' y2='6' />
                  <line x1='3' y1='12' x2='21' y2='12' />
                  <line x1='3' y1='18' x2='21' y2='18' />
                </>
              )}
            </motion.svg>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className='md:hidden bg-[#1d1b20]/95 backdrop-blur-xl border-t border-[#494551]/20 px-8 py-5 flex flex-col gap-4'
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'text-base font-medium py-1 transition-colors',
                  pathname === href
                    ? 'text-[#06b6d4]'
                    : 'text-[#cbc4d2] hover:text-[#06b6d4]',
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href='/contact'
              onClick={() => setMobileOpen(false)}
              className='bg-[#06b6d4] text-[#09090b] px-6 py-2 font-bold rounded text-sm hover:bg-cyan-400 transition-all text-center mt-2'
            >
              Hire Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
