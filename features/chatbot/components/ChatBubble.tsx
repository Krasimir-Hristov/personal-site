'use client';

import { useRef, useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Bot, X, Send, Minimize2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { cn } from '@/lib/utils';

const WELCOME_MESSAGE =
  "Hi! I'm Krasimir's AI assistant. Ask me anything about his projects, skills, or how to get in touch.";

const ChatBubble = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const isLoading = status === 'streaming' || status === 'submitted';
  const [input, setInput] = useState('');

  // Hide on admin pages
  if (pathname.startsWith('/admin')) return null;

  // Auto-scroll to bottom when messages change
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '42px';
    }
    sendMessage({ text });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <m.div
            key='chat-panel'
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className='fixed bottom-24 right-5 z-50 w-92.5 max-w-[calc(100vw-2.5rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-[#494551]/60'
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className='flex items-center gap-3 px-4 py-3 bg-[#18181b] border-b border-[#494551]/60 shrink-0'>
              <div className='w-8 h-8 rounded-full bg-[#06b6d4]/15 flex items-center justify-center shrink-0'>
                <Bot size={16} className='text-[#06b6d4]' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-semibold text-[#e6e0e9] leading-none'>
                  AI Assistant
                </p>
                <p className='text-[10px] text-[#06b6d4] mt-0.5 font-mono uppercase tracking-widest'>
                  Ask me anything
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className='w-7 h-7 rounded-lg flex items-center justify-center text-[#cbc4d2] hover:text-[#e6e0e9] hover:bg-white/8 transition-colors cursor-pointer'
                aria-label='Close chat'
              >
                <Minimize2 size={14} />
              </button>
            </div>

            {/* Messages area */}
            <div className='flex-1 overflow-y-auto scrollbar-none bg-[#09090b] px-4 py-5 flex flex-col gap-4'>
              {/* Welcome bubble */}
              <div className='flex gap-2.5 items-start'>
                <div className='shrink-0 w-7 h-7 rounded-full bg-[#06b6d4]/10 flex items-center justify-center mt-0.5'>
                  <Bot size={13} className='text-[#06b6d4]' />
                </div>
                <div className='max-w-[85%] rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm leading-relaxed bg-white/5 text-[#e6e0e9] border border-[#494551]/40'>
                  {WELCOME_MESSAGE}
                </div>
              </div>

              {/* Conversation messages */}
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                const text = msg.parts
                  .filter((p) => p.type === 'text')
                  .map((p) => (p.type === 'text' ? p.text : ''))
                  .join('');

                const isSearching = msg.parts.some(
                  (p) =>
                    (p.type === 'tool-searchKnowledgeBase' ||
                      p.type.startsWith('tool-')) &&
                    (p as { state?: string }).state !== 'output-available',
                );

                return (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex gap-2.5 items-start',
                      isUser ? 'flex-row-reverse' : 'flex-row',
                    )}
                  >
                    {!isUser && (
                      <div className='shrink-0 w-7 h-7 rounded-full bg-[#06b6d4]/10 flex items-center justify-center mt-0.5'>
                        <Bot size={13} className='text-[#06b6d4]' />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[85%] flex flex-col gap-1.5',
                        isUser ? 'items-end' : 'items-start',
                      )}
                    >
                      {isSearching && (
                        <p className='text-[10px] text-[#06b6d4] flex items-center gap-1 px-1'>
                          <span className='w-1 h-1 rounded-full bg-[#06b6d4] animate-pulse inline-block' />
                          Searching knowledge base…
                        </p>
                      )}
                      {text && (
                        <div
                          className={cn(
                            'rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap',
                            isUser
                              ? 'bg-[#7c3aed]/20 text-[#e6e0e9] rounded-tr-sm'
                              : 'bg-white/5 text-[#e6e0e9] border border-[#494551]/40 rounded-tl-sm',
                          )}
                        >
                          {text}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading &&
                (messages.length === 0 ||
                  messages[messages.length - 1]?.role === 'user') && (
                  <div className='flex gap-2.5 items-start'>
                    <div className='shrink-0 w-7 h-7 rounded-full bg-[#06b6d4]/10 flex items-center justify-center mt-0.5'>
                      <Bot size={13} className='text-[#06b6d4]' />
                    </div>
                    <div className='rounded-2xl rounded-tl-sm px-3.5 py-3 bg-white/5 border border-[#494551]/40 flex items-center gap-1'>
                      <span className='w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-bounce [animation-delay:0ms]' />
                      <span className='w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-bounce [animation-delay:120ms]' />
                      <span className='w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-bounce [animation-delay:240ms]' />
                    </div>
                  </div>
                )}

              {error && (
                <p className='text-xs text-red-400 text-center px-2'>
                  Something went wrong. Please try again.
                </p>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className='bg-[#18181b] border-t border-[#494551]/60 px-3.5 py-3 shrink-0'>
              <div className='flex items-end gap-2'>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  rows={1}
                  placeholder='Type a message…'
                  className={cn(
                    'flex-1 resize-none rounded-xl bg-white/5 border border-[#494551]/60 px-3.5 py-2.5',
                    'text-sm text-[#e6e0e9] placeholder:text-[#494551] leading-relaxed',
                    'focus:outline-none focus:border-[#06b6d4]/60 focus:ring-1 focus:ring-[#06b6d4]/30',
                    'transition-colors max-h-28 overflow-y-auto scrollbar-none disabled:opacity-50',
                  )}
                  style={{ height: '42px' }}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = 'auto';
                    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    'shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all',
                    'bg-[#06b6d4] text-[#09090b] cursor-pointer',
                    'hover:bg-[#0891b2] active:scale-95',
                    'disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100',
                  )}
                  aria-label='Send message'
                >
                  <Send size={14} />
                </button>
              </div>
              <p className='text-[10px] text-[#494551] mt-2 text-center'>
                AI can make mistakes. Verify important info.
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <m.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
        className={cn(
          'fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-lg cursor-pointer',
          'flex items-center justify-center transition-colors',
          open
            ? 'bg-[#18181b] border border-[#494551]/60 text-[#cbc4d2] hover:text-[#e6e0e9]'
            : 'bg-[#06b6d4] text-[#09090b] hover:bg-[#0891b2]',
        )}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode='wait' initial={false}>
          {open ? (
            <m.span
              key='close'
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </m.span>
          ) : (
            <m.span
              key='bot'
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Bot size={22} />
            </m.span>
          )}
        </AnimatePresence>
      </m.button>
    </>
  );
};

export default ChatBubble;
