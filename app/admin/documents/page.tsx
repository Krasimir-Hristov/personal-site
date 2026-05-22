import AdminDocumentsClient from '@/features/admin/components/AdminDocumentsClient';
import { getDocuments } from '@/features/admin/lib/document-actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Knowledge Base — Admin',
};

const AdminDocumentsPage = async () => {
  const documents = await getDocuments();

  return <AdminDocumentsClient initialDocuments={documents} />;
};

export default AdminDocumentsPage;
