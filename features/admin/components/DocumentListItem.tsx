'use client';

import { useState } from 'react';
import { FileText, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  TYPE_LABELS,
  TYPE_COLORS,
} from '@/features/admin/lib/document-constants';
import type { Document } from '@/features/shared/types';

interface DocumentListItemProps {
  doc: Document;
  isDeleting: boolean;
  isPending: boolean;
  onDelete: (id: string) => void;
}

const DocumentListItem = ({
  doc,
  isDeleting,
  isPending,
  onDelete,
}: DocumentListItemProps) => {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className='flex items-start gap-4 p-4 rounded-xl border border-[#494551]/40 bg-white/2 hover:bg-white/4 transition-colors'>
      <div className='shrink-0 w-9 h-9 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center mt-0.5'>
        <FileText size={16} className='text-[#7c3aed]' />
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2 mb-1 flex-wrap'>
          <p className='text-sm font-medium text-[#e6e0e9] truncate'>
            {doc.title}
          </p>
          <span
            className={cn(
              'shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-md',
              TYPE_COLORS[doc.type],
            )}
          >
            {TYPE_LABELS[doc.type]}
          </span>
          <span className='shrink-0 text-[10px] text-[#494551] font-mono'>
            1 embedding
          </span>
        </div>

        <p className='text-xs text-[#938f99] line-clamp-2 leading-relaxed'>
          {doc.content}
        </p>

        {doc.tags.length > 0 && (
          <div className='flex flex-wrap gap-1 mt-2'>
            {doc.tags.map((tag) => (
              <span
                key={tag}
                className='text-[10px] px-1.5 py-0.5 rounded bg-white/4 text-[#938f99]'
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className='text-[10px] text-[#494551] mt-2'>
          {new Date(doc.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>

      {confirming ? (
        <div className='shrink-0 flex flex-col items-end gap-1'>
          <p className='text-[10px] text-[#938f99] whitespace-nowrap'>
            Delete?
          </p>
          <div className='flex gap-1'>
            <button
              onClick={() => setConfirming(false)}
              className='text-[10px] px-2 py-1 rounded-md text-[#938f99] hover:text-[#e6e0e9] hover:bg-white/8 transition-colors cursor-pointer'
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setConfirming(false);
                onDelete(doc.id);
              }}
              disabled={isDeleting || isPending}
              className='text-[10px] px-2 py-1 rounded-md bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          disabled={isDeleting || isPending}
          className={cn(
            'shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer',
            'text-[#938f99] hover:text-red-400 hover:bg-red-400/10',
            'disabled:opacity-40 disabled:cursor-not-allowed',
          )}
          aria-label='Delete entry'
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
};

export default DocumentListItem;
