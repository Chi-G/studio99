import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { EmptyState } from '@/Components/ui/empty-state';
import { BarChart3 } from 'lucide-react';

export default function Analytics() {
  return (
    <AdminLayout>
      <Head title="Analytics | Admin" />
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Analytics</h1>
        <p className="text-[#94A3B8]">Deep dive into your agency's performance.</p>
      </div>
      <EmptyState 
        icon={BarChart3} 
        title="Analytics Dashboard Coming Soon" 
        description="This module is under construction." 
      />
    </AdminLayout>
  );
}
