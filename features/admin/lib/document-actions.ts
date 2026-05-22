'use server';

import { sql } from '@/features/shared/lib/db';
import type { Document, DocumentType } from '@/features/shared/types';

const embedText = async (text: string): Promise<number[]> => {
  const res = await fetch('https://openrouter.ai/api/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/text-embedding-3-small',
      input: text,
    }),
  });

  if (!res.ok) throw new Error(`Embedding API error: ${res.status}`);

  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return json.data[0].embedding;
};

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
