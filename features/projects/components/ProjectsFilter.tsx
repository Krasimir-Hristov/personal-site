'use client';

import { cn } from '@/lib/utils';

type FilterCategory = 'All' | 'AI Tools' | 'Web Apps';

const FILTERS: FilterCategory[] = ['All', 'AI Tools', 'Web Apps'];

interface ProjectsFilterProps {
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
}

const ProjectsFilter = ({ active, onChange }: ProjectsFilterProps) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
            active === filter
              ? 'bg-[#cfbcff] text-[#22005d]'
              : 'text-[#cbc4d2] hover:bg-white/5 border border-[#494551]/40',
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export type { FilterCategory };
export default ProjectsFilter;
