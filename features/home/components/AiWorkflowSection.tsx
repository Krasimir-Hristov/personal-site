'use client';

import { m } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
} from '@/features/home/lib/animations';
import { aiWorkflowItems, aiWorkflowDifferentiator } from '@/constants';

const AiWorkflowSection = () => {
  const { icon: DiffIcon, label, text, highlight } = aiWorkflowDifferentiator;
  const highlightIndex = text.indexOf(highlight);

  return (
    <section
      id='ai-workflow'
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

      <m.div
        className='max-w-7xl mx-auto relative z-10'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <m.span
          variants={itemVariants}
          className='font-mono text-xs text-[#06b6d4] uppercase tracking-widest block mb-3'
        >
          Workflow
        </m.span>

        <m.h2
          variants={itemVariants}
          className='text-3xl md:text-4xl font-bold text-[#e6e0e9] tracking-tight mb-6'
        >
          Building with AI Agents
        </m.h2>

        <m.p
          variants={itemVariants}
          className='text-base text-[#cbc4d2] leading-relaxed max-w-2xl mb-12'
        >
          I leverage AI agents, tools, and workflows not as a shortcut, but as a
          force multiplier. I architect the solutions, define the workflows, and
          stay in full control — AI handles the execution speed.
        </m.p>

        {/* Workflow cards */}
        <m.div
          variants={containerVariants}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'
        >
          {aiWorkflowItems.map((item) => (
            <m.div
              key={item.title}
              variants={itemVariants}
              className='glass-card p-6 rounded-xl flex flex-col gap-4 group hover:border-[#06b6d4]/40 transition-colors'
            >
              <div className='w-10 h-10 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center shrink-0 group-hover:bg-[#06b6d4]/20 transition-colors'>
                <item.icon size={20} className='text-[#06b6d4]' />
              </div>
              <div>
                <h3 className='text-base font-semibold text-[#e6e0e9] mb-2'>
                  {item.title}
                </h3>
                <p className='text-sm text-[#cbc4d2] leading-relaxed'>
                  {item.description}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Differentiator callout */}
        <m.div
          variants={itemVariants}
          className='glass-card p-6 rounded-xl border-[#06b6d4]/30 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 sm:items-center'
        >
          <div className='w-10 h-10 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center shrink-0'>
            <DiffIcon size={20} className='text-[#06b6d4]' />
          </div>
          <div>
            <p className='font-mono text-xs text-[#79767d] uppercase tracking-widest mb-2'>
              {label}
            </p>
            <p className='text-base text-[#cbc4d2] leading-relaxed'>
              {text.slice(0, highlightIndex)}
              <span className='text-[#06b6d4] font-semibold'>{highlight}</span>
              {text.slice(highlightIndex + highlight.length)}
            </p>
          </div>
        </m.div>
      </m.div>
    </section>
  );
};

export default AiWorkflowSection;
