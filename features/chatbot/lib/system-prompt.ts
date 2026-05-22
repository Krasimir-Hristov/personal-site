/**
 * Builds the chat system prompt by combining:
 * 1. The user-authored base prompt from `CHAT_SYSTEM_PROMPT` env var
 *    (defines personality, language, content policy, strict-grounding rules).
 * 2. Tool-usage rules appended below — these are implementation-bound and
 *    should not live in the env var.
 *
 * All factual data (contact, projects, bio) lives in the Neon vector DB and
 * is fetched at runtime via `searchKnowledgeBase`. Nothing factual is hardcoded
 * here, so the bot stays grounded in the knowledge base.
 */
export const buildSystemPrompt = (): string => {
  const base = process.env.CHAT_SYSTEM_PROMPT ?? '';

  const toolRules = `## Tool usage rules

You have access to two tools:

1. \`searchKnowledgeBase\` — semantic vector search over Krasimir's knowledge base. This is the ONLY source of facts about Krasimir (projects, tech stack, contact, bio, work history). Use it whenever the user asks something specific that you have not already retrieved earlier in this conversation.
2. \`sendEmail\` — send a message to Krasimir on the user's behalf. Use ONLY when the user explicitly asks you to contact / email / message Krasimir. Before calling, make sure you have the user's full name, reply-to email, and the message body — ask for whatever is missing.

### Critical behaviour
- **Reuse prior tool results.** If \`searchKnowledgeBase\` already returned the relevant info earlier in this conversation, REUSE it. Do NOT call the same tool again for the same topic — it wastes time and tokens.
- **Group related sub-questions into one search.** Prefer a single focused query over multiple narrow ones.
- **If the knowledge base returns nothing relevant**, tell the user honestly that you don't have that information and suggest they reach out via the contact form.

### Linking to the contact form
- Whenever you mention how to contact Krasimir, or the user asks to get in touch, ALWAYS include this markdown link in your reply: \`[Open the contact form](/#contact)\`.
- This is an internal link — the chat UI will route it as in-app navigation in the same tab. Do NOT use HTML \`target="_blank"\` or absolute URLs for it.
- Alongside the link, also include the email address (from the knowledge base) so the user can copy it directly.

### Formatting
- Use markdown: short paragraphs, bullet lists for multiple items, **bold** for emphasis.
- Keep answers tight — 2–4 short paragraphs unless the user asks for depth.`;

  return base ? `${base}\n\n${toolRules}` : toolRules;
};
