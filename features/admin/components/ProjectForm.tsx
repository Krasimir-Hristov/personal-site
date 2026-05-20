'use client';

import { useState } from 'react';
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
import type { Project } from '@/features/shared/types';

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
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

const ProjectForm = ({ open, onClose, project }: ProjectFormProps) => {
  const isEdit = !!project;

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

  const set = (field: keyof typeof emptyForm, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    // Phase 6: wire to DB
    alert(
      `${isEdit ? 'Edit' : 'Add'} will be saved to database in Phase 6.\n\nTitle: ${form.title}`,
    );
    onClose();
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

        <SheetFooter className='mt-8 flex gap-3'>
          <Button
            variant='outline'
            onClick={onClose}
            className='border-[#494551] text-[#cbc4d2] hover:bg-white/04 bg-transparent'
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className='bg-[#06b6d4] hover:bg-[#0891b2] text-[#09090b] font-medium'
          >
            {isEdit ? 'Save changes' : 'Add project'}
          </Button>
        </SheetFooter>

        <p className='mt-4 text-xs text-[#494551] text-center'>
          Persistence wired to DB in Phase 6
        </p>
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
