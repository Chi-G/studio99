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
          <label className="text-sm font-medium text-white">Full Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
            placeholder="Jane Doe"
            autoComplete="name"
          />
          {errors.name && <span className="text-brand-red text-xs">{errors.name}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
              placeholder="jane@company.com"
              autoComplete="username"
            />
            {errors.email && <span className="text-brand-red text-xs">{errors.email}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Phone (Optional)</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
              className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
              placeholder="+234..."
              autoComplete="tel"
            />
            {errors.phone && <span className="text-brand-red text-xs">{errors.phone}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Password</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password && <span className="text-brand-red text-xs">{errors.password}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Confirm Password</label>
            <input
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password_confirmation && <span className="text-brand-red text-xs">{errors.password_confirmation}</span>}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={processing}
          className="w-full bg-brand-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center mt-6 disabled:opacity-50"
        >
          {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
        </button>

        <p className="text-center text-sm text-text-secondary mt-4">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin} className="text-white hover:text-brand-red transition-colors font-bold">
            Log In
          </button>
        </p>
      </form>
    </AppModal>
  );
}
