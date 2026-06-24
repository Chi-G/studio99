import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Dialog, DialogContent, DialogTitle } from '@/Components/ui/dialog';
import { LogOut, Loader2 } from 'lucide-react';

export function LogoutConfirmModal({ open, onClose }) {
  const { post, processing } = useForm();

  const handleLogout = (e) => {
    e.preventDefault();
    post('/logout', {
      onSuccess: () => onClose()
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#111111] border border-[#2A2A2A] p-0 shadow-2xl rounded-3xl overflow-hidden">
        <DialogTitle className="sr-only">Ready to log out?</DialogTitle>
        
        <div className="p-10 text-center">
            <div className="w-24 h-24 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center mx-auto mb-8">
                <LogOut className="w-10 h-10 text-brand-red" />
            </div>

            <h2 className="text-2xl font-black text-white mb-4">Ready to log out?</h2>
            
            <p className="text-[#9CA3AF] text-sm mb-8 leading-relaxed">
                You will be logged out of your account.<br/>
                You can log back in anytime to access your projects and data.
            </p>

            <form onSubmit={handleLogout} className="flex flex-col gap-4">
                <button 
                    type="submit" 
                    disabled={processing}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-red hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-[0_4px_15px_rgba(227,30,36,0.2)] disabled:opacity-70"
                >
                    {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
                    {processing ? 'Logging out...' : 'Yes, Logout'}
                </button>
                
                <button 
                    type="button"
                    onClick={onClose}
                    className="w-full py-3.5 border border-[#2A2A2A] hover:border-[#4A4A4A] text-white rounded-xl font-bold transition-all bg-[#151515] hover:bg-[#1A1A1A]"
                >
                    Cancel
                </button>
            </form>

            <div className="mt-8 mb-6 relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2A2A2A]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-[#111111] px-4 text-[#9CA3AF]">or</span>
                </div>
            </div>

            <button 
                onClick={onClose}
                className="text-sm text-white font-medium hover:text-brand-red transition-colors inline-flex items-center gap-2 group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">→</span> Go to Dashboard
            </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
