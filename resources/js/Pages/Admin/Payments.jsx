import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AppModal } from '@/Components/ui/app-modal';
import { Search, Image as ImageIcon, Check, X, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPayments() {
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const payments = [
    { id: 1, client: 'John Doe', amount: '₦500,000', method: 'Bank Transfer', proof: true, date: 'Oct 12, 2026', status: 'pending' },
    { id: 2, client: 'Jane Smith', amount: '₦1,200,000', method: 'Stripe', proof: false, date: 'Oct 11, 2026', status: 'approved' },
    { id: 3, client: 'Acme Corp', amount: '₦250,000', method: 'Bank Transfer', proof: true, date: 'Oct 10, 2026', status: 'rejected' },
  ];

  const handleViewProof = (payment) => {
    setSelectedPayment(payment);
    setIsProofModalOpen(true);
  };

  const handleApprove = () => {
    toast.success('Payment approved successfully!');
    setIsProofModalOpen(false);
  };

  const handleReject = () => {
    toast.error('Payment rejected. Client will be notified.');
    setIsProofModalOpen(false);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved': return <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Approved</span>;
      case 'rejected': return <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Rejected</span>;
      default: return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Pending</span>;
    }
  };

  return (
    <AdminLayout>
      <Head title="Payments | Studio99" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Payments</h1>
          <p className="text-[#94A3B8]">Review bank transfers and manage financial records.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input 
            type="text"
            placeholder="Search payments..."
            className="bg-[#111118] border border-[#2A2A3A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#6C3CE1] w-full"
          />
        </div>
      </div>

      <div className="bg-[#111118] border border-[#2A2A3A] rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1A1A28] border-b border-[#2A2A3A] text-[#94A3B8]">
            <tr>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Method</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A3A]">
            {payments.map(payment => (
              <tr key={payment.id} className="hover:bg-[#1A1A28]/50 transition-colors group">
                <td className="px-6 py-4 font-bold text-white">{payment.client}</td>
                <td className="px-6 py-4 text-[#E2E8F0] font-mono">{payment.amount}</td>
                <td className="px-6 py-4 text-[#94A3B8]">{payment.method}</td>
                <td className="px-6 py-4 text-[#94A3B8]">{payment.date}</td>
                <td className="px-6 py-4">{getStatusBadge(payment.status)}</td>
                <td className="px-6 py-4 text-right">
                  {payment.proof && payment.status === 'pending' ? (
                    <button 
                      onClick={() => handleViewProof(payment)}
                      className="text-xs font-medium text-amber-400 hover:text-white bg-amber-500/10 hover:bg-amber-500 px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1"
                    >
                      <ImageIcon className="w-3.5 h-3.5" /> View Proof
                    </button>
                  ) : payment.proof ? (
                    <button 
                      onClick={() => handleViewProof(payment)}
                      className="text-xs font-medium text-[#94A3B8] hover:text-white bg-[#2A2A3A] hover:bg-[#3b3b4f] px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" /> Receipt
                    </button>
                  ) : (
                    <span className="text-xs text-[#475569]">Auto-verified</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AppModal 
        open={isProofModalOpen} 
        onClose={() => setIsProofModalOpen(false)}
        title="Payment Proof Verification"
        size="lg"
      >
        {selectedPayment && (
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#111118] p-4 rounded-xl border border-[#2A2A3A]">
                <p className="text-sm text-[#94A3B8] mb-1">Client</p>
                <h4 className="font-bold text-white">{selectedPayment.client}</h4>
              </div>
              <div className="bg-[#111118] p-4 rounded-xl border border-[#2A2A3A]">
                <p className="text-sm text-[#94A3B8] mb-1">Amount Claimed</p>
                <h4 className="font-bold text-white font-mono">{selectedPayment.amount}</h4>
              </div>
            </div>

            <div className="bg-[#111118] rounded-xl border border-[#2A2A3A] overflow-hidden aspect-[4/3] relative flex items-center justify-center">
              {/* Mock Image Placeholder */}
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-[#2A2A3A] mx-auto mb-2" />
                <p className="text-[#475569] text-sm">ReceiptImage_1234.jpg</p>
              </div>
            </div>

            {selectedPayment.status === 'pending' && (
              <div className="flex gap-4">
                <button 
                  onClick={handleReject}
                  className="flex-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
                <button 
                  onClick={handleApprove}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Approve Payment
                </button>
              </div>
            )}
          </div>
        )}
      </AppModal>

    </AdminLayout>
  );
}
