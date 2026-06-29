import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
  FileText,
  Clock,
  UserCheck,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  ChevronDown,
  Download,
  Eye,
  MoreHorizontal
} from 'lucide-react';

export default function RequestsIndex() {
  const requestsData = [
    {
      id: 'REQ-0056',
      reqDate: 'May 25, 2025',
      client: 'SparkPoint Solutions',
      email: 'info@sparkpoint.ng',
      service: 'Brand Identity Design',
      serviceDetail: 'Logo, Colors, Guidelines',
      dateReceived: 'May 25, 2025\n10:45 AM',
      budget: '₦150,000 - ₦250,000',
      status: 'Pending',
      assignedTo: null,
      logo: 'SP',
      logoColor: 'bg-orange-100 text-orange-600 border border-orange-200',
      rowColor: 'border-brand-red'
    },
    {
      id: 'REQ-0055',
      reqDate: 'May 24, 2025',
      client: 'Quick Capital Ltd',
      email: 'hello@quickcapital.ng',
      service: 'Website Development',
      serviceDetail: 'Business Website',
      dateReceived: 'May 24, 2025\n3:20 PM',
      budget: '₦300,000 - ₦500,000',
      status: 'Pending',
      assignedTo: null,
      logo: 'QC',
      logoColor: 'bg-blue-100 text-blue-600 border border-blue-200',
      rowColor: 'border-brand-red'
    },
    {
      id: 'REQ-0054',
      reqDate: 'May 23, 2025',
      client: 'GreenLife Farms',
      email: 'contact@greenlife.ng',
      service: 'Social Media Management',
      serviceDetail: 'Monthly Management',
      dateReceived: 'May 23, 2025\n11:15 AM',
      budget: '₦80,000 - ₦120,000',
      status: 'Assigned',
      assignedTo: { name: 'Jane Cooper', role: 'Social Media Manager', avatar: 'https://i.pravatar.cc/150?u=4' },
      logo: 'GL',
      logoColor: 'bg-emerald-100 text-emerald-600 border border-emerald-200',
      rowColor: 'border-blue-500'
    },
    {
      id: 'REQ-0053',
      reqDate: 'May 22, 2025',
      client: 'Studio X Conference',
      email: 'team@studiox.ng',
      service: 'Event Video Production',
      serviceDetail: 'Highlights + Reels',
      dateReceived: 'May 22, 2025\n9:30 AM',
      budget: '₦200,000 - ₦350,000',
      status: 'In Progress',
      assignedTo: { name: 'Daniel Johnson', role: 'Video Editor', avatar: 'https://i.pravatar.cc/150?u=5' },
      logo: 'SX',
      logoColor: 'bg-zinc-800 text-white border border-zinc-700',
      rowColor: 'border-emerald-500'
    },
    {
      id: 'REQ-0052',
      reqDate: 'May 21, 2025',
      client: 'Alpha Tech NG',
      email: 'info@alphatech.ng',
      service: 'Mobile App Design',
      serviceDetail: 'UI/UX Design',
      dateReceived: 'May 21, 2025\n2:10 PM',
      budget: '₦250,000 - ₦400,000',
      status: 'Assigned',
      assignedTo: { name: 'John Michael', role: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?u=3' },
      logo: 'AT',
      logoColor: 'bg-cyan-100 text-cyan-600 border border-cyan-200',
      rowColor: 'border-blue-500'
    },
    {
      id: 'REQ-0051',
      reqDate: 'May 20, 2025',
      client: 'Bright Future Academy',
      email: 'admin@bfacademy.ng',
      service: 'School Website',
      serviceDetail: 'Educational Website',
      dateReceived: 'May 20, 2025\n4:05 PM',
      budget: '₦150,000 - ₦250,000',
      status: 'Completed',
      assignedTo: { name: 'Sarah Williams', role: 'Web Developer', avatar: 'https://i.pravatar.cc/150?u=6' },
      logo: 'BF',
      logoColor: 'bg-purple-100 text-purple-600 border border-purple-200',
      rowColor: 'border-emerald-500'
    },
    {
      id: 'REQ-0050',
      reqDate: 'May 19, 2025',
      client: 'MegaMart Stores',
      email: 'support@megamart.ng',
      service: 'Product Catalog Design',
      serviceDetail: 'Catalog + Layout',
      dateReceived: 'May 19, 2025\n11:00 AM',
      budget: '₦100,000 - ₦180,000',
      status: 'Cancelled',
      assignedTo: null,
      logo: 'MM',
      logoColor: 'bg-amber-100 text-amber-600 border border-amber-200',
      rowColor: 'border-zinc-500'
    }
  ];

  return (
    <AdminLayout>
      <Head title="Requests | Admin Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Requests</h1>
          <p className="text-text-secondary text-sm">Manage all incoming service requests from clients.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search requests, clients, services..." 
              className="pl-9 pr-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm w-full sm:w-[280px] focus:ring-1 focus:ring-brand-red/50 focus:border-brand-red/50 outline-none transition-all"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm font-medium text-text-primary hover:bg-bg-border transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-5 gap-6 mb-8">
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-brand-red" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Total Requests</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">56</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">All Time</span>
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
              <p className="text-text-secondary text-sm font-medium mb-1">Pending</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">18</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">Awaiting Assignment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Assigned</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">22</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">In Progress</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Completed</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">14</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">This Month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-500/10 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5 text-text-secondary" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Cancelled</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">2</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">This Month</span>
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
            <button className="text-sm font-bold text-text-primary border-b-2 border-brand-red pb-1 whitespace-nowrap">All Requests</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Pending</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Assigned</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Completed</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Cancelled</button>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Sort by: Latest <ChevronDown className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-bg-border"></div>
            <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              <Download className="w-4 h-4" /> Export <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-bg-border bg-bg-base/50">
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Request ID</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Client</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Service Requested</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Date Received</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Budget Range</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Assigned To</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {requestsData.map((req) => (
                <tr key={req.id} className="hover:bg-bg-base/50 transition-colors relative">
                  <td className="py-4 px-6">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 border-l-[3px] ${req.rowColor}`}></div>
                    <p className="text-sm font-bold text-text-primary">{req.id}</p>
                    <p className="text-[11px] text-text-secondary mt-0.5">{req.reqDate}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${req.logoColor}`}>
                        {req.logo}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary">{req.client}</p>
                        <p className="text-[11px] text-text-secondary mt-0.5">{req.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-text-primary">{req.service}</p>
                    <p className="text-[11px] text-text-secondary mt-0.5">{req.serviceDetail}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-text-primary whitespace-pre-line">{req.dateReceived}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-text-primary">{req.budget}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${
                      req.status === 'Pending' ? 'bg-brand-red/10 text-brand-red border-brand-red/20' :
                      req.status === 'Assigned' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      req.status === 'In Progress' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      req.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      'bg-zinc-500/10 text-text-secondary border-bg-border'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {req.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <img src={req.assignedTo.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-[13px] font-medium text-text-primary">{req.assignedTo.name}</p>
                          <p className="text-[10px] text-text-secondary mt-0.5">{req.assignedTo.role}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-text-secondary">— Unassigned</span>
                    )}
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
          <p className="text-sm text-text-secondary font-medium">Showing 1 to 7 of 56 requests</p>
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
              8
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
