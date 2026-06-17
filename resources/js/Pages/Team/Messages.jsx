import React from 'react';
import { Head } from '@inertiajs/react';
import TeamLayout from '@/Layouts/TeamLayout';
import { EmptyState } from '@/Components/ui/empty-state';
import { MessageSquare } from 'lucide-react';

export default function Messages() {
  return (
    <TeamLayout>
      <Head title="Messages | Team Hub" />
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Messages</h1>
        <p className="text-[#94A3B8]">Communicate with your team.</p>
      </div>
      <EmptyState 
        icon={MessageSquare} 
        title="Messages Coming Soon" 
        description="This module is under construction." 
      />
    </TeamLayout>
  );
}
