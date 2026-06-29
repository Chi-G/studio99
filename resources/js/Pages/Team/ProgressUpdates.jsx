import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import TeamLayout from '@/Layouts/TeamLayout';
import {
  Activity,
  MessageSquare,
  Send,
  Image as ImageIcon,
  Paperclip,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProgressUpdates() {
  const [updateText, setUpdateText] = useState('');

  const updates = [
    {
      id: 1,
      author: { name: 'Daniel Johnson', avatar: 'https://i.pravatar.cc/150?u=daniel', role: 'Graphic Designer' },
      project: 'Website Redesign',
      client: 'Quick Capital Ltd',
      time: '2 hours ago',
      content: 'Just finished the homepage wireframes. We decided to go with a more modern, asymmetric layout for the hero section. I will be starting on the service pages tomorrow.',
      attachments: [
        { name: 'wireframes_v1.fig', size: '2.4 MB' }
      ],
      likes: 2,
      comments: 1
    },
    {
      id: 2,
      author: { name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?u=4', role: 'Project Manager' },
      project: 'Social Media Management',
      client: 'GreenLife Farms',
      time: 'Yesterday at 4:30 PM',
      content: 'Client approved the content calendar for next month. Please ensure all graphic assets are delivered by Friday.',
      attachments: [],
      likes: 4,
      comments: 3
    },
    {
      id: 3,
      author: { name: 'Daniel Johnson', avatar: 'https://i.pravatar.cc/150?u=daniel', role: 'Graphic Designer' },
      project: 'Brand Identity Design',
      client: 'SparkPoint Solutions',
      time: 'May 24, 2025',
      content: 'Uploaded the final logo files in all requested formats (SVG, PNG, EPS). Awaiting final sign-off from the client before we compile the brand guidelines document.',
      attachments: [
        { name: 'logo_finals.zip', size: '15.6 MB' },
        { name: 'logo_preview.png', size: '1.2 MB' }
      ],
      likes: 5,
      comments: 0
    }
  ];

  const handlePostUpdate = (e) => {
    e.preventDefault();
    if (!updateText.trim()) return;
    toast.success('Update posted successfully!');
    setUpdateText('');
  };

  return (
    <TeamLayout>
      <Head title="Progress Updates | Team Dashboard" />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Progress Updates</h1>
        <p className="text-text-secondary text-sm">Share project milestones, blockers, and general updates with the team.</p>
      </div>

      <div className="max-w-full">
        {/* Post Update Form */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-5 mb-8 shadow-sm">
          <div className="flex gap-4">
            <img src="https://i.pravatar.cc/150?u=daniel" alt="You" className="w-10 h-10 rounded-full border border-bg-border object-cover shrink-0" />
            <div className="flex-1">
              <form onSubmit={handlePostUpdate}>
                <textarea
                  value={updateText}
                  onChange={(e) => setUpdateText(e.target.value)}
                  placeholder="What's your progress today? Share updates or blockers..."
                  className="w-full bg-bg-base border border-bg-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/50 transition-all resize-none custom-scrollbar mb-3"
                  rows="3"
                ></textarea>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select className="flex-1 sm:flex-none bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-red/50 appearance-none min-w-0 sm:min-w-[150px]">
                      <option value="">Select Project...</option>
                      <option value="1">Website Redesign</option>
                      <option value="2">Brand Identity</option>
                    </select>

                    <button type="button" className="p-2 shrink-0 text-text-secondary hover:text-brand-red transition-colors rounded-lg hover:bg-brand-red/10">
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 shrink-0 text-text-secondary hover:text-brand-red transition-colors rounded-lg hover:bg-brand-red/10">
                      <Paperclip className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!updateText.trim()}
                    className="w-full sm:w-auto px-5 py-2.5 sm:py-2 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-brand-red/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
                  >
                    <Send className="w-4 h-4 shrink-0" /> <span className="whitespace-nowrap">Post Update</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Updates Feed */}
        <div className="space-y-6">
          {updates.map((update) => (
            <div key={update.id} className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={update.author.avatar} alt={update.author.name} className="w-10 h-10 rounded-full border border-bg-border object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                      {update.author.name}
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-bg-base border border-bg-border text-text-secondary">
                        {update.author.role}
                      </span>
                    </h4>
                    <p className="text-[11px] text-text-secondary mt-0.5">{update.time}</p>
                  </div>
                </div>
                <button className="text-text-secondary hover:text-text-primary transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Project Badge */}
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[11px] font-bold">
                  <Activity className="w-3 h-3" />
                  {update.project}
                </span>
                <span className="text-[11px] text-text-secondary font-medium">• {update.client}</span>
              </div>

              {/* Content */}
              <p className="text-sm text-text-primary leading-relaxed mb-4">
                {update.content}
              </p>

              {/* Attachments */}
              {update.attachments.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-5">
                  {update.attachments.map((file, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl border border-bg-border bg-bg-base/50 hover:bg-bg-base transition-colors group cursor-pointer pr-4">
                      <div className="w-8 h-8 rounded-lg bg-bg-surface flex items-center justify-center shrink-0 border border-bg-border">
                        <Paperclip className="w-4 h-4 text-text-secondary group-hover:text-brand-red transition-colors" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-text-primary">{file.name}</p>
                        <p className="text-[10px] text-text-secondary">{file.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-bg-border">
                <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-red transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                  {update.likes > 0 ? `${update.likes} Acknowledged` : 'Acknowledge'}
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-blue-500 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  {update.comments > 0 ? `${update.comments} Comments` : 'Comment'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-2.5 rounded-xl border border-bg-border bg-bg-surface hover:bg-bg-border text-sm font-bold text-text-primary transition-colors">
            Load More Updates
          </button>
        </div>
      </div>
    </TeamLayout>
  );
}
