'use client';

import { useState, useTransition } from 'react';
import { Plus, Trash2, FileText } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import type { Document } from '@/features/shared/types';

interface AdminDocumentsClientProps {
  initialDocuments: Document[];
}

const AdminDocumentsClient = ({
  initialDocuments,
}: AdminDocumentsClientProps) => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [formOpen, setFormOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  const openAdd = () => {
    setForm({ title: '', content: '' });
    setError('');
    setFormOpen(true);
  };

  const handleSave = () => {
    if (!form.content.trim()) {
      setError('Content is required.');
      return;
    }
    // TODO: call server action to save to Neon + embed
    startTransition(() => {
      const newDoc: Document = {
        id: crypto.randomUUID(),
        title: form.title.trim() || 'Untitled',
        content: form.content.trim(),
        createdAt: new Date().toISOString(),
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setFormOpen(false);
    });
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    // TODO: call server action to delete from Neon
    startTransition(() => {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      setDeletingId(null);
    });
  };

  return (
    <>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-xl font-semibold text-[#e6e0e9]'>
            Knowledge Base
          </h1>
          <p className='text-sm text-[#938f99] mt-0.5'>
            Text entries the AI bot uses to answer questions.
          </p>
        </div>
        <Button
          onClick={openAdd}
          className='flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white cursor-pointer'
        >
          <Plus size={16} />
          Add Entry
        </Button>
      </div>

      {/* List */}
      {documents.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 text-center border border-dashed border-[#494551]/60 rounded-xl'>
          <FileText size={36} className='text-[#494551] mb-3' />
          <p className='text-[#938f99] text-sm'>No entries yet.</p>
          <p className='text-[#494551] text-xs mt-1'>
            Add text entries for the AI to learn from.
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          {documents.map((doc) => (
            <div
              key={doc.id}
              className='flex items-start gap-4 p-4 rounded-xl border border-[#494551]/40 bg-white/02 hover:bg-white/04 transition-colors'
            >
              <div className='shrink-0 w-9 h-9 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center mt-0.5'>
                <FileText size={16} className='text-[#7c3aed]' />
              </div>

              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-[#e6e0e9] truncate'>
                  {doc.title}
                </p>
                <p className='text-xs text-[#938f99] mt-1 line-clamp-2 leading-relaxed'>
                  {doc.content}
                </p>
                <p className='text-[10px] text-[#494551] mt-2'>
                  {new Date(doc.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <button
                onClick={() => handleDelete(doc.id)}
                disabled={deletingId === doc.id || isPending}
                className={cn(
                  'shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer',
                  'text-[#938f99] hover:text-red-400 hover:bg-red-400/10',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                )}
                aria-label='Delete entry'
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Sheet */}
      <Sheet open={formOpen} onOpenChange={setFormOpen}>
        <SheetContent className='bg-[#18181b] border-[#494551] text-[#e6e0e9] flex flex-col'>
          <SheetHeader>
            <SheetTitle className='text-[#e6e0e9]'>Add Entry</SheetTitle>
          </SheetHeader>

          <div className='flex flex-col gap-5 flex-1 overflow-y-auto py-4'>
            {/* Title */}
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
                className='bg-white/04 border-[#494551]/60 text-[#e6e0e9] placeholder:text-[#494551] focus-visible:ring-[#7c3aed]/50'
              />
            </div>

            {/* Content */}
            <div className='flex flex-col gap-2 flex-1'>
              <Label className='text-[#cbc4d2] text-xs uppercase tracking-wider'>
                Content <span className='text-red-400'>*</span>
              </Label>
              <Textarea
                value={form.content}
                onChange={(e) => {
                  setForm((f) => ({ ...f, content: e.target.value }));
                  if (error) setError('');
                }}
                placeholder='Paste the text the AI should know about…'
                className='bg-white/04 border-[#494551]/60 text-[#e6e0e9] placeholder:text-[#494551] focus-visible:ring-[#7c3aed]/50 resize-none flex-1 min-h-64'
              />
              {error && <p className='text-xs text-red-400'>{error}</p>}
            </div>
          </div>

          <SheetFooter className='flex gap-2 pt-4 border-t border-[#494551]/40'>
            <Button
              variant='ghost'
              onClick={() => setFormOpen(false)}
              className='flex-1 text-[#938f99] hover:text-[#e6e0e9] hover:bg-white/06 cursor-pointer'
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending}
              className='flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white cursor-pointer disabled:opacity-50'
            >
              {isPending ? 'Saving…' : 'Save'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminDocumentsClient;
