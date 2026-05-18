'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/features/home/lib/animations';
import type { Project } from '@/features/shared/types';

const badgeColors: Record<string, string> = {
  'AI / Chat': 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20',
  'AI / Assistant': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Freelance: 'bg-[#facc15]/10 text-[#facc15] border-[#facc15]/20',
};

const placeholderGradients: Record<string, string> = {
  'savage-ai': 'from-[#06b6d4]/20 via-[#09090b] to-[#0e7490]/20',
  axon: 'from-violet-600/20 via-[#09090b] to-violet-900/20',
  'freelance-1': 'from-[#facc15]/10 via-[#09090b] to-[#ca8a04]/10',
  'freelance-2': 'from-[#4ade80]/10 via-[#09090b] to-[#16a34a]/10',
};

const ProjectCard = ({ project }: { project: Project }) => {
  const { id, title, description, techStack, githubUrl, demoUrl, badge } =
    project;

  return (
    <m.div
      variants={itemVariants}
      className='group relative glass-card rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-shadow duration-500 flex flex-col'
    >
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
        <div className='absolute inset-0 bg-linear-to-t from-[#09090b]/80 via-[#09090b]/20 to-transparent pointer-events-none' />
        {badge && (
          <span
            className={cn(
              'absolute top-3 right-3 px-2.5 py-1 rounded text-[10px] uppercase font-semibold tracking-wider border',
              badgeColors[badge] ??
                'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20',
            )}
          >
            {badge}
          </span>
        )}
      </div>

      <div className='p-6 flex flex-col flex-1'>
        <h3 className='text-lg font-bold text-[#e6e0e9] mb-2'>{title}</h3>

        <p className='text-sm text-[#cbc4d2] mb-4 leading-relaxed flex-1'>
          {description}
        </p>

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

        <div className='flex items-center gap-3 mt-auto'>
          {githubUrl && (
            <Link
              href={githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${title} GitHub repository`}
              className='inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#494551]/60 text-xs font-medium text-[#cbc4d2] hover:text-[#e6e0e9] hover:border-[#06b6d4]/40 transition-colors'
            >
              <FaGithub size={14} />
              GitHub
            </Link>
          )}
          {demoUrl && (
            <Link
              href={demoUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${title} live demo`}
              className='inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-xs font-medium text-[#06b6d4] hover:bg-[#06b6d4]/20 transition-colors'
            >
              <ExternalLink size={14} />
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </m.div>
  );
};

export default ProjectCard;
