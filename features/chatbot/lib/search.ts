import { sql } from '@/features/shared/lib/db';
import { embedText } from '@/features/chatbot/lib/embeddings';

export interface KnowledgeBaseChunk {
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
}

interface SearchOptions {
  threshold?: number;
  limit?: number;
}

export const searchKnowledgeBase = async (
  query: string,
  { threshold = 0.4, limit = 5 }: SearchOptions = {},
): Promise<KnowledgeBaseChunk[]> => {
  const embedding = await embedText(query);

  const rows = await sql`
    SELECT content, metadata, similarity
    FROM match_documents(
      ${JSON.stringify(embedding)}::vector,
      ${threshold}::float,
      ${limit}::int
    )
  `;

  return rows.map((row) => ({
    content: row.content as string,
    metadata: (row.metadata as Record<string, unknown> | null) ?? {},
    similarity: Number(row.similarity),
  }));
};
