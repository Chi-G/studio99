import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { EmptyState } from '@/Components/ui/empty-state';
import { FileText } from 'lucide-react';

export default function Content() {
  return (
    <AdminLayout>
      <Head title="Content Management | Admin" />
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Content</h1>
        <p className="text-[#94A3B8]">Manage your blog posts, case studies, and site copy.</p>
      </div>
      <EmptyState 
        icon={FileText} 
        title="Content Management Coming Soon" 
        description="This module is under construction." 
      />
    </AdminLayout>
  );
}
