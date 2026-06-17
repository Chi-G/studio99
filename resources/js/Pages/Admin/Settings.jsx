import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { EmptyState } from '@/Components/ui/empty-state';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <AdminLayout>
      <Head title="Settings | Admin" />
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Settings</h1>
        <p className="text-[#94A3B8]">Configure global agency settings.</p>
      </div>
      <EmptyState 
        icon={SettingsIcon} 
        title="Settings Coming Soon" 
        description="This module is under construction." 
      />
    </AdminLayout>
  );
}
