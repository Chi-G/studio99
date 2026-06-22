import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogTitle } from '@/Components/ui/dialog';
import { Loader2, ShieldCheck, Briefcase, Users, Lock, ChevronRight, Eye, EyeOff } from 'lucide-react';

export function RegisterModal({ open, onClose, onSwitchToLogin, intendedUrl }) {
  const [showPassword, setShowPassword] = useState(false);
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    redirect_to: intendedUrl || '',
  });

  useEffect(() => {
    if (open) {
      clearErrors();
      setData('redirect_to', intendedUrl || '');
    } else {
      reset('password', 'password_confirmation');
    }
  }, [open, intendedUrl]);

  const submit = (e) => {
    e.preventDefault();
    post('/register', {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-bg-card border border-bg-border p-0 overflow-hidden shadow-2xl">
        {/* Hidden title for screen readers */}
        <DialogTitle className="sr-only">Create Studio99 Account</DialogTitle>

        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Left Panel - Information */}
          <div className="hidden md:flex flex-col w-[45%] bg-[#0A0A0A] p-10 relative overflow-hidden border-r border-bg-border">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded bg-brand-red flex items-center justify-center font-black text-white text-xs">S</div>
                  <span className="font-black text-lg tracking-tight text-white">studio99</span>
                </div>
                <p className="text-text-secondary text-sm">Join the platform redefining digital delivery</p>
              </div>

              <div className="flex-1 space-y-8 mt-4">
                <h3 className="text-[10px] font-black text-text-secondary tracking-widest uppercase mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span> Role Explanations
                </h3>

                <div className="space-y-6">
                  {/* Client Role */}
                  <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-bg-card border border-bg-border flex items-center justify-center shrink-0 group-hover:border-brand-red transition-colors">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                        Client <ChevronRight className="w-3 h-3 text-brand-red" />
                      </h4>
                      <p className="text-text-secondary text-xs leading-relaxed">
                        Request services, track projects, upload files, manage payments, and communicate with Studio99 Digital from one central dashboard.
                      </p>
                    </div>
                  </div>

                  {/* Team Member Role */}
                  <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-bg-card border border-bg-border flex items-center justify-center shrink-0 group-hover:border-brand-red transition-colors">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                        Team Member <ChevronRight className="w-3 h-3 text-brand-red" />
                      </h4>
                      <p className="text-text-secondary text-xs leading-relaxed">
                        Access assigned projects, update progress, upload deliverables, and collaborate with clients and management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="w-full md:w-[55%] bg-bg-base p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <div className="mb-8 text-center md:text-left">
                <h2 className="text-2xl font-black text-white mb-2">Create Account</h2>
                <p className="text-sm text-text-secondary">Get started as a Client in seconds</p>
              </div>

              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Full Name</label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className={`w-full bg-bg-card border ${errors.name ? 'border-brand-red' : 'border-bg-border'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors`}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                  {errors.name && <span className="text-brand-red text-xs mt-1 block font-medium">{errors.name}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Email Address</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className={`w-full bg-bg-card border ${errors.email ? 'border-brand-red' : 'border-bg-border'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors`}
                      placeholder="jane@company.com"
                      autoComplete="username"
                    />
                    {errors.email && <span className="text-brand-red text-xs mt-1 block font-medium">{errors.email}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      className={`w-full bg-bg-card border ${errors.phone ? 'border-brand-red' : 'border-bg-border'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors`}
                      placeholder="+234..."
                      autoComplete="tel"
                    />
                    {errors.phone && <span className="text-brand-red text-xs mt-1 block font-medium">{errors.phone}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className={`w-full bg-bg-card border ${errors.password ? 'border-brand-red' : 'border-bg-border'} rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-brand-red transition-colors`}
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <span className="text-brand-red text-xs mt-1 block font-medium">{errors.password}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className={`w-full bg-bg-card border ${errors.password_confirmation ? 'border-brand-red' : 'border-bg-border'} rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-brand-red transition-colors`}
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password_confirmation && <span className="text-brand-red text-xs mt-1 block font-medium">{errors.password_confirmation}</span>}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={processing}
                  className="w-full bg-brand-red text-white py-3.5 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center mt-6 disabled:opacity-50 shadow-[0_0_20px_rgba(227,30,36,0.2)] hover:shadow-[0_0_30px_rgba(227,30,36,0.4)]"
                >
                  {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
                </button>

                <p className="text-center text-sm text-text-secondary mt-6">
                  Already have an account?{' '}
                  <button type="button" onClick={onSwitchToLogin} className="text-white hover:text-brand-red transition-colors font-bold">
                    Sign In instead
                  </button>
                </p>
              </form>

              {/* Security Footer */}
              <div className="mt-8 pt-6 border-t border-bg-border">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[10px] font-black tracking-widest text-white uppercase mb-1 flex gap-2">
                      <span>Secure</span><span className="text-brand-red">•</span><span>Reliable</span><span className="text-brand-red">•</span><span>Trusted</span>
                    </h5>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      Your information is encrypted and securely protected to ensure a safe and reliable experience on Studio99 Digital.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
