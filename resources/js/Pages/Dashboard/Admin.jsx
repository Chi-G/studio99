import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  TrendingUp, 
  Briefcase, 
  Users, 
  CreditCard, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';

const revenueData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 8900 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

export default function AdminDashboard({ auth }) {
  
  const activities = [
    { id: 1, user: 'John Doe', action: 'uploaded proof of payment for', target: 'Acme Rebrand', time: '10 mins ago', type: 'payment' },
    { id: 2, user: 'Alex Morgan', action: 'completed milestone on', target: 'Promo Video', time: '1 hour ago', type: 'project' },
    { id: 3, user: 'Jane Smith', action: 'requested a new project', target: 'Landing Page', time: '3 hours ago', type: 'request' },
    { id: 4, user: 'System', action: 'generated invoice INV-0042 for', target: 'Jane Smith', time: '5 hours ago', type: 'system' },
  ];

  return (
    <AdminLayout>
      <Head title="Admin Dashboard | Studio99" />

      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Overview</h1>
        <p className="text-[#94A3B8]">Here's what's happening with Studio99 today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
        {/* Revenue Card with Sparkline */}
        <div className="col-span-1 xl:col-span-2 bg-[#111118] border border-[#2A2A3A] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-transform group">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[#94A3B8] text-sm font-medium mb-1">Monthly Revenue</p>
              <h3 className="text-3xl font-display font-bold text-white">₦2.4M</h3>
            </div>
            <div className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 12.5%
            </div>
          </div>
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A28', border: '1px solid #2A2A3A', borderRadius: '8px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                  cursor={false}
                />
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-[#111118] border border-[#2A2A3A] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-transform flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#6C3CE1]/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#6C3CE1]" />
            </div>
            <div className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 4.2%
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-display font-bold text-white">24</h3>
            <p className="text-[#94A3B8] text-sm font-medium">Active Projects</p>
          </div>
        </div>

        {/* New Clients */}
        <div className="bg-[#111118] border border-[#2A2A3A] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-transform flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3" /> 2.1%
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-display font-bold text-white">8</h3>
            <p className="text-[#94A3B8] text-sm font-medium">New Clients (Week)</p>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-[#111118] border border-red-500/30 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)] transition-transform flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-red-400" />
            </div>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-bold text-white">5</h3>
            <p className="text-red-300 text-sm font-medium">Pending Approvals</p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-[#111118] border border-[#2A2A3A] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <button className="text-sm text-[#6C3CE1] font-medium hover:text-[#5b32be] transition-colors">View All</button>
          </div>
          
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="mt-1 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-[#2A2A3A] ${
                    activity.type === 'payment' ? 'bg-green-500/10' :
                    activity.type === 'project' ? 'bg-[#6C3CE1]/10' :
                    activity.type === 'request' ? 'bg-amber-500/10' : 'bg-[#1A1A28]'
                  }`}>
                    {activity.type === 'payment' ? <CreditCard className="w-3.5 h-3.5 text-green-400" /> :
                     activity.type === 'project' ? <Briefcase className="w-3.5 h-3.5 text-[#6C3CE1]" /> :
                     activity.type === 'request' ? <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> :
                     <Activity className="w-3.5 h-3.5 text-[#94A3B8]" />}
                  </div>
                  {activity.id !== activities[activities.length - 1].id && (
                    <div className="absolute top-8 bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-[#2A2A3A]" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-white">
                    <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold text-[#94A3B8]">{activity.target}</span>
                  </p>
                  <p className="text-xs text-[#475569] mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Productivity */}
        <div className="bg-[#1A1A28] border border-[#2A2A3A] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Team Productivity</h2>
              <Activity className="w-5 h-5 text-[#94A3B8]" />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-5xl font-display font-bold text-white">92</h3>
              <span className="text-[#94A3B8] font-medium">/ 100</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed mb-8">
              Your team is performing highly efficiently this week. Average task completion time is down by 1.2 days.
            </p>
          </div>
          
          <Link href="/admin/users" className="w-full py-3 bg-[#111118] border border-[#2A2A3A] hover:border-[#6C3CE1]/50 hover:bg-[#2A2A3A] text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-between px-4 group">
            View Team Metrics
            <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>

    </AdminLayout>
  );
}
