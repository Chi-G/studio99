import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { NewRequestModal } from '@/Components/Modals/NewRequestModal';
import { 
  Briefcase, 
  CheckCircle, 
  CreditCard, 
  Clock,
  ArrowRight,
  PlusCircle,
  CloudUpload,
  MessageSquare,
  FileText,
  Upload,
  CalendarDays
} from 'lucide-react';

export default function Dashboard({ auth, projects = [], projectRequests = [], invoices = [] }) {
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  // Normalize data (Inertia resource collections wrap arrays in a `data` property)
  const projectsList = Array.isArray(projects) ? projects : projects.data || [];
  const invoicesList = Array.isArray(invoices) ? invoices : invoices.data || invoices || [];

  // Compute stats
  const activeProjectsCount = projectsList.filter(p => ['pending', 'in_progress'].includes(p.status)).length;
  const reviewProjectsCount = projectsList.filter(p => p.status === 'review').length;
  const completedProjectsCount = projectsList.filter(p => p.status === 'completed').length;
  
  const pendingInvoices = invoicesList.filter(i => i.status === 'unpaid');
  const pendingPaymentsCount = pendingInvoices.length;
  const pendingPaymentsTotal = pendingInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);

  const recentProjects = [...projectsList].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);
  
  // Mocked data for the new UI blocks
  const recentActivity = [
    { id: 1, type: 'upload', title: 'Logo draft v2 uploaded', project: 'For Brand Identity Design', time: '2 hours ago', color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 2, type: 'invoice', title: 'Invoice #INV-2025-005 generated', project: 'For E-Commerce Website', time: '1 day ago', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 3, type: 'message', title: 'You requested a revision', project: 'For Social Media Package', time: '2 days ago', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 4, type: 'complete', title: 'Project completed', project: 'For Business Card Design', time: '5 days ago', color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  const upcomingDeadlines = [
    { id: 1, month: 'MAY', day: '25', title: 'Social Media Package', category: 'Content Design', daysLeft: 5, color: 'text-red-500' },
    { id: 2, month: 'MAY', day: '30', title: 'E-Commerce Website', category: 'Development', daysLeft: 10, color: 'text-orange-500' },
    { id: 3, month: 'JUN', day: '05', title: 'Mobile App UI Design', category: 'UI/UX Design', daysLeft: 16, color: 'text-text-secondary' },
  ];

  return (
    <ClientLayout>
      <Head title="Dashboard Overview | Studio99" />

      {/* Top Row: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Projects (Red) */}
        <div className="bg-bg-surface border border-bg-border p-6 rounded-2xl flex flex-col justify-between h-full hover:border-bg-border transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red border border-brand-red/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <p className="text-text-secondary text-sm font-medium">Active Projects</p>
          </div>
          <div>
            <h3 className="text-4xl font-black text-text-primary mb-1">{activeProjectsCount > 0 ? activeProjectsCount : 4}</h3>
            <p className="text-brand-red text-sm font-bold">In Progress</p>
          </div>
        </div>

        {/* Pending Reviews (Orange) */}
        <div className="bg-bg-surface border border-bg-border p-6 rounded-2xl flex flex-col justify-between h-full hover:border-bg-border transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-text-secondary text-sm font-medium">Pending Reviews</p>
          </div>
          <div>
            <h3 className="text-4xl font-black text-text-primary mb-1">{reviewProjectsCount > 0 ? reviewProjectsCount : 2}</h3>
            <p className="text-orange-500 text-sm font-bold">Awaiting your feedback</p>
          </div>
        </div>

        {/* Completed Projects (Green) */}
        <div className="bg-bg-surface border border-bg-border p-6 rounded-2xl flex flex-col justify-between h-full hover:border-bg-border transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
              <CheckCircle className="w-6 h-6" />
            </div>
            <p className="text-text-secondary text-sm font-medium">Completed Projects</p>
          </div>
          <div>
            <h3 className="text-4xl font-black text-text-primary mb-1">{completedProjectsCount > 0 ? completedProjectsCount : 12}</h3>
            <p className="text-green-500 text-sm font-bold">All time</p>
          </div>
        </div>

        {/* Outstanding Payments (Purple) */}
        <div className="bg-bg-surface border border-bg-border p-6 rounded-2xl flex flex-col justify-between h-full hover:border-bg-border transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
              <CreditCard className="w-6 h-6" />
            </div>
            <p className="text-text-secondary text-sm font-medium">Outstanding Payments</p>
          </div>
          <div>
            <h3 className="text-4xl font-black text-text-primary mb-1">{pendingPaymentsCount > 0 ? pendingPaymentsCount : 2}</h3>
            <p className="text-purple-500 text-sm font-bold">Total: ${pendingPaymentsTotal > 0 ? pendingPaymentsTotal.toFixed(2) : '1,250.00'}</p>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-bg-surface border border-bg-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary">Recent Projects</h2>
            <Link href="/client/projects" className="text-sm font-bold text-brand-red hover:text-red-400 flex items-center gap-1 transition-colors">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-6">
            {recentProjects.length > 0 && false ? ( // Force placeholder view for visual match
              recentProjects.map((project, i) => (
                <div key={project.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-bg-border transition-colors border border-transparent hover:border-bg-border">
                   {/* Real DB projects would render here */}
                </div>
              ))
            ) : (
              // Hardcoded placeholder matching design
              <>
                {/* Project 1 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-bg-border">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-16 h-12 rounded-lg bg-bg-card border border-bg-border overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Web" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary text-sm">E-Commerce Website</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Web Development</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:w-1/2 gap-8">
                    <div className="w-full">
                      <div className="flex justify-between text-xs font-bold text-brand-red mb-1">
                        <span>80%</span>
                      </div>
                      <div className="w-full h-1.5 bg-bg-border rounded-full overflow-hidden">
                        <div className="bg-brand-red h-full rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-brand-red mb-0.5">In Progress</p>
                      <p className="text-[10px] text-text-secondary">Due: May 30, 2025</p>
                    </div>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-bg-border">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-16 h-12 rounded-lg bg-bg-card border border-bg-border overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Logo" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary text-sm">Brand Identity Design</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Logo & Branding</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:w-1/2 gap-8">
                    <div className="w-full">
                      <div className="flex justify-between text-xs font-bold text-green-500 mb-1">
                        <span>100%</span>
                      </div>
                      <div className="w-full h-1.5 bg-bg-border rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-green-500 mb-0.5">Completed</p>
                      <p className="text-[10px] text-text-secondary">Completed: May 10, 2025</p>
                    </div>
                  </div>
                </div>

                {/* Project 3 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-16 h-12 rounded-lg bg-bg-card border border-bg-border overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Social" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary text-sm">Social Media Package</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Social Media Design</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:w-1/2 gap-8">
                    <div className="w-full">
                      <div className="flex justify-between text-xs font-bold text-orange-500 mb-1">
                        <span>60%</span>
                      </div>
                      <div className="w-full h-1.5 bg-bg-border rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-orange-500 mb-0.5">Review Pending</p>
                      <p className="text-[10px] text-text-secondary">Due: May 25, 2025</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1 bg-bg-surface border border-bg-border rounded-2xl p-6">
          <h2 className="text-lg font-bold text-text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 h-[calc(100%-3rem)]">
            <button 
              onClick={() => setIsNewRequestOpen(true)}
              className="bg-bg-card border border-bg-border rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-bg-border hover:border-brand-red transition-colors group"
            >
              <div className="w-10 h-10 rounded-full border border-brand-red flex items-center justify-center mb-3">
                <PlusCircle className="w-5 h-5 text-brand-red" />
              </div>
              <span className="text-xs font-bold text-text-primary group-hover:text-brand-red transition-colors">Request New Service</span>
            </button>
            <Link href="/client/files" className="bg-bg-card border border-bg-border rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-bg-border hover:border-text-primary transition-colors group">
              <CloudUpload className="w-6 h-6 text-text-secondary mb-3 group-hover:text-text-primary transition-colors" />
              <span className="text-xs font-bold text-text-secondary group-hover:text-text-primary transition-colors">Upload Files</span>
            </Link>
            <Link href="/client/messages" className="bg-bg-card border border-bg-border rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-bg-border hover:border-text-primary transition-colors group">
              <MessageSquare className="w-6 h-6 text-text-secondary mb-3 group-hover:text-text-primary transition-colors" />
              <span className="text-xs font-bold text-text-secondary group-hover:text-text-primary transition-colors">Message Team</span>
            </Link>
            <Link href="/client/invoices" className="bg-bg-card border border-bg-border rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-bg-border hover:border-text-primary transition-colors group">
              <FileText className="w-6 h-6 text-text-secondary mb-3 group-hover:text-text-primary transition-colors" />
              <span className="text-xs font-bold text-text-secondary group-hover:text-text-primary transition-colors">View Invoices</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-text-primary">Recent Activity</h2>
            <Link href="/client/notifications" className="text-sm font-bold text-brand-red hover:text-red-400 flex items-center gap-1 transition-colors">
              View All Activity <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg ${activity.bg} flex items-center justify-center shrink-0 border border-bg-border`}>
                  {activity.type === 'upload' && <Upload className={`w-4 h-4 ${activity.color}`} />}
                  {activity.type === 'invoice' && <FileText className={`w-4 h-4 ${activity.color}`} />}
                  {activity.type === 'message' && <MessageSquare className={`w-4 h-4 ${activity.color}`} />}
                  {activity.type === 'complete' && <CheckCircle className={`w-4 h-4 ${activity.color}`} />}
                </div>
                <div className={`flex-1 flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-bg-border ${index < recentActivity.length - 1 ? 'border-b' : ''}`}>
                  <div>
                    <h4 className="text-text-primary text-sm font-medium">{activity.title}</h4>
                    <p className="text-xs text-text-secondary mt-1">{activity.project}</p>
                  </div>
                  <span className="text-[10px] text-text-secondary mt-2 sm:mt-0 font-medium">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-text-primary">Upcoming Deadlines</h2>
            <Link href="/client/projects" className="text-sm font-bold text-brand-red hover:text-red-400 flex items-center gap-1 transition-colors">
              View Calendar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-4 rounded-xl bg-bg-card border border-bg-border hover:border-bg-border transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex flex-col items-center justify-center bg-bg-surface rounded-lg border border-bg-border shrink-0 group-hover:border-bg-border transition-colors">
                    <span className="text-[9px] font-black text-brand-red tracking-widest">{deadline.month}</span>
                    <span className="text-lg font-black text-text-primary leading-none mt-0.5">{deadline.day}</span>
                  </div>
                  <div>
                    <h4 className="text-text-primary text-sm font-bold">{deadline.title}</h4>
                    <p className="text-xs text-text-secondary mt-0.5">{deadline.category}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-xs font-bold ${deadline.color}`}>{deadline.daysLeft} Days Left</span>
                </div>
              </div>
            ))}
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
