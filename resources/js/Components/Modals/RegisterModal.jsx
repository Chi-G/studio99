import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { AppModal } from '@/Components/ui/app-modal';
import { Loader2 } from 'lucide-react';

export function RegisterModal({ open, onClose, onSwitchToLogin }) {
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    if (open) {
      clearErrors();
    } else {
      reset('password', 'password_confirmation');
    }
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    post('/register', {
      onSuccess: () => onClose(),
    });
  };

  return (
    <AppModal 
      open={open} 
      onClose={onClose} 
      title="Create an Account" 
      description="Join Studio99 and elevate your digital presence."
      size="md"
    >
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#E2E8F0]">Full Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors"
            placeholder="Jane Doe"
            autoComplete="name"
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E2E8F0]">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors"
              placeholder="jane@company.com"
              autoComplete="username"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E2E8F0]">Phone (Optional)</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
              className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors"
              placeholder="+234..."
              autoComplete="tel"
            />
            {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E2E8F0]">Password</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E2E8F0]">Confirm Password</label>
            <input
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password_confirmation && <span className="text-red-500 text-xs">{errors.password_confirmation}</span>}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={processing}
          className="w-full bg-gradient-to-r from-[#6C3CE1] to-[#EC4899] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center mt-6 disabled:opacity-50"
        >
          {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
        </button>

        <p className="text-center text-sm text-[#94A3B8] mt-4">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin} className="text-white hover:text-[#6C3CE1] transition-colors font-medium">
            Log In
          </button>
        </p>
      </form>
    </AppModal>
  );
}
