import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { 
  Search, 
  Filter, 
  Archive, 
  Phone, 
  Video, 
  Info, 
  Download,
  Paperclip,
  Smile,
  Send,
  BellOff,
  Trash2,
  CalendarDays,
  CheckCheck
} from 'lucide-react';

export default function MessagesIndex() {
    const [activeFilter, setActiveFilter] = useState('all');

    return (
        <ClientLayout>
            <Head title="Messages | Studio99" />

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Messages</h1>
                <p className="text-[#9CA3AF] text-sm">Communicate with our team and stay updated on your projects.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-220px)] min-h-[600px]">
                
                {/* Left Sidebar: Conversations List */}
                <div className="w-full lg:w-[320px] shrink-0 flex flex-col bg-[#111111] border border-[#2A2A2A] rounded-2xl overflow-hidden">
                    {/* Filters */}
                    <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
                        <button 
                          onClick={() => setActiveFilter('all')}
                          className={`flex items-center gap-2 text-sm font-bold pb-2 border-b-2 transition-colors ${activeFilter === 'all' ? 'text-white border-brand-red' : 'text-[#9CA3AF] border-transparent hover:text-white'}`}
                        >
                          All <span className="w-5 h-5 rounded-full bg-brand-red text-white text-[10px] flex items-center justify-center">3</span>
                        </button>
                        <button 
                          onClick={() => setActiveFilter('unread')}
                          className={`flex items-center gap-2 text-sm font-bold pb-2 border-b-2 transition-colors ${activeFilter === 'unread' ? 'text-white border-brand-red' : 'text-[#9CA3AF] border-transparent hover:text-white'}`}
                        >
                          Unread <span className="w-5 h-5 rounded-full bg-brand-red text-white text-[10px] flex items-center justify-center">3</span>
                        </button>
                        <button 
                          onClick={() => setActiveFilter('archived')}
                          className={`text-sm font-bold pb-2 border-b-2 transition-colors ${activeFilter === 'archived' ? 'text-white border-brand-red' : 'text-[#9CA3AF] border-transparent hover:text-white'}`}
                        >
                          Archived
                        </button>
                    </div>

                    {/* Search */}
                    <div className="p-4 border-b border-[#2A2A2A]">
                        <div className="relative flex items-center">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="w-4 h-4 text-[#4A4A4A]" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search conversations..." 
                                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block pl-10 p-2.5 transition-colors"
                            />
                            <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9CA3AF] hover:text-white transition-colors">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {/* Active Item */}
                        <div className="p-4 border-l-4 border-brand-red bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors cursor-pointer border-b border-[#2A2A2A] flex gap-3">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#2A2A2A]">
                                <span className="font-black text-brand-red tracking-tighter">S99</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-white font-bold text-sm truncate">Studio99 Team</h4>
                                    <span className="text-xs text-[#9CA3AF] shrink-0">10:30 AM</span>
                                </div>
                                <p className="text-xs text-[#9CA3AF] truncate pr-4">Hi Jane, I've uploaded the latest design for your review.</p>
                            </div>
                            <div className="shrink-0 flex items-center">
                                <div className="w-5 h-5 rounded-full bg-brand-red text-white text-[10px] font-bold flex items-center justify-center">2</div>
                            </div>
                        </div>

                        {/* Unread Item */}
                        <div className="p-4 border-l-4 border-transparent hover:bg-[#1A1A1A] transition-colors cursor-pointer border-b border-[#2A2A2A] flex gap-3">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-white font-bold text-sm truncate">John Smith</h4>
                                    <span className="text-xs text-[#9CA3AF] shrink-0">Yesterday</span>
                                </div>
                                <p className="text-xs text-white font-medium truncate pr-4">Sounds good! We'll get started right away.</p>
                            </div>
                            <div className="shrink-0 flex items-center">
                                <div className="w-5 h-5 rounded-full bg-brand-red text-white text-[10px] font-bold flex items-center justify-center">1</div>
                            </div>
                        </div>

                        {/* Read Item */}
                        <div className="p-4 border-l-4 border-transparent hover:bg-[#1A1A1A] transition-colors cursor-pointer border-b border-[#2A2A2A] flex gap-3">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-[#9CA3AF] font-bold text-sm truncate">Sarah Johnson</h4>
                                    <span className="text-xs text-[#4A4A4A] shrink-0">May 20</span>
                                </div>
                                <p className="text-xs text-[#4A4A4A] truncate pr-4">Please check the latest mockups and share your feedback.</p>
                            </div>
                        </div>

                        {/* Read Item */}
                        <div className="p-4 border-l-4 border-transparent hover:bg-[#1A1A1A] transition-colors cursor-pointer border-b border-[#2A2A2A] flex gap-3">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-[#9CA3AF] font-bold text-sm truncate">Michael Brown</h4>
                                    <span className="text-xs text-[#4A4A4A] shrink-0">May 18</span>
                                </div>
                                <p className="text-xs text-[#4A4A4A] truncate pr-4">Invoice #INV-2025-005 has been sent to you.</p>
                            </div>
                        </div>

                        {/* System Item */}
                        <div className="p-4 border-l-4 border-transparent hover:bg-[#1A1A1A] transition-colors cursor-pointer border-b border-[#2A2A2A] flex gap-3">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0">
                                <CalendarDays className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-[#9CA3AF] font-bold text-sm truncate">Project Updates</h4>
                                    <span className="text-xs text-[#4A4A4A] shrink-0">May 15</span>
                                </div>
                                <p className="text-xs text-[#4A4A4A] truncate pr-4">Website Redesign project has been updated.</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-[#2A2A2A] bg-[#151515] hover:bg-[#1A1A1A] cursor-pointer transition-colors flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[#9CA3AF]">
                            <Archive className="w-5 h-5" />
                            <span className="text-sm font-medium">Archived Conversations</span>
                        </div>
                        <span className="text-sm font-bold text-[#4A4A4A]">12</span>
                    </div>
                </div>

                {/* Middle: Chat Window */}
                <div className="flex-1 flex flex-col bg-[#111111] border border-[#2A2A2A] rounded-2xl overflow-hidden">
                    {/* Chat Header */}
                    <div className="h-20 border-b border-[#2A2A2A] flex items-center justify-between px-6 shrink-0 bg-[#151515]">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#2A2A2A]">
                                <span className="font-black text-brand-red tracking-tighter text-sm">S99</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    Studio99 Team
                                </h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-xs text-[#9CA3AF]">Active now</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 rounded-xl hover:bg-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors">
                                <Phone className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-xl hover:bg-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors">
                                <Video className="w-5 h-5" />
                            </button>
                            <div className="w-px h-6 bg-[#2A2A2A] mx-1"></div>
                            <button className="w-10 h-10 rounded-xl hover:bg-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors">
                                <Info className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#0A0A0A]">
                        {/* Date Divider */}
                        <div className="flex items-center justify-center">
                            <div className="px-4 py-1 rounded-full bg-[#1A1A1A] text-xs font-medium text-[#4A4A4A] border border-[#2A2A2A]">
                                May 22, 2025
                            </div>
                        </div>

                        {/* Received Message */}
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
                                <span className="font-black text-brand-red tracking-tighter text-[10px]">S99</span>
                            </div>
                            <div className="flex flex-col gap-1 max-w-[75%]">
                                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl rounded-tl-sm p-4 text-sm text-[#E5E7EB] leading-relaxed">
                                    Hi Jane,<br/><br/>
                                    I've uploaded the latest design for your E-Commerce Website project. Please review and let us know your feedback.
                                </div>
                                <span className="text-[10px] text-[#4A4A4A] ml-1">10:30 AM</span>
                            </div>
                        </div>

                        {/* Received Attachment */}
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1 opacity-0">
                                {/* Invisible spacer */}
                            </div>
                            <div className="flex flex-col gap-1 max-w-[75%] w-72">
                                <div className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors rounded-2xl rounded-tl-sm p-3 flex items-center gap-3 cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-xs shrink-0">
                                        PDF
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="text-sm font-bold text-white truncate">Homepage_Design_v2.pdf</h5>
                                        <p className="text-xs text-[#9CA3AF]">2.4 MB</p>
                                    </div>
                                    <button className="w-8 h-8 rounded-lg hover:bg-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white shrink-0">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sent Message */}
                        <div className="flex items-start justify-end gap-4">
                            <div className="flex flex-col gap-1 max-w-[75%] items-end">
                                <div className="bg-brand-red text-white rounded-2xl rounded-tr-sm p-4 text-sm leading-relaxed shadow-[0_4px_15px_rgba(227,30,36,0.2)]">
                                    Thanks! The design looks great overall. Can we update the hero section text and use a different image?
                                </div>
                                <div className="flex items-center gap-1 mr-1">
                                    <span className="text-[10px] text-[#4A4A4A]">10:35 AM</span>
                                    <CheckCheck className="w-3.5 h-3.5 text-brand-red" />
                                </div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 border border-[#2A2A2A]" />
                        </div>

                        {/* Received Message */}
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
                                <span className="font-black text-brand-red tracking-tighter text-[10px]">S99</span>
                            </div>
                            <div className="flex flex-col gap-1 max-w-[75%]">
                                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl rounded-tl-sm p-4 text-sm text-[#E5E7EB] leading-relaxed">
                                    Sure! We'll make those changes and send updated version shortly.
                                </div>
                                <span className="text-[10px] text-[#4A4A4A] ml-1">10:40 AM</span>
                            </div>
                        </div>

                        {/* Date Divider */}
                        <div className="flex items-center justify-center pt-2">
                            <div className="px-4 py-1 rounded-full bg-[#1A1A1A] text-xs font-medium text-[#4A4A4A] border border-[#2A2A2A]">
                                Today
                            </div>
                        </div>

                        {/* Received Message */}
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
                                <span className="font-black text-brand-red tracking-tighter text-[10px]">S99</span>
                            </div>
                            <div className="flex flex-col gap-1 max-w-[75%]">
                                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl rounded-tl-sm p-4 text-sm text-[#E5E7EB] leading-relaxed">
                                    Hi Jane, here's the updated design with the requested changes.
                                </div>
                                <span className="text-[10px] text-[#4A4A4A] ml-1">10:30 AM</span>
                            </div>
                        </div>

                        {/* Received Attachment */}
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1 opacity-0"></div>
                            <div className="flex flex-col gap-1 max-w-[75%] w-72">
                                <div className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors rounded-2xl rounded-tl-sm p-3 flex items-center gap-3 cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-xs shrink-0">
                                        ZIP
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="text-sm font-bold text-white truncate">Homepage_Design_v3.zip</h5>
                                        <p className="text-xs text-[#9CA3AF]">18.6 MB</p>
                                    </div>
                                    <button className="w-8 h-8 rounded-lg hover:bg-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white shrink-0">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-[#151515] border-t border-[#2A2A2A]">
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-xl hover:bg-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors shrink-0">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <div className="flex-1 relative">
                                <input 
                                    type="text" 
                                    placeholder="Type a message..." 
                                    className="w-full bg-[#111111] border border-[#2A2A2A] text-white text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block p-3.5 pr-12 transition-colors"
                                />
                                <button className="absolute inset-y-0 right-2 flex items-center justify-center w-10 text-[#9CA3AF] hover:text-white transition-colors">
                                    <Smile className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="w-12 h-12 rounded-xl bg-brand-red hover:bg-red-600 flex items-center justify-center text-white transition-colors shrink-0 shadow-[0_0_15px_rgba(227,30,36,0.2)]">
                                <Send className="w-5 h-5 ml-1" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Conversation Info */}
                <div className="hidden xl:flex w-[280px] shrink-0 flex-col gap-6">
                    {/* Info Card */}
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Conversation Info</h3>
                        
                        <div className="flex flex-col items-center text-center mb-6 border-b border-[#2A2A2A] pb-6">
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shrink-0 border-4 border-[#1A1A1A] mb-4">
                                <span className="font-black text-brand-red text-2xl tracking-tighter">S99</span>
                            </div>
                            <h4 className="text-white font-bold text-lg mb-1">Studio99 Team</h4>
                            <div className="flex items-center justify-center gap-1.5 mb-4">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-sm text-[#9CA3AF]">Active now</span>
                            </div>
                            <p className="text-xs text-[#9CA3AF] leading-relaxed">
                                We typically reply within a few minutes during business hours.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <h4 className="text-white font-bold text-sm mb-3">Options</h4>
                            <button className="w-full flex items-center gap-3 p-2.5 rounded-xl text-[#9CA3AF] hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm">
                                <Search className="w-4 h-4 shrink-0" /> Search in Conversation
                            </button>
                            <button className="w-full flex items-center justify-between p-2.5 rounded-xl text-[#9CA3AF] hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm">
                                <div className="flex items-center gap-3">
                                    <BellOff className="w-4 h-4 shrink-0" /> Mute Notifications
                                </div>
                                <div className="w-8 h-4 bg-[#2A2A2A] rounded-full relative cursor-pointer border border-[#4A4A4A]">
                                    <div className="absolute left-[1px] top-[1px] w-3 h-3 bg-[#4A4A4A] rounded-full"></div>
                                </div>
                            </button>
                            <button className="w-full flex items-center gap-3 p-2.5 rounded-xl text-[#9CA3AF] hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm">
                                <Archive className="w-4 h-4 shrink-0" /> Archive Conversation
                            </button>
                            <button className="w-full flex items-center gap-3 p-2.5 rounded-xl text-brand-red hover:bg-brand-red/10 transition-colors text-sm font-medium">
                                <Trash2 className="w-4 h-4 shrink-0" /> Delete Conversation
                            </button>
                        </div>
                    </div>

                    {/* Shared Files */}
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Shared Files</h3>
                            <button className="text-brand-red text-xs font-bold hover:text-red-400 transition-colors">View All</button>
                        </div>

                        <div className="space-y-4 flex-1">
                            {/* File */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-[10px] shrink-0">PDF</div>
                                <div className="flex-1 min-w-0">
                                    <h5 className="text-sm font-bold text-white truncate hover:text-brand-red cursor-pointer transition-colors">Homepage_Design_v2.pdf</h5>
                                    <p className="text-[10px] text-[#4A4A4A] mt-0.5">May 22, 2025 • 2.4 MB</p>
                                </div>
                            </div>
                            
                            {/* File */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-[10px] shrink-0">PDF</div>
                                <div className="flex-1 min-w-0">
                                    <h5 className="text-sm font-bold text-white truncate hover:text-brand-red cursor-pointer transition-colors">Brand_Guidelines.pdf</h5>
                                    <p className="text-[10px] text-[#4A4A4A] mt-0.5">May 20, 2025 • 3.1 MB</p>
                                </div>
                            </div>

                            {/* File */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 font-bold text-[10px] shrink-0">AI</div>
                                <div className="flex-1 min-w-0">
                                    <h5 className="text-sm font-bold text-white truncate hover:text-brand-red cursor-pointer transition-colors">Logo_Final.ai</h5>
                                    <p className="text-[10px] text-[#4A4A4A] mt-0.5">May 18, 2025 • 1.7 MB</p>
                                </div>
                            </div>

                            {/* File */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-[10px] shrink-0">DOCX</div>
                                <div className="flex-1 min-w-0">
                                    <h5 className="text-sm font-bold text-white truncate hover:text-brand-red cursor-pointer transition-colors">Project_Brief.docx</h5>
                                    <p className="text-[10px] text-[#4A4A4A] mt-0.5">May 15, 2025 • 56 KB</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[#2A2A2A] mt-4 text-center">
                            <p className="text-[10px] text-[#4A4A4A]">Conversation started on<br/>May 10, 2025</p>
                        </div>
                    </div>
                </div>

            </div>
        </ClientLayout>
    );
}
