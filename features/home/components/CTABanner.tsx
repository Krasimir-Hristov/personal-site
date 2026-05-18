'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, MessageCircle } from 'lucide-react';
import {
  containerVariants,
  itemVariants,
} from '@/features/home/lib/animations';

const CTABanner = () => {
  return (
    <section className='px-8 py-24 max-w-7xl mx-auto'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        className='relative glass-card rounded-2xl p-16 flex flex-col items-center text-center overflow-hidden'
      >
        {/* Radial glow top-right */}
        <div
          className='absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none'
          aria-hidden='true'
          style={{
            background:
              'radial-gradient(circle at 100% 0%, #06B6D4 0%, transparent 50%)',
          }}
        />

        <motion.div variants={itemVariants}>
          <BrainCircuit size={48} className='text-[#06b6d4] mb-6' />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className='text-3xl font-semibold text-[#e6e0e9] tracking-tight mb-4'
        >
          Want to know more?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className='text-base text-[#cbc4d2] max-w-2xl leading-relaxed mb-10'
        >
          I&apos;ve trained an AI assistant on my portfolio, projects, and
          technical blogs. It can answer specific questions about my stack or
          process.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            href='/chatbot'
            className='inline-flex cursor-pointer items-center gap-2 bg-[#06b6d4] text-[#09090b] px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]'
          >
            Ask my AI Assistant
            <MessageCircle size={18} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTABanner;
