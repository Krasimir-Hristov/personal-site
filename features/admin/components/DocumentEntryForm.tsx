'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import type { DocumentType } from '@/features/shared/types';

export interface DocumentFormState {
  title: string;
  content: string;
  type: DocumentType;
  tags: string;
}

interface DocumentEntryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: DocumentFormState;
  setForm: (updater: (prev: DocumentFormState) => DocumentFormState) => void;
  formError: string;
  isPending: boolean;
  onSave: () => void;
}

const DocumentEntryForm = ({
  open,
  onOpenChange,
  form,
  setForm,
  formError,
  isPending,
  onSave,
}: DocumentEntryFormProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent className='bg-[#18181b] border-[#494551] text-[#e6e0e9] flex flex-col'>
      <SheetHeader>
        <SheetTitle className='text-[#e6e0e9]'>Add Entry</SheetTitle>
      </SheetHeader>

      <div className='flex flex-col gap-5 flex-1 overflow-y-auto py-4'>
        <div className='flex flex-col gap-2'>
          <Label className='text-[#cbc4d2] text-xs uppercase tracking-wider'>
            Type
          </Label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm((f) => ({ ...f, type: e.target.value as DocumentType }))
            }
            className='w-full rounded-lg bg-black border border-[#494551]/60 text-[#e6e0e9] px-3 py-2 text-sm focus:outline-none focus:border-[#7c3aed]/60'
          >
            <option value='general'>General</option>
            <option value='bio'>Bio</option>
            <option value='project'>Project</option>
            <option value='techstack'>Tech Stack</option>
            <option value='contact'>Contact</option>
          </select>
        </div>

        <div className='flex flex-col gap-2'>
          <Label className='text-[#cbc4d2] text-xs uppercase tracking-wider'>
            Title{' '}
            <span className='text-[#494551] normal-case tracking-normal'>
              (optional)
            </span>
          </Label>
          <Input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder='e.g. Axon Project Overview'
            className='bg-white/4 border-[#494551]/60 text-[#e6e0e9] placeholder:text-[#494551] focus-visible:ring-[#7c3aed]/50'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Label className='text-[#cbc4d2] text-xs uppercase tracking-wider'>
            Tags{' '}
            <span className='text-[#494551] normal-case tracking-normal'>
              (optional, comma-separated)
            </span>
          </Label>
          <Input
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            placeholder='e.g. react, typescript, ai'
            className='bg-white/4 border-[#494551]/60 text-[#e6e0e9] placeholder:text-[#494551] focus-visible:ring-[#7c3aed]/50'
          />
        </div>

        <div className='flex flex-col gap-2 flex-1'>
          <Label className='text-[#cbc4d2] text-xs uppercase tracking-wider'>
            Content <span className='text-red-400'>*</span>
          </Label>
          <Textarea
            value={form.content}
            onChange={(e) =>
              setForm((f) => ({ ...f, content: e.target.value }))
            }
            placeholder='Paste the text the AI should know about...'
            className='bg-white/4 border-[#494551]/60 text-[#e6e0e9] placeholder:text-[#494551] focus-visible:ring-[#7c3aed]/50 resize-none min-h-64'
          />
          {formError && <p className='text-xs text-red-400'>{formError}</p>}
        </div>
      </div>

      <SheetFooter className='flex gap-2 pt-4 border-t border-[#494551]/40'>
        <Button
          variant='ghost'
          onClick={() => onOpenChange(false)}
          className='flex-1 text-[#938f99] hover:text-[#e6e0e9] cursor-pointer'
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          disabled={isPending}
          className='flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white cursor-pointer disabled:opacity-50'
        >
          {isPending ? 'Embedding...' : 'Save & Embed'}
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export default DocumentEntryForm;
