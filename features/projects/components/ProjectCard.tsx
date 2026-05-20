'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { itemVariants } from '@/features/home/lib/animations';
import ProjectBanner from '@/features/projects/components/ProjectBanner';
import type { Project } from '@/features/shared/types';

const ProjectCard = ({ project }: { project: Project }) => {
  const { title, description, techStack, githubUrl, demoUrl, badge } = project;

  return (
    <m.div
      variants={itemVariants}
      className='group relative glass-card rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-shadow duration-500 flex flex-col'
    >
      <ProjectBanner
        title={title}
        badge={badge}
        className='aspect-video w-full'
      />

      <div className='p-6 flex flex-col flex-1'>
        {badge && (
          <span className='mb-2 self-start px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-[#cbc4d2]'>
            {badge}
          </span>
        )}

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
