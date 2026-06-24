import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { 
  Folder, 
  Search, 
  Filter,
  CheckCircle2,
  CloudDownload,
  Download,
  MoreVertical,
  UploadCloud,
  Check,
  ArrowUpCircle
} from 'lucide-react';

export default function FilesIndex() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Mock exact data from design
  const filesList = [
    { id: 1, name: 'Homepage Design v2.pdf', project: 'E-Commerce Website', projectCategory: 'Web Development', type: 'Design', format: 'PDF', uploadedOn: 'May 20, 2025', uploadedBy: 'John Smith', status: 'need_review', size: '2.4 MB' },
    { id: 2, name: 'Website Assets.zip', project: 'E-Commerce Website', projectCategory: 'Web Development', type: 'Assets', format: 'ZIP', uploadedOn: 'May 18, 2025', uploadedBy: 'John Smith', status: 'approved', size: '45.8 MB' },
    { id: 3, name: 'Brand Logo Final.jpg', project: 'Brand Identity Design', projectCategory: 'Logo & Branding', type: 'Image', format: 'JPG', uploadedOn: 'May 12, 2025', uploadedBy: 'Sarah Johnson', status: 'approved', size: '1.2 MB' },
    { id: 4, name: 'Logo Variations.ai', project: 'Brand Identity Design', projectCategory: 'Logo & Branding', type: 'Design', format: 'AI', uploadedOn: 'May 10, 2025', uploadedBy: 'Sarah Johnson', status: 'final', size: '8.7 MB' },
    { id: 5, name: 'Content Strategy.pdf', project: 'Social Media Package', projectCategory: 'Social Media', type: 'Document', format: 'PDF', uploadedOn: 'May 08, 2025', uploadedBy: 'Michael Brown', status: 'approved', size: '1.8 MB' },
    { id: 6, name: 'Promo Video Final.mp4', project: 'Social Media Package', projectCategory: 'Social Media', type: 'Video', format: 'MP4', uploadedOn: 'May 05, 2025', uploadedBy: 'Michael Brown', status: 'approved', size: '128.4 MB' },
    { id: 7, name: 'Project Brief.docx', project: 'Mobile App UI Design', projectCategory: 'UI/UX Design', type: 'Document', format: 'DOC', uploadedOn: 'Apr 30, 2025', uploadedBy: 'Emily Davis', status: 'archived', size: '56 KB' },
    { id: 8, name: 'Pricing Breakdown.xlsx', project: 'E-Commerce Website', projectCategory: 'Web Development', type: 'Document', format: 'XLS', uploadedOn: 'Apr 28, 2025', uploadedBy: 'John Smith', status: 'archived', size: '34 KB' },
  ];

  const filters = [
    { id: 'all', label: 'All Files' },
    { id: 'need_review', label: 'Need Review', count: 6 },
    { id: 'approved', label: 'Approved' },
    { id: 'final', label: 'Final Deliverables' },
    { id: 'archived', label: 'Archived' },
  ];

  const getFormatBadge = (format) => {
    switch(format) {
      case 'PDF': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'ZIP': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'JPG': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'AI': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'MP4': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'DOC': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      case 'XLS': return 'bg-green-400/10 text-green-400 border-green-400/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'need_review': return 'text-orange-500';
      case 'approved': return 'text-green-500';
      case 'final': return 'text-purple-500';
      case 'archived': return 'text-[#9CA3AF]';
      default: return 'text-[#9CA3AF]';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'need_review': return 'Need Review';
      case 'approved': return 'Approved';
      case 'final': return 'Final';
      case 'archived': return 'Archived';
      default: return status;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Design': return 'text-red-500';
      case 'Assets': return 'text-blue-500';
      case 'Image': return 'text-green-500';
      case 'Document': return 'text-purple-500';
      case 'Video': return 'text-pink-500';
      default: return 'text-[#9CA3AF]';
    }
  };

  return (
    <ClientLayout>
      <Head title="Files & Deliverables | Studio99" />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Files & Deliverables</h1>
          <div className="flex items-center text-sm font-medium text-[#9CA3AF] gap-2">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-brand-red">Files & Deliverables</span>
          </div>
          <p className="text-[#9CA3AF] mt-4">Access all project files, deliverables and documents shared by our team.</p>
        </div>
        
        <button className="bg-brand-red hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shrink-0">
          <UploadCloud className="w-5 h-5" /> Upload Files
        </button>
      </div>

      {/* Top Row: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Total Files */}
        <div className="bg-[#111111] border border-[#2A2A2A] p-6 rounded-2xl flex items-center gap-4 hover:border-[#3A3A3A] transition-colors">
          <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center text-white shrink-0">
            <Folder className="w-6 h-6 fill-current" />
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-0.5">Total Files</p>
            <h3 className="text-3xl font-black text-white leading-none">128</h3>
            <p className="text-[11px] text-[#9CA3AF] mt-1">All projects</p>
          </div>
        </div>

        {/* Pending Review */}
        <div className="bg-[#111111] border border-[#2A2A2A] p-6 rounded-2xl flex items-center gap-4 hover:border-[#3A3A3A] transition-colors">
          <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white shrink-0">
            <CloudDownload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-0.5">Pending Review</p>
            <h3 className="text-3xl font-black text-white leading-none">6</h3>
            <p className="text-[11px] text-[#9CA3AF] mt-1">Files awaiting your review</p>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-[#111111] border border-[#2A2A2A] p-6 rounded-2xl flex items-center gap-4 hover:border-[#3A3A3A] transition-colors">
          <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-0.5">Approved</p>
            <h3 className="text-3xl font-black text-white leading-none">34</h3>
            <p className="text-[11px] text-[#9CA3AF] mt-1">Files approved</p>
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-[#111111] border border-[#2A2A2A] p-6 rounded-2xl flex items-center gap-4 hover:border-[#3A3A3A] transition-colors">
          <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-white shrink-0">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-0.5">Downloads</p>
            <h3 className="text-3xl font-black text-white leading-none">312</h3>
            <p className="text-[11px] text-[#9CA3AF] mt-1">All time downloads</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column (Table) */}
        <div className="xl:col-span-2">
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl overflow-hidden">
            {/* Filters Header */}
            <div className="p-4 border-b border-[#2A2A2A] flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 xl:pb-0">
                {filters.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors ${
                      activeFilter === f.id 
                        ? 'text-white border-b-2 border-brand-red rounded-none px-2' 
                        : 'text-[#9CA3AF] hover:text-white px-2'
                    }`}
                  >
                    {f.label}
                    {f.count && (
                      <span className="w-5 h-5 rounded-full bg-brand-red text-white text-[10px] flex items-center justify-center font-black">
                        {f.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <input 
                    type="text"
                    placeholder="Search files..."
                    className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3A3A3A] w-full xl:w-48 placeholder:text-[#4A4A4A]"
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
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A]/50">
                    <th className="py-4 px-6 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">File Name</th>
                    <th className="py-4 px-6 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Project</th>
                    <th className="py-4 px-6 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Type</th>
                    <th className="py-4 px-6 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Uploaded On</th>
                    <th className="py-4 px-6 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2A]">
                  {filesList.map(file => (
                    <tr key={file.id} className="hover:bg-[#1A1A1A] transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border text-[11px] font-black shrink-0 ${getFormatBadge(file.format)}`}>
                            {file.format}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm truncate max-w-[180px]">{file.name}</p>
                            <p className="text-[11px] text-[#9CA3AF] mt-0.5">{file.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-white text-sm">{file.project}</p>
                        <p className="text-[11px] text-[#9CA3AF] mt-0.5">{file.projectCategory}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-medium ${getTypeColor(file.type)}`}>{file.type}</span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-white text-sm">{file.uploadedOn}</p>
                        <p className="text-[11px] text-[#9CA3AF] mt-0.5">by {file.uploadedBy}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-bold ${getStatusClass(file.status)}`}>
                          {getStatusLabel(file.status)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-[#9CA3AF] hover:text-white border border-[#2A2A2A] bg-[#111111] rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-[#9CA3AF] hover:text-white border border-[#2A2A2A] bg-[#111111] rounded-lg transition-colors">
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
            <div className="p-4 border-t border-[#2A2A2A] flex items-center justify-between">
              <p className="text-xs font-medium text-[#9CA3AF]">Showing 1 to 8 of 128 files</p>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] transition-colors disabled:opacity-50">
                  &lt;
                </button>
                <button className="w-8 h-8 rounded border border-brand-red bg-brand-red flex items-center justify-center text-white font-bold transition-colors">
                  1
                </button>
                <button className="w-8 h-8 rounded border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] transition-colors">
                  3
                </button>
                <span className="text-[#9CA3AF] px-2">...</span>
                <button className="w-8 h-8 rounded border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] transition-colors">
                  16
                </button>
                <button className="w-8 h-8 rounded border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] transition-colors">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Widgets) */}
        <div className="space-y-6">
          {/* Storage Overview */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 relative">
            <h3 className="text-lg font-bold text-white mb-6">Storage Overview</h3>
            
            <div className="flex justify-center mb-6">
              <div className="relative w-40 h-40">
                {/* Custom SVG Donut Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="#2A2A2A" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="#DC2626" 
                    strokeWidth="8" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="190.9" /* 24% of 251.2 */
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">2.4 GB</span>
                  <span className="text-[10px] text-[#9CA3AF]">of 10 GB used</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-red"></div>
                  <span className="text-[#9CA3AF]">Uploaded Files</span>
                </div>
                <span className="text-white font-medium">2.4 GB</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2A2A2A]"></div>
                  <span className="text-[#9CA3AF]">Available Space</span>
                </div>
                <span className="text-white font-medium">7.6 GB</span>
              </div>
            </div>

            <button className="w-full py-3 bg-transparent border border-[#4A4A4A] hover:border-white text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
              <ArrowUpCircle className="w-4 h-4" /> Upgrade Storage
            </button>
          </div>

          {/* Upload New Files Drag & Drop */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Upload New Files</h3>
            <div className="border-2 border-dashed border-[#4A4A4A] hover:border-brand-red bg-[#151515] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-[#2A2A2A] group-hover:bg-brand-red/20 rounded-full flex items-center justify-center mb-4 transition-colors">
                <UploadCloud className="w-6 h-6 text-[#9CA3AF] group-hover:text-brand-red transition-colors" />
              </div>
              <p className="text-sm font-bold text-white mb-1">Drag & drop files here</p>
              <p className="text-xs text-[#9CA3AF] mb-4">or</p>
              <button className="bg-brand-red hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors mb-2">
                Choose Files
              </button>
              <p className="text-[10px] text-[#9CA3AF]">Max file size: 100MB</p>
            </div>
          </div>

          {/* File Guidelines */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">File Guidelines</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Allowed formats: <span className="text-white font-medium">PDF, DOC, DOCX, JPG, PNG, ZIP, AI, PSD, MP4, MOV</span>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <p className="text-xs text-[#9CA3AF] leading-relaxed">Max file size: <span className="text-white font-medium">100MB</span></p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <p className="text-xs text-[#9CA3AF] leading-relaxed">Keep your files organized</p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <p className="text-xs text-[#9CA3AF] leading-relaxed">Name files clearly for easy reference</p>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </ClientLayout>
  );
}
