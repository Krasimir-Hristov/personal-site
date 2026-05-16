'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  containerVariants,
  itemVariants,
} from '@/features/home/lib/animations';
import type { Project } from '@/features/shared/types';
import { projects } from '@/constants';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const badgeColors: Record<string, string> = {
  'AI / Chat': 'bg-[#06b6d4]/10 text-[#06b6d4]',
  'AI / Assistant': 'bg-violet-500/10 text-violet-400',
  Freelance: 'bg-[#facc15]/10 text-[#facc15]',
};

const placeholderGradients: Record<string, string> = {
  'savage-ai': 'from-[#06b6d4]/20 via-[#09090b] to-[#0e7490]/20',
  axon: 'from-violet-600/20 via-[#09090b] to-violet-900/20',
};

const ProjectCard = ({ project }: { project: Project }) => {
  const { id, title, description, techStack, githubUrl, demoUrl, badge } =
    project;

  return (
    <motion.div
      variants={itemVariants}
      className='group relative glass-card rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-shadow duration-500'
    >
      {/* Placeholder image area */}
      <div className='aspect-video w-full overflow-hidden relative'>
        <div
          className={cn(
            'w-full h-full bg-linear-to-br flex items-center justify-center',
            placeholderGradients[id] ??
              'from-[#1d1b20] via-[#09090b] to-[#1d1b20]',
          )}
        >
          <span className='text-5xl font-black text-[#06b6d4]/20 group-hover:text-[#06b6d4]/30 transition-colors duration-500 select-none tracking-tighter'>
            {title.slice(0, 2).toUpperCase()}
          </span>
        </div>
        {/* Bottom gradient overlay */}
        <div className='absolute inset-0 bg-linear-to-t from-[#09090b]/80 via-[#09090b]/20 to-transparent pointer-events-none' />
      </div>

      {/* Card body */}
      <div className='p-6 relative'>
        <div className='flex justify-between items-start mb-3'>
          <h3 className='text-lg font-bold text-[#e6e0e9]'>{title}</h3>
          {badge && (
            <span
              className={cn(
                'px-2 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider',
                badgeColors[badge] ?? 'bg-[#06b6d4]/10 text-[#06b6d4]',
              )}
            >
              {badge}
            </span>
          )}
        </div>

        <p className='text-sm text-[#cbc4d2] mb-4 leading-relaxed'>
          {description}
        </p>

        {/* Tech stack */}
        <div className='flex flex-wrap gap-1.5 mb-5'>
          {techStack.map((tech) => (
            <span
              key={tech}
              className='text-[10px] px-2 py-0.5 rounded bg-[#1d1b20] text-[#cbc4d2] border border-[#494551]/40'
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className='flex items-center gap-3'>
          {githubUrl && (
            <Link
              href={githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${title} GitHub repository`}
              className='text-[#cbc4d2] hover:text-[#06b6d4] transition-colors'
            >
              <FaGithub size={18} />
            </Link>
          )}
          {demoUrl && (
            <Link
              href={demoUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${title} live demo`}
              className='text-[#cbc4d2] hover:text-[#06b6d4] transition-colors'
            >
              <ExternalLink size={18} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPreview = () => {
  return (
    <section id='projects' className='px-8 py-24 max-w-7xl mx-auto'>
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between items-end gap-4 mb-12'>
        <div>
          <span className='text-xs font-semibold text-[#06b6d4] uppercase tracking-widest block mb-2'>
            Showcase
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-[#e6e0e9]'>
            Selected Projects
          </h2>
        </div>
      </div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectsPreview;
