import React from 'react';
import { Head, Link } from '@inertiajs/react';
import TeamLayout from '@/Layouts/TeamLayout';
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
  Server,
  UploadCloud,
  MessageSquare
} from 'lucide-react';

export default function ActivityLogs() {
  const logsData = [
    {
      id: 1,
      time: '10:45 AM',
      date: 'Today',
      user: { name: 'Daniel Johnson', role: 'You', avatar: 'https://i.pravatar.cc/150?u=daniel' },
      action: 'Uploaded',
      actionColor: 'text-emerald-500',
      actionDot: 'bg-emerald-500',
      description: 'Uploaded deliverable "Homepage_Final.fig"\nfor Website Redesign.',
      module: 'Deliverables',
      moduleIcon: UploadCloud,
      ip: '197.210.45.12',
      device: 'Windows\nChrome',
      deviceIcon: Monitor
    },
    {
      id: 2,
      time: '10:32 AM',
      date: 'Today',
      user: { name: 'Jane Cooper', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?u=2' },
      action: 'Updated',
      actionColor: 'text-blue-500',
      actionDot: 'bg-blue-500',
      description: 'Updated your task status from\n"To Do" to "In Progress".',
      module: 'Tasks',
      moduleIcon: FileEdit,
      ip: '197.210.45.12',
      device: 'macOS\nSafari',
      deviceIcon: Monitor
    },
    {
      id: 3,
      time: '09:15 AM',
      date: 'Today',
      user: { name: 'Daniel Johnson', role: 'You', avatar: 'https://i.pravatar.cc/150?u=daniel' },
      action: 'Commented',
      actionColor: 'text-amber-500',
      actionDot: 'bg-amber-500',
      description: 'Commented on progress update for\nBrand Identity Design.',
      module: 'Updates',
      moduleIcon: MessageSquare,
      ip: '197.210.45.12',
      device: 'Windows\nChrome',
      deviceIcon: Monitor
    },
    {
      id: 4,
      time: 'Yesterday',
      date: 'May 30, 2025',
      user: { name: 'Sarah Williams', role: 'Client', avatar: 'https://i.pravatar.cc/150?u=4' },
      action: 'Reviewed',
      actionColor: 'text-brand-red',
      actionDot: 'bg-brand-red',
      description: 'Requested revisions on\n"Social Media Assets".',
      module: 'Deliverables',
      moduleIcon: FileText,
      ip: '197.210.45.14',
      device: 'iPhone\niOS 17',
      deviceIcon: Smartphone
    },
    {
      id: 5,
      time: 'Yesterday',
      date: 'May 30, 2025',
      user: { name: 'Daniel Johnson', role: 'You', avatar: 'https://i.pravatar.cc/150?u=daniel' },
      action: 'Login',
      actionColor: 'text-blue-500',
      actionDot: 'bg-blue-500',
      description: 'Logged into the team dashboard.',
      module: 'Auth',
      moduleIcon: Lock,
      ip: '197.210.45.12',
      device: 'Windows\nEdge',
      deviceIcon: Monitor
    }
  ];

  return (
    <TeamLayout>
      <Head title="Activity Logs | Team Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">My Activity Logs</h1>
          <p className="text-text-secondary text-sm">Track your recent actions, task updates, and interactions.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="pl-9 pr-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm w-full sm:w-[260px] focus:ring-1 focus:ring-brand-red/50 focus:border-brand-red/50 outline-none transition-all text-text-primary"
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

      {/* Main Content Area */}
      <div className="bg-bg-surface border border-bg-border rounded-2xl flex flex-col overflow-hidden">
        
        {/* Table Header / Toolbar */}
        <div className="p-4 border-b border-bg-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
            <button className="text-sm font-bold text-text-primary border-b-2 border-brand-red pb-1 whitespace-nowrap">All Activities</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Tasks</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Deliverables</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Comments</button>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-2 sm:px-3 py-1 sm:py-1.5 border border-bg-border rounded-lg">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              This Week <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:ml-1" />
            </button>
            <button className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-2 sm:px-3 py-1 sm:py-1.5 border border-bg-border rounded-lg">
              <span className="mr-0.5 sm:mr-1">↑↓</span> Sort: Latest First <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:ml-1" />
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
                      <log.moduleIcon className="w-4 h-4 text-text-secondary" />
                      <span className="text-[13px] text-text-primary">{log.module}</span>
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
          <p className="text-sm text-text-secondary font-medium">Showing 1 to 5 of 34 activities</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded flex items-center justify-center border border-bg-border text-text-secondary hover:bg-bg-border transition-colors">
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center bg-brand-red text-white font-bold shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center border border-bg-border text-text-secondary hover:bg-bg-border transition-colors">
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </TeamLayout>
  );
}
