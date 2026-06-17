import React from 'react';
import { Head } from '@inertiajs/react';
import TeamLayout from '@/Layouts/TeamLayout';
import { EmptyState } from '@/Components/ui/empty-state';
import { Clock } from 'lucide-react';

export default function Time() {
  return (
    <TeamLayout>
      <Head title="Time Tracking | Team Hub" />
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Time Tracking</h1>
        <p className="text-[#94A3B8]">Log your hours against active tasks.</p>
      </div>
      <EmptyState 
        icon={Clock} 
        title="Time Tracking Coming Soon" 
        description="This module is under construction." 
      />
    </TeamLayout>
  );
}
