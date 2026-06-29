import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import TeamLayout from '@/Layouts/TeamLayout';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  FileArchive,
  CheckCircle2,
  Clock,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export default function UploadDeliverables() {
  const [isUploading, setIsUploading] = useState(false);

  const recentDeliverables = [
    { id: 1, name: 'Homepage_Final_v2.fig', project: 'Website Redesign', size: '24 MB', date: 'Today, 10:30 AM', status: 'Approved', type: 'design' },
    { id: 2, name: 'Brand_Guidelines.pdf', project: 'Brand Identity Design', size: '5.2 MB', date: 'Yesterday', status: 'Pending Review', type: 'document' },
    { id: 3, name: 'Social_Assets_May.zip', project: 'Social Media Management', size: '128 MB', date: 'May 24, 2025', status: 'Approved', type: 'archive' },
    { id: 4, name: 'Promo_Video_Draft.mp4', project: 'Event Promo Video', size: '450 MB', date: 'May 20, 2025', status: 'Rejected', type: 'video' },
  ];

  const handleUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast.success('Deliverable uploaded successfully!');
    }, 1500);
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'design': return <ImageIcon className="w-5 h-5 text-brand-red" />;
      case 'document': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'archive': return <FileArchive className="w-5 h-5 text-amber-500" />;
      default: return <FileText className="w-5 h-5 text-text-secondary" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[11px] font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> Approved</span>;
      case 'Pending Review': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[11px] font-bold"><Clock className="w-3.5 h-3.5" /> In Review</span>;
      case 'Rejected': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-red/10 text-brand-red border border-brand-red/20 rounded-full text-[11px] font-bold"><AlertCircle className="w-3.5 h-3.5" /> Revision Needed</span>;
      default:
        return null;
    }
  };

  return (
    <TeamLayout>
      <Head title="Upload Deliverables | Team Dashboard" />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Upload Deliverables</h1>
        <p className="text-text-secondary text-sm">Submit your completed work for review and client delivery.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Form Column */}
        <div className="lg:col-span-1">
          <form onSubmit={handleUpload} className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm sticky top-28">
            <h2 className="text-lg font-bold text-text-primary mb-5">New Submission</h2>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Select Project</label>
                <select required className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/50 transition-all appearance-none">
                  <option value="">Select a project...</option>
                  <option value="1">Website Redesign - Quick Capital</option>
                  <option value="2">Brand Identity - SparkPoint</option>
                  <option value="3">Social Media - GreenLife Farms</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">File Description</label>
                <textarea 
                  required
                  placeholder="What are you uploading?"
                  rows="3"
                  className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/50 transition-all resize-none custom-scrollbar"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Upload File</label>
                <div className="border-2 border-dashed border-bg-border hover:border-brand-red/50 bg-bg-base rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-bg-surface group-hover:bg-brand-red/10 flex items-center justify-center mb-4 transition-colors">
                    <UploadCloud className="w-6 h-6 text-text-secondary group-hover:text-brand-red transition-colors" />
                  </div>
                  <p className="text-text-primary text-sm font-bold mb-1">Click to upload or drag and drop</p>
                  <p className="text-[11px] text-text-secondary">ZIP, PDF, FIG, MP4 (max. 500MB)</p>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-3 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl font-bold text-sm whitespace-nowrap transition-colors shadow-lg shadow-brand-red/20 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 shrink-0 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4 shrink-0" />
                      Submit Deliverable
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Recent Uploads Column */}
        <div className="lg:col-span-2">
          <div className="bg-bg-surface border border-bg-border rounded-2xl flex flex-col overflow-hidden h-full">
            <div className="p-6 border-b border-bg-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-primary">Recent Submissions</h2>
              <button className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">View All</button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {recentDeliverables.map((item) => (
                  <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-bg-border bg-bg-base/50 hover:bg-bg-base transition-colors group">
                    <div className="flex items-start gap-4 min-w-0 flex-[1_1_300px]">
                      <div className="w-10 h-10 rounded-lg bg-bg-surface border border-bg-border flex items-center justify-center shrink-0">
                        {getFileIcon(item.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-text-primary mb-1 truncate">{item.name}</h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-secondary">
                          <span className="truncate max-w-[120px] sm:max-w-[160px]">{item.project}</span>
                          <span className="w-1 h-1 rounded-full bg-bg-border shrink-0"></span>
                          <span className="shrink-0">{item.size}</span>
                          <span className="w-1 h-1 rounded-full bg-bg-border shrink-0"></span>
                          <span className="shrink-0">{item.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-6 shrink-0 w-full sm:w-auto sm:flex-1 md:flex-none xl:flex-1 2xl:flex-none justify-end">
                      <div>
                        {getStatusBadge(item.status)}
                      </div>
                      
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-brand-red hover:bg-brand-red/10 transition-colors opacity-100 lg:opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State / Upload CTA */}
              <div className="mt-8 border-2 border-dashed border-bg-border rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-bg-surface flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-text-secondary" />
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">No more recent uploads</h3>
                <p className="text-sm text-text-secondary max-w-sm">
                  Upload your project files, design assets, or final deliverables using the form on the left.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </TeamLayout>
  );
}
