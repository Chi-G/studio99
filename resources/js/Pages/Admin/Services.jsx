import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
  LayoutGrid,
  CheckCircle2,
  FileEdit,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Download,
  Eye,
  MoreHorizontal
} from 'lucide-react';

export default function Services() {
  const servicesData = [
    {
      id: 'SRV-001',
      name: 'Website Development',
      description: 'Custom business websites with CMS',
      category: 'Development',
      basePrice: '₦250,000',
      activeProjects: 12,
      status: 'Active',
      color: 'bg-blue-500'
    },
    {
      id: 'SRV-002',
      name: 'Brand Identity Design',
      description: 'Logos, color palettes, and brand guidelines',
      category: 'Design',
      basePrice: '₦150,000',
      activeProjects: 8,
      status: 'Active',
      color: 'bg-purple-500'
    },
    {
      id: 'SRV-003',
      name: 'Social Media Management',
      description: 'Monthly content creation and posting',
      category: 'Marketing',
      basePrice: '₦80,000 / month',
      activeProjects: 15,
      status: 'Active',
      color: 'bg-emerald-500'
    },
    {
      id: 'SRV-004',
      name: 'Video Editing',
      description: 'Promo videos, reels, and editing',
      category: 'Production',
      basePrice: '₦200,000',
      activeProjects: 4,
      status: 'Active',
      color: 'bg-amber-500'
    },
    {
      id: 'SRV-005',
      name: 'SEO Optimization',
      description: 'On-page and off-page SEO services',
      category: 'Marketing',
      basePrice: '₦100,000',
      activeProjects: 0,
      status: 'Draft',
      color: 'bg-zinc-500'
    }
  ];

  return (
    <AdminLayout>
      <Head title="Services | Admin Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Services</h1>
          <p className="text-text-secondary text-sm">Manage the services your agency offers to clients.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search services..." 
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
            Add Service
          </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
              <LayoutGrid className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Total Services</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">5</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">All Categories</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Active Services</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">4</h3>
                <span className="text-[11px] font-bold text-emerald-500 mb-0.5">80%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-500/10 flex items-center justify-center shrink-0">
              <FileEdit className="w-6 h-6 text-text-secondary" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Drafts</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">1</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">Needs Review</span>
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
            <button className="text-sm font-bold text-text-primary border-b-2 border-brand-red pb-1 whitespace-nowrap">All Services</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Active</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Drafts</button>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Sort by: Name (A-Z) <ChevronDown className="w-4 h-4" />
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
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Service</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Base Price</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-center">Active Projects</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {servicesData.map((service) => (
                <tr key={service.id} className="hover:bg-bg-base/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-10 rounded-full shrink-0 ${service.color}`}></div>
                      <div>
                        <p className="text-sm font-bold text-text-primary">{service.name}</p>
                        <p className="text-[11px] text-text-secondary mt-0.5">{service.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-text-primary">{service.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-bold text-text-primary">{service.basePrice}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm font-bold text-brand-red">{service.activeProjects}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${
                      service.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      'bg-zinc-500/10 text-text-secondary border-bg-border'
                    }`}>
                      {service.status}
                    </span>
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
      </div>
    </AdminLayout>
  );
}
