import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { AppModal } from '@/Components/ui/app-modal';
import { 
  LifeBuoy, 
  MessageSquare, 
  Search, 
  Plus, 
  ChevronRight,
  BookOpen,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function SupportIndex() {
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);

  const tickets = [
    { id: 'TKT-1042', subject: 'Domain transfer instructions', status: 'resolved', date: 'Oct 10, 2026', replies: 3 },
    { id: 'TKT-1043', subject: 'Need access to Figma source file', status: 'open', date: 'Yesterday', replies: 1 },
    { id: 'TKT-1044', subject: 'Invoice #0012 payment failing', status: 'pending', date: 'Today, 9:00 AM', replies: 2 },
  ];

  const faqs = [
    { q: 'How do I add a new team member to my project?', a: 'You can request to add a team member by submitting a Support Ticket. Our admins will configure their access levels within 24 hours.' },
    { q: 'What happens if I need a revision after a project is completed?', a: 'We offer a 14-day grace period for minor revisions. For major structural changes, a new project request should be submitted.' },
    { q: 'How do retainer subscriptions work?', a: 'Retainers give you a dedicated design queue. As soon as one task is completed, we immediately start the next one in your backlog.' },
    { q: 'Can I download source files (Figma, PSD)?', a: 'Yes, source files are provided automatically in the Deliverables folder for Pro and Enterprise subscribers.' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'resolved': return <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Resolved</span>;
      case 'open': return <span className="bg-[#6C3CE1]/10 text-[#6C3CE1] border border-[#6C3CE1]/20 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Open</span>;
      default: return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Pending</span>;
    }
  };

  return (
    <ClientLayout onNewRequest={() => {}}>
      <Head title="Support | Studio99" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Help & Support</h1>
          <p className="text-[#94A3B8]">Get assistance, read FAQs, or contact our support team.</p>
        </div>
        
        <button 
          onClick={() => setIsNewTicketOpen(true)}
          className="bg-[#6C3CE1] hover:bg-[#5b32be] text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Open New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Search Knowledge Base */}
        <div className="lg:col-span-2 bg-[#111118] border border-[#2A2A3A] rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#6C3CE1]/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-2">How can we help you?</h2>
            <p className="text-[#94A3B8] mb-6">Search our knowledge base or browse the FAQs below.</p>
            
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
              <input 
                type="text"
                placeholder="Search articles, guides, and FAQs..."
                className="w-full bg-[#1A1A28] border border-[#2A2A3A] rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#6C3CE1] shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Quick Contact Card */}
        <div className="bg-gradient-to-b from-[#1A1A28] to-[#111118] border border-[#2A2A3A] rounded-3xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#6C3CE1]/10 flex items-center justify-center mb-4">
            <LifeBuoy className="w-8 h-8 text-[#6C3CE1]" />
          </div>
          <h3 className="font-bold text-white mb-2">Need direct help?</h3>
          <p className="text-[#94A3B8] text-sm mb-6">Our support team is available Mon-Fri, 9am to 5pm EST.</p>
          <div className="w-full bg-[#111118] border border-[#2A2A3A] rounded-xl py-3 text-white font-medium">
            support@studio99.com
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tickets */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-white">Recent Tickets</h2>
            <button className="text-sm text-[#6C3CE1] hover:text-[#5b32be] font-medium transition-colors">
              View All
            </button>
          </div>
          
          <div className="bg-[#111118] border border-[#2A2A3A] rounded-2xl overflow-hidden divide-y divide-[#2A2A3A]">
            {tickets.map(ticket => (
              <div key={ticket.id} className="p-5 hover:bg-[#1A1A28] transition-colors cursor-pointer group flex items-center justify-between">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A28] border border-[#2A2A3A] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-[#94A3B8]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1 group-hover:text-[#6C3CE1] transition-colors">{ticket.subject}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                      <span>{ticket.id}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ticket.date}</span>
                      <span>{ticket.replies} Replies</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(ticket.status)}
                  <ChevronRight className="w-5 h-5 text-[#475569] group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-xl font-display font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#111118] border border-[#2A2A3A] rounded-2xl p-5 hover:border-[#6C3CE1]/30 transition-colors">
                <h3 className="font-bold text-white text-sm mb-2 flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-[#6C3CE1] shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-sm text-[#94A3B8] pl-7 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      <AppModal 
        open={isNewTicketOpen} 
        onClose={() => setIsNewTicketOpen(false)}
        title="Open Support Ticket"
        description="Describe your issue below and our team will get back to you within 24 hours."
      >
        <form className="mt-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E2E8F0]">Subject</label>
            <input 
              type="text" 
              placeholder="Brief summary of the issue"
              className="w-full bg-[#111118] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E2E8F0]">Related Project (Optional)</label>
            <select className="w-full bg-[#111118] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors appearance-none">
              <option value="">-- Select a project --</option>
              <option value="1">Acme Rebrand</option>
              <option value="2">Promo Video</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#E2E8F0]">Description</label>
            <textarea 
              rows={5}
              placeholder="Provide as much detail as possible..."
              className="w-full bg-[#111118] border border-[#2A2A3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C3CE1] transition-colors resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button"
              onClick={() => setIsNewTicketOpen(false)}
              className="px-5 py-2.5 rounded-lg font-medium text-[#94A3B8] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={() => setIsNewTicketOpen(false)}
              className="bg-[#6C3CE1] hover:bg-[#5b32be] text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </AppModal>

    </ClientLayout>
  );
}
