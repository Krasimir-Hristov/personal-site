import { searchKnowledgeBase } from '@/features/chatbot/lib/search';
import { embedText } from '@/features/chatbot/lib/embeddings';
import { sql } from '@/features/shared/lib/db';

export const GET = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const query = url.searchParams.get('q') ?? 'SavageAI';

  try {
    // 1. Test embedding
    const embedding = await embedText(query);
    const dims = embedding.length;
    const firstFew = embedding.slice(0, 3);

    // 2. Test raw SQL
    const embeddingStr = `[${embedding.join(',')}]`;
    const rows = await sql`
      SELECT content, metadata, 1 - (embedding <=> ${embeddingStr}::vector) AS similarity
      FROM documents
      WHERE 1 - (embedding <=> ${embeddingStr}::vector) > 0.2
      ORDER BY similarity DESC
      LIMIT 5
    `;

    // 3. Test via function
    const functionRows = await sql`
      SELECT content, metadata, similarity
      FROM match_documents(${embeddingStr}::vector, 0.2::float, 5::int)
    `;

    // 4. Check table count
    const countResult = await sql`SELECT COUNT(*) as cnt FROM documents`;

    return Response.json({
      query,
      embedding: { dims, firstFew },
      rawQuery: rows.map((r: any) => ({
        content: (r.content ?? '').slice(0, 200),
        similarity: r.similarity,
        metadata: r.metadata,
      })),
      functionQuery: functionRows.map((r: any) => ({
        content: (r.content ?? '').slice(0, 200),
        similarity: r.similarity,
        metadata: r.metadata,
      })),
      totalDocuments: countResult[0]?.cnt ?? 0,
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
};
