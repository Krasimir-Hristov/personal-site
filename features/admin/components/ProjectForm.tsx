'use client';

import { useState, useTransition, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  createProject,
  updateProject,
} from '@/features/admin/lib/project-actions';
import type { Project } from '@/features/shared/types';

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  project?: Project;
}

const emptyForm = {
  title: '',
  description: '',
  techStack: '',
  githubUrl: '',
  demoUrl: '',
  badge: '',
  featured: false,
  category: '',
};

const ProjectForm = ({ open, onClose, onSaved, project }: ProjectFormProps) => {
  const isEdit = !!project;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: project?.title ?? '',
    description: project?.description ?? '',
    techStack: project?.techStack.join(', ') ?? '',
    githubUrl: project?.githubUrl ?? '',
    demoUrl: project?.demoUrl ?? '',
    badge: project?.badge ?? '',
    featured: project?.featured ?? false,
    category: project?.category.join(', ') ?? '',
  });

  // reset form when project prop changes (switching between add/edit)
  useEffect(() => {
    setError('');
    setForm({
      title: project?.title ?? '',
      description: project?.description ?? '',
      techStack: project?.techStack.join(', ') ?? '',
      githubUrl: project?.githubUrl ?? '',
      demoUrl: project?.demoUrl ?? '',
      badge: project?.badge ?? '',
      featured: project?.featured ?? false,
      category: project?.category.join(', ') ?? '',
    });
  }, [project, open]);

  const set = (field: keyof typeof emptyForm, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    setError('');

    const data = {
      title: form.title.trim(),
      description: form.description.trim(),
      techStack: form.techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      githubUrl: form.githubUrl.trim() || undefined,
      demoUrl: form.demoUrl.trim() || undefined,
      badge: form.badge.trim() || undefined,
      featured: form.featured,
      category: form.category
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    startTransition(async () => {
      const result = isEdit
        ? await updateProject(project.id, data)
        : await createProject(data);

      if (result.error) {
        setError(result.error);
        return;
      }
      onSaved();
    });
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side='right'
        className='w-full sm:max-w-lg bg-[#09090b] border-l border-[#494551] overflow-y-auto'
      >
        <SheetHeader className='mb-6'>
          <SheetTitle className='text-[#e6e0e9]'>
            {isEdit ? 'Edit Project' : 'Add Project'}
          </SheetTitle>
        </SheetHeader>

        <div className='flex flex-col gap-5'>
          <Field label='Title'>
            <Input
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder='Project name'
              className='admin-input'
            />
          </Field>

          <Field label='Description'>
            <Textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder='Short project description'
              rows={4}
              className='admin-input resize-none'
            />
          </Field>

          <Field label='Tech Stack' hint='comma-separated'>
            <Input
              value={form.techStack}
              onChange={(e) => set('techStack', e.target.value)}
              placeholder='Next.js, TypeScript, Tailwind CSS'
              className='admin-input'
            />
          </Field>

          <div className='grid grid-cols-2 gap-4'>
            <Field label='GitHub URL'>
              <Input
                value={form.githubUrl}
                onChange={(e) => set('githubUrl', e.target.value)}
                placeholder='https://github.com/...'
                className='admin-input'
              />
            </Field>
            <Field label='Demo URL'>
              <Input
                value={form.demoUrl}
                onChange={(e) => set('demoUrl', e.target.value)}
                placeholder='https://...'
                className='admin-input'
              />
            </Field>
          </div>

          <Field label='Badge'>
            <Input
              value={form.badge}
              onChange={(e) => set('badge', e.target.value)}
              placeholder='AI / Chat'
              className='admin-input'
            />
          </Field>

          <Field label='Category' hint='comma-separated'>
            <Input
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              placeholder='AI Tools, Web Apps'
              className='admin-input'
            />
          </Field>

          <label className='flex items-center gap-3 cursor-pointer'>
            <input
              type='checkbox'
              checked={form.featured}
              onChange={(e) => set('featured', e.target.checked)}
              className='w-4 h-4 accent-[#06b6d4]'
            />
            <span className='text-sm text-[#e6e0e9]'>Featured project</span>
          </label>
        </div>

        <SheetFooter className='mt-8 flex flex-col gap-3'>
          {error && <p className='text-sm text-red-400 text-center'>{error}</p>}
          <div className='flex gap-3'>
            <Button
              variant='outline'
              onClick={onClose}
              disabled={isPending}
              className='border-[#494551] text-[#cbc4d2] hover:bg-white/04 bg-transparent'
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending}
              className='bg-[#06b6d4] hover:bg-[#0891b2] text-[#09090b] font-medium'
            >
              {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Add project'}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

const Field = ({ label, hint, children }: FieldProps) => (
  <div className='flex flex-col gap-1.5'>
    <Label className='text-sm text-[#cbc4d2]'>
      {label}
      {hint && <span className='ml-1 text-[#494551]'>({hint})</span>}
    </Label>
    {children}
  </div>
);

export default ProjectForm;
