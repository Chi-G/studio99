import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  LayoutDashboard,
  CheckSquare,
  UploadCloud,
  Activity,
  FileText,
  MessageSquare,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search
} from 'lucide-react';
import { LogoutConfirmModal } from '@/Components/Modals/LogoutConfirmModal';
import { AppModal } from '@/Components/ui/app-modal';
import { ThemeToggle } from '@/Components/ThemeToggle';
import logoImage from '../../images/logo.jpeg';

export default function TeamLayout({ children }) {
  const { auth } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
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
    { name: 'Dashboard', href: '/dashboard/team', icon: LayoutDashboard },
    { name: 'Assigned Tasks', href: '/team/tasks', icon: CheckSquare },
    { name: 'Upload Deliverables', href: '/team/deliverables', icon: UploadCloud },
    { name: 'Progress Updates', href: '/team/progress', icon: Activity },
    { name: 'Activity Logs', href: '/team/activity-logs', icon: FileText },
    { name: 'Messages', href: '/team/messages', icon: MessageSquare, badge: 3 },
    { name: 'Notifications', href: '/team/notifications', icon: Bell, badge: 5 },
    { name: 'Profile', href: '/team/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-bg-base text-text-primary font-sans flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Dark Mode */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-[#0F0F13] border-r border-white/5 transform transition-all duration-300 flex flex-col h-full
        ${sidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed ? 'lg:w-[88px]' : 'lg:w-[280px] w-[280px]'}
      `}>
        {/* Logo Area */}
        <div className={`h-24 flex items-center border-b border-white/5 shrink-0 ${sidebarCollapsed ? 'justify-center px-0' : 'justify-between px-8'}`}>
          <Link href="/dashboard/team" className="flex items-center gap-2 hover:opacity-90 transition-opacity" title={sidebarCollapsed ? "Studio99" : undefined}>
            <div className={`flex flex-col justify-center leading-none mt-0.5 ${sidebarCollapsed ? 'items-center' : ''}`}>
              <span className="font-gilroy font-bold text-2xl tracking-tight text-white flex items-center gap-1">
                <img src={logoImage} alt="Studio99" className={`rounded object-cover ${sidebarCollapsed ? 'w-10 h-10' : 'w-8 h-8 mr-1'}`} />
                {!sidebarCollapsed && (
                  <>studio<span className="text-brand-red font-black tracking-tighter -ml-1.5">99</span></>
                )}
              </span>
              {!sidebarCollapsed && (
                <span className="text-[10px] uppercase text-zinc-500 tracking-[0.25em] font-sans font-bold mt-1 ml-10">
                  — Digital —
                </span>
              )}
            </div>
          </Link>
          {!sidebarCollapsed && (
            <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className={`flex-1 overflow-y-auto py-6 space-y-1 admin-sidebar-scroll ${sidebarCollapsed ? 'px-3' : 'px-4'}`}>
          {navigation.map((item) => {
            const isActive = window.location.pathname.startsWith(item.href) && item.href !== '#' || window.location.pathname === item.href;

            return item.comingSoon ? (
              <button
                key={item.name}
                onClick={() => { setComingSoonFeature(item.name); setIsComingSoonModalOpen(true); }}
                title={sidebarCollapsed ? item.name : undefined}
                className={`
                  flex items-center ${sidebarCollapsed ? 'justify-center px-0 py-3' : 'justify-between px-4 py-2.5'} rounded-xl font-medium transition-all duration-200 group relative
                  text-zinc-400 hover:bg-white/5 hover:text-white w-full text-left
                `}
              >
                <div className="flex items-center gap-3.5">
                  <item.icon className="w-5 h-5 shrink-0 transition-colors text-zinc-500 group-hover:text-white" />
                  {!sidebarCollapsed && (
                    <span className="text-sm font-semibold tracking-wide">{item.name}</span>
                  )}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black bg-brand-red text-white shadow-[0_0_10px_rgba(227,30,36,0.4)]">
                    {item.badge}
                  </span>
                )}
                {sidebarCollapsed && item.badge && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-white ring-2 ring-brand-red"></span>
                )}
              </button>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                title={sidebarCollapsed ? item.name : undefined}
                className={`
                  flex items-center ${sidebarCollapsed ? 'justify-center px-0 py-3' : 'justify-between px-4 py-2.5'} rounded-xl font-medium transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-brand-red text-white shadow-[0_0_15px_rgba(227,30,36,0.15)]'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'}
                `}
              >
                <div className="flex items-center gap-3.5">
                  <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`} />
                  {!sidebarCollapsed && (
                    <span className="text-sm font-semibold tracking-wide">{item.name}</span>
                  )}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black ${isActive ? 'bg-white text-brand-red' : 'bg-brand-red text-white shadow-[0_0_10px_rgba(227,30,36,0.4)]'}`}>
                    {item.badge}
                  </span>
                )}
                {sidebarCollapsed && item.badge && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-white ring-2 ring-brand-red"></span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Profile Card / Logout */}
        <div className={`mt-auto border-t border-white/5 shrink-0 ${sidebarCollapsed ? 'p-3' : 'p-4'}`}>
          {!sidebarCollapsed ? (
            <div className="mb-4 px-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?u=daniel" alt="Profile" className="w-10 h-10 rounded-full border-2 border-[#0F0F13] object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0F0F13] rounded-full"></span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">Daniel Johnson</p>
                  <p className="text-[11px] font-medium text-zinc-500">Graphic Designer</p>
                  <p className="text-[10px] font-medium text-emerald-500 flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Online</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <img src="https://i.pravatar.cc/150?u=daniel" alt="Profile" className="w-10 h-10 rounded-full border-2 border-[#0F0F13] object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0F0F13] rounded-full"></span>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsLogoutModalOpen(true)}
            title={sidebarCollapsed ? "Logout" : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0 py-3' : 'gap-3.5 px-4 py-2.5'} rounded-xl font-medium text-zinc-400 hover:bg-white/5 hover:text-white transition-all duration-200 group`}
          >
            <LogOut className="w-5 h-5 shrink-0 text-zinc-500 group-hover:text-white transition-colors" />
            {!sidebarCollapsed && <span className="text-sm font-semibold tracking-wide">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen relative max-w-full overflow-hidden bg-bg-base transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[88px]' : 'lg:ml-[280px]'}`}>
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-30 bg-bg-base/80 backdrop-blur-md border-b border-bg-border">
          <div className="flex items-center gap-4 flex-1">
            <button className="lg:hidden text-text-secondary hover:text-text-primary" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl bg-bg-surface border border-bg-border text-text-secondary hover:text-text-primary hover:border-bg-border transition-all shadow-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="hidden sm:block font-gilroy font-bold text-xl text-text-primary ml-2">Team Dashboard</span>
          </div>

          <div className="flex items-center gap-5">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-bg-surface border border-bg-border rounded-xl w-64 focus-within:border-brand-red/50 focus-within:ring-1 focus-within:ring-brand-red/50 transition-all">
              <Search className="w-4 h-4 text-text-secondary shrink-0" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none outline-none text-sm text-text-primary w-full placeholder-text-secondary/50 focus:ring-0 p-0"
              />
            </div>

            <ThemeToggle />

            <div className="flex items-center gap-4">
              <button className="relative text-text-secondary hover:text-text-primary transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-red flex items-center justify-center text-[8px] font-bold text-white ring-2 ring-bg-base">
                  5
                </span>
              </button>
              
              <button className="relative text-text-secondary hover:text-text-primary transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-red flex items-center justify-center text-[8px] font-bold text-white ring-2 ring-bg-base">
                  3
                </span>
              </button>
            </div>
            
            <div className="w-px h-8 bg-bg-border mx-2 hidden sm:block"></div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="w-10 h-10 rounded-full border-2 border-bg-border overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=daniel" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform hidden sm:block ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-bg-card border border-bg-border rounded-xl shadow-2xl py-2 z-50">
                  <Link href="/team/profile" className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-border font-medium">Account Settings</Link>
                  <button onClick={() => { setIsProfileDropdownOpen(false); setIsLogoutModalOpen(true); }} className="block w-full text-left px-4 py-2 text-sm text-brand-red hover:bg-bg-border font-medium">Log Out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Search */}
        <div className="md:hidden px-6 pt-4">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl w-full">
            <Search className="w-4 h-4 text-text-secondary shrink-0" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none text-sm text-text-primary w-full placeholder-text-secondary/50 focus:ring-0 p-0"
            />
          </div>
        </div>

        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex-1 w-full max-w-[1400px] mx-auto">
            {children}
          </div>
          
          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-bg-border flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 max-w-[1400px] w-full mx-auto">
            <p className="text-text-secondary text-sm font-medium">© 2025 Studio99 Digital. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-text-secondary text-sm font-medium hover:text-text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-text-secondary text-sm font-medium hover:text-text-primary transition-colors">Terms of Service</Link>
            </div>
          </footer>
        </main>
      </div>
      
      <LogoutConfirmModal 
        open={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
      />

      <AppModal 
        open={isComingSoonModalOpen} 
        onClose={() => setIsComingSoonModalOpen(false)}
        title="Coming Soon"
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-red/20">
            <Activity className="w-8 h-8 text-brand-red" />
          </div>
          <h3 className="text-xl font-gilroy font-bold text-text-primary mb-2">We're building this!</h3>
          <p className="text-text-secondary">
            The <span className="font-bold text-brand-red">{comingSoonFeature}</span> feature is currently under development and will be available soon.
          </p>
          <button 
            onClick={() => setIsComingSoonModalOpen(false)}
            className="mt-8 px-6 py-2 bg-bg-surface border border-bg-border text-text-primary rounded-xl font-bold hover:bg-bg-border transition-colors"
          >
            Got it
          </button>
        </div>
      </AppModal>
    </div>
  );
}
