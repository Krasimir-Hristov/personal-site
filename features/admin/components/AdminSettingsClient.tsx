'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const defaultSettings = {
  bio: 'Web Developer & AI Engineer based in Stuttgart, Germany. I build full-stack web applications and AI-powered tools — RAG systems, chatbots, and LLM integrations.',
  githubUrl: 'https://github.com/Krasimir-Hristov',
  linkedinUrl: 'https://www.linkedin.com/in/krasimir-hristov/',
  youtubeUrl: 'https://www.youtube.com/@krasimirhristov6757',
  websiteUrl: 'https://www.krasimirxristov.com/',
  contactEmail: 'krasimir.xristov@gmail.com',
};

const AdminSettingsClient = () => {
  const [form, setForm] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  const set = (field: keyof typeof defaultSettings, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    // Phase 6: persist to DB
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-semibold text-[#e6e0e9]'>Settings</h1>
          <p className='text-sm text-[#cbc4d2] mt-1'>Bio and social links</p>
        </div>
        <Button
          onClick={handleSave}
          className='bg-[#06b6d4] hover:bg-[#0891b2] text-[#09090b] font-medium'
        >
          {saved ? 'Saved ✓' : 'Save changes'}
        </Button>
      </div>

      <div className='max-w-xl flex flex-col gap-6'>
        <section className='rounded-xl border border-[#494551] p-6 flex flex-col gap-5'>
          <h2 className='text-sm font-semibold uppercase tracking-widest text-[#cbc4d2]'>
            About
          </h2>

          <Field label='Bio'>
            <Textarea
              value={form.bio}
              onChange={(e) => set('bio', e.target.value)}
              rows={4}
              className='admin-input resize-none'
            />
          </Field>

          <Field label='Contact email'>
            <Input
              type='email'
              value={form.contactEmail}
              onChange={(e) => set('contactEmail', e.target.value)}
              className='admin-input'
            />
          </Field>
        </section>

        <section className='rounded-xl border border-[#494551] p-6 flex flex-col gap-5'>
          <h2 className='text-sm font-semibold uppercase tracking-widest text-[#cbc4d2]'>
            Social Links
          </h2>

          <Field label='GitHub'>
            <Input
              value={form.githubUrl}
              onChange={(e) => set('githubUrl', e.target.value)}
              placeholder='https://github.com/...'
              className='admin-input'
            />
          </Field>

          <Field label='LinkedIn'>
            <Input
              value={form.linkedinUrl}
              onChange={(e) => set('linkedinUrl', e.target.value)}
              placeholder='https://linkedin.com/in/...'
              className='admin-input'
            />
          </Field>

          <Field label='YouTube'>
            <Input
              value={form.youtubeUrl}
              onChange={(e) => set('youtubeUrl', e.target.value)}
              placeholder='https://youtube.com/...'
              className='admin-input'
            />
          </Field>

          <Field label='Website'>
            <Input
              value={form.websiteUrl}
              onChange={(e) => set('websiteUrl', e.target.value)}
              placeholder='https://...'
              className='admin-input'
            />
          </Field>
        </section>

        <p className='text-xs text-[#494551]'>
          Persistence wired to DB in Phase 6.
        </p>
      </div>
    </div>
  );
};

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

const Field = ({ label, children }: FieldProps) => (
  <div className='flex flex-col gap-1.5'>
    <Label className='text-sm text-[#cbc4d2]'>{label}</Label>
    {children}
  </div>
);

export default AdminSettingsClient;
