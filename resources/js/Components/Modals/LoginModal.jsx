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
      title="Welcome Back" 
      description="Log in to access your dashboard."
      size="sm"
    >
      <form onSubmit={submit} className="mt-6 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#E2E8F0]">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors"
            placeholder="name@company.com"
            autoComplete="username"
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-[#E2E8F0]">Password</label>
            <a href="#" className="text-xs text-[#6C3CE1] hover:text-[#E2E8F0] transition-colors">Forgot password?</a>
          </div>
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={data.remember}
            onChange={(e) => setData('remember', e.target.checked)}
            className="rounded border-[#2A2A3A] bg-[#1A1A28] text-[#6C3CE1] focus:ring-[#6C3CE1]"
          />
          <label htmlFor="remember" className="text-sm text-[#94A3B8]">Remember me for 30 days</label>
        </div>

        <button 
          type="submit" 
          disabled={processing}
          className="w-full bg-gradient-to-r from-[#6C3CE1] to-[#EC4899] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
        >
          {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log In"}
        </button>

        <p className="text-center text-sm text-[#94A3B8] mt-4">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToRegister} className="text-white hover:text-[#6C3CE1] transition-colors font-medium">
            Get Started
          </button>
        </p>
      </form>
    </AppModal>
  );
}
