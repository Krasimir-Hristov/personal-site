'use client';

import { m } from 'framer-motion';
import { containerVariants } from '@/features/home/lib/animations';
import type { Project } from '@/features/shared/types';
import ProjectCard from '@/features/projects/components/ProjectCard';

interface ProjectsListProps {
  projects: Project[];
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
  if (projects.length === 0) {
    return (
      <p className='text-[#494551] text-sm'>
        No projects yet. Check back soon.
      </p>
    );
  }

  return (
    <m.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='grid grid-cols-1 md:grid-cols-2 gap-6'
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </m.div>
  );
};

export default ProjectsList;
