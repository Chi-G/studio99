import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AppModal } from '@/Components/ui/app-modal';
import { Plus, Image as ImageIcon, UploadCloud, Link as LinkIcon, Trash2, Edit3 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPortfolio() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const portfolioItems = [
    { id: 1, title: 'Acme Corp Rebrand', category: 'Branding', image: null, isFeatured: true },
    { id: 2, title: 'Fintech App UI', category: 'Product Design', image: null, isFeatured: true },
    { id: 3, title: 'Crypto Landing Page', category: 'Web Development', image: null, isFeatured: false },
    { id: 4, title: 'Healthcare Pitch Deck', category: 'Presentations', image: null, isFeatured: false },
  ];

  const handleAddItem = (e) => {
    e.preventDefault();
    toast.success('Portfolio item added successfully!');
    setIsAddModalOpen(false);
  };

  const handleDelete = () => {
    toast.error('Item deleted from portfolio.');
  };

  return (
    <AdminLayout>
      <Head title="Portfolio Management | Studio99" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Portfolio</h1>
          <p className="text-[#94A3B8]">Manage the public showcase of Studio99's best work.</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#6C3CE1] hover:bg-[#5b32be] text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_20px_-5px_rgba(108,60,225,0.4)] hover:shadow-[0_0_25px_-5px_rgba(108,60,225,0.6)] flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add New Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {portfolioItems.map((item) => (
          <div key={item.id} className="bg-[#111118] border border-[#2A2A3A] rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            {/* Image Thumbnail */}
            <div className="aspect-[4/3] bg-[#1A1A28] relative overflow-hidden flex items-center justify-center border-b border-[#2A2A3A]">
              <ImageIcon className="w-10 h-10 text-[#2A2A3A] group-hover:scale-110 transition-transform duration-500" />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#6C3CE1] text-white flex items-center justify-center backdrop-blur-sm transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={handleDelete} className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 text-white flex items-center justify-center backdrop-blur-sm transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {item.isFeatured && (
                <div className="absolute top-3 left-3 bg-[#6C3CE1] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-lg">
                  Featured
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-white mb-1 truncate">{item.title}</h3>
              <p className="text-xs text-[#94A3B8]">{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      <AppModal 
        open={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Add Portfolio Item"
        size="lg"
      >
        <form onSubmit={handleAddItem} className="mt-4 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E2E8F0]">Project Title</label>
            <input 
              type="text" 
              placeholder="e.g. Acme Corp Rebrand"
              required
              className="w-full bg-[#111118] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E2E8F0]">Category</label>
              <select required className="w-full bg-[#111118] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors appearance-none">
                <option value="">Select Category...</option>
                <option value="branding">Branding</option>
                <option value="web">Web Development</option>
                <option value="product">Product Design</option>
                <option value="presentation">Presentations</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E2E8F0]">External Link (Optional)</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
                <input 
                  type="url" 
                  placeholder="https://"
                  className="w-full bg-[#111118] border border-[#2A2A3A] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E2E8F0]">Thumbnail Image</label>
            <div className="border-2 border-dashed border-[#2A2A3A] hover:border-[#6C3CE1] bg-[#111118] rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-[#1A1A28] group-hover:bg-[#6C3CE1]/10 flex items-center justify-center mb-4 transition-colors">
                <UploadCloud className="w-6 h-6 text-[#94A3B8] group-hover:text-[#6C3CE1] transition-colors" />
              </div>
              <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-[#475569]">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <input type="checkbox" id="featured" className="w-4 h-4 rounded bg-[#111118] border-[#2A2A3A] text-[#6C3CE1] focus:ring-[#6C3CE1] focus:ring-offset-[#0A0A0F]" />
            <label htmlFor="featured" className="text-sm text-[#E2E8F0] cursor-pointer">Set as Featured (Shows on Landing Page)</label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-6 py-3 rounded-xl font-medium text-[#94A3B8] hover:bg-[#1A1A28] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-3 bg-[#6C3CE1] hover:bg-[#5b32be] text-white rounded-xl font-medium transition-colors shadow-lg"
            >
              Save to Portfolio
            </button>
          </div>
        </form>
      </AppModal>

    </AdminLayout>
  );
}
