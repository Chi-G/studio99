import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { AppModal } from '@/Components/ui/app-modal';
import { Loader2 } from 'lucide-react';

export function LoginModal({ open, onClose, onSwitchToRegister }) {
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    if (open) {
      clearErrors();
    } else {
      reset('password');
    }
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    post('/login', {
      onSuccess: () => onClose(),
    });
  };

  return (
    <AppModal 
      open={open} 
      onClose={onClose} 
      title="Welcome Back to Studio99 Digital" 
      description="Sign in to manage projects, track progress, communicate with our team, and access your deliverables—all in one place"
      size="sm"
    >
      <form onSubmit={submit} className="mt-6 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
            placeholder="name@company.com"
            autoComplete="username"
          />
          {errors.email && <span className="text-brand-red text-xs">{errors.email}</span>}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-white">Password</label>
            <a href="#" className="text-xs text-brand-red hover:text-red-400 transition-colors">Forgot password?</a>
          </div>
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && <span className="text-brand-red text-xs">{errors.password}</span>}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={data.remember}
            onChange={(e) => setData('remember', e.target.checked)}
            className="rounded border-bg-border bg-bg-base text-brand-red focus:ring-brand-red"
          />
          <label htmlFor="remember" className="text-sm text-text-secondary">Remember me for 30 days</label>
        </div>

        <button 
          type="submit" 
          disabled={processing}
          className="w-full bg-brand-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50 mt-2"
        >
          {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log In"}
        </button>

        <p className="text-center text-sm text-text-secondary mt-4">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToRegister} className="text-white hover:text-brand-red transition-colors font-bold">
            Get Started
          </button>
        </p>
      </form>
    </AppModal>
  );
}
