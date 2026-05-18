import { Resend } from 'resend';
import { z } from 'zod';
import { checkRateLimit } from '@/features/shared/lib/rate-limiter';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.enum([
    'General Inquiry',
    'Project Proposal',
    'Technical Support',
    'AI Consultation',
  ]),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0, { message: 'Bot detected' }),
});

export const POST = async (req: Request): Promise<Response> => {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'anonymous';

  if (!checkRateLimit(ip, 3)) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, subject, message } = parsed.data;

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    return Response.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const { error } = await resend.emails.send({
    from: 'Contact Form <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `[Contact] ${subject} — ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
  });

  if (error) {
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return Response.json({ success: true }, { status: 200 });
};
