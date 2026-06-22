import React from 'react';
import { AppModal } from '@/Components/ui/app-modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Progress } from '@/Components/ui/progress';
import { 
  Briefcase, 
  CalendarIcon, 
  FileText, 
  User,
  Download,
  UploadCloud,
  Clock,
  Send
} from 'lucide-react';

export function ProjectDetailModal({ open, onClose, project }) {
  if (!project) return null;

  return (
    <AppModal 
      open={open} 
      onClose={onClose} 
      title={project.name || "Project Details"} 
      size="xl"
    >
      <div className="mt-4">
        {/* Header Status Bar */}
        <div className="flex items-center justify-between mb-6 bg-[#1A1A28] p-4 rounded-xl border border-[#2A2A3A]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-[#94A3B8] text-sm">Status</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                <span className="font-bold text-white capitalize">{project.status?.replace('_', ' ') || 'In Progress'}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#94A3B8] text-sm mb-1">Overall Progress</p>
            <div className="flex items-center gap-3 w-48">
              <Progress value={65} className="h-2" />
              <span className="text-sm font-bold text-white">65%</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[#94A3B8] text-sm font-medium mb-2">Description</h4>
                  <p className="text-white text-sm leading-relaxed bg-[#111118] border border-[#2A2A3A] p-4 rounded-xl">
                    {project.description || "No description provided for this project."}
                  </p>
                </div>
                
                <div className="bg-[#111118] border border-[#2A2A3A] p-4 rounded-xl">
                  <h4 className="text-[#94A3B8] text-sm font-medium mb-4">Project Meta</h4>
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-center gap-3 text-white">
                      <Briefcase className="w-4 h-4 text-[#6C3CE1]" /> 
                      <span className="text-[#94A3B8] w-24">Service:</span>
                      <span className="font-medium">Graphics Design</span>
                    </li>
                    <li className="flex items-center gap-3 text-white">
                      <FileText className="w-4 h-4 text-[#EC4899]" /> 
                      <span className="text-[#94A3B8] w-24">Package:</span>
                      <span className="font-medium">Professional (₦1,500,000)</span>
                    </li>
                    <li className="flex items-center gap-3 text-white">
                      <CalendarIcon className="w-4 h-4 text-blue-400" /> 
                      <span className="text-[#94A3B8] w-24">Deadline:</span>
                      <span className="font-medium">{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Dec 24, 2026'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#111118] border border-[#2A2A3A] p-4 rounded-xl">
                  <h4 className="text-[#94A3B8] text-sm font-medium mb-4">Assigned Team</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1A1A28] border-2 border-[#6C3CE1] flex items-center justify-center overflow-hidden">
                      <img src="https://i.pravatar.cc/150?img=11" alt="Designer" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Alex Morgan</p>
                      <p className="text-xs text-[#6C3CE1] font-medium">Lead Designer</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1A28] border border-[#2A2A3A] p-4 rounded-xl">
                  <h4 className="text-white font-medium mb-2">Next Milestone</h4>
                  <p className="text-sm text-[#94A3B8] mb-4">Initial logo concepts ready for review.</p>
                  <div className="flex items-center justify-between text-xs font-bold uppercase">
                    <span className="text-[#EC4899]">Due Tomorrow</span>
                    <span className="text-white">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* FILES TAB */}
          <TabsContent value="files">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#111118] border border-[#2A2A3A] rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white">Deliverables</h4>
                  <span className="text-xs text-[#94A3B8]">From Studio99</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#1A1A28] rounded-lg border border-[#2A2A3A] hover:border-[#6C3CE1]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#6C3CE1]/20 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#6C3CE1]" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">Concept_v1.pdf</p>
                        <p className="text-xs text-[#94A3B8]">4.2 MB • Today</p>
                      </div>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2A2A3A] text-white">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#111118] border border-[#2A2A3A] rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white">Your Uploads</h4>
                  <button className="text-xs text-[#6C3CE1] flex items-center gap-1 hover:text-[#5b32be]">
                    <UploadCloud className="w-3 h-3" /> Upload New
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#1A1A28] rounded-lg border border-[#2A2A3A]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#2A2A3A] flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#94A3B8]" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">brand_guidelines.pdf</p>
                        <p className="text-xs text-[#94A3B8]">2.1 MB • Oct 12</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TIMELINE TAB */}
          <TabsContent value="timeline">
            <div className="bg-[#111118] border border-[#2A2A3A] rounded-xl p-6 h-[400px] overflow-y-auto">
              <div className="relative border-l-2 border-[#2A2A3A] ml-3 space-y-8 pb-4">
                {[
                  { title: 'Project Started', date: 'Oct 12, 10:00 AM', type: 'start' },
                  { title: 'Payment Confirmed', date: 'Oct 12, 10:15 AM', type: 'success' },
                  { title: 'Assigned to Alex Morgan', date: 'Oct 12, 11:30 AM', type: 'update' },
                  { title: 'Concept v1 Uploaded', date: 'Today, 2:00 PM', type: 'deliverable' },
                ].map((event, idx) => (
                  <div key={idx} className="relative pl-8">
                    <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ring-4 ring-[#111118] ${
                      event.type === 'success' ? 'bg-green-500' :
                      event.type === 'start' ? 'bg-blue-500' :
                      event.type === 'deliverable' ? 'bg-[#EC4899]' :
                      'bg-[#6C3CE1]'
                    }`} />
                    <div className="flex flex-col">
                      <span className="text-xs text-[#94A3B8] mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {event.date}
                      </span>
                      <h4 className="font-medium text-white">{event.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* MESSAGES TAB */}
          <TabsContent value="messages">
            <div className="flex flex-col h-[400px] bg-[#111118] border border-[#2A2A3A] rounded-xl">
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A28] shrink-0 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Designer" />
                  </div>
                  <div className="bg-[#1A1A28] border border-[#2A2A3A] p-3 rounded-2xl rounded-tl-none">
                    <p className="text-sm text-white">Hi! I've just uploaded the first batch of concepts to the Files tab. Let me know what you think!</p>
                    <span className="text-[10px] text-[#94A3B8] mt-1 block">2:05 PM</span>
                  </div>
                </div>

                <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-[#6C3CE1] shrink-0 flex items-center justify-center text-xs font-bold text-white">
                    Me
                  </div>
                  <div className="bg-[#6C3CE1] p-3 rounded-2xl rounded-tr-none">
                    <p className="text-sm text-white">Thanks Alex, checking them out now.</p>
                    <span className="text-[10px] text-white/70 mt-1 block">2:10 PM</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-t border-[#2A2A3A] bg-[#1A1A28] rounded-b-xl flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 bg-[#111118] border border-[#2A2A3A] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#6C3CE1]"
                  placeholder="Type a message..."
                />
                <button className="w-10 h-10 rounded-lg bg-[#6C3CE1] hover:bg-[#5b32be] flex items-center justify-center text-white transition-colors shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppModal>
  );
}
