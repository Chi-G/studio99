import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Search, UserPlus, MoreVertical, Edit2, Shield, User } from 'lucide-react';

export default function AdminUsers() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@acme.com', role: 'client', status: 'active', joined: 'Oct 01, 2026' },
    { id: 2, name: 'Jane Smith', email: 'jane@startup.io', role: 'client', status: 'active', joined: 'Sep 15, 2026' },
    { id: 3, name: 'Alex Morgan', email: 'alex@studio99.com', role: 'team', status: 'active', joined: 'Jan 10, 2026' },
    { id: 4, name: 'Sarah Lee', email: 'sarah@studio99.com', role: 'team', status: 'inactive', joined: 'Mar 22, 2026' },
    { id: 5, name: 'Admin User', email: 'admin@studio99.com', role: 'admin', status: 'active', joined: 'Jan 01, 2026' },
  ];

  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin': return <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max"><Shield className="w-3 h-3" /> Admin</span>;
      case 'team': return <span className="bg-[#6C3CE1]/10 text-[#6C3CE1] border border-[#6C3CE1]/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max"><User className="w-3 h-3" /> Team</span>;
      default: return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max"><User className="w-3 h-3" /> Client</span>;
    }
  };

  return (
    <AdminLayout>
      <Head title="Users Management | Studio99" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Users</h1>
          <p className="text-[#94A3B8]">Manage clients, team members, and permissions.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input 
              type="text"
              placeholder="Search users..."
              className="bg-[#111118] border border-[#2A2A3A] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6C3CE1] w-full"
            />
          </div>
          <button className="bg-[#6C3CE1] hover:bg-[#5b32be] text-white p-2.5 rounded-lg transition-colors shadow-lg shrink-0">
            <UserPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-[#111118] border border-[#2A2A3A] rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1A1A28] border-b border-[#2A2A3A] text-[#94A3B8]">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A3A]">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-[#1A1A28]/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                      user.role === 'team' ? 'bg-[#6C3CE1]/20 text-[#6C3CE1]' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white mb-0.5">{user.name}</p>
                      <p className="text-xs text-[#94A3B8]">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                    user.status === 'active' ? 'text-green-400' : 'text-[#94A3B8]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-[#475569]'}`}></span>
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#94A3B8]">{user.joined}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-[#94A3B8] hover:text-white p-1 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-[#94A3B8] hover:text-white p-1 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </AdminLayout>
  );
}
