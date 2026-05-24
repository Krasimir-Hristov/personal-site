'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormStatus = 'idle' | 'pending' | 'success' | 'error';

const SUBJECTS = [
  'General Inquiry',
  'Project Proposal',
  'Technical Support',
  'AI Consultation',
] as const;

const inputClass =
  'w-full bg-[#09090b]/60 border border-[#494551]/40 rounded-lg px-4 py-3 text-sm text-[#e6e0e9] placeholder:text-[#8a8494] focus:outline-none focus:border-[#06b6d4]/60 focus:ring-1 focus:ring-[#06b6d4]/30 transition-colors';

const labelClass =
  'block font-mono text-[10px] text-[#06b6d4] uppercase tracking-widest mb-2';

const ContactForm = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [, startTransition] = useTransition();
  const [optimisticStatus, addOptimisticStatus] = useOptimistic(
    status,
    (_, next: FormStatus) => next,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    startTransition(async () => {
      addOptimisticStatus('pending');
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (res.status === 429) {
          setStatus('error');
          setErrorMsg(
            'Too many transmissions. Please wait before trying again.',
          );
          return;
        }

        if (!res.ok) {
          const json = (await res.json()) as { error?: string };
          setStatus('error');
          setErrorMsg(json.error ?? 'Transmission failed. Please try again.');
          return;
        }

        setStatus('success');
        form.reset();
      } catch {
        setStatus('error');
        setErrorMsg(
          'Network error. Please check your connection and try again.',
        );
      }
    });
  };

  if (optimisticStatus === 'success') {
    return (
      <div className='glass-card rounded-2xl p-10 flex flex-col items-center justify-center gap-4 min-h-105 text-center'>
        <div className='w-14 h-14 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 flex items-center justify-center'>
          <CheckCircle className='w-7 h-7 text-[#06b6d4]' />
        </div>
        <p className='font-mono text-xs text-[#06b6d4] uppercase tracking-widest'>
          Transmission Complete
        </p>
        <h3 className='text-xl font-semibold text-[#e6e0e9]'>
          Message Received
        </h3>
        <p className='text-sm text-[#cbc4d2] max-w-xs'>
          Your transmission has been routed successfully. I&apos;ll respond
          within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className='mt-2 font-mono text-xs text-[#8a8494] hover:text-[#cbc4d2] transition-colors underline underline-offset-4'
        >
          Send another transmission
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='glass-card rounded-2xl p-8 flex flex-col gap-5'
    >
      {/* Honeypot — hidden from real users */}
      <input
        type='text'
        name='honeypot'
        defaultValue=''
        aria-hidden='true'
        tabIndex={-1}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          height: 0,
        }}
      />

      {/* Row: name + email */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
        <div>
          <label htmlFor='name' className={labelClass}>
            Identity Tag
          </label>
          <input
            id='name'
            name='name'
            type='text'
            required
            minLength={2}
            maxLength={100}
            placeholder='Your name'
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor='email' className={labelClass}>
            Communication Port
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            placeholder='your@email.com'
            className={inputClass}
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor='subject' className={labelClass}>
          Encryption Protocol
        </label>
        <select
          id='subject'
          name='subject'
          required
          defaultValue=''
          className={cn(inputClass, 'appearance-none cursor-pointer')}
        >
          <option value='' disabled className='text-[#494551] bg-[#09090b]'>
            Select a subject
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s} className='bg-[#09090b] text-[#e6e0e9]'>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor='message' className={labelClass}>
          Data Payload
        </label>
        <textarea
          id='message'
          name='message'
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder='Transmission content goes here...'
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      {/* Error */}
      {optimisticStatus === 'error' && (
        <div className='flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400'>
          <AlertCircle className='w-4 h-4 shrink-0' />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type='submit'
        disabled={optimisticStatus === 'pending'}
        className='flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-lg bg-[#06b6d4] text-[#09090b] font-semibold text-sm hover:bg-[#06b6d4]/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed'
      >
        {optimisticStatus === 'pending' ? (
          <>
            <span className='w-4 h-4 border-2 border-[#09090b]/30 border-t-[#09090b] rounded-full animate-spin' />
            Sending...
          </>
        ) : (
          <>
            Send Transmission
            <Send className='w-4 h-4' />
          </>
        )}
      </button>

      <p className='text-center text-[10px] text-[#8a8494] leading-relaxed'>
        All transmissions are processed via secure neural relays.{' '}
        <br className='hidden sm:block' />
        Average response latency: &lt; 24h.
      </p>
    </form>
  );
};

export default ContactForm;
