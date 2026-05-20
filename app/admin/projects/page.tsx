import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/constants';

export const metadata: Metadata = {
  title: 'Projects',
};

const AdminProjectsPage = async () => {
  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-2xl font-semibold text-[#e6e0e9]'>Projects</h1>
      </div>

      <div className='rounded-xl border border-[#494551] overflow-hidden'>
        <table className='w-full text-sm'>
          <thead className='bg-white/04'>
            <tr>
              <th className='text-left px-5 py-3 text-[#cbc4d2] font-medium'>
                Title
              </th>
              <th className='text-left px-5 py-3 text-[#cbc4d2] font-medium'>
                Badge
              </th>
              <th className='text-left px-5 py-3 text-[#cbc4d2] font-medium'>
                Featured
              </th>
              <th className='text-left px-5 py-3 text-[#cbc4d2] font-medium'>
                Tech Stack
              </th>
              <th className='text-left px-5 py-3 text-[#cbc4d2] font-medium'>
                Links
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-[#494551]'>
            {projects.map((project) => (
              <tr
                key={project.id}
                className='hover:bg-white/02 transition-colors'
              >
                <td className='px-5 py-4 text-[#e6e0e9] font-medium'>
                  {project.title}
                </td>
                <td className='px-5 py-4 text-[#cbc4d2]'>
                  {project.badge ?? '—'}
                </td>
                <td className='px-5 py-4'>
                  <span
                    className={
                      project.featured
                        ? 'text-[#06b6d4] font-medium'
                        : 'text-[#494551]'
                    }
                  >
                    {project.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className='px-5 py-4 text-[#cbc4d2]'>
                  {project.techStack.slice(0, 3).join(', ')}
                  {project.techStack.length > 3 && (
                    <span className='text-[#494551]'>
                      {' '}
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </td>
                <td className='px-5 py-4'>
                  <div className='flex gap-3'>
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-[#06b6d4] hover:underline'
                      >
                        GitHub
                      </Link>
                    )}
                    {project.demoUrl && (
                      <Link
                        href={project.demoUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-[#cfbcff] hover:underline'
                      >
                        Demo
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className='mt-4 text-xs text-[#494551]'>
        Projects are currently managed in{' '}
        <code className='text-[#cbc4d2]'>constants/index.ts</code>. Full CRUD
        with database storage arrives in Phase 6.
      </p>
    </div>
  );
};

export default AdminProjectsPage;
