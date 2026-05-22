import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from 'zod';
import { checkRateLimit } from '@/features/shared/lib/rate-limiter';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const POST = async (req: Request): Promise<Response> => {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'anonymous';

  if (!checkRateLimit(ip, 50)) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = z
    .object({ messages: z.array(z.unknown()).min(1) })
    .safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: 'Invalid input' }, { status: 400 });
  }

  const messages = parsed.data.messages as UIMessage[];

  const result = streamText({
    model: openrouter('deepseek/deepseek-v4-flash'),
    system: process.env.CHAT_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    temperature: 0.7,
    maxOutputTokens: 4096,
    maxRetries: 2,
  });

  return result.toUIMessageStreamResponse();
};
