import type { DocumentType } from '@/features/shared/types';

export const TYPE_LABELS: Record<DocumentType, string> = {
  bio: 'Bio',
  project: 'Project',
  techstack: 'Tech Stack',
  contact: 'Contact',
  general: 'General',
};

export const TYPE_COLORS: Record<DocumentType, string> = {
  bio: 'bg-[#06b6d4]/10 text-[#06b6d4]',
  project: 'bg-[#7c3aed]/10 text-[#a78bfa]',
  techstack: 'bg-[#4ade80]/10 text-[#4ade80]',
  contact: 'bg-[#facc15]/10 text-[#facc15]',
  general: 'bg-white/5 text-[#938f99]',
};
