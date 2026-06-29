import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
  Activity,
  Users,
  Settings,
  FileEdit,
  ShieldAlert,
  Search,
  Filter,
  Download,
  ChevronDown,
  Calendar,
  Eye,
  Briefcase,
  FileText,
  CreditCard,
  Lock,
  Monitor,
  Smartphone,
  Server
} from 'lucide-react';

export default function ActivityLogs() {
  const logsData = [
    {
      id: 1,
      time: '10:45 AM',
      date: 'May 31, 2025',
      user: { name: 'Admin', role: 'Super Admin', avatar: 'https://i.pravatar.cc/150?u=admin' },
      action: 'Created',
      actionColor: 'text-emerald-500',
      actionDot: 'bg-emerald-500',
      description: 'Created a new project "Brand\nIdentity Design" for Quick Capital Ltd.',
      module: 'Projects',
      moduleIcon: Briefcase,
      ip: '197.210.45.12',
      device: 'Windows\nChrome',
      deviceIcon: Monitor
    },
    {
      id: 2,
      time: '10:32 AM',
      date: 'May 31, 2025',
      user: { name: 'Jane Cooper', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?u=2' },
      action: 'Updated',
      actionColor: 'text-blue-500',
      actionDot: 'bg-blue-500',
      description: 'Updated project status from\n"In Progress" to "Completed".',
      module: 'Projects',
      moduleIcon: Briefcase,
      ip: '197.210.45.12',
      device: 'macOS\nSafari',
      deviceIcon: Monitor
    },
    {
      id: 3,
      time: '10:15 AM',
      date: 'May 31, 2025',
      user: { name: 'Daniel Johnson', role: 'Team Member', avatar: 'https://i.pravatar.cc/150?u=1' },
      action: 'Uploaded',
      actionColor: 'text-amber-500',
      actionDot: 'bg-amber-500',
      description: 'Uploaded file "Homepage_Final.pdf"\nin project "Website Design".',
      module: 'Projects',
      moduleIcon: Briefcase,
      ip: '197.210.45.13',
      device: 'Windows\nChrome',
      deviceIcon: Monitor
    },
    {
      id: 4,
      time: '09:50 AM',
      date: 'May 31, 2025',
      user: { name: 'Sarah Williams', role: 'Client', avatar: 'https://i.pravatar.cc/150?u=4' },
      action: 'Created',
      actionColor: 'text-emerald-500',
      actionDot: 'bg-emerald-500',
      description: 'Created a new request "Social Media\nManagement".',
      module: 'Requests',
      moduleIcon: FileText,
      ip: '197.210.45.14',
      device: 'iPhone\niOS 17',
      deviceIcon: Smartphone
    },
    {
      id: 5,
      time: '09:25 AM',
      date: 'May 31, 2025',
      user: { name: 'Michael Ibrahim', role: 'Accountant', avatar: 'https://i.pravatar.cc/150?u=8' },
      action: 'Updated',
      actionColor: 'text-amber-500',
      actionDot: 'bg-amber-500',
      description: 'Marked invoice INV-2025-0524\nas "Paid".',
      module: 'Invoices',
      moduleIcon: CreditCard,
      ip: '197.210.45.12',
      device: 'Windows\nEdge',
      deviceIcon: Monitor
    },
    {
      id: 6,
      time: '09:10 AM',
      date: 'May 31, 2025',
      user: { name: 'System', role: 'Automated', avatar: null, initials: 'SY' },
      action: 'System',
      actionColor: 'text-purple-500',
      actionDot: 'bg-purple-500',
      description: 'Daily backup completed\nsuccessfully.',
      module: 'System',
      moduleIcon: Settings,
      ip: '—',
      device: 'Server\n—',
      deviceIcon: Server
    },
    {
      id: 7,
      time: '08:45 AM',
      date: 'May 31, 2025',
      user: { name: 'Admin', role: 'Super Admin', avatar: 'https://i.pravatar.cc/150?u=admin' },
      action: 'Deleted',
      actionColor: 'text-brand-red',
      actionDot: 'bg-brand-red',
      description: 'Deleted team member "John Doe"\nfrom the system.',
      module: 'Team',
      moduleIcon: Users,
      ip: '197.210.45.12',
      device: 'Windows\nChrome',
      deviceIcon: Monitor
    },
    {
      id: 8,
      time: '08:20 AM',
      date: 'May 31, 2025',
      user: { name: 'Blessing Nwosu', role: 'Content Writer', avatar: 'https://i.pravatar.cc/150?u=7' },
      action: 'Login',
      actionColor: 'text-blue-500',
      actionDot: 'bg-blue-500',
      description: 'User logged in to the system.',
      module: 'Auth',
      moduleIcon: Lock,
      ip: '197.210.45.15',
      device: 'macOS\nSafari',
      deviceIcon: Monitor
    }
  ];

  return (
    <AdminLayout>
      <Head title="Activity Logs | Admin Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Activity Logs</h1>
          <p className="text-text-secondary text-sm">Track all important actions performed across the system.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="pl-9 pr-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm w-full sm:w-[260px] focus:ring-1 focus:ring-brand-red/50 focus:border-brand-red/50 outline-none transition-all"
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
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-text-secondary text-[11px] font-medium mb-1">Total Activities</p>
              <div className="flex items-end gap-3">
                <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none">1,248</h3>
                <span className="text-[10px] font-medium text-text-secondary mb-0.5 whitespace-nowrap">All Time</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-text-secondary text-[11px] font-medium mb-1">User Activities</p>
              <div className="flex items-end gap-3">
                <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none">842</h3>
                <span className="text-[10px] font-bold text-emerald-500 mb-0.5 whitespace-nowrap">67.6% of total</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-text-secondary text-[11px] font-medium mb-1">System Activities</p>
              <div className="flex items-end gap-3">
                <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none">256</h3>
                <span className="text-[10px] font-bold text-purple-500 mb-0.5 whitespace-nowrap">20.5% of total</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <FileEdit className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-text-secondary text-[11px] font-medium mb-1">Data Changes</p>
              <div className="flex items-end gap-3">
                <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none">98</h3>
                <span className="text-[10px] font-bold text-amber-500 mb-0.5 whitespace-nowrap">7.8% of total</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-brand-red" />
            </div>
            <div>
              <p className="text-text-secondary text-[11px] font-medium mb-1">Security Events</p>
              <div className="flex items-end gap-3">
                <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none">52</h3>
                <span className="text-[10px] font-bold text-brand-red mb-0.5 whitespace-nowrap">4.1% of total</span>
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
            <button className="text-sm font-bold text-text-primary border-b-2 border-blue-500 pb-1 whitespace-nowrap">All Activities</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">User Activities</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">System Activities</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Data Changes</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Security Events</button>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5 border border-bg-border rounded-lg">
              <Calendar className="w-4 h-4" />
              May 1 - May 31, 2025 <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5 border border-bg-border rounded-lg">
              <span className="mr-1">↑↓</span> Sort: Latest First <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-bg-border bg-bg-base/50">
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Time ↑↓</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">User</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Action</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Description</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Module</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">IP Address</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Device</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {logsData.map((log) => (
                <tr key={log.id} className="hover:bg-bg-base/50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="text-[13px] font-medium text-text-primary">{log.time}</p>
                    <p className="text-[10px] text-text-secondary mt-0.5">{log.date}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {log.user.avatar ? (
                        <img src={log.user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-[10px]">
                          {log.user.initials}
                        </div>
                      )}
                      <div>
                        <p className="text-[13px] font-medium text-text-primary">{log.user.name}</p>
                        <p className="text-[10px] text-text-secondary mt-0.5">{log.user.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${log.actionDot}`}></div>
                      <span className={`text-[13px] font-medium ${log.actionColor}`}>{log.action}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-[13px] text-text-primary whitespace-pre-line leading-relaxed">
                      {log.description}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <log.moduleIcon className="w-4 h-4 text-purple-500" />
                      <span className="text-[13px] text-text-primary">{log.module}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[13px] text-text-secondary">{log.ip}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <log.deviceIcon className="w-4 h-4 text-text-secondary" />
                      <p className="text-[11px] text-text-secondary whitespace-pre-line leading-tight">
                        {log.device}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-bg-border hover:bg-bg-border text-text-secondary hover:text-text-primary transition-colors ml-auto">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-bg-border flex items-center justify-between">
          <p className="text-sm text-text-secondary font-medium">Showing 1 to 8 of 1,248 activities</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded flex items-center justify-center border border-bg-border text-text-secondary hover:bg-bg-border transition-colors">
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center bg-blue-500 text-white font-bold shadow-sm">
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
              156
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
