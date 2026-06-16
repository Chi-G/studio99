import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { NewRequestModal } from '@/Components/Modals/NewRequestModal';
import { 
  Briefcase, 
  CheckCircle, 
  CreditCard, 
  MessageSquare,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function Dashboard({ auth, projects = [], projectRequests = [], invoices = [] }) {
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  // Normalize data (Inertia resource collections wrap arrays in a `data` property)
  const projectsList = Array.isArray(projects) ? projects : projects.data || [];
  const invoicesList = Array.isArray(invoices) ? invoices : invoices.data || invoices || [];

  // Compute stats
  const activeProjectsCount = projectsList.filter(p => ['pending', 'in_progress', 'review'].includes(p.status)).length;
  const completedProjectsCount = projectsList.filter(p => p.status === 'completed').length;
  const pendingPaymentsCount = invoicesList.filter(i => i.status === 'unpaid').length;
  const unreadMessagesCount = 3; // Placeholder

  const recentProjects = [...projectsList].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
  
  // Placeholder notifications
  const notifications = [
    { id: 1, title: 'Project Updated', message: 'New files uploaded for Branding Package', time: '2 hours ago', type: 'update' },
    { id: 2, title: 'Payment Received', message: 'Invoice #INV-2024-001 has been marked as paid.', time: '1 day ago', type: 'success' },
    { id: 3, title: 'Action Required', message: 'Please review the latest logo concepts.', time: '2 days ago', type: 'warning' },
  ];

  return (
    <ClientLayout onNewRequest={() => setIsNewRequestOpen(true)}>
      <Head title="Dashboard | Studio99" />

      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome back, {auth.user.name.split(' ')[0]}</h1>
        <p className="text-[#94A3B8]">Here's what's happening with your projects today.</p>
      </div>

      {/* Top Row: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#111118] border border-[#2A2A3A] p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-blue-500/20"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[#94A3B8] text-sm font-medium">Active Projects</p>
              <h3 className="text-3xl font-bold text-white">{activeProjectsCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-[#111118] border border-[#2A2A3A] p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-green-500/20"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[#94A3B8] text-sm font-medium">Completed</p>
              <h3 className="text-3xl font-bold text-white">{completedProjectsCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-[#111118] border border-[#2A2A3A] p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-amber-500/20"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[#94A3B8] text-sm font-medium">Pending Payments</p>
              <h3 className="text-3xl font-bold text-white">{pendingPaymentsCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-[#111118] border border-[#2A2A3A] p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6C3CE1]/10 blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-[#6C3CE1]/20"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#6C3CE1]/20 flex items-center justify-center text-[#6C3CE1]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[#94A3B8] text-sm font-medium">Unread Messages</p>
              <h3 className="text-3xl font-bold text-white">{unreadMessagesCount}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Recent Projects (60% ~ col-span-3) */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white font-display">Recent Projects</h2>
            <Link href="/client/projects" className="text-sm font-medium text-[#6C3CE1] hover:text-[#5b32be] flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-[#111118] border border-[#2A2A3A] rounded-2xl overflow-hidden">
            {recentProjects.length > 0 ? (
              <div className="divide-y divide-[#2A2A3A]">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-5 flex items-center justify-between hover:bg-[#1A1A28] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#2A2A3A] flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-[#94A3B8]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{project.name}</h4>
                        <p className="text-sm text-[#94A3B8]">Due: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'TBD'}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        project.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        project.status === 'review' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        project.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {project.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#1A1A28] flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-[#475569]" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No projects yet</h3>
                <p className="text-[#94A3B8] mb-6">Start your first project to see it here.</p>
                <button 
                  onClick={() => setIsNewRequestOpen(true)}
                  className="bg-[#6C3CE1] text-white px-6 py-2 rounded-lg font-medium"
                >
                  Start Project
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications (40% ~ col-span-2) */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-white font-display mb-6">Recent Activity</h2>
          
          <div className="bg-[#111118] border border-[#2A2A3A] rounded-2xl p-6">
            <div className="relative border-l border-[#2A2A3A] ml-3 space-y-8 pb-4">
              {notifications.map((note) => (
                <div key={note.id} className="relative pl-6">
                  <span className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-[#111118] ${
                    note.type === 'success' ? 'bg-green-500' :
                    note.type === 'warning' ? 'bg-amber-500' :
                    'bg-[#6C3CE1]'
                  }`} />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#94A3B8] mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {note.time}
                    </span>
                    <h4 className="font-medium text-white text-sm">{note.title}</h4>
                    <p className="text-[#94A3B8] text-sm mt-1">{note.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-[#2A2A3A] rounded-lg text-sm text-[#94A3B8] hover:bg-[#1A1A28] hover:text-white transition-colors">
              View All Activity
            </button>
          </div>
        </div>
      </div>

      <NewRequestModal 
        open={isNewRequestOpen} 
        onClose={() => setIsNewRequestOpen(false)} 
      />
    </ClientLayout>
  );
}
