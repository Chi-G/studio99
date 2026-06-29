import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
  Users, 
  Building2, 
  CheckSquare, 
  Clock,
  Search,
  Filter,
  Plus,
  ChevronDown,
  Download,
  Eye,
  MoreHorizontal
} from 'lucide-react';

export default function Clients() {
  const clientsData = [
    { 
      id: 1, 
      company: 'Quick Capital Ltd', 
      industry: 'Finance', 
      contact: 'Michael Johnson', 
      role: 'Managing Director',
      email: 'hello@quickcapital.ng',
      phone: '+234 803 123 4567',
      activeProjects: 3,
      totalProjects: 7,
      status: 'Active',
      lastActivity: 'May 25, 2025\n2:30 PM',
      logo: 'QC',
      color: 'bg-blue-600'
    },
    { 
      id: 2, 
      company: 'SparkPoint Solutions', 
      industry: 'Consulting', 
      contact: 'Sarah Williams', 
      role: 'CEO',
      email: 'info@sparkpoint.ng',
      phone: '+234 805 234 5678',
      activeProjects: 2,
      totalProjects: 5,
      status: 'Active',
      lastActivity: 'May 24, 2025\n11:15 AM',
      logo: 'SP',
      color: 'bg-orange-500'
    },
    { 
      id: 3, 
      company: 'GreenLife Farms', 
      industry: 'Agriculture', 
      contact: 'David Okafor', 
      role: 'Operations Manager',
      email: 'contact@greenlife.ng',
      phone: '+234 809 345 6789',
      activeProjects: 1,
      totalProjects: 3,
      status: 'Active',
      lastActivity: 'May 23, 2025\n9:45 AM',
      logo: 'GL',
      color: 'bg-emerald-500'
    },
    { 
      id: 4, 
      company: 'Studio X Conference', 
      industry: 'Events', 
      contact: 'Jane Cooper', 
      role: 'Event Director',
      email: 'hello@studiox.ng',
      phone: '+234 802 456 7890',
      activeProjects: 2,
      totalProjects: 4,
      status: 'Active',
      lastActivity: 'May 22, 2025\n4:20 PM',
      logo: 'SX',
      color: 'bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
    },
    { 
      id: 5, 
      company: 'Alpha Tech NG', 
      industry: 'Technology', 
      contact: 'John Michael', 
      role: 'CTO',
      email: 'contact@alphatech.ng',
      phone: '+234 706 789 1234',
      activeProjects: 1,
      totalProjects: 2,
      status: 'Inactive',
      lastActivity: 'May 15, 2025\n10:10 AM',
      logo: 'AT',
      color: 'bg-blue-400'
    },
    { 
      id: 6, 
      company: 'Bright Future Academy', 
      industry: 'Education', 
      contact: 'Emily Roberts', 
      role: 'Administrator',
      email: 'admin@bfacademy.ng',
      phone: '+234 807 654 3210',
      activeProjects: 1,
      totalProjects: 2,
      status: 'Active',
      lastActivity: 'May 20, 2025\n1:05 PM',
      logo: 'BF',
      color: 'bg-purple-600'
    },
    { 
      id: 7, 
      company: 'MegaMart Stores', 
      industry: 'Retail', 
      contact: 'Daniel Brown', 
      role: 'Marketing Lead',
      email: 'info@megamart.ng',
      phone: '+234 901 234 5678',
      activeProjects: 0,
      totalProjects: 1,
      status: 'Prospect',
      lastActivity: 'May 18, 2025\n3:30 PM',
      logo: 'MM',
      color: 'bg-amber-600'
    },
    { 
      id: 8, 
      company: 'HealthPlus Medical', 
      industry: 'Healthcare', 
      contact: 'Dr. AnthonyEze', 
      role: 'Director',
      email: 'hello@healthplus.ng',
      phone: '+234 808 987 6543',
      activeProjects: 0,
      totalProjects: 1,
      status: 'Inactive',
      lastActivity: 'May 10, 2025\n11:00 AM',
      logo: 'HP',
      color: 'bg-cyan-500'
    },
  ];

  return (
    <AdminLayout>
      <Head title="Clients | Admin Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Clients</h1>
          <p className="text-text-secondary text-sm">Manage all your clients and their business information.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search clients by name, email..." 
              className="pl-9 pr-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm w-full sm:w-[260px] focus:ring-1 focus:ring-brand-red/50 focus:border-brand-red/50 outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm font-medium text-text-primary hover:bg-bg-border transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Add Client
          </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Total Clients</p>
              <div className="flex items-end gap-3">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">78</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">All Time</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Active Clients</p>
              <div className="flex items-end gap-3">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">45</h3>
                <span className="text-[11px] font-bold text-emerald-500 mb-0.5">57.7%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <CheckSquare className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Completed Projects</p>
              <div className="flex items-end gap-3">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">156</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">This Month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">New This Month</p>
              <div className="flex items-end gap-3">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">8</h3>
                <span className="text-[11px] font-bold text-emerald-500 mb-0.5">+14.3%</span>
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
            <button className="text-sm font-bold text-text-primary border-b-2 border-brand-red pb-1 whitespace-nowrap">All Clients</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Active</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Inactive</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Prospects</button>
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
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Client</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Contact Person</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Email / Phone</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-center">Active Projects</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-center">Total Projects</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Last Activity</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {clientsData.map((client) => (
                <tr key={client.id} className="hover:bg-bg-base/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm ${client.color}`}>
                        {client.logo}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary">{client.company}</p>
                        <p className="text-[11px] text-text-secondary mt-0.5">{client.industry}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-text-primary">{client.contact}</p>
                    <p className="text-[11px] text-text-secondary mt-0.5">{client.role}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-text-primary">{client.email}</p>
                    <p className="text-[11px] text-text-secondary mt-0.5">{client.phone}</p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm font-bold text-brand-red">{client.activeProjects}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm font-medium text-text-primary">{client.totalProjects}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${
                      client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      client.status === 'Inactive' ? 'bg-zinc-500/10 text-text-secondary border-bg-border' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-text-primary whitespace-pre-line">{client.lastActivity}</p>
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
          <p className="text-sm text-text-secondary font-medium">Showing 1 to 8 of 78 clients</p>
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
              10
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
