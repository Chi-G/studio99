import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import {
  Briefcase,
  Users,
  CreditCard,
  Plus,
  UserPlus,
  FileText,
  MoreVertical,
  Activity,
  MessageSquare
} from 'lucide-react';

const projectsOverviewData = [
  { name: 'In Progress', value: 12, color: '#E31E24' },
  { name: 'Review', value: 5, color: '#F59E0B' },
  { name: 'Completed', value: 7, color: '#10B981' },
  { name: 'On Hold', value: 4, color: '#3B82F6' },
];

const tasksOverviewData = [
  { name: 'To Do', value: 45, color: '#64748B' },
  { name: 'In Progress', value: 63, color: '#E31E24' },
  { name: 'Review', value: 25, color: '#F59E0B' },
  { name: 'Completed', value: 23, color: '#10B981' },
];

export default function AdminDashboard({ auth }) {

  const recentProjects = [
    { id: 'PRJ-001', name: 'Brand Identity Design', client: 'SparkPoint Ltd', progress: 70, deadline: '20 Jun, 2025', status: 'In Progress' },
    { id: 'PRJ-002', name: 'Corporate Website', client: 'Quick Capital Ltd', progress: 40, deadline: '25 Jun, 2025', status: 'In Progress' },
    { id: 'PRJ-003', name: 'Promotional Video', client: 'Coach Vinah', progress: 90, deadline: '18 Jun, 2025', status: 'Review' },
    { id: 'PRJ-004', name: 'Social Media Mgmt.', client: 'YZ Cleaning Services', progress: 30, deadline: '30 Jun, 2025', status: 'In Progress' },
    { id: 'PRJ-005', name: 'E-commerce Website', client: 'Onestop.ng', progress: 15, deadline: '10 Jul, 2025', status: 'In Progress' },
  ];

  const recentActivity = [
    { id: 1, action: 'New project "Brand Identity Design" created', user: 'Admin User', time: '2 mins ago', icon: Briefcase, color: 'bg-brand-red text-white' },
    { id: 2, action: 'Team member John Doe added to project SparkPoint Ltd', user: '', time: '15 mins ago', icon: UserPlus, color: 'bg-amber-500 text-white' },
    { id: 3, action: 'Project "Promotional Video" moved to Review', user: 'Admin User', time: '1 hour ago', icon: Activity, color: 'bg-emerald-500 text-white' },
    { id: 4, action: 'Payment of ₦850,000 received from Quick Capital Ltd', user: '', time: '2 hours ago', icon: CreditCard, color: 'bg-blue-500 text-white' },
    { id: 5, action: 'New message from Coach Vinah regarding project update', user: '', time: '3 hours ago', icon: MessageSquare, color: 'bg-purple-500 text-white' },
  ];

  return (
    <AdminLayout>
      <Head title="Admin Dashboard | Studio99" />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Overview</h1>
        <div className="flex items-center gap-2">
          <p className="text-text-primary font-medium">Welcome back, {auth.user.name.split(' ')[0]} <span className="text-xl">👋</span></p>
        </div>
        <p className="text-text-secondary text-sm mt-1">Here's what's happening with your agency today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 mb-8">
        {/* Monthly Revenue */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm font-medium">Monthly Revenue</p>
            <MoreVertical className="w-5 h-5 text-text-secondary cursor-pointer" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h3 className="text-2xl font-gilroy font-bold text-text-primary">₦12,450,000</h3>
              <p className="text-emerald-500 text-xs font-bold mt-1">↑ 18.6% <span className="text-text-secondary font-medium">vs last month</span></p>
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm font-medium">Active Projects</p>
            <MoreVertical className="w-5 h-5 text-text-secondary cursor-pointer" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h3 className="text-2xl font-gilroy font-bold text-text-primary">28</h3>
              <p className="text-emerald-500 text-xs font-bold mt-1">↑ 12.5% <span className="text-text-secondary font-medium">vs last month</span></p>
            </div>
          </div>
        </div>

        {/* New Clients */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm font-medium">New Clients</p>
            <MoreVertical className="w-5 h-5 text-text-secondary cursor-pointer" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
              <UserPlus className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h3 className="text-2xl font-gilroy font-bold text-text-primary">14</h3>
              <p className="text-emerald-500 text-xs font-bold mt-1">↑ 7.2% <span className="text-text-secondary font-medium">vs last month</span></p>
            </div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm font-medium">Pending Payments</p>
            <MoreVertical className="w-5 h-5 text-text-secondary cursor-pointer" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center shrink-0 shadow-lg shadow-brand-red/20">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-gilroy font-bold text-text-primary">7</h3>
              <p className="text-amber-500 text-xs font-bold mt-1">₦2,850,000 <span className="text-text-secondary font-medium">awaiting</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 mb-8">
        {/* Recent Projects */}
        <div className="xl:col-span-2 bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary">Recent Projects</h2>
            <Link href="/admin/projects" className="text-sm font-bold text-brand-red hover:underline">View all</Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-bg-border">
                  <th className="pb-3 text-xs font-bold text-text-secondary uppercase tracking-wider">Project</th>
                  <th className="pb-3 text-xs font-bold text-text-secondary uppercase tracking-wider">Client</th>
                  <th className="pb-3 text-xs font-bold text-text-secondary uppercase tracking-wider">Progress</th>
                  <th className="pb-3 text-xs font-bold text-text-secondary uppercase tracking-wider">Deadline</th>
                  <th className="pb-3 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bg-border">
                {recentProjects.map((project, idx) => (
                  <tr key={idx} className="hover:bg-bg-base/50 transition-colors">
                    <td className="py-4 pr-4">
                      <p className="text-sm font-bold text-text-primary">{project.name}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{project.id}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-bg-border flex items-center justify-center text-[10px] font-bold text-text-primary">
                          {project.client.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-text-secondary">{project.client}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-text-primary w-8">{project.progress}%</span>
                        <div className="flex-1 h-1.5 bg-bg-border rounded-full overflow-hidden max-w-[100px]">
                          <div
                            className="h-full bg-brand-red rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-sm text-text-secondary">{project.deadline}</span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded border ${project.status === 'In Progress' ? 'bg-brand-red/10 text-brand-red border-brand-red/20' :
                          project.status === 'Review' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                            'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-text-secondary hover:text-text-primary">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary">Recent Activity</h2>
            <Link href="/admin/activity-logs" className="text-sm font-bold text-brand-red hover:underline">View all logs</Link>
          </div>

          <div className="space-y-6 flex-1">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary leading-snug">
                    {activity.action} {activity.user && <span className="text-text-secondary">by {activity.user}</span>}
                  </p>
                </div>
                <div className="text-xs font-medium text-text-secondary whitespace-nowrap shrink-0">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {/* Projects Overview Chart */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-text-primary">Projects Overview</h2>
            <Link href="/admin/reports" className="text-sm font-bold text-brand-red hover:underline">View report</Link>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectsOverviewData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {projectsOverviewData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--color-text-primary)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-gilroy font-bold text-text-primary">28</span>
                <span className="text-[10px] text-text-secondary font-medium">Total Projects</span>
              </div>
            </div>

            <div className="flex-1 ml-6 space-y-3">
              {projectsOverviewData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-text-secondary font-medium">{item.name}</span>
                  </div>
                  <span className="text-text-primary font-bold">
                    {item.value} <span className="text-text-secondary font-normal text-xs ml-1">({Math.round((item.value / 28) * 100)}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Overview Chart */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-text-primary">Tasks Overview</h2>
            <Link href="/admin/reports" className="text-sm font-bold text-brand-red hover:underline">View all</Link>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tasksOverviewData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {tasksOverviewData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--color-text-primary)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-gilroy font-bold text-text-primary">156</span>
                <span className="text-[10px] text-text-secondary font-medium">Total Tasks</span>
              </div>
            </div>

            <div className="flex-1 ml-6 space-y-3">
              {tasksOverviewData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-text-secondary font-medium">{item.name}</span>
                  </div>
                  <span className="text-text-primary font-bold">
                    {item.value} <span className="text-text-secondary font-normal text-xs ml-1">({Math.round((item.value / 156) * 100)}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 xl:col-span-2 2xl:col-span-1 bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
          <h2 className="text-lg font-bold text-text-primary mb-6">Quick Actions</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-3 p-4 rounded-xl border border-bg-border hover:border-brand-red/50 hover:bg-brand-red/5 transition-all group">
              <div className="w-10 h-10 rounded-full border border-bg-border flex items-center justify-center group-hover:border-brand-red group-hover:text-brand-red text-text-secondary transition-colors">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-text-primary text-center">New Project</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 rounded-xl border border-bg-border hover:border-brand-red/50 hover:bg-brand-red/5 transition-all group">
              <div className="w-10 h-10 rounded-full border border-bg-border flex items-center justify-center group-hover:border-brand-red group-hover:text-brand-red text-text-secondary transition-colors">
                <UserPlus className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-text-primary text-center">Add Client</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 rounded-xl border border-bg-border hover:border-brand-red/50 hover:bg-brand-red/5 transition-all group">
              <div className="w-10 h-10 rounded-full border border-bg-border flex items-center justify-center group-hover:border-brand-red group-hover:text-brand-red text-text-secondary transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-text-primary text-center">Add Team Member</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 rounded-xl border border-bg-border hover:border-brand-red/50 hover:bg-brand-red/5 transition-all group">
              <div className="w-10 h-10 rounded-full border border-bg-border flex items-center justify-center group-hover:border-brand-red group-hover:text-brand-red text-text-secondary transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-text-primary text-center">Generate Report</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
