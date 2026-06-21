import React from 'react';
import { useForm } from '@inertiajs/react';
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
      <DialogContent className="max-w-sm bg-bg-card border border-bg-border p-8 shadow-2xl rounded-2xl">
        <DialogTitle className="sr-only">Confirm Logout</DialogTitle>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center mb-6">
            <LogOut className="w-8 h-8 text-brand-red" />
          </div>
          
          <h2 className="text-xl font-black text-white mb-2">Ready to leave?</h2>
          <p className="text-sm text-text-secondary mb-8">
            Are you sure you want to log out of your Studio99 account?
          </p>

          <div className="flex w-full gap-3">
            <button
              onClick={onClose}
              disabled={processing}
              className="flex-1 py-3 px-4 rounded-xl border border-bg-border text-white font-bold hover:bg-bg-base transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              disabled={processing}
              className="flex-1 py-3 px-4 rounded-xl bg-brand-red text-white font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log Out"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
