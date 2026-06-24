import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { 
  Bell, 
  FileText, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  Receipt, 
  CloudDownload, 
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
  Settings,
  FolderKanban,
  FileBox,
  AlertTriangle,
  Ticket
} from 'lucide-react';

export default function NotificationsIndex() {
    const notifications = [
        { 
            type: 'file', 
            icon: FileText, 
            iconColor: 'bg-brand-red text-white', 
            title: 'New file uploaded', 
            desc: <span>Studio99 Team uploaded <span className="text-brand-red font-bold">Homepage_Design_v2.pdf</span></span>, 
            meta: 'Project: E-Commerce Website', 
            time: '10:30 AM', 
            date: 'May 22, 2025', 
            unread: true 
        },
        { 
            type: 'status', 
            icon: Clock, 
            iconColor: 'bg-orange-500 text-white', 
            title: 'Project status updated', 
            desc: <span>Your project "Mobile App UI Design" status has been changed to <span className="text-orange-500 font-bold">In Progress</span>.</span>, 
            meta: 'Project: Mobile App UI Design', 
            time: 'Yesterday', 
            date: 'May 21, 2025', 
            unread: true 
        },
        { 
            type: 'payment', 
            icon: CheckCircle, 
            iconColor: 'bg-green-500 text-white', 
            title: 'Payment received', 
            desc: <span>We have received your payment of $650.00 for Invoice <span className="text-green-500 font-bold">#INV-2025-017</span>.</span>, 
            meta: 'Invoice: INV-2025-017', 
            time: '11:45 AM', 
            date: 'May 20, 2025', 
            unread: true 
        },
        { 
            type: 'message', 
            icon: MessageSquare, 
            iconColor: 'bg-[#6C3CE1] text-white', 
            title: 'New message from Studio99 Team', 
            desc: 'You have a new message regarding your project "Brand Identity Design".', 
            meta: 'Project: Brand Identity Design', 
            time: '09:15 AM', 
            date: 'May 20, 2025', 
            unread: true 
        },
        { 
            type: 'invoice', 
            icon: Receipt, 
            iconColor: 'bg-blue-500 text-white', 
            title: 'New invoice generated', 
            desc: <span>Invoice <span className="text-blue-500 font-bold">#INV-2025-018</span> has been generated for your project.</span>, 
            meta: 'Invoice: INV-2025-018', 
            time: '04:30 PM', 
            date: 'May 19, 2025', 
            unread: true 
        },
        { 
            type: 'approval', 
            icon: CloudDownload, 
            iconColor: 'bg-teal-500 text-white', 
            title: 'Files approved', 
            desc: 'You approved all files for "Social Media Package".', 
            meta: 'Project: Social Media Package', 
            time: '02:20 PM', 
            date: 'May 18, 2025', 
            unread: false 
        },
        { 
            type: 'completed', 
            icon: Star, 
            iconColor: 'bg-yellow-500 text-white', 
            title: 'Project completed', 
            desc: 'Your project "Logo Design" has been marked as completed.', 
            meta: 'Project: Logo Design', 
            time: '06:00 PM', 
            date: 'May 16, 2025', 
            unread: false 
        },
    ];

    const filters = [
        { name: 'All Notifications', count: 24, icon: Bell, active: true },
        { name: 'Project Updates', count: 8, icon: FolderKanban, active: false },
        { name: 'Messages', count: 5, icon: MessageSquare, active: false },
        { name: 'Payments & Invoices', count: 4, icon: Receipt, active: false },
        { name: 'Files & Deliverables', count: 3, icon: FileBox, active: false },
        { name: 'System Alerts', count: 2, icon: AlertTriangle, active: false },
        { name: 'Support Tickets', count: 2, icon: Ticket, active: false },
    ];

    const [toggles, setToggles] = useState({
        email: true,
        browser: true,
        sms: false,
        sound: true
    });

    const toggleSetting = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <ClientLayout>
            <Head title="Notifications | Studio99" />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Notifications</h1>
                <p className="text-[#9CA3AF] text-sm">Stay updated with the latest activities and important alerts.</p>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                
                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col">
                        
                        {/* Tabs & Actions */}
                        <div className="p-4 border-b border-[#2A2A2A] flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <button className="text-white font-bold text-sm border-b-2 border-brand-red pb-1 flex items-center gap-1.5">
                                    All <span className="bg-brand-red text-white text-[10px] px-1.5 rounded-full">5</span>
                                </button>
                                <button className="text-[#9CA3AF] hover:text-white font-bold text-sm pb-1 flex items-center gap-1.5 transition-colors">
                                    Unread <span className="bg-brand-red text-white text-[10px] px-1.5 rounded-full">5</span>
                                </button>
                                <button className="text-[#9CA3AF] hover:text-white font-bold text-sm pb-1 transition-colors">
                                    Read
                                </button>
                            </div>
                            <button className="flex items-center gap-2 text-brand-red text-sm font-bold hover:text-red-400 transition-colors">
                                Mark all as read <Check className="w-4 h-4" />
                            </button>
                        </div>

                        {/* List */}
                        <div className="divide-y divide-[#2A2A2A]">
                            {notifications.map((n, idx) => (
                                <div key={idx} className={`p-6 flex items-start gap-4 transition-colors hover:bg-[#151515] ${n.unread ? 'bg-[#151515]' : ''}`}>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${n.iconColor}`}>
                                        <n.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0 pr-4">
                                        <h4 className="text-white font-bold text-sm mb-1">{n.title}</h4>
                                        <p className="text-sm text-[#9CA3AF] mb-1 leading-relaxed">{n.desc}</p>
                                        <p className="text-[10px] text-[#4A4A4A]">{n.meta}</p>
                                    </div>
                                    <div className="shrink-0 text-right flex flex-col items-end">
                                        <p className="text-xs text-[#9CA3AF] mb-1">{n.time}</p>
                                        <p className="text-[10px] text-[#4A4A4A] mb-2">{n.date}</p>
                                        {n.unread && (
                                            <div className="w-2 h-2 rounded-full bg-brand-red shadow-[0_0_8px_rgba(227,30,36,0.6)]"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="p-4 border-t border-[#2A2A2A] flex items-center justify-between bg-[#151515]">
                            <span className="text-sm text-[#9CA3AF]">Showing <span className="font-bold text-white">1</span> to <span className="font-bold text-white">7</span> of <span className="font-bold text-white">24</span> notifications</span>
                            <div className="flex items-center gap-1">
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:bg-[#2A2A2A] hover:text-white transition-colors border border-transparent">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-red text-white font-bold text-sm transition-colors shadow-[0_0_10px_rgba(227,30,36,0.2)]">
                                    1
                                </button>
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:bg-[#2A2A2A] hover:text-white transition-colors text-sm font-medium">
                                    2
                                </button>
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:bg-[#2A2A2A] hover:text-white transition-colors text-sm font-medium">
                                    3
                                </button>
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:bg-[#2A2A2A] hover:text-white transition-colors border border-transparent">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full xl:w-[320px] shrink-0 space-y-6">
                    
                    {/* Filters */}
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
                        <h3 className="text-white font-bold text-sm mb-4">Notification Filters</h3>
                        <div className="space-y-1">
                            {filters.map((f, idx) => (
                                <button key={idx} className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors text-sm group ${f.active ? 'bg-brand-red/10 border border-brand-red/20 text-white' : 'text-[#9CA3AF] hover:bg-[#1A1A1A] hover:text-white border border-transparent'}`}>
                                    <div className="flex items-center gap-3">
                                        <f.icon className={`w-4 h-4 ${f.active ? 'text-brand-red' : 'text-[#4A4A4A] group-hover:text-white transition-colors'}`} />
                                        <span className="font-medium">{f.name}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${f.active ? 'bg-brand-red text-white' : 'bg-[#1A1A1A] text-[#9CA3AF] group-hover:bg-[#2A2A2A] transition-colors'}`}>
                                        {f.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
                        <h3 className="text-white font-bold text-sm mb-2">Preferences</h3>
                        <p className="text-xs text-[#9CA3AF] mb-6 leading-relaxed">Manage how you receive notifications.</p>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white font-medium">Email Notifications</span>
                                <button 
                                    onClick={() => toggleSetting('email')}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${toggles.email ? 'bg-brand-red' : 'bg-[#2A2A2A]'}`}
                                >
                                    <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${toggles.email ? 'left-[22px]' : 'left-[2px]'}`}></div>
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white font-medium">Browser Notifications</span>
                                <button 
                                    onClick={() => toggleSetting('browser')}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${toggles.browser ? 'bg-brand-red' : 'bg-[#2A2A2A]'}`}
                                >
                                    <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${toggles.browser ? 'left-[22px]' : 'left-[2px]'}`}></div>
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white font-medium">SMS Notifications</span>
                                <button 
                                    onClick={() => toggleSetting('sms')}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${toggles.sms ? 'bg-brand-red' : 'bg-[#2A2A2A]'}`}
                                >
                                    <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${toggles.sms ? 'left-[22px]' : 'left-[2px]'}`}></div>
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white font-medium">Sound Alerts</span>
                                <button 
                                    onClick={() => toggleSetting('sound')}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${toggles.sound ? 'bg-brand-red' : 'bg-[#2A2A2A]'}`}
                                >
                                    <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${toggles.sound ? 'left-[22px]' : 'left-[2px]'}`}></div>
                                </button>
                            </div>
                        </div>

                        <button className="w-full py-2.5 bg-transparent border border-[#2A2A2A] hover:bg-[#1A1A1A] text-brand-red rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                            <Settings className="w-4 h-4" /> Manage Preferences
                        </button>
                    </div>

                </div>

            </div>
        </ClientLayout>
    );
}
