'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Bot, Download } from 'lucide-react';
import {
  containerVariants,
  itemVariants,
} from '@/features/home/lib/animations';
import NeuralNetworkSVG from '@/features/home/components/hero/NeuralNetworkSVG';

const HeroSection = () => {
  return (
    <section className='relative min-h-[90vh] flex items-center px-8 py-24 overflow-hidden'>
      {/* Background radial glow */}
      <div className='absolute inset-0 pointer-events-none' aria-hidden='true'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#06b6d4]/5 blur-[120px] rounded-full' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 w-full max-w-7xl mx-auto'>
        {/* Left column */}
        <motion.div
          className='lg:col-span-7 flex flex-col justify-center gap-6 z-10'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className='inline-flex items-center gap-2 bg-[#06b6d4]/10 border border-[#06b6d4]/20 px-4 py-2 rounded-full w-fit'
          >
            <Terminal size={15} className='text-[#06b6d4]' />
            <span className='font-mono text-xs text-[#06b6d4] uppercase tracking-widest'>
              Available for Hire
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className='text-5xl md:text-6xl font-bold text-[#e6e0e9] leading-tight tracking-tight'
          >
            Krasimir Hristov
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={itemVariants}
            className='text-2xl font-semibold text-[#06b6d4]'
          >
            Web Developer &amp; AI Engineer
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className='text-lg text-[#cbc4d2] max-w-xl leading-relaxed'
          >
            I build intelligent web applications from full-stack products to
            AI-powered tools and RAG systems. Focusing on precision,
            performance, and user-centric intelligence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className='flex flex-wrap gap-4 mt-2'
          >
            <Link
              href='/projects'
              className='bg-[#06b6d4] text-[#09090b] px-8 py-3 font-bold rounded-lg hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all flex items-center gap-2 text-sm'
            >
              View Projects <ArrowRight size={15} />
            </Link>
            <Link
              href='/chatbot'
              className='border border-[#06b6d4]/50 text-[#06b6d4] px-8 py-3 font-bold rounded-lg hover:bg-[#06b6d4]/10 transition-all flex items-center gap-2 text-sm'
            >
              Chat with AI <Bot size={15} />
            </Link>
            <a
              href='/cv.pdf'
              download
              className='border border-[#06b6d4]/50 text-[#06b6d4] px-8 py-3 font-bold rounded-lg hover:bg-[#06b6d4]/10 transition-all flex items-center gap-2 text-sm'
            >
              <Download size={15} /> Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — neural network */}
        <motion.div
          className='lg:col-span-5 relative flex justify-center items-center'
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' as const, delay: 0.3 }}
        >
          <div
            className='absolute inset-0 bg-[#06b6d4]/5 blur-[100px] rounded-full'
            aria-hidden='true'
          />
          <NeuralNetworkSVG />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
