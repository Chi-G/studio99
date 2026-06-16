import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { AppModal } from '@/Components/ui/app-modal';
import { 
  CreditCard, 
  Download, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function InvoicesIndex({ auth, invoices = [] }) {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Normalize data (Inertia resource collections wrap arrays in a `data` property)
  const invoicesList = Array.isArray(invoices) ? invoices : invoices.data || invoices || [];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'paid': return <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Paid</span>;
      case 'pending_confirmation': return <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Verifying</span>;
      default: return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Unpaid</span>;
    }
  };

  return (
    <ClientLayout onNewRequest={() => {}}>
      <Head title="Payments | Studio99" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Payments & Invoices</h1>
          <p className="text-[#94A3B8]">Manage your billing history and pending payments.</p>
        </div>
      </div>

      <div className="bg-[#111118] border border-[#2A2A3A] rounded-2xl overflow-hidden">
        {invoicesList.length > 0 ? (
          <div className="divide-y divide-[#2A2A3A]">
            {invoicesList.map((invoice) => (
              <div key={invoice.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#1A1A28] transition-colors">
                <div className="flex flex-col md:flex-row gap-6 md:items-center w-full md:w-auto">
                  <div className="w-12 h-12 rounded-xl bg-[#1A1A28] flex items-center justify-center border border-[#2A2A3A] shrink-0">
                    <FileText className="w-6 h-6 text-[#94A3B8]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{invoice.description}</h3>
                    <p className="text-sm text-[#94A3B8] flex items-center gap-2">
                      <span>INV-{invoice.id.toString().padStart(4, '0')}</span>
                      <span>•</span>
                      <span>Due: {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-8">
                  <div className="text-left md:text-right">
                    <p className="text-sm text-[#94A3B8] mb-1">Amount</p>
                    <p className="text-2xl font-bold font-display text-white">${parseFloat(invoice.amount).toFixed(2)}</p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
                    {getStatusBadge(invoice.status)}
                    
                    {invoice.status === 'unpaid' ? (
                      <button 
                        onClick={() => setSelectedInvoice(invoice)}
                        className="bg-[#6C3CE1] hover:bg-[#5b32be] text-white px-5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" /> Pay Now
                      </button>
                    ) : (
                      <button className="text-[#94A3B8] hover:text-white p-2 border border-[#2A2A3A] rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-[#1A1A28] flex items-center justify-center mx-auto mb-4 border border-[#2A2A3A]">
              <FileText className="w-8 h-8 text-[#475569]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No invoices found</h3>
            <p className="text-[#94A3B8]">You don't have any pending or past invoices.</p>
          </div>
        )}
      </div>

      {/* Pay Invoice Modal */}
      <AppModal 
        open={selectedInvoice !== null} 
        onClose={() => setSelectedInvoice(null)}
        title="Complete Payment"
      >
        {selectedInvoice && (
          <div className="space-y-6 mt-4">
            <div className="bg-[#1A1A28] border border-[#2A2A3A] rounded-xl p-5 text-center">
              <p className="text-[#94A3B8] text-sm mb-2">Total Amount Due</p>
              <h2 className="text-4xl font-display font-bold text-white mb-2">${parseFloat(selectedInvoice.amount).toFixed(2)}</h2>
              <p className="text-sm font-medium text-white">{selectedInvoice.description}</p>
            </div>

            <div className="space-y-3">
              <Link
                href={`/client/invoices/${selectedInvoice.id}`}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-[#2A2A3A] hover:border-[#6C3CE1] bg-[#1A1A28] hover:bg-[#1A1A28]/80 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-[#6C3CE1]/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#6C3CE1]" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-white">Pay Online</h4>
                    <p className="text-xs text-[#94A3B8]">Credit Card, Apple Pay (via Paystack)</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#94A3B8] group-hover:text-white transition-colors" />
              </Link>
              
              <Link
                href={`/client/invoices/${selectedInvoice.id}`}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-[#2A2A3A] hover:border-[#6C3CE1] bg-[#1A1A28] hover:bg-[#1A1A28]/80 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-[#2A2A3A] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#94A3B8]" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-white">Bank Transfer</h4>
                    <p className="text-xs text-[#94A3B8]">Upload proof of payment</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#94A3B8] group-hover:text-white transition-colors" />
              </Link>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />
              <p className="text-xs text-blue-100 leading-relaxed">
                Transactions are secured and encrypted. Upon successful payment, your project status will automatically update.
              </p>
            </div>
          </div>
        )}
      </AppModal>
    </ClientLayout>
  );
}
