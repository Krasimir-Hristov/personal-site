'use server';

import { sql } from '@/features/shared/lib/db';
import { embedText } from '@/features/chatbot/lib/embeddings';
import type { Document, DocumentType } from '@/features/shared/types';

export const getDocuments = async (): Promise<Document[]> => {
  const rows = await sql`
    SELECT id, content, metadata
    FROM documents
    ORDER BY id DESC
  `;

  return rows.map((row) => {
    const meta = row.metadata as {
      title?: string;
      type?: DocumentType;
      sourceId?: string;
      tags?: string[];
      createdAt?: string;
    } | null;

    return {
      id: meta?.sourceId ?? String(row.id),
      title: meta?.title ?? 'Untitled',
      content: row.content as string,
      type: meta?.type ?? 'general',
      tags: meta?.tags ?? [],
      createdAt: meta?.createdAt ?? new Date().toISOString(),
    };
  });
};

export const createDocument = async (
  title: string,
  content: string,
  type: DocumentType,
  tags: string[],
): Promise<{ success: boolean; error?: string }> => {
  try {
    const sourceId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    // Prepend context so the embedding captures type + title semantics
    const embedInput = `Type: ${type}\nTitle: ${title}\n\n${content}`;
    const embedding = await embedText(embedInput);

    const metadata = { title, type, sourceId, tags, createdAt };

    await sql`
      INSERT INTO documents (content, metadata, embedding)
      VALUES (
        ${content},
        ${JSON.stringify(metadata)},
        ${JSON.stringify(embedding)}::vector
      )
    `;

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to save entry. Please try again.' };
  }
};

export const deleteDocument = async (
  sourceId: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    await sql`
      DELETE FROM documents
      WHERE metadata->>'sourceId' = ${sourceId}
    `;
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to delete entry.' };
  }
};
