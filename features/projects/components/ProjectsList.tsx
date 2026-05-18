'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { containerVariants } from '@/features/home/lib/animations';
import { projects } from '@/constants';
import ProjectCard from '@/features/projects/components/ProjectCard';
import ProjectsFilter, {
  type FilterCategory,
} from '@/features/projects/components/ProjectsFilter';

const ProjectsList = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <div>
      <div className='mb-10'>
        <ProjectsFilter active={activeFilter} onChange={setActiveFilter} />
      </div>

      <m.div
        key={activeFilter}
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </m.div>
    </div>
  );
};

export default ProjectsList;
