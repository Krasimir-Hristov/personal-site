'use client';

import { useState } from 'react';
import { loginAction } from '@/features/admin/lib/auth-actions';
import { Button } from '@/components/ui/button';

const LoginForm = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await loginAction(password);

    // If loginAction returns, it means auth failed (success redirects automatically)
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1.5'>
        <label htmlFor='password' className='text-sm text-[#cbc4d2]'>
          Password
        </label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete='current-password'
          className='w-full px-3 py-2 rounded-lg bg-white/05 border border-[#494551] text-[#e6e0e9] focus:outline-none focus:border-[#06b6d4] transition-colors'
        />
      </div>

      {error && <p className='text-sm text-red-400'>{error}</p>}

      <Button
        type='submit'
        disabled={loading}
        className='w-full mt-2 bg-[#06b6d4] hover:bg-[#0891b2] text-white'
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
};

export default LoginForm;
