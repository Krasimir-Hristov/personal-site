'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  createDocument,
  deleteDocument,
} from '@/features/admin/lib/document-actions';
import DocumentListItem from '@/features/admin/components/DocumentListItem';
import DocumentEntryForm, {
  type DocumentFormState,
} from '@/features/admin/components/DocumentEntryForm';
import type { Document } from '@/features/shared/types';

const EMPTY_FORM: DocumentFormState = {
  title: '',
  content: '',
  type: 'general',
  tags: '',
};

interface AdminDocumentsClientProps {
  initialDocuments: Document[];
}

const AdminDocumentsClient = ({
  initialDocuments,
}: AdminDocumentsClientProps) => {
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [formOpen, setFormOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saveError, setSaveError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [form, setForm] = useState<DocumentFormState>(EMPTY_FORM);
  const [formError, setFormError] = useState('');

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setFormError('');
    setSaveError('');
    setFormOpen(true);
  };

  const handleSave = () => {
    if (!form.content.trim()) {
      setFormError('Content is required.');
      return;
    }

    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const optimisticDoc: Document = {
      id: crypto.randomUUID(),
      title: form.title.trim() || 'Untitled',
      content: form.content.trim(),
      type: form.type,
      tags,
      createdAt: new Date().toISOString(),
    };

    setDocuments((prev) => [optimisticDoc, ...prev]);
    setFormOpen(false);

    startTransition(async () => {
      const result = await createDocument(
        optimisticDoc.title,
        optimisticDoc.content,
        form.type,
        tags,
      );

      if (!result.success) {
        setDocuments((prev) => prev.filter((d) => d.id !== optimisticDoc.id));
        setSaveError(result.error ?? 'Failed to save entry.');
      } else {
        router.refresh();
      }
    });
  };

  const handleDelete = (id: string) => {
    const snapshot = documents;
    setDeleteError('');
    setDeletingId(id);
    setDocuments((prev) => prev.filter((d) => d.id !== id));

    startTransition(async () => {
      const result = await deleteDocument(id);
      if (!result.success) {
        setDocuments(snapshot);
        setDeleteError(result.error ?? 'Failed to delete entry.');
      }
      setDeletingId(null);
    });
  };

  return (
    <>
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
          disabled={isPending}
          className='flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white cursor-pointer'
        >
          <Plus size={16} />
          Add Entry
        </Button>
      </div>

      {saveError && (
        <p className='text-sm text-red-400 mb-4 px-1'>{saveError}</p>
      )}
      {deleteError && (
        <p className='text-sm text-red-400 mb-4 px-1'>{deleteError}</p>
      )}

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
            <DocumentListItem
              key={doc.id}
              doc={doc}
              isDeleting={deletingId === doc.id}
              isPending={isPending}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <DocumentEntryForm
        open={formOpen}
        onOpenChange={setFormOpen}
        form={form}
        setForm={setForm}
        formError={formError}
        isPending={isPending}
        onSave={handleSave}
      />
    </>
  );
};

export default AdminDocumentsClient;
