import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import TeamLayout from '@/Layouts/TeamLayout';
import { 
  Search,
  MoreVertical,
  Paperclip,
  Send,
  Image as ImageIcon,
  Smile,
  Phone,
  Video
} from 'lucide-react';

export default function Messages() {
  const [message, setMessage] = useState('');
  
  const contacts = [
    { id: 1, name: 'Jane Cooper', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?u=2', lastMessage: 'Can you send the wireframes?', time: '10:45 AM', unread: 2, online: true },
    { id: 2, name: 'Sarah Williams', role: 'Client', avatar: 'https://i.pravatar.cc/150?u=4', lastMessage: 'The logo looks great, thanks!', time: 'Yesterday', unread: 0, online: false },
    { id: 3, name: 'Design Team', role: 'Group', avatar: 'https://ui-avatars.com/api/?name=DT&background=E31E24&color=fff', lastMessage: 'Daniel: I just uploaded the files.', time: 'Monday', unread: 5, online: false },
    { id: 4, name: 'David Okafor', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=5', lastMessage: 'I need the SVG assets for the hero section.', time: 'Monday', unread: 0, online: true }
  ];

  return (
    <TeamLayout>
      <Head title="Messages | Team Dashboard" />

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Messages</h1>
        <p className="text-text-secondary text-sm">Communicate with your team and clients.</p>
      </div>

      <div className="bg-bg-surface border border-bg-border rounded-2xl overflow-hidden flex h-[calc(100vh-220px)] min-h-[600px]">
        
        {/* Sidebar / Contacts List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-bg-border flex flex-col shrink-0 bg-bg-base/30">
          <div className="p-4 border-b border-bg-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-9 pr-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm focus:outline-none focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/50 transition-all text-text-primary"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {contacts.map((contact) => (
              <button 
                key={contact.id} 
                className={`w-full p-4 flex items-start gap-3 border-b border-bg-border/50 hover:bg-bg-surface transition-colors text-left ${contact.id === 1 ? 'bg-bg-surface border-l-2 border-l-brand-red' : 'border-l-2 border-l-transparent'}`}
              >
                <div className="relative shrink-0">
                  <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover border border-bg-border" />
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-bg-surface"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className={`text-sm truncate pr-2 ${contact.id === 1 ? 'font-bold text-text-primary' : 'font-medium text-text-primary'}`}>{contact.name}</h4>
                    <span className={`text-[10px] shrink-0 ${contact.unread > 0 ? 'text-brand-red font-bold' : 'text-text-secondary'}`}>{contact.time}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className={`text-xs truncate ${contact.unread > 0 ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
                      {contact.lastMessage}
                    </p>
                    {contact.unread > 0 && (
                      <span className="shrink-0 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-brand-red text-white text-[10px] font-bold">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-col flex-1 min-w-0 bg-bg-surface">
          {/* Chat Header */}
          <div className="p-4 border-b border-bg-border flex justify-between items-center bg-bg-base/50">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img src={contacts[0].avatar} alt={contacts[0].name} className="w-10 h-10 rounded-full object-cover border border-bg-border" />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-bg-base"></span>
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-text-primary leading-tight truncate">{contacts[0].name}</h3>
                <p className="text-[11px] text-emerald-500 font-medium">Online</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-border transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-border transition-colors">
                <Video className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-border transition-colors ml-2">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-bg-surface/50 relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #E31E24 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-bg-border/50 text-text-secondary text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-sm">Today</span>
            </div>

            <div className="flex items-end gap-2 max-w-[95%] lg:max-w-[90%] xl:max-w-[80%] relative">
              <img src={contacts[0].avatar} alt="Jane" className="w-8 h-8 rounded-full mb-1 object-cover border border-bg-border shrink-0" />
              <div className="flex flex-col gap-1 min-w-0">
                <div className="bg-bg-base border border-bg-border p-3.5 rounded-2xl rounded-bl-sm text-sm text-text-primary shadow-sm break-words whitespace-pre-wrap">
                  Hi Daniel, how is the website redesign going?
                </div>
                <span className="text-[10px] text-text-secondary ml-1 font-medium">10:42 AM</span>
              </div>
            </div>

            <div className="flex items-end gap-2 max-w-[95%] lg:max-w-[90%] xl:max-w-[80%] relative">
              <img src={contacts[0].avatar} alt="Jane" className="w-8 h-8 rounded-full mb-1 object-cover border border-bg-border shrink-0" />
              <div className="flex flex-col gap-1 min-w-0">
                <div className="bg-bg-base border border-bg-border p-3.5 rounded-2xl rounded-bl-sm text-sm text-text-primary shadow-sm break-words whitespace-pre-wrap">
                  Can you send the wireframes? The client wants to review them this afternoon.
                </div>
                <span className="text-[10px] text-text-secondary ml-1 font-medium">10:45 AM</span>
              </div>
            </div>

            <div className="flex items-end gap-2 max-w-[95%] lg:max-w-[90%] xl:max-w-[80%] ml-auto justify-end relative">
              <div className="flex flex-col gap-1 items-end min-w-0">
                <div className="bg-brand-red p-3.5 rounded-2xl rounded-br-sm text-sm text-white shadow-md shadow-brand-red/20 break-words whitespace-pre-wrap">
                  Hey Jane! Yes, I just finished them.
                </div>
                <div className="bg-brand-red p-3.5 rounded-2xl rounded-br-sm text-sm text-white shadow-md shadow-brand-red/20 mt-1 break-words whitespace-pre-wrap">
                  I will upload them to the deliverables section right now and share the link here.
                </div>
                <span className="text-[10px] text-text-secondary mr-1 font-medium flex items-center gap-1">
                  10:48 AM <span className="text-emerald-500 font-bold">✓✓</span>
                </span>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-bg-border bg-bg-base/50">
            <div className="flex items-center gap-2 bg-bg-surface border border-bg-border rounded-xl p-2 focus-within:border-brand-red/50 focus-within:ring-1 focus-within:ring-brand-red/50 transition-all">
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-text-secondary hover:text-brand-red hover:bg-brand-red/10 transition-colors shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-text-secondary hover:text-brand-red hover:bg-brand-red/10 transition-colors shrink-0">
                <ImageIcon className="w-5 h-5" />
              </button>
              
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 min-w-0 bg-transparent border-none focus:ring-0 text-sm px-2 text-text-primary"
              />
              
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-text-secondary hover:text-brand-red hover:bg-brand-red/10 transition-colors shrink-0">
                <Smile className="w-5 h-5" />
              </button>
              
              <button 
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 shadow-sm ${message.trim() ? 'bg-brand-red text-white shadow-brand-red/20' : 'bg-bg-border text-text-secondary'}`}
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </TeamLayout>
  );
}
