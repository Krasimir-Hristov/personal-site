import {
  streamText,
  convertToModelMessages,
  tool,
  stepCountIs,
  type UIMessage,
} from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from 'zod';
import { Resend } from 'resend';
import { checkRateLimit } from '@/features/shared/lib/rate-limiter';
import { searchKnowledgeBase } from '@/features/chatbot/lib/search';
import { buildSystemPrompt } from '@/features/chatbot/lib/system-prompt';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const CHAT_MODEL = process.env.CHAT_MODEL ?? 'deepseek/deepseek-v4-flash';

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

  const tools = {
    searchKnowledgeBase: tool({
      description:
        "Semantic vector search over Krasimir's knowledge base — the ONLY source of facts about him (projects, tech stack, contact, bio, work history). Call this whenever the user asks something specific you have not retrieved earlier in this conversation. Reuse prior results from the same conversation instead of calling again for the same topic.",
      inputSchema: z.object({
        query: z
          .string()
          .min(2)
          .describe(
            "Focused natural-language search query, e.g. 'AI Savage project architecture' or 'Krasimir contact info' or 'experience with LangGraph'.",
          ),
      }),
      execute: async ({ query }) => {
        const chunks = await searchKnowledgeBase(query, {
          threshold: 0.4,
          limit: 5,
        });

        if (chunks.length === 0) {
          return {
            results: [],
            message:
              'No relevant entries found. Tell the user you do not have that information and suggest contacting Krasimir via the contact form.',
          };
        }

        return {
          results: chunks.map((c) => ({
            title: (c.metadata.title as string | undefined) ?? 'Untitled entry',
            type: (c.metadata.type as string | undefined) ?? 'general',
            content: c.content,
          })),
        };
      },
    }),

    sendEmail: tool({
      description:
        "Send a message to Krasimir on the user's behalf via email. Use ONLY when the user explicitly asks you to contact, email, or message Krasimir. Before calling, make sure you have the user's full name, reply-to email, and the message body — ask for any missing field first.",
      inputSchema: z.object({
        senderName: z
          .string()
          .min(2)
          .max(100)
          .describe("The user's full name."),
        senderEmail: z
          .string()
          .email()
          .describe("The user's reply-to email address."),
        subject: z
          .string()
          .min(2)
          .max(200)
          .describe('Short subject line summarising the message.'),
        message: z
          .string()
          .min(10)
          .max(5000)
          .describe('The full message body the user wants to send.'),
      }),
      execute: async ({ senderName, senderEmail, subject, message }) => {
        const to = process.env.CONTACT_EMAIL;
        if (!to) {
          return {
            success: false,
            error: 'Email service is not configured. Please try again later.',
          };
        }

        const { error } = await resend.emails.send({
          from: 'AI Assistant <onboarding@resend.dev>',
          to,
          replyTo: senderEmail,
          subject: `[AI Chat] ${subject} — ${senderName}`,
          text: `Sent via the AI assistant on krasimirxristov.com\n\nName: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
        });

        if (error) {
          return {
            success: false,
            error: 'Failed to send the message. Please try again later.',
          };
        }

        return {
          success: true,
          message: `Message delivered to Krasimir. He will reply to ${senderEmail}.`,
        };
      },
    }),
  };

  let modelMessages;
  try {
    modelMessages = await convertToModelMessages(messages);
  } catch (err) {
    console.error('[chat] convertToModelMessages failed:', err);
    return Response.json({ error: 'Invalid message history' }, { status: 400 });
  }

  try {
    const result = streamText({
      model: openrouter(CHAT_MODEL),
      system: buildSystemPrompt(),
      messages: modelMessages,
      tools,
      stopWhen: stepCountIs(5),
      temperature: 0.6,
      maxOutputTokens: 1024,
      maxRetries: 2,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error('[chat] streamText failed:', err);
    return Response.json(
      { error: 'Failed to generate response' },
      { status: 500 },
    );
  }
};
