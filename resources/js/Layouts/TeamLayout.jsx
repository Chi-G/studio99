import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, 
  Clock, 
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { LogoutConfirmModal } from '@/Components/Modals/LogoutConfirmModal';
import headerLogo from '../../images/logo.jpeg';

export default function TeamLayout({ children }) {
  const { auth } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigation = [
    { name: 'My Tasks', href: '/dashboard/team', icon: CheckSquare },
    { name: 'Time Logs', href: '/team/time', icon: Clock },
    { name: 'Messages', href: '/team/messages', icon: MessageSquare },
    { name: 'Settings', href: '/team/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F8FAFC] font-sans flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#111118] border-r border-[#2A2A3A] transform transition-transform duration-300 lg:translate-x-0 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-20 flex items-center px-6 border-b border-[#2A2A3A] shrink-0 justify-between">
          <div className="flex items-center gap-2">
            <img src={headerLogo} alt="Studio99 Logo" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-display font-bold text-xl tracking-tight text-white">Team Hub</span>
          </div>
          <button 
            className="lg:hidden text-[#94A3B8] hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = window.location.pathname.startsWith(item.href) && item.href !== '#' || window.location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors
                  ${isActive ? 'bg-[#10B981]/10 text-[#10B981]' : 'text-[#94A3B8] hover:bg-[#1A1A28] hover:text-white'}
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
              <p className="text-xs text-[#94A3B8] truncate">Creator</p>
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
          <span className="font-display font-bold ml-4">Team Hub</span>
        </div>

        <motion.main 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 md:p-8 overflow-x-hidden"
        >
          {children}
        </motion.main>
      </div>
      
      <LogoutConfirmModal 
        open={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
      />
    </div>
  );
}
