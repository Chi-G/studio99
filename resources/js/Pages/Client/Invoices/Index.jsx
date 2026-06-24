import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { AppModal } from '@/Components/ui/app-modal';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronDown,
  Download,
  CreditCard,
  History,
  FileBox,
  Settings,
  HeadphonesIcon
} from 'lucide-react';

export default function InvoicesIndex() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Exact mock data based on the provided reference design
  const invoicesList = [
    { id: 'INV-2025-018', number: '#10018', project: 'E-Commerce Website', category: 'Web Development', date: 'May 20, 2025', dueDate: 'May 30, 2025', dueDays: '10 days left', status: 'pending', amount: 850.00 },
    { id: 'INV-2025-017', number: '#10017', project: 'Brand Identity Design', category: 'Logo & Branding', date: 'May 10, 2025', dueDate: 'May 15, 2025', dueDays: 'Paid', status: 'paid', amount: 650.00 },
    { id: 'INV-2025-016', number: '#10016', project: 'Social Media Package', category: 'Social Media', date: 'May 05, 2025', dueDate: 'May 20, 2025', dueDays: 'Overdue', status: 'overdue', amount: 400.00 },
    { id: 'INV-2025-015', number: '#10015', project: 'Mobile App UI Design', category: 'UI/UX Design', date: 'Apr 30, 2025', dueDate: 'May 10, 2025', dueDays: 'Pending', status: 'pending', amount: 750.00 },
    { id: 'INV-2025-014', number: '#10014', project: 'Website Redesign', category: 'Web Development', date: 'Apr 15, 2025', dueDate: 'Apr 20, 2025', dueDays: 'Paid', status: 'paid', amount: 1200.00 },
    { id: 'INV-2025-013', number: '#10013', project: 'Content Writing', category: 'Content Creation', date: 'Apr 05, 2025', dueDate: 'Apr 10, 2025', dueDays: 'Paid', status: 'paid', amount: 350.00 },
    { id: 'INV-2025-012', number: '#10012', project: 'Marketing Campaign', category: 'Digital Marketing', date: 'Mar 28, 2025', dueDate: 'Apr 05, 2025', dueDays: 'Overdue', status: 'overdue', amount: 350.00 },
    { id: 'INV-2025-011', number: '#10011', project: 'Video Promotion', category: 'Video Editing', date: 'Mar 20, 2025', dueDate: 'Mar 25, 2025', dueDays: 'Paid', status: 'paid', amount: 300.00 },
  ];

  const filters = [
    { id: 'all', label: 'All Invoices' },
    { id: 'pending', label: 'Pending', count: 4, countColor: 'bg-orange-500' },
    { id: 'paid', label: 'Paid' },
    { id: 'overdue', label: 'Overdue', count: 2, countColor: 'bg-brand-red' },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'pending': return 'text-orange-500';
      case 'paid': return 'text-green-500';
      case 'overdue': return 'text-brand-red';
      default: return 'text-text-secondary';
    }
  };

  const formatAmount = (amount) => {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <ClientLayout>
      <Head title="Payments & Invoices | Studio99" />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-text-primary mb-2 tracking-tight">Payments & Invoices</h1>
          <div className="flex items-center text-sm font-medium text-text-secondary gap-2">
            <Link href="/dashboard" className="hover:text-text-primary transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-brand-red">Payments & Invoices</span>
          </div>
          <p className="text-text-secondary mt-4">View, manage and track all your payments and invoices.</p>
        </div>
      </div>

      {/* Top Row: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Total Invoices */}
        <div className="bg-bg-surface border border-bg-border p-6 rounded-2xl flex items-center gap-4 hover:border-bg-border transition-colors">
          <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center text-white shrink-0">
            <FileText className="w-6 h-6 fill-current opacity-80" />
          </div>
          <div>
            <p className="text-text-primary text-sm font-medium mb-0.5">Total Invoices</p>
            <h3 className="text-3xl font-black text-text-primary leading-none">18</h3>
            <p className="text-[11px] text-text-secondary mt-1">All time</p>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-bg-surface border border-bg-border p-6 rounded-2xl flex items-center gap-4 hover:border-bg-border transition-colors">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500 shrink-0 border border-orange-500/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-text-primary text-sm font-medium mb-0.5">Pending Payments</p>
            <h3 className="text-3xl font-black text-text-primary leading-none">4</h3>
            <p className="text-[11px] text-orange-500 mt-1">Total: $1,250.00</p>
          </div>
        </div>

        {/* Paid Invoices */}
        <div className="bg-bg-surface border border-bg-border p-6 rounded-2xl flex items-center gap-4 hover:border-bg-border transition-colors">
          <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-text-primary text-sm font-medium mb-0.5">Paid Invoices</p>
            <h3 className="text-3xl font-black text-text-primary leading-none">12</h3>
            <p className="text-[11px] text-green-500 mt-1">Total: $4,850.00</p>
          </div>
        </div>

        {/* Overdue */}
        <div className="bg-bg-surface border border-bg-border p-6 rounded-2xl flex items-center gap-4 hover:border-bg-border transition-colors">
          <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-text-primary text-sm font-medium mb-0.5">Overdue</p>
            <h3 className="text-3xl font-black text-text-primary leading-none">2</h3>
            <p className="text-[11px] text-purple-400 mt-1">Total: $750.00</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Column (Table) */}
        <div className="xl:col-span-3">
          <div className="bg-bg-surface border border-bg-border rounded-2xl overflow-hidden">
            {/* Filters Header */}
            <div className="p-4 border-b border-bg-border flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 lg:pb-0">
                {filters.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors ${
                      activeFilter === f.id 
                        ? 'text-text-primary border-b-2 border-brand-red rounded-none px-2' 
                        : 'text-text-secondary hover:text-text-primary px-2'
                    }`}
                  >
                    {f.label}
                    {f.count && (
                      <span className={`w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center font-black ${f.countColor}`}>
                        {f.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button className="py-2.5 px-4 bg-bg-base border border-bg-border rounded-xl text-text-primary hover:border-text-primary transition-colors flex items-center justify-between gap-2 min-w-[140px]">
                  <span className="text-sm font-bold">All Projects</span>
                  <ChevronDown className="w-4 h-4 text-text-secondary" />
                </button>
                <button className="py-2.5 px-4 bg-bg-base border border-bg-border rounded-xl text-text-primary hover:border-text-primary transition-colors flex items-center justify-between gap-2 min-w-[100px]">
                  <Filter className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm font-bold">Filter</span>
                  <ChevronDown className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Table Body */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-bg-border bg-bg-base/50">
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Invoice</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Project</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Due Date</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Amount</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bg-border">
                  {invoicesList.map(invoice => (
                    <tr key={invoice.id} className="hover:bg-bg-border transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded bg-brand-red flex items-center justify-center text-[10px] font-black text-white shrink-0`}>
                            INV
                          </div>
                          <div>
                            <p className="font-bold text-text-primary text-sm">{invoice.id}</p>
                            <p className="text-[11px] text-text-secondary mt-0.5">{invoice.number}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-text-primary text-sm">{invoice.project}</p>
                        <p className="text-[11px] text-text-secondary mt-0.5">{invoice.category}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-text-primary text-sm">{invoice.date}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-text-primary text-sm">{invoice.dueDate}</p>
                        <p className={`text-[11px] font-medium mt-0.5 ${getStatusClass(invoice.status)}`}>{invoice.dueDays}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-bold capitalize ${getStatusClass(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-bold text-text-primary">{formatAmount(invoice.amount)}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {invoice.status === 'overdue' ? (
                            <button className="bg-brand-red hover:bg-red-600 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                              Pay Now
                            </button>
                          ) : (
                            <button className="text-text-secondary hover:text-text-primary px-4 py-1.5 text-xs font-bold transition-colors">
                              View
                            </button>
                          )}
                          <button className="p-1.5 text-text-secondary hover:text-text-primary transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-bg-border flex items-center justify-between">
              <p className="text-xs font-medium text-text-secondary">Showing 1 to 8 of 18 invoices</p>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded border border-bg-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-border transition-colors disabled:opacity-50">
                  &lt;
                </button>
                <button className="w-8 h-8 rounded border border-brand-red bg-brand-red flex items-center justify-center text-white font-bold transition-colors">
                  1
                </button>
                <button className="w-8 h-8 rounded border border-bg-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-border transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded border border-bg-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-border transition-colors">
                  3
                </button>
                <button className="w-8 h-8 rounded border border-bg-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-border transition-colors">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Widgets) */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 relative">
            <h3 className="text-lg font-bold text-text-primary mb-6">Payment Summary</h3>
            
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48 rounded-full" style={{ background: 'conic-gradient(#22C55E 0% 79%, #F97316 79% 87%, #DC2626 87% 100%)' }}>
                <div className="absolute inset-0 m-auto w-36 h-36 bg-bg-surface rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-2xl font-black text-text-primary">$6,100.00</span>
                  <span className="text-[10px] text-text-secondary mt-1">Total Invoiced</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <span className="text-text-secondary">Paid</span>
                </div>
                <div className="text-right">
                  <span className="text-text-primary font-medium">$4,850.00</span>
                  <span className="text-text-secondary text-xs ml-1">(79%)</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-orange-500"></div>
                  <span className="text-text-secondary">Pending</span>
                </div>
                <div className="text-right">
                  <span className="text-text-primary font-medium">$1,250.00</span>
                  <span className="text-text-secondary text-xs ml-1">(21%)</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-brand-red"></div>
                  <span className="text-text-secondary">Overdue</span>
                </div>
                <div className="text-right">
                  <span className="text-text-primary font-medium">$750.00</span>
                  <span className="text-text-secondary text-xs ml-1">(13%)</span>
                </div>
              </div>
            </div>

            <button className="w-full py-3.5 bg-brand-red hover:bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-[0_4px_14px_rgba(220,38,38,0.25)]">
              <CreditCard className="w-5 h-5" /> Make a Payment
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Quick Actions</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-bg-border text-text-secondary hover:text-text-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Download All Invoices</span>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-bg-border text-text-secondary hover:text-text-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <History className="w-4 h-4" />
                  <span className="text-sm font-medium">Payment History</span>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-bg-border text-text-secondary hover:text-text-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm font-medium">Manage Payment Methods</span>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-bg-border text-text-secondary hover:text-text-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <FileBox className="w-4 h-4" />
                  <span className="text-sm font-medium">Request Invoice</span>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-bg-border text-text-secondary hover:text-text-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">Billing Information</span>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
              </button>
            </div>
          </div>

          {/* Need Help Widget */}
          <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <HeadphonesIcon className="w-5 h-5 text-text-primary" />
              <h3 className="text-sm font-bold text-text-primary">Need Help?</h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              If you have any payment issues or questions, our team is here to help.
            </p>
            <button className="w-full py-2.5 bg-transparent border border-brand-red text-brand-red hover:bg-brand-red/10 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
              <HeadphonesIcon className="w-4 h-4" /> Contact Support
            </button>
          </div>

        </div>
      </div>

    </ClientLayout>
  );
}
