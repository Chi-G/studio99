import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
  CreditCard,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Search,
  Filter,
  Download,
  ChevronDown,
  Calendar,
  Building,
  Eye,
  MoreHorizontal
} from 'lucide-react';

export default function Payments() {
  const paymentsData = [
    {
      id: 'PAY-00078',
      invoice: 'INV-2025-0528',
      client: 'Quick Capital Ltd',
      industry: 'Finance',
      project: 'Brand Identity Design',
      amount: '₦450,000',
      method: 'Bank Transfer',
      methodDetail: 'GTBank',
      methodIcon: Building,
      status: 'Completed',
      date: 'May 28, 2025\n2:35 PM',
      logo: 'QC',
      logoColor: 'bg-emerald-500 text-white'
    },
    {
      id: 'PAY-00077',
      invoice: 'INV-2025-0524',
      client: 'SparkPoint Solutions',
      industry: 'Consulting',
      project: 'Website Development',
      amount: '₦800,000',
      method: 'Card Payment',
      methodDetail: 'Visa •••• 4242',
      methodIcon: CreditCard,
      status: 'Completed',
      date: 'May 24, 2025\n11:20 AM',
      logo: 'SP',
      logoColor: 'bg-orange-500 text-white'
    },
    {
      id: 'PAY-00076',
      invoice: 'INV-2025-0523',
      client: 'GreenLife Farms',
      industry: 'Agriculture',
      project: 'Social Media Management',
      amount: '₦120,000',
      method: 'Bank Transfer',
      methodDetail: 'Access Bank',
      methodIcon: Building,
      status: 'Completed',
      date: 'May 23, 2025\n9:45 AM',
      logo: 'GL',
      logoColor: 'bg-emerald-600 text-white'
    },
    {
      id: 'PAY-00075',
      invoice: 'INV-2025-0522',
      client: 'Studio X Conference',
      industry: 'Events',
      project: 'Event Video Production',
      amount: '₦350,000',
      method: 'Card Payment',
      methodDetail: 'Mastercard •••• 5678',
      methodIcon: CreditCard,
      status: 'Completed',
      date: 'May 22, 2025\n4:10 PM',
      logo: 'SX',
      logoColor: 'bg-zinc-900 text-white'
    },
    {
      id: 'PAY-00074',
      invoice: 'INV-2025-0521',
      client: 'Alpha Tech NG',
      industry: 'Technology',
      project: 'Mobile App Design',
      amount: '₦400,000',
      method: 'Bank Transfer',
      methodDetail: 'UBA',
      methodIcon: Building,
      status: 'Pending',
      date: 'May 21, 2025\n10:15 AM',
      logo: 'AT',
      logoColor: 'bg-blue-500 text-white'
    },
    {
      id: 'PAY-00073',
      invoice: 'INV-2025-0520',
      client: 'Bright Future Academy',
      industry: 'Education',
      project: 'School Website',
      amount: '₦250,000',
      method: 'Bank Transfer',
      methodDetail: 'GTBank',
      methodIcon: Building,
      status: 'Completed',
      date: 'May 20, 2025\n1:05 PM',
      logo: 'BFA',
      logoColor: 'bg-purple-500 text-white text-xs'
    },
    {
      id: 'PAY-00072',
      invoice: 'INV-2025-0519',
      client: 'MegaMart Stores',
      industry: 'Retail',
      project: 'Product Catalog Design',
      amount: '₦180,000',
      method: 'Card Payment',
      methodDetail: 'Visa •••• 1010',
      methodIcon: CreditCard,
      status: 'Failed',
      date: 'May 19, 2025\n3:30 PM',
      logo: 'MS',
      logoColor: 'bg-amber-600 text-white'
    },
    {
      id: 'PAY-00071',
      invoice: 'INV-2025-0516',
      client: 'HealthPlus Medical',
      industry: 'Healthcare',
      project: 'Website Development',
      amount: '₦200,000',
      method: 'Bank Transfer',
      methodDetail: 'Access Bank',
      methodIcon: Building,
      status: 'Pending',
      date: 'May 16, 2025\n11:00 PM',
      logo: 'HP',
      logoColor: 'bg-cyan-500 text-white'
    }
  ];

  return (
    <AdminLayout>
      <Head title="Payments | Admin Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Payments</h1>
          <p className="text-text-secondary text-sm">Track and manage all payments received from clients.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search payments, clients, projects..." 
              className="pl-9 pr-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm w-full sm:w-[280px] focus:ring-1 focus:ring-brand-red/50 focus:border-brand-red/50 outline-none transition-all"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm font-medium text-text-primary hover:bg-bg-border transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm font-medium text-text-primary hover:bg-bg-border transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-5 gap-6 mb-8">
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Total Payments</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none">₦12,680,000</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5 whitespace-nowrap">All Time</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <ArrowDownLeft className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Received This Month</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none">₦2,450,000</h3>
                <span className="text-[11px] font-bold text-emerald-500 mb-0.5 whitespace-nowrap">+18.6% vs last month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Pending Payments</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none">₦1,320,000</h3>
                <span className="text-[11px] font-bold text-amber-500 mb-0.5 whitespace-nowrap">6 Invoices</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Completed Payments</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none">₦11,360,000</h3>
                <span className="text-[11px] font-bold text-text-secondary mb-0.5 whitespace-nowrap">89.6%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-5 h-5 text-brand-red" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Refunds</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none">₦120,000</h3>
                <span className="text-[11px] font-bold text-brand-red mb-0.5 whitespace-nowrap">5 Transactions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-bg-surface border border-bg-border rounded-2xl flex flex-col overflow-hidden">
        
        {/* Table Header / Toolbar */}
        <div className="p-4 border-b border-bg-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
            <button className="text-sm font-bold text-text-primary border-b-2 border-brand-red pb-1 whitespace-nowrap">All Payments</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Completed</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Pending</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Failed</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Refunds</button>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Sort by: Latest <ChevronDown className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-bg-border"></div>
            <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5 border border-bg-border rounded-lg">
              <Calendar className="w-4 h-4" />
              May 1 - May 31, 2025
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-bg-border bg-bg-base/50">
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Payment ID</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Client</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Project / Invoice</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Amount</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Payment Method</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Payment Date</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {paymentsData.map((payment) => (
                <tr key={payment.id} className="hover:bg-bg-base/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${payment.logoColor}`}>
                        {payment.logo}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary">{payment.id}</p>
                        <p className="text-[11px] text-text-secondary mt-0.5">{payment.invoice}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-text-primary">{payment.client}</p>
                    <p className="text-[11px] text-text-secondary mt-0.5">{payment.industry}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-text-primary">{payment.project}</p>
                    <p className="text-[11px] text-text-secondary mt-0.5">{payment.invoice}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-bold text-text-primary">{payment.amount}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <payment.methodIcon className="w-4 h-4 text-text-secondary" />
                      <div>
                        <p className="text-[13px] font-medium text-text-primary">{payment.method}</p>
                        <p className="text-[10px] text-text-secondary mt-0.5">{payment.methodDetail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${
                      payment.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      payment.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-brand-red/10 text-brand-red border-brand-red/20'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-text-primary whitespace-pre-line">{payment.date}</p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-bg-border hover:bg-bg-border text-text-secondary hover:text-text-primary transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-bg-border hover:bg-bg-border text-text-secondary hover:text-text-primary transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
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
          <p className="text-sm text-text-secondary font-medium">Showing 1 to 8 of 42 payments</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded flex items-center justify-center border border-bg-border text-text-secondary hover:bg-bg-border transition-colors">
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center bg-brand-red text-white font-bold shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-bg-border text-text-primary font-medium transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-bg-border text-text-primary font-medium transition-colors">
              3
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-text-secondary">...</span>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-bg-border text-text-primary font-medium transition-colors">
              6
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center border border-bg-border text-text-secondary hover:bg-bg-border transition-colors">
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
