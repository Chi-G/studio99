import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { 
  Ticket, 
  Clock, 
  Send, 
  CheckCircle,
  Search,
  Filter,
  MoreVertical,
  HeadphonesIcon,
  FileText,
  ChevronRight,
  ChevronLeft,
  MessageSquare
} from 'lucide-react';

export default function SupportIndex() {
    const stats = [
        { title: 'Total Tickets', value: '12', subtitle: 'All time', icon: Ticket, color: 'bg-brand-red text-white', ring: 'ring-brand-red/20' },
        { title: 'Open', value: '3', subtitle: 'Currently open', icon: Clock, color: 'bg-orange-500 text-white', ring: 'ring-orange-500/20' },
        { title: 'In Progress', value: '2', subtitle: 'Being handled', icon: Send, color: 'bg-blue-500 text-white', ring: 'ring-blue-500/20' },
        { title: 'Resolved', value: '7', subtitle: 'Successfully resolved', icon: CheckCircle, color: 'bg-green-500 text-white', ring: 'ring-green-500/20' },
    ];

    const tickets = [
        { id: '#ST-0012', date: 'May 22, 2025', subject: 'Website not loading on mobile', desc: "I'm experiencing issues with my website on mobile devices.", project: 'E-Commerce Website', projectType: 'Web Development', status: 'Open', priority: 'High', lastUpdatedDate: 'May 22, 2025', lastUpdatedTime: '10:30 AM' },
        { id: '#ST-0011', date: 'May 20, 2025', subject: 'Update on homepage banner', desc: 'I need to update the text and image on the homepage banner.', project: 'Brand Identity Design', projectType: 'Logo & Branding', status: 'In Progress', priority: 'Medium', lastUpdatedDate: 'May 21, 2025', lastUpdatedTime: '04:15 PM' },
        { id: '#ST-0010', date: 'May 18, 2025', subject: 'Invoice download issue', desc: "I'm unable to download the invoice from the dashboard.", project: 'Mobile App UI Design', projectType: 'UI/UX Design', status: 'Open', priority: 'Medium', lastUpdatedDate: 'May 18, 2025', lastUpdatedTime: '11:20 AM' },
        { id: '#ST-0009', date: 'May 15, 2025', subject: 'Requesting additional revision', desc: 'Please provide one more revision for the logo design.', project: 'Brand Identity Design', projectType: 'Logo & Branding', status: 'Resolved', priority: 'Low', lastUpdatedDate: 'May 17, 2025', lastUpdatedTime: '09:45 AM' },
        { id: '#ST-0008', date: 'May 10, 2025', subject: 'Access to project files', desc: 'Need access to the source files for my website project.', project: 'E-Commerce Website', projectType: 'Web Development', status: 'Resolved', priority: 'Low', lastUpdatedDate: 'May 12, 2025', lastUpdatedTime: '02:30 PM' },
    ];

    const getStatusColor = (status) => {
        switch(status) {
            case 'Open': return 'text-brand-red';
            case 'In Progress': return 'text-blue-500';
            case 'Resolved': return 'text-green-500';
            default: return 'text-[#9CA3AF]';
        }
    };

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'High': return 'text-brand-red';
            case 'Medium': return 'text-orange-500';
            case 'Low': return 'text-green-500';
            default: return 'text-[#9CA3AF]';
        }
    };

    return (
        <ClientLayout>
            <Head title="Support Tickets | Studio99" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Support Tickets</h1>
                    <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
                        <span>Dashboard</span>
                        <span>/</span>
                        <span className="text-brand-red font-medium">Support Tickets</span>
                    </div>
                    <p className="text-[#9CA3AF] text-sm mt-2">Track your support requests and get help from our team.</p>
                </div>
                
                <button className="bg-brand-red hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-[0_0_15px_rgba(227,30,36,0.2)]">
                    + New Support Ticket
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                
                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-5 flex items-start gap-4 hover:border-[#3A3A3A] transition-colors">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color} ring-4 ${stat.ring}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</p>
                                    <h3 className="text-white font-black text-2xl">{stat.value}</h3>
                                    <p className="text-[#4A4A4A] text-[10px] mt-1 font-medium">{stat.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table Card */}
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col">
                        {/* Table Header Controls */}
                        <div className="p-4 border-b border-[#2A2A2A] flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
                                <button className="text-white font-bold text-sm border-b-2 border-brand-red pb-1 whitespace-nowrap">
                                    All Tickets
                                </button>
                                <button className="text-[#9CA3AF] hover:text-white font-bold text-sm pb-1 whitespace-nowrap flex items-center gap-1.5 transition-colors">
                                    Open <span className="bg-brand-red text-white text-[10px] px-1.5 rounded-full">3</span>
                                </button>
                                <button className="text-[#9CA3AF] hover:text-white font-bold text-sm pb-1 whitespace-nowrap flex items-center gap-1.5 transition-colors">
                                    In Progress <span className="bg-brand-red text-white text-[10px] px-1.5 rounded-full">2</span>
                                </button>
                                <button className="text-[#9CA3AF] hover:text-white font-bold text-sm pb-1 whitespace-nowrap transition-colors">
                                    Resolved
                                </button>
                                <button className="text-[#9CA3AF] hover:text-white font-bold text-sm pb-1 whitespace-nowrap transition-colors">
                                    Closed
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A4A]" />
                                    <input 
                                        type="text" 
                                        placeholder="Search tickets..." 
                                        className="bg-[#1A1A1A] border border-[#2A2A2A] text-white text-sm rounded-xl focus:ring-brand-red focus:border-brand-red block w-full pl-9 p-2 transition-colors"
                                    />
                                </div>
                                <button className="bg-[#1A1A1A] border border-[#2A2A2A] text-white p-2 rounded-xl hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    <span className="text-sm font-bold">Filter</span>
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left text-sm text-[#9CA3AF]">
                                <thead className="text-[10px] text-[#4A4A4A] uppercase bg-[#151515] border-b border-[#2A2A2A]">
                                    <tr>
                                        <th className="px-6 py-4 font-bold tracking-wider">Ticket ID</th>
                                        <th className="px-6 py-4 font-bold tracking-wider">Subject</th>
                                        <th className="px-6 py-4 font-bold tracking-wider">Project</th>
                                        <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                                        <th className="px-6 py-4 font-bold tracking-wider">Priority</th>
                                        <th className="px-6 py-4 font-bold tracking-wider">Last Updated</th>
                                        <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#2A2A2A]">
                                    {tickets.map((t, idx) => (
                                        <tr key={idx} className="hover:bg-[#151515] transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-bold text-white mb-1">{t.id}</div>
                                                <div className="text-[10px]">{t.date}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-white mb-1">{t.subject}</div>
                                                <div className="text-xs">{t.desc}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-white mb-1">{t.project}</div>
                                                <div className="text-[10px]">{t.projectType}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`font-bold ${getStatusColor(t.status)}`}>{t.status}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`font-bold ${getPriorityColor(t.priority)}`}>{t.priority}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-white mb-1">{t.lastUpdatedDate}</div>
                                                <div className="text-[10px]">{t.lastUpdatedTime}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button className="text-white font-bold hover:text-brand-red transition-colors">View</button>
                                                    <button className="text-[#4A4A4A] hover:text-white transition-colors">
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
                        <div className="p-4 border-t border-[#2A2A2A] flex items-center justify-between bg-[#151515]">
                            <span className="text-sm text-[#9CA3AF]">Showing <span className="font-bold text-white">1</span> to <span className="font-bold text-white">5</span> of <span className="font-bold text-white">12</span> tickets</span>
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
                    
                    {/* Need Help Card */}
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 text-center">
                        <h3 className="text-white font-bold text-lg mb-6 text-left">Need Help?</h3>
                        
                        <div className="w-20 h-20 mx-auto rounded-full bg-[#1A1A1A] border-4 border-[#2A2A2A] flex items-center justify-center mb-4 relative">
                            <HeadphonesIcon className="w-8 h-8 text-[#9CA3AF]" />
                            <div className="absolute top-0 right-0 w-4 h-4 bg-brand-red rounded-full flex items-center justify-center border-2 border-[#111111]">
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                        </div>

                        <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                            Can't find what you're looking for? Our support team is here to help!
                        </p>

                        <button className="w-full bg-transparent border border-brand-red text-brand-red hover:bg-brand-red hover:text-white py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                            <MessageSquare className="w-4 h-4" /> Contact Support
                        </button>
                    </div>

                    {/* Popular Help Topics */}
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
                        <h3 className="text-white font-bold text-sm mb-4">Popular Help Topics</h3>
                        <div className="space-y-1 mb-6">
                            {[
                                'How to request a revision',
                                'How to upload files',
                                'Understanding project timelines',
                                'How to make a payment',
                                'How to download invoices'
                            ].map((topic, idx) => (
                                <button key={idx} className="w-full flex items-center justify-between p-3 rounded-xl text-[#9CA3AF] hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm text-left group">
                                    <span className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-[#4A4A4A] group-hover:text-white transition-colors" />
                                        {topic}
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-[#4A4A4A] group-hover:text-white transition-colors" />
                                </button>
                            ))}
                        </div>
                        <button className="w-full py-2.5 bg-brand-red/10 hover:bg-brand-red/20 text-brand-red border border-brand-red/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
                            View All Articles
                        </button>
                    </div>

                    {/* Support Availability */}
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
                        <h3 className="text-white font-bold text-sm mb-4">Support Availability</h3>
                        
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                <span className="text-sm font-bold text-white">We're Online</span>
                            </div>
                            <HeadphonesIcon className="w-5 h-5 text-[#4A4A4A]" />
                        </div>
                        
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-[#9CA3AF]">Monday - Friday</p>
                                <p className="text-sm text-white font-medium">9:00 AM to 6:00 PM (EST)</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#9CA3AF]">Average response time:</p>
                                <p className="text-sm text-green-500 font-medium">Within 2 hours</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </ClientLayout>
    );
}
