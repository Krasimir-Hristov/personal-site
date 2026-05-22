const EMBEDDING_MODEL = 'openai/text-embedding-3-small';

export const embedText = async (text: string): Promise<number[]> => {
  const res = await fetch('https://openrouter.ai/api/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: text }),
  });

  if (!res.ok) throw new Error(`Embedding API error: ${res.status}`);

  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return json.data[0].embedding;
};
