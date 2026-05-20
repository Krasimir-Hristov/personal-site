'use client';

import { m } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
} from '@/features/home/lib/animations';
import { specializations } from '@/constants';

const SpecializationsSection = () => {
  return (
    <section id='specializations' className='px-8 py-24 max-w-7xl mx-auto'>
      <m.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
      >
        <m.span
          variants={itemVariants}
          className='font-mono text-xs text-[#06b6d4] uppercase tracking-widest block mb-3'
        >
          Expertise
        </m.span>
        <m.h2
          variants={itemVariants}
          className='text-3xl md:text-4xl font-bold text-[#e6e0e9] tracking-tight mb-12'
        >
          Specializations
        </m.h2>

        <m.div
          variants={containerVariants}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'
        >
          {specializations.map((spec) => (
            <m.div
              key={spec.title}
              variants={itemVariants}
              className='glass-card p-6 rounded-xl flex flex-col gap-4 group hover:border-[#06b6d4]/40 transition-colors'
            >
              <div className='w-10 h-10 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center shrink-0 group-hover:bg-[#06b6d4]/20 transition-colors'>
                <spec.icon size={20} className='text-[#06b6d4]' />
              </div>
              <div>
                <h3 className='text-base font-semibold text-[#e6e0e9] mb-2'>
                  {spec.title}
                </h3>
                <p className='text-sm text-[#cbc4d2] leading-relaxed'>
                  {spec.description}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>
      </m.div>
    </section>
  );
};

export default SpecializationsSection;
