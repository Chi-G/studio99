import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
  CheckSquare,
  Clock,
  AlertCircle,
  ListTodo,
  Search,
  Filter,
  Plus,
  ChevronDown,
  Download,
  Eye,
  MoreHorizontal,
  Check
} from 'lucide-react';

export default function Tasks() {
  const tasksData = [
    {
      id: 'TSK-104',
      name: 'Design Homepage Wireframes',
      project: 'Website Redesign',
      client: 'Quick Capital Ltd',
      assignedTo: { name: 'Jane Cooper', avatar: 'https://i.pravatar.cc/150?u=2' },
      deadline: 'May 28, 2025',
      deadlineSub: 'Tomorrow',
      deadlineColor: 'text-amber-500',
      status: 'In Progress',
      priority: 'High'
    },
    {
      id: 'TSK-103',
      name: 'Client Feedback Meeting',
      project: 'Brand Identity Design',
      client: 'SparkPoint Solutions',
      assignedTo: { name: 'Daniel Johnson', avatar: 'https://i.pravatar.cc/150?u=1' },
      deadline: 'May 27, 2025',
      deadlineSub: 'Today',
      deadlineColor: 'text-brand-red',
      status: 'In Progress',
      priority: 'High'
    },
    {
      id: 'TSK-102',
      name: 'Setup Social Media Calendar',
      project: 'Social Media Management',
      client: 'GreenLife Farms',
      assignedTo: { name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?u=4' },
      deadline: 'May 29, 2025',
      deadlineSub: '2 days left',
      deadlineColor: 'text-text-secondary',
      status: 'To Do',
      priority: 'Medium'
    },
    {
      id: 'TSK-101',
      name: 'Finalize Promo Video Draft',
      project: 'Event Promo Video',
      client: 'Studio X Conference',
      assignedTo: { name: 'David Okafor', avatar: 'https://i.pravatar.cc/150?u=5' },
      deadline: 'May 24, 2025',
      deadlineSub: 'Overdue',
      deadlineColor: 'text-brand-red',
      status: 'In Review',
      priority: 'Urgent'
    },
    {
      id: 'TSK-100',
      name: 'Mobile App User Flow',
      project: 'Mobile App Design',
      client: 'Alpha Tech NG',
      assignedTo: { name: 'John Michael', avatar: 'https://i.pravatar.cc/150?u=3' },
      deadline: 'May 20, 2025',
      deadlineSub: 'Completed',
      deadlineColor: 'text-emerald-500',
      status: 'Done',
      priority: 'Medium'
    }
  ];

  return (
    <AdminLayout>
      <Head title="Tasks | Admin Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Tasks</h1>
          <p className="text-text-secondary text-sm">Manage tasks across all ongoing projects.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search tasks, projects..." 
              className="pl-9 pr-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm w-full sm:w-[260px] focus:ring-1 focus:ring-brand-red/50 focus:border-brand-red/50 outline-none transition-all"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm font-medium text-text-primary hover:bg-bg-border transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-red text-white rounded-xl text-sm font-bold hover:bg-brand-red/90 transition-colors shadow-sm shadow-brand-red/20">
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <ListTodo className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Total Tasks</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">128</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">All Time</span>
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
              <p className="text-text-secondary text-sm font-medium mb-1">In Progress</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">45</h3>
                <span className="text-[11px] font-bold text-text-secondary mb-0.5">35%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Overdue</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">8</h3>
                <span className="text-[11px] font-bold text-brand-red mb-0.5">Needs Attention</span>
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
              <p className="text-text-secondary text-sm font-medium mb-1">Completed</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">75</h3>
                <span className="text-[11px] font-bold text-emerald-500 mb-0.5">This Month</span>
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
            <button className="text-sm font-bold text-text-primary border-b-2 border-brand-red pb-1 whitespace-nowrap">All Tasks</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">To Do</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">In Progress</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">In Review</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Done</button>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Sort by: Deadline <ChevronDown className="w-4 h-4" />
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
                <th className="py-4 px-6 w-12 text-center"></th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Task</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Project / Client</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Assigned To</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Deadline</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Priority</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {tasksData.map((task) => (
                <tr key={task.id} className="hover:bg-bg-base/50 transition-colors">
                  <td className="py-4 px-6 text-center">
                    <button className={`w-5 h-5 rounded flex items-center justify-center border ${
                      task.status === 'Done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-bg-border text-transparent hover:border-brand-red'
                    }`}>
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <p className={`text-sm font-bold ${task.status === 'Done' ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                      {task.name}
                    </p>
                    <p className="text-[11px] text-text-secondary mt-0.5">{task.id}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-text-primary">{task.project}</p>
                    <p className="text-[11px] text-text-secondary mt-0.5">{task.client}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <img src={task.assignedTo.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                      <p className="text-[13px] font-medium text-text-primary">{task.assignedTo.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-text-primary">{task.deadline}</p>
                    <p className={`text-[11px] mt-0.5 font-bold ${task.deadlineColor}`}>{task.deadlineSub}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                      task.priority === 'High' ? 'bg-amber-500/10 text-amber-500' :
                      task.priority === 'Urgent' ? 'bg-brand-red/10 text-brand-red' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${
                      task.status === 'To Do' ? 'bg-zinc-500/10 text-text-secondary border-bg-border' :
                      task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      task.status === 'In Review' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
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
