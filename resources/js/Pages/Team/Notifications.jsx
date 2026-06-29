import React from 'react';
import { Head } from '@inertiajs/react';
import TeamLayout from '@/Layouts/TeamLayout';
import {
  Bell,
  Check,
  CheckCircle2,
  Clock,
  MessageSquare,
  Activity,
  FileText,
  Filter,
  CheckSquare
} from 'lucide-react';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'task',
      icon: CheckSquare,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
      title: 'New Task Assigned',
      message: 'Jane Cooper assigned you to "Design Homepage Wireframes" on Quick Capital Ltd.',
      time: '10:45 AM',
      isUnread: true
    },
    {
      id: 2,
      type: 'review',
      icon: Clock,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
      title: 'Deliverable Review Needed',
      message: 'Your deliverable "Brand_Guidelines.pdf" has feedback from the client.',
      time: 'Yesterday, 3:30 PM',
      isUnread: true
    },
    {
      id: 3,
      type: 'comment',
      icon: MessageSquare,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
      title: 'New Comment',
      message: 'Sarah Williams commented on your progress update for SparkPoint Solutions.',
      time: 'May 30, 2025',
      isUnread: false
    },
    {
      id: 4,
      type: 'system',
      icon: Activity,
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
      title: 'Project Status Changed',
      message: 'The project "Event Promo Video" has been marked as Completed.',
      time: 'May 28, 2025',
      isUnread: false
    },
    {
      id: 5,
      type: 'file',
      icon: FileText,
      iconBg: 'bg-brand-red/10',
      iconColor: 'text-brand-red',
      title: 'File Uploaded',
      message: 'Client uploaded new assets to the "Social Media Management" folder.',
      time: 'May 25, 2025',
      isUnread: false
    }
  ];

  return (
    <TeamLayout>
      <Head title="Notifications | Team Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Notifications</h1>
          <p className="text-text-secondary text-sm">Stay updated on your tasks, projects, and mentions.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-bg-surface border border-bg-border rounded-xl text-sm font-medium text-text-primary hover:bg-bg-border transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-red/10 text-brand-red border border-brand-red/20 rounded-xl text-sm font-bold hover:bg-brand-red/20 transition-colors">
            <CheckCircle2 className="w-4 h-4" />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="bg-bg-surface border border-bg-border rounded-2xl overflow-hidden w-full">
        {/* Header */}
        <div className="p-4 border-b border-bg-border flex items-center justify-between bg-bg-base/50">
          <div className="flex items-center gap-6">
            <button className="text-sm font-bold text-brand-red border-b-2 border-brand-red pb-1">All</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 border-b-2 border-transparent transition-colors">Unread (2)</button>
            <button className="text-sm font-medium text-text-secondary hover:text-text-primary pb-1 border-b-2 border-transparent transition-colors">Mentions</button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-bg-border">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-5 flex gap-4 transition-colors hover:bg-bg-base/80 ${notification.isUnread ? 'bg-bg-base/30' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notification.iconBg}`}>
                <notification.icon className={`w-5 h-5 ${notification.iconColor}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 className={`text-sm ${notification.isUnread ? 'font-bold text-text-primary' : 'font-medium text-text-secondary'}`}>
                    {notification.title}
                  </h4>
                  <span className="text-[11px] text-text-secondary font-medium whitespace-nowrap">
                    {notification.time}
                  </span>
                </div>
                <p className={`text-sm ${notification.isUnread ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {notification.message}
                </p>

                {notification.isUnread && (
                  <div className="mt-3 flex items-center gap-3">
                    <button className="text-xs font-bold text-brand-red hover:text-brand-red/80 transition-colors">View Details</button>
                    <span className="w-1 h-1 rounded-full bg-bg-border"></span>
                    <button className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1">
                      <Check className="w-3 h-3" /> Mark as read
                    </button>
                  </div>
                )}
              </div>

              {notification.isUnread && (
                <div className="w-2 h-2 rounded-full bg-brand-red mt-2 shrink-0 shadow-[0_0_8px_rgba(227,30,36,0.5)]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-bg-border text-center bg-bg-base/50">
          <button className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors">
            View Older Notifications
          </button>
        </div>
      </div>
    </TeamLayout>
  );
}
