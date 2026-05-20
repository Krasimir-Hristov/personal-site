'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectForm from '@/features/admin/components/ProjectForm';
import { deleteProject } from '@/features/admin/lib/project-actions';
import type { Project } from '@/features/shared/types';

interface AdminProjectsClientProps {
  initialProjects: Project[];
}

const AdminProjectsClient = ({ initialProjects }: AdminProjectsClientProps) => {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const openAdd = () => {
    setEditTarget(undefined);
    setFormOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditTarget(project);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this project?')) return;
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteProject(id);
      setDeletingId(null);
      if (result.error) {
        alert(result.error);
        return;
      }
      router.refresh();
    });
  };

  const handleSaved = () => {
    setFormOpen(false);
    router.refresh();
  };

  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-2xl font-semibold text-[#e6e0e9]'>Projects</h1>
        <Button
          onClick={openAdd}
          className='bg-[#06b6d4] hover:bg-[#0891b2] text-[#09090b] font-medium flex items-center gap-2'
        >
          <Plus size={16} />
          Add project
        </Button>
      </div>

      <div className='rounded-xl border border-[#494551] overflow-hidden'>
        <table className='w-full text-sm'>
          <thead className='bg-white/4'>
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
              <th className='px-5 py-3' />
            </tr>
          </thead>
          <tbody className='divide-y divide-[#494551]'>
            {initialProjects.map((project) => (
              <tr
                key={project.id}
                className={`hover:bg-white/2 transition-colors ${deletingId === project.id ? 'opacity-40' : ''}`}
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
                <td className='px-5 py-4'>
                  <div className='flex items-center gap-2 justify-end'>
                    <button
                      onClick={() => openEdit(project)}
                      className='p-1.5 rounded-md text-[#cbc4d2] hover:bg-white/8 hover:text-[#e6e0e9] transition-colors'
                      aria-label='Edit project'
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={isPending}
                      className='p-1.5 rounded-md text-[#cbc4d2] hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-40'
                      aria-label='Delete project'
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {initialProjects.length === 0 && (
        <p className='mt-8 text-center text-sm text-[#494551]'>
          No projects yet — add your first one.
        </p>
      )}

      <ProjectForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSaved={handleSaved}
        project={editTarget}
      />
    </>
  );
};

export default AdminProjectsClient;
