import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Search, 
  UploadCloud, 
  MoreVertical,
  Download,
  Trash2,
  Grid,
  List as ListIcon
} from 'lucide-react';

export default function FilesIndex() {
  const [viewMode, setViewMode] = useState('grid');
  
  const folders = [
    { id: 1, name: 'Deliverables', items: 24, size: '1.2 GB', color: 'text-blue-400' },
    { id: 2, name: 'Brand Assets', items: 8, size: '450 MB', color: 'text-pink-400' },
    { id: 3, name: 'Invoices', items: 12, size: '24 MB', color: 'text-green-400' },
    { id: 4, name: 'Raw Files', items: 3, size: '4.5 GB', color: 'text-amber-400' },
  ];

  const recentFiles = [
    { id: 101, name: 'Logo_Final_Pack.zip', type: 'zip', size: '45 MB', date: 'Today, 10:30 AM', project: 'Acme Rebrand' },
    { id: 102, name: 'Social_Banner_1.png', type: 'image', size: '2.4 MB', date: 'Yesterday', project: 'Acme Rebrand' },
    { id: 103, name: 'Brand_Guidelines.pdf', type: 'pdf', size: '12 MB', date: 'Oct 12, 2026', project: 'Acme Rebrand' },
    { id: 104, name: 'Promo_Video_v2.mp4', type: 'video', size: '250 MB', date: 'Oct 10, 2026', project: 'Promo Video' },
  ];

  const getFileIcon = (type) => {
    switch(type) {
      case 'image': return <ImageIcon className="w-8 h-8 text-pink-400" />;
      case 'video': return <Video className="w-8 h-8 text-purple-400" />;
      case 'pdf': return <FileText className="w-8 h-8 text-red-400" />;
      default: return <FileText className="w-8 h-8 text-blue-400" />;
    }
  };

  return (
    <ClientLayout onNewRequest={() => {}}>
      <Head title="File Center | Studio99" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">File Center</h1>
          <p className="text-[#94A3B8]">All your project deliverables and assets in one place.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input 
              type="text"
              placeholder="Search files..."
              className="bg-[#111118] border border-[#2A2A3A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#6C3CE1] w-full md:w-64"
            />
          </div>
          <button className="bg-[#6C3CE1] hover:bg-[#5b32be] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <UploadCloud className="w-4 h-4" /> Upload
          </button>
        </div>
      </div>

      {/* Folders Section */}
      <h2 className="text-lg font-bold text-white mb-4">Folders</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {folders.map(folder => (
          <div key={folder.id} className="bg-[#111118] border border-[#2A2A3A] hover:border-[#6C3CE1]/50 p-5 rounded-2xl cursor-pointer transition-colors group">
            <Folder className={`w-8 h-8 mb-4 ${folder.color} group-hover:scale-110 transition-transform`} fill="currentColor" fillOpacity={0.2} />
            <h3 className="font-bold text-white mb-1">{folder.name}</h3>
            <p className="text-xs text-[#94A3B8]">{folder.items} items • {folder.size}</p>
          </div>
        ))}
      </div>

      {/* Recent Files Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Recent Files</h2>
        <div className="flex items-center gap-2 bg-[#111118] border border-[#2A2A3A] rounded-lg p-1">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#2A2A3A] text-white' : 'text-[#94A3B8] hover:text-white'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#2A2A3A] text-white' : 'text-[#94A3B8] hover:text-white'}`}
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentFiles.map(file => (
            <div key={file.id} className="bg-[#111118] border border-[#2A2A3A] rounded-2xl overflow-hidden group">
              <div className="h-32 bg-[#1A1A28] flex items-center justify-center relative">
                {getFileIcon(file.type)}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-[#111118]/80 hover:bg-[#6C3CE1] text-white rounded-md transition-colors backdrop-blur-sm">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white mb-1 truncate" title={file.name}>{file.name}</h3>
                <p className="text-xs text-[#94A3B8] mb-3">{file.size} • {file.date}</p>
                <div className="inline-block bg-[#2A2A3A] text-[#E2E8F0] px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider">
                  {file.project}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#111118] border border-[#2A2A3A] rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1A1A28] border-b border-[#2A2A3A] text-[#94A3B8]">
              <tr>
                <th className="px-6 py-4 font-medium">File Name</th>
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium">Date Uploaded</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A3A]">
              {recentFiles.map(file => (
                <tr key={file.id} className="hover:bg-[#1A1A28]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <span className="font-medium text-white">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#E2E8F0]">{file.project}</td>
                  <td className="px-6 py-4 text-[#94A3B8]">{file.size}</td>
                  <td className="px-6 py-4 text-[#94A3B8]">{file.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-[#94A3B8] hover:text-[#6C3CE1] hover:bg-[#6C3CE1]/10 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#94A3B8] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Drag & Drop Upload Zone (Empty State visually) */}
      <div className="mt-10 border-2 border-dashed border-[#2A2A3A] rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-[#6C3CE1]/50 transition-colors bg-[#111118]/50">
        <div className="w-16 h-16 rounded-full bg-[#1A1A28] flex items-center justify-center mb-4">
          <UploadCloud className="w-8 h-8 text-[#94A3B8]" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Drag and drop files here</h3>
        <p className="text-[#94A3B8] max-w-sm mb-6">Upload project assets, brand guidelines, or documentation directly to your File Center.</p>
        <button className="bg-[#1A1A28] border border-[#2A2A3A] hover:bg-[#2A2A3A] text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
          Browse Files
        </button>
      </div>

    </ClientLayout>
  );
}
