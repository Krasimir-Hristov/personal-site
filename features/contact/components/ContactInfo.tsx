'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Mail, Phone, Copy, Check } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const ContactInfo = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('krasimir.xristov@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='flex flex-col gap-8'>
      {/* Header */}
      <div className='flex flex-col gap-4'>
        <span className='font-mono text-xs text-[#06b6d4] uppercase tracking-widest'>
          Transmission Protocol
        </span>
        <h2 className='text-4xl lg:text-5xl font-bold text-[#e6e0e9] leading-tight'>
          Initiate Connection
        </h2>
        <p className='text-[#cbc4d2] leading-relaxed max-w-md'>
          Have a project in mind, a collaboration proposal, or just want to say
          hello? Open a channel — I&apos;m always available for the right
          signal.
        </p>
      </div>

      {/* Contact details */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-3 text-sm text-[#cbc4d2]'>
          <div className='w-8 h-8 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center shrink-0'>
            <Mail className='w-4 h-4 text-[#06b6d4]' />
          </div>
          <div>
            <p className='font-mono text-[10px] text-[#8a8494] uppercase tracking-widest mb-0.5'>
              Direct Channel
            </p>
            <div className='flex items-center gap-2'>
              <span className='text-[#e6e0e9]'>krasimir.xristov@gmail.com</span>
              <button
                onClick={copyEmail}
                aria-label='Copy email'
                className='text-[#8a8494] hover:text-[#06b6d4] transition-colors'
              >
                {copied ? (
                  <Check className='w-3.5 h-3.5 text-[#06b6d4]' />
                ) : (
                  <Copy className='w-3.5 h-3.5' />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-3 text-sm text-[#cbc4d2]'>
          <div className='w-8 h-8 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center shrink-0'>
            <Phone className='w-4 h-4 text-[#06b6d4]' />
          </div>
          <div>
            <p className='font-mono text-[10px] text-[#8a8494] uppercase tracking-widest mb-0.5'>
              Signal Line
            </p>
            <a
              href='tel:+491733079213'
              className='text-[#e6e0e9] hover:text-[#06b6d4] transition-colors'
            >
              +49 173 3079213
            </a>
          </div>
        </div>

        <div className='flex items-center gap-3 text-sm text-[#cbc4d2]'>
          <div className='w-8 h-8 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center shrink-0'>
            <MapPin className='w-4 h-4 text-[#06b6d4]' />
          </div>
          <div>
            <p className='font-mono text-[10px] text-[#8a8494] uppercase tracking-widest mb-0.5'>
              Node Location
            </p>
            <span className='text-[#e6e0e9]'>
              Stuttgart, Germany (Remote-First)
            </span>
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className='flex gap-3'>
        <Link
          href='https://github.com/Krasimir-Hristov'
          target='_blank'
          rel='noopener noreferrer nofollow'
          aria-label='GitHub'
          className='inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#494551]/60 text-sm text-[#cbc4d2] hover:text-[#e6e0e9] hover:border-[#06b6d4]/40 transition-colors'
        >
          <FaGithub className='w-4 h-4' />
          GitHub
        </Link>
        <Link
          href='https://www.linkedin.com/in/krasimir-hristov/'
          target='_blank'
          rel='noopener noreferrer nofollow'
          aria-label='LinkedIn'
          className='inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#494551]/60 text-sm text-[#cbc4d2] hover:text-[#e6e0e9] hover:border-[#06b6d4]/40 transition-colors'
        >
          <FaLinkedin className='w-4 h-4' />
          LinkedIn
        </Link>
      </div>
    </div>
  );
};

export default ContactInfo;
