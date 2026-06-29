import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import TeamLayout from '@/Layouts/TeamLayout';
import {
  ClipboardList,
  Clock,
  CheckSquare,
  UploadCloud,
  Activity,
  MessageSquare,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  User
} from 'lucide-react';

export default function TeamDashboard() {
  const { auth } = usePage().props;

  return (
    <TeamLayout>
      <Head title="Team Dashboard | Studio99" />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1A1010] to-[#0D0808] border border-brand-red/20 rounded-2xl p-8 mb-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        {/* Abstract red wave background lines could go here using an absolute SVG, but we simulate it */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-full h-32 bg-brand-red/30 blur-[100px] rounded-full"></div>
        </div>

        <div className="relative z-10 md:max-w-xl text-left">
          <h1 className="text-3xl lg:text-4xl font-gilroy font-bold text-white mb-3">
            Welcome back, {auth.user.name.split(' ')[0]}! <span className="inline-block animate-bounce-slow">👋</span>
          </h1>
          <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
            Access assigned projects, update progress, upload deliverables, and collaborate with clients and management.
          </p>
        </div>

        {/* Big red 99 folder icon */}
        <div className="relative z-10 hidden md:flex shrink-0 mt-6 md:mt-0 items-center justify-center">
          <div className="w-32 h-24 bg-brand-red rounded-xl shadow-[0_0_40px_rgba(227,30,36,0.3)] relative flex items-center justify-center border-t-8 border-brand-red/80">
            <span className="text-4xl font-black text-white/90">99</span>
            {/* Overlay graphic elements */}
            <div className="absolute -bottom-4 -right-4 bg-[#111] border border-white/10 rounded-lg p-2 shadow-xl flex flex-col gap-1.5">
               <div className="w-12 h-2 bg-white/20 rounded-full"></div>
               <div className="w-8 h-2 bg-white/20 rounded-full"></div>
               <div className="w-10 h-2 bg-white/20 rounded-full"></div>
            </div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#111] rounded-full border border-brand-red/30 flex items-center justify-center">
              <Activity className="w-4 h-4 text-brand-red" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm hover:border-brand-red/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0 border border-brand-red/20">
              <ClipboardList className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <p className="text-text-secondary text-xs font-medium mb-1">Assigned Tasks</p>
              <h3 className="text-3xl font-gilroy font-bold text-text-primary leading-none">6</h3>
              <p className="text-[#52525B] text-[11px] font-medium mt-1.5">Total tasks assigned to you</p>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm hover:border-amber-500/30 transition-colors relative overflow-hidden">
          {/* Vertical indicator line */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-amber-500 rounded-l-full"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-text-secondary text-xs font-medium mb-1">In Progress</p>
              <h3 className="text-3xl font-gilroy font-bold text-text-primary leading-none">3</h3>
              <p className="text-[#52525B] text-[11px] font-medium mt-1.5">Tasks you are currently working on</p>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm hover:border-emerald-500/30 transition-colors relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-emerald-500 rounded-l-full"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <CheckSquare className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-text-secondary text-xs font-medium mb-1">Completed This Week</p>
              <h3 className="text-3xl font-gilroy font-bold text-text-primary leading-none">5</h3>
              <p className="text-[#52525B] text-[11px] font-medium mt-1.5">Tasks completed successfully</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* My Assigned Tasks */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-text-primary">My Assigned Tasks</h2>
            <Link href="/team/tasks" className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col gap-5">
            {[
              { client: 'Quick Capital Ltd', service: 'Brand Identity Design', status: 'In Progress', statusColor: 'text-brand-red', date: 'Today, 4:00 PM' },
              { client: 'SparkPoint Solutions', service: 'Social Media Designs', status: 'To Do', statusColor: 'text-amber-500', date: 'May 28, 2025' },
              { client: 'Onestop.ng', service: 'Website Banners', status: 'In Progress', statusColor: 'text-brand-red', date: 'May 29, 2025' }
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between border-b border-bg-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${task.status === 'In Progress' ? 'bg-brand-red' : 'bg-amber-500'}`}></div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary mb-0.5">{task.client}</h4>
                    <p className="text-xs text-text-secondary">{task.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[11px] font-bold ${task.statusColor} mb-1 block`}>{task.status}</span>
                  <span className="text-xs text-text-secondary font-medium">{task.date}</span>
                </div>
              </div>
            ))}
          </div>

          <Link href="/team/tasks" className="mt-6 w-full py-2.5 rounded-xl border border-bg-border bg-bg-card hover:bg-bg-surface text-xs font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center gap-2">
            View All Tasks <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-text-primary">Upcoming Deadlines</h2>
            <Link href="/team/tasks" className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col gap-5">
            {[
              { client: 'Quick Capital Ltd', service: 'Brand Identity Design', urgency: 'Today', urgencyColor: 'text-brand-red', time: '4:00 PM' },
              { client: 'SparkPoint Solutions', service: 'Social Media Designs', urgency: 'May 28', urgencyColor: 'text-amber-500', time: '11:59 PM' },
              { client: 'Apex Consulting', service: 'Presentation Design', urgency: 'May 30', urgencyColor: 'text-text-secondary', time: '11:59 PM' }
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between border-b border-bg-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-bg-card border border-bg-border flex items-center justify-center shrink-0">
                    <CalendarDays className="w-4 h-4 text-text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary mb-0.5">{task.client}</h4>
                    <p className="text-xs text-text-secondary">{task.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[11px] font-bold ${task.urgencyColor} mb-1 block`}>{task.urgency}</span>
                  <span className="text-xs text-text-secondary font-medium">{task.time}</span>
                </div>
              </div>
            ))}
          </div>

          <Link href="/team/tasks" className="mt-6 w-full py-2.5 rounded-xl border border-bg-border bg-bg-card hover:bg-bg-surface text-xs font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center gap-2">
            View All Deadlines <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-text-primary">Recent Activity</h2>
            <Link href="/team/activity" className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col gap-5">
            {[
              { icon: UploadCloud, iconColor: 'text-brand-red', border: 'border-brand-red/20', bg: 'bg-brand-red/10', text: 'You uploaded Logo_Final.ai', subtext: 'Quick Capital Ltd', time: '2h ago' },
              { icon: CheckSquare, iconColor: 'text-amber-500', border: 'border-amber-500/20', bg: 'bg-amber-500/10', text: 'Status changed to Review', subtext: 'SparkPoint Solutions', time: '5h ago' },
              { icon: MessageSquare, iconColor: 'text-emerald-500', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', text: 'Client requested revision', subtext: 'Onestop.ng', time: '1d ago' },
              { icon: User, iconColor: 'text-[#6C3CE1]', border: 'border-[#6C3CE1]/20', bg: 'bg-[#6C3CE1]/10', text: 'Task assigned by John (Manager)', subtext: 'Apex Consulting', time: '1d ago' }
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between border-b border-bg-border pb-3.5 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${activity.bg} ${activity.border} border flex items-center justify-center shrink-0`}>
                    <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-text-primary mb-0.5">{activity.text}</h4>
                    <p className="text-[11px] text-text-secondary">{activity.subtext}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-zinc-500 font-medium">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>

          <Link href="/team/activity" className="mt-4 w-full py-2.5 rounded-xl border border-bg-border bg-bg-card hover:bg-bg-surface text-xs font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center gap-2">
            View All Activity Logs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <h3 className="text-base font-bold text-text-primary whitespace-nowrap">Quick Actions</h3>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-bg-border hover:border-bg-border/80 bg-bg-card hover:bg-bg-surface text-text-primary text-sm font-medium transition-all">
            <UploadCloud className="w-4 h-4 text-text-secondary" /> Upload Deliverable
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-bg-border hover:border-bg-border/80 bg-bg-card hover:bg-bg-surface text-text-primary text-sm font-medium transition-all">
            <Activity className="w-4 h-4 text-text-secondary" /> Update Progress
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-bg-border hover:border-bg-border/80 bg-bg-card hover:bg-bg-surface text-text-primary text-sm font-medium transition-all">
            <MessageSquare className="w-4 h-4 text-text-secondary" /> Send Message
          </button>
        </div>
      </div>
    </TeamLayout>
  );
}
