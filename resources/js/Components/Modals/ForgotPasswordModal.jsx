import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { AppModal } from '@/Components/ui/app-modal';
import { Loader2 } from 'lucide-react';

export function ForgotPasswordModal({ open, onClose, onSwitchToLogin }) {
  const { data, setData, post, processing, errors, reset, clearErrors, wasSuccessful } = useForm({
    email: '',
  });

  useEffect(() => {
    if (open) {
      clearErrors();
      reset('email');
    }
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    post('/forgot-password');
  };

  return (
    <AppModal 
      open={open} 
      onClose={onClose} 
      title="Reset Your Password" 
      description="Enter your email address below and we'll send you instructions to securely reset your password."
      size="sm"
    >
      {wasSuccessful ? (
        <div className="mt-6">
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm font-medium">
            Password reset instructions have been sent to your email.
          </div>
          <button 
            type="button" 
            onClick={onSwitchToLogin}
            className="w-full mt-6 bg-bg-card border border-bg-border text-white py-3 rounded-xl font-bold hover:bg-[#2A2A2A] transition-colors flex items-center justify-center"
          >
            Return to Login
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
              placeholder="name@company.com"
              required
            />
            {errors.email && <span className="text-brand-red text-xs">{errors.email}</span>}
          </div>

          <button 
            type="submit" 
            disabled={processing}
            className="w-full bg-brand-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center mt-6 disabled:opacity-50"
          >
            {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
          </button>

          <p className="text-center text-sm text-text-secondary mt-4">
            Remember your password?{' '}
            <button type="button" onClick={onSwitchToLogin} className="text-white hover:text-brand-red transition-colors font-bold">
              Log In
            </button>
          </p>
        </form>
      )}
    </AppModal>
  );
}
