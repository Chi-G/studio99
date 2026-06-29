import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
  Briefcase,
  FolderOpen,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Plus,
  ChevronDown,
  Download,
  Eye,
  MoreHorizontal
} from 'lucide-react';

export default function Projects() {
  const projectsData = [
    {
      id: 'PRJ-2405',
      name: 'Website Redesign',
      client: 'Quick Capital Ltd',
      service: 'Website Development',
      assignedTo: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3'],
      extraAssignees: 2,
      deadline: 'May 30, 2025',
      deadlineSub: '3 days left',
      deadlineColor: 'text-text-secondary',
      status: 'In Progress',
      progress: 75,
      progressColor: 'bg-amber-500',
      logo: 'QC',
      logoColor: 'bg-orange-100 text-orange-600 border border-orange-200'
    },
    {
      id: 'PRJ-2404',
      name: 'Brand Identity Design',
      client: 'SparkPoint Solutions',
      service: 'Graphics Design',
      assignedTo: ['https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5'],
      extraAssignees: 1,
      deadline: 'Jun 02, 2025',
      deadlineSub: '6 days left',
      deadlineColor: 'text-text-secondary',
      status: 'In Progress',
      progress: 60,
      progressColor: 'bg-amber-500',
      logo: 'SP',
      logoColor: 'bg-blue-100 text-blue-600 border border-blue-200'
    },
    {
      id: 'PRJ-2403',
      name: 'Social Media Management',
      client: 'GreenLife Farms',
      service: 'Social Media',
      assignedTo: ['https://i.pravatar.cc/150?u=6', 'https://i.pravatar.cc/150?u=7'],
      extraAssignees: 1,
      deadline: 'May 28, 2025',
      deadlineSub: '1 day left',
      deadlineColor: 'text-brand-red',
      status: 'Review',
      progress: 90,
      progressColor: 'bg-blue-500',
      logo: 'GL',
      logoColor: 'bg-emerald-100 text-emerald-600 border border-emerald-200'
    },
    {
      id: 'PRJ-2402',
      name: 'Event Promo Video',
      client: 'Studio X Conference',
      service: 'Video Production',
      assignedTo: ['https://i.pravatar.cc/150?u=8', 'https://i.pravatar.cc/150?u=9'],
      extraAssignees: 2,
      deadline: 'May 25, 2025',
      deadlineSub: 'Overdue',
      deadlineColor: 'text-brand-red',
      status: 'Review',
      progress: 80,
      progressColor: 'bg-blue-500',
      logo: 'SX',
      logoColor: 'bg-purple-100 text-purple-600 border border-purple-200'
    },
    {
      id: 'PRJ-2401',
      name: 'Mobile App Design',
      client: 'Alpha Tech NG',
      service: 'UI/UX Design',
      assignedTo: ['https://i.pravatar.cc/150?u=10', 'https://i.pravatar.cc/150?u=11', 'https://i.pravatar.cc/150?u=12'],
      extraAssignees: 1,
      deadline: 'Jun 10, 2025',
      deadlineSub: '14 days left',
      deadlineColor: 'text-text-secondary',
      status: 'In Progress',
      progress: 40,
      progressColor: 'bg-amber-500',
      logo: 'AT',
      logoColor: 'bg-cyan-100 text-cyan-600 border border-cyan-200'
    },
    {
      id: 'PRJ-2400',
      name: 'School Website',
      client: 'Bright Future Academy',
      service: 'Website Development',
      assignedTo: ['https://i.pravatar.cc/150?u=13'],
      extraAssignees: 1,
      deadline: 'Jun 15, 2025',
      deadlineSub: '19 days left',
      deadlineColor: 'text-text-secondary',
      status: 'On Hold',
      progress: 20,
      progressColor: 'bg-zinc-500',
      logo: 'BF',
      logoColor: 'bg-indigo-100 text-indigo-600 border border-indigo-200'
    },
    {
      id: 'PRJ-2399',
      name: 'Product Catalog Design',
      client: 'MegaMart Stores',
      service: 'Graphics Design',
      assignedTo: ['https://i.pravatar.cc/150?u=14', 'https://i.pravatar.cc/150?u=15', 'https://i.pravatar.cc/150?u=16'],
      extraAssignees: 2,
      deadline: 'May 20, 2025',
      deadlineSub: 'Overdue',
      deadlineColor: 'text-brand-red',
      status: 'Cancelled',
      progress: 0,
      progressColor: 'bg-zinc-500',
      logo: 'MM',
      logoColor: 'bg-amber-100 text-amber-600 border border-amber-200'
    }
  ];

  return (
    <AdminLayout>
      <Head title="Projects | Admin Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Projects</h1>
          <p className="text-text-secondary text-sm">View and manage all ongoing and completed projects.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-9 pr-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm w-full sm:w-[260px] focus:ring-1 focus:ring-brand-red/50 focus:border-brand-red/50 outline-none transition-all"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm font-medium text-text-primary hover:bg-bg-border transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-red text-white rounded-xl text-sm font-bold hover:bg-brand-red/90 transition-colors shadow-sm shadow-brand-red/20">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Total Projects</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">48</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">All Time</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <FolderOpen className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">In Progress</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">24</h3>
                <span className="text-[11px] font-bold text-text-secondary mb-0.5">50%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Completed</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">18</h3>
                <span className="text-[11px] font-bold text-text-secondary mb-0.5">38%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">On Hold</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">6</h3>
                <span className="text-[11px] font-bold text-text-secondary mb-0.5">12%</span>
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
            <button className="text-sm font-bold text-text-primary border-b-2 border-brand-red pb-1 whitespace-nowrap">All Projects</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">In Progress</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Completed</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">On Hold</button>
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
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Project</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Client</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Service</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Assigned To</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Deadline</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider min-w-[120px]">Progress</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {projectsData.map((project) => (
                <tr key={project.id} className="hover:bg-bg-base/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${project.logoColor}`}>
                        {project.logo}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary">{project.name}</p>
                        <p className="text-[11px] text-text-secondary mt-0.5">{project.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-text-primary">{project.client}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-text-secondary">{project.service}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        {project.assignedTo.map((img, i) => (
                          <img key={i} className="w-8 h-8 rounded-full border-2 border-bg-surface object-cover" src={img} alt="Assignee" />
                        ))}
                      </div>
                      {project.extraAssignees > 0 && (
                        <div className="w-8 h-8 rounded-full bg-bg-border flex items-center justify-center text-[10px] font-bold text-text-primary border-2 border-bg-surface">
                          +{project.extraAssignees}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-text-primary">{project.deadline}</p>
                    <p className={`text-[11px] mt-0.5 font-bold ${project.deadlineColor}`}>{project.deadlineSub}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${
                      project.status === 'In Progress' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      project.status === 'Review' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      project.status === 'On Hold' ? 'bg-zinc-500/10 text-text-secondary border-bg-border' :
                      'bg-bg-border text-text-secondary border-transparent'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-text-primary w-8">{project.progress}%</span>
                      <div className="flex-1 h-1.5 bg-bg-border rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${project.progressColor}`} 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
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
          <p className="text-sm text-text-secondary font-medium">Showing 1 to 7 of 48 projects</p>
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
              7
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
