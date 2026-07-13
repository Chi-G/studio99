import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  FolderKanban,
  FileText,
  Layers,
  CheckSquare,
  CreditCard,
  BarChart2,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  MessageSquare,
  Search
} from 'lucide-react';
import { LogoutConfirmModal } from '@/Components/Modals/LogoutConfirmModal';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { Logo } from '@/Components/Logo';

export default function AdminLayout({ children }) {
  const { auth } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Clients', href: '/admin/clients', icon: Users },
    { name: 'Team Members', href: '/admin/team-members', icon: UserCircle },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Requests', href: '/admin/requests', icon: FileText },
    { name: 'Services', href: '/admin/services', icon: Layers },
    { name: 'Tasks', href: '/admin/tasks', icon: CheckSquare },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Reports', href: '/admin/reports', icon: BarChart2 },
    { name: 'Activity Logs', href: '/admin/activity-logs', icon: Activity },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
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

      {/* Sidebar - Strictly Dark Mode */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-[#0F0F13] border-r border-white/5 transform transition-all duration-300 flex flex-col h-full
        ${sidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed ? 'lg:w-[88px]' : 'lg:w-[280px] w-[280px]'}
      `}>
        {/* Logo Area */}
        <div className={`h-24 flex items-center border-b border-white/5 shrink-0 ${sidebarCollapsed ? 'justify-center px-0' : 'justify-between px-8'}`}>
          <Link href="/admin/dashboard" className="flex items-center gap-2 hover:opacity-90 transition-opacity" title={sidebarCollapsed ? "Studio99" : undefined}>
            <div className={`flex justify-center items-center ${sidebarCollapsed ? 'w-10 h-10' : 'h-10'}`}>
              <Logo forceWhite className={`object-contain ${sidebarCollapsed ? 'h-8 w-auto' : 'h-10 w-auto'}`} />
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

            return (
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
              </Link>
            )
          })}
        </nav>

        <div className={`mt-auto border-t border-white/5 shrink-0 ${sidebarCollapsed ? 'p-3' : 'p-4'}`}>
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
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-bg-surface border border-bg-border rounded-xl w-64 lg:w-96 focus-within:border-brand-red/50 focus-within:ring-1 focus-within:ring-brand-red/50 transition-all">
              <Search className="w-4 h-4 text-text-secondary shrink-0" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none outline-none text-sm text-text-primary w-full placeholder-text-secondary/50 focus:ring-0 p-0"
              />
              <div className="flex items-center gap-1 text-[10px] text-text-secondary font-medium bg-bg-base px-2 py-0.5 rounded border border-bg-border shrink-0">
                <span>Ctrl</span>
                <span>K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <ThemeToggle />

            <div className="flex items-center gap-4">
              <button className="relative text-text-secondary hover:text-text-primary transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-red flex items-center justify-center text-[8px] font-bold text-white ring-2 ring-bg-base">
                  4
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
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-text-primary">{auth.user.name}</p>
                  <p className="text-[11px] text-text-secondary">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center font-bold text-text-primary overflow-hidden border border-bg-border">
                  {auth.user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-bg-card border border-bg-border rounded-xl shadow-2xl py-2 z-50">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-border font-medium">Account Settings</Link>
                  <button onClick={() => { setIsProfileDropdownOpen(false); setIsLogoutModalOpen(true); }} className="block w-full text-left px-4 py-2 text-sm text-brand-red hover:bg-bg-border font-medium">Log Out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Search (Shows only on mobile) */}
        <div className="md:hidden px-6 pt-4">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl w-full">
            <Search className="w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none text-sm text-text-primary w-full placeholder-text-secondary/50 focus:ring-0 p-0"
            />
          </div>
        </div>

        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden overflow-y-auto custom-scrollbar flex flex-col">
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
    </div>
  );
}
