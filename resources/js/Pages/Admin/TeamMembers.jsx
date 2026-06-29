import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  UserPlus,
  Search,
  Filter,
  Plus,
  ChevronDown,
  Download,
  Edit2,
  MoreHorizontal
} from 'lucide-react';

export default function TeamMembers() {
  const teamData = [
    { 
      id: 1, 
      name: 'Daniel Johnson', 
      email: 'daniel.j@studio99.com',
      role: 'Project Manager',
      roleColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      department: 'Project Management',
      projects: 6,
      status: 'Active',
      statusColor: 'text-emerald-500',
      joinedDate: 'Jan 15, 2024\n10:30 AM',
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    { 
      id: 2, 
      name: 'Jane Cooper', 
      email: 'jane.c@studio99.com',
      role: 'Graphics Designer',
      roleColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      department: 'Design',
      projects: 5,
      status: 'Active',
      statusColor: 'text-emerald-500',
      joinedDate: 'Jan 10, 2024\n9:15 AM',
      avatar: 'https://i.pravatar.cc/150?u=2'
    },
    { 
      id: 3, 
      name: 'John Michael', 
      email: 'john.m@studio99.com',
      role: 'UI/UX Designer',
      roleColor: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
      department: 'Design',
      projects: 4,
      status: 'Active',
      statusColor: 'text-emerald-500',
      joinedDate: 'Feb 05, 2024\n11:20 AM',
      avatar: 'https://i.pravatar.cc/150?u=3'
    },
    { 
      id: 4, 
      name: 'Sarah Williams', 
      email: 'sarah.w@studio99.com',
      role: 'Social Media Manager',
      roleColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      department: 'Marketing',
      projects: 7,
      status: 'Active',
      statusColor: 'text-emerald-500',
      joinedDate: 'Jan 20, 2024\n1:45 PM',
      avatar: 'https://i.pravatar.cc/150?u=4'
    },
    { 
      id: 5, 
      name: 'David Okafor', 
      email: 'david.o@studio99.com',
      role: 'Video Editor',
      roleColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      department: 'Production',
      projects: 3,
      status: 'On Leave',
      statusColor: 'text-amber-500',
      joinedDate: 'Mar 12, 2024\n9:00 AM',
      avatar: 'https://i.pravatar.cc/150?u=5'
    },
    { 
      id: 6, 
      name: 'Emmanuel Victor', 
      email: 'emma.v@studio99.com',
      role: 'Web Developer',
      roleColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
      department: 'Development',
      projects: 4,
      status: 'Active',
      statusColor: 'text-emerald-500',
      joinedDate: 'Feb 18, 2024\n10:10 AM',
      avatar: 'https://i.pravatar.cc/150?u=6'
    },
    { 
      id: 7, 
      name: 'Blessing Nwosu', 
      email: 'blessing.n@studio99.com',
      role: 'Content Writer',
      roleColor: 'bg-brand-red/10 text-brand-red border-brand-red/20',
      department: 'Content',
      projects: 2,
      status: 'Active',
      statusColor: 'text-emerald-500',
      joinedDate: 'Mar 01, 2024\n2:30 PM',
      avatar: 'https://i.pravatar.cc/150?u=7'
    },
    { 
      id: 8, 
      name: 'Michael Ibrahim', 
      email: 'michael.i@studio99.com',
      role: 'Intern',
      roleColor: 'bg-zinc-500/10 text-text-secondary border-bg-border',
      department: 'Design',
      projects: 0,
      status: 'Invited',
      statusColor: 'text-purple-500',
      joinedDate: 'May 25, 2025\n—',
      avatar: null,
      initials: 'MI'
    },
  ];

  return (
    <AdminLayout>
      <Head title="Team | Admin Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Team</h1>
          <p className="text-text-secondary text-sm">Manage your team members and their roles.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search team members..." 
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
            Add Member
          </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Total Members</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">24</h3>
                <span className="text-[11px] font-medium text-text-secondary mb-0.5">All Team Members</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <UserCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Active Members</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">21</h3>
                <span className="text-[11px] font-bold text-emerald-500 mb-0.5">87.5%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <UserMinus className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">On Leave</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">2</h3>
                <span className="text-[11px] font-bold text-amber-500 mb-0.5">8.3%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
              <UserPlus className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">Invited</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-gilroy font-bold text-text-primary leading-none">1</h3>
                <span className="text-[11px] font-bold text-purple-500 mb-0.5">4.2%</span>
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
            <button className="text-sm font-bold text-text-primary border-b-2 border-brand-red pb-1 whitespace-nowrap">All Members</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Active</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">On Leave</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 whitespace-nowrap border-b-2 border-transparent transition-colors">Invited</button>
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
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Member</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Role</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Department</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-center">Assigned Projects</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Joined Date</th>
                <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {teamData.map((member) => (
                <tr key={member.id} className="hover:bg-bg-base/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-bg-border flex items-center justify-center text-text-primary font-bold text-sm shadow-sm">
                          {member.initials}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-text-primary">{member.name}</p>
                        <p className="text-[11px] text-text-secondary mt-0.5">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded border ${member.roleColor}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-text-primary">{member.department}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm font-bold text-brand-red">{member.projects}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        member.status === 'Active' ? 'bg-emerald-500' :
                        member.status === 'On Leave' ? 'bg-amber-500' : 'bg-purple-500'
                      }`}></span>
                      <span className={`text-sm font-medium ${member.statusColor}`}>
                        {member.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-text-primary whitespace-pre-line">{member.joinedDate}</p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-bg-border hover:bg-bg-border text-text-secondary hover:text-text-primary transition-colors">
                        <Edit2 className="w-4 h-4" />
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
          <p className="text-sm text-text-secondary font-medium">Showing 1 to 8 of 24 members</p>
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
              3
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
