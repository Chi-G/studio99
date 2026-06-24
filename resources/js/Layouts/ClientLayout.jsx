import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FilePlus, 
  Activity, 
  FolderOpen, 
  CreditCard, 
  MessageSquare,
  Bell,
  HeadphonesIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { LogoutConfirmModal } from '@/Components/Modals/LogoutConfirmModal';

export default function ClientLayout({ children }) {
  const { auth } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Projects', href: '/client/projects', icon: FolderKanban },
    { name: 'Service Requests', href: '/client/requests', icon: FilePlus },
    { name: 'Project Progress', href: '/client/progress', icon: Activity },
    { name: 'Files & Deliverables', href: '/client/files', icon: FolderOpen },
    { name: 'Invoices & Payments', href: '/client/invoices', icon: CreditCard },
    { name: 'Messages', href: '/client/messages', icon: MessageSquare, badge: 3 },
    { name: 'Notifications', href: '/client/notifications', icon: Bell, badge: 5 },
    { name: 'Support Tickets', href: '/client/support', icon: HeadphonesIcon },
    { name: 'Account Settings', href: '/profile', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] font-sans flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-[#111111] border-r border-[#2A2A2A] transform transition-transform duration-300 lg:translate-x-0 flex flex-col h-full
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Area */}
        <div className="h-24 flex items-center px-8 border-b border-[#2A2A2A] shrink-0 justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="flex flex-col justify-center leading-none mt-0.5">
              <span className="font-black text-2xl tracking-tight flex items-center gap-1">
                <div className="w-8 h-8 rounded bg-brand-red flex items-center justify-center font-black text-white text-xs mr-1">S99</div>
                studio<span className="text-brand-red">99</span>
              </span>
              <span className="text-[10px] uppercase text-[#9CA3AF] tracking-[0.25em] font-sans font-bold mt-1 ml-10">
                Digital
              </span>
            </div>
          </Link>
          <button className="lg:hidden text-[#9CA3AF] hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          {navigation.map((item) => {
            const isActive = window.location.pathname.startsWith(item.href) && item.href !== '#' || window.location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(227,30,36,0.2)]' 
                    : 'text-[#9CA3AF] hover:bg-[#1A1A1A] hover:text-white'}
                `}
              >
                <div className="flex items-center gap-3.5">
                  <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-[#9CA3AF] group-hover:text-white'}`} />
                  <span className="text-sm font-bold tracking-wide">{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black ${isActive ? 'bg-white text-brand-red' : 'bg-brand-red text-white shadow-[0_0_10px_rgba(227,30,36,0.4)]'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
          
          <div className="pt-4 mt-4 border-t border-[#2A2A2A]">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-medium text-[#9CA3AF] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 shrink-0 transition-colors text-[#9CA3AF] group-hover:text-white" />
              <span className="text-sm font-bold tracking-wide">Logout</span>
            </button>
          </div>
        </nav>

        {/* Help Block */}
        <div className="p-6 shrink-0 mt-auto border-t border-[#2A2A2A] bg-[#111111]">
          <div className="text-center relative">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#2A2A2A]">
                <HeadphonesIcon className="w-5 h-5 text-brand-red" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-bold text-sm">Need Help?</h4>
                <p className="text-[#9CA3AF] text-xs">We're here to assist you.</p>
              </div>
            </div>
            <button className="w-full py-3 rounded-xl border border-brand-red text-brand-red text-sm font-bold hover:bg-brand-red hover:text-white transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[280px] flex flex-col min-h-screen relative max-w-full overflow-hidden bg-[#0A0A0A]">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-30">
          <div className="flex flex-col">
            <button className="lg:hidden text-[#9CA3AF] hover:text-white mb-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:block">
              <h1 className="text-3xl font-black text-white flex items-center gap-2">
                Good Morning, {auth.user.name.split(' ')[0]}! <span className="text-2xl">👋</span>
              </h1>
              <p className="text-[#9CA3AF] text-sm mt-1">Here's what's happening with your projects today.</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Notification Bell */}
            <button className="relative text-[#9CA3AF] hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-red flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-[#0A0A0A]">
                5
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center font-bold text-white overflow-hidden border border-[#2A2A2A]">
                  {auth.user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-bold text-white">{auth.user.name}</p>
                  <p className="text-xs text-[#9CA3AF]">Client</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#9CA3AF] hidden sm:block transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-2xl py-2 z-50">
                  <Link href="/profile" className="block px-4 py-2.5 text-sm text-[#9CA3AF] hover:text-white hover:bg-[#2A2A2A] font-medium">Account Settings</Link>
                  <button onClick={() => { setIsProfileDropdownOpen(false); setIsLogoutModalOpen(true); }} className="block w-full text-left px-4 py-2.5 text-sm text-brand-red hover:bg-[#2A2A2A] font-medium">Log Out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Title (Since header title is hidden on small screens) */}
        <div className="md:hidden px-6 pt-4 pb-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            Hi, {auth.user.name.split(' ')[0]}! <span className="text-xl">👋</span>
          </h1>
        </div>

        <main className="flex-1 p-6 lg:px-10 lg:py-6 overflow-x-hidden overflow-y-auto custom-scrollbar">
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
