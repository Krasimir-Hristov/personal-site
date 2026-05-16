'use client';

import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import {
  containerVariants,
  itemVariants,
} from '@/features/home/lib/animations';
import { techStack } from '@/constants';

const AboutSection = () => {
  return (
    <section
      id='about'
      className='relative px-8 py-24 overflow-hidden bg-[#1d1b20]/50'
    >
      {/* Dot grid background */}
      <div
        className='absolute inset-0 opacity-5 pointer-events-none'
        aria-hidden='true'
        style={{
          backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className='max-w-7xl mx-auto relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
          {/* Left — bio */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            className='flex flex-col gap-5'
          >
            <motion.span
              variants={itemVariants}
              className='font-mono text-xs text-[#06b6d4] uppercase tracking-widest'
            >
              Process
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className='text-3xl font-semibold text-[#e6e0e9] tracking-tight'
            >
              From Web Dev to AI Engineer
            </motion.h2>

            {/* Circuit line */}
            <motion.div
              variants={itemVariants}
              className='h-px w-15 bg-linear-to-r from-[#06b6d4] to-transparent'
            />

            <motion.p
              variants={itemVariants}
              className='text-base text-[#cbc4d2] leading-relaxed'
            >
              My journey started in the trenches of full-stack development,
              mastering the art of creating responsive, user-friendly
              interfaces. As the web evolved, so did my focus — transitioning
              into the world of Artificial Intelligence.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className='text-base text-[#cbc4d2] leading-relaxed'
            >
              Today, I specialize in bridging the gap between traditional
              software engineering and advanced LLM implementation. Whether
              it&apos;s architecting a robust PostgreSQL database or fine-tuning
              a LangChain retrieval pipeline, I ensure every line of code serves
              a purpose.
            </motion.p>
          </motion.div>

          {/* Right — cards */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            className='flex flex-col gap-6'
          >
            {/* Tech stack card */}
            <motion.div
              variants={itemVariants}
              className='glass-card p-6 rounded-xl'
            >
              <h3 className='font-mono text-xs text-[#79767d] uppercase tracking-widest mb-4'>
                Technical Stack
              </h3>
              <div className='flex flex-wrap gap-2'>
                {techStack.map(({ label, color }) => (
                  <span
                    key={label}
                    className={`bg-[#36343a]/50 border border-[#494551]/30 px-3 py-1 rounded font-mono text-xs ${color}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* System Architecture card */}
            <motion.div
              variants={itemVariants}
              className='glass-card p-6 rounded-xl flex items-center justify-between group hover:border-[#06b6d4]/40 transition-colors cursor-default'
            >
              <div>
                <h3 className='text-xl font-semibold text-[#e6e0e9]'>
                  System Architecture
                </h3>
                <p className='text-sm text-[#cbc4d2] mt-1'>
                  Scalable RAG and AI pipelines
                </p>
              </div>
              <Network
                size={32}
                className='text-[#06b6d4] group-hover:scale-110 transition-transform shrink-0'
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
