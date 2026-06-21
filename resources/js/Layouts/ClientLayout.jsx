import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
  Home, 
  FolderKanban, 
  Plus, 
  CreditCard, 
  RefreshCcw, 
  FolderOpen, 
  HeadphonesIcon,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { LogoutConfirmModal } from '@/Components/Modals/LogoutConfirmModal';

export default function ClientLayout({ children, onNewRequest }) {
  const { auth } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Projects', href: '/client/projects', icon: FolderKanban },
    { name: 'Payments', href: '/client/invoices', icon: CreditCard },
    { name: 'Subscriptions', href: '/client/subscriptions', icon: RefreshCcw },
    { name: 'File Center', href: '/client/files', icon: FolderOpen },
    { name: 'Support', href: '/client/support', icon: HeadphonesIcon },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F8FAFC] font-sans flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#111118] border-r border-[#2A2A3A] transform transition-transform duration-300 lg:translate-x-0 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-20 flex items-center px-6 border-b border-[#2A2A3A] shrink-0 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C3CE1] to-[#EC4899] flex items-center justify-center font-display font-bold text-white">
              S
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Studio99</span>
          </div>
          <button className="lg:hidden text-[#94A3B8]" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 shrink-0 border-b border-[#2A2A3A]">
          <button 
            onClick={onNewRequest}
            className="w-full flex items-center justify-center gap-2 bg-[#6C3CE1] hover:bg-[#5b32be] text-white py-2.5 px-4 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Request</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            // Rough active check
            const isActive = window.location.pathname.startsWith(item.href) && item.href !== '#' || window.location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors
                  ${isActive ? 'bg-[#6C3CE1]/10 text-[#6C3CE1]' : 'text-[#94A3B8] hover:bg-[#1A1A28] hover:text-white'}
                `}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-[#2A2A3A] shrink-0">
          <div className="flex items-center gap-3 mb-4 px-3">
            <div className="w-10 h-10 rounded-full bg-[#2A2A3A] flex items-center justify-center font-bold text-sm overflow-hidden shrink-0">
              {auth.user.name.charAt(0)}
            </div>
            <div className="truncate">
              <p className="font-medium text-sm text-white truncate">{auth.user.name}</p>
              <p className="text-xs text-[#94A3B8] truncate">{auth.user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-[#94A3B8] hover:bg-[#1A1A28] hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative max-w-full">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 flex items-center px-4 border-b border-[#2A2A3A] bg-[#111118] shrink-0">
          <button className="text-[#94A3B8]" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-display font-bold ml-4">Studio99 OS</span>
        </div>

        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
          {children}
        </main>
      </div>
      
      <LogoutConfirmModal 
        open={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
      />
    </div>
  );
}
