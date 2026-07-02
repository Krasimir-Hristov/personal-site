import { sql } from '@/features/shared/lib/db';
import { embedText } from '@/features/chatbot/lib/embeddings';

export interface KnowledgeBaseChunk {
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
  source: 'documents' | 'projects';
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

  const [docRows, projRows] = await Promise.all([
    sql`
      SELECT content, metadata, similarity
      FROM match_documents(
        ${JSON.stringify(embedding)}::vector,
        ${threshold}::float,
        ${limit}::int
      )
    `,
    sql`
      SELECT title, description, tech_stack, github_url, demo_url, badge, category, similarity
      FROM match_projects(
        ${JSON.stringify(embedding)}::vector,
        ${threshold}::float,
        ${limit}::int
      )
    `,
  ]);

  const results: KnowledgeBaseChunk[] = [
    ...docRows.map((row) => ({
      content: row.content as string,
      metadata: (row.metadata as Record<string, unknown> | null) ?? {},
      similarity: Number(row.similarity),
      source: 'documents' as const,
    })),
    ...projRows.map((row) => ({
      content: [
        `Project: ${row.title}`,
        `Description: ${row.description}`,
        (row.badge as string | null) ? `Badge: ${row.badge}` : null,
        (row.tech_stack as string[] | null)?.length
          ? `Tech Stack: ${(row.tech_stack as string[]).join(', ')}`
          : null,
        (row.category as string[] | null)?.length
          ? `Category: ${(row.category as string[]).join(', ')}`
          : null,
        (row.github_url as string | null) ? `GitHub: ${row.github_url}` : null,
        (row.demo_url as string | null) ? `Demo: ${row.demo_url}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
      metadata: {
        title: row.title,
        type: 'project',
        tech_stack: row.tech_stack as string[] | null,
        category: row.category as string[] | null,
        github_url: row.github_url as string | null,
        demo_url: row.demo_url as string | null,
        badge: row.badge as string | null,
      },
      similarity: Number(row.similarity),
      source: 'projects' as const,
    })),
  ];

  // Sort by similarity descending to prioritize best matches from both sources
  results.sort((a, b) => b.similarity - a.similarity);
  return results.slice(0, limit);
};
