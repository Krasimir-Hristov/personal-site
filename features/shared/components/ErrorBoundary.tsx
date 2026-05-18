'use client';

import { Component, ReactNode } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

// Error boundaries require a class component — React constraint.
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className='relative flex items-center justify-center min-h-[40vh] px-8 py-16 overflow-hidden'>
          {/* Background glow */}
          <div
            className='absolute inset-0 pointer-events-none'
            aria-hidden='true'
          >
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full' />
          </div>

          <div className='relative z-10 glass-card rounded-2xl p-10 max-w-lg w-full flex flex-col items-center gap-6 text-center'>
            {/* Icon */}
            <div className='w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center'>
              <AlertTriangle className='w-7 h-7 text-red-400' />
            </div>

            {/* Label */}
            <span className='font-mono text-[10px] text-red-400 uppercase tracking-widest'>
              System Failure
            </span>

            {/* Heading */}
            <div className='flex flex-col gap-2'>
              <h2 className='text-2xl font-bold text-[#e6e0e9]'>
                Connection Interrupted
              </h2>
              <p className='text-sm text-[#cbc4d2] leading-relaxed'>
                An unexpected error occurred while rendering this component. You
                can try restarting the module or return to base.
              </p>
            </div>

            {/* Error detail */}
            {this.state.message && (
              <div className='w-full px-4 py-3 rounded-lg bg-[#09090b]/60 border border-[#494551]/40 text-left'>
                <p className='font-mono text-[10px] text-[#494551] uppercase tracking-widest mb-1'>
                  Error Log
                </p>
                <p className='font-mono text-xs text-red-400 break-all'>
                  {this.state.message}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className='flex gap-3 flex-wrap justify-center'>
              <button
                onClick={this.reset}
                className='inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#06b6d4] text-[#09090b] text-sm font-semibold hover:bg-[#06b6d4]/90 active:scale-[0.98] transition-all'
              >
                <RefreshCw className='w-4 h-4' />
                Restart Module
              </button>
              <Link
                href='/'
                className='inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#494551]/60 text-sm text-[#cbc4d2] hover:text-[#e6e0e9] hover:border-[#06b6d4]/40 transition-colors'
              >
                Return to Base
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
