import AdminDocumentsClient from '@/features/admin/components/AdminDocumentsClient';
import type { Document } from '@/features/shared/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Knowledge Base — Admin',
};

// TODO: fetch real documents from Neon when server actions are ready
const getDocuments = async (): Promise<Document[]> => {
  return [];
};

const AdminDocumentsPage = async () => {
  const documents = await getDocuments();

  return <AdminDocumentsClient initialDocuments={documents} />;
};

export default AdminDocumentsPage;
