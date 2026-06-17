import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AppModal } from '@/Components/ui/app-modal';
import { Search, Briefcase, ChevronDown, Check, Users, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminProjects() {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { id: 1, name: 'Acme Rebrand', client: 'John Doe', status: 'in_progress', deadline: 'Oct 15, 2026', assignee: 'Alex M.' },
    { id: 2, name: 'Promo Video', client: 'Jane Smith', status: 'review', deadline: 'Sep 30, 2026', assignee: 'Sarah L.' },
    { id: 3, name: 'Landing Page', client: 'Acme Corp', status: 'pending', deadline: 'TBD', assignee: 'Unassigned' },
  ];

  const handleAssignClick = (project) => {
    setSelectedProject(project);
    setIsAssignModalOpen(true);
  };

  const confirmAssignment = () => {
    toast.success('Project successfully assigned to team member!');
    setIsAssignModalOpen(false);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed': return <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Completed</span>;
      case 'review': return <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Review</span>;
      case 'in_progress': return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">In Progress</span>;
      default: return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Pending</span>;
    }
  };

  return (
    <AdminLayout>
      <Head title="Manage Projects | Studio99" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Projects</h1>
          <p className="text-[#94A3B8]">Manage statuses and assign tasks to the team.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input 
            type="text"
            placeholder="Search projects..."
            className="bg-[#111118] border border-[#2A2A3A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#6C3CE1] w-full"
          />
        </div>
      </div>

      <div className="bg-[#111118] border border-[#2A2A3A] rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1A1A28] border-b border-[#2A2A3A] text-[#94A3B8]">
            <tr>
              <th className="px-6 py-4 font-medium">Project Name</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Deadline</th>
              <th className="px-6 py-4 font-medium">Assignee</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A3A]">
            {projects.map(project => (
              <tr key={project.id} className="hover:bg-[#1A1A28]/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#1A1A28] border border-[#2A2A3A] flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-[#94A3B8]" />
                    </div>
                    <span className="font-bold text-white">{project.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#E2E8F0]">{project.client}</td>
                <td className="px-6 py-4 text-[#94A3B8]">{project.deadline}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-[#E2E8F0]">
                    <div className="w-6 h-6 rounded-full bg-[#2A2A3A] flex items-center justify-center text-[10px] font-bold">
                      {project.assignee.charAt(0)}
                    </div>
                    {project.assignee}
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(project.status)}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleAssignClick(project)}
                    className="text-xs font-medium text-[#6C3CE1] hover:text-white bg-[#6C3CE1]/10 hover:bg-[#6C3CE1] px-3 py-1.5 rounded transition-colors"
                  >
                    Assign Team
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AppModal 
        open={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)}
        title="Assign to Team Member"
      >
        {selectedProject && (
          <div className="mt-4 space-y-6">
            <div className="bg-[#111118] p-4 rounded-xl border border-[#2A2A3A]">
              <h4 className="font-bold text-white mb-1">{selectedProject.name}</h4>
              <p className="text-sm text-[#94A3B8]">Client: {selectedProject.client}</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-[#E2E8F0]">Select Member</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <select className="w-full bg-[#111118] border border-[#2A2A3A] rounded-xl pl-9 pr-10 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors appearance-none">
                  <option value="">-- Choose team member --</option>
                  <option value="1">Alex Morgan (Lead Designer)</option>
                  <option value="2">Sarah Lee (Video Editor)</option>
                  <option value="3">Mike Johnson (Developer)</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
              </div>
            </div>

            <button 
              onClick={confirmAssignment}
              className="w-full bg-[#6C3CE1] hover:bg-[#5b32be] text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Confirm Assignment
            </button>
          </div>
        )}
      </AppModal>

    </AdminLayout>
  );
}
