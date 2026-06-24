import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { ProjectDetailModal } from '@/Components/Modals/ProjectDetailModal';
import { 
  Briefcase, 
  Search,
  Filter,
  CheckCircle,
  Clock,
  PauseCircle,
  MoreVertical,
  CalendarDays
} from 'lucide-react';

export default function ProjectsIndex({ auth, projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Normalize data (Inertia resource collections wrap arrays in a `data` property)
  const projectsList = Array.isArray(projects) ? projects : projects.data || [];

  // Mocks matching the design exact data
  const displayProjects = [
    { id: 1, name: 'E-Commerce Website', category: 'Web Development', status: 'in_progress', manager: 'John Smith', deadline: '2025-05-30', progress: 80, daysLeft: 12, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=150&auto=format&fit=crop' },
    { id: 2, name: 'Brand Identity Design', category: 'Logo & Branding', status: 'completed', manager: 'Sarah Johnson', deadline: '2025-05-10', progress: 100, completed: true, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop' },
    { id: 3, name: 'Social Media Package', category: 'Social Media Design', status: 'review', manager: 'Michael Brown', deadline: '2025-05-25', progress: 60, daysLeft: 7, image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=150&auto=format&fit=crop' },
    { id: 4, name: 'Mobile App UI Design', category: 'UI/UX Design', status: 'in_progress', manager: 'Emily Davis', deadline: '2025-06-05', progress: 30, daysLeft: 18, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=150&auto=format&fit=crop' },
    { id: 5, name: 'Marketing Materials', category: 'Graphic Design', status: 'on_hold', manager: 'David Wilson', deadline: '2025-06-15', progress: 0, daysLeft: 28, image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=150&auto=format&fit=crop' },
  ];

  const filteredProjects = displayProjects.filter(p => {
    if (activeFilter === 'all') return true;
    return p.status === activeFilter;
  });

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'review', label: 'Pending Review' },
    { id: 'completed', label: 'Completed' },
    { id: 'on_hold', label: 'On Hold' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-500';
      case 'review': return 'text-orange-500';
      case 'in_progress': return 'text-brand-red';
      case 'on_hold': return 'text-purple-500';
      default: return 'text-[#9CA3AF]';
    }
  };

  const getStatusBg = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500/10 border-green-500/20';
      case 'review': return 'bg-orange-500/10 border-orange-500/20';
      case 'in_progress': return 'bg-brand-red/10 border-brand-red/20';
      case 'on_hold': return 'bg-purple-500/10 border-purple-500/20';
      default: return 'bg-[#2A2A2A] border-[#333]';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'completed': return 'Completed';
      case 'review': return 'Review Pending';
      case 'in_progress': return 'In Progress';
      case 'on_hold': return 'On Hold';
      default: return 'Pending';
    }
  };

  const getProgressColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500';
      case 'review': return 'bg-orange-500';
      case 'in_progress': return 'bg-brand-red';
      case 'on_hold': return 'bg-purple-500';
      default: return 'bg-[#333]';
    }
  };

  return (
    <ClientLayout>
      <Head title="My Projects | Studio99" />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">My Projects</h1>
          <div className="flex items-center text-sm font-medium text-[#9CA3AF] gap-2">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-brand-red">My Projects</span>
          </div>
        </div>
        
        <Link 
          href="/client/requests/create" 
          className="bg-brand-red hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shrink-0 whitespace-nowrap"
        >
          <span className="text-lg leading-none">+</span> Request New Service
        </Link>
      </div>

      {/* Top Row: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Projects */}
        <div className="bg-[#111111] border border-[#2A2A2A] p-6 rounded-2xl flex items-center justify-between hover:border-[#3A3A3A] transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red border border-brand-red/20 shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[#9CA3AF] text-sm font-medium mb-1">Total Projects</p>
              <h3 className="text-3xl font-black text-white leading-none">8</h3>
            </div>
          </div>
          <div className="text-right self-end mt-2">
            <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider">All time</p>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-[#111111] border border-[#2A2A2A] p-6 rounded-2xl flex items-center justify-between hover:border-[#3A3A3A] transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[#9CA3AF] text-sm font-medium mb-1">In Progress</p>
              <h3 className="text-3xl font-black text-white leading-none">4</h3>
            </div>
          </div>
          <div className="text-right self-end mt-2">
            <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider">Currently active</p>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-[#111111] border border-[#2A2A2A] p-6 rounded-2xl flex items-center justify-between hover:border-[#3A3A3A] transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[#9CA3AF] text-sm font-medium mb-1">Completed</p>
              <h3 className="text-3xl font-black text-white leading-none">3</h3>
            </div>
          </div>
          <div className="text-right self-end mt-2">
            <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider">Successfully delivered</p>
          </div>
        </div>

        {/* On Hold */}
        <div className="bg-[#111111] border border-[#2A2A2A] p-6 rounded-2xl flex items-center justify-between hover:border-[#3A3A3A] transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20 shrink-0">
              <PauseCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[#9CA3AF] text-sm font-medium mb-1">On Hold</p>
              <h3 className="text-3xl font-black text-white leading-none">1</h3>
            </div>
          </div>
          <div className="text-right self-end mt-2">
            <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider">Waiting on something</p>
          </div>
        </div>
      </div>

      {/* Filters and List */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl overflow-hidden">
        {/* Filters Header */}
        <div className="p-4 border-b border-[#2A2A2A] flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 xl:pb-0">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-bold transition-colors ${
                  activeFilter === f.id 
                    ? 'border border-[#4A4A4A] text-white bg-[#1A1A1A]' 
                    : 'text-[#9CA3AF] hover:bg-[#1A1A1A] hover:text-white border border-transparent'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input 
                type="text"
                placeholder="Search projects..."
                className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3A3A3A] w-full sm:w-64 placeholder:text-[#4A4A4A]"
              />
            </div>
            <button className="py-2.5 px-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-[#9CA3AF] hover:text-white transition-colors flex items-center justify-center gap-2">
              <Filter className="w-4 h-4 shrink-0" />
              <span className="text-sm font-bold hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A]/50">
                <th className="py-4 px-6 text-xs font-bold text-[#9CA3AF] tracking-widest uppercase w-[35%]">Project</th>
                <th className="py-4 px-6 text-xs font-bold text-[#9CA3AF] tracking-widest uppercase w-[20%]">Progress</th>
                <th className="py-4 px-6 text-xs font-bold text-[#9CA3AF] tracking-widest uppercase w-[15%]">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-[#9CA3AF] tracking-widest uppercase w-[20%]">Due Date</th>
                <th className="py-4 px-6 text-xs font-bold text-[#9CA3AF] tracking-widest uppercase w-[10%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]">
              {filteredProjects.map(project => (
                <tr key={project.id} className="hover:bg-[#151515] transition-colors group">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden shrink-0">
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm group-hover:text-brand-red transition-colors cursor-pointer" onClick={() => setSelectedProject(project)}>{project.name}</h4>
                        <p className="text-[11px] text-[#9CA3AF] mt-0.5 mb-1">{project.category}</p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-brand-red flex items-center justify-center text-[8px] font-black text-white shrink-0">
                            {project.manager.charAt(0)}
                          </div>
                          <p className="text-[10px] text-[#9CA3AF]"><span className="text-gray-300 font-medium">{project.manager}</span> • Project Manager</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="w-full max-w-[140px]">
                      <span className={`text-xs font-bold block mb-2 ${getStatusColor(project.status)}`}>{project.progress}%</span>
                      <div className="w-full h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${getProgressColor(project.status)}`} style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold border ${getStatusBg(project.status)} ${getStatusColor(project.status)} whitespace-nowrap`}>
                      {getStatusLabel(project.status)}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-start gap-2">
                      <CalendarDays className="w-4 h-4 text-[#9CA3AF] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        {project.completed ? (
                          <p className="text-[11px] text-green-500 font-medium mt-0.5">Completed</p>
                        ) : (
                          <p className={`text-[11px] font-medium mt-0.5 ${getStatusColor(project.status)}`}>{project.daysLeft} days left</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-bold text-white hover:text-brand-red transition-colors whitespace-nowrap"
                      >
                        View Details
                      </button>
                      <button className="p-1.5 text-[#9CA3AF] hover:text-white hover:bg-[#2A2A2A] rounded-md transition-colors shrink-0">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-[#9CA3AF]">
            Showing 1 to {filteredProjects.length} of 8 projects
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] transition-colors disabled:opacity-50">
              <span className="sr-only">Previous</span>
              &lt;
            </button>
            <button className="w-8 h-8 rounded border border-brand-red bg-brand-red flex items-center justify-center text-white font-bold transition-colors">
              1
            </button>
            <button className="w-8 h-8 rounded border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] transition-colors">
              <span className="sr-only">Next</span>
              &gt;
            </button>
          </div>
        </div>
      </div>
      
      <ProjectDetailModal 
        open={selectedProject !== null} 
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </ClientLayout>
  );
}
