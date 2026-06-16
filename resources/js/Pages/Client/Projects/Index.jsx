import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { NewRequestModal } from '@/Components/Modals/NewRequestModal';
import { ProjectDetailModal } from '@/Components/Modals/ProjectDetailModal';
import { Progress } from '@/Components/ui/progress';
import { 
  Briefcase, 
  Search,
  Filter,
  ArrowRight,
  Clock,
  PenTool,
  MonitorPlay,
  Code
} from 'lucide-react';

export default function ProjectsIndex({ auth, projects = [] }) {
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Normalize data (Inertia resource collections wrap arrays in a `data` property)
  const projectsList = Array.isArray(projects) ? projects : projects.data || [];

  // Mocks if empty
  const displayProjects = projectsList.length > 0 ? projectsList : [
    { id: 1, name: 'Acme Rebrand', status: 'in_progress', service_type: 'graphics', deadline: '2026-10-15', progress: 65 },
    { id: 2, name: 'Promo Video', status: 'review', service_type: 'video', deadline: '2026-09-30', progress: 95 },
    { id: 3, name: 'Landing Page', status: 'pending', service_type: 'web', deadline: null, progress: 0 },
    { id: 4, name: 'Social Media Assets', status: 'completed', service_type: 'social', deadline: '2026-08-15', progress: 100 },
  ];

  const filteredProjects = displayProjects.filter(p => {
    if (activeFilter === 'all') return true;
    return p.status === activeFilter;
  });

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'pending', label: 'Pending' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'review', label: 'In Review' },
    { id: 'completed', label: 'Completed' },
  ];

  const getServiceIcon = (type) => {
    switch(type) {
      case 'graphics': return <PenTool className="w-5 h-5 text-blue-400" />;
      case 'video': return <MonitorPlay className="w-5 h-5 text-purple-400" />;
      case 'web': return <Code className="w-5 h-5 text-green-400" />;
      default: return <Briefcase className="w-5 h-5 text-[#94A3B8]" />;
    }
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
    <ClientLayout onNewRequest={() => setIsNewRequestOpen(true)}>
      <Head title="My Projects | Studio99" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">My Projects</h1>
          <p className="text-[#94A3B8]">Track and manage all your design and development requests.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input 
              type="text"
              placeholder="Search projects..."
              className="bg-[#111118] border border-[#2A2A3A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#6C3CE1] w-full md:w-64"
            />
          </div>
          <button className="p-2 bg-[#111118] border border-[#2A2A3A] rounded-lg text-[#94A3B8] hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto pb-4 mb-6 hide-scrollbar gap-2">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === f.id 
                ? 'bg-[#2A2A3A] text-white shadow-sm' 
                : 'text-[#94A3B8] hover:bg-[#1A1A28] hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-[#111118] border border-[#2A2A3A] rounded-2xl p-6 hover:border-[#6C3CE1]/50 transition-colors group flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#1A1A28] flex items-center justify-center border border-[#2A2A3A] group-hover:bg-[#2A2A3A] transition-colors">
                {getServiceIcon(project.service_type)}
              </div>
              {getStatusBadge(project.status)}
            </div>

            <div className="mb-6 flex-1">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{project.name}</h3>
              <div className="flex items-center text-sm text-[#94A3B8] gap-1.5">
                <Clock className="w-4 h-4" />
                {project.deadline ? (
                  <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
                ) : (
                  <span>Deadline pending</span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#94A3B8]">Progress</span>
                <span className="text-white font-bold">{project.progress || 0}%</span>
              </div>
              <Progress value={project.progress || 0} className="h-2" />
            </div>

            <button 
              onClick={() => setSelectedProject(project)}
              className="w-full py-2.5 bg-[#1A1A28] hover:bg-[#2A2A3A] border border-[#2A2A3A] rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 group-hover:border-[#6C3CE1]/30"
            >
              View Details <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-white transition-colors" />
            </button>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-[#111118] border border-[#2A2A3A] rounded-2xl">
          <Briefcase className="w-12 h-12 text-[#2A2A3A] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
          <p className="text-[#94A3B8]">We couldn't find any projects matching your filter.</p>
        </div>
      )}

      {/* Modals */}
      <NewRequestModal 
        open={isNewRequestOpen} 
        onClose={() => setIsNewRequestOpen(false)} 
      />
      
      <ProjectDetailModal 
        open={selectedProject !== null} 
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </ClientLayout>
  );
}
